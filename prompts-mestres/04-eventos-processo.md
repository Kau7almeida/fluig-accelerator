# Prompt Mestre: Eventos de Processo Fluig

> Copie este prompt, preencha os campos entre `{{colchetes}}` e envie pro Claude.

---

## Prompt

```
Preciso que você crie eventos de processo Fluig com as seguintes especificações:

### Dados do Processo
- Nome do processo: {{nomeDoProcesso}}
- Formulário vinculado: {{frmNomeDoFormulario}}
- Dataset vinculado: {{dsNomeDoDataset}}

### Atividades do Processo
{{Liste as atividades com número e descrição}}

Exemplo:
- Atividade 1: Abertura da solicitação (solicitante)
- Atividade 2: Aprovação do gestor
- Atividade 3: Aprovação do financeiro
- Atividade 4: Finalização

### Eventos Necessários
{{Marque quais eventos precisam de implementação e descreva a lógica}}

#### beforeStateEntry
{{Descreva validações ou decisões automáticas por atividade}}
Exemplo:
- Na atividade 3: se valor < 10000, pular direto pra atividade 4 (decisão automática)
- Na atividade 2: validar se o campo "centro_custo" está preenchido

#### beforeTaskSave
{{Descreva validações antes de salvar/enviar}}
Exemplo:
- Ao enviar da atividade 1: campos nome, departamento e valor são obrigatórios
- Ao enviar da atividade 2: campo parecer_gestor é obrigatório
- Regra: se WKCompletTask == "true" e valor > 50000, exigir campo justificativa

#### afterTaskComplete
{{Descreva ações após completar tarefa}}
Exemplo:
- Após completar atividade 2: registrar data de aprovação no campo data_aprovacao

#### afterProcessCreate
{{Descreva ações após criar o processo}}
Exemplo:
- Gravar o número da solicitação num campo do formulário

#### afterProcessFinish
{{Descreva ações na finalização}}
Exemplo:
- Iniciar outro processo automaticamente via WebService
- Atualizar status num sistema externo via dataset

#### validateAvailableStates
{{Descreva filtros de atividades destino}}
Exemplo:
- Se perfil do usuário for "operador", só mostrar atividade 2
- Reordenar atividades destino

### Variáveis Globais (globalVars)
{{Se precisar compartilhar dados entre eventos}}
Exemplo:
- globalVars.put("aprovador", valorDoAprovador) no beforeTaskSave
- globalVars.get("aprovador") no afterTaskComplete

### Instruções Técnicas
- Use JavaScript server-side compatível com Fluig (var, sem ES6+)
- Use hAPI para acessar campos do formulário (getCardValue, setCardValue)
- Use getValue para parâmetros do processo (WKNumState, WKUser, WKCompletTask)
- Use throw "mensagem" para bloquear movimentação em eventos before
- Lembre: hAPI.getCardValue/setCardValue NÃO funciona na atividade inicial (atividade 1)
- Trate erros com try/catch
```

---

## O que esse prompt gera

Arquivos de evento conforme necessidade:
- **beforeStateEntry.js**
- **beforeTaskSave.js**
- **afterTaskComplete.js**
- **afterProcessCreate.js**
- **afterProcessFinish.js**
- **validateAvailableStates.js**
- Outros conforme solicitado

## Dicas de Uso

- Sempre informe o número das atividades — os eventos usam sequenceId pra saber em qual atividade estão
- Pra decisões automáticas, lembre de adicionar AutomaticTasks na extensão do processo
- O evento beforeTaskComplete NÃO bloqueia movimentação mesmo com throw — use beforeTaskSave pra validações
