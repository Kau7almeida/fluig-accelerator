# Prompt Mestre: Dataset e Integração Fluig

> Copie este prompt, preencha os campos entre `{{colchetes}}` e envie pro Claude.

---

## Prompt

```
Preciso que você crie um dataset Fluig com as seguintes especificações:

### Dados do Dataset
- Nome: {{dsNomeDoDataset}}
- Tipo: {{Avançado / JDBC / Formulário}}
- Descrição: {{breve descrição do que o dataset retorna}}

### Colunas de Retorno
{{Liste as colunas que o dataset deve retornar}}

Exemplo:
- codigo | String
- descricao | String
- valor | Double
- dataRegistro | Date
- status | String

### Fonte de Dados
{{Descreva de onde vêm os dados}}

Opção A — API REST externa:
- URL: {{url_da_api}}
- Método: {{GET/POST}}
- Headers: {{Content-Type, Authorization, etc.}}
- Body (se POST): {{estrutura do body}}
- Autenticação: {{Basic/Bearer/OAuth}}

Opção B — API SOAP (WebService):
- Código do serviço cadastrado no Fluig: {{codigoServico}}
- Classe do locator: {{com.exemplo.ServiceLocator}}
- Método: {{nomeDoMetodo}}

Opção C — Banco de dados externo (JDBC):
- Datasource: {{nomeDoAppDS}}
- Query SQL: {{SELECT ... FROM ...}}

Opção D — Outro dataset Fluig:
- Dataset de origem: {{dsOutroDataset}}
- Transformação: {{descreva o que precisa fazer com os dados}}

### Filtros (Constraints)
{{Se o dataset deve aceitar filtros, liste quais}}

Exemplo:
- codigo: filtrar por código específico
- dataInicio/dataFim: filtrar por período
- status: filtrar por status

### Sincronização
- Necessita sincronização? {{sim/não}}
- Frequência: {{a cada X horas/diário}}

### Instruções Técnicas
- Use JavaScript server-side compatível com Fluig (sem ES6+, sem let/const, usar var)
- Use DatasetBuilder para montar o retorno
- Trate erros com try/catch e log.error
- Se for integração REST, use java.net.URL e java.io.BufferedReader
- Se for SOAP, use ServiceManager.getServiceInstance
- Implemente os filtros via parâmetro constraints da função createDataset
```

---

## O que esse prompt gera

1. **dsNomeDoDataset.js** — Código completo do dataset com função createDataset

## Dicas de Uso

- Pra integrações REST, sempre peça tratamento de timeout e retry
- Pra JDBC, lembre que a partir da 1.6.5 selects por constraint são bloqueados — use AppDS
- Combine com o Prompt Mestre #06 (Revisão) pra validar segurança e performance
