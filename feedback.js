const NS = 'todahoraconta-com';

async function countHit(key) {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${NS}/${key}`);
    const data = await res.json();
    return data.value;
  } catch { return null; }
}

async function countGet(key) {
  try {
    const res = await fetch(`https://api.countapi.xyz/get/${NS}/${key}`);
    const data = await res.json();
    return data.value;
  } catch { return null; }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Visit counter
  const visitEl = document.getElementById('visit-count');
  if (visitEl) {
    const v = await countHit('visits');
    if (v) visitEl.textContent = v.toLocaleString('pt-BR');
  }

  // Load current vote counts
  const upEl = document.getElementById('up-count');
  const downEl = document.getElementById('down-count');
  if (upEl) upEl.textContent = (await countGet('up')) || 0;
  if (downEl) downEl.textContent = (await countGet('down')) || 0;

  // Vote buttons
  document.getElementById('vote-up')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    document.getElementById('vote-down').disabled = true;
    const v = await countHit('up');
    if (upEl && v) upEl.textContent = v.toLocaleString('pt-BR');
    e.target.style.transform = 'scale(1.3)';
  });

  document.getElementById('vote-down')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    document.getElementById('vote-up').disabled = true;
    const v = await countHit('down');
    if (downEl && v) downEl.textContent = v.toLocaleString('pt-BR');
    e.target.style.transform = 'scale(1.3)';
  });
});
