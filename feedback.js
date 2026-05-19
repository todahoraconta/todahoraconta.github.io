const API = 'https://script.google.com/macros/s/AKfycbys9d51-bPu0Ycc9NTeab8j4ZxIUkTgsh5KwOatXX4uUjyocan-J78MAuAPJ2U2JPj4tQ/exec';

async function hit(key) {
  try {
    const res = await fetch(`${API}?action=hit&key=${key}`);
    const data = await res.json();
    return data.count;
  } catch { return null; }
}

async function get(key) {
  try {
    const res = await fetch(`${API}?key=${key}`);
    const data = await res.json();
    return data.count;
  } catch { return null; }
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
    const v = await hit('visits');
    if (visitEl && v != null) visitEl.textContent = v.toLocaleString('pt-BR');
  } else {
    const v = await get('visits');
    if (visitEl && v != null) visitEl.textContent = v.toLocaleString('pt-BR');
  }

  // Already voted?
  if (localStorage.getItem('thc-voted-v2')) {
    if (feedbackSection) {
      feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Obrigado por participar! 🙏</p>';
    }
    return;
  }

  upBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted-v2', 'up');
    upBtn.disabled = downBtn.disabled = true;
    await hit('up');
    feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--teal);">Valeu! Compartilha com quem precisa ouvir isso. 🙏</p>';
  });

  downBtn?.addEventListener('click', async () => {
    localStorage.setItem('thc-voted-v2', 'down');
    upBtn.disabled = downBtn.disabled = true;
    await hit('down');
    feedbackSection.innerHTML = '<p style="font-size:0.95rem;color:var(--muted);">Valeu pelo feedback! Conta pra gente o que faria diferente.</p>';
  });
});
