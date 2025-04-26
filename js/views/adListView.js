class AdListView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderLoading() {
    this.container.innerHTML = '<p>Cargando anuncios...</p>';
  }

  renderEmpty() {
    this.container.innerHTML = '<p>No hay anuncios disponibles.</p>';
  }

  renderError(message) {
    this.container.innerHTML = `<p class="error">Error al cargar los anuncios: ${message}</p>`;
  }

  renderAds(ads) {
    this.container.innerHTML = '';
    if (ads && ads.length > 0) {
      const list = document.createElement('ul');
      ads.forEach(ad => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${ad.image ? `<img src="${ad.image}" alt="${ad.name}" width="100">` : '<div class="no-image">Producto sin foto</div>'}
          <div class="ad-info">
            <h3>${ad.name}</h3>
            <p>${ad.description}</p>
          </div>
          <div class="price-container">
            <p class="price">
              ${ad.price !== null ? ad.price + ' €' : 'Consultar'}
              (${ad.type})
            </p>
            <button class="view-detail" data-id="${ad.id}">Ver detalle</button>
          </div>
        `;
        list.appendChild(listItem);
      });
      this.container.appendChild(list);
    } else {
      this.renderEmpty();
    }
  }
}