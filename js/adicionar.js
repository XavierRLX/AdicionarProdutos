class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){

        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
    
        for ( let i = 0; i < this.arrayProdutos.length; i++ ){
            let tr = tbody.insertRow();
    
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_fabricante = tr.insertCell();
            let td_categoria = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_total = tr.insertCell();
            let td_acoes= tr.insertCell();
    
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_fabricante.innerText = this.arrayProdutos[i].fabricanteProduto;
            td_categoria.innerText = this.arrayProdutos[i].categoria;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;
            td_total.innerText = this.arrayProdutos[i].quantidade * this.arrayProdutos[i].preco;
            
            let imgEdit = document.createElement('img');
            imgEdit.src = "img/editar.png";
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")"); 
    
            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");
    
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
    
            console.log(this.arrayProdutos);
    
        }
    }
    

    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        produto.total = produto.quantidade * produto.preco;
        this.arrayProdutos.push(produto);
        this.id++;
    
        let totalGeral = this.calcularTotalGeral();
        document.getElementById("resultado").innerHTML = `Total da lista R$ ${totalGeral},00` ;
    }
    
    atualizar(id, produto){
        for ( let i = 0; i < this.arrayProdutos.length; i ++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].fabricanteProduto = produto.fabricanteProduto;
                this.arrayProdutos[i].categoria = produto.categoria;
                this.arrayProdutos[i].quantidade = produto.quantidade;
                this.arrayProdutos[i].preco = produto.preco;
                this.arrayProdutos[i].total = produto.quantidade * produto.preco;
            }
        }
    
        let totalGeral = this.calcularTotalGeral();
        document.getElementById("resultado").innerHTML = `Total Geral: R$ ${totalGeral},00` ;
    }
    
    calcularTotalGeral() {
        let totalGeral = 0;
        for ( let i = 0; i < this.arrayProdutos.length; i++ ){
            totalGeral += this.arrayProdutos[i].total;
        }
        return totalGeral;
    }
    

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('Fproduto').value = dados.fabricanteProduto;
        document.getElementById('categoria').value = dados.categoria;
        document.getElementById('quantidade').value = dados.quantidade;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados(){

        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.fabricanteProduto = document.getElementById('Fproduto').value;
        produto.categoria = document.getElementById('categoria').value;
        produto.quantidade = document.getElementById('quantidade').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
        
    }

    validaCampos(produto){
        let msg = '';

        if(produto.preco == ''){
            msg += ' - Informe o Preço do Prdouto \n'
        }

        if(produto.nomeProduto == ''){
            msg += ' - Informe o nome do Prdouto \n'
        }
        if(produto.quantidade == ''){
            msg += ' - Informe o nome do Prdouto \n'
        }
        if(msg != ''){
            alert(msg);
            return false;
        }
        return true;
    }

    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('Fproduto').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null;
    }

    deletar(id) {
        let tbody = document.getElementById('tbody');
    
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
                break;
            }
        }
    
        let totalGeral = this.calcularTotalGeral();
        document.getElementById("resultado").innerHTML = `Total da Lista R$ ${totalGeral},00`;
    }
}

let produto = new Produto();

