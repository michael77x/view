(function () {
  const refs = window.HiviAppDOM;
  const state = window.HiviAppState;
  const lines = window.HiviAppData.lines;

  function renderLineSwitcher() {
    refs.lineSwitcher.innerHTML = lines
      .map(
        (line) =>
          `<button class="line-switch-chip ${line.id === state.currentLine.id ? "is-active" : ""}" data-line-id="${line.id}" type="button">${line.title}</button>`,
      )
      .join("");

    refs.lineSwitcher.querySelectorAll("[data-line-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = lines.find((l) => l.id === btn.dataset.lineId);
        if (!target) return;
        state.currentLine = target;
        renderLine();
        window.HiviAppRequestForm.renderRequest();
      });
    });
  }

  function renderLine() {
    renderLineSwitcher();
    refs.lineTitle.textContent = state.currentLine.title;
    refs.lineSummary.textContent = state.currentLine.summary;
    refs.lineBrands.innerHTML = state.currentLine.brands.map((brand) => `<span class="tag">${brand}</span>`).join("");
    refs.resourceGrid.innerHTML = state.currentLine.resources
      .slice(0, 4)
      .map(
        (item) => `
          <article class="resource-card">
            <strong>${item}</strong>
            <span>Consulta contenido técnico y accede a la solicitud desde esta línea.</span>
          </article>
        `,
      )
      .join("");
  }

  window.HiviAppLine = { renderLine };
})();
