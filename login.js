// auth.js

// Manejo de mostrar/ocultar formularios
const loginFormSection = document.getElementById('loginFormSection');
const registerFormSection = document.getElementById('registerFormSection');

document.getElementById('btnLoginForm').addEventListener('click', () => {
  loginFormSection.classList.remove('hidden');
  registerFormSection.classList.add('hidden');
});

document.getElementById('btnRegisterForm').addEventListener('click', () => {
  loginFormSection.classList.add('hidden');
  registerFormSection.classList.remove('hidden');
});

// Manejo de usuarios en localStorage
const demoUser = { username: 'alumno1', password: 'abc123' };
if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([demoUser]));

// Login
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('usernameLogin').value.trim();
  const password = document.getElementById('passwordLogin').value.trim();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    alert(`Bienvenido ${username}`);
    document.getElementById('errorLogin').textContent = '';
  } else {
    document.getElementById('errorLogin').textContent = 'Usuario o contraseña incorrectos';
  }
});

// Registro
document.getElementById('registerForm').addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('usernameRegister').value.trim();
  const password = document.getElementById('passwordRegister').value.trim();
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username)) {
    document.getElementById('errorRegister').textContent = 'El usuario ya existe';
    return;
  }
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('errorRegister').textContent = '';
  alert('Cuenta creada exitosamente, ahora puedes iniciar sesión');
  // Cambiar automáticamente a login
  loginFormSection.classList.remove('hidden');
  registerFormSection.classList.add('hidden');
});
