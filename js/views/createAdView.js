class CreateAdView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.form = null;
    this.messageArea = null;
    this.submitButton = null;
  }

  render() {
    this.container.innerHTML = `
      <h2>Crear Nuevo Anuncio</h2>
      <form id="create-ad-form" novalidate>
        <div class="form-group">
          <label for="ad-name">Nombre (obligatorio):</label>
          <input type="text" id="ad-name" name="name" required>
        </div>
        <div class="form-group">
          <label for="ad-description">Descripción (obligatorio):</label>
          <textarea id="ad-description" name="description" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="ad-price">Precio (€) (obligatorio):</label>
          <input type="number" id="ad-price" name="price" step="0.01" min="0" required>
        </div>
        <div class="form-group">
          <label>Tipo (obligatorio):</label>
          <input type="radio" id="ad-type-venta" name="type" value="venta" required checked>
          <label for="ad-type-venta">Venta</label>
          <input type="radio" id="ad-type-compra" name="type" value="compra" required>
          <label for="ad-type-compra">Compra</label>
        </div>
         <div class="form-group">
          <label for="ad-image">Foto (opcional):</label>
          <input type="file" id="ad-image" name="image" accept="image/*">
          <img id="image-preview" src="#" alt="Vista previa" style="max-width: 100px; max-height: 100px; display: none; margin-top: 10px;"/>
        </div>
        <div id="create-ad-message" class="message-area"></div>
        <button type="submit" id="create-ad-button">Crear Anuncio</button>
      </form>
    `;

    this.form = this.container.querySelector('#create-ad-form');
    this.messageArea = this.container.querySelector('#create-ad-message');
    this.submitButton = this.container.querySelector('#create-ad-button');

    const imageInput = this.form.querySelector('#ad-image');
    const imagePreview = this.form.querySelector('#image-preview');
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
             imagePreview.style.display = 'none';
             imagePreview.src = '#';
        }
    });
  }

  getAdData() {
      if (!this.form) return null;

      const formData = new FormData(this.form);
      const name = formData.get('name')?.trim();
      const description = formData.get('description')?.trim();
      const price = parseFloat(formData.get('price'));
      const type = formData.get('type');

      if (!name || !description || isNaN(price) || price < 0 || !type) {
          this.setMessage("Por favor, completa todos los campos obligatorios correctamente.", "error");
          return null;
      }

      const data = {
          name: name,
          description: description,
          price: price,
          type: type
      };

      const imageFile = this.form.querySelector('#ad-image').files[0];

      return { adDetails: data, imageFile: imageFile };
  }

  setMessage(message, type = 'info') {
      if (this.messageArea) {
          this.messageArea.textContent = message;
          this.messageArea.className = `message-area message-${type}`;
      }
  }

   resetForm() {
      if (this.form) {
          this.form.reset();
           const imagePreview = this.form.querySelector('#image-preview');
           if (imagePreview) {
               imagePreview.style.display = 'none';
               imagePreview.src = '#';
           }
      }
      this.setMessage('', 'info');
      this.setLoading(false);
  }

  setLoading(isLoading) {
      if (this.submitButton) {
          this.submitButton.disabled = isLoading;
          this.submitButton.textContent = isLoading ? 'Guardando...' : 'Crear Anuncio';
      }
      if (isLoading) {
           this.setMessage('Guardando anuncio...', 'loading');
      }
  }
}