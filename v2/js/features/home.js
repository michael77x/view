(function () {
  const ui = window.HiviAppUI;

  const MONTH_ABBR = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

  function formatShortDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d)) return dateStr;
    return d.getDate() + " " + MONTH_ABBR[d.getMonth()];
  }

  const STATUS_CLASS = {
    "En revisión": "status-review",
    "Pendiente":   "status-pending",
    "Recibida":    "status-received",
    "Cerrada":     "status-closed",
  };

  const TYPE_LABEL = {
    "cotizacion": "Propuesta",
    "consulta":   "Consulta",
  };

  function renderActivityItem(req) {
    const typeLabel  = TYPE_LABEL[req.type]  || req.type;
    const statusCls  = STATUS_CLASS[req.status] || "status-received";
    const dateLabel  = formatShortDate(req.date);
    return `
      <div class="activity-item">
        <div class="activity-item-top">
          <span class="activity-type-pill">${typeLabel}</span>
          <span class="activity-date">${dateLabel}</span>
        </div>
        <strong class="activity-line">${req.line}</strong>
        <span class="activity-status ${statusCls}">${req.status}</span>
      </div>
    `;
  }

  function renderHome() {
    const summaryEl = document.getElementById("home-requests-summary");
    if (!summaryEl) return;

    const requests = window.HiviAppData.submittedRequests;
    if (!requests || requests.length === 0) {
      summaryEl.innerHTML = "";
      return;
    }

    const recent  = requests.slice(0, 2);
    const total   = requests.length;
    const pending = requests.filter(
      (r) => r.status !== "Cerrada" && r.status !== "Descartada"
    ).length;

    const pendingNote = pending > 0
      ? `${pending} pendiente${pending > 1 ? "s" : ""}`
      : "Todo al día";

    summaryEl.innerHTML = `
      <div class="home-activity-section">
        <div class="home-activity-header">
          <h3 class="section-heading">Tus consultas</h3>
          <button class="see-all-link" id="home-see-all" type="button">
            Ver todas (${total})
            <svg viewBox="0 0 24 24" focusable="false"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        <div class="home-activity-list">
          ${recent.map(renderActivityItem).join("")}
        </div>
        <p class="home-activity-note">${pendingNote}</p>
      </div>
    `;

    document.getElementById("home-see-all")
      .addEventListener("click", () => ui.setScreen("requests"));
  }

  window.HiviAppHome = { renderHome };
})();