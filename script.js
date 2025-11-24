// ----------------- PRODUCTOS -----------------
const PRODUCTS = [
  {id:1, name:{es:'Mocacín Clásico', en:'Classic Moccasin'}, price:140, desc:{es:'Cuero genuino, hecho a mano', en:'Genuine leather, handmade'}, img:'img/product-1.jpg'},
  {id:2, name:{es:'Mocacín Urbano', en:'Urban Moccasin'}, price:160, desc:{es:'Cómodo y resistente', en:'Comfortable and durable'}, img:'img/product-2.jpg'},
  {id:3, name:{es:'Mocacín Ejecutivo', en:'Executive Moccasin'}, price:200, desc:{es:'Acabado premium', en:'Premium finish'}, img:'img/product-3.jpg'}
];

// Mostrar año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// ----------------- USUARIOS -----------------
let USERS = [
  { username: "alumno1", password: "abc123" },
  { username: "ilton", password: "12345" },
  { username: "user3", password: "pass3" },
  { username: "user4", password: "pass4" }
];

// Cargar usuarios guardados previamente
const storedUsers = JSON.parse(localStorage.getItem('moca_users'));
if (storedUsers) USERS = USERS.concat(storedUsers);

// ----------------- CAPTCHA -----------------
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const text = `${a} + ${b} =`;
  const result = a + b;
  return { text, result };
}

let currentCaptcha = generateCaptcha();

function refreshCaptchaUI() {
  const el = document.getElementById('captchaText');
  if (el) el.textContent = currentCaptcha.text;
}

document.addEventListener('click', (e)=>{
  if (e.target && e.target.id === 'refreshCaptcha') {
    currentCaptcha = generateCaptcha();
    refreshCaptchaUI();
  }
});

// ----------------- LOGIN / CREAR CUENTA -----------------
let formMode = 'login'; // 'login' o 'register'
const toggleModeBtn = document.getElementById('toggleMode');
if (toggleModeBtn) {
  toggleModeBtn.addEventListener('click', () => {
    formMode = formMode === 'login' ? 'register' : 'login';
    document.getElementById('loginBtn').textContent = formMode === 'login' ? 'Entrar' : 'Crear cuenta';
    toggleModeBtn.textContent = formMode === 'login' ? '¿Crear cuenta?' : '¿Iniciar sesión?';
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  refreshCaptchaUI();
  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const cap = document.getElementById('captchaInput').value.trim();
    const error = document.getElementById('error');

    if (!user || !pass || !cap) {
      if (error) error.textContent = 'Completa todos los campos.';
      return;
    }

    if (String(currentCaptcha.result) !== cap) {
      if (error) error.textContent = 'Captcha incorrecto.';
      currentCaptcha = generateCaptcha();
      refreshCaptchaUI();
      return;
    }

    if (formMode === 'login') {
      const matchedUser = USERS.find(u => u.username === user && u.password === pass);
      if (matchedUser) {
        localStorage.setItem('moca_logged', 'true');
        localStorage.setItem('moca_user', user);
        window.location.href = 'home.html';
      } else {
        if (error) error.textContent = 'Usuario o contraseña incorrectos.';
      }
    } else if (formMode === 'register') {
      const exists = USERS.find(u => u.username === user);
      if (exists) {
        if (error) error.textContent = 'El usuario ya existe.';
        return;
      }
      const newUser = { username: user, password: pass };
      USERS.push(newUser);
      const newUsers = USERS.filter(u => !storedUsers || !storedUsers.some(su => su.username === u.username));
      localStorage.setItem('moca_users', JSON.stringify(newUsers));
      if (error) error.textContent = 'Cuenta creada correctamente. Ahora inicia sesión.';
      formMode = 'login';
      document.getElementById('loginBtn').textContent = 'Entrar';
      toggleModeBtn.textContent = '¿Crear cuenta?';
      loginForm.reset();
      currentCaptcha = generateCaptcha();
      refreshCaptchaUI();
    }
  });
}

// ----------------- PROTECCIÓN DE HOME -----------------
if (location.pathname.endsWith('home.html')) {
  // Para proteger home, descomenta la línea siguiente:
  // if (localStorage.getItem('moca_logged') !== 'true') window.location.href = 'login.html';
}

