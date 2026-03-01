# 01-form.md — Padrões de Formulário HTML Fluig

> **Consulte esta skill ao criar ou editar formulários HTML no Fluig.**
> Cobre: estrutura base, campos, pai-filho, zoom, Style Guide, mobile e boas práticas.

---

## 1. Estrutura base de um formulário

Todo formulário Fluig é um arquivo HTML. O Fluig **não suporta estrutura de pastas** — todos os arquivos (HTML, JS, CSS, imagens) ficam na raiz da definição de formulário.

### 1.1 Skeleton mínimo

```html
<html>
<head>
    <!-- Style Guide Fluig (obrigatório para visual padrão) -->
    <link rel="stylesheet" type="text/css" href="/style-guide/css/fluig-style-guide.min.css" />
    <script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="/portal/resources/js/jquery/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/style-guide/js/fluig-style-guide.min.js"></script>
</head>
<body>
    <div class="fluig-style-guide">
        <form name="form" role="form">

            <!-- ═══════════════════════════════════════ -->
            <!-- CAMPOS HIDDEN (controle do processo)    -->
            <!-- ═══════════════════════════════════════ -->
            <input type="hidden" name="hd_metadata_id" id="hd_metadata_id" />

            <!-- ═══════════════════════════════════════ -->
            <!-- PAINEL: Dados da Solicitação            -->
            <!-- ═══════════════════════════════════════ -->
            <div class="panel panel-default pnl_solicitacao">
                <div class="panel-heading">
                    <h3 class="panel-title">Dados da Solicitação</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label class="control-label" for="txt_solicitante">Solicitante</label>
                            <input type="text" class="form-control" name="txt_solicitante" id="txt_solicitante" />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="dt_solicitacao">Data</label>
                            <input type="text" class="form-control" name="dt_solicitacao" id="dt_solicitacao" mask="99/99/9999" />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="slc_departamento">Departamento</label>
                            <select class="form-control" name="slc_departamento" id="slc_departamento">
                                <option value="">Selecione...</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>

    <!-- Scripts do formulário (separar do HTML) -->
    <script src="form-scripts.js"></script>
</body>
</html>
```

### 1.2 Regras fundamentais

| Regra | Detalhe |
|---|---|
| Encapsular com `.fluig-style-guide` | Sem essa classe wrapper, o Style Guide não é aplicado |
| `<form name="form">` | Nome obrigatório `form` para o Fluig reconhecer |
| Arquivos na raiz | Sem subpastas — o Fluig achata a estrutura |
| Scripts em arquivo separado | Evitar `<script>` inline no HTML. Importar via `<script src="...">` |
| Campos hidden para controle | Usar para dados que não aparecem mas precisam ser persistidos |

---

## 2. Campos do formulário

### 2.1 Convenção de nomenclatura (padrão Jynx)

O Fluig usa o atributo `name` para persistir os dados. Os atributos `name`, `id` e `for` (da label) **devem ser iguais** para garantir compatibilidade com eventos e mobile.

#### Prefixos obrigatórios por tipo de campo

| Tipo do campo | Prefixo | Exemplo de name/id |
|---|---|---|
| text | `txt_` | `txt_solicitante` |
| number | `nb_` | `nb_valor` |
| hidden | `hd_` | `hd_processId` |
| select | `slc_` | `slc_categoria` |
| textarea | `txta_` | `txta_justificativa` |
| zoom | `txtz_` | `txtz_fornecedor` |
| date | `dt_` | `dt_prazo` |
| checkbox | `chk_` | `chk_urgente` |
| painel/panel (classe CSS) | `pnl_` | `pnl_aprovacao` |

> **Regra:** o prefixo identifica o tipo do campo. Após o prefixo, usar nome descritivo em snake_case.
> Em tabelas **pai-filho**, NÃO incluir `___N` no `name` — o Fluig gera automaticamente (ex.: `txt_produto` vira `txt_produto___1`, `txt_produto___2`...).
> Para campos **fora** de pai-filho, o `name` segue o padrão `prefixo_descricao` sem `___N`.

### 2.2 Tipos de campos suportados

#### Text / Number / Date / Email

```html
<div class="form-group">
    <label class="control-label" for="txt_solicitante">Solicitante</label>
    <input type="text" class="form-control" name="txt_solicitante" id="txt_solicitante" />
</div>
```

