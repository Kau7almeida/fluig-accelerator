# 03-process-events.md — Eventos de Processo / Workflow

> **Consulte esta skill ao implementar eventos de processo (workflow) no Fluig.**
> Cobre: todos os eventos before/after, hAPI completa, getValue, globalVars, ServiceManager, notifier.
> Todos rodam no **server-side (Rhino ES5)**. Variável global: `hAPI`.

---

## 1. Visão geral

Eventos de processo são scripts executados pelo servidor durante o ciclo de vida de uma solicitação workflow. Diferente dos eventos de formulário (que usam `form`), aqui a variável principal é `hAPI`.

### 1.1 Eventos disponíveis

| Evento | Quando executa | Parâmetros |
|---|---|---|
| `beforeStateEntry(sequenceId)` | Antes de entrar em uma atividade | `sequenceId`: nº da atividade destino |
| `afterStateEntry(sequenceId)` | Após entrar em uma atividade | `sequenceId`: nº da atividade destino |
| `beforeTaskCreate(colleagueId)` | Antes de criar a tarefa para o usuário | `colleagueId`: login do usuário |
| `afterTaskCreate(colleagueId)` | Após criar a tarefa para o usuário | `colleagueId`: login do usuário |
| `beforeTaskSave(colleagueId, nextSequenceId, userList)` | Antes de salvar/movimentar a tarefa | `colleagueId`: login, `nextSequenceId`: atividade destino, `userList`: lista de usuários |
| `afterTaskSave(colleagueId, nextSequenceId, userList)` | Após salvar/movimentar a tarefa | mesmos parâmetros |
| `beforeTaskComplete(colleagueId, nextSequenceId, userList)` | Antes de completar a tarefa | mesmos parâmetros |
| `afterTaskComplete(colleagueId, nextSequenceId, userList)` | Após completar a tarefa | mesmos parâmetros |
| `beforeProcessCreate` | Antes de criar a solicitação | sem parâmetros |
| `afterProcessCreate` | Após criar a solicitação | sem parâmetros |
| `beforeProcessFinish` | Antes de finalizar o processo | sem parâmetros |
| `afterProcessFinish` | Após finalizar o processo | sem parâmetros |
| `onNotify(eventKey)` | Ao enviar notificação | `eventKey`: chave do evento |
| `calculateAgreement(processId)` | Cálculo de consenso | `processId`: nº da solicitação |
| `afterReleaseVersion` | Após liberar nova versão do processo | sem parâmetros |
| `checkComplementsPermission` | Verifica permissão de complementos | sem parâmetros |

### 1.2 Ordem de execução típica

```
Usuário clica "Enviar"
       │
       ▼
  beforeTaskSave          ← validar, bloquear com throw
       │
       ▼
  beforeTaskComplete      ← última chance antes de completar
       │
       ▼
  afterTaskComplete       ← tarefa completada, dados já salvos
       │
       ▼
  beforeStateEntry        ← antes de entrar na próxima atividade
       │
       ▼
  afterStateEntry         ← entrou na atividade destino
       │
       ▼
  beforeTaskCreate        ← antes de criar tarefa para próximo usuário
       │
       ▼
  afterTaskCreate         ← tarefa criada, pode alterar prazo
```

**Ao iniciar nova solicitação:**
```
beforeProcessCreate → afterProcessCreate → beforeStateEntry → ...
```

**Ao finalizar processo:**
```
... → beforeProcessFinish → afterProcessFinish
```

### 1.3 Regras gerais

- **Rhino ES5** obrigatório
- `hAPI` disponível em **todos** os eventos de processo
- `getValue()` disponível em todos os eventos para propriedades do workflow
- `hAPI.getCardValue()` / `hAPI.setCardValue()` — **não funciona na primeira atividade** (state 0). Disponível a partir da segunda atividade
- `throw "mensagem"` em eventos `before` → bloqueia a ação e exibe mensagem ao usuário
- Eventos `after` → dados já foram salvos, ideal para integrações e notificações
- Não é necessário criar todos os eventos — apenas os que precisa

