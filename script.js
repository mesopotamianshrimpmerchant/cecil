let shrimpCount = parseInt(localStorage.getItem('shrimpCount')) || 0;
let shrimpPrice = parseFloat(localStorage.getItem('shrimpPrice')) || 0.12;
let autoShrimpers = parseInt(localStorage.getItem('autoShrimpers')) || 0;
let clickMultiplier = parseInt(localStorage.getItem('clickMultiplier')) || 1;
const clickSound = document.getElementById("clickSound");
function saveGame() {
  localStorage.setItem('shrimpCount', shrimpCount);
  localStorage.setItem('shrimpPrice', shrimpPrice);
  localStorage.setItem('autoShrimpers', autoShrimpers);
  localStorage.setItem('clickMultiplier', clickMultiplier);
}
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function updateDisplay() {
  document.getElementById('shrimpCount').textContent = shrimpCount;
  document.getElementById('shrimpPrice').textContent = `$${shrimpPrice.toFixed(2)}`;
  document.getElementById('shrimpValue').textContent = `$${(shrimpCount * shrimpPrice).toFixed(2)}`;
  document.getElementById('autoCount').textContent = autoShrimpers;
  document.getElementById('multiplier').textContent = clickMultiplier + 'x';
}
function clickShrimp() {
  shrimpCount += clickMultiplier;
  shrimpPrice = (Math.random() * 0.1 + 0.1);
  clickSound.play();
  spawnParticle();
  updateDisplay();
  saveGame();
}
function buyAutoShrimper() {
  if (shrimpCount * shrimpPrice >= 20) {
    autoShrimpers++;
    shrimpCount = Math.floor(shrimpCount - 20 / shrimpPrice);
    updateDisplay();
    saveGame();
  }
}
function buyMultiplier() {
  if (shrimpCount * shrimpPrice >= 50) {
    clickMultiplier++;
    shrimpCount = Math.floor(shrimpCount - 50 / shrimpPrice);
    updateDisplay();
    saveGame();
  }
}
setInterval(() => {
  shrimpCount += autoShrimpers;
  shrimpPrice = (Math.random() * 0.1 + 0.1);
  updateDisplay();
  saveGame();
}, 1000);
updateDisplay();
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
function spawnParticle() {
  particles.push({
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    radius: 4,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speedX: (Math.random() - 0.5) * 8,
    speedY: (Math.random() - 0.5) * 8,
    alpha: 1
  });
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.01;
    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