```html
<div class="form-group">
    <label class="control-label" for="nb_valor">Valor</label>
    <input type="number" class="form-control" name="nb_valor" id="nb_valor" step="0.01" />
</div>
```

```html
<div class="form-group">
    <label class="control-label" for="dt_solicitacao">Data</label>
    <input type="text" class="form-control" name="dt_solicitacao" id="dt_solicitacao"
           mask="99/99/9999" placeholder="dd/mm/aaaa" />
</div>
```

> **Atenção:** o atributo `mask` **não funciona no mobile**. Se mobile for requisito, implementar máscara via JS.

#### Select (ComboBox)

**Opções fixas:**

```html
<div class="form-group">
    <label class="control-label" for="slc_prioridade">Prioridade</label>
    <select class="form-control" name="slc_prioridade" id="slc_prioridade">
        <option value="">Selecione...</option>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
    </select>
</div>
```

**Alimentado por dataset (via atributos HTML):**

```html
<div class="form-group">
    <label class="control-label" for="slc_departamento">Departamento</label>
    <select class="form-control" name="slc_departamento" id="slc_departamento"
            dataset="dsDeptos"
            datasetkey="codDepto"
            datasetvalue="nomeDepto"
            addBlankLine="true">
    </select>
</div>
```

| Atributo | Descrição |
|---|---|
| `dataset` | Código do dataset |
| `datasetkey` | Coluna usada como `value` da option |
| `datasetvalue` | Coluna usada como texto visível da option |
| `addBlankLine` | `true` adiciona option vazia no topo |

#### Textarea

```html
<div class="form-group">
    <label class="control-label" for="txta_observacao">Observação</label>
    <textarea class="form-control" name="txta_observacao" id="txta_observacao" rows="4"></textarea>
</div>
```

#### Checkbox

```html
<div class="checkbox">
    <label>
        <input type="checkbox" name="chk_aceite" id="chk_aceite" value="on" />
        Li e aceito os termos
    </label>
</div>
```

> O Fluig persiste `"on"` quando marcado e vazio quando desmarcado.

#### Radio Button

```html
<div class="form-group">
    <label class="control-label">Tipo</label>
    <div class="radio">
        <label><input type="radio" name="slc_tipo" value="interno" /> Interno</label>
    </div>
    <div class="radio">
        <label><input type="radio" name="slc_tipo" value="externo" /> Externo</label>
    </div>
</div>
```

> **Obrigatório** usar atributo `value` em radio buttons para persistência correta.
> Radio buttons usam prefixo `slc_` pois funcionam como seleção exclusiva.

---

## 3. Campo Zoom (pesquisa)

O zoom permite buscar dados de datasets de forma interativa (modal de pesquisa).

### 3.1 Zoom básico

```html
<div class="form-group">
    <label class="control-label" for="txtz_usuario">Usuário</label>
    <input type="zoom" class="form-control" name="txtz_usuario" id="txtz_usuario"
           data-zoom="{
               'displayKey': 'colleagueName',
               'datasetId': 'colleague',
               'placeholder': 'Selecione o usuário',
               'fields': [
                   { 'field': 'colleagueId', 'label': 'ID' },
                   { 'field': 'colleagueName', 'label': 'Nome', 'standard': 'true' },
                   { 'field': 'login', 'label': 'Login' }
               ]
           }" />
</div>
```

| Propriedade | Descrição |
|---|---|
| `displayKey` | Campo do dataset exibido no input após seleção |
| `datasetId` | Código do dataset a ser consultado |
| `placeholder` | Texto placeholder do input |
| `fields` | Colunas exibidas na modal de pesquisa |
| `fields[].standard` | `'true'` = coluna usada como filtro padrão |
| `maximumSelectionLength` | Máximo de itens selecionáveis (padrão: 1) |

### 3.2 Zoom com valor oculto (zoomvalue)

Quando se precisa armazenar um ID além do texto visível:

```html
<!-- Campo hidden que recebe o ID automaticamente -->
<input type="hidden" name="hidden_txtz_usuario" id="hidden_txtz_usuario" />

<!-- Campo zoom visível -->
<input type="zoom" class="form-control" name="txtz_usuario" id="txtz_usuario"
       zoomvalue="colleagueId"
       data-zoom="{
           'displayKey': 'colleagueName',
           'datasetId': 'colleague',
           'fields': [
               { 'field': 'colleagueId', 'label': 'ID' },
               { 'field': 'colleagueName', 'label': 'Nome', 'standard': 'true' }
           ]
       }" />
```

