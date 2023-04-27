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
  li.innerHTML = `
      <div id="produtoLista" class="content">    
      <input type="checkbox" class="checkboxPeguei">
            <div class="produtoListaEnviar">${produtoLista} </div>
            <div class="qntListaEnviar"> x ${quantidadeLista} </div>
            <img src="img/adc_carrinho.png" alt="Adicionar ao Carrinho" class="btnListaAdicionaraoCarrinho"></img>
            <img src="img/del_lista.png" alt="Excluir Produto" class="btnExcluir"></img>
      </div>  ` ;

  // Adicionar elemento de lista à lista de produtos
  const listaProdutos = document.getElementById('listaProdutos');
  listaProdutos.appendChild(li);

  salvarListaProdutos();

  // Limpar os campos de entrada de dados
  document.getElementById('inputLista').value = '';
  document.getElementById('inputListaQnt').value = '';

  adicionarEventListeners(li);


  const checkboxPeguei = li.querySelector('.checkboxPeguei');
  checkboxPeguei.addEventListener('change', () => {
    const produtoListaDiv = checkboxPeguei.nextElementSibling;
    if (checkboxPeguei.checked) {
      produtoListaDiv.classList.add('completed');
    } else {
      produtoListaDiv.classList.remove('completed');
    }
  });
  
  
  adicionarEventListeners(li);

}

const listaProdutos = document.getElementById('listaProdutos');
listaProdutos.addEventListener('click', (event) => {
  if (event.target.className === 'btnExcluir') {
    event.target.parentNode.parentNode.remove(); // remove o elemento li
    salvarListaProdutos();
  }
});

const btnLimpar = document.getElementById('btnLimpar');
btnLimpar.addEventListener('click', limparProdutos);

function limparProdutos() {
  const listaProdutos = document.getElementById('listaProdutos');
  listaProdutos.innerHTML = '';
  salvarListaProdutos();
}


window.onload = function () {
  const listaProdutos = document.getElementById('listaProdutos');
  console.log('localStorage:', localStorage);
  const listaProdutosSalva = localStorage.getItem('listaProdutos');
  console.log('listaProdutosSalva:', listaProdutosSalva);
  if (listaProdutosSalva) {
    listaProdutos.innerHTML = listaProdutosSalva;
  }

  const listaItens = listaProdutos.querySelectorAll('.content');   // Itera sobre todos os elementos selecionados e adiciona um listener de eventos a cada um
  for (let i = 0; i < listaItens.length; i++) {
    adicionarEventListeners(listaItens[i]);
  }
};

function adicionarEventListeners(elemento) {
  const btnListaAdcCar = elemento.querySelector('.btnListaAdicionaraoCarrinho');
  btnListaAdcCar.addEventListener('click', () => {
    const produtoNome = elemento.querySelector('.produtoListaEnviar').textContent.split('(')[0].trim(); // Extrai o nome do produto da linha de texto do elemento "elemento"
    document.getElementById('produto').value = produtoNome;
    const produtoQNT = elemento.querySelector('.qntListaEnviar').textContent.split('x')[1].trim();
    document.getElementById('quantidade').value = produtoQNT;
    abrirAdicionarProduto();
    salvarListaProdutos();
  });

}