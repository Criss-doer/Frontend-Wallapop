class AdDetailView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderLoading() {
      this.container.innerHTML = '<p>Cargando detalle del anuncio...</p>';
  }

  renderNotFound() {
       this.container.innerHTML = '<p>Anuncio no encontrado.</p>';
  }

  renderError(message) {
      this.container.innerHTML = `<p class="error">Error al cargar el anuncio: ${message}</p>`;
  }

  render(ad, showDeleteButton = false) {
      this.container.innerHTML = `
        <div class="ad-detail">
          ${ad.image ? `<img src="${ad.image}" alt="${ad.name}">` : '<div class="no-image">Producto sin foto</div>'}
          <h2>${ad.name}</h2>
          <p class="description">${ad.description}</p>
          <p class="price">${ad.price !== null ? ad.price + ' €' : 'Gratis/A convenir'} (${ad.type})</p>
          ${showDeleteButton ? `<button id="delete-ad-button" data-id="${ad.id}">Eliminar Anuncio</button>` : ''}
          <p id="delete-message" class="error-message"></p>
          </div>
      `;
  }

  setMessage(message, type = 'error') {
      const messageArea = this.container.querySelector('#delete-message');
      if (messageArea) {
          messageArea.textContent = message;
          messageArea.className = `message-area message-${type}`;
      }
  }
}