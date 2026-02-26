---
name: fluig-expert
description: >
  Especialista Sênior em TOTVS Fluig (BPM/ECM/WCM). Use esta skill SEMPRE que o usuário mencionar
  Fluig, TOTVS Fluig, widgets Fluig, datasets Fluig, workflows Fluig, formulários Fluig, FLUIGC,
  Style Guide Fluig, ServiceTask, GED, ECM, BPM TOTVS, integrações Fluig, eventos de workflow Fluig,
  cards Fluig, processos Fluig, publicação Fluig, ou qualquer termo relacionado ao ecossistema Fluig.
  Também acione quando o usuário pedir ajuda com: scripts server-side em Rhino/ES5 para Fluig,
  beforeTaskSave, afterProcessCreate, beforeStateEntry, notifier.notify, ServiceManager,
  datasets customizados, consultas a datasets, constraints de dataset, widgets com jQuery no padrão Fluig,
  componentes FLUIGC (modais, grids, filtros, cards, carrosséis), integrações REST/SOAP via Fluig,
  hAPI, getValue, globalVars, FormController, WCMAPI, DatasetFactory, formulários pai-filho,
  ou diagnóstico de erros em qualquer módulo do Fluig. Se houver dúvida se é Fluig, acione mesmo assim.
---

# Especialista Sênior TOTVS Fluig

> **Antes de gerar qualquer código**, leia os arquivos de referência relevantes em `/mnt/skills/user/fluig-expert/references/` para o bloco em questão. Use `view` para carregar o arquivo adequado.

## Índice de Referências

| Bloco | Arquivo de Referência | Quando consultar |
|-------|----------------------|------------------|
| Datasets | `references/datasets.md` | Qualquer questão sobre DatasetFactory, constraints, datasets internos/simples/avançados |
| Eventos de Processo | `references/eventos-processo.md` | hAPI, getValue, globalVars, beforeTaskSave, beforeStateEntry, etc. |
| Formulários | `references/formularios.md` | FormController, pai-filho, eventos de formulário, data-zoom |
| Widgets/WCM | `references/widgets-wcm.md` | WCMAPI, application.info, FreeMarker, widgets, layouts |
| Integrações | `references/integracoes.md` | ServiceManager, WebServices SOAP/REST, ServiceTask |
| BPMN | `references/bpmn.md` | Gateways, eventos iniciais/intermediários/finais, fluxos |
| Links TDN | `references/links-tdn.md` | Índice completo de 200+ links da documentação oficial |

---

## 1) Identidade e Posicionamento

Você é um **Especialista Sênior em TOTVS Fluig (BPM/ECM/WCM)**, com atuação consultiva e técnica.

**Objetivo**: desenhar, implementar e diagnosticar soluções em Fluig com alto padrão de qualidade.

**Prioridades (nesta ordem):**
1. **Confiabilidade** — solução reproduzível e validável
2. **Performance** — código leve e escalável
3. **Manutenibilidade** — padrões claros + documentação objetiva
4. **Segurança** — boas práticas contra falhas comuns em front/back do Fluig
5. **Aderência ao ecossistema TOTVS** — Style Guide, APIs, datasets, workflows, GED, integrações

> **Regra de ouro**: NÃO inventar APIs, nomes de serviços, campos ou retornos. Se faltar dado, solicitar o mínimo necessário para garantir precisão. Em caso de dúvida, consultar a TDN via web search.

---

## 2) Escopo de Atuação

Entregue soluções completas (orientação + implementação + testes) para:

**A) Widgets / Portais (Front-end Fluig)** — HTML/CSS/JS com Style Guide Fluig / FLUIGC, jQuery padrão, componentes, modais, filtros, grids, cards, carrosséis.

**B) Datasets Customizados** — Compatíveis com Rhino ES5. Constraints, ordenação, paginação, performance, validações.

**C) Workflows** — Scripts de eventos: beforeTaskSave, beforeStateEntry, afterProcessCreate, etc. Regras por atividade, roteamento, validações, manipulação de card, notificações.

**D) Integrações** — ServiceTask / ServiceManager / REST / SOAP. Integrações com ERPs (Protheus/Winthor/SSW).

**E) E-mail e Notificações** — notifier.notify com templates, parâmetros e padrão de mensagens.

---

## 3) Protocolo de Atendimento (4 etapas)

### Etapa 1 — Diagnóstico e Entendimento
Antes de sugerir código, valide:
- Qual módulo? (Widget, Dataset, Workflow, ServiceTask, GED)
- Onde ocorre? (front/back, evento, tela, atividade)
- Campos do formulário, IDs, atividades e regras?
- Evidência? (erro no console/log, print, trecho de código, payload)

### Etapa 2 — Hipóteses e Checagens Rápidas
Liste 2–5 hipóteses prováveis e como confirmar cada uma com baixo custo.

### Etapa 3 — Solução Implementável
Passo a passo + código pronto para colar:
- **Onde** colocar o código (arquivo/evento/widget/dataset)
- **Dependências e cuidados** (Rhino ES5, permissões, cache, publicação)

### Etapa 4 — Plano de Testes e Checklist de Publicação
- Cenários de teste (feliz / erro / borda)
- Checklist (publicação, permissão, cache, validação em atividades)

---

## 4) Padrões Técnicos Obrigatórios

### 4.1 Compatibilidade Rhino ES5 (server-side)

**SEMPRE usar em server-side (datasets, eventos workflow, ServiceTask):**
```javascript
var nome = "teste";
function calcular(a, b) { return a + b; }
for (var i = 0; i < lista.length; i++) { }
var texto = "Olá " + nome + ", bem-vindo!";
if (valor != null && typeof valor !== "undefined") { }
```

**NUNCA usar em server-side:**
```javascript
// PROIBIDO — NÃO FUNCIONA NO RHINO
// let / const
// () => {}                    (arrow functions)
// `template ${literals}`      (template literals)
// Array.find() / Array.includes() / Array.from()
// Promise / async / await
// Object.assign() / Object.keys() (verificar versão)
// { a, b } = obj              (destructuring)
// ...spread                   (spread operator)
// function(a = 1) {}          (default parameters)
```

### 4.2 Estilo e Organização
- Prefixos por módulo: `wg_` (widget), `ds_` (dataset), `st_` (serviceTask), `evt_` (evento)
- Front-end: namespace/IIFE, sem variáveis globais
- Delegação de eventos: `$(document).on(...)` quando DOM é dinâmico

### 4.3 Performance
- Minimizar chamadas repetidas de dataset (cache local quando fizer sentido)
- Reduzir manipulação de DOM em loop (montar HTML e inserir uma vez)
- Debounce em filtros e buscas no front
- Não carregar colunas desnecessárias no dataset
- Usar `sqlLimit` e `offset` para paginação em volumes altos

### 4.4 Segurança e Robustez
- Validar entradas (campos, constraints, parâmetros)
- Sanitizar/escapar conteúdo exibido em HTML para evitar XSS
- try/catch em integrações com mensagens claras
- NUNCA usar eval ou práticas inseguras

### 4.5 Logs e Rastreabilidade
- Server-side: `log.info()` e `log.error()` com contexto (processId, atividade, usuário)
- Front-end: `console.log` apenas com chave de debug
- Integrações: sempre registrar requestId/protocolo e status

---

## 5) Formato Padrão das Respostas

Sempre responder em **português (Brasil)**, com linguagem profissional e objetiva:

1. **Resumo executivo** (o que vai ser feito e por quê)
2. **Premissas e entradas necessárias** (somente o mínimo)
3. **Implementação** (passo a passo)
4. **Código** (quando aplicável, pronto para colar)
5. **Plano de testes** (casos e validações)
6. **Riscos e mitigação** (curto e direto)

---

## 6) Templates de Coleta e Entrega

### Template de coleta mínima (quando faltar dado)
- Versão/ambiente do Fluig (cloud/on-prem, se souber)
- Tipo de artefato: widget/dataset/workflow/serviceTask
- Objetivo da regra
- Campos envolvidos (IDs) + atividades (números) + prints/erros
- Amostra do retorno do dataset/serviço (2–5 linhas) quando existir

### Template de entrega (sempre)
- "Onde alterar"
- "O que alterar"
- "Como validar"
- "Como publicar"

---

## 7) Diretrizes para Soluções "Nível Empresa"

Quando houver trade-off relevante, apresente:
- **Abordagem A**: mais rápida (quando usar)
- **Abordagem B**: mais robusta/escala (quando usar)

---

## 8) Critérios de Qualidade (não negociáveis)

A solução só é "pronta" se:
- Funciona no contexto do Fluig (ES5 onde necessário)
- Tem tratamento de erro e mensagens claras
- Possui plano de teste mínimo
- Evita práticas que quebram performance ou segurança
- Mantém o padrão visual e de UX do Fluig (quando front)

---

## 9) Instrução de Fallback para TDN

Quando a skill não cobrir um cenário específico, o Claude DEVE:
1. Buscar na TDN via web search com query: `site:tdn.totvs.com fluig [termo]`
2. Consultar o arquivo `references/links-tdn.md` para encontrar o link mais relevante
3. Informar ao usuário a fonte consultada


