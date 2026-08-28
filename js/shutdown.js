/* ===================================================================
   Vitows98 — Shutdown / Dialog
   =================================================================== */
const Shutdown = (() => {

  function showOverlay(html) {
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = html;
    overlay.classList.add('active');
  }

  function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = '';
    overlay.classList.remove('active');
  }

  function confirm() {
    showOverlay(`
      <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dlg-title">
        <div class="win-titlebar">
          <span class="win-title-icon"><img src="./assets/icons/My Computer.ico" style="width: 16px; height: 16px;"></span>
          <span class="win-title-text" id="dlg-title">Desligar o Vitows98</span>
        </div>
        <div class="dialog-body">
          <div class="dialog-icon"><img src="./assets/icons/My Computer.ico" style="width: 32px; height: 32px;"></div>
          <div class="dialog-msg">Deseja realmente desligar o <strong>Vitows98</strong>?</div>
        </div>
        <div class="dialog-footer">
          <button class="win-btn" id="shutdown-yes" autofocus>Sim</button>
          <button class="win-btn" id="shutdown-no">Não</button>
        </div>
      </div>
    `);

    document.getElementById('shutdown-yes').addEventListener('click', () => { hideOverlay(); doShutdown(); });
    document.getElementById('shutdown-no').addEventListener('click',  () => hideOverlay());
    document.getElementById('shutdown-yes').focus();

    document.getElementById('overlay').addEventListener('keydown', e => {
      if (e.key === 'Escape') hideOverlay();
    });
  }

  function doShutdown() {
    const screen = document.getElementById('shutdown-screen');
    screen.classList.add('active');
  }

  function init() {
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', () => location.reload());
  }

  return { confirm, init };
})();

