/* ===================================================================
   Vitows98 — Boot Sequence
   =================================================================== */
const Boot = (() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LINES = [
    { label: 'VITOWS98 BIOS v1.0', dots: '', status: '', color: 'bios-title' },
    { label: '(C) 1998-2026 Vitor Natal Cordeiro', dots: '', status: '', color: 'bios-sub' },
    null, // blank
    { label: 'Verificando memória', dots: '........', status: 'OK' },
    { label: 'Detectando dispositivos', dots: '.....', status: 'OK' },
    { label: 'Iniciando VITOWS98.SYS', dots: '...', status: 'OK' },
    { label: 'Carregando portfólio', dots: '.....', status: 'OK' },
    { label: 'Iniciando interface gráfica', dots: '..', status: 'OK' },
    null,
    { label: 'Iniciando Vitows98', dots: '...', status: '' },
  ];

  const PROGRESS_MSGS = [
    'Carregando drivers...',
    'Inicializando subsistemas...',
    'Verificando integridade...',
    'Montando desktop...',
    'Pronto.'
  ];

  function delay(ms) {
    return REDUCED ? Promise.resolve() : new Promise(r => setTimeout(r, ms));
  }

  function buildBootScreen() {
    const screen = document.getElementById('boot-screen');
    screen.innerHTML = '';

    // Lines container
    const linesDiv = document.createElement('div');
    linesDiv.id = 'boot-lines';
    screen.appendChild(linesDiv);

    // Progress
    const progressWrap = document.createElement('div');
    progressWrap.style.marginTop = '24px';
    progressWrap.innerHTML = `
      <div class="boot-progress-bar"><div class="boot-progress-fill" id="boot-fill"></div></div>
      <div class="boot-loading-msg" id="boot-msg"></div>
    `;
    screen.appendChild(progressWrap);

    return linesDiv;
  }

  function addLine(container, lineData) {
    if (lineData === null) {
      const br = document.createElement('div');
      br.style.height = '8px';
      container.appendChild(br);
      return;
    }

    const div = document.createElement('div');
    div.className = 'boot-line';

    if (lineData.color === 'bios-title') {
      div.innerHTML = `<span class="boot-bios-title" style="color:#c0c0c0;font-size:16px;font-weight:bold;letter-spacing:2px;">${lineData.label}</span>`;
    } else if (lineData.color === 'bios-sub') {
      div.innerHTML = `<span style="color:#666;font-size:11px;">${lineData.label}</span>`;
    } else {
      const dots = lineData.dots ? `<span class="boot-dots">${lineData.dots}</span>` : '';
      const status = lineData.status
        ? `<span class="boot-ok">[${lineData.status}]</span>`
        : lineData.label.includes('Iniciando Vitows98')
          ? `<span class="boot-cursor"></span>`
          : '';
      div.innerHTML = `<span class="boot-label">${lineData.label}</span>${dots}${status}`;
    }

    container.appendChild(div);
    return div;
  }

  async function run(onDone) {
    const screen = document.getElementById('boot-screen');
    if (!screen) { onDone(); return; }

    const container = buildBootScreen();

    if (REDUCED) {
      // Skip animation entirely
      screen.classList.add('hidden');
      onDone();
      return;
    }

    // Show lines with delays
    for (let i = 0; i < LINES.length; i++) {
      const div = addLine(container, LINES[i]);
      await delay(i === 0 ? 0 : 120);
      if (div) {
        await delay(10);
        div.classList.add('visible');
      }
    }

    // Progress bar
    const fill = document.getElementById('boot-fill');
    const msg  = document.getElementById('boot-msg');

    for (let i = 0; i < PROGRESS_MSGS.length; i++) {
      if (msg) msg.textContent = PROGRESS_MSGS[i];
      if (fill) fill.style.width = ((i + 1) / PROGRESS_MSGS.length * 100) + '%';
      await delay(280);
    }

    await delay(400);

    // Fade out boot screen
    screen.style.transition = 'opacity 0.4s';
    screen.style.opacity = '0';
    await delay(420);
    screen.classList.add('hidden');
    screen.style.opacity = '';
    screen.style.transition = '';

    onDone();
  }

  return { run };
})();

