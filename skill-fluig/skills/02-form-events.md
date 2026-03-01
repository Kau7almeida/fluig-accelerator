# 02-form-events.md — Eventos de Formulário (Server-Side)

> **Consulte esta skill ao implementar eventos de formulário Fluig.**
> Cobre: displayFields, enableFields, validateForm, inputFields, beforeProcessing + FormController completo.
> Todos esses eventos rodam no **server-side (Rhino ES5)**. Nunca implementar via front-end.

---

## 1. Visão geral

Os eventos de formulário são scripts JavaScript (Rhino ES5) executados pelo servidor Fluig em momentos específicos do ciclo de vida do formulário. Eles recebem a variável `form` (FormController) como parâmetro.

### 1.1 Ordem de execução

```
Usuário abre o formulário
       │
       ▼
  beforeProcessing(form)        ← primeiro evento, só leitura
       │
       ▼
  displayFields(form, customHTML) ← controla visibilidade e injeta HTML/JS
       │
       ▼
  enableFields(form)            ← controla habilitação dos campos
       │
       ▼
  [Usuário preenche e clica Enviar]
       │
       ▼
  inputFields(form)             ← trata dados antes de persistir (ex.: datas)
       │
       ▼
  validateForm(form)            ← valida campos, throw bloqueia envio
       │
       ▼
  [Dados salvos no banco]
```

### 1.2 Regras gerais

- **Rhino ES5 obrigatório** — sem let/const, arrow functions, template literals, Promise
- Variável `form` é o **FormController** — disponível em todos os eventos
- `getValue("WKNumState")` retorna o **número da atividade atual** do processo
- `getValue("WKUser")` retorna o **login do usuário** logado
- `form.getFormMode()` retorna: `ADD` (criação), `MOD` (edição), `VIEW` (visualização), `NONE` (sem UI)
- `displayFields` **não é executado** na movimentação em bloco
- `validateForm` **é executado** na movimentação em bloco
- `getValue()` **não funciona** dentro de `inputFields` — usar `form.getValue()`

---

## 2. FormController — Referência completa

A variável `form` está disponível em todos os eventos. Os métodos do campo `fieldName` são **case insensitive**.

### 2.1 Leitura de dados

| Método | Retorno | Descrição |
|---|---|---|
| `form.getValue("campo")` | String | Valor do campo |
| `form.getFormMode()` | String | `ADD`, `MOD`, `VIEW` ou `NONE` |
| `form.getCompanyId()` | long | ID da empresa |
| `form.getDocumentId()` | int | ID do documento (registro) |
| `form.getVersion()` | int | Versão do documento |
| `form.getCardIndex()` | int | ID do formulário |
| `form.getMobile()` | boolean | `true` se acesso via mobile |
| `form.getEnabled("campo")` | boolean | Se o campo está habilitado |
| `form.isVisible("campo")` | boolean | Se o campo está visível (por name) |
| `form.isVisibleById("id")` | boolean | Se o elemento está visível (por id) |
| `form.getChildrenIndexes("tabela")` | Integer[] | Índices das linhas da tabela pai-filho |
| `form.getChildrenFromTable("tabela")` | Map | Mapa com nomes/valores dos campos filhos |

### 2.2 Escrita de dados

| Método | Descrição |
|---|---|
| `form.setValue("campo", "valor")` | Define valor de um campo |
| `form.setVisible("campo", bool)` | Mostra/oculta campo por `name` |
| `form.setVisibleById("id", bool)` | Mostra/oculta elemento HTML por `id` |
| `form.setEnabled("campo", bool)` | Habilita/desabilita campo |
| `form.setEnabled("campo", bool, true)` | Desabilita + protege (valor não é salvo) |
| `form.setEnhancedSecurityHiddenInputs(true)` | Todos os campos desabilitados após esta chamada ficam protegidos |
| `form.setShowDisabledFields(true)` | Exibe formulário com campos desabilitados visíveis |
| `form.setHidePrintLink(true)` | Oculta botões de imprimir |
| `form.setHideDeleteButton(true)` | Oculta botão excluir em TODAS as tabelas pai-filho |
| `form.setHideDeleteButton("tabela", true)` | Oculta botão excluir em tabela pai-filho específica |
| `form.setHideAddButton(true)` | Oculta botão adicionar em TODAS as tabelas pai-filho |
| `form.setHideAddButton("tabela", true)` | Oculta botão adicionar em tabela pai-filho específica |

