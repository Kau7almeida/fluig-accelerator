$(document).ready(function() {
   
    // Recuperação de dados
    var matricula = getUser();
    var state = getWKNumState();
    var process = getWKNumProces();

    // Busca dados do usuário
    var constraints = [];
    constraints.push(DatasetFactory.createConstraint("colleagueId", matricula, matricula, ConstraintType.MUST));
    var user = DatasetFactory.getDataset("colleague", null, constraints, null).values;

    // Execução do handler de estado
    StateHandlers.execute(state, user, process);

});