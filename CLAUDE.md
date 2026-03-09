# CLAUDE.md — Fluig Accelerator (Jynx)

> **Este arquivo é lido automaticamente pelo Claude Code.**
> Ele define o contexto global do projeto e aponta para as skills especializadas.

---

## 1. Sobre este repositório

Este é o acelerador de desenvolvimento TOTVS Fluig da **Jynx**. Ele contém skills, templates, snippets e prompts padronizados para gerar artefatos Fluig com qualidade de produção.

**Objetivo:** eliminar retrabalho, padronizar entregas e garantir que todo código gerado funcione no ecossistema Fluig sem adaptações manuais.

---

## 2. Regras globais (aplica-se a TUDO)

### 2.1 Linguagem e formato

- Responder **sempre em português (Brasil)**
- Estrutura obrigatória: resumo executivo → premissas → implementação → código → testes → riscos
- Código **pronto para colar** — nunca pseudocódigo

### 2.2 Compatibilidade server-side (Rhino ES5)

Scripts de **dataset**, **eventos de processo** e **eventos de formulário** rodam no motor Rhino.

**PROIBIDO usar:**
- `let`, `const` → usar `var`
- Arrow functions `=>` → usar `function() {}`
- Template literals `` ` `` → usar concatenação `+`
- `Array.find()`, `Array.includes()`, `Array.filter()` → usar loops `for`
- `Promise`, `async/await` → síncrono sempre
- `Object.keys()`, `Object.values()`, `Object.entries()`
- Destructuring `{ a, b } = obj`
- Default parameters `function(x = 1)`
- Spread operator `...`

**PERMITIDO usar (Java no Rhino):**
- `java.util.HashMap`, `java.util.ArrayList`
- `java.lang.String`, `java.lang.Integer`
- `new java.text.SimpleDateFormat()`
- `java.util.Calendar.getInstance()`
- Classes Java via `Packages.` ou importação direta

### 2.3 Front-end (formulários e widgets)

- **jQuery** é o padrão (já disponível na plataforma)
- **FLUIGC** para componentes (autocomplete, modal, toast, loading, datatable)
- **Fluig Style Guide** para CSS — encapsular com `.fluig-style-guide`
- Sem variáveis globais — usar **IIFE** ou **namespace**
- Eventos em DOM dinâmico — usar **delegação**: `$(document).on('click', '.seletor', fn)`
- Montar HTML em string e inserir uma vez (nunca manipular DOM em loop)

### 2.4 Nomenclatura

| Artefato | Padrão | Exemplo |
|---|---|---|
| Formulário | `frm` + PascalCase | `frmSolicitacaoCompras` |
| Dataset | `ds` + PascalCase | `dsSolicitacaoCompras` |
| Widget | PascalCase | `SolicitacaoComprasWidget` |
| **Processo/Workflow** | **Sem prefixo** | `Solicitação de Compras` |
| Eventos de processo | nome do evento | `beforeTaskSave` |
| Eventos de formulário | nome do evento | `displayFields` |
| Campo text | `txt_` + snake_case | `txt_solicitante` |
| Campo number | `nb_` + snake_case | `nb_valor` |
| Campo hidden | `hd_` + snake_case | `hd_processId` |
| Campo select | `slc_` + snake_case | `slc_categoria` |
| Campo textarea | `txta_` + snake_case | `txta_justificativa` |
| Campo zoom | `txtz_` + snake_case | `txtz_fornecedor` |
| Campo date | `dt_` + snake_case | `dt_prazo` |
| Campo checkbox | `chk_` + snake_case | `chk_urgente` |
| Painel/Panel (classe CSS) | `pnl_` + snake_case | `pnl_aprovacao` |
| Tabela pai-filho | camelCase | `itensCompra` |

### 2.5 Tratamento de erros

- **Server-side**: `try/catch` em TODA integração e acesso a dataset externo
- **Eventos de processo**: logar com `log.info()` / `log.error()` com contexto (processId, atividade, usuário)
- **Front-end**: `try/catch` em chamadas AJAX, com fallback visual (toast de erro)
- **Validação**: usar `throw "mensagem"` para bloquear movimentação com feedback claro
- **Nunca** usar `eval()`

### 2.6 Performance

- Minimizar chamadas de dataset — cachear resultado em variável quando reutilizado
- Não carregar colunas desnecessárias — especificar `fields` no `DatasetFactory.getDataset()`
- Definir limites/paginação para volumes altos
- Front: debounce em filtros e buscas (mínimo 300ms)
- Front: montar HTML completo em string antes de inserir no DOM

### 2.7 Segurança

- Sanitizar/escapar conteúdo antes de exibir em HTML (prevenir XSS)
- Validar todas as entradas (campos, constraints, parâmetros de URL)
- Nunca confiar apenas em validação front-end — validar também no `validateForm` ou `beforeTaskSave`

---

## 3. Base de conhecimento oficial (documentação TDN local)

A pasta `docs/fluig-tdn/` contém **toda a documentação oficial do TOTVS Fluig** extraída do TDN (TOTVS Developer Network), com aproximadamente **1859 arquivos Markdown**. O índice dos arquivos está em `docs/fluig-tdn/_index.json`.

**Regras de uso obrigatório:**

- **Todo código, solução e artefato gerado DEVE estar em conformidade** com as práticas, APIs e padrões descritos nesta documentação.
- Quando houver dúvida sobre uma API, evento, dataset, componente ou comportamento da plataforma, **consultar primeiro os arquivos locais** em `docs/fluig-tdn/` antes de recorrer a web search ou web fetch.
- Para localizar o arquivo relevante, buscar pelo nome do tema (ex.: `hapi.md`, `eventos-de-processos.md`, `desenvolvimento-de-datasets.md`, `formcontroller.md`).
- **Nunca inventar APIs, métodos ou comportamentos** que não estejam documentados nesta base ou nas skills do projeto.
- Esta documentação é a **fonte de verdade** para nomes de métodos, parâmetros, retornos e exemplos oficiais.

---

## 4. Skill principal

Antes de gerar qualquer artefato Fluig, **leia obrigatoriamente**:

```
skill-fluig/SKILL-FLUIG.md
```

Esse arquivo orquestra quais sub-skills consultar para cada tipo de artefato.

---

## 5. Estrutura do repositório

```
fluig-accelerator/
│
├── CLAUDE.md                          ← VOCÊ ESTÁ AQUI
│
├── skill-fluig/
│   ├── SKILL-FLUIG.md                 ← orquestrador geral (leia PRIMEIRO)
│   ├── skills/
│   │   ├── 01-form.md                 ← padrões de formulário HTML
│   │   ├── 02-form-events.md          ← displayFields, validateForm, enableFields, inputFields
│   │   ├── 03-process-events.md       ← beforeTaskSave, afterProcessCreate, hAPI
│   │   ├── 04-datasets.md             ← datasets customizados ES5/Rhino
│   │   ├── 05-widgets.md              ← widgets, SuperWidget, view.ftl, application.js
│   │   └── 06-service-tasks.md        ← integrações REST/SOAP, ServiceManager
│
├── templates/                         ← templates base para acelerar criação
│   ├── form/                          ← HTML de formulário padrão
│   ├── widget/                        ← estrutura de widget padrão
│   ├── dataset/                       ← dataset customizado padrão
│   └── events/                        ← eventos de formulário e processo
│
├── snippets/                          ← trechos reutilizáveis
├── prompts-mestres/                   ← prompts otimizados para tarefas comuns
│
├── docs/                              ← documentação complementar
│   └── fluig-tdn/                     ← DOCUMENTAÇÃO OFICIAL TDN (~1859 arquivos .md)
│       ├── _index.json                ← índice da documentação
│       ├── hapi.md                    ← ex.: documentação da hAPI
│       ├── eventos-de-processos.md    ← ex.: eventos de processos
│       ├── desenvolvimento-de-datasets.md
│       └── ...                        ← toda documentação TOTVS Fluig
```

---

## 6. Protocolo de atendimento

Ao receber um pedido de desenvolvimento Fluig, siga estas etapas:

### Etapa 1 — Diagnóstico

Antes de escrever código, valide:

- **Tipo de artefato**: formulário, dataset, workflow, widget, serviceTask?
- **Campos envolvidos**: IDs (`nome___1`, `valor___2`), tipos, obrigatoriedade
- **Atividades do processo**: números e nomes (ex.: atividade 2 = Aprovação Gestor)
- **Regras de visibilidade**: quais painéis/campos mostrar/ocultar em cada atividade
- **Evidência do problema** (se for correção): erro no console, log do servidor, print, payload

Se faltar dado essencial, pergunte de forma objetiva usando o template:

```
Para gerar a solução preciso de:
1. [dado que falta]
2. [dado que falta]
Enquanto isso, já posso adiantar [o que for possível].
```

### Etapa 2 — Hipóteses (se for diagnóstico)

Liste 2–5 hipóteses prováveis com forma de confirmar cada uma.

### Etapa 3 — Solução implementável

- Indicar **onde** colocar o código (arquivo, evento, pasta)
- Entregar código **completo e funcional**
- Notas sobre dependências, permissões e cache

### Etapa 4 — Testes e publicação

- Cenários: caminho feliz, erro, borda
- Checklist: exportar/publicar, limpar cache, verificar permissões, testar em cada atividade

---

## 7. Quando houver trade-off

Sempre que existir trade-off relevante, apresente duas abordagens:

- **Abordagem A** — mais rápida/simples (quando usar)
- **Abordagem B** — mais robusta/escalável (quando usar)

---

## 8. Regra de ouro

> **Não inventar APIs, nomes de serviços, campos ou retornos.**
> Se faltar dado, solicitar o mínimo necessário para garantir precisão.
> Todo código deve funcionar ao colar — sem adaptações manuais.

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