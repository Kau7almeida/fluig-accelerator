# Prompt Mestre: Formulário de Processo Fluig

> Copie este prompt, preencha os campos entre `{{colchetes}}` e envie pro Claude junto com o print do protótipo.

---

## Prompt

```
Preciso que você crie um formulário de processo Fluig com as seguintes especificações:

### Dados do Formulário
- Nome do formulário: {{frmNomeDoFormulario}}
- Processo vinculado: {{nomeDoProcesso}}
- Dataset vinculado: {{dsNomeDoDataset}}

### Campos do Formulário
{{Liste todos os campos com: nome, tipo (text/select/date/number/checkbox/textarea), obrigatório (sim/não)}}

Exemplo:
- nome___1 | text | sim
- departamento___2 | select (dataset: dsDepto) | sim  
- datasolicitacao___3 | date | sim
- valor___4 | number | não
- observacao___5 | textarea | não

### Campos Pai-Filho (se houver)
- Tabela: {{tableName}}
- Campos: {{liste os campos da tabela pai-filho}}

### Regras de Negócio
{{Descreva as validações e regras, por exemplo:}}
- O campo valor só aparece se o departamento for "Financeiro"
- O campo aprovador é obrigatório a partir da atividade 3
- Se valor > 50000, exigir campo justificativa

### Protótipo
[Cole aqui o print/screenshot do Figma]

### Instruções Técnicas
- Use APENAS HTML puro, CSS (inline ou tag style) e JavaScript vanilla (jQuery permitido)
- Siga as convenções de nomenclatura JYNX
- Inclua os eventos de formulário necessários (displayFields, validateForm, etc.)
- Gere o código completo: HTML + CSS + JS + eventos
- Campos devem seguir o padrão Fluig: nome___N (três underscores + número sequencial)
- O visual deve ser IDÊNTICO ao protótipo enviado
```

---

## O que esse prompt gera

1. **form.html** — Formulário completo com HTML/CSS/JS
2. **displayFields.js** — Controle de visibilidade dos campos por atividade
3. **validateForm.js** — Validações de campos obrigatórios
4. **inputFields.js** — Tratamento de dados antes de salvar (se necessário)

## Dicas de Uso

- Sempre envie o print do protótipo junto — o Claude consegue replicar o visual
- Quanto mais detalhado o campo "Regras de Negócio", melhor o resultado
- Após gerar, use o Prompt Mestre de Revisão (#06) para validar o código
