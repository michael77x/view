window.HiviAppTemplates.screens.login = `
  <section class="screen auth-screen is-visible" id="screen-login">
    <div class="auth-shell">
      <div class="auth-hero-card">
        <p class="eyebrow">Bienvenido</p>
        <h2>Tu soporte industrial, mas cerca</h2>
        <p class="muted">Accede a tu cuenta para continuar.</p>

        <div class="auth-mode-switch">
          <button class="auth-mode-btn is-active" type="button" data-auth-mode="login">Iniciar sesion</button>
          <button class="auth-mode-btn" type="button" data-auth-mode="register">Registrate</button>
        </div>
      </div>

      <form class="stack-form auth-form is-visible" id="login-form">
        <label>
          <span>Correo</span>
          <input type="email" id="login-email" value="carlos.mendoza@adn.pe">
        </label>

        <label>
          <span>Contrasena</span>
          <input type="password" value="123456">
        </label>

        <button type="submit" class="primary-btn full-btn">Ingresar</button>
      </form>

      <form class="stack-form auth-form" id="register-form">
        <label>
          <span>Nombre</span>
          <input type="text" id="client-name" value="Carlos Mendoza">
        </label>

        <label>
          <span>Empresa</span>
          <input type="text" value="Agroindustrias del Norte">
        </label>

        <label>
          <span>Correo</span>
          <input type="email" value="carlos.mendoza@adn.pe">
        </label>

        <label>
          <span>Telefono</span>
          <input type="tel" value="+51 999 222 111">
        </label>

        <label class="toggle">
          <input type="checkbox" checked>
          <span>Recibir articulos del blog y webinars</span>
        </label>

        <label class="toggle">
          <input type="checkbox" checked>
          <span>Recibir alertas de estado de mis solicitudes</span>
        </label>

        <div class="note-box">
          <strong>Validacion</strong>
          <p>Codigo por correo o telefono antes del primer ingreso completo.</p>
        </div>

        <button type="submit" class="primary-btn">Crear cuenta</button>
      </form>
    </div>
  </section>
`;
