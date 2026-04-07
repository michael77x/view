(function () {
  const data = window.HiviAppData;
  const refs = window.HiviAppDOM;

  const STATUS_META = {
    "En revisión": { cls: "tag--review",   icon: "⏳" },
    "Cerrada":      { cls: "tag--done",     icon: "✓"  },
    "Pendiente":   { cls: "tag--pending",  icon: "◌"  },
    "Recibida":    { cls: "tag--review",   icon: "✓"  },
  };

  function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  }

  function addSubmittedRequest(item) {
    data.submittedRequests.unshift(item);
  }

  function renderStats(list) {
    const statsEl = document.getElementById("requests-stats");
    if (!statsEl) return;
    const total   = list.length;
    const review  = list.filter((r) => r.status === "En revisión").length;
    const done    = list.filter((r) => r.status === "Cerrada").length;
    const pending = list.filter((r) => r.status === "Pendiente").length;
    statsEl.innerHTML = `
      <div class="req-stat-chip">
        <span class="req-stat-num">${total}</span>
        <span class="req-stat-label">Total</span>
      </div>
      <div class="req-stat-chip req-stat-chip--review">
        <span class="req-stat-num">${review}</span>
        <span class="req-stat-label">En revisión</span>
      </div>
      <div class="req-stat-chip req-stat-chip--pending">
        <span class="req-stat-num">${pending}</span>
        <span class="req-stat-label">Pendiente</span>
      </div>
      <div class="req-stat-chip req-stat-chip--done">
        <span class="req-stat-num">${done}</span>
        <span class="req-stat-label">Cerrada</span>
      </div>
    `;
  }

  function renderFilters(list, activeFilter, onFilter) {
    const filtersEl = document.getElementById("requests-filters");
    if (!filtersEl) return;
    const statuses = ["Todas", ...new Set(list.map((r) => r.status))];
    filtersEl.innerHTML = statuses
      .map(
        (s) =>
          `<button class="status-tab${s === activeFilter ? " is-active" : ""}" data-filter="${s}">${s}</button>`,
      )
      .join("");
    filtersEl.querySelectorAll(".status-tab").forEach((btn) => {
      btn.addEventListener("click", () => onFilter(btn.dataset.filter));
    });
  }

  function renderList(list) {
    const histEl = document.getElementById("request-history");
    if (!histEl) return;
    if (list.length === 0) {
      histEl.innerHTML = `
        <div class="requests-empty">
          <span class="requests-empty-icon">📋</span>
          <strong>Sin solicitudes</strong>
          <p class="muted">No tienes solicitudes enviadas con ese filtro.</p>
        </div>
      `;
      return;
    }
    histEl.innerHTML = list
      .map((item) => {
        const meta  = STATUS_META[item.status] || { cls: "", icon: "•" };
        const dateStr = formatDate(item.date);
        const isConsult = item.type === "consulta";
        const typeBadge = isConsult
          ? `<span class="req-type-badge req-type-badge--consulta">Consulta</span>`
          : `<span class="req-type-badge req-type-badge--cotizacion">Cotizaci\u00f3n</span>`;
        return `
          <article class="tool-card request-card${isConsult ? ' request-card--consulta' : ''}">
            <div class="request-card-header">
              <strong>${item.line}</strong>
              <span class="req-date">${dateStr}</span>
            </div>
            <p class="request-card-detail">${item.detail}</p>
            <div class="tag-row">
              ${typeBadge}
              <span class="tag">${item.brand}</span>
              <span class="tag ${meta.cls}">${meta.icon} ${item.status}</span>
            </div>
          </article>
        `;
      })
      .join("");
  }

  let activeFilter = "Todas";
  let activeType = "Todas";

  function getFiltered() {
    let list = data.submittedRequests;
    if (activeType === "Cotizaci\u00f3n") list = list.filter((r) => r.type === "cotizacion");
    else if (activeType === "Consulta") list = list.filter((r) => r.type === "consulta");
    if (activeFilter !== "Todas") list = list.filter((r) => r.status === activeFilter);
    return list;
  }

  function renderTypeFilters() {
    const el = document.getElementById("requests-type-filters");
    if (!el) return;
    const types = ["Todas", "Cotizaci\u00f3n", "Consulta"];
    el.innerHTML = types
      .map(
        (t) =>
          `<button class="type-seg${t === activeType ? " is-active" : ""}" data-type-filter="${t}">${t}</button>`,
      )
      .join("");
    el.querySelectorAll("[data-type-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeType = btn.dataset.typeFilter;
        refresh();
      });
    });
  }

  function refresh() {
    const all = data.submittedRequests;
    renderStats(all);
    renderTypeFilters();
    renderFilters(all, activeFilter, (f) => { activeFilter = f; refresh(); });
    renderList(getFiltered());
  }

  function renderRequests() {
    refresh();
  }

  window.HiviAppRequests = {
    addSubmittedRequest,
    renderRequests,
  };
})();
