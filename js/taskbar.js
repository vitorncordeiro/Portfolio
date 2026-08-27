/* ===================================================================
   Vitows98 — Taskbar + Clock
   =================================================================== */
const Taskbar = (() => {
  let activeId = null;
  const buttons = {}; // id -> element

  /* ── clock ───────────────────────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${h}:${m}`;
  }

  function startClock() {
    updateClock();
    setInterval(updateClock, 10000);
  }

  /* ── buttons ─────────────────────────────────────────────── */
  function addButton(id, icon, title) {
    const container = document.getElementById('taskbar-windows');
    if (!container || buttons[id]) return;

    const btn = document.createElement('button');
    btn.className = 'taskbar-btn';
    btn.innerHTML = `<span class="tb-icon">${icon}</span><span class="tb-label">${title}</span>`;
    btn.setAttribute('aria-label', title);
    btn.addEventListener('click', () => WindowManager.taskbarClick(id));
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') WindowManager.taskbarClick(id); });

    container.appendChild(btn);
    buttons[id] = btn;
  }

  function removeButton(id) {
    if (buttons[id]) {
      buttons[id].remove();
      delete buttons[id];
    }
    if (activeId === id) activeId = null;
  }

  function setActive(id) {
    activeId = id;
    Object.keys(buttons).forEach(k => {
      buttons[k].classList.toggle('active', k === id);
    });
  }

  function init() {
    startClock();
  }

  return { init, addButton, removeButton, setActive };
})();

