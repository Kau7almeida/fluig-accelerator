# Template: Documentação de Projeto Fluig

> Preencha os campos e use o Gemini para formatar no Google Docs.

---

## 1. Informações do Projeto

| Campo | Valor |
|-------|-------|
| **Cliente** | {{nome do cliente}} |
| **Projeto** | {{nome do projeto}} |
| **Responsável** | {{seu nome}} |
| **Data de Início** | {{dd/mm/yyyy}} |
| **Previsão de Entrega** | {{dd/mm/yyyy}} |
| **Status** | {{Em andamento / Concluído / Pausado}} |

## 2. Escopo

{{Descreva brevemente o que o projeto entrega}}

## 3. Arquitetura

### 3.1 Processos Workflow
| Processo | Código | Formulário | Atividades |
|----------|--------|------------|------------|
| {{nome}} | {{código}} | {{frmXxx}} | {{N atividades}} |

### 3.2 Datasets
| Dataset | Tipo | Fonte | Descrição |
|---------|------|-------|-----------|
| {{dsXxx}} | {{Avançado/JDBC/Formulário}} | {{API/BD/Interno}} | {{breve descrição}} |

### 3.3 Widgets
| Widget | Página | Descrição |
|--------|--------|-----------|
| {{wdgXxx}} | {{nome da página}} | {{breve descrição}} |

### 3.4 Integrações
| Integração | Tipo | Sistema Externo | Descrição |
|------------|------|-----------------|-----------|
| {{nome}} | {{REST/SOAP/JDBC}} | {{sistema}} | {{breve descrição}} |

## 4. Fluxo de Dados

{{Descreva como os dados fluem entre formulários, datasets e sistemas externos}}

## 5. Eventos Implementados

| Processo | Evento | Descrição |
|----------|--------|-----------|
| {{processo}} | {{beforeTaskSave}} | {{o que faz}} |

## 6. Dependências

{{Liste dependências externas: APIs, serviços cadastrados, datasources}}

## 7. Instruções de Deploy

1. {{passo 1}}
2. {{passo 2}}
3. {{passo 3}}

## 8. Observações

{{Notas importantes, limitações conhecidas, pontos de atenção}}
