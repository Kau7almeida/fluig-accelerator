# 🚀 Fluig Accelerator

Repositório central para acelerar o desenvolvimento Fluig utilizando IA como motor principal do fluxo de trabalho.

## Objetivo

Aumentar em até 100% a velocidade e qualidade de desenvolvimento na plataforma TOTVS Fluig, combinando prompts mestres, templates reutilizáveis e uma Skill personalizada que ensina a IA a gerar código Fluig correto.

## Estrutura do Repositório

```
fluig-accelerator/
│
├── skill-fluig/           → Skill personalizada com todas as regras do Fluig
│   └── SKILL-FLUIG.md        (documento que ensina a IA a trabalhar com Fluig)
│
├── prompts-mestres/       → Prompts reutilizáveis por tipo de artefato
│   ├── 01-formulario-processo.md
│   ├── 02-tela-consulta-widget.md
│   ├── 03-dataset-integracao.md
│   ├── 04-eventos-processo.md
│   ├── 05-integracao-api-rest-soap.md
│   └── 06-revisao-codigo.md
│
├── templates-base/        → Código esqueleto no padrão JYNX
│   ├── formulario/           (HTML/CSS/JS base de formulários)
│   ├── widget/               (estrutura base de widgets)
│   ├── dataset/              (esqueleto de datasets)
│   └── eventos/              (templates de eventos de processo)
│
├── snippets/              → Código validado e reutilizável
│   ├── formularios/          (componentes de formulário prontos)
│   ├── widgets/              (widgets reutilizáveis)
│   ├── datasets/             (datasets validados)
│   ├── eventos/              (eventos de processo comuns)
│   └── integracoes/          (integrações REST/SOAP prontas)
│
└── docs/                  → Templates de documentação
    └── template-documentacao-projeto.md
```

## Como Usar

### 1. Skill Fluig
A Skill fica no projeto "Especialista Fluig" do Claude. Ela já está configurada e é carregada automaticamente em toda conversa nova dentro do projeto.

### 2. Prompts Mestres
Cada prompt mestre é um template que você preenche com os parâmetros do seu projeto e envia pro Claude. O prompt já inclui referência à Skill, então o Claude sabe as regras do Fluig.

**Fluxo:**
1. Abra o prompt mestre correspondente ao tipo de artefato
2. Preencha os parâmetros (nome do dataset, campos, regras de negócio)
3. Cole no Claude junto com o print do protótipo (se houver)
4. Receba o código pronto no padrão Fluig/JYNX

### 3. Templates Base
Use como ponto de partida. Copie o template, preencha com a lógica específica do projeto.

### 4. Snippets
Toda vez que gerar um código bom com IA, salve aqui como snippet para reutilizar em projetos futuros.

### 5. Documentação
Use os templates de docs para padronizar a documentação dos seus projetos.

## Ferramentas do Ecossistema

| Ferramenta | Função |
|------------|--------|
| **Claude** | Motor de código: gerar, revisar, documentar |
| **Gemini** | Google Workspace: docs, planilhas, apontamentos |
| **ChatGPT** | Apoio geral, quando créditos do Claude acabarem |
| **NotebookLM** | Base de conhecimento por projeto/cliente |
| **GitHub** | Este repositório — templates, prompts, snippets |

## Convenções JYNX

- Formulários: `frmXxx`
- Datasets: `dsXxx`
- Widgets: `wdgXxx`
- Eventos: seguem nomenclatura padrão Fluig

> ⚠️ **Importante:** Adapte as convenções acima para o padrão real da JYNX. Esses são placeholders — atualize com as convenções exatas que vocês usam.

---

*Criado por Kauã — Desenvolvedor Fullstack @ JYNX*
