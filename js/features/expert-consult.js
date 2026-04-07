(function () {
  var LINE_LABELS = {
    heat: "Intercambiadores de calor",
    pumps: "Bombas centrifugas",
    valves: "Valvulas y seguridad",
    sealing: "Sellado y empaquetaduras",
    air: "Aire comprimido",
    other: "Otro",
  };

  function init() {
    var form = document.getElementById("expert-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var desc = document.getElementById("expert-description");
      if (!desc || !desc.value.trim()) {
        desc.focus();
        return;
      }

      var lineEl = document.getElementById("expert-line");
      var typeEl = document.getElementById("expert-type");
      var lineName = LINE_LABELS[lineEl.value] || lineEl.value;
      var typeName = typeEl.options[typeEl.selectedIndex].text;

      window.HiviAppRequests.addSubmittedRequest({
        type: "consulta",
        line: "Consulta al experto",
        brand: lineName,
        status: "Pendiente",
        detail: typeName + ": " + desc.value.trim().substring(0, 120),
        date: new Date().toISOString().split("T")[0],
      });
      window.HiviAppRequests.renderRequests();

      var doneClient = document.getElementById("done-client");
      var doneLine = document.getElementById("done-line");
      var doneBrand = document.getElementById("done-brand");
      if (doneLine) doneLine.textContent = "Consulta al experto";
      if (doneBrand) doneBrand.textContent = lineName;

      desc.value = "";
      window.HiviAppUI.setScreen("done");
    });
  }

  window.HiviAppExpertConsult = { init: init };
})();
