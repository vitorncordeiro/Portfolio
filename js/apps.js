/* ===================================================================
   Vitows98 — App Content Builders
   =================================================================== */
const Apps = (() => {

  /* ── helpers ─────────────────────────────────────────────── */
  function tagList(tags) {
    return `<div class="tag-list">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
  }

  function asciiBox(placeholder, label) {
    return `
      <div class="ascii-container">
        <div class="ascii-placeholder">[ ${label} ]<br><small style="font-size: 11px;color:#444;">ASCII art a ser adicionado</small></div>
      </div>
    `;
  }

  function videoBox(videoUrl, label) {
    if (videoUrl) {
      return `
        <div class="video-placeholder" style="padding:0;">
          <video controls preload="metadata" style="width:100%;display:block;">
            <source src="${videoUrl}">
            Seu navegador não suporta vídeo.
          </video>
        </div>
      `;
    }
    return `
      <div class="video-placeholder">
        <div class="vp-icon">▶</div>
        <div>[ ${label} ]</div>
        <div style="font-size: 12px;color:#444;">Vídeo de demonstração a ser adicionado<br>
          <code style="font-size: 11px;">videoUrl: "caminho/para/video.mp4"</code>
        </div>
      </div>
    `;
  }

  function screenshotBox(imageUrl, label) {
    if (imageUrl) {
      return `
        <div class="screenshot-placeholder" style="background:#000;padding:0;">
          <img src="${imageUrl}" alt="${label}">
        </div>
      `;
    }
    return `
      <div class="screenshot-placeholder">
        <div><img class="placeholder-icon" src="./assets/icons/Display.ico"></div>
        <div>[ ${label} ]</div>
        <div style="font-size: 12px;color:#444;">Screenshot a ser adicionado<br>
          <code style="font-size: 11px;">screenshotUrl: "assets/screenshots/jitor.png"</code>
        </div>
      </div>
    `;
  }

  function githubLink(url, label = 'Ver código') {
    if (url) return `<a href="${url}" target="_blank" rel="noopener" class="link-btn">${label}</a>`;
    return `<span class="link-btn disabled" title="Link a ser adicionado">${label} [a ser configurado]</span>`;
  }

  function demoLink(url) {
    if (url) return `<a href="${url}" target="_blank" rel="noopener" class="link-btn">Ver demonstração</a>`;
    return '';
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  STERNA                                                     */
  /* ─────────────────────────────────────────────────────────── */
  function buildSterna() {
    const p = DATA.projects.find(x => x.id === 'sterna');
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/Earth (fixed).ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Sterna</div>
          <div style="font-size: 13px;opacity:.85;">Sistema de consulta e recomendação de domínios</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Problema</h3>
        <p>${p.problem}</p>
      </div>

      <div class="content-section">
        <h3>Solução</h3>
        <p>${p.solution}</p>
      </div>

      <div class="content-section">
        <img src="./assets/screenshots/sterna-diagram.png" alt="Screenshot do Sterna" style="width:100%;border:1px solid var(--border-dark);margin-top:4px;">
      </div>

      <div class="content-section">
        <h3>Funcionalidades</h3>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>

      <div class="content-section">
        <h3>Tecnologias</h3>
        ${tagList(p.stack)}
      </div>

      <div class="content-section">
        <h3>Links</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${githubLink(p.github)}
          ${demoLink(p.demoUrl)}
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  DRAGONS INQUIRY                                            */
  /* ─────────────────────────────────────────────────────────── */
  function buildDragons() {
    const p = DATA.projects.find(x => x.id === 'dragons');
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/Minesweeper.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Dragons Inquiry</div>
          <div style="font-size: 13px;opacity:.85;">Jogo de aventura em CLI — Java puro</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Sobre o Projeto</h3>
        <p>${p.description}</p>
      </div>

      <div class="content-section">
        <h3>Destaque</h3>
        <div style="background:#ffffcc;border:1px solid #cccc00;padding:8px;font-size: 13px;margin-top:4px;">
          <strong>${p.highlight}</strong>
        </div>
      </div>

      <div class="content-section">
        <h3>Gameplay</h3>
        <video autoplay loop controls width="800">
          <source 
           src="./assets/videos/dragonsinquiry.webm"
           type="video/webm"
          Seu navegador não suporta vídeo WebM.
        </video>
      </div>

      <div class="content-section">
        <h3>Funcionalidades</h3>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>

      <div class="content-section">
        <h3>Tecnologias / Conceitos</h3>
        ${tagList(p.stack)}
      </div>

      <div class="content-section">
        <h3>Links</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${githubLink(p.github)}
          ${demoLink(p.demoUrl)}
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  PIDGEYMAIL                                                 */
  /* ─────────────────────────────────────────────────────────── */
  function buildPidgeyMail() {
    const p = DATA.projects.find(x => x.id === 'pidgeymail');
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/Internet Properties.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">PidgeyMail</div>
          <div style="font-size: 13px;opacity:.85;">Arquitetura distribuída de microsserviços</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Problema</h3>
        <p>${p.problem}</p>
      </div>

      <div class="content-section">
        <h3>Solução</h3>
        <p>${p.solution}</p>
      </div>

      <div class="content-section">
        <h3>Arquitetura</h3>
        <div class="arch-diagram">
          <img src="./assets/screenshots/pidgeymail-diagram.png" alt="Diagrama de arquitetura do PidgeyMail" style="width:100%;border:1px solid var(--border-dark);margin-top:4px;">
        </div>
      </div>

      <div class="content-section">
        <h3>Microsserviços</h3>
        ${p.services.map(s => `
          <div style="border-left:3px solid var(--navy);padding:4px 8px;margin-bottom:6px;">
            <strong style="font-size: 13px;">${s.name}</strong>
            <div style="font-size: 13px;margin-top:2px;">${s.desc}</div>
          </div>
        `).join('')}
      </div>

      

      <div class="content-section">
        <h3>Tecnologias</h3>
        ${tagList(p.stack)}
      </div>

      <div class="content-section">
        <h3>Links</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${githubLink(p.github)}
          ${demoLink(p.demoUrl)}
        </div>
      </div>
    `;
  }


  function buildJavaGif(){
    return `
    <div class="tenor-gif-embed" data-postid="2655662629958065522" data-share-method="host" data-aspect-ratio="1.5" data-width="100%"><img src="https://media1.tenor.com/m/JNrPF3XuHXIAAAAd/java-duke.gif"></div>`
  }
  /* ─────────────────────────────────────────────────────────── */
  /*  ALADIN                                                     */
  /* ─────────────────────────────────────────────────────────── */
  function buildAladin() {
    const p = DATA.projects.find(x => x.id === 'aladin');
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/Phone.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Aladin</div>
          <div style="font-size: 13px;opacity:.85;">ESP32 + LLM + Automação por voz</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Conceito</h3>
        <p>${p.description}</p>
      </div>

      <div class="content-section">
        <h3>Demonstração</h3>
        <video autoplay loop controls width="800">
          <source 
           src="./assets/videos/aladin.mp4"
           type="video/mp4"
          Seu navegador não suporta vídeo WebM.
        </video>
      </div>

     

      <div class="content-section">
        <h3>Tecnologias</h3>
        ${tagList(p.stack)}
      </div>

      <div class="content-section">
        <h3>Links</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${githubLink(p.github)}
          ${demoLink(p.demoUrl)}
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  JITOR                                                      */
  /* ─────────────────────────────────────────────────────────── */
  function buildJitor() {
    const p = DATA.projects.find(x => x.id === 'jitor');
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/Manage your Server.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Jitor — Java HTTP Server</div>
          <div style="font-size: 13px;opacity:.85;">Servidor HTTP do zero em Java puro</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Objetivo</h3>
        <p>${p.description}</p>
      </div>

      <div class="content-section">
        <h3>Screenshot</h3>
        <img src="./assets/screenshots/img.png" alt="Screenshot do Jitor" style="width:100%;border:1px solid var(--border-dark);margin-top:4px;">
      </div>

      <div class="content-section">
        <h3>Componentes Implementados</h3>
        <div class="arch-diagram">${p.components.map(c => `▸ ${c}`).join('\n')}</div>
      </div>

      <div class="content-section">
        <h3>Tecnologias / Conceitos</h3>
        ${tagList(p.stack)}
      </div>

      <div class="content-section">
        <h3>Links</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${githubLink(p.github)}
          ${demoLink(p.demoUrl)}
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  SOBRE MIM                                                  */
  /* ─────────────────────────────────────────────────────────── */
  function buildAbout() {
    const d = DATA;
    const exp = d.experience[0];
    const edu = d.education[0];

    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/User 1.ico" style="width: 40px"></div>
        <div class="profile-info">
          <h2>${d.name}</h2>
          <p>${d.role}</p>
        </div>
      </div>

      <div class="content-section">
        <h3>Resumo</h3>
        ${d.bio.map(b => `<p style="margin-bottom:4px;">${b}</p>`).join('')}
      </div>

      <div class="content-section">
        <h3>Experiência</h3>
        <div style="border-left:3px solid var(--navy);padding:4px 8px;">
          <div style="font-weight:bold;font-size: 14px;">${exp.role}</div>
          <div style="font-size: 13px;color:var(--gray-dark);">${exp.company} · ${exp.period}</div>
          <ul style="margin-top:6px;">${exp.highlights.slice(0, 4).map(h => `<li style="font-size: 13px;margin-bottom:2px;">${h}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="content-section">
        <h3>Formação</h3>
        <div style="border-left:3px solid var(--navy);padding:4px 8px;">
          <div style="font-weight:bold;font-size: 14px;">${edu.degree}</div>
          <div style="font-size: 13px;color:var(--gray-dark);">${edu.institution} · ${edu.period}</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Habilidades</h3>
        <p style="font-size: 12px;color:var(--gray-dark);margin-bottom:4px;">Back-end</p>
        ${tagList(d.skills.backend.slice(0, 6))}
        <p style="font-size: 12px;color:var(--gray-dark);margin:6px 0 4px;">Banco de Dados</p>
        ${tagList(d.skills.database)}
        <p style="font-size: 12px;color:var(--gray-dark);margin:6px 0 4px;">Infra / DevOps</p>
        ${tagList(d.skills.infra.slice(0, 5))}
      </div>

      <div class="content-section">
        <h3>Contato</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
          <a href="mailto:${d.email}" class="link-btn">E-mail: ${d.email}</a>
          <a href="${d.github}" target="_blank" rel="noopener" class="link-btn">GitHub</a>
          <a href="${d.linkedin}" target="_blank" rel="noopener" class="link-btn">LinkedIn</a>
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  CURRÍCULO                                                  */
  /* ─────────────────────────────────────────────────────────── */
  function buildResume() {
    const d = DATA;
    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/List File.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Currículo — ${d.name}</div>
          <div style="font-size: 13px;opacity:.85;">${d.role}</div>
        </div>
      </div>

      <div class="content-section">
        <h3>Resumo</h3>
        <p style="font-size: 13px;">Desenvolvedor Back-end Java com experiência em Spring Boot, microsserviços, RabbitMQ, Redis e Docker. Atualmente estagiário na Polícia Científica do Paraná. Graduando em Engenharia de Software (PUC-PR).</p>
      </div>


      <div style="text-align:center;margin-top:20px;padding:16px;border-top:1px solid var(--border-dark);">
        <p style="font-size: 13px;margin-bottom:12px;">O currículo completo está disponível em PDF:</p>
        <a href="${d.resumeUrl}" target="_blank" rel="noopener" class="win-btn" style="text-decoration:none;display:inline-block;padding:4px 16px;">
          Baixar Currículo (PDF)
        </a>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  CONTATO                                                    */
  /* ─────────────────────────────────────────────────────────── */
  function buildContact() {
    const d = DATA;
    const contacts = [
      { icon: '<img src="./assets/icons/Internet Properties.ico">', label: 'E-mail',   value: d.email,    href: `mailto:${d.email}` },
      { icon: '<img src="./assets/icons/Laptop.ico">', label: 'GitHub',   value: 'vitorncordeiro', href: d.github },
      { icon: '<img src="./assets/icons/User Accounts.ico">', label: 'LinkedIn', value: 'vitor-natal-cordeiro', href: d.linkedin },
      { icon: '<img src="./assets/icons/Earth (fixed).ico">', label: 'Local',    value: d.location,  href: null },
    ];

    return `
      <div class="profile-header" style="margin:-8px -8px 12px -8px;">
        <div class="profile-avatar"><img src="./assets/icons/User Support.ico" style="width: 40px"></div>
        <div>
          <div style="font-size: 18px;font-weight:bold;">Contato</div>
          <div style="font-size: 13px;opacity:.85;">${d.name}</div>
        </div>
      </div>
      <div>
        ${contacts.map(c => `
          <div class="contact-item">
            <div class="ci-icon">${c.icon}</div>
            <div style="flex:1;">
              <div style="font-size: 12px;color:var(--gray-dark);">${c.label}</div>
              ${c.href
                ? `<a href="${c.href}" target="${c.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener">${c.value}</a>`
                : `<span>${c.value}</span>`
              }
            </div>
          </div>
        `).join('')}
      </div>
      <div style="padding:16px 8px;font-size: 13px;color:var(--gray-dark);text-align:center;">
        Fique à vontade para entrar em contato!
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  MEU COMPUTADOR                                             */
  /* ─────────────────────────────────────────────────────────── */
  function buildMyComputer() {
    return `
      <div class="arch-diagram" style="margin-bottom:8px;">
VITOWS98 — Sistema Operacional de Portfólio
Versão 98.2026
(C) 1998-2026 Vitor Natal Cordeiro

Processador:  Java 21 / Spring Boot Engine
Memória RAM:  Redis Cache Layer
Armazenamento: PostgreSQL + MongoDB
Rede:         RabbitMQ Message Bus
GPU:          React.js Rendering Engine
Sistema:      Vitows98 Build 082026</div>

      <div class="content-section">
        <h3>Drives</h3>
        <div style="display:flex;flex-direction:column;gap:4px;">
          ${DATA.projects.map(p => `
            <div class="contact-item" style="cursor:pointer;" onclick="Desktop.openApp('${p.id}')">
              <div class="ci-icon">${p.icon}</div>
              <div><div style="font-size: 12px;color:var(--gray-dark);">Programa</div><strong>${p.exe}</strong></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────────────────── */
  /*  LIXEIRA                                                    */
  /* ─────────────────────────────────────────────────────────── */
  function buildTrash() {
    return `
      <div style="text-align:center;padding:24px 16px;">
        <div style="margin-bottom:12px;"><img src="./assets/icons/Folder Closed.ico" style="width: 48px; height: 48px; display: block; margin: 0 auto;"></div>
        <p style="font-size: 16px;font-weight:bold;margin-bottom:8px;">A Lixeira está vazia.</p>
        <p style="font-size: 13px;color:var(--gray-dark);margin-bottom:16px;">
          Nenhum arquivo foi excluído... ainda.
        </p>
        <div class="arch-diagram" style="font-size: 12px;text-align:left;max-width:300px;margin:0 auto;">
> git log --oneline | grep "fix"
a3f1b2c fix: NullPointerException in prod
7d8e9f0 fix: N+1 query causing 30s load time
2c4a6b8 fix: forgot to close the connection
9f1e3d5 fix: typo in variable name (oops)
...
        </div>
        <p style="font-size: 12px;color:var(--gray-dark);margin-top:12px;font-style:italic;">
          Os bugs foram corrigidos. Os commits, apagados. A Lixeira, esvaziada.
        </p>
      </div>
    `;
  }

  return {
    buildSterna,
    buildDragons,
    buildPidgeyMail,
    buildAladin,
    buildJitor,
    buildJavaGif,
    buildAbout,
    buildResume,
    buildContact,
    buildMyComputer,
    buildTrash
  };
})();