### 2.3 Propriedades do processo (via getValue global)

Dentro dos eventos de formulário, a função global `getValue()` (sem `form.`) acessa propriedades do processo:

| Propriedade | Descrição |
|---|---|
| `getValue("WKNumState")` | Número da atividade atual |
| `getValue("WKUser")` | Login do usuário logado |
| `getValue("WKNumProces")` | Número da solicitação |
| `getValue("WKCompletTask")` | `"true"` se completando tarefa, `"false"` se salvando |
| `getValue("WKDef")` | Código do processo |
| `getValue("WKIsTransfer")` | `"true"` se é transferência de tarefa |

> **Importante:** `getValue()` global ≠ `form.getValue()`. O global acessa propriedades do workflow, o `form.getValue()` acessa campos do formulário.

---

## 3. beforeProcessing

Primeiro evento disparado. Executado **antes de tudo**. Use apenas para **leitura** — alterações nos dados **não serão persistidas**.

### Quando usar

- Consultar dados do formulário para lógica que será usada em outros eventos
- Registrar logs de auditoria

### Assinatura

```javascript
function beforeProcessing(form) {
    // form disponível apenas para LEITURA
}
```

### Exemplo

```javascript
function beforeProcessing(form) {
    var modo = form.getFormMode();
    var docId = form.getDocumentId();
    log.info("[beforeProcessing] Modo: " + modo + " | DocId: " + docId);
}
```

> **Armadilha:** nunca chamar `form.setValue()` aqui — a alteração será ignorada silenciosamente.

---

## 4. displayFields

Evento mais usado. Disparado quando o formulário é **renderizado na tela**. É o único evento que permite alterar valores **antes da renderização** e injetar HTML/JS via `customHTML`.

### Quando usar

- Controlar **visibilidade** de painéis/campos por atividade do processo
- Preencher campos automaticamente (ex.: data atual, nome do solicitante)
- Injetar variáveis do servidor para o front-end via `customHTML`

### Assinatura

```javascript
function displayFields(form, customHTML) {
    // form: FormController (leitura e escrita)
    // customHTML: StringBuffer para injetar HTML/JS no formulário
}
```

### 4.1 Bloco padrão dataForm + funções getter (padrão Jynx)

Todo `displayFields` deve começar com o bloco `dataForm` que centraliza as propriedades do processo, e injetar funções getter para o front-end:

```javascript
function displayFields(form, customHTML) {
    var dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    // ── Funções getter para o front-end (padrão Jynx) ──
    customHTML.append("<script>function getUsuario(){ return '" + dataForm.user + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + dataForm.state + "; }</script>");
    customHTML.append("<script>function getWKNumProces(){ return " + dataForm.processId + "; }</script>");

    // ── Controle de visibilidade por atividade ──
    // ... (ver seção 4.2)
}
```

> **Regra Jynx:** sempre criar `dataForm` como primeiro bloco do displayFields. Sempre injetar as 3 funções getter (`getUsuario`, `getWKNumState`, `getWKNumProces`) para que o JS front-end acesse esses dados sem depender de variáveis globais soltas.

No JavaScript do formulário (`form-scripts.js`), use as funções getter:

```javascript
$(function() {
    var state = getWKNumState();
    var user = getUsuario();
    var processId = getWKNumProces();

    console.log("Atividade: " + state + " | Usuário: " + user);
});
```

### 4.2 Controle de visibilidade por atividade

Após o bloco `dataForm` e as funções getter, implementar o controle de visibilidade:

```javascript
function displayFields(form, customHTML) {
    var dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    // ── Funções getter para o front-end (padrão Jynx) ──
    customHTML.append("<script>function getUser(){ return '" + dataForm.user + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + dataForm.state + "; }</script>");
    customHTML.append("<script>function getWKNumProces(){ return " + dataForm.processId + "; }</script>");

    // ── Estado 0 ou 1: Abertura (solicitante preenche) ──
    if (dataForm.state == 0 || dataForm.state == 1) {
        customHTML.append("<script>");
        customHTML.append("$('.pnl_parecer, .pnl_status_banner').addClass('hide');");
        customHTML.append("</script>");
    }

    // ── Estado 2: Aprovação do Gestor ──
    if (dataForm.state == 2) {
        customHTML.append("<script>");
        customHTML.append("$('.pnl_status_banner').addClass('hide');");
        customHTML.append("</script>");
    }

    // ── Estado 4: Conclusão (tudo visível) ──
    if (dataForm.state == 4) {
        // Todos os painéis visíveis
    }

    // ── VIEW: ocultar seções sensíveis se necessário ──
    if (form.getFormMode() == "VIEW") {
        // Exemplo: ocultar botões de ação
    }

    // ── Default de segurança: states não mapeados ──
    // Ocultar painéis sensíveis por padrão
}
```

