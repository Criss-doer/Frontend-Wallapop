class CreateAdController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  render() {
    this.view.render();
    this.attachFormListener();
  }

  attachFormListener() {
      const form = this.view.form;
      if (form) {
          form.addEventListener('submit', this.handleCreateAd);
      }
  }

  handleCreateAd = async (event) => {
      event.preventDefault();
      const adFormData = this.view.getAdData();

      if (!adFormData) {
          return;
      }

      const { adDetails, imageFile } = adFormData;

      this.view.setLoading(true);

      try {
          await this.model.createAd(adDetails, imageFile);
          this.view.setMessage('Anuncio creado con éxito.', 'success');
          this.view.resetForm();
          window.location.hash = '#';

      } catch (error) {
          this.view.setMessage(`Error al crear el anuncio: ${error.message}`, 'error');
          this.view.setLoading(false);
          console.error("Error creating ad:", error);
      }
  };
}