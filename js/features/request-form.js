(function () {
  const lines = window.HiviAppData.lines;
  const refs = window.HiviAppDOM;
  const state = window.HiviAppState;

  function renderRequest() {
    refs.requestTitle.textContent = `Solicitud para ${state.currentLine.title}`;

    refs.requestLine.innerHTML = lines
      .map(
        (line) => `<option value="${line.id}" ${line.id === state.currentLine.id ? "selected" : ""}>${line.title}</option>`,
      )
      .join("");

    refs.requestBrand.innerHTML = state.currentLine.brands
      .map((brand) => `<option value="${brand}">${brand}</option>`)
      .join("");
    refs.previewLine.textContent = state.currentLine.title;
    refs.previewBrand.textContent = state.currentLine.brands[0];
    refs.smartSummaryCopy.textContent = `Tu solicitud de ${state.currentLine.title.toLowerCase()} será revisada por el equipo correspondiente de ${state.currentLine.brands[0]}.`;

    refs.dynamicFields.innerHTML = state.currentLine.fields
      .map((field) => {
        if (field.type === "select") {
          return `
            <label>
              <span>${field.label}</span>
              <select>
                ${field.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
              </select>
            </label>
          `;
        }

        return `
          <label>
            <span>${field.label}</span>
            <input type="text" value="${field.value}">
          </label>
        `;
      })
      .join("");
  }

  window.HiviAppRequestForm = { renderRequest };
})();
