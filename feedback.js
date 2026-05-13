const NS = 'todahoraconta';
const API = 'https://api.counterapi.dev/v1';

async function countHit(key) {
  try {
    const res = await fetch(`${API}/${NS}/${key}/up`);
    const data = await res.json();
    return data.count;
  } catch { return null; }
}

async function countGet(key) {
  try {
    const res = await fetch(`${API}/${NS}/${key}`);
    const data = await res.json();
    return data.count;
  } catch { return null; }
}

document.addEventListener('DOMContentLoaded', async () => {
  const visitEl = document.getElementById('visit-count');
  const upEl = document.getElementById('up-count');
  const downEl = document.getElementById('down-count');
  const upBtn = document.getElementById('vote-up');
  const downBtn = document.getElementById('vote-down');
  const feedbackSection = document.querySelector('.feedback-widget');

  // Visit: 1x por dia
  const today = new Date().toDateString();
  if (localStorage.getItem('thc-visit') !== today) {
    localStorage.setItem('thc-visit', today);
    const v = await countHit('visits');
    if (visitEl && v) visitEl.textContent = v.toLocaleString('pt-BR');
  } else {
    const v = await countGet('visits');
    if (visitEl && v) visitEl.textContent = v.toLocaleString('pt-BR');
  }

  // Already voted?
  if (localStorage.getItem('thc-voted')) {
    if (upEl) upEl.textContent = ((await countGet('up'))?.toLocaleString('pt-BR')) || '0';
    if (downEl) downEl.textContent = ((await countGet('down'))?.toLocaleString('pt-BR')) || '0';
    if (feedbackSection) feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Obrigado por participar! 🙏</p>';
    return;
  }

  // Load counts
  if (upEl) upEl.textContent = (await countGet('up')) || 0;
  if (downEl) downEl.textContent = (await countGet('down')) || 0;

  upBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted', 'up');
    upBtn.disabled = downBtn.disabled = true;
    const v = await countHit('up');
    if (upEl && v) upEl.textContent = v.toLocaleString('pt-BR');
    upBtn.style.transform = 'scale(1.3)';
    setTimeout(() => {
      feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Valeu! Compartilha com quem precisa ouvir isso. 🙏</p>';
    }, 800);
  });

  downBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted', 'down');
    upBtn.disabled = downBtn.disabled = true;
    const v = await countHit('down');
    if (downEl && v) downEl.textContent = v.toLocaleString('pt-BR');
    downBtn.style.transform = 'scale(1.3)';
    setTimeout(() => {
      feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--muted);">Valeu pelo feedback! Conta pra gente o que faria diferente.</p>';
    }, 800);
  });
});
