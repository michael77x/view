(function () {
  var CHECKLISTS = {
    centrifugal: {
      name: "Bomba centrifuga",
      phases: [
        {
          title: "Antes del arranque",
          items: [
            "Verificar alineacion motor-bomba",
            "Confirmar nivel de aceite en rodamientos",
            "Inspeccionar sello mecanico (sin dano visible)",
            "Verificar que la valvula de succion este abierta",
            "Confirmar que el filtro de succion esta limpio",
            "Verificar que la bomba esta cebada (llena de fluido)",
            "Revisar conexiones electricas y protecciones termicas",
            "Confirmar sentido de giro del motor (sin acoplar)",
          ],
        },
        {
          title: "Justo antes de arrancar",
          items: [
            "Cerrar parcialmente la valvula de descarga",
            "Verificar que no haya herramientas ni objetos sueltos",
            "Confirmar que el manometro de descarga esta operativo",
            "Asegurar que el personal esta a distancia segura",
          ],
        },
        {
          title: "Durante el arranque",
          items: [
            "Arrancar el motor y verificar sentido de giro",
            "Abrir gradualmente la valvula de descarga",
            "Verificar presion de descarga vs. diseno",
            "Verificar amperaje del motor (dentro del rango nominal)",
            "Escuchar ruidos anormales (cavitacion, rodamientos)",
          ],
        },
        {
          title: "Despues del arranque (primeros 30 min)",
          items: [
            "Monitorear temperatura de rodamientos",
            "Verificar ausencia de fugas por sello mecanico",
            "Confirmar caudal estable",
            "Verificar vibracion no excede limites",
            "Registrar valores de presion, caudal y amperaje",
          ],
        },
        {
          title: "Indicadores de alerta — detener operacion",
          items: [
            "Vibracion excesiva o creciente",
            "Temperatura de rodamientos por encima del limite",
            "Fuga severa por sello mecanico",
            "Ruido de cavitacion continuo",
            "Amperaje del motor fuera de rango",
          ],
        },
      ],
    },
    dosing: {
      name: "Bomba dosificadora",
      phases: [
        {
          title: "Antes del arranque",
          items: [
            "Verificar compatibilidad del fluido con materiales del diafragma/piston",
            "Inspeccionar valvulas de retencion (check valves)",
            "Confirmar que el tanque de quimicos tiene nivel suficiente",
            "Verificar que las conexiones de succion y descarga estan firmes",
            "Revisar calibracion del stroke (carrera)",
          ],
        },
        {
          title: "Durante el arranque",
          items: [
            "Arrancar a velocidad/stroke bajo",
            "Verificar que la bomba esta dosificando (flujo visible)",
            "Ajustar stroke gradualmente hasta el caudal requerido",
            "Verificar presion de descarga",
          ],
        },
        {
          title: "Despues del arranque",
          items: [
            "Confirmar dosificacion estable",
            "Verificar que no hay fugas de quimicos",
            "Registrar parametros de operacion",
          ],
        },
      ],
    },
    heatex: {
      name: "Intercambiador de calor",
      phases: [
        {
          title: "Antes del arranque",
          items: [
            "Verificar medida de apriete A segun placa del equipo",
            "Inspeccionar gaskets visibles por dano o desplazamiento",
            "Confirmar que ambas lineas (caliente y fria) estan conectadas",
            "Verificar que las valvulas de entrada y salida estan cerradas",
            "Confirmar que el sistema de control/instrumentacion esta operativo",
          ],
        },
        {
          title: "Durante el arranque",
          items: [
            "Abrir primero el lado frio, luego el lado caliente",
            "Aumentar caudal gradualmente",
            "Verificar ausencia de fugas externas",
            "Monitorear temperaturas de entrada y salida",
            "Verificar caida de presion en ambos lados",
          ],
        },
        {
          title: "Despues del arranque",
          items: [
            "Confirmar que las temperaturas de salida estan dentro del diseno",
            "Registrar valores de presion y temperatura para referencia",
            "Monitorear caida de presion como indicador de incrustacion",
          ],
        },
      ],
    },
    valve: {
      name: "Valvula de seguridad",
      phases: [
        {
          title: "Antes de poner en servicio",
          items: [
            "Verificar que el setpoint coincide con la presion de diseno del sistema",
            "Confirmar que la descarga esta libre de obstrucciones",
            "Inspeccionar visualmente la valvula (sin dano ni corrosion)",
            "Verificar certificado de calibracion vigente",
          ],
        },
        {
          title: "Puesta en servicio",
          items: [
            "Presurizar el sistema gradualmente",
            "Verificar que no hay fuga por el asiento a presion de operacion",
            "Confirmar que la presion de operacion es al menos 10% menor al setpoint",
          ],
        },
        {
          title: "Monitoreo continuo",
          items: [
            "Verificar periodicamente ausencia de fuga por descarga",
            "Registrar pruebas de apertura segun plan de mantenimiento",
            "Programar recalibracion segun normativa aplicable",
          ],
        },
      ],
    },
  };

  function render(equipKey) {
    var el = document.getElementById("checklist-content");
    if (!el) return;
    var equip = CHECKLISTS[equipKey];
    if (!equip) return;

    el.innerHTML = equip.phases.map(function (phase, pi) {
      return '<div class="checklist-phase">' +
        '<strong class="checklist-phase-title">' + phase.title + '</strong>' +
        '<div class="checklist-items">' +
        phase.items.map(function (item, ii) {
          var id = "chk-" + pi + "-" + ii;
          return '<label class="checklist-item" for="' + id + '">' +
            '<input type="checkbox" id="' + id + '">' +
            '<span>' + item + '</span>' +
            '</label>';
        }).join("") +
        '</div></div>';
    }).join("");
  }

  function init() {
    var selectEl = document.getElementById("checklist-equipment");
    if (selectEl) {
      selectEl.addEventListener("change", function () {
        render(selectEl.value);
      });
    }
    render("centrifugal");
  }

  window.HiviAppChecklist = { init: init };
})();
