# Prompt Mestre: Revisão de Código Fluig

> Cole seu código após este prompt e envie pro Claude.

---

## Prompt

```
Revise o código Fluig abaixo seguindo este checklist:

### 1. Compatibilidade com Fluig
- [ ] Sem ES6+ no server-side (sem let/const, sem arrow functions, sem template literals, sem destructuring)
- [ ] Sem import/export
- [ ] Sem bibliotecas npm
- [ ] Usa var para declaração de variáveis no server-side
- [ ] HTML/CSS/JS puro no client-side (jQuery permitido)

### 2. Segurança
- [ ] Sem SQL injection (se usar JDBC)
- [ ] Sem XSS (dados do usuário são sanitizados antes de exibir)
- [ ] Credenciais não estão hardcoded no código
- [ ] Constraints não passam SELECT direto (regra a partir da 1.6.5)

### 3. Performance
- [ ] Queries/datasets são filtrados (não trazem todos os registros sem necessidade)
- [ ] Loops são eficientes (sem chamadas de dataset dentro de loop)
- [ ] Client-side: vcXMLRPC.js usado com cuidado (datasets grandes impactam banda)
- [ ] Uso de sqlLimit quando aplicável

### 4. Tratamento de Erros
- [ ] try/catch em integrações e operações críticas
- [ ] log.error/log.info para debugging
- [ ] Mensagens de erro claras para o usuário (throw com mensagem descritiva)
- [ ] Tratamento de valores nulos/vazios

### 5. Padrões e Convenções
- [ ] Nomenclatura segue padrão JYNX (frmXxx, dsXxx, wdgXxx)
- [ ] Campos do formulário seguem padrão nome___N
- [ ] Código comentado nos pontos críticos
- [ ] Funções têm responsabilidade única

### 6. Boas Práticas Fluig
- [ ] hAPI.getCardValue/setCardValue não usado na atividade inicial
- [ ] beforeTaskComplete não usado para validações (não bloqueia)
- [ ] WKCompletTask verificado antes de validar campos obrigatórios
- [ ] globalVars usado para compartilhar dados entre eventos (não variáveis globais JS)
- [ ] afterStateEntry não usado para ações críticas (erros são ignorados silenciosamente)

Aponte TUDO que precisa ser corrigido, explique o porquê e forneça o código corrigido.

### Código para revisão:
```

---

## Dicas de Uso

- Use SEMPRE após gerar código com os outros prompts mestres
- Esse é o prompt que te dá qualidade de código de nível sênior
- Salve os feedbacks recorrentes como regras adicionais neste prompt
