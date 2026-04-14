window.HiviAppTemplates.screens.login = `
  <section class="screen auth-screen is-visible" id="screen-login">
    <div class="auth-shell">

      <div class="auth-hero-card">
        <p class="eyebrow">Hivimar</p>
        <h2>Diagnostica, calcula y consulta desde un solo lugar</h2>
        <div class="auth-mode-switch">
          <button class="auth-mode-btn is-active" type="button" data-auth-mode="login">Ingresar</button>
          <button class="auth-mode-btn" type="button" data-auth-mode="register">Crear cuenta</button>
        </div>
      </div>

      <!-- LOGIN -->
      <form class="stack-form auth-form is-visible" id="login-form">
        <label>
          <span>Correo</span>
          <input type="email" id="login-email" value="carlos.mendoza@adn.pe" autocomplete="email">
        </label>
        <label>
          <span>Contraseña</span>
          <input type="password" value="123456" autocomplete="current-password">
        </label>
        <button type="submit" class="primary-btn full-btn">Ingresar</button>
      </form>

      <!-- REGISTER PASO 1 -->
      <form class="stack-form auth-form" id="register-form">
        <div class="reg-steps">
          <div class="reg-step is-active" aria-label="Paso 1 de 2"></div>
          <div class="reg-step" aria-label="Paso 2 de 2"></div>
        </div>

        <div class="reg-panel" id="reg-panel-1">
          <p class="reg-step-label">Paso 1 de 2 · Datos de contacto</p>
          <label>
            <span>Nombre completo</span>
            <input type="text" id="client-name" value="Carlos Mendoza" autocomplete="name">
          </label>
          <label>
            <span>Empresa</span>
            <input type="text" id="reg-company" value="Agroindustrias del Norte" autocomplete="organization">
          </label>
          <label class="label-primary">
            <span>Teléfono <em class="field-note">— se usará para validar tu cuenta</em></span>
            <input type="tel" id="reg-phone" value="+51 999 222 111" autocomplete="tel">
          </label>
          <label>
            <span>Correo</span>
            <input type="email" id="reg-email" value="carlos.mendoza@adn.pe" autocomplete="email">
          </label>
          <button type="button" class="primary-btn full-btn" id="reg-next-btn">Continuar</button>
        </div>

        <div class="reg-panel" id="reg-panel-2" hidden>
          <p class="reg-step-label">Paso 2 de 2 · Verificación y preferencias</p>
          <div class="verify-block">
            <label>
              <span>Código de verificación</span>
              <input type="text" id="reg-code" placeholder="••••••" maxlength="6" inputmode="numeric" autocomplete="one-time-code">
            </label>
            <p class="verify-hint">Te enviamos un código al número ingresado.</p>
          </div>
          <div class="prefs-block">
            <p class="prefs-title">Notificaciones</p>
            <label class="toggle">
              <input type="checkbox" id="reg-pref-blog" checked>
              <span>Artículos técnicos y novedades del blog</span>
            </label>
            <label class="toggle">
              <input type="checkbox" id="reg-pref-webinar" checked>
              <span>Invitaciones a webinars técnicos</span>
            </label>
          </div>
          <div class="share-block">
            <label>
              <span>Compartir app <em class="field-note">— opcional</em></span>
              <input type="tel" id="reg-share" placeholder="+51 999 000 000" autocomplete="off">
            </label>
            <p class="verify-hint">Ingresa un número para invitar a un colega.</p>
          </div>
          <div class="reg-step2-actions">
            <button type="button" class="ghost-btn" id="reg-back-btn">Volver</button>
            <button type="submit" class="primary-btn" id="reg-submit-btn">Finalizar registro</button>
          </div>
        </div>
      </form>

    </div>
  </section>
`;