> **Padrão customHTML:** usar `customHTML.append("<script>...</script>")` para injetar jQuery que manipula classes CSS (`hide`, `show`).
> **Convenção Jynx:** painéis usam classe `pnl_` conforme `01-form.md`.

### 4.3 Usando form.setVisible (alternativa sem customHTML)

```javascript
function displayFields(form, customHTML) {
    var dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    // ... funções getter ...

    if (dataForm.state == 0 || dataForm.state == 1) {
        // Ocultar por name do campo
        form.setVisible("txta_parecer", false);

        // Ocultar por id do elemento HTML
        form.setVisibleById("pnl_parecer", false);
    }
}
```

| Abordagem | Vantagem | Limitação |
|---|---|---|
| `customHTML.append` + jQuery | Controla qualquer elemento por classe CSS | Injeção de script, menos declarativo |
| `form.setVisible` / `form.setVisibleById` | Declarativo, sem script injection | Só funciona com `name` ou `id` únicos |

> **Recomendação Jynx:** usar `customHTML` com jQuery para controle de painéis (`.pnl_*`), e `form.setVisible`/`form.setVisibleById` para campos individuais.

### 4.4 Preenchimento automático de campos

```javascript
function displayFields(form, customHTML) {
    var dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    // ... funções getter ...

    if (form.getFormMode() != "VIEW") {
        if (dataForm.state == 0 || dataForm.state == 1) {
            form.setValue("txt_solicitante", _buscarNomeUsuario(dataForm.user));
            form.setValue("hd_login_solicitante", dataForm.user);
            form.setValue("dt_solicitacao", _retornaDataAtual());
        }
    }
}

function _retornaDataAtual() {
    return (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new java.util.Date());
}

function _buscarNomeUsuario(login) {
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
    if (ds.rowsCount > 0) {
        return ds.getValue(0, "colleagueName");
    }
    return "";
}
```

### 4.5 Carregando dados no front via customHTML

Para carregar dados em componentes dinâmicos (grid, select, etc.), envolver a chamada em `$(function(){})`:

```javascript
function displayFields(form, customHTML) {
    customHTML.append("<script>");
    customHTML.append("$(function(){");
    customHTML.append("  loadProdutos();");
    customHTML.append("});");
    customHTML.append("</script>");
}
```

> **Armadilha:** não é executado na movimentação em bloco. Se a lógica depende de displayFields, considere replicar no validateForm.

---

## 5. enableFields

Disparado após o `displayFields`. Controla a **habilitação/desabilitação** dos campos.

### Quando usar

- Tornar campos **readonly** em determinadas atividades
- Proteger campos preenchidos em etapas anteriores
- Bloquear edição de tabelas pai-filho

### Assinatura

```javascript
function enableFields(form) {
    // form: FormController
}
```

### 5.1 Desabilitar campos por atividade

```javascript
function enableFields(form) {
    var state = parseInt(getValue("WKNumState"));

    // Proteger todos os campos desabilitados contra alteração via inspetor
    form.setEnhancedSecurityHiddenInputs(true);

    // ── Atividade 2+: campos de abertura são readonly ──
    if (state >= 2) {
        form.setEnabled("txt_solicitante", false);
        form.setEnabled("dt_solicitacao", false);
        form.setEnabled("slc_departamento", false);
        form.setEnabled("txta_descricao", false);
    }

    // ── Atividade 4 (conclusão): tudo readonly ──
    if (state == 4) {
        form.setEnabled("txta_parecer", false);
        form.setEnabled("slc_decisao", false);
    }

    // ── Fora de processo (ADD): nada desabilitado ──
    if (state == 0) {
        // Todos editáveis
    }
}
```

### 5.2 Proteger campos de tabela pai-filho