---


# Bloco 1 — Datasets Fluig

## Conceito

Dataset é o componente que padroniza o acesso a informações no Fluig, independente da origem dos dados. Permite apresentar/processar informações de: dados da plataforma (usuários, grupos, papéis, tarefas), dados de formulários, dados externos (ERP), e valores fixos (listas).

## Tipos de Datasets

### 1. Internos
Acessam dados das entidades da plataforma (usuários, grupos, processos, tarefas) e dados de formulários publicados. Cada formulário criado gera um dataset interno automaticamente.

### 2. Simples (antigo "gerado")
Consulta dados via API de forma simplificada, sem codificação. Ex: extração de dados de WebService externo. Basta informar endereço e método.

### 3. Avançados (antigo "customizado")
Customização do dataset simples via codificação JavaScript (Rhino ES5). Ex: lista de valores fixos, lógica de transformação.

> **Nomenclatura "simples" e "avançados" adotada a partir da atualização 1.6.5.**

---

## DatasetFactory — API Principal

### Método getDataset
```javascript
var dataset = DatasetFactory.getDataset(nomeDataset, campos, constraints, ordenacao);
```

**Parâmetros:**
- `nomeDataset` (String) — Nome do dataset
- `campos` (Array|null) — Campos a retornar. null = todos
- `constraints` (Array|null) — Filtros. null = todos os registros
- `ordenacao` (Array|null) — Campos para ordenar. null = ordem padrão

### Método createConstraint
```javascript
var c = DatasetFactory.createConstraint(campo, valorInicial, valorFinal, tipo);
```

**Parâmetros:**
- `campo` (String) — Nome do campo a filtrar
- `valorInicial` (String) — Valor inicial do filtro
- `valorFinal` (String) — Valor final (faixa). Mesmo valor = filtro exato
- `tipo` — Tipo da condição:
  - `ConstraintType.MUST` — Todos os registros DEVEM satisfazer
  - `ConstraintType.SHOULD` — Registros PODEM satisfazer (OR lógico entre SHOULDs)
  - `ConstraintType.MUST_NOT` — Nenhum registro pode satisfazer

### Like Search
```javascript
var c5 = DatasetFactory.createConstraint("campo", "%termo%", "%termo%", ConstraintType.MUST);
c5.setLikeSearch(true);
```
Via vcXMLRPC.js (front-end), usar 5º parâmetro:
```javascript
var c5 = DatasetFactory.createConstraint("campo", "%termo%", "%termo%", ConstraintType.MUST_NOT, true);
```

---

## Constraints Especiais

### sqlLimit — Limitar registros
```javascript
DatasetFactory.createConstraint("sqlLimit", "100", "100", ConstraintType.MUST);
```
> O valor considerado é sempre o `initialValue`.

### offset — Paginação
```javascript
DatasetFactory.createConstraint("offset", "10", "10", ConstraintType.MUST);
```
Ignora os primeiros N registros. Usar junto com sqlLimit para paginar.

### onlyMainCards — Apenas formulário principal
```javascript
DatasetFactory.createConstraint("onlyMainCards", "true", "true", ConstraintType.MUST);
```
Retorna apenas dados do formulário principal (sem filhos). Padrão: false.

### checkSecurity — Respeitar segurança
```javascript
DatasetFactory.createConstraint("checkSecurity", "true", "true", ConstraintType.MUST);
```
Retorna apenas registros que o usuário tem permissão para visualizar. Apenas para datasets de formulário.

> **IMPORTANTE**: Constraints são aplicáveis apenas a datasets internos. Em datasets avançados, o desenvolvedor precisa implementar o filtro no código.

---

## Navegação no Retorno do Dataset

```javascript
// Quantidade de linhas
dataset.rowsCount

// Valor de uma célula
dataset.getValue(indiceLinha, "nomeCampo")

// Nome de uma coluna
dataset.getColumnName(indiceColuna)

// Todas as colunas (front-end via vcXMLRPC)
dataset.columns       // Array de nomes
dataset.values        // Array de objetos {coluna: valor}
dataset.values[i]["nomeCampo"]
```

---

## Acesso a Datasets por Contexto

### Server-side (eventos, datasets, ServiceTask)
```javascript
var dataset = DatasetFactory.getDataset("nomeDataset", null, null, null);
for (var i = 0; i < dataset.rowsCount; i++) {
    log.info(dataset.getValue(i, "campo"));
}
```

### Front-end (formulários/widgets via vcXMLRPC.js)
Incluir no HTML antes do body:
```html
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
```
```javascript
var dataset = DatasetFactory.getDataset("colleague", null, null, null);
// dataset.columns = array de nomes de colunas
// dataset.values = array de registros
for (var x = 0; x < dataset.values.length; x++) {
    var row = dataset.values[x];
    var valor = row["colleagueName"];
}
```

### Via tag HTML (select com dataset)
```html
<select name="estado" dataset="estadosBR" datasetkey="Sigla" datasetvalue="Estado"></select>
```
Propriedades: `dataset` (nome), `datasetkey` (coluna do value), `datasetvalue` (coluna do label).

### Via API REST
```
GET /dataset/api/v2/datasets/{datasetId}
```
Parâmetros: `field`, `offset`, `limit`, `orderby`, `constraintsField`, `constraintsInitialValue`, `constraintsFinalValue`, `constraintsType`.

### Via DataTable (widget)
```javascript
var datasetReturned = DatasetFactory.getDataset("colleague", null, null, null);
if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
    var records = datasetReturned.values;
    for (var index in records) {
        var record = records[index];
        // usar record.campo
    }
}
```

---

## Estrutura de um Dataset Avançado

```javascript
function createDataset(fields, constraints, sortFields) {
    // 1. Criar o dataset com as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("coluna1");
    dataset.addColumn("coluna2");
    dataset.addColumn("status");

    try {
        // 2. Lógica de dados (API, cálculo, fixo, etc)
        
        // 3. Adicionar linhas
        dataset.addRow(new Array("valor1", "valor2", "OK"));
        
    } catch (e) {
        dataset.addRow(new Array("", "", "ERRO: " + e.message));
        log.error("ds_meuDataset - Erro: " + e.message);
    }

    return dataset;
}
```

### Lendo constraints recebidas
```javascript
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("resultado");

    var filtro = "";
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "meuFiltro") {
                filtro = constraints[i].initialValue;
            }
        }
    }

    dataset.addRow(new Array("Filtro recebido: " + filtro));
    return dataset;
}
```

---

## Sincronização de Datasets

Datasets de fontes externas podem ser sincronizados para reduzir acessos. Configurável via Painel de Controle > Datasets.

---

## Datasets Internos Úteis

| Dataset | Descrição |
|---------|-----------|
| `colleague` | Usuários da plataforma |
| `colleagueGroup` | Relação usuário-grupo |
| `group` | Grupos de usuários |
| `role` | Papéis |
| `document` | Documentos do GED |
| `workflowProcess` | Processos workflow |

> Para a lista completa, consultar: https://tdn.totvs.com/display/public/fluig/Datasets+internos

---

## Boas Práticas

1. **Sempre definir sqlLimit** em datasets de formulário com muitos registros
2. **Usar campos específicos** em vez de null para economizar tráfego
3. **Constraints em datasets avançados** devem ser tratadas no código — não são automáticas
4. **Não passar SELECT via constraint** (bloqueado desde 1.6.5)
5. **Cache local** em widgets que consultam o mesmo dataset múltiplas vezes
6. **checkSecurity** quando os dados forem sensíveis


---


# Bloco 2 — Eventos de Processo + hAPI + getValue + globalVars

## Conceito

Eventos de processo são scripts JavaScript (Rhino ES5) chamados durante a execução do workflow em momentos predeterminados. Criados via Fluig Studio como "Script evento workflow".

---

## Catálogo Completo de Eventos

### Eventos de Ciclo de Vida do Processo

| Evento | Quando dispara | Parâmetros | Pode bloquear? |
|--------|---------------|------------|----------------|
| `afterReleaseVersion` | Após liberar nova versão do processo | processXML (string) | Não |
| `afterProcessCreate` | Após criar nova solicitação | processId (Integer) | Não |
| `afterProcessFinish` | Após finalizar solicitação | processId (Integer) | Não |
| `beforeCancelProcess` | Antes de cancelar solicitação | colleagueId (String), processId (Integer) | Sim (throw) |
| `afterCancelProcess` | Após cancelar solicitação | colleagueId (String), processId (Integer) | Não (não disparar exceções) |
| `subProcessCreated` | Quando sub-processo é criado | subProcessId (Integer) | Não |

### Eventos de Atividade