O `hidden_txtz_usuario` será preenchido automaticamente com o valor de `colleagueId`.

> **Regra:** o campo hidden **deve** ter o prefixo `hidden_` seguido do mesmo `name` do zoom.
> Note que o hidden do zoom **não usa** o prefixo `hd_` — o Fluig exige literalmente `hidden_` + nome do campo zoom.

### 3.3 Callbacks do Zoom

```javascript
// Executada quando um item é selecionado
function setSelectedZoomItem(selectedItem) {
    // selectedItem é um objeto com os campos do dataset
    var userId = selectedItem['colleagueId'];
    var userName = selectedItem['colleagueName'];
}

// Para múltiplas chamadas de zoom, use o parâmetro 'type' no data-zoom
// e diferencie no callback
```

### 3.4 Zoom no mobile

- Usar servço nativo do Fluig (não suporta serviços personalizados)
- Limitar o número de campos para caber em tela
- Registrar o dataset nas propriedades do formulário (aba "Datasets do Formulário")

---

## 4. Tabela Pai-Filho

Permite registros dinâmicos (adicionar/remover linhas) dentro do formulário.

### 4.1 Estrutura HTML

```html
<table class="table table-bordered table-striped"
       tablename="itensCompra"
       addbuttonlabel="Adicionar Item"
       cellspacing="0"
       width="100%"
       id="tblItensCompra">
    <thead>
        <tr class="tableHeadRow">
            <td class="tableColumn">Produto</td>
            <td class="tableColumn">Quantidade</td>
            <td class="tableColumn">Valor Unit.</td>
        </tr>
    </thead>
    <tbody>
        <tr class="tableBodyRow" id="linhaItem">
            <td><input class="form-control" type="text" name="txt_produto" id="txt_produto" /></td>
            <td><input class="form-control" type="number" name="nb_quantidade" id="nb_quantidade" /></td>
            <td><input class="form-control" type="number" name="nb_vlr_unitario" id="nb_vlr_unitario" step="0.01" /></td>
        </tr>
    </tbody>
</table>
```

### 4.2 Atributos obrigatórios

| Atributo | Onde | Descrição |
|---|---|---|
| `tablename` | `<table>` | Identificador da tabela pai-filho (camelCase, sem `___`) |
| `addbuttonlabel` | `<table>` | Texto do botão "Adicionar" |
| `class="tableHeadRow"` | `<tr>` do thead | Identifica a linha de cabeçalho |
| `class="tableColumn"` | `<td>` do thead | Identifica cada coluna do cabeçalho |
| `class="tableBodyRow"` | `<tr>` do tbody | Identifica o template da linha (será clonado) |

### 4.3 Atributos opcionais

| Atributo | Onde | Descrição |
|---|---|---|
| `noaddbutton="true"` | `<table>` | Remove o botão de adicionar (para controle manual via JS) |
| `nodeleteline="true"` | `<table>` | Remove o botão de excluir linha |

### 4.4 Como os campos são persistidos

Ao adicionar linhas, o Fluig gera automaticamente:

```
txt_produto___1, nb_quantidade___1, nb_vlr_unitario___1
txt_produto___2, nb_quantidade___2, nb_vlr_unitario___2
...
```

> **Não use `___` no `name` dos campos dentro da tabela pai-filho.** O Fluig adiciona automaticamente.
> **Não use `___` no `name` de `<td>` (coluna)** — causa problemas no mobile.

### 4.5 Acessando dados pai-filho em eventos

No **evento de formulário** (ex.: validateForm):

```javascript
function validateForm(form) {
    var indexes = form.getChildrenIndexes("itensCompra");
    var total = 0;
    for (var i = 0; i < indexes.length; i++) {
        var valor = parseFloat(form.getValue("nb_vlr_unitario___" + indexes[i]));
        if (isNaN(valor)) { valor = 0; }
        total = total + valor;
    }
    if (total < 100) {
        throw "Valor total dos itens não pode ser inferior a R$ 100,00";
    }
}
```

No **evento de processo** (ex.: beforeTaskSave):

```javascript
function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var indexes = hAPI.getChildrenIndexes("itensCompra");
    for (var i = 0; i < indexes.length; i++) {
        var produto = hAPI.getCardValue("txt_produto___" + indexes[i]);
        log.info("Produto: " + produto);
    }
}
```

