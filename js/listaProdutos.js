function salvarListaProdutos() {
  const listaProdutos = document.getElementById('listaProdutos').innerHTML;
  localStorage.setItem('listaProdutos', listaProdutos);
}


const btnAdcLista = document.querySelector('.btnAdcLista');
btnAdcLista.addEventListener('click', adicionarProduto);

function adicionarProduto() {
  const produtoLista = document.getElementById('inputLista').value;
  const quantidadeLista = document.getElementById('inputListaQnt').value;

  
  // validar se o campo de produto está vazio
  if (produtoLista == "") {
   alert('Por favor, insira o nome do produto.');
    return;
  }

  // Criar elemento de lista com checkbox, botão de exclusão e botão "Peguei"
  const li = document.createElement('div');
  li.innerHTML = `
      <div id="produtoLista" class="content">    
      <input type="checkbox" class="checkboxPeguei">
            <div class="produtoListaEnviar">${produtoLista} </div>
            <div class="qntListaEnviar"> x ${quantidadeLista} </div>
            <img src="img/adc_carrinho.png" alt="Adicionar ao Carrinho" class="btnListaAdicionaraoCarrinho"></img>
            <img src="img/del_lista.png" alt="Excluir Produto" class="btnExcluir"></img>
      </div> ` ;

      if (quantidadeLista == 0)
      {
        quantidadeLista = 1;
        return
      }
  // Adicionar elemento de lista à lista de produtos
  const listaProdutos = document.getElementById('listaProdutos');
  listaProdutos.appendChild(li);  
  const animationLista = li.querySelector('#produtoLista');
  animationLista.classList.add('animationCimaBaxio');
  salvarListaProdutos();

  // Limpar os campos de entrada de dados
  document.getElementById('inputLista').value = '';
  document.getElementById('inputListaQnt').value = '';

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
  SalvarDados();
}

const listaProdutos = document.getElementById('listaProdutos');
listaProdutos.addEventListener('click', (event) => {
  if (event.target.className === 'btnExcluir') {
    const animationLista = event.target.parentNode.parentNode;
    animationLista.classList.add('animationRemove');
    setTimeout(() => {
      animationLista.remove(); // remove o elemento li
      salvarListaProdutos();
    }, 400); // espera um segundo antes de remover o elemento
  }
});



const btnLimpar = document.getElementById('btnLimpar');
btnLimpar.addEventListener('click', limparProdutos);
function limparProdutos() {
  const listaProdutos = document.getElementById('listaProdutos');
  listaProdutos.innerHTML = '';
  salvarListaProdutos();
}

function adicionarEventListeners(elemento) {
  const checkboxPeguei = elemento.querySelector('.checkboxPeguei');
  checkboxPeguei.addEventListener('change', () => {
    const produtoListaDiv = checkboxPeguei.nextElementSibling;
    if (checkboxPeguei.checked) {
      produtoListaDiv.classList.add('completed');
    } else {
      produtoListaDiv.classList.remove('completed');
    }
    salvarListaProdutos();
  
  });
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

window.onload =  SalvarDados();

//Recupera todas funções e eventos após o recarregamento da página.
 function  SalvarDados() {
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
    const checkboxPeguei = listaItens[i].querySelector('.checkboxPeguei');
    checkboxPeguei.addEventListener('change', () => {
      const produtoListaDiv = checkboxPeguei.nextElementSibling;
      if (checkboxPeguei.checked) {
        produtoListaDiv.classList.add('completed');
      } else {
        produtoListaDiv.classList.remove('completed');
      }
    });
  }
  // Seleciona todos os checkboxes com a classe "checkboxPeguei"
  const checkboxes = document.querySelectorAll('.checkboxPeguei');
  // Itera sobre cada checkbox selecionado e define o estado de marcação salvo no localStorage
  checkboxes.forEach((checkbox) => {
    const produtoListaDiv = checkbox.nextElementSibling;
    const checkboxState = localStorage.getItem(produtoListaDiv.textContent);
    if (checkboxState === 'true') {
      checkbox.checked = true;
      produtoListaDiv.classList.add('completed');
    } else {
      checkbox.checked = false;
      produtoListaDiv.classList.remove('completed');
    }
    // Adiciona um listener de eventos para salvar o estado de marcação do checkbox no localStorage
    checkbox.addEventListener('change', () => {
      localStorage.setItem(produtoListaDiv.textContent, checkbox.checked);
    });
  });
};


// Desativa a capacidade de zoom no site
function desativarZoom() {
  // Define a escala inicial da página para 1
  var viewport = document.querySelector('meta[name="viewport"]');
  viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');

  // Adiciona um evento de gesturestart ao documento para cancelar o gesto de zoom
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}

// Chama a função para desativar o zoom quando a página é carregada
window.onload = desativarZoom;