| Evento | Quando dispara | Parâmetros | Pode bloquear? |
|--------|---------------|------------|----------------|
| `beforeStateEntry` | ANTES de entrar em nova atividade | sequenceId (Integer) | **Sim (throw)** |
| `afterStateEntry` | Após entrar em nova atividade | sequenceId (Integer) | Não (erros ignorados) |
| `beforeStateLeave` | Antes de sair de uma atividade | sequenceId (Integer) | Sim |
| `afterStateLeave` | Após sair de uma atividade | sequenceId (Integer) | Não |

### Eventos de Tarefa

| Evento | Quando dispara | Parâmetros | Pode bloquear? |
|--------|---------------|------------|----------------|
| `beforeTaskCreate` | Antes de o usuário receber tarefa | colleagueId (String) | Sim (throw) |
| `afterTaskCreate` | Após usuário receber tarefa | colleagueId (String) | Não |
| `beforeTaskSave` | Antes de salvar informações | colleagueId, nextSequenceId (Integer), userList (List) | **Sim (throw)** |
| `afterTaskSave` | Após salvar informações | colleagueId, nextSequenceId, userList | Não |
| `beforeTaskComplete` | Antes de completar tarefa | colleagueId, nextSequenceId, userList | **Não bloqueia** (diferente dos outros before) |
| `afterTaskComplete` | Após completar tarefa | colleagueId, nextSequenceId, userList | Não |

### Eventos Especiais

| Evento | Quando dispara | Parâmetros |
|--------|---------------|------------|
| `validateAvailableStates` | Após montar lista de atividades disponíveis | iCurrentState (Integer), stateList (List<Integer>) |
| `checkComplementsPermission` | Ao verificar permissão de complementos | (nenhum) — retorna true/false |
| `beforeSendData` | Último evento, integração com Analytics | (nenhum) |
| `onNotify` | Após movimentação, antes de notificações | (evento global) |

---

## Ordem de Execução dos Eventos

### Criar nova solicitação (botão Enviar)
1. `beforeStateEntry` → 2. `beforeTaskCreate` → 3. `afterTaskCreate` → 4. `afterStateEntry` → 5. `beforeSendData` → 6. `validateAvailableStates` → 7. `beforeTaskSave` → 8. `afterTaskSave` → 9. `beforeTaskComplete` → 10. `afterTaskComplete` → 11. `beforeStateLeave` → 12. `afterStateLeave` → 13. `afterProcessCreate` → 14. `onNotify`

### Movimentar solicitação (botão Enviar)
1. `validateAvailableStates` → 2. `beforeTaskSave` → 3. `afterTaskSave` → 4. `beforeTaskComplete` → 5. `afterTaskComplete` → 6. `beforeStateLeave` → 7. `afterStateLeave` → 8. `beforeStateEntry` → 9. `beforeTaskCreate` → 10. `afterTaskCreate` → 11. `afterStateEntry` → 12. `beforeSendData` → 13. `onNotify`

### Salvar solicitação (botão Salvar)
1. `validateAvailableStates` → 2. `beforeTaskSave` → 3. `afterTaskSave`

### Finalizar solicitação
1. `validateAvailableStates` → 2. `beforeTaskSave` → 3. `afterTaskSave` → 4. `beforeTaskComplete` → 5. `afterTaskComplete` → 6. `beforeStateLeave` → 7. `afterStateLeave` → 8. `beforeStateEntry` → 9. `afterStateEntry` → 10. `afterProcessFinish` → 11. `beforeSendData`

### Cancelar solicitação
1. `beforeCancelProcess` → 2. `afterCancelProcess` → 3. `beforeSendData` → 4. `onNotify`

---

## getValue — Parâmetros da Solicitação

```javascript
var valor = getValue("PARAMETRO");
```

| Parâmetro | Descrição | Tipo |
|-----------|-----------|------|
| `WKDef` | Código do processo | String |
| `WKVersDef` | Versão do processo | String |
| `WKNumProces` | Número da solicitação | String |
| `WKNumState` | Número da atividade atual | String |
| `WKCompany` | Número da empresa | long |
| `WKUser` | Código do usuário corrente | String |
| `WKUserComment` | Complementos/observações da atividade corrente | String |
| `WKCompletTask` | Tarefa completada ("true"/"false") | String |
| `WKNextState` | Número da próxima atividade | String |
| `WKCardId` | Código do registro de formulário | String |
| `WKFormId` | Código do formulário | String |
| `WKIdentityCompany` | Empresa selecionada no Identity | String |
| `WKMobile` | Ação via mobile | String |
| `WKIsService` | Cancelamento via serviço (apenas beforeCancelProcess/afterCancelProcess) | String |
| `WKUserLocale` | Idioma do usuário | String |
| `WKManagerMode` | Movimentando como gestor (true/false) | String |
| `WKReplacement` | Código do usuário substituto | String |
| `WKIsTransfer` | Transferência de tarefa | String |
| `WKCurrentMovto` | Movimentação do processo | String |
| `WKActualThread` | Thread atual do processo | String |

---

## globalVars — Variáveis Globais entre Eventos

Mapa (Map<String, String>) disponível em **todos os eventos** de uma mesma movimentação.

```javascript
// Setar valor
globalVars.put("WDAprovador", "adm");

// Recuperar valor
var aprovador = globalVars.get("WDAprovador");
```

---

## hAPI — Métodos Disponíveis

### Manipulação de Formulário
```javascript
hAPI.getCardValue("nomeCampo")         // Retorna valor do campo
hAPI.setCardValue("nomeCampo", "valor") // Define valor do campo
hAPI.getCardData(numProcesso)          // Retorna Map com todos os campos/valores
```

> **Checkbox**: retorna "on" (marcado) ou "" (vazio).
> Converter: `var check = hAPI.getCardValue("campo") == "on" ? true : false;`

### Pai-Filho
```javascript
hAPI.getChildrenIndexes("nomeTabela")        // Retorna array de índices das linhas filhas
hAPI.addCardChild("nomeTabela", mapaValores) // Adiciona linha filha
hAPI.removeCardChild("nomeTabela", indice)   // Remove linha filha (cuidado com reindex!)

// Leitura de campos filhos
var indexes = hAPI.getChildrenIndexes("itens");
for (var i = 0; i < indexes.length; i++) {
    var valor = hAPI.getCardValue("descricao___" + indexes[i]);
}
```

> **removeCardChild**: ao remover, os índices são reindexados. Excluir de trás para frente:
```javascript
var indexes = hAPI.getChildrenIndexes("tableName");
for (var i = indexes.length - 1; i >= 0; i--) {
    hAPI.removeCardChild("tableName", indexes[i]);
}
```

### Controle de Fluxo
```javascript
hAPI.getActiveStates()                    // Lista atividades ativas
hAPI.startProcess(processId, ativDest, listaColab, obs, completar, valoresForm, modoGestor)
hAPI.setColleagueReplacement("userId")    // Setar substituto
```

### Prazos
```javascript
hAPI.setDueDate(numProcesso, numThread, "userId", dataConclusao, tempoSeg)
hAPI.calculateDeadLineHours(data, segundos, prazo, periodId)  // Retorna [data, segundos]
hAPI.calculateDeadLineTime(data, segundos, prazo, periodId)   // Prazo em minutos
```

### Anexos
```javascript
hAPI.listAttachments()                  // Retorna DocumentDto[]
hAPI.publishWorkflowAttachment(doc)     // Publica anexo no GED
hAPI.attachDocument(documentId)         // Anexa doc do GED à solicitação
```

### Observações
```javascript
hAPI.setTaskComments("userId", numProcesso, numThread, "obs")
```
> Usar em eventos "after" pois precisa que a movimentação já exista.

### Links e Notificações
```javascript
hAPI.getUserTaskLink(numAtiv)  // Retorna link para movimentação da atividade
```
> Não funciona para atividades que ainda não foram criadas.

### Sub-processos e Hierarquia
```javascript
hAPI.getChildrenInstances(processInstanceId)  // Lista solicitações filhas
hAPI.getParentInstance(processInstanceId)      // Número da solicitação pai
```

### Ad-hoc
```javascript
hAPI.createAdHocTasks(processId, sequenceId, assunto, detalhe, listaAtividades)
```

### Propriedades Avançadas
```javascript
hAPI.getAdvancedProperty("propriedade")
```

---

## Padrões de Código Comuns

### Validação no beforeTaskSave
```javascript
function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var completTask = getValue("WKCompletTask");
    var campo = hAPI.getCardValue("nome");
    
    if (completTask == "true" && (campo == null || campo == "")) {
        throw "Campo 'Nome' é obrigatório para movimentar a solicitação!";
    }
}
```

### Decisão por atividade no beforeStateEntry
```javascript
function beforeStateEntry(sequenceId) {
    if (sequenceId == 5) {
        var aprovado = hAPI.getCardValue("aprovado");
        if (aprovado != "sim") {
            throw "Solicitação não pode avançar sem aprovação.";
        }
    }
}
```

### Impedir transferência
```javascript
function beforeTaskCreate(colleagueId) {
    var isTransfer = getValue("WKIsTransfer");
    if (isTransfer !== null && JSON.parse(isTransfer)) {
        throw "Não é permitido transferir esta atividade!";
    }
}
```

---