---

## 2. hAPI — Referência completa

### 2.1 Campos do formulário

| Método | Descrição |
|---|---|
| `hAPI.getCardValue("campo")` | Lê valor do campo do formulário. Checkbox retorna `"on"` ou `""` |
| `hAPI.setCardValue("campo", "valor")` | Define valor do campo do formulário |
| `hAPI.getCardData(numProcesso)` | Retorna Map com TODOS os campos/valores de uma solicitação |
| `hAPI.getChildrenIndexes("tabela")` | Retorna array com índices das linhas da tabela pai-filho |
| `hAPI.addCardChild("tabela", mapDados)` | Adiciona linha na tabela pai-filho |
| `hAPI.removeCardChild("tabela", indice)` | Remove linha da tabela pai-filho (disponível a partir de 1.8.1) |

> **Atenção `getCardValue`/`setCardValue`:** não funciona na inicialização do processo (state 0). Disponível a partir da segunda atividade.

> **Atenção `removeCardChild`:** ao remover em loop, percorrer de trás para frente (decrescente) pois os índices são resetados a cada remoção.

### 2.2 Fluxo e atividades

| Método | Descrição |
|---|---|
| `hAPI.getActiveStates()` | Lista de atividades ativas do processo |
| `hAPI.setAutomaticDecision(numAtiv, listaColab, "obs")` | **(Depreciado)** Define fluxo automático. Usar atividade de Serviço ou Gateway |
| `hAPI.startProcess(processId, ativDest, listaColab, "obs", completar, valoresForm, modoGestor)` | Inicia nova solicitação workflow |
| `hAPI.getAvailableStatesDetail(companyId, userId, processId, processInstanceId, threadSequence)` | Detalhes das atividades disponíveis |

### 2.3 Prazos

| Método | Descrição |
|---|---|
| `hAPI.setDueDate(numProcesso, numThread, "userId", dataConclusao, tempoSeg)` | Altera prazo de conclusão. Usar em `afterTaskCreate` |
| `hAPI.calculateDeadLineHours(data, segundos, prazo, periodId)` | Calcula prazo em horas com base no expediente |
| `hAPI.calculateDeadLineTime(data, segundos, prazo, periodId)` | Calcula prazo em minutos com base no expediente |

### 2.4 Anexos

| Método | Descrição |
|---|---|
| `hAPI.listAttachments()` | Lista anexos da solicitação (retorna DocumentDto[]) |
| `hAPI.publishWorkflowAttachment(documento)` | Publica anexo workflow no GED |
| `hAPI.attachDocument(documentId)` | Anexa documento do GED à solicitação |

### 2.5 Subprocessos e observações

| Método | Descrição |
|---|---|
| `hAPI.setTaskComments("userId", numProcesso, numThread, "obs")` | Define observação. Usar em eventos `after` |
| `hAPI.getChildrenInstances(numProcesso)` | Lista solicitações filhas |
| `hAPI.getParentInstance(numProcesso)` | Retorna nº da solicitação pai |
| `hAPI.createAdHocTasks(processInstanceId, sequenceId, assunto, detalhamento, listaTarefas)` | Cria tarefas ad-hoc |
| `hAPI.getUserTaskLink(numAtiv)` | Retorna link para movimentação da atividade |
| `hAPI.getAdvancedProperty("propriedade")` | Retorna valor de propriedade avançada do processo |

### 2.6 Outros

| Método | Descrição |
|---|---|
| `hAPI.setColleagueReplacement("userId")` | Define usuário substituto |

---

## 3. getValue — Propriedades do workflow

A função global `getValue()` acessa propriedades da solicitação em qualquer evento de processo:

