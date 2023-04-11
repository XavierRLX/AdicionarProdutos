// função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('produtos', JSON.stringify(produto.arrayProdutos));
}

// função para carregar dados do localStorage
function carregarDados() {
    // obter dados do localStorage ou iniciar um array vazio
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];
    // atribuir dados ao array de produtos
    produto.arrayProdutos = dados;
    // listar produtos na tabela
    produto.listaTabela();
}

// aguardar o carregamento do DOM antes de executar a função
document.addEventListener('DOMContentLoaded', function () {
    carregarDados();
});

// classe Produto
class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        // obter os dados do produto
        let produto = this.lerDados();

        // validar campos antes de adicionar ou atualizar o produto
        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        // listar produtos na tabela e cancelar a edição
        this.listaTabela();
        this.cancelar();
    }

    // listar produtos na tabela
    listaTabela() {
        // obter o elemento tbody da tabela
        let tbody = document.getElementById('tbody');
        // limpar o conteúdo atual do tbody
        tbody.innerText = '';

        // iterar sobre o array de produtos e criar uma nova linha para cada produto
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            // criar células da linha para cada campo do produto
            let td_produto = tr.insertCell();
            let td_categoria = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_total = tr.insertCell();
            let td_acoes = tr.insertCell();

            // preencher as células com os valores do produto
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_categoria.innerText = this.arrayProdutos[i].categoria;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;
            td_total.innerText = this.arrayProdutos[i].quantidade * this.arrayProdutos[i].preco;

            // criar botões para editar e excluir o produto
            let imgEdit = document.createElement('img');
            imgEdit.src = "img/editar.png";
            imgEdit.addEventListener('click', abrirAdicionarProduto);
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");
           
           
            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            // adicionar botões à célula de ações
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            // imprimir o array de produtos no console
            console.log(this.arrayProdutos);
        }
    }

    // adicionar um novo produto
    adicionar(produto) {
        // converter o preço do produto para um número decimal
        produto.preco = parseFloat(produto.preco);
        // calcular o total do produto multiplicando a quantidade pelo preço
        produto.total = produto.quantidade * produto.preco
        this.arrayProdutos.push(produto);
        this.id++;

        let totalGeral = this.calcularTotalGeral();
        document.getElementById("resultado").innerHTML = `Total da lista R$ ${totalGeral},00`;
        localStorage.setItem("totalGeral", totalGeral);
        salvarDados()
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
               // this.arrayProdutos[i].fabricanteProduto = produto.fabricanteProduto;
                this.arrayProdutos[i].categoria = produto.categoria;
                this.arrayProdutos[i].quantidade = produto.quantidade;
                this.arrayProdutos[i].preco = produto.preco;
                this.arrayProdutos[i].total = produto.quantidade * produto.preco;
            }
        }

        let totalGeral = this.calcularTotalGeral();
        document.getElementById("resultado").innerHTML = `TOTAL DA LISTA: R$ ${totalGeral},00`;
        localStorage.setItem("totalGeral", totalGeral);
        salvarDados()
    }

    calcularTotalGeral() {
        let totalGeral = 0;
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            totalGeral += this.arrayProdutos[i].total;
        }
        return totalGeral;
    }


    preparaEdicao(dados) {
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        //document.getElementById('Fproduto').value = dados.fabricanteProduto;
        document.getElementById('categoria').value = dados.categoria;
        document.getElementById('quantidade').value = dados.quantidade;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados() {

        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
      //  produto.fabricanteProduto = document.getElementById('Fproduto').value;
        produto.categoria = document.getElementById('categoria').value;
        produto.quantidade = document.getElementById('quantidade').value;
        produto.preco = document.getElementById('preco').value;

        return produto;

    }

    validaCampos(produto) {
        let msg = '';

        if (produto.preco == '') {
            msg += ' - Informe o Preço do Prdouto \n'
        }

        if (produto.nomeProduto == '') {
            msg += ' - Informe o nome do Prdouto \n'
        }
        if (produto.quantidade == '') {
            msg += ' - Informe o nome do Prdouto \n'
        }
        if (msg != '') {
            alert(msg);
            return false;
        }
        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
      //  document.getElementById('Fproduto').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null;
    }

    deletar(id) {
        if (confirm('Deseja realmente excluir o produto?')) {
            let index = -1;
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                this.arrayProdutos.splice(index, 1);
                let totalGeral = this.calcularTotalGeral();
                document.getElementById("resultado").innerHTML = `TOTAL DA LISTA: R$ ${totalGeral},00`;
                localStorage.setItem("totalGeral", totalGeral);
                salvarDados();
                this.listaTabela();
            }
        }
    }
}    


document.addEventListener("DOMContentLoaded", function () {
    const dados = JSON.parse(localStorage.getItem("produtos")) || [];
    produto.arrayProdutos = dados;
    produto.listaTabela();
    const totalGeral = localStorage.getItem("totalGeral");
    if (totalGeral !== null) {
        document.getElementById("resultado").innerHTML = `TOTAL DA LISTA: R$ ${totalGeral},00`;
    }
});

let produto = new Produto();



// Abre o adicionar produtos +
const adicionarProdutoPg = document.getElementById('adicionar-produto');
const adicionarProdutoSeta = document.getElementById('adicionar-produto-topo');
const adicionarProdutoForm = document.getElementById('adicionar-produto-form');
const imgEdit2 = document.querySelector('.imgBtn');


adicionarProdutoPg.addEventListener('click', function () {
    this.classList.toggle('aberto');
    if (this.classList.contains('aberto')) {
        setTimeout(function() {
            adicionarProdutoForm.style.display = 'block';
        }, 200);
    } else {
        adicionarProdutoForm.style.display = 'none';
    }
});

function abrirAdicionarProduto() {
    adicionarProdutoPg.classList.toggle('aberto');
    if (adicionarProdutoPg.classList.contains('aberto')) {
      setTimeout(function() {
        adicionarProdutoForm.style.display = 'block';
      }, 200);
    } else {
      adicionarProdutoForm.style.display = 'none';
    }
  }


// cancela o evento toggle no forms.
adicionarProdutoForm.addEventListener('click', function (event) {
    event.stopPropagation();
});