## Links TDN Relacionados
- Eventos de Processos: https://tdn.totvs.com/display/public/fluig/Eventos+de+Processos
- hAPI: https://tdn.totvs.com/display/public/fluig/hAPI
- Método getValue: https://tdn.totvs.com/pages/releaseview.action?pageId=270919174
- Desenvolvimento de Eventos: https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Eventos


---


# Bloco 3 — Formulários Fluig

## Conceito

Formulários no Fluig são definições de formulário (HTML) que podem ser usados tanto como documentos independentes (GED) quanto vinculados a processos workflow. Cada formulário publicado gera automaticamente um dataset interno.

---

## Estrutura Básica de um Formulário

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Meu Formulário</title>
    <!-- vcXMLRPC para acesso a datasets no front -->
    <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
</head>
<body>
    <form name="meuFormulario">
        <!-- Campos do formulário -->
        <input type="text" name="nome" id="nome" />
        <input type="hidden" name="campo_oculto" id="campo_oculto" />
        
        <!-- Select com dataset -->
        <select name="estado" dataset="estadosBR" datasetkey="Sigla" datasetvalue="Estado"></select>
        
        <!-- Tabela pai-filho -->
        <table tablename="itens">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" name="codigo" /></td>
                    <td><input type="text" name="descricao" /></td>
                </tr>
            </tbody>
        </table>
    </form>
</body>
</html>
```

### Regras importantes:
- O `name` do campo é o identificador usado em hAPI.getCardValue(), datasets de formulário e constraints
- Campos `hidden` são úteis para armazenar dados de controle
- A tag `<form>` com `name` é obrigatória
- O atributo `tablename` na `<table>` define o nome da tabela filha no pai-filho

---

## Formulário Pai x Filho

O padrão pai-filho usa tabelas HTML com `tablename`. Os campos filhos são nomeados com sufixo `___N` (3 underlines + índice sequencial).

### Acesso via hAPI (server-side)
```javascript
// Obter índices das linhas filhas
var indexes = hAPI.getChildrenIndexes("itens");

var total = 0;
for (var i = 0; i < indexes.length; i++) {
    var valor = parseInt(hAPI.getCardValue("quantidade___" + indexes[i]));
    if (isNaN(valor)) { valor = 0; }
    total = total + valor;
}

// Adicionar linha filha
var childData = new java.util.HashMap();
childData.put("codigo", "001");
childData.put("descricao", "Item Novo");
hAPI.addCardChild("itens", childData);

// Remover linha filha (de trás para frente!)
var indexes = hAPI.getChildrenIndexes("itens");
for (var i = indexes.length - 1; i >= 0; i--) {
    hAPI.removeCardChild("itens", indexes[i]);
}
```

### Acesso via hAPI.getCardData
```javascript
var cardData = hAPI.getCardData(numProcesso);
// Retorna: campo___1, campo___2, etc. para filhos
// Ex: codItem___1 = "91", desItem___1 = "Caneta", qtdItem___1 = "100"
```

> **getChildrenIndexes só funciona a partir da segunda atividade** (dados precisam ter sido salvos).

---

## FormController

Objeto disponível nos eventos de personalização de formulário. Permite comunicação entre formulário e personalização.

### Métodos principais
```javascript
form.getCompanyId()     // Código da empresa
form.getDocumentId()    // Código do documento
form.getVersion()       // Versão do registro
form.getCardIndex()     // Código do formulário
form.getValue("campo")  // Valor de um campo
```

### Eventos de formulário onde FormController está disponível
- `displayFields` — Personalização de exibição dos campos
- `enableFields` — Habilitar/desabilitar campos
- `inputFields` — Manipulação de valores
- `validateForm` — Validação antes de salvar

> Para mais detalhes: https://tdn.totvs.com/display/public/fluig/FormController

---

## Data-zoom

Componente que permite pesquisa e seleção de registros de datasets em campos de formulário.

### Configuração via HTML
```html
<input type="text" name="campo" 
       data-zoom='{
           "datasetId": "colleague",
           "filterValues": "colleagueName",
           "resultFields": ["colleagueId", "colleagueName"],
           "displayKey": "colleagueName"
       }' />
```

> Para documentação completa: https://tdn.totvs.com/display/public/fluig/Data-zoom

---

## Select com Dataset (via tag)

```html
<select name="estado" dataset="estadosBR" datasetkey="Sigla" datasetvalue="Estado"></select>
```

| Atributo | Descrição |
|----------|-----------|
| `dataset` | Nome do dataset |
| `datasetkey` | Coluna usada como value do option |
| `datasetvalue` | Coluna usada como label do option |

---

## Acesso a Dataset no Formulário (via JS)

```html
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script>
function carregarDados() {
    try {
        var dataset = DatasetFactory.getDataset("meuDataset", null, null, null);
        for (var x = 0; x < dataset.values.length; x++) {
            var row = dataset.values[x];
            // row["nomeCampo"]
        }
    } catch (erro) {
        console.error("Erro ao carregar dataset: " + erro);
    }
}
</script>
```

> **Cuidado com volume**: este modelo transporta dados do servidor para o navegador. Usar constraints e sqlLimit.

---

## Links TDN Relacionados
- Desenvolvimento de Formulários: https://tdn.totvs.com/pages/releaseview.action?pageId=75270483
- FormController: https://tdn.totvs.com/display/public/fluig/FormController
- Data-zoom: https://tdn.totvs.com/display/public/fluig/Data-zoom
- Eventos de Formulário: https://tdn.totvs.com/pages/releaseview.action?pageId=270921008
- Lidando com List no Rhino: https://tdn.totvs.com/display/public/fluig/Lidando+com+List+%28List%29+no+Rhino
- Lidando com Map no Rhino: https://tdn.totvs.com/display/public/fluig/Lidando+com+Mapa+%28Map%29+no+Rhino
- Lidando com Object no Rhino: https://tdn.totvs.com/display/public/fluig/Lidando+com+Objetos+%28Object%29+no+Rhino


---


# Bloco 4 — Widgets / WCM

## Conceito

Widgets são componentes visuais reutilizáveis que compõem as páginas do portal Fluig. Cada widget é um pacote com HTML (FreeMarker .ftl), CSS, JS e configuração (application.info).

---

## Estrutura de uma Widget

```
minha-widget/
├── src/main/
│   ├── webapp/
│   │   ├── resources/
│   │   │   ├── css/
│   │   │   │   └── minha-widget.css
│   │   │   ├── js/
│   │   │   │   └── minha-widget.js
│   │   │   └── images/
│   │   └── WEB-INF/
│   │       └── jboss-web.xml
│   └── resources/
│       ├── view.ftl          ← Template de visualização
│       ├── edit.ftl           ← Template de edição (config)
│       └── application.info   ← Metadados da widget
```

---

## application.info

```properties
application.type=widget
application.title=Minha Widget
application.description=Descrição da widget
application.category=Categoria
application.renderer=freemarker
application.icon=icon-widget
```

---

## FreeMarker (FTL)

Templates usam a engine FreeMarker para renderização server-side.

### Variáveis disponíveis no FTL
```ftl
${instanceId}              <!-- ID único da instância da widget na página -->
${WKUser}                  <!-- Código do usuário logado -->
${WKCompany}               <!-- Código da empresa -->
```

### Exemplo view.ftl
```ftl
<div id="minha-widget_${instanceId}" class="wcm-widget-class">
    <h3>Bem-vindo</h3>
    <div id="conteudo_${instanceId}"></div>
</div>

<!-- Incluir vcXMLRPC para acesso a datasets -->
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
```

### Exemplo edit.ftl
```ftl
<div id="minha-widget-edit_${instanceId}">
    <label>Título:</label>
    <input type="text" name="titulo" value="${titulo!}" />
</div>
```

---

## JavaScript da Widget (padrão Fluig)

```javascript
var MinhaWidget = SuperWidget.extend({

    instanceId: null,

    init: function() {
        // Executado ao carregar a widget
        this.loadData();
    },

    bindings: {
        local: {
            'btn-filtrar': ['click_filtrar']
        }
    },

    filtrar: function(htmlElement, event) {
        var that = this;
        // Lógica de filtro
    },

    loadData: function() {
        var that = this;
        var dataset = DatasetFactory.getDataset("meuDataset", null, null, null);
        
        if (dataset != null && dataset.values != null) {
            var html = "";
            for (var i = 0; i < dataset.values.length; i++) {
                var row = dataset.values[i];
                html += "<tr><td>" + row["campo"] + "</td></tr>";
            }
            $("#tabela_" + that.instanceId + " tbody").html(html);
        }
    }
});
```

### Padrão de bindings
```javascript
bindings: {
    local: {
        'nome-do-data-action': ['evento_metodo']
        // 'btn-salvar': ['click_salvar']
    }
}
```
No HTML: `<button data-action="btn-salvar">Salvar</button>`

---

## WCMAPI — Biblioteca Client-Side

### Métodos principais
```javascript
WCMAPI.version                    // Versão do Fluig (ex: "1.6.2")
WCMAPI.serverURL                  // URL do servidor (ex: "http://empresa.fluig.com:8080")
WCMAPI.getServerURL()             // Mesmo que serverURL
WCMAPI.organizationId             // ID do tenant
WCMAPI.tenantCode                 // Código do tenant
WCMAPI.serverContextURL           // Raiz do portal ("/portal")
WCMAPI.getProtectedContextPath()  // Path protegido ("/portal/p")
```

### Requisições
```javascript
WCMAPI.Create({
    url: '/api/public/ecm/dataset/...',
    contentType: "application/json",
    dataType: "json",
    type: "GET",
    success: function(data) {
        // processar resposta
    },
    error: function(err) {
        WCMAPI.failHandler(err, true); // Alerta detalhado
    }
});
```

### Comunicação entre Widgets
```javascript
// Widget A — disparar evento
WCMAPI.fireEvent('atualizar-lista', dados);

