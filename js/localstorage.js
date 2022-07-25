
function salvarDados(){
    var Total = document.getElementById("total");

    var dados = JSON.parse(localStorage.getItem("dadosProdutos"));

    if (dados==null){
        localStorage.setItem("dadosProdutos", "[]");
        dados = [];
    }

    varRegistro = {
        nome: Total.value
    }

    dados.push(auxRegistros);

    localStorage.setItem("total", JSON.stringify(dados));
}