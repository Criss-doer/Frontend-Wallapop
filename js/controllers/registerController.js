class RegisterController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.container.addEventListener('click', this.handleRegister);
  }

  render() {
    this.view.render();
  }

  handleRegister = async (event) => {
    if (event.target.id === 'register-button') {
      const userData = this.view.getUserData();
       if (!userData.username || !userData.password) {
          this.view.setMessage('Usuario y contraseña son obligatorios.');
          return;
      }
      this.view.setMessage('Registrando...');
      try {
        await this.model.register(userData);
        this.view.setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        this.view.resetForm();
        window.location.hash = '#login';
      } catch (error) {
        this.view.setMessage(`Error al registrar: ${error.message}`);
      }
    }
  };
}