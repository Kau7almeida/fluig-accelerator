function displayFields(form, customHTML) {

    // Recuperação de dados
    const dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    // Injeção de dados no HTML
    customHTML.append("<script>function getUser(){ return '" + dataForm.user + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + dataForm.state + "; }</script>");
    customHTML.append("<script>function getWKNumProces(){ return " + dataForm.processId + "; }</script>");

}