```javascript
function enableFields(form) {
    var state = parseInt(getValue("WKNumState"));

    if (state >= 2) {
        // Desabilitar campos individuais dentro do pai-filho
        var indexes = form.getChildrenIndexes("itensCompra");
        for (var i = 0; i < indexes.length; i++) {
            form.setEnabled("txt_produto___" + indexes[i], false);
            form.setEnabled("nb_quantidade___" + indexes[i], false);
            form.setEnabled("nb_vlr_unitario___" + indexes[i], false);
        }

        // Ocultar botões de adicionar/excluir linhas
        form.setHideAddButton("itensCompra", true);
        form.setHideDeleteButton("itensCompra", true);
    }
}
```

### 5.3 Armadilhas do enableFields

| Problema | Causa | Solução |
|---|---|---|
| jQuery não encontra campo desabilitado | `setEnabled` adiciona `_` no `name` e `id` | Usar seletores que considerem o prefixo `_` |
| Usuário altera campo via inspetor do navegador | Campo desabilitado sem proteção | Usar `setEnhancedSecurityHiddenInputs(true)` ANTES dos `setEnabled` |
| Proteção não funciona fora de processo | `setEnhancedSecurityHiddenInputs` só funciona em contexto de workflow | Para formulários avulsos, usar `setEnabled("campo", false, true)` |

> **Regra Jynx:** sempre chamar `form.setEnhancedSecurityHiddenInputs(true)` como primeira linha do enableFields.

---

## 6. inputFields

Disparado **antes da gravação** dos dados. Serve para **tratar/transformar** dados que vêm do navegador antes de persistir.

### Quando usar

- Padronizar formato de datas (Chrome envia `yyyy-mm-dd`, outros enviam `dd/mm/yyyy`)
- Preencher campos hidden com dados calculados
- Normalizar dados antes de salvar

### Assinatura

```javascript
function inputFields(form) {
    // form: FormController
}
```

### 6.1 Padronizar datas

```javascript
function inputFields(form) {
    var campos_data = ["dt_solicitacao", "dt_prazo", "dt_aprovacao"];
    var regEx = /^\d{4}-\d{2}-\d{2}$/;

    for (var i = 0; i < campos_data.length; i++) {
        var valor = form.getValue(campos_data[i]);
        if (valor && valor.match(regEx)) {
            var split = valor.split("-");
            form.setValue(campos_data[i], split[2] + "/" + split[1] + "/" + split[0]);
        }
    }
}
```

### 6.2 Armadilhas do inputFields

| Problema | Causa | Solução |
|---|---|---|
| `getValue("WKNumState")` não funciona | `getValue` global não está disponível neste evento | Usar `form.getValue()` para campos do formulário |
| Não executa na movimentação em bloco | Comportamento padrão da plataforma | Validar dados críticos também no `validateForm` |

---

## 7. validateForm

Último evento antes da gravação. Serve para **validar regras de negócio**. Se a validação falhar, `throw` bloqueia o envio e exibe mensagem ao usuário.

### Quando usar

- Campos obrigatórios condicionais (ex.: justificativa obrigatória se valor > 50.000)
- Validar totalização de tabela pai-filho
- Validar formato/consistência de dados
- Qualquer regra de negócio que impeça a movimentação

### Assinatura

```javascript
function validateForm(form) {
    // form: FormController
    // throw "mensagem" para bloquear envio
}
```

### 7.1 Validação simples

```javascript
function validateForm(form) {
    if (!form.getValue("txt_solicitante") || form.getValue("txt_solicitante") == "") {
        throw "O campo Solicitante é obrigatório.";
    }

    if (!form.getValue("txta_descricao") || form.getValue("txta_descricao") == "") {
        throw "O campo Descrição é obrigatório.";
    }
}
```

### 7.2 Validação condicional por atividade

```javascript
function validateForm(form) {
    var state = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");

    // Só validar ao completar tarefa (não ao salvar rascunho)
    if (completTask != "true") {
        return;
    }

    // ── Atividade 1: campos de abertura ──
    if (state == 1) {
        if (!form.getValue("txt_solicitante") || form.getValue("txt_solicitante") == "") {
            throw "O campo Solicitante é obrigatório.";
        }
        if (!form.getValue("dt_solicitacao") || form.getValue("dt_solicitacao") == "") {
            throw "A Data da Solicitação é obrigatória.";
        }
    }

    // ── Atividade 2: campos de aprovação ──
    if (state == 2) {
        if (!form.getValue("slc_decisao") || form.getValue("slc_decisao") == "") {
            throw "Selecione uma decisão (Aprovar/Reprovar).";
        }
        if (!form.getValue("txta_parecer") || form.getValue("txta_parecer") == "") {
            throw "O Parecer é obrigatório.";
        }
    }
}
```

