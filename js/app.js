function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT", e);
    return null;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const adModel = new AdModel();
  const adListView = new AdListView('adListContainer');
  const adListController = new AdListController(adModel, adListView);
  const adDetailView = new AdDetailView('adDetailContainer');
  const adDetailController = new AdDetailController(adModel, adDetailView);
  const loginView = new LoginView('loginContainer');
  const loginController = new LoginController(adModel, loginView);
  const registerView = new RegisterView('registerContainer');
  const registerController = new RegisterController(adModel, registerView);
  const createAdView = new CreateAdView('createAdContainer');
  const createAdController = new CreateAdController(adModel, createAdView);

  const adListContainer = document.getElementById('adListContainer');
  const adDetailContainer = document.getElementById('adDetailContainer');
  const loginContainer = document.getElementById('loginContainer');
  const registerContainer = document.getElementById('registerContainer');
  const createAdButtonContainer = document.getElementById('createAdButtonContainer');
  const createAdContainer = document.getElementById('createAdContainer');

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    const header = document.querySelector('header');
    let userActionsDiv = header.querySelector('#userActions');
    if (!userActionsDiv) {
        userActionsDiv = document.createElement('div');
        userActionsDiv.id = 'userActions';
        userActionsDiv.style.marginLeft = 'auto';
        header.appendChild(userActionsDiv);
    }

    if (token) {
      userActionsDiv.innerHTML = `
        <button id="create-ad-nav-button">Crear anuncio</button>
        <button id="logout-button">Cerrar Sesión</button>
      `;
      document.getElementById('create-ad-nav-button').onclick = () => window.location.hash = '#create';
      document.getElementById('logout-button').onclick = () => {
          localStorage.removeItem('authToken');
          checkLoginStatus();
          window.location.hash = '#';
          handleNavigation();
      };

    } else {
      userActionsDiv.innerHTML = `
         <button id="login-nav-button">Iniciar Sesión</button>
         <button id="register-nav-button">Registrarse</button>
      `;
       document.getElementById('login-nav-button').onclick = () => window.location.hash = '#login';
       document.getElementById('register-nav-button').onclick = () => window.location.hash = '#register';
    }
  };


  const showView = (viewId) => {
    adListContainer.style.display = 'none';
    adDetailContainer.style.display = 'none';
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    createAdContainer.style.display = 'none';

    if (viewId === 'list') {
      adListContainer.style.display = 'block';
      adListController.loadAds();
    } else if (viewId.startsWith('ad/')) {
      adDetailContainer.style.display = 'block';
      const adId = viewId.split('/')[1];
      adDetailController.loadAd(adId);
    } else if (viewId === 'login') {
      loginContainer.style.display = 'block';
      loginController.render();
    } else if (viewId === 'register') {
      registerContainer.style.display = 'block';
      registerController.render();
    } else if (viewId === 'create') {
        const token = localStorage.getItem('authToken');
        if (token) {
            createAdContainer.style.display = 'block';
            createAdController.render();
        } else {
             window.location.hash = '#login';
             alert("Debes iniciar sesión para crear un anuncio.");
        }
    } else {
      adListContainer.style.display = 'block';
      adListController.loadAds();
    }
  };


  const handleNavigation = () => {
    const hash = window.location.hash.substring(1);
    let viewId = 'list';

    if (hash === '' || hash === '#') {
      viewId = 'list';
    } else if (hash.startsWith('ad/')) {
      viewId = hash;
    } else if (hash === 'login') {
       viewId = 'login';
    } else if (hash === 'register') {
      viewId = 'register';
    } else if (hash === 'create') {
       viewId = 'create';
    } else {
      viewId = 'list';
    }
     showView(viewId);
     checkLoginStatus();
  };


  window.addEventListener('hashchange', handleNavigation);


  handleNavigation();
});