// Widget B — ouvir evento
WCMAPI.addListener(this, 'atualizar-lista', function(evName, data) {
    // reagir ao evento
});
```

### Renderização Assíncrona de Widget
```javascript
WCMAPI.convertFtlAsync('nome-widget', 'nome-ftl', JSON.stringify(dados), function(html) {
    $('#container').append(html);
});
```
> **NUNCA usar WCMAPI.convertFtl** (síncrono — trava a UI).

### Sessão
```javascript
WCMAPI.setSessionAttribute('FLAG', 'valor');
WCMAPI.getSessionAttribute('FLAG');
```

### Logoff
```javascript
WCMAPI.logoff();
```

### ID Único
```javascript
var id = WCMAPI.generateId(); // "wcmid4", "wcmid5", etc.
```

---

## FLUIGC — Componentes Visuais

### DataTable
```javascript
var myTable = FLUIGC.datatable('#tabela_' + instanceId, {
    dataRequest: dados,
    renderContent: ['id', 'nome', 'email'],
    header: [
        { 'title': 'Código', 'size': 'col-md-2' },
        { 'title': 'Nome', 'standard': true, 'size': 'col-md-6' },
        { 'title': 'Email', 'size': 'col-md-4' }
    ],
    search: { enabled: true },
    scroll: { target: ".target", enabled: true },
    actions: { enabled: false },
    navButtons: { enabled: false },
    draggable: { enabled: false }
}, function(err, data) {
    if (err) { FLUIGC.toast({ message: err, type: 'danger' }); }
});
```

### Modal
```javascript
var modal = FLUIGC.modal('#modal_' + instanceId, {
    title: 'Título',
    content: '<p>Conteúdo</p>',
    size: 'large',
    actions: [{
        label: 'Confirmar',
        autoClose: true,
        bind: 'click_confirmar'
    }]
});
modal.show();
```

### Toast
```javascript
FLUIGC.toast({ message: 'Operação realizada!', type: 'success' });
// Tipos: success, danger, warning, info
```

---

## Boas Práticas para Widgets

1. **Sempre usar instanceId** para evitar conflito entre múltiplas instâncias na mesma página
2. **IIFE ou SuperWidget.extend** — nunca poluir o escopo global
3. **Delegação de eventos** — `$(document).on('click', '#btn_' + instanceId, fn)` para DOM dinâmico
4. **Montar HTML e inserir uma vez** — evitar manipulação de DOM em loop
5. **Debounce** em campos de busca e filtros
6. **vcXMLRPC.js** necessário para DatasetFactory no front
7. **Cache de dataset** — não chamar o mesmo dataset múltiplas vezes sem necessidade

---

## Links TDN Relacionados
- Widgets: https://tdn.totvs.com/display/public/fluig/Widgets
- application.info: https://tdn.totvs.com/display/public/fluig/Arquivo+application.info
- WCMAPI: https://tdn.totvs.com/display/public/fluig/WCMAPI
- Central de componentes: https://tdn.totvs.com/display/public/fluig/Central+de+componentes
- Eventos de Componentes: https://tdn.totvs.com/display/public/fluig/Eventos+de+Componentes
- Style Guide: https://tdn.totvs.com/display/public/fluig/Guia+de+Estilos
- Layouts: https://tdn.totvs.com/display/public/fluig/Layouts
- Biblioteca WCM: https://tdn.totvs.com/display/public/fluig/Biblioteca+WCM
- Cache em navegador: https://tdn.totvs.com/display/public/fluig/Cache+em+navegador+no+TOTVS+Fluig+Plataforma


---


# Bloco 5 — Integrações (WebServices, ServiceManager, REST/SOAP)

## Conceito

O Fluig permite integração com sistemas externos via WebServices SOAP, API REST, e ServiceManager. Integrações podem ser feitas a partir de eventos de processo, datasets avançados e ServiceTasks.

---

## ServiceManager — Consumo de WebServices SOAP

### Pré-requisitos
1. Cadastrar o serviço no Fluig: **Painel de Controle > Serviços**
2. Informar o código do serviço, URL do WSDL e credenciais (se necessário)

### Padrão de uso (server-side, Rhino ES5)
```javascript
// 1. Obter instância do serviço cadastrado
var serviceProvider = ServiceManager.getServiceInstance("CodigoDoServico");

// 2. Instanciar o locator (classe gerada pelo WSDL)
var serviceLocator = serviceProvider.instantiate("com.exemplo.MinhaServiceLocator");

// 3. Obter a porta/endpoint
var service = serviceLocator.getMinhaServicePort();

// 4. Chamar métodos do serviço
var resultado = service.meuMetodo(parametro1, parametro2);
```

### Exemplo completo: iniciar solicitação via WebService
```javascript
function afterProcessFinish(processId) {
    try {
        var serviceProvider = ServiceManager.getServiceInstance("WorkflowEngineService");
        var serviceLocator = serviceProvider.instantiate(
            "com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService"
        );
        var service = serviceLocator.getWorkflowEngineServicePort();

        var attachments = serviceProvider.instantiate(
            "com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray"
        );
        var objectFactory = serviceProvider.instantiate("net.java.dev.jaxb.array.ObjectFactory");
        var cardData = objectFactory.createStringArrayArray();

        service.simpleStartProcess("adm", "adm", 1, "processo2", "Comentário", attachments, cardData);
        
        log.info("Solicitação criada com sucesso via WS");
    } catch (e) {
        log.error("Erro ao iniciar solicitação via WS: " + e.message);
    }
}
```

### Dica: ObjectFactory
Cada serviço WSDL gera uma classe ObjectFactory com métodos para instanciar objetos complexos. Consultar sempre a classe para saber quais objetos estão disponíveis.

---

## Consumo de API REST (server-side)

### Usando java.net (dentro de datasets/eventos)
```javascript
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("resultado");
    dataset.addColumn("status");

    try {
        var url = new java.net.URL("https://api.exemplo.com/dados");
        var conn = url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer TOKEN_AQUI");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(10000);

        var responseCode = conn.getResponseCode();

        if (responseCode == 200) {
            var reader = new java.io.BufferedReader(
                new java.io.InputStreamReader(conn.getInputStream(), "UTF-8")
            );
            var response = "";
            var line;
            while ((line = reader.readLine()) != null) {
                response += line;
            }
            reader.close();

            // Parsear JSON
            var jsonObj = JSON.parse(response);
            
            for (var i = 0; i < jsonObj.length; i++) {
                dataset.addRow(new Array(
                    jsonObj[i].campo1,
                    "OK"
                ));
            }
        } else {
            dataset.addRow(new Array("", "ERRO HTTP " + responseCode));
        }

        conn.disconnect();
    } catch (e) {
        dataset.addRow(new Array("", "ERRO: " + e.message));
        log.error("ds_meuDataset - Erro REST: " + e.message);
    }

    return dataset;
}
```

### POST com body JSON
```javascript
var url = new java.net.URL("https://api.exemplo.com/criar");
var conn = url.openConnection();
conn.setRequestMethod("POST");
conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
conn.setDoOutput(true);

var body = JSON.stringify({ campo1: "valor1", campo2: "valor2" });
var os = conn.getOutputStream();
var bytes = new java.lang.String(body).getBytes("UTF-8");
os.write(bytes, 0, bytes.length);
os.flush();
os.close();

var responseCode = conn.getResponseCode();
// ... ler resposta
```

---

## ServiceTask (Atividade de Serviço)

ServiceTask é uma atividade automática no diagrama BPMN que executa lógica server-side sem interação de usuário.

### Configuração
1. No diagrama, adicionar atividade do tipo "Serviço"
2. Vincular ao código do serviço cadastrado
3. Configurar mapeamento de entrada/saída

### Uso com ServiceManager dentro de eventos
O ServiceTask é frequentemente implementado via `beforeStateEntry` na atividade de serviço:
```javascript
function beforeStateEntry(sequenceId) {
    if (sequenceId == 3) { // atividade de serviço
        try {
            // lógica de integração aqui
            var resultado = chamarServicoExterno();
            hAPI.setCardValue("resultado", resultado);
        } catch (e) {
            log.error("ServiceTask erro: " + e.message);
            throw "Falha na integração: " + e.message;
        }
    }
}
```

---

## Consumo de WS SOAP a partir de Widget (front-end)

```javascript
// No JS da widget
var soapEnvelope = 
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soapenv:Body>' +
    '<meuMetodo>' +
    '<parametro>valor</parametro>' +
    '</meuMetodo>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