### 7.3 Validação de tabela pai-filho

```javascript
function validateForm(form) {
    var state = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");

    if (completTask != "true") { return; }

    if (state == 1) {
        var indexes = form.getChildrenIndexes("itensCompra");

        // Pelo menos 1 item
        if (!indexes || indexes.length == 0) {
            throw "Adicione pelo menos um item na tabela de compras.";
        }

        var total = 0;
        for (var i = 0; i < indexes.length; i++) {
            var produto = form.getValue("txt_produto___" + indexes[i]);
            var quantidade = parseInt(form.getValue("nb_quantidade___" + indexes[i]));
            var vlr = parseFloat(form.getValue("nb_vlr_unitario___" + indexes[i]));

            if (!produto || produto == "") {
                throw "Preencha o produto na linha " + (i + 1) + ".";
            }
            if (isNaN(quantidade) || quantidade <= 0) {
                throw "Quantidade inválida na linha " + (i + 1) + ".";
            }
            if (isNaN(vlr) || vlr <= 0) {
                throw "Valor unitário inválido na linha " + (i + 1) + ".";
            }

            total = total + (quantidade * vlr);
        }

        if (total > 50000) {
            if (!form.getValue("txta_justificativa") || form.getValue("txta_justificativa") == "") {
                throw "Para valores acima de R$ 50.000, a justificativa é obrigatória.";
            }
        }
    }
}
```

### 7.4 Mensagem com quebra de linha

```javascript
function validateForm(form) {
    var erros = [];

    if (!form.getValue("txt_solicitante") || form.getValue("txt_solicitante") == "") {
        erros.push("- Solicitante é obrigatório");
    }
    if (!form.getValue("dt_solicitacao") || form.getValue("dt_solicitacao") == "") {
        erros.push("- Data da Solicitação é obrigatória");
    }

    if (erros.length > 0) {
        throw "Corrija os seguintes erros:\n" + erros.join("\n");
    }
}
```

> Use `\n` para quebra de linha na mensagem do `throw`.

---

## 8. Acessando datasets nos eventos

Todos os eventos de formulário podem consultar datasets:

```javascript
function displayFields(form, customHTML) {
    // Buscar usuário pelo login
    var login = getValue("WKUser");
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("colleague", null, [c1], null);

    if (ds.rowsCount > 0) {
        form.setValue("txt_solicitante", ds.getValue(0, "colleagueName"));
    }
}
```

**API de Datasets disponível nos eventos:**

| Método | Descrição |
|---|---|
| `DatasetFactory.getDataset(dsName, fields, constraints, order)` | Consulta dataset |
| `DatasetFactory.createConstraint(field, initialValue, finalValue, type)` | Cria filtro |
| `ConstraintType.MUST` | Filtro obrigatório (AND) |
| `ConstraintType.SHOULD` | Filtro opcional (OR) |
| `ConstraintType.MUST_NOT` | Filtro de exclusão (NOT) |

---

## 9. Logs

Use logs para rastreamento e debug. O Fluig disponibiliza a variável global `log`:

```javascript
log.info("Mensagem informativa");
log.warn("Alerta de possível problema");
log.debug("Debug detalhado");
log.error("Erro encontrado");
log.dir(objeto);  // log.info de objetos complexos
```

**Padrão Jynx para logs nos eventos:**

```javascript
function validateForm(form) {
    var state = getValue("WKNumState");
    var processId = getValue("WKNumProces");
    log.info("[validateForm] Processo: " + processId + " | Atividade: " + state);

    // ... validações ...
}
```

---

## 10. Template completo — Eventos de formulário

Modelo pronto para colar e adaptar:

