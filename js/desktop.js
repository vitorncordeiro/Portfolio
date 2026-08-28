/* ===================================================================
   Vitows98 — Desktop & App Launcher
   =================================================================== */
const Desktop = (() => {

  const ICONS = [
    { id: 'mycomputer', icon: '<img src="./assets/icons/My Computer.ico" style="width: 50px; height: 50px;">', label: 'Meu Computador' },
    { id: 'about',      icon: '<img src="./assets/icons/My Profile Folder.ico" style="width: 50px; height: 50px;">', label: 'Sobre Mim.txt' },
    { id: 'sterna',     icon: '<img src="./assets/icons/Earth (fixed).ico" style="width: 50px; height: 50px;">', label: 'Sterna.exe' },
    { id: 'dragons',    icon: '<img src="./assets/icons/Minesweeper.ico" style="width: 50px; height: 50px;">', label: 'Dragons Inquiry.exe' },
    { id: 'javagif',    icon: '<img src="./assets/icons/Java.ico" style="width: 50px; height: 50px;">', label: 'Java.exe' },
    { id: 'aladin',     icon: '<img src="./assets/icons/Phone.ico" style="width: 50px; height: 50px;">', label: 'Aladin.exe' },
    { id: 'resume',     icon: '<img src="./assets/icons/List File.ico" style="width: 50px; height: 50px;">', label: 'Currículo.pdf' },
    { id: 'pidgeymail', icon: '<img src="./assets/icons/Internet Properties.ico" style="width: 50px; height: 50px;">', label: 'PidgeyMail.exe' },
    { id: 'jitor',      icon: '<img src="./assets/icons/Manage your Server.ico" style="width: 50px; height: 50px;">', label: 'Jitor.exe' },
    { id: 'contact',    icon: '<img src="./assets/icons/User Support.ico" style="width: 50px; height: 50px;">', label: 'Contato.exe' },
  ];

const APP_CONFIG = {
  mycomputer: {
    title: 'Meu Computador',
    icon: '<img src="./assets/icons/My Computer.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildMyComputer(),
    width: 400,
    height: 420,
    status: 'Vitows98 Portfolio OS'
  },

  about: {
    title: 'Sobre Mim.txt',
    icon: '<img src="./assets/icons/My Profile Folder.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildAbout(),
    width: 480,
    height: 500
  },

  sterna: {
    title: 'Sterna.exe',
    icon: '<img src="./assets/icons/Earth (fixed).ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildSterna(),
    width: 540,
    height: 540,
    status: 'Consulta de domínios'
  },

  javagif: {
    title: 'Java.exe',
    icon: '<img src="./assets/icons/Java.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildJavaGif(),
    width: 540,
    height: 540,
    status: 'Java'
  },

  dragons: {
    title: 'Dragons Inquiry.exe',
    icon: '<img src="./assets/icons/Minesweeper.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildDragons(),
    width: 540,
    height: 540,
    status: 'CLI Game — Java'
  },

  pidgeymail: {
    title: 'PidgeyMail.exe',
    icon: '<img src="./assets/icons/Internet Properties.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildPidgeyMail(),
    width: 540,
    height: 520,
    status: 'Microsserviços — Spring Boot'
  },

  aladin: {
    title: 'Aladin.exe',
    icon: '<img src="./assets/icons/Phone.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildAladin(),
    width: 520,
    height: 540,
    status: 'ESP32 + LLM'
  },

  jitor: {
    title: 'Jitor.exe',
    icon: '<img src="./assets/icons/Manage your Server.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildJitor(),
    width: 500,
    height: 480,
    status: 'HTTP Server — Java puro'
  },

  resume: {
    title: 'Currículo.pdf',
    icon: '<img src="./assets/icons/List File.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildResume(),
    width: 440,
    height: 440
  },

  contact: {
    title: 'Contato.exe',
    icon: '<img src="./assets/icons/User Support.ico" style="width: 32px; height: 32px;">',
    content: () => Apps.buildContact(),
    width: 360,
    height: 320,
    status: 'Vitor Natal Cordeiro'
  },
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