| Propriedade | Descrição |
|---|---|
| `getValue("WKNumProces")` | Número da solicitação |
| `getValue("WKNumState")` | Número da atividade atual |
| `getValue("WKCurrentState")` | Atividade atual (em eventos after, pode ser diferente de WKNumState) |
| `getValue("WKNextState")` | Próxima atividade |
| `getValue("WKUser")` | Login do usuário logado |
| `getValue("WKCompany")` | Código da empresa |
| `getValue("WKDef")` | Código do processo |
| `getValue("WKCompletTask")` | `"true"` se completando tarefa, `"false"` se salvando |
| `getValue("WKIsTransfer")` | `"true"` se é transferência de tarefa |
| `getValue("WKMobile")` | `"true"` se ação via mobile |
| `getValue("WKManagerMode")` | `"true"` se modo gestor |

### globalVars

Mapa global (`Map<String, String>`) disponível em **todos** os eventos do processo para passar dados entre eventos da mesma execução:

```javascript
// Em um evento
globalVars.put("meuDado", "valor123");

// Em outro evento da mesma execução
var dado = globalVars.get("meuDado"); // "valor123"
```

---

## 4. Eventos mais usados — Exemplos

### 4.1 beforeTaskSave

O evento mais usado para **validações** em processos. Executado antes de salvar/movimentar.

```javascript
function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var state = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");
    var processId = getValue("WKNumProces");

    log.info("[beforeTaskSave] Processo: " + processId + " | Atividade: " + state + " → " + nextSequenceId);

    // Só validar ao completar (não ao salvar rascunho)
    if (completTask != "true") { return; }

    // ── Atividade 1: validar campos da abertura ──
    if (state == 1) {
        var solicitante = hAPI.getCardValue("txt_solicitante");
        if (!solicitante || solicitante == "") {
            throw "O campo Solicitante é obrigatório.";
        }

        var valor = parseFloat(hAPI.getCardValue("nb_valor"));
        if (isNaN(valor) || valor <= 0) {
            throw "Informe um valor válido.";
        }
    }

    // ── Atividade 2: validar parecer ──
    if (state == 2) {
        var decisao = hAPI.getCardValue("slc_decisao");
        if (!decisao || decisao == "") {
            throw "Selecione uma decisão (Aprovar/Reprovar).";
        }
    }
}
```

### 4.2 afterTaskComplete

Executado **após** a tarefa ser completada. Dados já salvos — ideal para integrações e notificações.

```javascript
function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    var state = getValue("WKNumState");
    var processId = getValue("WKNumProces");

    log.info("[afterTaskComplete] Processo: " + processId + " | " + state + " → " + nextSequenceId);

    // ── Após aprovação: notificar solicitante ──
    if (state == 2 && nextSequenceId == 4) {
        try {
            var solicitante = hAPI.getCardValue("hd_login_solicitante");
            _notificarUsuario(solicitante, processId, "Sua solicitação foi aprovada.");
        } catch (e) {
            log.error("[afterTaskComplete] Erro ao notificar: " + e.message);
        }
    }
}

function _notificarUsuario(destinatario, processId, mensagem) {
    var destinatarios = new java.util.ArrayList();
    destinatarios.add(destinatario);

    var parametros = new java.util.HashMap();
    parametros.put("WDK_CompanyId", getValue("WKCompany"));
    parametros.put("mensagem", mensagem);
    parametros.put("numProcesso", processId);

    notifier.notify(getValue("WKUser"), "tplNotificacao", parametros, destinatarios, "text/html");
}
```

### 4.3 beforeStateEntry

Executado **antes de entrar** na atividade destino. Usado para preencher campos automaticamente, iniciar subprocessos, manipular pai-filho.

```javascript
function beforeStateEntry(sequenceId) {
    var processId = getValue("WKNumProces");

    log.info("[beforeStateEntry] Processo: " + processId + " | Entrando na atividade: " + sequenceId);

    // ── Atividade 4: preencher campo de data de conclusão ──
    if (sequenceId == 4) {
        var dataAtual = (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new java.util.Date());
        hAPI.setCardValue("dt_conclusao", dataAtual);
    }

    // ── Atividade 3: adicionar linha no pai-filho ──
    if (sequenceId == 3) {
        var childData = new java.util.HashMap();
        childData.put("txt_item", "Item gerado automaticamente");
        childData.put("nb_quantidade", "1");
        hAPI.addCardChild("itensCompra", childData);
    }
}
```

