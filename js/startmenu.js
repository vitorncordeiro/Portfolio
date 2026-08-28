/* ===================================================================
   Vitows98 — Start Menu
   =================================================================== */
const StartMenu = (() => {
  let isOpen = false;

  function buildMenu() {
    const menu = document.getElementById('start-menu');

    menu.innerHTML = `
      <div class="start-sidebar">
        <em>Vito</em><span>ws98</span>
      </div>
      <div class="start-items">

        

        <!-- Documentos -->
        <div class="start-item" tabindex="0" role="menuitem" aria-haspopup="true">
          <span class="start-item-icon"><img src="./assets/icons/File.ico"></span>
          <span>Documentos</span>
          <span class="start-item-arrow">▶</span>
          <div class="start-submenu" role="menu">
            <div class="start-item" tabindex="0" role="menuitem" data-open="about">
              <span class="start-item-icon"><img src="./assets/icons/My Profile Folder.ico"></span>
              <span>Sobre Mim.txt</span>
            </div>
            <div class="start-item" tabindex="0" role="menuitem" data-open="resume">
              <span class="start-item-icon"><img src="./assets/icons/List File.ico"></span>
              <span>Currículo.pdf</span>
            </div>
          </div>
        </div>

        <!-- Configurações -->
        <div class="start-item" tabindex="0" role="menuitem" aria-haspopup="true">
          <span class="start-item-icon"><img src="./assets/icons/System Properties.ico"></span>
          <span>Configurações</span>
          <span class="start-item-arrow">▶</span>
          <div class="start-submenu" role="menu">
            <div class="start-item" tabindex="0" role="menuitem" id="menu-wallpaper">
              <span class="start-item-icon"><img src="./assets/icons/Display.ico"></span>
              <span>Wallpaper</span>
            </div>
            <div class="start-item" tabindex="0" role="menuitem" id="menu-crt">
              <span class="start-item-icon"><img src="./assets/icons/Monitor.ico"></span>
              <span id="crt-menu-label">Efeito CRT: ${CRT.isOn() ? 'Ligado' : 'Desligado'}</span>
            </div>
          </div>
        </div>

        <div class="start-sep"></div>

        <!-- Contato -->
        <div class="start-item" tabindex="0" role="menuitem" data-open="contact">
          <span class="start-item-icon"><img src="./assets/icons/User Support.ico"></span>
          <span>Contato</span>
        </div>


      </div>
    `;
  }

  function bindEvents() {
    const menu = document.getElementById('start-menu');

    // Open windows from menu items
    menu.addEventListener('click', e => {
      const item = e.target.closest('[data-open]');
      if (item) {
        Desktop.openApp(item.dataset.open);
        close();
        return;
      }

      const wallpaperBtn = e.target.closest('#menu-wallpaper');
      if (wallpaperBtn) { Wallpaper.openChooser(); close(); return; }

      const crtBtn = e.target.closest('#menu-crt');
      if (crtBtn) { CRT.toggle(); return; }

      const shutdownBtn = e.target.closest('#menu-shutdown');
      if (shutdownBtn) { close(); Shutdown.confirm(); return; }
    });

    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  function open() {
    buildMenu();
    const menu = document.getElementById('start-menu');
    menu.classList.add('open');
    const btn = document.getElementById('start-btn');
    btn.classList.add('active');
    isOpen = true;
    bindEvents();
    // Focus first item
    const first = menu.querySelector('[tabindex="0"]');
    if (first) first.focus();
  }

  function close() {
    const menu = document.getElementById('start-menu');
    menu.classList.remove('open');
    const btn = document.getElementById('start-btn');
    btn.classList.remove('active');
    isOpen = false;
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function init() {
    const btn = document.getElementById('start-btn');
    btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (isOpen && !e.target.closest('#start-menu') && !e.target.closest('#start-btn')) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close(); });
  }

  return { init, open, close, toggle };
})();

