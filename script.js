// DOM Elements
const form = document.getElementById('password-form');
const passwordList = document.getElementById('password-list');
const searchBar = document.getElementById('search-bar');
const toggleTheme = document.getElementById('toggle-theme');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

// Load passwords on page load
document.addEventListener('DOMContentLoaded', loadPasswords);

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const websiteName = document.getElementById('website-name').value;
  const username = document.getElementById('username').value;
  const password = passwordInput.value;
  const dateSaved = new Date().toLocaleString();

  const entry = { websiteName, username, password, dateSaved };
  savePassword(entry);
  form.reset();
});

// Save password to localStorage
function savePassword(entry) {
  let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.push(entry);
  localStorage.setItem('passwords', JSON.stringify(passwords));
  renderPasswords(passwords);
}

// Load passwords from localStorage
function loadPasswords() {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  renderPasswords(passwords);
}

// Render passwords
function renderPasswords(passwords) {
  passwordList.innerHTML = '';
  passwords.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Website:</strong> ${entry.websiteName} <br>
      <strong>Username:</strong> ${entry.username} <br>
      <strong>Password:</strong> ${entry.password} <br>
      <strong>Date Saved:</strong> ${entry.dateSaved}
      <button onclick="deletePassword(${index})">Delete</button>
    `;
    passwordList.appendChild(listItem);
  });
}

// Delete password
function deletePassword(index) {
  let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.splice(index, 1);
  localStorage.setItem('passwords', JSON.stringify(passwords));
  renderPasswords(passwords);
}

// Search functionality
searchBar.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  const filteredPasswords = passwords.filter(entry =>
    entry.websiteName.toLowerCase().includes(query)
  );
  renderPasswords(filteredPasswords);
});

// Toggle Dark Mode
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
});
