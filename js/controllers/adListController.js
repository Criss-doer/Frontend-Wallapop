class AdListController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.view.container.addEventListener('click', this.handleAdClick);
    }
  
    async loadAds() {
      this.view.renderLoading();
      try {
        const ads = await this.model.getAds();
        this.view.renderAds(ads);
      } catch (error) {
        this.view.renderError(error.message);
      }
    }
  
    handleAdClick = (event) => {
      if (event.target.classList.contains('view-detail')) {
        const adId = event.target.dataset.id;
        window.location.hash = `ad/${adId}`;
      }
    };
  }