### 4.4 afterTaskCreate

Executado **após criar a tarefa** para o usuário. Ideal para alterar prazos.

```javascript
function afterTaskCreate(colleagueId) {
    var state = getValue("WKCurrentState");
    var processId = getValue("WKNumProces");

    // ── Atividade 2: prazo de 48h para aprovação ──
    if (state == 2) {
        try {
            var data = new java.util.Date();
            var obj = hAPI.calculateDeadLineHours(data, 0, 48, "Default");
            var dtPrazo = obj[0];
            var segundos = obj[1];
            hAPI.setDueDate(processId, 0, colleagueId, dtPrazo, segundos);
            log.info("[afterTaskCreate] Prazo definido para 48h | Processo: " + processId);
        } catch (e) {
            log.error("[afterTaskCreate] Erro ao definir prazo: " + e.message);
        }
    }
}
```

### 4.5 afterProcessFinish

Executado ao **finalizar o processo**. Ideal para integrações finais com ERPs ou registros de auditoria.

```javascript
function afterProcessFinish() {
    var processId = getValue("WKNumProces");

    log.info("[afterProcessFinish] Processo finalizado: " + processId);

    try {
        // Exemplo: enviar dados para ERP
        var valor = hAPI.getCardValue("nb_valor");
        var solicitante = hAPI.getCardValue("txt_solicitante");
        log.info("[afterProcessFinish] Valor: " + valor + " | Solicitante: " + solicitante);

        // _enviarParaERP(processId, valor, solicitante);
    } catch (e) {
        log.error("[afterProcessFinish] Erro: " + e.message);
    }
}
```

### 4.6 beforeTaskCreate — Bloquear transferência

```javascript
function beforeTaskCreate(colleagueId) {
    var isTransfer = getValue("WKIsTransfer");
    if (isTransfer !== null && isTransfer !== "") {
        if (JSON.parse(isTransfer)) {
            throw "Não é permitido transferir esta atividade.";
        }
    }
}
```

---

## 5. Validação de pai-filho em eventos de processo

```javascript
function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var completTask = getValue("WKCompletTask");
    if (completTask != "true") { return; }

    var state = getValue("WKNumState");

    if (state == 1) {
        var indexes = hAPI.getChildrenIndexes("itensCompra");

        if (!indexes || indexes.length == 0) {
            throw "Adicione pelo menos um item.";
        }

        var total = 0;
        for (var i = 0; i < indexes.length; i++) {
            var qtd = parseInt(hAPI.getCardValue("nb_quantidade___" + indexes[i]));
            var vlr = parseFloat(hAPI.getCardValue("nb_vlr_unitario___" + indexes[i]));

            if (isNaN(qtd) || qtd <= 0) {
                throw "Quantidade inválida na linha " + (i + 1) + ".";
            }
            total = total + (qtd * (isNaN(vlr) ? 0 : vlr));
        }

        log.info("[beforeTaskSave] Total dos itens: " + total);
    }
}
```

---

## 6. Remoção de linhas pai-filho

Ao remover linhas em loop, **percorrer de trás para frente** porque os índices são resetados a cada remoção:

```javascript
function beforeStateEntry(sequenceId) {
    if (sequenceId == 3) {
        var indexes = hAPI.getChildrenIndexes("itensCompra");

        // CORRETO: de trás para frente
        for (var i = indexes.length - 1; i >= 0; i--) {
            var status = hAPI.getCardValue("slc_status___" + indexes[i]);
            if (status == "cancelado") {
                hAPI.removeCardChild("itensCompra", indexes[i]);
            }
        }
    }
}
```

---

## 7. Iniciar subprocesso via hAPI

