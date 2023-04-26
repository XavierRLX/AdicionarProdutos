function salvarListaProdutos() {
    const listaProdutos = document.getElementById('listaProdutos').innerHTML;
    localStorage.setItem('listaProdutos', listaProdutos);
  }
  

const btnAdcLista = document.querySelector('.btnAdcLista');
  btnAdcLista.addEventListener('click', adicionarProduto);
  
  function adicionarProduto() {
      const produtoLista = document.getElementById('inputLista').value;
      const quantidadeLista = document.getElementById('inputListaQnt').value;
      
      // Criar elemento de lista com checkbox, botão de exclusão e botão "Peguei"
      const li = document.createElement('div');
      li.innerHTML =`
      <div id="produtoLista" class="content">    
      <button class="btnPeguei">Peguei</button>
            <span>${produtoLista} (x ${quantidadeLista})</span>
            <div class="btn_lista_produtos">
            <img src="img/adc_carrinho.png" alt="Adicionar ao Carrinho" class="btnListaAdicionaraoCarrinho"></img>
            <img src="img/del_lista.png" alt="Excluir Produto" class="btnExcluir"></img>
            </div>
            </div>  ` ;
      
      // Adicionar elemento de lista à lista de produtos
      const listaProdutos = document.getElementById('listaProdutos');
      listaProdutos.appendChild(li);
      
      salvarListaProdutos();

      // Limpar os campos de entrada de dados
      document.getElementById('inputLista').value = '';
      document.getElementById('inputListaQnt').value = '';
      
    
      const btnListaAdcCar = li.querySelector('.btnListaAdicionaraoCarrinho');

      btnListaAdcCar.addEventListener('click', () => {
        const produtoNome = li.querySelector('span').textContent.split('(')[0].trim();
        document.getElementById('produto').value = produtoNome;
        abrirAdicionarProduto();
        salvarListaProdutos();
      });
      

      const btnPeguei = li.querySelector('.btnPeguei');
      btnPeguei.addEventListener('click', () => {
        li.style.textDecoration = "line-through";
      });
      
  
}
const listaProdutos = document.getElementById('listaProdutos');
listaProdutos.addEventListener('click', (event) => {
  if (event.target.className === 'btnExcluir') {
    event.target.parentNode.parentNode.remove(); // remove o elemento li
    salvarListaProdutos();
  }
});

window.onload = function() {
    const listaProdutos = document.getElementById('listaProdutos');
    console.log('localStorage:', localStorage); // depuração
    const listaProdutosSalva = localStorage.getItem('listaProdutos');
    console.log('listaProdutosSalva:', listaProdutosSalva); // depuração
    if (listaProdutosSalva) {
      listaProdutos.innerHTML = listaProdutosSalva;
    }
  
    const listaItens = listaProdutos.getElementsByTagName('li');
    for (let i = 0; i < listaItens.length; i++) {
      const btnListaAdcCar = listaItens[i].querySelector('.btnListaAdicionaraoCarrinho');
      btnListaAdcCar.addEventListener('click', () => {
        const produtoNome = listaItens[i].querySelector('span').textContent.split('(')[0].trim();
        document.getElementById('produto').value = produtoNome;
        abrirAdicionarProduto();
        salvarListaProdutos();
      });
    }
  };
  

  
  
