(function () {
  const templates = window.HiviAppTemplates;

  if (!templates) {
    return;
  }

  const screenViewport = document.getElementById("screen-viewport");
  const bottomNav = document.getElementById("bottom-nav");
  const moreSheetRoot = document.getElementById("more-sheet-root");
  const screenOrder = ["login", "home", "line", "tools", "unitConverter", "calculators", "formulas", "troubleshooting", "checklist", "brochures", "expertConsult", "requests", "request", "done", "profile"];

  if (screenViewport) {
    screenViewport.innerHTML = screenOrder.map((key) => templates.screens[key] || "").join("");
  }

  if (bottomNav) {
    bottomNav.innerHTML = templates.navigation || "";
  }

  if (moreSheetRoot) {
    moreSheetRoot.innerHTML = templates.moreSheet || "";
  }
})();
