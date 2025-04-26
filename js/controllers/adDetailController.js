class AdDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.container.addEventListener('click', this.handleDeleteClick);
  }

  async loadAd(id) {
    this.view.renderLoading();
    try {
      const ad = await this.model.getAd(id);
      if (ad) {
        const showDelete = this.checkOwnership(ad);
        this.view.render(ad, showDelete);
      } else {
        this.view.renderNotFound();
      }
    } catch (error) {
      this.view.renderError(error.message);
      console.error("Error al cargar el detalle del anuncio:", error);
    }
  }

  checkOwnership(ad) {
      const token = localStorage.getItem('authToken');
      if (!token || !ad) {
          return false;
      }
      try {
          const decodedToken = decodeJwt(token);
          return decodedToken && decodedToken.userId === ad.userId;
      } catch (e) {
          console.error("Error decoding token for ownership check:", e);
          return false;
      }
  }

  handleDeleteClick = async (event) => {
      if (event.target.id === 'delete-ad-button') {
          const adId = event.target.dataset.id;
          const confirmed = confirm("¿Estás seguro de que quieres eliminar este anuncio?");

          if (confirmed) {
              this.view.setMessage('Eliminando...', 'loading');
              try {
                  await this.model.deleteAd(adId);
                  this.view.setMessage('Anuncio eliminado correctamente.', 'success');
                  window.location.hash = '#';
              } catch (error) {
                  this.view.setMessage(`Error al eliminar: ${error.message}`, 'error');
                  console.error("Error deleting ad:", error);
              }
          }
      }
  };
}