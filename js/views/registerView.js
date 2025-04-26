class RegisterView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.usernameInput = this.container.querySelector('#register-username');
    this.passwordInput = this.container.querySelector('#register-password');
    this.registerButton = this.container.querySelector('#register-button');
    this.messageArea = this.container.querySelector('#register-message');
  }

  render() {
    this.container.innerHTML = `
      <h2>Registrarse</h2>
      <label for="register-username">Usuario:</label>
      <input type="text" id="register-username" name="username"><br><br>
      <label for="register-password">Contraseña:</label>
      <input type="password" id="register-password" name="password"><br><br>
      <button id="register-button">Registrarse</button>
      <p id="register-message" class="error-message"></p>
      <p>¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p>
    `;
    this.usernameInput = this.container.querySelector('#register-username');
    this.passwordInput = this.container.querySelector('#register-password');
    this.registerButton = this.container.querySelector('#register-button');
    this.messageArea = this.container.querySelector('#register-message');
  }

  getMessage() {
    return this.messageArea.textContent;
  }

  setMessage(message) {
    this.messageArea.textContent = message;
  }

  getUserData() {
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