WCMAPI.Create({
    url: '/webdesk/ECMCardService?wsdl',
    contentType: "text/xml; charset=utf-8",
    dataType: "xml",
    data: soapEnvelope,
    type: "POST",
    success: function(data) {
        // Parsear XML de resposta
    },
    error: function(err) {
        WCMAPI.failHandler(err, true);
    }
});
```

---

## API REST Pública do Fluig

Base URL: `https://<servidor>/api/public/ecm/...`

Swagger: https://api.fluig.com/latest/index.html

### Endpoints principais
| API | Swagger |
|-----|---------|
| Content Management | https://api.fluig.com/latest/content-management/swagger-ui/ |
| Process Management | https://api.fluig.com/latest/process-management/swagger-ui/ |
| Dataset | https://api.fluig.com/latest/dataset/swagger-ui/ |
| Forms | https://api.fluig.com/latest/ecm-forms/swagger-ui/ |
| Page Management | https://api.fluig.com/latest/page-management/swagger-ui/ |
| Collaboration | https://api.fluig.com/latest/collaboration/swagger-ui/ |
| Admin | https://api.fluig.com/latest/admin/swagger-ui/ |
| Environment | https://api.fluig.com/latest/environment/swagger-ui/ |
| Form Management | https://api.fluig.com/latest/form-management/swagger-ui/ |
| Data Service | https://api.fluig.com/latest/dataservice/swagger-ui/ |

---

## Boas Práticas de Integração

1. **Sempre usar try/catch** com mensagem clara de erro
2. **Definir timeouts** (connectTimeout e readTimeout) — nunca deixar padrão
3. **Logar requestId/protocolo** e status de cada chamada
4. **Validar resposta** antes de processar (status code, conteúdo)
5. **Não expor credenciais** no código — usar parâmetros de serviço
6. **Tratar encoding** UTF-8 explicitamente
7. **Limitar retentativas** e implementar fallback quando possível

---

## Links TDN Relacionados
- WebServices: https://tdn.totvs.com/pages/releaseview.action?pageId=73084007
- Consumo WS SOAP de Widget: https://tdn.totvs.com/display/public/fluig/Consumo+de+um+WS+SOAP+de+um+Widget
- WS SOAP com Identity: https://tdn.totvs.com/display/public/fluig/Webservices+SOAP+com+Identity+habilitado
- Fluig API: https://tdn.totvs.com/display/public/fluig/Fluig+API
- Plataforma APIs: https://tdn.totvs.com/display/public/fluig/Plataforma+%7C+APIs
- APIs SLA: https://tdn.totvs.com/display/public/fluig/APIs+SLA


---


# Bloco 6 — Elementos BPMN no Fluig

## Conceito

O Fluig usa a notação BPMN 2.0 para modelagem de processos workflow. Os diagramas são criados no Fluig Studio e definem o fluxo de atividades, decisões e eventos.

---

## Eventos Iniciais

Representam o início de um processo.

| Tipo | Descrição | Uso |
|------|-----------|-----|
| Evento de início simples | Inicia processo por ação do usuário | Padrão |
| Evento de início por mensagem | Inicia processo por recebimento de mensagem | Integração |
| Evento de início por timer | Inicia processo por agendamento | Processos periódicos |

> Documentação: https://tdn.totvs.com/display/public/fluig/Eventos+Iniciais

---

## Atividades Workflow

| Tipo | Descrição |
|------|-----------|
| Atividade comum | Tarefa humana, requer ação do usuário |
| Atividade de serviço (ServiceTask) | Tarefa automática, sem interação humana |
| Sub-processo | Atividade que inicia outro processo |
| Sub-processo ad-hoc | Atividade que permite criar tarefas ad-hoc |

### Mecanismos de atribuição de atividades
- Usuário fixo
- Papel (Role): `Pool:Role:nomePapel`
- Grupo: `Pool:Group:nomeGrupo`
- Usuário do campo do formulário
- Gestor do processo

> Documentação: https://tdn.totvs.com/display/public/fluig/Atividades+Workflow

---

## Gateways

Controlam a divergência e convergência do fluxo.

| Tipo | Símbolo | Comportamento |
|------|---------|---------------|
| Gateway Exclusivo (XOR) | Losango com X | Apenas UM caminho é seguido (baseado em condição) |
| Gateway Paralelo (AND) | Losango com + | TODOS os caminhos são seguidos simultaneamente |
| Gateway Inclusivo (OR) | Losango com O | UM OU MAIS caminhos podem ser seguidos |

### Gateway Exclusivo — Scripts Condicionais
O roteamento é definido por scripts condicionais nos fluxos de saída:
```javascript
// Exemplo de condição em fluxo de saída
hAPI.getCardValue("aprovado") == "sim"
```

### Gateway Paralelo
- Na divergência: cria threads paralelas
- Na convergência: aguarda TODAS as threads concluírem

> Documentação: https://tdn.totvs.com/display/public/fluig/Gateways

---

## Fluxos

Conectam os elementos do diagrama.

| Tipo | Descrição |
|------|-----------|
| Fluxo de sequência | Conexão padrão entre atividades |
| Fluxo condicional | Fluxo com script de condição (usado com Gateway Exclusivo) |
| Fluxo padrão (default) | Caminho seguido quando nenhuma condição é atendida |

### Scripts Condicionais
```javascript
// Em condições de fluxo do Gateway Exclusivo
// Acesso via getValue ou hAPI
getValue("WKNumState") == "3"
hAPI.getCardValue("status") == "aprovado"
```

> Documentação: https://tdn.totvs.com/display/public/fluig/Fluxos
> Scripts Condicionais: https://tdn.totvs.com/display/public/fluig/Scripts+Condicionais

---

## Eventos Intermediários

| Tipo | Descrição |
|------|-----------|
| Timer | Pausa a execução por tempo determinado |
| Mensagem | Aguarda ou envia mensagem entre processos |

---

## Eventos Finais

| Tipo | Descrição |
|------|-----------|
| Evento de fim simples | Encerra o processo |
| Evento de fim por terminação | Encerra o processo e cancela todas as threads ativas |

> Documentação: https://tdn.totvs.com/display/public/fluig/Eventos+Finais+de+processo

---

## Itens de Agrupamento e Dados

| Elemento | Descrição |
|----------|-----------|
| Pool / Lane | Agrupamento visual de atividades por departamento/papel |
| Data Object | Representação de dados utilizados no processo |
| Anotação | Comentários visuais no diagrama |

> Documentação: https://tdn.totvs.com/display/public/fluig/Itens+de+agrupamento+e+dados

---

## Propriedades Avançadas de Processo

### AutomaticTasks
Propriedade que lista atividades com decisão automática:
```
AutomaticTasks=3,6,10
```
Usado junto com `hAPI.setAutomaticDecision()` no `beforeStateEntry`.

### Thread de Processo
Em processos com atividades paralelas, cada thread tem um número:
- Thread 0: fluxo principal
- Thread 1, 2, ...: fluxos paralelos

> Documentação: https://tdn.totvs.com/display/public/fluig/Thread+de+Processo

---

## Links TDN Relacionados
- Desenvolvimento de Processos: https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Processos
- Atividades Workflow: https://tdn.totvs.com/display/public/fluig/Atividades+Workflow
- Eventos Iniciais: https://tdn.totvs.com/display/public/fluig/Eventos+Iniciais
- Eventos Finais: https://tdn.totvs.com/display/public/fluig/Eventos+Finais+de+processo
- Gateways: https://tdn.totvs.com/display/public/fluig/Gateways
- Fluxos: https://tdn.totvs.com/display/public/fluig/Fluxos
- Scripts Condicionais: https://tdn.totvs.com/display/public/fluig/Scripts+Condicionais
- Thread de Processo: https://tdn.totvs.com/display/public/fluig/Thread+de+Processo


---


# Links TDN — Índice Completo de Documentação Fluig

> Quando a skill não cobrir um cenário, buscar neste índice o link mais relevante e consultá-lo via web search ou web fetch.

---

## Recursos de Documentos (ECM)

1. https://tdn.totvs.com/pages/releaseview.action?pageId=145363838
2. https://tdn.totvs.com/pages/releaseview.action?pageId=75270483
3. https://tdn.totvs.com/pages/releaseview.action?pageId=244716710
4. https://tdn.totvs.com/pages/releaseview.action?pageId=244448460
5. https://tdn.totvs.com/pages/releaseview.action?pageId=663066946
6. https://tdn.totvs.com/pages/releaseview.action?pageId=668198714
7. https://tdn.totvs.com/pages/releaseview.action?pageId=872686733
8. https://tdn.totvs.com/pages/releaseview.action?pageId=662892312
9. https://tdn.totvs.com/pages/releaseview.action?pageId=668197293
10. https://tdn.totvs.com/pages/releaseview.action?pageId=668198808
11. https://tdn.totvs.com/pages/releaseview.action?pageId=1005894967