```javascript
function beforeStateEntry(sequenceId) {
    if (sequenceId == 5) {
        var users = new java.util.ArrayList();
        users.add("Pool:Role:papelAprovador");

        var formData = new java.util.HashMap();
        formData.put("txt_origem", "Processo Pai: " + getValue("WKNumProces"));
        formData.put("nb_valor", hAPI.getCardValue("nb_valor"));

        var resultado = hAPI.startProcess("SolicitacaoAprovacao", 2, users, "Iniciado automaticamente", true, formData, false);
        var numNovasolicitacao = resultado.get("iProcess");
        log.info("[beforeStateEntry] Subprocesso criado: " + numNovasolicitacao);
    }
}
```

---

## 8. Integração com serviços nos eventos

Eventos de processo podem consumir WebServices e datasets:

### 8.1 Dataset

```javascript
function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    var cnpj = hAPI.getCardValue("txt_cnpj");

    try {
        var c1 = DatasetFactory.createConstraint("cnpj", cnpj, cnpj, ConstraintType.MUST);
        var ds = DatasetFactory.getDataset("dsFornecedores", null, [c1], null);

        if (ds.rowsCount > 0) {
            hAPI.setCardValue("txt_razao_social", ds.getValue(0, "razaoSocial"));
        }
    } catch (e) {
        log.error("[afterTaskComplete] Erro ao buscar fornecedor: " + e.message);
    }
}
```

### 8.2 ServiceManager (WebService)

```javascript
function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    if (nextSequenceId == 4) {
        try {
            // "CodigoServico" = código do serviço cadastrado no Fluig
            var serviceProvider = ServiceManager.getServiceInstance("CodigoServico");
            var serviceLocator = serviceProvider.instantiate("com.example.ServiceLocator");
            var service = serviceLocator.getServicePort();

            var resultado = service.metodoDoServico(hAPI.getCardValue("txt_parametro"));
            log.info("[afterTaskComplete] Resultado WS: " + resultado);
        } catch (e) {
            log.error("[afterTaskComplete] Erro WS: " + e.message);
        }
    }
}
```

> Para integrações mais complexas (REST, SOAP com payload), consulte `06-service-tasks.md`.

---

## 9. Notificações (notifier)

```javascript
function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    if (nextSequenceId == 4) {
        try {
            var destinatarios = new java.util.ArrayList();
            destinatarios.add(hAPI.getCardValue("hd_login_solicitante"));

            var parametros = new java.util.HashMap();
            parametros.put("WDK_CompanyId", getValue("WKCompany"));
            parametros.put("WDK_TaskLink", hAPI.getUserTaskLink(nextSequenceId));
            parametros.put("nomeProcesso", "Solicitação de Compras");
            parametros.put("numProcesso", getValue("WKNumProces"));

            notifier.notify(
                getValue("WKUser"),        // remetente
                "tplAprovacao",            // código do template de notificação
                parametros,                // parâmetros do template
                destinatarios,             // lista de destinatários
                "text/html"                // tipo de conteúdo
            );

            log.info("[afterTaskComplete] Notificação enviada.");
        } catch (e) {
            log.error("[afterTaskComplete] Erro notificação: " + e.message);
        }
    }
}
```

> **Atenção `getUserTaskLink`:** não retorna link para atividades que ainda não foram criadas. Usar apenas para atividades já existentes.

---

## 10. Publicar anexos no GED

```javascript
function beforeStateEntry(sequenceId) {
    if (sequenceId == 4) {
        try {
            var calendar = java.util.Calendar.getInstance().getTime();
            var docs = hAPI.listAttachments();

            for (var i = 0; i < docs.size(); i++) {
                var doc = docs.get(i);

                // Tipo 7 = anexo workflow
                if (doc.getDocumentType() != "7") { continue; }

                doc.setParentDocumentId(27); // ID da pasta destino no GED
                doc.setVersionDescription("Processo: " + getValue("WKNumProces"));
                doc.setExpires(false);
                doc.setCreateDate(calendar);
                doc.setInheritSecurity(true);
                doc.setTopicId(1);
                doc.setUserNotify(false);
                doc.setValidationStartDate(calendar);
                doc.setVersionOption("0");
                doc.setUpdateIsoProperties(true);

                hAPI.publishWorkflowAttachment(doc);
                log.info("[beforeStateEntry] Anexo publicado: " + doc.getDocumentDescription());
            }
        } catch (e) {
            log.error("[beforeStateEntry] Erro ao publicar anexo: " + e.message);
        }
    }
}
```

