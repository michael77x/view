window.HiviAppTemplates.screens.unitConverter = `
  <section class="screen tool-detail-screen" id="screen-unit-converter">
    <div class="screen-head compact">
      <p class="eyebrow">Herramienta</p>
      <h2>Equivalencia de unidades</h2>
      <p class="muted">Convierte presion, temperatura, caudal y otras variables de uso frecuente.</p>
    </div>

    <div class="converter-panel">
      <label>
        <span>Categoria</span>
        <select id="converter-category">
          <option value="pressure">Presion</option>
          <option value="temperature">Temperatura</option>
          <option value="flow">Caudal</option>
          <option value="length">Longitud</option>
          <option value="power">Potencia</option>
          <option value="energy">Energia</option>
        </select>
      </label>

      <div class="converter-row">
        <label class="converter-input-group">
          <span>Valor</span>
          <input type="number" id="converter-value" value="1" step="any">
        </label>
        <label class="converter-input-group">
          <span>De</span>
          <select id="converter-from"></select>
        </label>
      </div>

      <div class="converter-result-block">
        <span class="converter-result-label">Resultado</span>
        <div id="converter-results" class="converter-results"></div>
      </div>
    </div>
  </section>
`;