---

## 5. Layout com Style Guide

### 5.1 Grid responsivo (Bootstrap 3)

O Fluig Style Guide usa grid Bootstrap 3. O padrão Jynx é:

```
div.row > div.form-group.col-md-N > label + input
```

A classe `col-md-*` vai **direto na `div.form-group`**, sem div wrapper extra de coluna. Cada `div.row` representa uma linha do formulário.

```html
<div class="row">
    <div class="form-group col-md-4">
        <label class="control-label" for="txt_nome">Nome</label>
        <input type="text" class="form-control" name="txt_nome" id="txt_nome" />
    </div>
    <div class="form-group col-md-4">
        <label class="control-label" for="dt_nascimento">Data Nasc.</label>
        <input type="text" class="form-control" name="dt_nascimento" id="dt_nascimento" />
    </div>
    <div class="form-group col-md-4">
        <label class="control-label" for="txt_cpf">CPF</label>
        <input type="text" class="form-control" name="txt_cpf" id="txt_cpf" mask="999.999.999-99" />
    </div>
</div>
```

**Tamanhos de referência (12 colunas por linha):**

| Campos por linha | Classe | Largura |
|---|---|---|
| 1 campo | `col-md-12` | 100% |
| 2 campos | `col-md-6` | 50% cada |
| 3 campos | `col-md-4` | 33% cada |
| 4 campos | `col-md-3` | 25% cada |
| Misto | `col-md-6` + `col-md-3` + `col-md-3` | 50% + 25% + 25% |

> **Regra Jynx:** sempre envolver os `form-group` em uma `div.row`. Nunca colocar `form-group` solto dentro do `panel-body`.
> **Regra do grid:** a soma dos valores `col-md-N` dentro de uma mesma `div.row` **não pode ultrapassar 12**. Se ultrapassar, os campos excedentes caem para a linha de baixo, quebrando o layout.

### 5.2 Painéis (para controle de visibilidade)

Usar painéis Bootstrap com **classe CSS identificável** para controlar visibilidade via `displayFields` (server-side):

```html
<!-- Painel da Solicitação (visível na abertura) -->
<div class="panel panel-default pnl_solicitacao">
    <div class="panel-heading">
        <h3 class="panel-title">Dados da Solicitação</h3>
    </div>
    <div class="panel-body">
        <!-- campos -->
    </div>
</div>

<!-- Painel do Parecer (visível na aprovação) -->
<div class="panel panel-default pnl_parecer">
    <div class="panel-heading">
        <h3 class="panel-title">Parecer do Gestor</h3>
    </div>
    <div class="panel-body">
        <!-- campos -->
    </div>
</div>
```

> **Regra Jynx:** nomear painéis com prefixo `pnl_` + contexto. O controle de visibilidade é feito pelo evento server-side `displayFields` (ver `02-form-events.md`).

### 5.3 Componentes visuais úteis

**Alertas / Banners de status:**

```html
<div class="alert alert-success pnl_status_banner" role="alert">
    <strong>Aprovado!</strong> Solicitação aprovada em 01/01/2025.
</div>
```

**Separadores:**

```html
<hr />
<h4>Seção de Aprovação</h4>
```

---

## 6. Eventos de formulário e workflow

> **Os eventos `displayFields`, `enableFields`, `validateForm`, `inputFields` e eventos de processo são implementados exclusivamente no server-side (Rhino ES5).**
> Consulte as skills específicas:
> - Eventos de formulário → `02-form-events.md`
> - Eventos de processo/workflow → `03-process-events.md`
>
> **Não implementar controle de visibilidade, habilitação ou validação via JavaScript front-end.**

### 6.1 Eventos JS front-end permitidos

Os únicos eventos JavaScript front-end usados em formulários de processo são os callbacks de movimentação. Eles servem para confirmações rápidas no navegador (não para lógica de negócio):

#### beforeMovementOptions

Executado antes de exibir as opções de movimentação:

```javascript
var beforeMovementOptions = function(numState) {
    if (document.form.txt_campo_obrigatorio.value === '') {
        throw "Preencha o campo obrigatório antes de enviar.";
    }
    return true;
};
```

#### beforeSendValidate

Executado antes de enviar/movimentar a solicitação:

