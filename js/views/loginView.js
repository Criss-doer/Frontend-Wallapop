class LoginView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.usernameInput = this.container.querySelector('#login-username');
    this.passwordInput = this.container.querySelector('#login-password');
    this.loginButton = this.container.querySelector('#login-button');
    this.messageArea = this.container.querySelector('#login-message');
  }

  render() {
    this.container.innerHTML = `
      <h2>Iniciar Sesión</h2>
      <label for="login-username">Usuario:</label>
      <input type="text" id="login-username" name="username"><br><br>
      <label for="login-password">Contraseña:</label>
      <input type="password" id="login-password" name="password"><br><br>
      <button id="login-button">Iniciar Sesión</button>
      <p id="login-message" class="error-message"></p>
      <p>¿No tienes cuenta? <a href="#register">Regístrate</a></p>
    `;
    this.usernameInput = this.container.querySelector('#login-username');
    this.passwordInput = this.container.querySelector('#login-password');
    this.loginButton = this.container.querySelector('#login-button');
    this.messageArea = this.container.querySelector('#login-message');
  }

  getMessage() {
    return this.messageArea.textContent;
  }

  setMessage(message) {
    this.messageArea.textContent = message;
  }

  getCredentials() {
    return {
      username: this.usernameInput.value,
      password: this.passwordInput.value,
    };
  }

  resetForm() {
    this.usernameInput.value = '';
    this.passwordInput.value = '';
    this.messageArea.textContent = '';
  }
}