(function () {
  var DATA = {
    pumps: [
      { symptom: "La bomba no arranca", causes: ["Falla electrica o termica disparada", "Eje trabado por solidos o corrosion", "Acoplamiento desconectado"], actions: ["Verificar alimentacion electrica y protecciones", "Girar eje manualmente para detectar bloqueo", "Revisar acoplamiento y alineacion"], warning: "No forzar el arranque si el eje esta trabado." },
      { symptom: "Caudal bajo o nulo", causes: ["Valvula de succion cerrada", "Filtro obstruido", "Aire en la linea de succion", "Impulsor desgastado"], actions: ["Verificar apertura de valvulas", "Limpiar filtro de succion", "Purgar aire del sistema", "Inspeccionar impulsor"], warning: "Operar sin caudal puede daniar los sellos mecanicos." },
      { symptom: "Vibracion excesiva", causes: ["Desalineacion del eje", "Rodamientos desgastados", "Cavitacion", "Desbalance del impulsor"], actions: ["Verificar alineacion con reloj comparador", "Medir condicion de rodamientos", "Verificar NPSHa vs NPSHr", "Inspeccionar impulsor"], warning: "Detener si la vibracion supera limites de alarma." },
      { symptom: "Ruido anormal (cavitacion)", causes: ["NPSHa insuficiente", "Temperatura del fluido alta", "Altura de succion excesiva", "Filtro parcialmente obstruido"], actions: ["Reducir altura de succion", "Bajar temperatura del fluido", "Aumentar diametro de succion", "Verificar NPSHa disponible"], warning: "La cavitacion dana el impulsor de forma progresiva e irreversible." },
      { symptom: "Fuga por sello mecanico", causes: ["Desgaste del sello", "Operacion en seco", "Desalineacion", "Fluido incompatible con el sello"], actions: ["Reemplazar sello mecanico", "Verificar que haya fluido en succion antes de arrancar", "Verificar alineacion", "Consultar compatibilidad de materiales"], warning: "No operar con fuga activa." },
    ],
    heat: [
      { symptom: "Baja transferencia de calor", causes: ["Incrustacion en las placas", "Caudal inadecuado", "Gaskets deteriorados con bypass interno"], actions: ["Realizar limpieza CIP o manual", "Verificar caudales de operacion vs diseno", "Inspeccionar juntas"], warning: "No exceder presion maxima durante limpieza." },
      { symptom: "Caida de presion alta", causes: ["Obstruccion por solidos", "Incrustaciones", "Placas mal posicionadas"], actions: ["Limpiar placas", "Verificar orientacion de las placas", "Revisar filtro en la entrada"], warning: "Nunca operar con diferencial de presion excesivo." },
      { symptom: "Fuga externa", causes: ["Gaskets danados", "Torque de apriete insuficiente", "Placas deformadas"], actions: ["Verificar medida de apriete A", "Reemplazar gaskets danados", "Inspeccionar placas por deformacion"], warning: "Reajustar solo en frio y sin presion." },
    ],
    valves: [
      { symptom: "Valvula no abre o no cierra", causes: ["Resorte fatigado o roto", "Vastago trabado por corrosion", "Acumulacion de solidos en el asiento"], actions: ["Verificar resorte", "Limpiar vastago y asiento", "Reemplazar internos si es necesario"], warning: "No manipular valvulas de seguridad sin despresurizar." },
      { symptom: "Fuga por el asiento", causes: ["Dano en el asiento o disco", "Presion de operacion muy cercana al setpoint", "Acumulacion de particulas"], actions: ["Inspeccionar y rectificar superficies de sello", "Verificar setpoint vs presion de operacion", "Limpiar internamente"], warning: "Una valvula de seguridad con fuga es una emergencia." },
      { symptom: "Apertura prematura", causes: ["Setpoint mal calibrado", "Contrapresion alta", "Sobrepresion del sistema"], actions: ["Recalibrar en banco de pruebas", "Verificar contrapresion en la descarga", "Revisar fuentes de sobrepresion"], warning: "No modificar el setpoint en campo sin autorizacion." },
    ],
    air: [
      { symptom: "Presion baja en el sistema", causes: ["Fugas en tuberias o conexiones", "Filtro del compresor saturado", "Demanda superior a capacidad"], actions: ["Realizar auditoria de fugas con ultrasonido", "Reemplazar filtros", "Evaluar capacidad del compresor vs demanda"], warning: "Fugas representan perdidas energeticas significativas." },
      { symptom: "Humedad en la linea", causes: ["Secador no funciona correctamente", "Purga de condensado bloqueada", "Temperatura ambiente alta"], actions: ["Verificar operacion del secador", "Limpiar trampas de condensado", "Acondicionar temperatura de ingreso"], warning: "La humedad dana instrumentos y actuadores neumaticos." },
      { symptom: "Alta temperatura del compresor", causes: ["Refrigeracion insuficiente", "Aceite bajo o degradado", "Filtro de aceite obstruido"], actions: ["Verificar ventilador y radiador", "Cambiar aceite y filtros", "Limpiar radiador de aceite"], warning: "Detener si la temperatura supera el limite del fabricante." },
    ],
  };

  var activeCategory = "pumps";
  var searchTerm = "";

  function getFiltered() {
    var list = DATA[activeCategory] || [];
    if (!searchTerm) return list;
    var lower = searchTerm.toLowerCase();
    return list.filter(function (item) {
      return item.symptom.toLowerCase().indexOf(lower) !== -1 ||
        item.causes.join(" ").toLowerCase().indexOf(lower) !== -1 ||
        item.actions.join(" ").toLowerCase().indexOf(lower) !== -1;
    });
  }

  function render() {
    var el = document.getElementById("ts-results");
    if (!el) return;
    var items = getFiltered();

    if (items.length === 0) {
      el.innerHTML = '<div class="requests-empty"><span class="requests-empty-icon">🔍</span><strong>Sin resultados</strong><p class="muted">No se encontraron coincidencias para esta busqueda.</p></div>';
      return;
    }

    el.innerHTML = items.map(function (item) {
      return '<div class="ts-card">' +
        '<strong class="ts-symptom">' + item.symptom + '</strong>' +
        '<div class="ts-section"><span class="ts-label">Causas probables</span><ul>' +
        item.causes.map(function (c) { return "<li>" + c + "</li>"; }).join("") +
        '</ul></div>' +
        '<div class="ts-section"><span class="ts-label">Acciones recomendadas</span><ul>' +
        item.actions.map(function (a) { return "<li>" + a + "</li>"; }).join("") +
        '</ul></div>' +
        '<div class="ts-warning"><strong>⚠ Precaucion:</strong> ' + item.warning + '</div>' +
        '</div>';
    }).join("");
  }

  function init() {
    document.querySelectorAll("[data-ts-cat]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        activeCategory = tab.dataset.tsCat;
        document.querySelectorAll("[data-ts-cat]").forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
        });
        render();
      });
    });

    var searchEl = document.getElementById("ts-search");
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        searchTerm = searchEl.value.trim();
        render();
      });
    }

    render();
  }

  window.HiviAppTroubleshooting = { init: init };
})();
