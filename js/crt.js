/* ===================================================================
   Vitows98 — CRT Effect Toggle
   =================================================================== */
const CRT = (() => {
  const KEY = 'vitows98_crt';

  function isOn() {
    try { return localStorage.getItem(KEY) === '1'; } catch(e) { return false; }
  }

  function apply(on) {
    document.body.classList.toggle('crt-on', on);
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch(e) {}
    // Update menu label if visible
    const label = document.getElementById('crt-menu-label');
    if (label) label.textContent = on ? 'Efeito CRT: Ligado' : 'Efeito CRT: Desligado';
  }

  function toggle() { apply(!isOn()); }

  function init() {
    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    apply(reduced ? false : isOn());
  }

  return { init, toggle, isOn };
})();