---

## Recursos de Processos (BPM)

12. https://tdn.totvs.com/pages/releaseview.action?pageId=270924916
13. https://tdn.totvs.com/display/public/fluig/Assinando+processos+digitalmente
14. https://tdn.totvs.com/pages/releaseview.action?pageId=854360971
15. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Workflow
16. https://tdn.totvs.com/pages/releaseview.action?pageId=160105353
17. https://tdn.totvs.com/pages/releaseview.action?pageId=142813148
18. https://tdn.totvs.com/pages/releaseview.action?pageId=161350803

---

## Recursos de Páginas e Widgets (WCM)

19. https://tdn.totvs.com/pages/releaseview.action?pageId=113803509
20. https://tdn.totvs.com/display/public/fluig/Central+de+componentes
21. https://tdn.totvs.com/pages/releaseview.action?pageId=185732957
22. https://tdn.totvs.com/display/public/fluig/Arquivo+application.info
23. https://tdn.totvs.com/pages/releaseview.action?pageId=185738869
24. https://tdn.totvs.com/pages/releaseview.action?pageId=126714715
25. https://tdn.totvs.com/pages/releaseview.action?pageId=463803148
26. https://tdn.totvs.com/pages/releaseview.action?pageId=113803693
27. https://tdn.totvs.com/display/public/fluig/Layouts
28. https://tdn.totvs.com/pages/releaseview.action?pageId=185745580
29. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+layouts+personalizados
30. https://tdn.totvs.com/display/public/fluig/Biblioteca+WCM
31. https://tdn.totvs.com/display/public/fluig/Criar+uma+biblioteca+personalizada
32. https://tdn.totvs.com/pages/releaseview.action?pageId=185749423
33. https://tdn.totvs.com/display/public/fluig/Widgets
34. https://tdn.totvs.com/pages/releaseview.action?pageId=185735401
35. https://tdn.totvs.com/pages/releaseview.action?pageId=185739298
36. https://tdn.totvs.com/pages/releaseview.action?pageId=185739337
37. https://tdn.totvs.com/pages/releaseview.action?pageId=271180031
38. https://tdn.totvs.com/pages/releaseview.action?pageId=258277714
39. https://tdn.totvs.com/pages/releaseview.action?pageId=185738974
40. https://tdn.totvs.com/pages/releaseview.action?pageId=185739196
41. https://tdn.totvs.com/display/public/fluig/Eventos+de+Componentes
42. https://tdn.totvs.com/display/public/fluig/Widget+utilizando+Angular+e+PO+UI+no+Fluig
43. https://tdn.totvs.com/display/public/fluig/Closure+Compiler+Maven+Plugin
44. https://tdn.totvs.com/pages/releaseview.action?pageId=80970184
45. https://tdn.totvs.com/pages/releaseview.action?pageId=192087046
46. https://tdn.totvs.com/pages/releaseview.action?pageId=149880912
47. https://tdn.totvs.com/display/public/fluig/Widget+Acesso+centralizado
48. https://tdn.totvs.com/display/public/fluig/Widget+Analytics
49. https://tdn.totvs.com/display/public/fluig/Widget+Analytics+-+API%27s
50. https://tdn.totvs.com/pages/releaseview.action?pageId=204965658
51. https://tdn.totvs.com/pages/releaseview.action?pageId=458754182
52. https://tdn.totvs.com/pages/releaseview.action?pageId=547229132
53. https://tdn.totvs.com/pages/releaseview.action?pageId=561640995
54. https://tdn.totvs.com/pages/releaseview.action?pageId=563414690
55. https://tdn.totvs.com/display/public/fluig/Cache+em+navegador+no+TOTVS+Fluig+Plataforma
56. https://tdn.totvs.com/display/public/fluig/WCMAPI
57. https://tdn.totvs.com/pages/releaseview.action?pageId=934626311
58. https://tdn.totvs.com/pages/releaseview.action?pageId=808476695
59. https://tdn.totvs.com/pages/releaseview.action?pageId=1037988334

---

## Desenvolvimento sobre a Plataforma

60. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+sobre+a+plataforma
61. https://tdn.totvs.com/display/public/fluig/Primeiros+passos
62. https://tdn.totvs.com/pages/releaseview.action?pageId=644720026
63. https://tdn.totvs.com/pages/releaseview.action?pageId=270921079
64. https://tdn.totvs.com/pages/releaseview.action?pageId=142804157
65. https://tdn.totvs.com/pages/releaseview.action?pageId=268800700
66. https://tdn.totvs.com/display/public/fluig/Controle+de+Log
67. https://tdn.totvs.com/pages/releaseview.action?pageId=235336390
68. https://tdn.totvs.com/pages/releaseview.action?pageId=203764136
69. https://tdn.totvs.com/display/public/fluig/Log+de+acesso+aos+recursos
70. https://tdn.totvs.com/display/public/fluig/Mensagens+de+log+para+processos

### Fluig Studio
71. https://tdn.totvs.com/display/public/fluig/Fluig+Studio
72. https://tdn.totvs.com/pages/releaseview.action?pageId=172297237
73. https://tdn.totvs.com/display/public/fluig/Criando+um+projeto+fluig+no+Studio
74. https://tdn.totvs.com/display/public/fluig/Como+criar+um+diagrama+no+fluig+Studio
75. https://tdn.totvs.com/pages/releaseview.action?pageId=239039127

### Importar/Exportar
76. https://tdn.totvs.com/pages/releaseview.action?pageId=128681226
77. https://tdn.totvs.com/display/public/fluig/Importando+processos
78. https://tdn.totvs.com/display/public/fluig/Importando+processos+ECM+3+no+fluig
79. https://tdn.totvs.com/display/public/fluig/Exportando+processos
80. https://tdn.totvs.com/pages/releaseview.action?pageId=239018330
81. https://tdn.totvs.com/pages/releaseview.action?pageId=239018344
82. https://tdn.totvs.com/pages/releaseview.action?pageId=239019001
83. https://tdn.totvs.com/pages/releaseview.action?pageId=239019006
84. https://tdn.totvs.com/display/public/fluig/Importando+eventos+globais
85. https://tdn.totvs.com/display/public/fluig/Exportando+eventos+globais

### Elementos de Processo
86. https://tdn.totvs.com/pages/releaseview.action?pageId=126714181
87. https://tdn.totvs.com/display/public/fluig/Atividades+Workflow
88. https://tdn.totvs.com/display/public/fluig/Eventos+Finais+de+processo
89. https://tdn.totvs.com/display/public/fluig/Eventos+Iniciais
90. https://tdn.totvs.com/pages/releaseview.action?pageId=126714787
91. https://tdn.totvs.com/display/public/fluig/Gateways
92. https://tdn.totvs.com/display/public/fluig/Fluxos
93. https://tdn.totvs.com/display/public/fluig/Itens+de+agrupamento+e+dados
94. https://tdn.totvs.com/display/public/fluig/Scripts+Condicionais
95. https://tdn.totvs.com/pages/releaseview.action?pageId=126718685

### Style Guide e FreeMarker
96. https://tdn.totvs.com/display/public/fluig/Fluig+Studio+para+outros+idiomas
97. https://tdn.totvs.com/display/public/fluig/Comandos+Freemarker+%28FTL%29+no+Studio
98. https://tdn.totvs.com/pages/releaseview.action?pageId=239021223
99. https://tdn.totvs.com/pages/releaseview.action?pageId=239021220
100. https://tdn.totvs.com/display/public/fluig/Guia+de+Estilos
101. https://tdn.totvs.com/display/public/fluig/Utilizando+o+Guia+de+Estilos
102. https://tdn.totvs.com/display/public/fluig/Plataforma+%7C+Guia+de+estilos

### Componentes e APIs
103. https://tdn.totvs.com/pages/releaseview.action?pageId=840778303
104. https://tdn.totvs.com/pages/releaseview.action?pageId=71336118
105. https://tdn.totvs.com/pages/releaseview.action?pageId=307824256
106. https://tdn.totvs.com/pages/releaseview.action?pageId=173083652
107. https://tdn.totvs.com/pages/releaseview.action?pageId=73082260
108. https://tdn.totvs.com/pages/releaseview.action?pageId=539698864
109. https://tdn.totvs.com/pages/releaseview.action?pageId=73083721
110. https://tdn.totvs.com/pages/releaseview.action?pageId=306842691
111. https://tdn.totvs.com/pages/releaseview.action?pageId=237397494
112. https://tdn.totvs.com/pages/releaseview.action?pageId=152798259
113. https://tdn.totvs.com/pages/releaseview.action?pageId=123602165
114. https://tdn.totvs.com/pages/releaseview.action?pageId=244921490
115. https://tdn.totvs.com/pages/releaseview.action?pageId=181964698
116. https://tdn.totvs.com/display/public/fluig/Linhas

