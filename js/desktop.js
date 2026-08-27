/* ===================================================================
   Vitows98 — Desktop & App Launcher
   =================================================================== */
const Desktop = (() => {

  const ICONS = [
    { id: 'mycomputer', icon: '🖥️', label: 'Meu Computador' },
    { id: 'about',      icon: '👤', label: 'Sobre Mim.txt' },
    { id: 'sterna',     icon: '🌐', label: 'Sterna.exe' },
    { id: 'dragons',    icon: '🐉', label: 'Dragons Inquiry.exe' },
    { id: 'pidgeymail', icon: '📨', label: 'PidgeyMail.exe' },
    { id: 'aladin',     icon: '🪔', label: 'Aladin.exe' },
    { id: 'jitor',      icon: '⚙️', label: 'Jitor.exe' },
    { id: 'resume',     icon: '📑', label: 'Currículo.pdf' },
    { id: 'contact',    icon: '📧', label: 'Contato.exe' },
    { id: 'trash',      icon: '🗑️', label: 'Lixeira' },
  ];

  const APP_CONFIG = {
    mycomputer: { title: 'Meu Computador',            icon: '🖥️', content: () => Apps.buildMyComputer(), width: 400, height: 420, status: 'Vitows98 Portfolio OS' },
    about:      { title: 'Sobre Mim.txt',             icon: '👤', content: () => Apps.buildAbout(),       width: 480, height: 500 },
    sterna:     { title: 'Sterna.exe',                icon: '🌐', content: () => Apps.buildSterna(),      width: 540, height: 540, status: 'Consulta de domínios' },
    dragons:    { title: 'Dragons Inquiry.exe',       icon: '🐉', content: () => Apps.buildDragons(),     width: 540, height: 540, status: 'CLI Game — Java' },
    pidgeymail: { title: 'PidgeyMail.exe',            icon: '📨', content: () => Apps.buildPidgeyMail(),  width: 540, height: 520, status: 'Microsserviços — Spring Boot' },
    aladin:     { title: 'Aladin.exe',                icon: '🪔', content: () => Apps.buildAladin(),      width: 520, height: 540, status: 'ESP32 + LLM' },
    jitor:      { title: 'Jitor.exe',                 icon: '⚙️', content: () => Apps.buildJitor(),      width: 500, height: 480, status: 'HTTP Server — Java puro' },
    resume:     { title: 'Currículo.pdf',             icon: '📑', content: () => Apps.buildResume(),      width: 440, height: 440 },
    contact:    { title: 'Contato.exe',               icon: '📧', content: () => Apps.buildContact(),     width: 360, height: 320, status: 'Vitor Natal Cordeiro' },
    trash:      { title: 'Lixeira',                   icon: '🗑️', content: () => Apps.buildTrash(),      width: 380, height: 340 },
  };

  function openApp(id) {
    const cfg = APP_CONFIG[id];
    if (!cfg) return;
    WindowManager.open(id, cfg.title, cfg.icon, cfg.content(), {
      width: cfg.width,
      height: cfg.height,
      statusText: cfg.status || null
    });
  }

  function buildIcons() {
    const area = document.getElementById('icon-area');
    const isMobile = window.innerWidth <= 640;

    ICONS.forEach(icon => {
      const div = document.createElement('div');
      div.className = 'desktop-icon';
      div.setAttribute('tabindex', '0');
      div.setAttribute('role', 'button');
      div.setAttribute('aria-label', `Abrir ${icon.label}`);
      div.dataset.appId = icon.id;
      div.innerHTML = `
        <div class="icon-img">${icon.icon}</div>
        <div class="icon-label">${icon.label}</div>
      `;

      let lastClick = 0;

      div.addEventListener('click', e => {
        // Deselect all
        document.querySelectorAll('.desktop-icon').forEach(d => d.classList.remove('selected'));
        div.classList.add('selected');

        const now = Date.now();
        if (isMobile || now - lastClick < 400) {
          openApp(icon.id);
        }
        lastClick = now;
      });

      div.addEventListener('dblclick', () => {
        openApp(icon.id);
      });

      div.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApp(icon.id); }
      });

      area.appendChild(div);
    });

    // Deselect on desktop click
    document.getElementById('desktop').addEventListener('click', e => {
      if (!e.target.closest('.desktop-icon')) {
        document.querySelectorAll('.desktop-icon').forEach(d => d.classList.remove('selected'));
      }
    });
  }

  function init() {
    buildIcons();
  }

  return { init, openApp };
})();

