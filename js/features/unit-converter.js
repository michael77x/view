(function () {
  var UNITS = {
    pressure: {
      label: "Presion",
      units: {
        bar: 1,
        psi: 14.5038,
        kPa: 100,
        atm: 0.986923,
        "kg/cm2": 1.01972,
        mmHg: 750.062,
      },
    },
    temperature: {
      label: "Temperatura",
      units: { "°C": null, "°F": null, K: null },
      convert: function (val, from, to) {
        var c;
        if (from === "°C") c = val;
        else if (from === "°F") c = (val - 32) * 5 / 9;
        else c = val - 273.15;
        if (to === "°C") return c;
        if (to === "°F") return c * 9 / 5 + 32;
        return c + 273.15;
      },
    },
    flow: {
      label: "Caudal",
      units: {
        "m3/h": 1,
        "L/min": 16.6667,
        "L/s": 0.277778,
        GPM: 4.40287,
        "ft3/min": 0.588578,
      },
    },
    length: {
      label: "Longitud",
      units: {
        m: 1,
        cm: 100,
        mm: 1000,
        in: 39.3701,
        ft: 3.28084,
        yd: 1.09361,
      },
    },
    power: {
      label: "Potencia",
      units: {
        kW: 1,
        HP: 1.34102,
        W: 1000,
        BTU_h: 3412.14,
        "kcal/h": 859.845,
      },
    },
    energy: {
      label: "Energia",
      units: {
        kJ: 1,
        kcal: 0.239006,
        BTU: 0.947817,
        Wh: 0.277778,
        kWh: 0.000277778,
      },
    },
  };

  function getCategory() {
    var el = document.getElementById("converter-category");
    return el ? el.value : "pressure";
  }

  function populateFrom() {
    var cat = getCategory();
    var fromEl = document.getElementById("converter-from");
    if (!fromEl) return;
    var unitNames = Object.keys(UNITS[cat].units);
    fromEl.innerHTML = unitNames.map(function (u) {
      return '<option value="' + u + '">' + u + "</option>";
    }).join("");
  }

  function calculate() {
    var cat = getCategory();
    var valEl = document.getElementById("converter-value");
    var fromEl = document.getElementById("converter-from");
    var resultsEl = document.getElementById("converter-results");
    if (!valEl || !fromEl || !resultsEl) return;

    var val = parseFloat(valEl.value) || 0;
    var from = fromEl.value;
    var spec = UNITS[cat];
    var unitNames = Object.keys(spec.units);

    var html = unitNames
      .filter(function (u) { return u !== from; })
      .map(function (u) {
        var result;
        if (spec.convert) {
          result = spec.convert(val, from, u);
        } else {
          var baseVal = val / spec.units[from];
          result = baseVal * spec.units[u];
        }
        var display = result % 1 === 0 ? result.toString() : result.toFixed(4);
        return '<div class="converter-result-item"><strong>' + display + "</strong><span>" + u + "</span></div>";
      })
      .join("");

    resultsEl.innerHTML = html;
  }

  function init() {
    populateFrom();
    calculate();

    var catEl = document.getElementById("converter-category");
    if (catEl) {
      catEl.addEventListener("change", function () {
        populateFrom();
        calculate();
      });
    }

    var valEl = document.getElementById("converter-value");
    var fromEl = document.getElementById("converter-from");
    if (valEl) valEl.addEventListener("input", calculate);
    if (fromEl) fromEl.addEventListener("change", calculate);
  }

  window.HiviAppUnitConverter = { init: init };
})();
