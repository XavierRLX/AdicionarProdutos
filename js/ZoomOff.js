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
  