---

## 11. Template completo — Eventos de processo

```javascript
// ╔══════════════════════════════════════════════════════════════╗
// ║  EVENTOS DE PROCESSO — [NomeDoProcesso]                      ║
// ║  Atividades: 1=Abertura, 2=Aprovação, 4=Conclusão           ║
// ╚══════════════════════════════════════════════════════════════╝

// ── beforeTaskSave ────────────────────────────────────────────
function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var state = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");
    var processId = getValue("WKNumProces");

    log.info("[beforeTaskSave] Processo: " + processId + " | " + state + " → " + nextSequenceId);

    if (completTask != "true") { return; }

    // Validações por atividade
    if (state == 1) {
        if (!hAPI.getCardValue("txt_solicitante") || hAPI.getCardValue("txt_solicitante") == "") {
            throw "O campo Solicitante é obrigatório.";
        }
    }

    if (state == 2) {
        if (!hAPI.getCardValue("slc_decisao") || hAPI.getCardValue("slc_decisao") == "") {
            throw "Selecione uma decisão.";
        }
    }
}

// ── afterTaskComplete ─────────────────────────────────────────
function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    var state = getValue("WKNumState");
    var processId = getValue("WKNumProces");

    log.info("[afterTaskComplete] Processo: " + processId + " | " + state + " → " + nextSequenceId);

    // Integrações e notificações aqui
}

// ── beforeStateEntry ──────────────────────────────────────────
function beforeStateEntry(sequenceId) {
    var processId = getValue("WKNumProces");

    log.info("[beforeStateEntry] Processo: " + processId + " | Entrando: " + sequenceId);

    // Preenchimento automático de campos
    if (sequenceId == 4) {
        var dataAtual = (new java.text.SimpleDateFormat("dd/MM/yyyy")).format(new java.util.Date());
        hAPI.setCardValue("dt_conclusao", dataAtual);
    }
}

// ── afterTaskCreate ───────────────────────────────────────────
function afterTaskCreate(colleagueId) {
    var state = getValue("WKCurrentState");
    var processId = getValue("WKNumProces");

    log.info("[afterTaskCreate] Processo: " + processId + " | Atividade: " + state + " | Usuário: " + colleagueId);

    // Alterar prazo se necessário
}

// ── afterProcessFinish ────────────────────────────────────────
function afterProcessFinish() {
    var processId = getValue("WKNumProces");
    log.info("[afterProcessFinish] Processo finalizado: " + processId);

    // Integração final com ERP, auditoria, etc.
}
```

---

## 12. Checklist de publicação

```
□ Todos os eventos em Rhino ES5 (sem let/const/arrow/Promise)
□ hAPI.getCardValue/setCardValue NÃO usados na atividade 0 (início)
□ beforeTaskSave verifica WKCompletTask antes de validar
□ Validações separadas por atividade (state)
□ Eventos after usados para integrações (não before)
□ try/catch em TODA integração (dataset, WS, notifier)
□ Logs com contexto: [nomeEvento] Processo: X | Atividade: Y
□ throw com mensagens claras e orientativas
□ removeCardChild em loop percorre de trás para frente
□ Nomes de campos usam prefixos Jynx (txt_, nb_, slc_, dt_, etc.)
□ Testado em cada atividade do processo
□ Testado salvando rascunho (WKCompletTask = false)
□ Testado em movimentação em bloco
□ Testado com transferência de tarefa (se aplicável)
□ ServiceManager com try/catch e log de erro
```