```javascript
// ╔══════════════════════════════════════════════════════════════╗
// ║  EVENTOS DE FORMULÁRIO — [NomeDoFormulario]                  ║
// ║  Processo: [NomeDoProcesso]                                  ║
// ║  Atividades: 0=Início, 1=Abertura, 2=Aprovação, 4=Conclusão ║
// ╚══════════════════════════════════════════════════════════════╝

// ── beforeProcessing ──────────────────────────────────────────
function beforeProcessing(form) {
    // Apenas leitura. Não usar form.setValue() aqui.
}

// ── displayFields ─────────────────────────────────────────────
function displayFields(form, customHTML) {
    var state = getValue("WKNumState");
    var mode = form.getFormMode();
    var user = getValue("WKUser");

    // Preenchimento automático na abertura
    if (mode != "VIEW") {
        if (state == 0 || state == 1) {
            form.setValue("txt_solicitante", _buscarNomeUsuario(user));
            form.setValue("hd_login_solicitante", user);
            form.setValue("dt_solicitacao", _retornaDataAtual());
        }
    }

    // Controle de visibilidade por atividade
    if (state == 0 || state == 1) {
        customHTML.append("<script>");
        customHTML.append("$('.pnl_parecer, .pnl_status_banner').addClass('hide');");
        customHTML.append("</script>");
    }
    if (state == 2) {
        customHTML.append("<script>");
        customHTML.append("$('.pnl_status_banner').addClass('hide');");
        customHTML.append("</script>");
    }
}

// ── enableFields ──────────────────────────────────────────────
function enableFields(form) {
    var state = parseInt(getValue("WKNumState"));
    form.setEnhancedSecurityHiddenInputs(true);

    if (state >= 2) {
        form.setEnabled("txt_solicitante", false);
        form.setEnabled("dt_solicitacao", false);
        form.setEnabled("slc_departamento", false);
        form.setEnabled("txta_descricao", false);
    }
}

// ── inputFields ───────────────────────────────────────────────
function inputFields(form) {
    var campos_data = ["dt_solicitacao", "dt_prazo"];
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    for (var i = 0; i < campos_data.length; i++) {
        var valor = form.getValue(campos_data[i]);
        if (valor && valor.match(regEx)) {
            var split = valor.split("-");
            form.setValue(campos_data[i], split[2] + "/" + split[1] + "/" + split[0]);
        }
    }
}

// ── validateForm ──────────────────────────────────────────────
function validateForm(form) {
    var state = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");
    var processId = getValue("WKNumProces");

    log.info("[validateForm] Processo: " + processId + " | Atividade: " + state);

    if (completTask != "true") { return; }

    if (state == 1) {
        if (!form.getValue("txt_solicitante") || form.getValue("txt_solicitante") == "") {
            throw "O campo Solicitante é obrigatório.";
        }
    }

    if (state == 2) {
        if (!form.getValue("slc_decisao") || form.getValue("slc_decisao") == "") {
            throw "Selecione uma decisão.";
        }
    }
}

// ── Funções auxiliares ────────────────────────────────────────
function _retornaDataAtual() {
    return (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new java.util.Date());
}

function _buscarNomeUsuario(login) {
    try {
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST);
        var ds = DatasetFactory.getDataset("colleague", null, [c1], null);
        if (ds.rowsCount > 0) {
            return ds.getValue(0, "colleagueName");
        }
    } catch (e) {
        log.error("[_buscarNomeUsuario] Erro: " + e.message);
    }
    return "";
}
```

---

## 11. Checklist de publicação

```
□ Todos os eventos em Rhino ES5 (sem let/const/arrow/Promise)
□ displayFields controla visibilidade de TODOS os states do processo
□ displayFields tem tratamento para states não mapeados (segurança)
□ enableFields chama setEnhancedSecurityHiddenInputs(true) primeiro
□ validateForm verifica WKCompletTask antes de validar (não bloquear salvamento de rascunho)
□ validateForm tem validações por atividade (state)
□ inputFields padroniza datas se formulário usa campos de data
□ Mensagens de throw são claras e orientam o usuário
□ Logs com contexto (processId, atividade) nos eventos críticos
□ Funções auxiliares com try/catch (especialmente chamadas a dataset)
□ Nomes de campos usam prefixos Jynx (txt_, nb_, slc_, dt_, etc.)
□ Classes de painéis usam prefixo pnl_ nos seletores jQuery
□ Testado em cada atividade do processo (não apenas na abertura)
□ Testado em modo VIEW
□ Testado na movimentação em bloco (validateForm executa, displayFields não)
```