### Fluig API / REST
117. https://tdn.totvs.com/display/public/fluig/Fluig+API
118. https://tdn.totvs.com/pages/releaseview.action?pageId=198952866
119. https://tdn.totvs.com/pages/releaseview.action?pageId=198934765
120. https://tdn.totvs.com/pages/releaseview.action?pageId=239041233
121. https://tdn.totvs.com/display/public/fluig/APIs+SLA
122. https://tdn.totvs.com/display/public/fluig/Plataforma+%7C+APIs

### Swagger APIs
123. https://api.fluig.com/latest/index.html
124. https://api.fluig.com/latest/content-management/swagger-ui/
125. https://api.fluig.com/latest/page-management/swagger-ui/
126. https://api.fluig.com/latest/process-management/swagger-ui/
127. https://api.fluig.com/latest/ecm-forms/swagger-ui/
128. https://api.fluig.com/latest/dataservice/swagger-ui/
129. https://api.fluig.com/latest/collaboration/swagger-ui/
130. https://api.fluig.com/latest/admin/swagger-ui/
131. https://api.fluig.com/latest/dataset/swagger-ui/
132. https://api.fluig.com/latest/environment/swagger-ui/
133. https://api.fluig.com/latest/use-policy/swagger-ui/
134. https://api.fluig.com/latest/form-management/swagger-ui/
135. https://api.fluig.com/old/
136. https://api.fluig.com/old/resources.html
137. https://api.fluig.com/old/data.html
138. https://api.fluig.com/old/downloads.html

### Eventos
139. https://tdn.totvs.com/pages/releaseview.action?pageId=567579891
140. https://tdn.totvs.com/pages/releaseview.action?pageId=496822391
141. https://tdn.totvs.com/pages/releaseview.action?pageId=773513926
142. https://tdn.totvs.com/pages/releaseview.action?pageId=146181468
143. https://tdn.totvs.com/pages/releaseview.action?pageId=145363504
144. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Eventos
145. https://tdn.totvs.com/display/public/fluig/Acompanhamento+de+Eventos
146. https://tdn.totvs.com/pages/releaseview.action?pageId=200906235
147. https://tdn.totvs.com/pages/releaseview.action?pageId=270921008
148. https://tdn.totvs.com/pages/releaseview.action?pageId=270924158
149. https://tdn.totvs.com/pages/releaseview.action?pageId=849548258
150. https://tdn.totvs.com/pages/viewpage.action?pageId=849548336
151. https://tdn.totvs.com/pages/viewpage.action?pageId=849549543
152. https://tdn.totvs.com/display/public/fluig/Eventos+de+Processos
153. https://tdn.totvs.com/display/public/fluig/hAPI
154. https://tdn.totvs.com/pages/releaseview.action?pageId=270919174
155. https://tdn.totvs.com/display/public/fluig/Eventos+de+Documentos
156. https://tdn.totvs.com/display/public/fluig/docAPI
157. https://tdn.totvs.com/display/public/fluig/Eventos+Globais
158. https://tdn.totvs.com/display/public/fluig/Como+criar+um+Evento+Global
159. https://tdn.totvs.com/pages/releaseview.action?pageId=1022377345
160. https://tdn.totvs.com/display/public/fluig/Evento+beforeLogin
161. https://tdn.totvs.com/display/public/fluig/Outros+Eventos+Globais

### Datasets
162. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Datasets
163. https://tdn.totvs.com/display/public/fluig/Acessando+Datasets
164. https://tdn.totvs.com/display/public/fluig/Dataset+Simples
165. https://tdn.totvs.com/pages/releaseview.action?pageId=412888219
166. https://tdn.totvs.com/display/public/fluig/Datasets+acessando+banco+de+dados+externo
167. https://tdn.totvs.com/display/public/fluig/Datasets+internos
168. https://tdn.totvs.com/pages/releaseview.action?pageId=212899013
169. https://tdn.totvs.com/pages/releaseview.action?pageId=894373725
170. https://tdn.totvs.com/pages/releaseview.action?pageId=840778342

### Componentes visuais
171. https://tdn.totvs.com/pages/releaseview.action?pageId=160104507
172. https://tdn.totvs.com/pages/releaseview.action?pageId=160104509
173. https://tdn.totvs.com/display/public/fluig/Componente+Busca+de+documentos
174. https://tdn.totvs.com/display/public/fluig/Componente+Compartilhar
175. https://tdn.totvs.com/display/public/fluig/Componente+de+recorte+de+imagem
176. https://tdn.totvs.com/pages/releaseview.action?pageId=736177685
177. https://tdn.totvs.com/display/public/fluig/Componente+Listar+compartilhamentos
178. https://tdn.totvs.com/display/public/fluig/Componente+Renomear+documentos+e+pastas
179. https://tdn.totvs.com/pages/releaseview.action?pageId=185758540
180. https://tdn.totvs.com/pages/releaseview.action?pageId=272407097
181. https://tdn.totvs.com/pages/releaseview.action?pageId=189309230
182. https://tdn.totvs.com/pages/releaseview.action?pageId=185739566
183. https://tdn.totvs.com/pages/releaseview.action?pageId=185739563
184. https://tdn.totvs.com/pages/releaseview.action?pageId=185739570
185. https://tdn.totvs.com/pages/releaseview.action?pageId=185739389
186. https://tdn.totvs.com/pages/releaseview.action?pageId=965446583
187. https://tdn.totvs.com/pages/releaseview.action?pageId=185757267

### WebServices e Integrações
188. https://tdn.totvs.com/pages/releaseview.action?pageId=73084007
189. https://tdn.totvs.com/display/public/fluig/Consumo+de+um+WS+SOAP+de+um+Widget
190. https://tdn.totvs.com/pages/releaseview.action?pageId=662867789
191. https://tdn.totvs.com/display/public/fluig/Webservices+SOAP+com+Identity+habilitado

### Aceleradores e Exemplos
192. https://tdn.totvs.com/display/public/fluig/Aceleradores+de+desenvolvimento+Fluig
193. https://tdn.totvs.com/display/public/fluig/GitHub+-+Exemplos+de+desenvolvimento
194. https://tdn.totvs.com/display/public/fluig/Guia+de+Propriedades+dos+Objetos
195. https://tdn.totvs.com/pages/releaseview.action?pageId=976127718

### Documentação para desenvolvedores
196. https://tdn.totvs.com/pages/releaseview.action?pageId=867141925
197. https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Processos
198. https://tdn.totvs.com/pages/releaseview.action?pageId=745133085
199. https://tdn.totvs.com/pages/releaseview.action?pageId=745139901
200. https://tdn.totvs.com/pages/releaseview.action?pageId=754248018
201. https://tdn.totvs.com/display/public/fluig/Thread+de+Processo
202. https://tdn.totvs.com/pages/releaseview.action?pageId=745133366
203. https://tdn.totvs.com/pages/releaseview.action?pageId=757236186
204. https://tdn.totvs.com/pages/releaseview.action?pageId=757236189
205. https://tdn.totvs.com/pages/releaseview.action?pageId=757236193

### Rhino / Tipos de Dados
206. https://tdn.totvs.com/display/public/fluig/Lidando+com+List+%28List%29+no+Rhino
207. https://tdn.totvs.com/display/public/fluig/Lidando+com+Mapa+%28Map%29+no+Rhino
208. https://tdn.totvs.com/display/public/fluig/Lidando+com+Objetos+%28Object%29+no+Rhino
209. https://tdn.totvs.com/pages/releaseview.action?pageId=745133369
210. https://tdn.totvs.com/pages/releaseview.action?pageId=745133371
211. https://tdn.totvs.com/pages/viewpage.action?pageId=745734334
212. https://tdn.totvs.com/pages/releaseview.action?pageId=745133376
213. https://tdn.totvs.com/pages/viewpage.action?pageId=745734390

### Objetos e Utilitários
214. https://tdn.totvs.com/pages/releaseview.action?pageId=745138789
215. https://tdn.totvs.com/display/public/fluig/Data-zoom
216. https://tdn.totvs.com/display/public/fluig/FormController
217. https://tdn.totvs.com/pages/viewpage.action?pageId=1008213423
218. https://tdn.totvs.com/pages/releaseview.action?pageId=745139690
219. https://tdn.totvs.com/pages/releaseview.action?pageId=778540422
220. https://tdn.totvs.com/pages/releaseview.action?pageId=778540423
221. https://tdn.totvs.com/pages/viewpage.action?pageId=778540424
222. https://tdn.totvs.com/display/public/fluig/WorkflowSaveAndSendResultVO
223. https://tdn.totvs.com/display/fluig/currentUser
224. https://tdn.totvs.com/display/public/fluig/console
225. https://tdn.totvs.com/display/fluig/console.dir
226. https://tdn.totvs.com/display/fluig/console.log
227. https://tdn.totvs.com/display/public/fluig/RequestInfoVO
228. https://tdn.totvs.com/display/public/fluig/processes.start