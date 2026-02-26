# Prompt Mestre: Tela de Consulta (Widget) Fluig

> Copie este prompt, preencha os campos entre `{{colchetes}}` e envie pro Claude junto com o print do protótipo.

---

## Prompt

```
Preciso que você crie uma tela de consulta (widget) Fluig com as seguintes especificações:

### Dados da Widget
- Nome da widget: {{wdgNomeDaWidget}}
- Dataset de origem: {{dsNomeDoDataset}}

### Filtros
{{Liste os filtros disponíveis com: nome do campo, tipo de filtro (text/select/date-range/number)}}

Exemplo:
- Número NF | text
- Fornecedor | select (dataset: dsFornecedores, key: codFornecedor, value: nomeFornecedor)
- Período | date-range (dataInicio, dataFim)
- Status | select (opções fixas: Pendente, Aprovado, Rejeitado)

### Colunas da Tabela de Resultados
{{Liste as colunas com: título exibido, campo do dataset, largura aproximada}}

Exemplo:
- Nº NF | numNF | 10%
- Fornecedor | nomeFornecedor | 25%
- Valor | valor | 15% (formatar como moeda BRL)
- Data Emissão | dataEmissao | 15% (formatar como dd/mm/yyyy)
- Status | status | 15%
- Ações | - | 20% (botões: Visualizar, Aprovar)

### Ações/Botões
{{Descreva as ações disponíveis em cada linha e/ou ações globais}}

Exemplo:
- Botão "Visualizar": abre modal com detalhes do registro
- Botão "Aprovar": executa chamada de aprovação
- Botão "Exportar": exporta resultados filtrados para Excel/CSV

### Paginação
- Registros por página: {{10/20/50}}

### Protótipo
[Cole aqui o print/screenshot do Figma]

### Instruções Técnicas
- Use APENAS HTML puro, CSS e JavaScript vanilla (jQuery permitido)
- Acesse o dataset via vcXMLRPC.js (client-side)
- Use FLUIGC.datatable se aplicável, ou tabela HTML customizada
- Inclua loading/spinner durante a busca
- Trate cenário de "nenhum resultado encontrado"
- O visual deve ser IDÊNTICO ao protótipo enviado
- Siga o Guia de Estilos Fluig (fluig-style-guide)
```

---

## O que esse prompt gera

1. **view.ftl** — Template FreeMarker da widget
2. **application.info** — Configuração da widget
3. **resources/js/{{widget}}.js** — Lógica JavaScript (filtros, tabela, paginação)
4. **resources/css/{{widget}}.css** — Estilos customizados

## Dicas de Uso

- Se a widget precisa de dataset próprio, combine com o Prompt Mestre #03 (Dataset)
- Pra widgets com muitas interações, detalhe cada ação no campo "Ações/Botões"
- Lembre-se: widgets usam FreeMarker (.ftl), não HTML puro como formulários
