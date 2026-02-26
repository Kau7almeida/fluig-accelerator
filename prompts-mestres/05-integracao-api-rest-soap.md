# Prompt Mestre: Integração API REST/SOAP Fluig

> Copie este prompt, preencha os campos entre `{{colchetes}}` e envie pro Claude.

---

## Prompt

```
Preciso que você crie uma integração no Fluig com as seguintes especificações:

### Tipo de Integração
{{REST ou SOAP}}

### Dados da API

#### Se REST:
- URL base: {{https://api.exemplo.com/v1}}
- Endpoint: {{/recurso}}
- Método: {{GET/POST/PUT/DELETE}}
- Headers: {{Content-Type: application/json, Authorization: Bearer xxx}}
- Query params (se GET): {{param1=valor1&param2=valor2}}
- Body (se POST/PUT): {{estrutura JSON esperada}}
- Autenticação: {{Basic user:pass / Bearer token / OAuth2}}
- Resposta esperada: {{estrutura JSON de retorno}}

#### Se SOAP:
- WSDL: {{url do wsdl}}
- Código do serviço no Fluig: {{codigoServico}}
- Classe do service locator: {{com.exemplo.ServiceLocator}}
- Método a chamar: {{nomeDoMetodo}}
- Parâmetros do método: {{liste os parâmetros}}

### Onde será consumido
{{Marque onde essa integração será usada}}
- [ ] Dataset avançado
- [ ] Evento de processo (qual evento?)
- [ ] Widget (client-side)
- [ ] Evento global

### Tratamento de Erros
- Em caso de falha na API: {{retornar vazio / lançar exceção / usar cache}}
- Timeout: {{quantos segundos}}
- Retry: {{quantas tentativas}}

### Dados de Retorno
{{O que precisa ser retornado/processado}}

Exemplo:
- Receber lista de pedidos da API
- Filtrar por status "pendente"
- Retornar: codigo, descricao, valor, dataPedido

### Instruções Técnicas
- JavaScript server-side compatível com Fluig (sem ES6+)
- Para REST: use java.net.URL, java.net.HttpURLConnection, java.io.BufferedReader
- Para SOAP: use ServiceManager.getServiceInstance
- Sempre trate exceções e faça log de erros
- Se for dataset, implemente filtros via constraints
```

---

## O que esse prompt gera

- Código completo da integração no formato adequado ao contexto (dataset, evento, etc.)
- Tratamento de erros e logging
- Parsing de resposta JSON/XML

## Dicas de Uso

- Pra integrações SOAP, o serviço precisa estar cadastrado no Fluig (Painel de Controle > Desenvolvimento > Serviços)
- Pra REST com autenticação, considere guardar credenciais em dataset de configuração
- Teste sempre no ambiente de homologação primeiro
