window.HiviAppTemplates.screens.home = `
  <section class="screen home-screen" id="screen-home">

    <div class="hero-card">
      <div class="hero-text">
        <p class="hero-eyebrow">Hola</p>
        <h2 id="home-name">Carlos</h2>
        <p>Diagnostica, calcula y consulta desde un solo lugar.</p>
      </div>
    </div>

    <div class="home-section">
      <h3 class="section-heading">¿Qué necesitas resolver hoy?</h3>
      <div class="tool-modules-grid">

        <button class="tool-module-card" data-screen-target="unit-converter" type="button">
          <span class="tool-module-icon tmi-blue">
            <svg viewBox="0 0 24 24" focusable="false">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </span>
          <span class="tool-module-name">Equivalencias</span>
        </button>

        <button class="tool-module-card" data-screen-target="formulas" type="button">
          <span class="tool-module-icon tmi-teal">
            <svg viewBox="0 0 24 24" focusable="false">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="14" y2="12"></line>
              <line x1="4" y1="18" x2="10" y2="18"></line>
              <path d="M16 15l3 3m0-3l-3 3"></path>
            </svg>
          </span>
          <span class="tool-module-name">Fórmulas y cálculos</span>
        </button>

        <button class="tool-module-card" data-screen-target="request" type="button">
          <span class="tool-module-icon tmi-amber">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
              <rect x="9" y="3" width="6" height="4" rx="1"></rect>
              <line x1="9" y1="12" x2="15" y2="12"></line>
              <line x1="9" y1="16" x2="13" y2="16"></line>
            </svg>
          </span>
          <span class="tool-module-name">Datos para seleccionar</span>
        </button>

        <button class="tool-module-card" data-screen-target="checklist" type="button">
          <span class="tool-module-icon tmi-green">
            <svg viewBox="0 0 24 24" focusable="false">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </span>
          <span class="tool-module-name">Checklist de arranque</span>
        </button>

        <button class="tool-module-card" data-screen-target="troubleshooting" type="button">
          <span class="tool-module-icon tmi-red">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="12"></line>
              <circle cx="11" cy="15" r="0.5" fill="currentColor" stroke="none"></circle>
            </svg>
          </span>
          <span class="tool-module-name">Diagnóstico de fallas</span>
        </button>

        <button class="tool-module-card" data-screen-target="tools" type="button">
          <span class="tool-module-icon tmi-slate">
            <svg viewBox="0 0 24 24" focusable="false">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </span>
          <span class="tool-module-name">Materiales de sellado</span>
        </button>

      </div>
    </div>

    <div id="home-requests-summary" class="home-requests-summary"></div>

    <div class="home-brands-strip">
      <button class="brands-strip-card" data-screen-target="line" type="button">
        <div class="brands-strip-text">
          <strong>Conozca nuestras marcas</strong>
          <span>Alfa Laval · Grundfos · Kunkle · Teadit</span>
        </div>
        <span class="brands-strip-arrow">
          <svg viewBox="0 0 24 24" focusable="false">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      </button>
    </div>

  </section>
`;