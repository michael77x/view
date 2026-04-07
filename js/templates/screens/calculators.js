window.HiviAppTemplates.screens.calculators = `
  <section class="screen tool-detail-screen" id="screen-calculators">
    <div class="screen-head compact">
      <p class="eyebrow">Herramienta</p>
      <h2>Calculadoras de ingenieria</h2>
      <p class="muted">Estimaciones rapidas para soporte tecnico y validacion preliminar.</p>
    </div>

    <div class="calc-selector">
      <button class="calc-tab is-active" data-calc="tdh" type="button">TDH Bombas</button>
      <button class="calc-tab" data-calc="airLeak" type="button">Fugas de aire</button>
      <button class="calc-tab" data-calc="steam" type="button">Consumo de vapor</button>
    </div>

    <div class="calc-panel" id="calc-panel-tdh">
      <strong class="form-block-title">TDH — Altura dinamica total</strong>
      <p class="muted">Calcula la altura total que debe vencer una bomba.</p>
      <form class="stack-form" id="calc-form-tdh">
        <label>
          <span>Altura estatica de succion (m)</span>
          <input type="number" id="calc-tdh-hs" value="3" step="any">
        </label>
        <label>
          <span>Altura estatica de descarga (m)</span>
          <input type="number" id="calc-tdh-hd" value="15" step="any">
        </label>
        <label>
          <span>Perdidas por friccion (m)</span>
          <input type="number" id="calc-tdh-hf" value="2.5" step="any">
        </label>
        <label>
          <span>Presion requerida en descarga (m)</span>
          <input type="number" id="calc-tdh-pd" value="0" step="any">
        </label>
        <div class="calc-result" id="calc-result-tdh">
          <strong>TDH</strong>
          <span class="calc-result-value">20.5 m</span>
        </div>
      </form>
    </div>

    <div class="calc-panel is-hidden" id="calc-panel-airLeak">
      <strong class="form-block-title">Perdidas por fugas de aire comprimido</strong>
      <p class="muted">Estima el costo anual por fugas en tu sistema de aire comprimido.</p>
      <form class="stack-form" id="calc-form-airLeak">
        <label>
          <span>Diametro del orificio (mm)</span>
          <input type="number" id="calc-air-diameter" value="3" step="any">
        </label>
        <label>
          <span>Presion de linea (bar)</span>
          <input type="number" id="calc-air-pressure" value="7" step="any">
        </label>
        <label>
          <span>Horas de operacion al ano</span>
          <input type="number" id="calc-air-hours" value="8000" step="1">
        </label>
        <label>
          <span>Costo de energia (USD/kWh)</span>
          <input type="number" id="calc-air-cost" value="0.10" step="any">
        </label>
        <div class="calc-result" id="calc-result-airLeak">
          <strong>Perdida estimada</strong>
          <span class="calc-result-value">--</span>
        </div>
      </form>
    </div>

    <div class="calc-panel is-hidden" id="calc-panel-steam">
      <strong class="form-block-title">Consumo de vapor</strong>
      <p class="muted">Estima el consumo de vapor para calentamiento de fluidos.</p>
      <form class="stack-form" id="calc-form-steam">
        <label>
          <span>Caudal del fluido (kg/h)</span>
          <input type="number" id="calc-steam-flow" value="5000" step="any">
        </label>
        <label>
          <span>Cp del fluido (kJ/kg·°C)</span>
          <input type="number" id="calc-steam-cp" value="4.18" step="any">
        </label>
        <label>
          <span>Temperatura de entrada (°C)</span>
          <input type="number" id="calc-steam-tin" value="20" step="any">
        </label>
        <label>
          <span>Temperatura de salida (°C)</span>
          <input type="number" id="calc-steam-tout" value="80" step="any">
        </label>
        <label>
          <span>Entalpia del vapor (kJ/kg)</span>
          <input type="number" id="calc-steam-enthalpy" value="2200" step="any">
        </label>
        <div class="calc-result" id="calc-result-steam">
          <strong>Vapor requerido</strong>
          <span class="calc-result-value">--</span>
        </div>
      </form>
    </div>
  </section>
`;
