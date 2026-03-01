// Módulo de handlers de estados:
// Responsável por executar a lógica de acordo com o estado atual do processo

var StateHandlers = (function () {

    // Preenche dados do solicitante nos campos de exibição
    function fillSolicitanteInfo() {
        $("#inner_name").text($("#txt_solic").val());
        $("#inner_email").text($("#txt_email_solic").val());
        $("#inner_dth").text($("#txt_dth_solic").val());
    }

    // Handlers específicos para cada estado
    var handlers = {

        0: function (user, process) {
            var date = new Date();
            var dth = date.toLocaleString();
            $("hd_solic").val(user[0].colleagueName);
            $("hd_email_solic").val(user[0].mail);
            $("hd_dth_solic").val(dth.replace(", ", " - "));
            fillSolicitanteInfo();
        }

    };

    /**
     * Executa handler do estado
     * @param {number} state - Número do estado
     * @param {Object} user - Dados do usuário
     * @param {number} process - ID do processo
     */
    function execute(state, user, process) {
        var handler = handlers[state];
        if (handler) {
            handler(user, process);
        }
    }

    return {
        execute: execute
    };

})();