```javascript
var beforeSendValidate = function(numState, nextState) {
    var confirmacao = confirm("Deseja realmente enviar para a atividade " + nextState + "?");
    return confirmacao;
};
```

> **Regra:** esses callbacks são apenas para UX (confirmações, alertas). Toda validação de regra de negócio deve estar no `validateForm` ou `beforeTaskSave` (server-side).

---

## 7. Boas práticas

### 7.1 Organização do HTML

- Separar campos por **painéis** (panel) com classes CSS descritivas
- Agrupar campos relacionados em `<div class="row">`
- Usar `<div class="form-group">` para cada campo
- Manter campos hidden no topo do formulário

### 7.2 Organização do JavaScript

- **Nunca** colocar lógica complexa inline no HTML
- Criar arquivo `.js` separado e importar
- Usar IIFE ou namespace para evitar conflito de variáveis globais:

```javascript
var MeuFormulario = (function() {
    'use strict';

    function init() {
        _bindEvents();
        _loadData();
    }

    function _bindEvents() {
        $(document).on('change', '#slc_departamento', function() {
            _filtrarProjetos($(this).val());
        });
    }

    function _loadData() {
        // Carregar dados de datasets via AJAX
    }

    function _filtrarProjetos(codDepto) {
        // Filtrar select de projetos com base no departamento
    }

    // Inicialização
    $(function() {
        init();
    });

    return { init: init };
})();
```

### 7.3 Acessando datasets via JavaScript (front-end)

```javascript
var constraints = [
    DatasetFactory.createConstraint("codDepto", "001", "001", ConstraintType.MUST)
];
var dataset = DatasetFactory.getDataset("dsProjetos", null, constraints, null);

for (var i = 0; i < dataset.values.length; i++) {
    var nome = dataset.values[i]["nomeProjeto"];
    // usar dado
}
```

### 7.4 Compatibilidade mobile

| Item | Web | Mobile |
|---|---|---|
| Atributo `mask` | Funciona | **Não funciona** |
| `onkeypress` | Funciona | **Não funciona no Android** (usar `oninput`) |
| Zoom com dataset customizado | Funciona | Precisa registrar dataset nas propriedades do formulário |
| Subpastas nos arquivos | Fluig achata | Fluig achata |
| Pai-filho com `___` no `<td>` name | Funciona | **Não renderiza** |

### 7.5 Checklist de publicação do formulário

```
□ Classe wrapper .fluig-style-guide presente
□ <form name="form"> com name correto
□ Todos os campos com name e id iguais, usando prefixos Jynx (txt_, nb_, slc_, dt_, etc.)
□ Painéis com classe pnl_ + contexto
□ Campos de tabela pai-filho SEM ___ no name (Fluig gera automaticamente)
□ tablename definido na <table> do pai-filho
□ Selects com dataset testados (atributos dataset/datasetkey/datasetvalue)
□ Zoom com data-zoom válido (JSON com aspas simples, campos existem no dataset)
□ hidden_ para campos zoom com zoomvalue (NÃO usar hd_ neste caso)
□ Scripts em arquivo .js separado (não inline)
□ displayFields/enableFields/validateForm no server-side (não no front)
□ Testar em modo ADD, MOD e VIEW
□ Testar no mobile (se aplicável)
□ Limpar cache do navegador e do Fluig após publicação
□ Verificar permissões de acesso ao formulário
```

---

## 8. Armadilhas comuns

| Problema | Causa | Solução |
|---|---|---|
| Campos não salvam | `name` ausente ou duplicado | Verificar `name` único em cada campo |
| Style Guide não aplica | Falta wrapper `.fluig-style-guide` | Encapsular o conteúdo na div |
| Zoom não retorna dados | Nome de campo no `data-zoom` com case errado | Conferir case-sensitive do dataset |
| Pai-filho não funciona no mobile | `___` no `name` de `<td>` | Remover `___` do name da coluna |
| Dados do select vazio | Dataset não existe ou sem permissão | Verificar código do dataset e permissões |
| Máscara não funciona no mobile | Atributo `mask` não suportado | Implementar via JS com evento `oninput` |
| Formulário com dados da versão antiga | Cache do navegador ou versão do formulário | Limpar cache + verificar versão ativa |
| `enableFields` quebra seletor jQuery | Campo desabilitado ganha `_` no name/id | Usar seletores que considerem o `_` prefixado |