// ----------------- LOGOUT -----------------
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    localStorage.removeItem('moca_logged');
    localStorage.removeItem('moca_user');
    window.location.href = 'index.html';
  });
}

// ----------------- RENDER PRODUCTOS -----------------
function renderProducts(lang='es') {
  const container = document.getElementById('productsSection');
  if (!container) return;
  container.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name[lang] || p.name.es}">
      <h3>${p.name[lang]}</h3>
      <p class="muted">${p.desc[lang]}</p>
      <div class="price">${p.price} BOB</div>
    `;
    container.appendChild(card);
  });
}

// ----------------- CAMBIO DE IDIOMA -----------------
const langSelect = document.getElementById('langSelect');
const storedLang = localStorage.getItem('moca_lang') || 'es';
if (langSelect) {
  langSelect.value = storedLang;
  langSelect.addEventListener('change', (e)=>{
    localStorage.setItem('moca_lang', e.target.value);
    applyLanguage(e.target.value);
    renderProducts(e.target.value);
  });
  applyLanguage(storedLang);
}

// ----------------- FUNCION applyLanguage -----------------
function applyLanguage(lang='es') {
  const loginTitle = document.getElementById('loginTitle');
  const labelUser = document.getElementById('labelUser');
  const labelPass = document.getElementById('labelPass');
  const labelCaptcha = document.getElementById('labelCaptcha');
  const loginBtn = document.getElementById('loginBtn');
  const captchaInput = document.getElementById('captchaInput');
  const userInput = document.getElementById('username');
  const passInput = document.getElementById('password');

  if (loginTitle) loginTitle.textContent = lang === 'en' ? 'Login' : 'Iniciar sesión';
  if (labelUser) labelUser.textContent = lang === 'en' ? 'Username' : 'Usuario';
  if (labelPass) labelPass.textContent = lang === 'en' ? 'Password' : 'Contraseña';
  if (labelCaptcha) labelCaptcha.childNodes[0].textContent = lang === 'en' ? 'Captcha: ' : 'Captcha: ';
  if (loginBtn) loginBtn.textContent = lang === 'en' ? 'Login' : 'Entrar';
  if (userInput) userInput.placeholder = lang === 'en' ? 'username' : 'usuario';
  if (passInput) passInput.placeholder = lang === 'en' ? 'password' : 'contraseña';
  if (captchaInput) captchaInput.placeholder = lang === 'en' ? 'Write the result' : 'Escribe el resultado';

  const title = document.getElementById('siteTitle');
  const tag = document.getElementById('siteTag');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeText = document.getElementById('welcomeText');
  if (title) title.textContent = lang==='en' ? 'Moccasins Bolivia' : 'Mocacines Bolivia';
  if (tag) tag.textContent = lang==='en' ? 'Craftsmanship & quality' : 'Artesanía y calidad';
  if (welcomeTitle) welcomeTitle.textContent = lang==='en' ? 'Welcome' : 'Bienvenido';
  if (welcomeText) welcomeText.textContent = lang==='en' ? 'Thanks for visiting our handmade moccasins store.' : 'Gracias por visitar nuestra tienda de mocacines artesanales.';
}

// ----------------- TEMA CLARO / OSCURO -----------------
const themeSelect = document.getElementById('themeSelect');
const storedTheme = localStorage.getItem('moca_theme') || 'light';
if (themeSelect) {
  themeSelect.value = storedTheme;
  themeSelect.addEventListener('change', (e)=>{
    localStorage.setItem('moca_theme', e.target.value);
    applyTheme(e.target.value);
  });
  applyTheme(storedTheme);
}

function applyTheme(t='light') {
  if (t === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}

// ----------------- INICIALIZAR AL CARGAR -----------------
document.addEventListener('DOMContentLoaded', ()=>{
  const lang0 = localStorage.getItem('moca_lang') || 'es';
  renderProducts(lang0);
  applyLanguage(lang0);
  applyTheme(localStorage.getItem('moca_theme') || 'light');
  refreshCaptchaUI();
});

// ----------------- BOTON DE BUSQUEDA -----------------
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('search-category');
    const formElement = document.getElementById('searchForm');
    selectElement.addEventListener('change', function() {
        const selectedPage = selectElement.value;
        formElement.action = selectedPage;
      console.log("El formulario ahora apunta a: " + formElement.action); 
    });
    formElement.action = selectElement.value;
});



