(function () {
  var FORMULAS = {
    steam: [
      { name: "Calor sensible", formula: "Q = m × Cp × ΔT", desc: "Calor necesario para cambiar la temperatura de un fluido sin cambio de fase.", vars: "m = masa (kg), Cp = calor especifico (kJ/kg·°C), ΔT = diferencia de temperatura (°C)" },
      { name: "Consumo de vapor", formula: "Wv = Q / hfg", desc: "Masa de vapor necesaria para transferir una cantidad de calor.", vars: "Q = calor requerido (kJ), hfg = entalpia de vaporizacion (kJ/kg)" },
      { name: "Flash steam", formula: "% Flash = (hf1 - hf2) / hfg2 × 100", desc: "Porcentaje de condensado que se revaporiza al bajar la presion.", vars: "hf1 = entalpia del condensado a alta presion, hf2 = entalpia a baja presion, hfg2 = entalpia de vaporizacion a baja presion" },
      { name: "Velocidad del vapor", formula: "v = Qv / A", desc: "Velocidad del vapor en una tuberia.", vars: "Qv = caudal volumetrico (m3/s), A = area de seccion transversal (m2)" },
    ],
    air: [
      { name: "Caudal de fuga", formula: "Q = Cd × A × √(2 × ΔP / ρ)", desc: "Caudal de aire perdido por un orificio.", vars: "Cd = coeficiente de descarga (~0.65), A = area del orificio (m2), ΔP = diferencial de presion (Pa), ρ = densidad del aire (kg/m3)" },
      { name: "Potencia del compresor", formula: "P = (Q × ΔP) / (η × 1000)", desc: "Potencia electrica consumida por el compresor.", vars: "Q = caudal (m3/s), ΔP = presion (Pa), η = eficiencia del compresor" },
      { name: "Aire libre entregado (FAD)", formula: "FAD = Qd × (Pd / Pa) × (Ta / Td)", desc: "Caudal de aire convertido a condiciones de referencia.", vars: "Qd = caudal a presion de descarga, Pd/Pa = relacion de presiones, Ta/Td = relacion de temperaturas absolutas" },
      { name: "Caida de presion en tuberia", formula: "ΔP = f × (L/D) × (ρ × v²/2)", desc: "Perdida de presion por friccion en una tuberia.", vars: "f = factor de friccion, L = longitud (m), D = diametro (m), ρ = densidad (kg/m3), v = velocidad (m/s)" },
    ],
    fluids: [
      { name: "Ecuacion de Bernoulli", formula: "P1/ρg + v1²/2g + z1 = P2/ρg + v2²/2g + z2 + hf", desc: "Balance de energia entre dos puntos de un sistema.", vars: "P = presion, ρ = densidad, g = gravedad, v = velocidad, z = altura, hf = perdidas" },
      { name: "Numero de Reynolds", formula: "Re = ρ × v × D / μ", desc: "Determina si el flujo es laminar o turbulento.", vars: "ρ = densidad (kg/m3), v = velocidad (m/s), D = diametro (m), μ = viscosidad dinamica (Pa·s). Laminar < 2300, Turbulento > 4000" },
      { name: "Ecuacion de continuidad", formula: "A1 × v1 = A2 × v2", desc: "Conservacion de masa en flujo incompresible.", vars: "A = area de seccion (m2), v = velocidad (m/s)" },
      { name: "Caudal volumetrico", formula: "Q = A × v", desc: "Relacion entre caudal, area y velocidad.", vars: "Q = caudal (m3/s), A = area (m2), v = velocidad (m/s)" },
    ],
    pumps: [
      { name: "TDH", formula: "TDH = Hd + Hs + Hf + Hp", desc: "Altura dinamica total que debe vencer la bomba.", vars: "Hd = altura de descarga, Hs = altura de succion, Hf = perdidas por friccion, Hp = presion requerida (todo en metros)" },
      { name: "NPSHa", formula: "NPSHa = Pa/ρg + Hs - Hfs - Pvp/ρg", desc: "NPSH disponible en la instalacion.", vars: "Pa = presion atmosferica, Hs = altura de succion, Hfs = perdidas en succion, Pvp = presion de vapor" },
      { name: "Potencia hidraulica", formula: "Ph = ρ × g × Q × H / 1000", desc: "Potencia transferida al fluido.", vars: "ρ = densidad (kg/m3), g = 9.81 m/s2, Q = caudal (m3/s), H = altura (m). Resultado en kW" },
      { name: "Leyes de afinidad", formula: "Q2/Q1 = N2/N1\nH2/H1 = (N2/N1)²\nP2/P1 = (N2/N1)³", desc: "Relacion entre caudal, altura y potencia al variar velocidad.", vars: "Q = caudal, H = altura, P = potencia, N = velocidad de giro (RPM)" },
    ],
  };

  function renderTab(tab) {
    var contentEl = document.getElementById("formula-content");
    if (!contentEl) return;
    var list = FORMULAS[tab] || [];
    contentEl.innerHTML = list.map(function (f) {
      return '<div class="formula-card">' +
        '<strong>' + f.name + '</strong>' +
        '<div class="formula-expression">' + f.formula.replace(/\n/g, "<br>") + '</div>' +
        '<p>' + f.desc + '</p>' +
        '<span class="formula-vars">' + f.vars + '</span>' +
        '</div>';
    }).join("");
  }

  function init() {
    document.querySelectorAll("[data-formula-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll("[data-formula-tab]").forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
        });
        renderTab(tab.dataset.formulaTab);
      });
    });
    renderTab("steam");
  }

  window.HiviAppFormulas = { init: init };
})();
