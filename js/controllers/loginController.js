class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.container.addEventListener('click', this.handleLogin);
  }

  render() {
    this.view.render();
  }

  handleLogin = async (event) => {
    if (event.target.id === 'login-button') {
      const credentials = this.view.getCredentials();
      if (!credentials.username || !credentials.password) {
          this.view.setMessage('Usuario y contraseña son obligatorios.');
          return;
      }
      this.view.setMessage('Iniciando sesión...');
      try {
        const data = await this.model.login(credentials);
        localStorage.setItem('authToken', data.accessToken);
        this.view.resetForm();

        window.location.hash = '#';

      } catch (error) {
        this.view.setMessage(`Error al iniciar sesión: ${error.message}`);
      }
    }
  };
}