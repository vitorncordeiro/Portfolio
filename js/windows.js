/* ===================================================================
   Vitows98 — Window Manager
   =================================================================== */
const WindowManager = (() => {
  let zCounter = 100;
  const windows = {}; // id -> { el, minimized, maximized, prevRect }

  /* ── helpers ─────────────────────────────────────────────── */
  function nextZ() { return ++zCounter; }

  function focusWindow(id) {
    Object.keys(windows).forEach(k => {
      const w = windows[k];
      w.el.classList.toggle('focused', k === id);
      w.el.style.zIndex = k === id ? nextZ() : w.el.style.zIndex;
    });
    Taskbar.setActive(id);
  }

  /* ── drag ────────────────────────────────────────────────── */
  function makeDraggable(win, titlebar) {
    let dragging = false, ox = 0, oy = 0;

    function onStart(e) {
      const w = windows[win.dataset.winId];
      if (!w || w.maximized) return;
      if (e.target.closest('.win-ctrl')) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      ox = cx - rect.left;
      oy = cy - rect.top;
      focusWindow(win.dataset.winId);
      e.preventDefault();
    }

    function onMove(e) {
      if (!dragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const desktopH = window.innerHeight - 28;
      const newLeft = Math.max(0, Math.min(cx - ox, window.innerWidth - win.offsetWidth));
      const newTop  = Math.max(0, Math.min(cy - oy, desktopH - 22));
      win.style.left = newLeft + 'px';
      win.style.top  = newTop  + 'px';
    }

    function onEnd() { dragging = false; }

    titlebar.addEventListener('mousedown',  onStart);
    titlebar.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove',  onMove);
    document.addEventListener('touchmove',  onMove, { passive: false });
    document.addEventListener('mouseup',    onEnd);
    document.addEventListener('touchend',   onEnd);
  }

  /* ── open ─────────────────────────────────────────────────── */
  function open(id, title, icon, contentHTML, opts = {}) {
    if (windows[id]) {
      // Already open — restore if minimised
      if (windows[id].minimized) restore(id);
      focusWindow(id);
      return;
    }

    const win = document.createElement('div');
    win.className = 'window opening';
    win.dataset.winId = id;
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', title);

    const w = opts.width  || 520;
    const h = opts.height || 420;
    const maxW = window.innerWidth;
    const maxH = window.innerHeight - 28;
    // cascade offset
    const offset = Object.keys(windows).length * 24;
    const left = Math.min(60 + offset, maxW - w - 20);
    const top  = Math.min(40 + offset, maxH - h - 20);

    win.style.cssText = `
      left:${Math.max(0, left)}px;
      top:${Math.max(0, top)}px;
      width:${Math.min(w, maxW)}px;
      height:${Math.min(h, maxH)}px;
      z-index:${nextZ()};
    `;

    win.innerHTML = `
      <div class="win-titlebar" tabindex="-1">
        <span class="win-title-icon">${icon}</span>
        <span class="win-title-text">${title}</span>
        <div class="win-ctrl-btns">
          <button class="win-ctrl" data-action="minimize" aria-label="Minimizar" title="Minimizar">_</button>
          <button class="win-ctrl" data-action="maximize" aria-label="Maximizar" title="Maximizar">□</button>
          <button class="win-ctrl" data-action="close"    aria-label="Fechar"    title="Fechar" style="font-weight:bold;margin-left:2px;">✕</button>
        </div>
      </div>
      <div class="win-content">${contentHTML}</div>
      ${opts.statusText ? `<div class="win-statusbar"><span>${opts.statusText}</span></div>` : ''}
    `;

    document.getElementById('desktop').appendChild(win);

    windows[id] = {
      el: win,
      title,
      icon,
      minimized: false,
      maximized: false,
      prevRect: null
    };

    // Remove animation class after it finishes
    win.addEventListener('animationend', () => win.classList.remove('opening'), { once: true });

    // Focus on click
    win.addEventListener('mousedown',  () => focusWindow(id));
    win.addEventListener('touchstart', () => focusWindow(id), { passive: true });

    // Control buttons
    win.querySelectorAll('.win-ctrl').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'minimize') minimize(id);
        if (action === 'maximize') toggleMaximize(id);
        if (action === 'close')    close(id);
      });
    });

    // Drag
    makeDraggable(win, win.querySelector('.win-titlebar'));

    // Taskbar button
    Taskbar.addButton(id, icon, title);
    focusWindow(id);
  }

  /* ── minimize ─────────────────────────────────────────────── */
  function minimize(id) {
    const w = windows[id];
    if (!w) return;
    w.minimized = true;
    w.el.classList.add('minimized');
    Taskbar.setActive(null);
    // Focus another open window
    const others = Object.keys(windows).filter(k => k !== id && !windows[k].minimized);
    if (others.length) focusWindow(others[others.length - 1]);
  }

  /* ── restore ──────────────────────────────────────────────── */
  function restore(id) {
    const w = windows[id];
    if (!w) return;
    if (w.minimized) {
      w.minimized = false;
      w.el.classList.remove('minimized');
    }
    focusWindow(id);
  }

  /* ── toggle maximize ──────────────────────────────────────── */
  function toggleMaximize(id) {
    const w = windows[id];
    if (!w) return;
    if (w.maximized) {
      // Restore
      if (w.prevRect) {
        w.el.style.left   = w.prevRect.left   + 'px';
        w.el.style.top    = w.prevRect.top     + 'px';
        w.el.style.width  = w.prevRect.width   + 'px';
        w.el.style.height = w.prevRect.height  + 'px';
      }
      w.el.classList.remove('maximized');
      w.maximized = false;
      w.el.querySelector('[data-action="maximize"]').title = 'Maximizar';
      w.el.querySelector('[data-action="maximize"]').setAttribute('aria-label', 'Maximizar');
    } else {
      w.prevRect = {
        left:   parseInt(w.el.style.left),
        top:    parseInt(w.el.style.top),
        width:  parseInt(w.el.style.width),
        height: parseInt(w.el.style.height)
      };
      w.el.classList.add('maximized');
      w.maximized = true;
      w.el.querySelector('[data-action="maximize"]').title = 'Restaurar';
      w.el.querySelector('[data-action="maximize"]').setAttribute('aria-label', 'Restaurar');
    }
    focusWindow(id);
  }

  /* ── close ────────────────────────────────────────────────── */
  function close(id) {
    const w = windows[id];
    if (!w) return;
    w.el.remove();
    delete windows[id];
    Taskbar.removeButton(id);
    // Focus last remaining
    const others = Object.keys(windows).filter(k => !windows[k].minimized);
    if (others.length) focusWindow(others[others.length - 1]);
    else Taskbar.setActive(null);
  }

  /* ── taskbar click ────────────────────────────────────────── */
  function taskbarClick(id) {
    const w = windows[id];
    if (!w) return;
    if (w.minimized) {
      restore(id);
    } else if (w.el.classList.contains('focused')) {
      minimize(id);
    } else {
      restore(id);
    }
  }

  return { open, minimize, restore, toggleMaximize, close, taskbarClick, focusWindow };
})();

