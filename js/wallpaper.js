/* ===================================================================
   Vitows98 — Wallpaper Manager
   =================================================================== */
const Wallpaper = (() => {
  const KEY = 'vitows98_wallpaper';

  function set(url) {
    document.getElementById('desktop').style.backgroundImage = `url('${url}')`;
    try { localStorage.setItem(KEY, url); } catch(e) {}
  }

  function load() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) { set(saved); return; }
    } catch(e) {}
    // Default: first wallpaper
    if (DATA.wallpapers && DATA.wallpapers.length) set(DATA.wallpapers[0].file);
  }

  function buildChooserContent() {
    const current = (() => {
      try { return localStorage.getItem(KEY) || (DATA.wallpapers[0] && DATA.wallpapers[0].file) || ''; } catch(e) { return ''; }
    })();

    let thumbs = DATA.wallpapers.map(w => `
      <div class="wallpaper-thumb ${w.file === current ? 'selected' : ''}"
           data-file="${w.file}"
           tabindex="0"
           role="button"
           aria-label="Wallpaper ${w.name}"
           title="${w.name}">
        <img src="${w.file}" alt="${w.name}" loading="lazy">
        <span>${w.name}</span>
      </div>
    `).join('');

    return `
      <div class="content-section">
        <h3>Plano de Fundo</h3>
        <p style="font-size:11px;margin-bottom:8px;">Selecione um wallpaper para a área de trabalho:</p>
        <div class="wallpaper-grid">${thumbs}</div>
      </div>
      <div style="text-align:right;margin-top:8px;">
        <button class="win-btn" id="wallpaper-apply">Aplicar</button>
      </div>
    `;
  }

  function openChooser() {
    WindowManager.open('wallpaper', 'Propriedades da Área de Trabalho', '🖼️', buildChooserContent(), {
      width: 320, height: 340
    });

    // Events
    setTimeout(() => {
      let selectedFile = null;
      try { selectedFile = localStorage.getItem(KEY) || (DATA.wallpapers[0] && DATA.wallpapers[0].file); } catch(e) {}

      document.querySelectorAll('.wallpaper-thumb').forEach(thumb => {
        const activate = () => {
          document.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('selected'));
          thumb.classList.add('selected');
          selectedFile = thumb.dataset.file;
        };
        thumb.addEventListener('click', activate);
        thumb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
      });

      const applyBtn = document.getElementById('wallpaper-apply');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          if (selectedFile) set(selectedFile);
          WindowManager.close('wallpaper');
        });
      }
    }, 50);
  }

  return { load, set, openChooser };
})();

