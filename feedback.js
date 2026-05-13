const NS = 'todahoraconta';
const API = 'https://api.counterapi.dev/v1';

async function countHit(key) {
  try {
    const res = await fetch(`${API}/${NS}/${key}/up/`);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count || 0;
  } catch { return 0; }
}

async function countGet(key) {
  try {
    const res = await fetch(`${API}/${NS}/${key}/`);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count || 0;
  } catch { return 0; }
}

document.addEventListener('DOMContentLoaded', async () => {
  const visitEl = document.getElementById('visit-count');
  const feedbackSection = document.querySelector('.feedback-widget');
  const upBtn = document.getElementById('vote-up');
  const downBtn = document.getElementById('vote-down');

  // Visit: 1x por dia
  const today = new Date().toDateString();
  if (localStorage.getItem('thc-visit') !== today) {
    localStorage.setItem('thc-visit', today);
    const v = await countHit('visits');
    if (visitEl) visitEl.textContent = v.toLocaleString('pt-BR');
  } else {
    const v = await countGet('visits');
    if (visitEl) visitEl.textContent = v.toLocaleString('pt-BR');
  }

  // Already voted?
  if (localStorage.getItem('thc-voted-v2')) {
    if (feedbackSection) {
      feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Obrigado por participar! 🙏</p>';
    }
    return;
  }

  // Vote handlers
  upBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted-v2', 'up');
    upBtn.disabled = downBtn.disabled = true;
    await countHit('up');
    feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Valeu! Compartilha com quem precisa ouvir isso. 🙏</p>';
  });

  downBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted-v2', 'down');
    upBtn.disabled = downBtn.disabled = true;
    await countHit('down');
    feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--muted);">Valeu pelo feedback! Conta pra gente o que faria diferente.</p>';
  });
});
