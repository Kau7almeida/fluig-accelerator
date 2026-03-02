function displayFields(form, customHTML) {

    const dataForm = {
        processId: getValue("WKNumProces"),
        user: getValue("WKUser"),
        state: getValue("WKNumState")
    };

    customHTML.append("<script>function getUsuario(){ return '" + dataForm.user + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + dataForm.state + "; }</script>");
    customHTML.append("<script>function getWKNumProces(){ return " + dataForm.processId + "; }</script>");
    
}