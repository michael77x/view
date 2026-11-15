// Rutina de Michael. La lee index.html.
// Cada ejercicio trae dos posturas (ini / fin) para la figura animada.
// Puntos: h cabeza, n cuello/hombros, p cadera, kL/kR rodillas, fL/fR pies, eL/eR codos, hL/hR manos.
// Lienzo 200 x 160, suelo en y = 150. L = lado lejano (se dibuja más claro).
// eje = hacia dónde apunta la barra de la mancuerna: "Z" (de lado a lado, por defecto), "X" (adelante-atrás) o "Y" (vertical).
// Con eso la mancuerna se ve igual en las 3 vistas (de punta, se ve el disco).
window.RUTINA = {
  inicio: "2026-11-16", // lunes de la semana 1

  // 6 entrenamientos x ~40 min, solo mancuernas, sin caminata, al fallo (decisiones de Michael, 15/11/2026).
  // No dependen del día de la semana: se hace el que sigue en el orden de `dias`.
  // Descansos cortos para que el pulso se mantenga en 110–130 lpm y las pesas trabajen también el corazón.
  fases: [
    { n: 1, semanas: [1, 4], nombre: "Fase 1 · Base", series: 3, descanso: 45,
      nota: "Al fallo, respirando: la serie termina cuando la repetición ya no sale limpia o sientes que vas a aguantar el aire." },
    { n: 2, semanas: [5, 8], nombre: "Fase 2 · Más volumen", series: 4, descanso: 45,
      nota: "Al fallo, respirando. Si pasas el máximo de repeticiones, sube a la siguiente mancuerna." },
    { n: 3, semanas: [9, 99], nombre: "Fase 3 · Fuerza", series: 4, descanso: 60,
      nota: "Entra la rueda abdominal (de rodillas). Al fallo, sin aguantar la respiración." },
  ],

  // Descansos en segundos (el de entre series sale de la fase).
  descansoEscalera: 15, // solo lo que tardas en cambiar de mancuerna
  entreEjercicios: 60,

  // Escalera de Michael: así entrena él los músculos pequeños (tríceps, bíceps, hombros).
  // [peso en kg, repeticiones]. Descanso solo para cambiar de mancuerna. Un ejercicio puede tener sus propios
  // `escalones` (lo que Michael logra en ese ejercicio).
  // En los demás ejercicios: kg = la mancuerna que usa en todas las series. Claude la ajusta con lo que Michael cuenta
  // después de entrenar (15/11/2026: press en el suelo → 10 kg, press de hombros → 7,5 kg).
  escalones: [[3, 40], [5, 30], [7.5, 20], [10, 10]],

  // Lo que Michael tiene en casa (15/11/2026). Cada ejercicio muestra lo que usa.
  equipo: [
    { id: "mancuernas", icono: "🏋️", nombre: "Mancuernas en pareja", detalle: "3 kg, 5 kg, 7,5 kg y 10 kg (2 de cada una)" },
    { id: "banco", icono: "🪑", nombre: "Banco plástico", detalle: "Para sentarse o apoyarse. Nunca para subirse." },
    { id: "alfombra", icono: "🟦", nombre: "Alfombra", detalle: "Para todo lo que se hace en el suelo." },
    { id: "cinturon", icono: "🟨", nombre: "Cinturón de levantamiento", detalle: "Firme pero respirando, solo donde sale marcado." },
    { id: "rueda", icono: "🛞", nombre: "Rueda abdominal", detalle: "De rodillas y en recorrido corto, desde la semana 9." },
    { id: "miband", icono: "⌚", nombre: "Mi Band 7", detalle: "Solo para entrenar (no se usa todo el día). Se inicia al empezar el calentamiento y se detiene al terminar el estiramiento." },
  ],

  // Ejercicios marcados con cinturon: true (carga sobre la espalda baja).
  cinturon: "Ajústalo firme pero que te deje respirar. Toma aire arriba y suéltalo al subir: no lo aguantes toda la repetición. En el resto de ejercicios, sin cinturón.",

  // Antes de cada entrenamiento, unos 5 minutos, en este orden.
  calentamiento: ["circulos_brazos", "flexiones_pared", "puente_activa", "sentadilla_aire"],
  // Calentamiento sin pesas, sin caminar ni marchar (Michael, 15/11/2026).

  // Los que Michael hace al final de cada entrenamiento (los pasó el 15/11/2026), en su orden.
  estiramientos: ["nino", "cobra", "paloma", "puente_estira", "rodillas_pecho", "torsion"],

  dias: {
    E1: { nombre: "Empuje 1", corto: "Empuje", musculos: "Pecho, hombros y tríceps",
      ejercicios: ["press_suelo", "press_hombro", "elevacion_lateral", "extension_triceps", "dead_bug"] },
    T1: { nombre: "Tirón 1", corto: "Tirón", musculos: "Espalda y bíceps",
      ejercicios: ["remo", "aperturas_invertidas", "pullover", "curl", "bird_dog"] },
    P1: { nombre: "Piernas 1", corto: "Piernas", musculos: "Piernas, glúteos y núcleo",
      ejercicios: ["sentadilla_banco", "peso_muerto_rumano", "zancada", "elevacion_talones", "plancha"] },
    E2: { nombre: "Empuje 2", corto: "Empuje", musculos: "Pecho, hombros y tríceps",
      ejercicios: ["aperturas_suelo", "press_suelo", "elevacion_lateral", "patada_triceps", "plancha"] },
    T2: { nombre: "Tirón 2", corto: "Tirón", musculos: "Espalda y bíceps",
      ejercicios: ["remo_pecho_banco", "pullover", "aperturas_invertidas", "curl_martillo", "bird_dog", "rueda"] },
    P2: { nombre: "Piernas 2", corto: "Piernas", musculos: "Piernas, glúteos y núcleo",
      ejercicios: ["bulgara", "peso_muerto_rumano", "puente", "granjero", "dead_bug"] },
  },

  ejercicios: {
    sentadilla_banco: {
      cinturon: true, nombre: "Sentadilla al banco", musculos: "Piernas y glúteos", reps: "15–20", peso: "10 kg al pecho (empieza con 7,5 kg)", kg: 7.5,
      pasos: ["Párate delante del banco, pies al ancho de hombros.", "Lleva la cadera atrás hasta tocar el banco, sin dejarte caer.", "Empuja el suelo y sube."],
      respira: "Inhala al bajar, exhala al subir.", cuidado: "Pecho arriba, espalda recta. Las rodillas siguen la dirección de los pies.",
      mancuerna: "1, con las dos manos al pecho", juntas: true,
      eje: "Y", // mancuerna vertical, sujetada por un disco
      props: { banco: [58, 30], mancuernas: "R" },
      ini: { h: [104, 28], n: [100, 42], p: [94, 90], kL: [98, 120], fL: [100, 150], kR: [100, 120], fR: [102, 150], eL: [106, 64], hL: [110, 50], eR: [106, 64], hR: [110, 50] },
      fin: { h: [100, 54], n: [95, 66], p: [80, 112], kL: [107, 110], fL: [102, 150], kR: [109, 110], fR: [104, 150], eL: [102, 88], hL: [108, 74], eR: [102, 88], hR: [108, 74] },
    },
    remo: {
      nombre: "Remo a una mano", musculos: "Espalda y bíceps", reps: "15–20 por lado", peso: "10 kg", kg: 10,
      pasos: ["Apoya una mano en el banco y da un paso atrás.", "Espalda plana, casi paralela al suelo.", "Sube la mancuerna hacia la cadera llevando el codo atrás."],
      respira: "Exhala al subir, inhala al bajar.", cuidado: "No gires el tronco. La mano en el banco quita carga a la lumbar.",
      mancuerna: "1: un lado y luego el otro",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { banco: [112, 34], mancuernas: "R" },
      ini: { h: [127, 72], n: [116, 80], p: [72, 94], kL: [84, 122], fL: [86, 150], kR: [62, 122], fR: [54, 150], eL: [120, 97], hL: [122, 114], eR: [114, 104], hR: [114, 126] },
      fin: { h: [127, 72], n: [116, 80], p: [72, 94], kL: [84, 122], fL: [86, 150], kR: [62, 122], fR: [54, 150], eL: [120, 97], hL: [122, 114], eR: [96, 72], hR: [104, 94] },
    },
    press_suelo: {
      nombre: "Press de pecho en el suelo", musculos: "Pecho, hombros y tríceps", reps: "15–20", peso: "7,5 kg → 10 kg", kg: 10,
      pasos: ["Acostado en la alfombra, rodillas dobladas.", "Codos apoyados en el suelo a 45° del cuerpo.", "Empuja las mancuernas hacia arriba y baja hasta que el brazo toque el suelo."],
      respira: "Exhala al empujar.", cuidado: "Reemplaza la banca: el suelo limita el recorrido y protege el hombro.",
      props: { tapete: true, mancuernas: "LR" },
      ini: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [64, 146], hL: [64, 124], eR: [66, 146], hR: [66, 124] },
      fin: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [53, 118], hL: [54, 96], eR: [55, 118], hR: [56, 96] },
    },
    puente: {
      nombre: "Puente de glúteos con mancuerna", musculos: "Glúteos y espalda baja", reps: "15–20 (2 s arriba)", peso: "10 kg sobre la cadera", kg: 10,
      pasos: ["Acostado, rodillas dobladas, pies cerca de la cadera.", "Aprieta glúteos y sube la cadera hasta formar una línea hombro-rodilla.", "Mantén 2 segundos y baja despacio."],
      respira: "Exhala al subir.", cuidado: "Sube con los glúteos, no arqueando la espalda. Muy bueno para la lumbar.",
      mancuerna: "1, apoyada sobre la cadera",
      props: { tapete: true, mancuernas: "R" },
      ini: { h: [38, 138], n: [52, 142], p: [94, 142], kL: [120, 116], fL: [134, 147], kR: [122, 118], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [72, 132], hR: [92, 134] },
      fin: { h: [38, 138], n: [52, 141], p: [92, 122], kL: [122, 112], fL: [134, 147], kR: [124, 114], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [70, 118], hR: [90, 114] },
    },
    press_hombro: {
      nombre: "Press de hombros sentado", musculos: "Hombros y tríceps", reps: "12–15", peso: "5 kg → 7,5 kg", kg: 7.5,
      pasos: ["Siéntate en el banco con la espalda recta.", "Mancuernas a la altura de los hombros.", "Empuja hacia arriba sin bloquear los codos y baja controlado."],
      respira: "Exhala al empujar. Nunca aguantes el aire con los brazos arriba.", cuidado: "No arquees la espalda; aprieta un poco el abdomen.",
      props: { banco: [82, 32], mancuernas: "LR" },
      ini: { h: [97, 50], n: [97, 62], p: [97, 110], kL: [124, 110], fL: [124, 150], kR: [126, 111], fR: [126, 150], eL: [94, 84], hL: [96, 62], eR: [100, 84], hR: [100, 62] },
      fin: { h: [97, 50], n: [97, 62], p: [97, 110], kL: [124, 110], fL: [124, 150], kR: [126, 111], fR: [126, 150], eL: [95, 40], hL: [95, 18], eR: [99, 40], hR: [99, 18] },
    },
    bird_dog: {
      nombre: "Bird dog", musculos: "Núcleo y espalda baja", reps: "8 por lado (2 s arriba)", peso: "Sin peso",
      pasos: ["En cuatro apoyos: manos bajo los hombros, rodillas bajo la cadera.", "Estira un brazo adelante y la pierna contraria atrás.", "Vuelve y cambia de lado."],
      respira: "Respira normal, sin aguantar.", cuidado: "La espalda no se mueve: imagina un vaso de agua sobre la cintura.",
      props: { tapete: true },
      ini: { h: [138, 96], n: [125, 104], p: [80, 104], kL: [80, 145], fL: [52, 147], kR: [82, 145], fR: [54, 147], eL: [124, 125], hL: [124, 146], eR: [126, 125], hR: [126, 146] },
      fin: { h: [138, 96], n: [125, 104], p: [80, 104], kL: [52, 103], fL: [24, 104], kR: [82, 145], fR: [54, 147], eL: [124, 125], hL: [124, 146], eR: [148, 100], hR: [170, 97] },
    },
    dead_bug: {
      nombre: "Dead bug", musculos: "Abdomen profundo", reps: "8 por lado", peso: "Sin peso",
      pasos: ["Boca arriba: brazos estirados hacia el techo y rodillas dobladas en el aire, encima de la cadera.", "Estira hacia el suelo un brazo (atrás de la cabeza) y la pierna contraria (adelante), despacio, sin tocar el suelo.", "Vuelve al centro y hazlo con el otro brazo y la otra pierna. Cada vez que vuelves cuenta una."],
      respira: "Exhala al estirar.", cuidado: "La espalda baja pegada a la alfombra todo el tiempo.",
      props: { tapete: true },
      // La figura alterna: centro → brazo izquierdo y pierna derecha → centro → brazo derecho y pierna izquierda.
      ini: { h: [46, 136], n: [60, 140], p: [106, 140], kL: [106, 112], fL: [130, 112], kR: [108, 113], fR: [132, 113], eL: [60, 118], hL: [60, 96], eR: [62, 118], hR: [62, 96] },
      fin: { h: [46, 136], n: [60, 140], p: [106, 140], kL: [106, 112], fL: [130, 112], kR: [134, 132], fR: [162, 140], eL: [42, 128], hL: [22, 136], eR: [62, 118], hR: [62, 96] },
      fin2: { h: [46, 136], n: [60, 140], p: [106, 140], kL: [134, 132], fL: [162, 140], kR: [108, 113], fR: [132, 113], eL: [60, 118], hL: [60, 96], eR: [42, 128], hR: [22, 136] },
    },
    peso_muerto_rumano: {
      cinturon: true, nombre: "Peso muerto rumano", musculos: "Isquiotibiales, glúteos y espalda", reps: "15", peso: "10 kg", kg: 10,
      pasos: ["De pie, mancuernas frente a los muslos, rodillas un poco dobladas.", "Lleva la cadera atrás deslizando las mancuernas por las piernas.", "Baja hasta media canilla y sube apretando glúteos."],
      respira: "Inhala al bajar, exhala al subir.", cuidado: "Espalda recta siempre. Si sientes la lumbar en vez de la parte de atrás del muslo, baja menos.",
      props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [98, 150], kR: [100, 120], fR: [100, 150], eL: [100, 66], hL: [102, 90], eR: [102, 66], hR: [104, 90] },
      fin: { h: [141, 60], n: [130, 66], p: [88, 88], kL: [94, 119], fL: [98, 150], kR: [96, 119], fR: [100, 150], eL: [130, 90], hL: [130, 112], eR: [132, 90], hR: [132, 112] },
    },
    zancada: {
      cinturon: true, nombre: "Zancada estática", musculos: "Piernas y glúteos", reps: "12 por pierna", peso: "7,5 kg → 10 kg", kg: 7.5,
      pasos: ["Da un paso largo: un pie adelante y otro atrás.", "Baja recto hasta que la rodilla de atrás casi toque el suelo.", "Sube empujando con la pierna de adelante."],
      respira: "Inhala al bajar, exhala al subir.", cuidado: "Tronco recto. Si pierdes el equilibrio, apoya una mano en la pared.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { mancuernas: "LR" },
      ini: { h: [98, 32], n: [98, 44], p: [98, 92], kL: [112, 121], fL: [125, 150], kR: [84, 121], fR: [70, 148], eL: [98, 68], hL: [98, 90], eR: [99, 68], hR: [99, 90] },
      fin: { h: [98, 55], n: [98, 67], p: [98, 115], kL: [127, 117], fL: [125, 150], kR: [92, 143], fR: [70, 148], eL: [98, 91], hL: [98, 113], eR: [99, 91], hR: [99, 113] },
    },
    curl: {
      nombre: "Curl de bíceps", musculos: "Bíceps", escalera: true, series: 4, reps: "40 · 30 · 20 · 10 por lado", peso: "3 → 5 → 7,5 → 10 kg",
      pasos: ["De pie, codos pegados al cuerpo.", "Sube las mancuernas sin mover los codos.", "Baja en 2 segundos."],
      respira: "Exhala al subir.", cuidado: "Sin balancear el cuerpo: si te balanceas, el peso es mucho.",
      props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [96, 150], kR: [102, 120], fR: [104, 150], eL: [100, 66], hL: [100, 88], eR: [102, 66], hR: [102, 88] },
      fin: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [96, 150], kR: [102, 120], fR: [104, 150], eL: [100, 66], hL: [112, 50], eR: [102, 66], hR: [114, 50] },
    },
    elevacion_lateral: {
      nombre: "Elevaciones laterales", musculos: "Hombros", escalera: true, escalones: [[3, 30], [5, 20], [7.5, 10], [10, 5]], series: 4, reps: "30 · 20 · 10 · 5", peso: "3 → 5 → 7,5 → 10 kg",
      pasos: ["De pie, mancuernas a los lados.", "Sube los brazos hacia los lados hasta la altura de los hombros.", "Baja despacio."],
      respira: "Exhala al subir.", cuidado: "Codos un poco doblados; no subas por encima del hombro. Si con 10 kg no sale limpio, termina con 7,5 kg × 15.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      vista: "de frente", props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [93, 120], fL: [91, 150], kR: [107, 120], fR: [109, 150], eL: [91, 64], hL: [89, 86], eR: [109, 64], hR: [111, 86] },
      fin: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [93, 120], fL: [91, 150], kR: [107, 120], fR: [109, 150], eL: [78, 46], hL: [56, 48], eR: [122, 46], hR: [144, 48] },
    },
    plancha: {
      nombre: "Plancha", musculos: "Núcleo", reps: "20–30 s (de rodillas si cuesta)", peso: "Peso corporal",
      pasos: ["Antebrazos en la alfombra, codos bajo los hombros.", "Cuerpo recto de cabeza a talones.", "Mantén el tiempo respirando."],
      respira: "Respira normal todo el tiempo: es lo más importante con presión alta.", cuidado: "Si se hunde la cintura o duele la lumbar, apoya las rodillas.",
      props: { tapete: true },
      ini: { h: [142, 118], n: [130, 124], p: [85, 128], kL: [60, 136], fL: [36, 146], kR: [61, 137], fR: [37, 146], eL: [130, 146], hL: [152, 146], eR: [131, 146], hR: [153, 146] },
      fin: { h: [142, 117], n: [130, 123], p: [85, 126], kL: [60, 135], fL: [36, 146], kR: [61, 136], fR: [37, 146], eL: [130, 146], hL: [152, 146], eR: [131, 146], hR: [153, 146] },
    },
    granjero: {
      cinturon: true, nombre: "Paseo del granjero", musculos: "Agarre, núcleo y postura", reps: "40 s", peso: "10 kg", kg: 10,
      pasos: ["Toma una mancuerna pesada en cada mano.", "Camina erguido, hombros atrás, pasos cortos.", "Deja las mancuernas doblando las rodillas, no la espalda."],
      respira: "Respira normal mientras caminas.", cuidado: "Fortalece la zona lumbar sin doblarla.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [106, 120], fL: [112, 150], kR: [94, 121], fR: [86, 150], eL: [100, 66], hL: [100, 90], eR: [101, 66], hR: [101, 90] },
      fin: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [94, 121], fL: [86, 150], kR: [106, 120], fR: [112, 150], eL: [100, 66], hL: [100, 90], eR: [101, 66], hR: [101, 90] },
    },
    rueda: {
      nombre: "Rueda abdominal (de rodillas)", musculos: "Abdomen", reps: "6–8", peso: "Peso corporal", fase: 3,
      pasos: ["De rodillas en la alfombra, manos en la rueda bajo los hombros.", "Rueda hacia adelante solo hasta donde mantengas la espalda recta.", "Vuelve apretando el abdomen."],
      respira: "Exhala al volver.", cuidado: "Recorrido corto al principio. Si duele la lumbar, se suspende.",
      props: { tapete: true, rueda: true },
      ini: { h: [118, 80], n: [108, 88], p: [76, 110], kL: [72, 145], fL: [46, 147], kR: [74, 145], fR: [48, 147], eL: [110, 114], hL: [112, 138], eR: [111, 114], hR: [113, 138] },
      fin: { h: [150, 114], n: [138, 120], p: [90, 128], kL: [72, 145], fL: [46, 147], kR: [74, 145], fR: [48, 147], eL: [160, 128], hL: [178, 138], eR: [161, 128], hR: [179, 138] },
    },
    extension_triceps: {
      nombre: "Extensión de tríceps sentado", musculos: "Tríceps", escalera: true, escalones: [[3, 30], [5, 20], [7.5, 10], [10, 5]], series: 4, reps: "30 · 20 · 10 · 5 por lado", peso: "3 → 5 → 7,5 → 10 kg",
      pasos: ["Siéntate en el banco con la espalda recta y la mancuerna arriba, brazo estirado.", "Baja la mancuerna detrás de la cabeza doblando solo el codo.", "Estira el brazo de nuevo."],
      respira: "Exhala al estirar el brazo.", cuidado: "El codo apunta al techo y no se abre. Abdomen firme para no arquear la espalda.",
      mancuerna: "1: un brazo y luego el otro",
      eje: "X", // agarre neutro: la barra va de adelante hacia atrás
      lado: { eR: 7, hR: 5, eL: -12, hL: -9 }, // el codo que trabaja va pegado a la cabeza; la otra mano en el muslo
      props: { banco: [82, 32], mancuernas: "R" },
      ini: { h: [97, 50], n: [97, 62], p: [97, 110], kL: [124, 110], fL: [124, 150], kR: [126, 111], fR: [126, 150], eL: [98, 86], hL: [112, 104], eR: [104, 38], hR: [106, 15] },
      fin: { h: [97, 50], n: [97, 62], p: [97, 110], kL: [124, 110], fL: [124, 150], kR: [126, 111], fR: [126, 150], eL: [98, 86], hL: [112, 104], eR: [104, 38], hR: [86, 47] },
    },
    patada_triceps: {
      nombre: "Patada de tríceps", musculos: "Tríceps", escalera: true, escalones: [[3, 30], [5, 20], [7.5, 10], [10, 5]], series: 4, reps: "30 · 20 · 10 · 5 por lado", peso: "3 → 5 → 7,5 → 10 kg",
      pasos: ["Apoya una mano en el banco, espalda plana como en el remo.", "Codo pegado al cuerpo, a la altura de la espalda.", "Estira el brazo hacia atrás y vuelve, sin mover el codo."],
      respira: "Exhala al estirar.", cuidado: "Solo se mueve el antebrazo. La mano en el banco protege la lumbar.",
      mancuerna: "1: un brazo y luego el otro",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { banco: [112, 34], mancuernas: "R" },
      ini: { h: [127, 72], n: [116, 80], p: [72, 94], kL: [84, 122], fL: [86, 150], kR: [62, 122], fR: [54, 150], eL: [120, 97], hL: [122, 114], eR: [96, 84], hR: [98, 106] },
      fin: { h: [127, 72], n: [116, 80], p: [72, 94], kL: [84, 122], fL: [86, 150], kR: [62, 122], fR: [54, 150], eL: [120, 97], hL: [122, 114], eR: [96, 84], hR: [74, 90] },
    },
    aperturas_suelo: {
      nombre: "Aperturas en el suelo", musculos: "Pecho", reps: "15–20", peso: "5 kg → 7,5 kg", kg: 5,
      pasos: ["Acostado en la alfombra, rodillas dobladas, mancuernas juntas sobre el pecho.", "Abre los brazos hacia los lados con los codos un poco doblados.", "Baja hasta que los codos toquen el suelo y vuelve a juntar."],
      respira: "Inhala al abrir, exhala al cerrar.", cuidado: "El suelo frena el recorrido y cuida el hombro.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      vista: "desde arriba", props: { arriba: true, mancuernas: "LR" },
      otra: { vista: "de lado", props: { tapete: true, mancuernas: "LR" },
        ini: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [53, 118], hL: [54, 96], eR: [55, 118], hR: [56, 96] },
        fin: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [58, 142], hL: [60, 146], eR: [60, 142], hR: [62, 146] } },
      ini: { h: [100, 20], n: [100, 34], p: [100, 84], kL: [92, 112], fL: [90, 130], kR: [108, 112], fR: [110, 130], eL: [88, 42], hL: [96, 48], eR: [112, 42], hR: [104, 48] },
      fin: { h: [100, 20], n: [100, 34], p: [100, 84], kL: [92, 112], fL: [90, 130], kR: [108, 112], fR: [110, 130], eL: [78, 40], hL: [58, 44], eR: [122, 40], hR: [142, 44] },
    },
    aperturas_invertidas: {
      nombre: "Aperturas invertidas sentado", musculos: "Espalda alta y parte de atrás del hombro", reps: "15–20", peso: "3 kg → 5 kg", kg: 3,
      pasos: ["Sentado al borde del banco, inclina el pecho hacia los muslos con la espalda recta.", "Mancuernas colgando bajo las piernas.", "Abre los brazos hacia los lados juntando los omóplatos."],
      respira: "Exhala al abrir.", cuidado: "Peso ligero: es un músculo pequeño. Al estar sentado, la lumbar descansa.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { banco: [74, 32], mancuernas: "LR" },
      otra: { vista: "de frente", props: { banco: [84, 32], mancuernas: "LR" },
        ini: { h: [100, 74], n: [100, 82], p: [100, 110], kL: [90, 110], fL: [90, 150], kR: [110, 110], fR: [110, 150], eL: [92, 104], hL: [90, 126], eR: [108, 104], hR: [110, 126] },
        fin: { h: [100, 74], n: [100, 82], p: [100, 110], kL: [90, 110], fL: [90, 150], kR: [110, 110], fR: [110, 150], eL: [78, 88], hL: [58, 84], eR: [122, 88], hR: [142, 84] } },
      ini: { h: [130, 74], n: [120, 82], p: [90, 110], kL: [118, 110], fL: [118, 150], kR: [120, 111], fR: [120, 150], eL: [120, 104], hL: [122, 126], eR: [122, 104], hR: [124, 126] },
      fin: { h: [130, 74], n: [120, 82], p: [90, 110], kL: [118, 110], fL: [118, 150], kR: [120, 111], fR: [120, 150], eL: [111, 72], hL: [107, 56], eR: [112, 72], hR: [108, 56] },
    },
    pullover: {
      nombre: "Pullover en el suelo", musculos: "Espalda ancha y pecho", reps: "15–20", peso: "7,5 kg → 10 kg (una mancuerna)", kg: 7.5,
      pasos: ["Acostado, rodillas dobladas, una mancuerna con las dos manos sobre el pecho.", "Llévala hacia atrás por encima de la cabeza con los codos un poco doblados.", "Vuelve a subirla sobre el pecho."],
      respira: "Inhala al bajar atrás, exhala al subir.", cuidado: "La espalda baja pegada a la alfombra; baja solo hasta donde no se despegue.",
      mancuerna: "1, con las dos manos", juntas: true,
      props: { tapete: true, mancuernas: "R" },
      ini: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [53, 118], hL: [54, 96], eR: [55, 118], hR: [56, 96] },
      fin: { h: [38, 136], n: [52, 140], p: [100, 140], kL: [124, 116], fL: [140, 147], kR: [126, 118], fR: [142, 147], eL: [34, 128], hL: [14, 136], eR: [35, 128], hR: [15, 136] },
    },
    curl_martillo: {
      nombre: "Curl martillo", musculos: "Bíceps y antebrazo", escalera: true, series: 4, reps: "40 · 30 · 20 · 10 por lado", peso: "3 → 5 → 7,5 → 10 kg",
      pasos: ["De pie, mancuernas a los lados con las palmas mirándose.", "Sube sin girar la muñeca y sin mover los codos.", "Baja en 2 segundos."],
      respira: "Exhala al subir.", cuidado: "Sin balancear el cuerpo.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [96, 150], kR: [102, 120], fR: [104, 150], eL: [100, 66], hL: [100, 88], eR: [102, 66], hR: [102, 88] },
      fin: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [96, 150], kR: [102, 120], fR: [104, 150], eL: [100, 66], hL: [112, 50], eR: [102, 66], hR: [114, 50] },
    },
    remo_pecho_banco: {
      nombre: "Remo con el pecho en el banco", musculos: "Espalda", reps: "15–20", peso: "7,5 kg → 10 kg", kg: 7.5,
      pasos: ["De rodillas detrás del banco, apoya el pecho en el asiento.", "Mancuernas colgando a los lados del banco.", "Sube las dos a la vez llevando los codos atrás."],
      respira: "Exhala al subir.", cuidado: "El banco sostiene el tronco: la lumbar no trabaja. Si el banco se mueve, ponlo contra la pared.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { tapete: true, banco: [92, 32], mancuernas: "LR" },
      ini: { h: [128, 102], n: [116, 106], p: [70, 112], kL: [64, 146], fL: [38, 147], kR: [66, 146], fR: [40, 147], eL: [118, 124], hL: [120, 144], eR: [119, 124], hR: [121, 144] },
      fin: { h: [128, 102], n: [116, 106], p: [70, 112], kL: [64, 146], fL: [38, 147], kR: [66, 146], fR: [40, 147], eL: [100, 98], hL: [108, 118], eR: [101, 98], hR: [109, 118] },
    },
    elevacion_talones: {
      nombre: "Elevación de talones", musculos: "Pantorrillas", reps: "25–30", peso: "10 kg en cada mano", kg: 10,
      pasos: ["De pie, mancuernas a los lados.", "Sube en puntas de pie lo más alto que puedas.", "Baja despacio."],
      respira: "Respira normal.", cuidado: "Si pierdes el equilibrio, una mancuerna sola y la otra mano en la pared.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { mancuernas: "LR" },
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [98, 150], kR: [100, 120], fR: [100, 150], eL: [100, 66], hL: [100, 90], eR: [101, 66], hR: [101, 90] },
      fin: { h: [100, 20], n: [100, 34], p: [100, 82], kL: [98, 112], fL: [98, 142], kR: [100, 112], fR: [100, 142], eL: [100, 58], hL: [100, 82], eR: [101, 58], hR: [101, 82] },
    },
    bulgara: {
      cinturon: true, nombre: "Sentadilla búlgara", musculos: "Piernas y glúteos", reps: "12 por pierna", peso: "5 kg → 7,5 kg", kg: 5,
      pasos: ["De espaldas al banco, apoya el empeine de un pie en el asiento (no te subas).", "El otro pie bien adelante.", "Baja recto hasta que el muslo de adelante quede casi horizontal y sube."],
      respira: "Inhala al bajar, exhala al subir.", cuidado: "Banco contra la pared para que no se deslice. Tronco recto.",
      eje: "X", // barra de adelante hacia atrás (palmas mirándose o hacia abajo)
      props: { banco: [36, 30], mancuernas: "LR" },
      ini: { h: [94, 32], n: [94, 44], p: [94, 94], kL: [110, 122], fL: [122, 150], kR: [76, 120], fR: [54, 112], eL: [94, 68], hL: [94, 90], eR: [95, 68], hR: [95, 90] },
      fin: { h: [92, 54], n: [92, 66], p: [92, 116], kL: [121, 118], fL: [122, 150], kR: [80, 142], fR: [54, 112], eL: [92, 90], hL: [92, 112], eR: [93, 90], hR: [93, 112] },
    },

    // ---------- Calentamiento ----------
    puente_activa: {
      nombre: "Puente de glúteos sin peso", musculos: "Glúteos y espalda baja", reps: "10 lentos", series: 1,
      pasos: ["Boca arriba en la alfombra, rodillas dobladas, brazos al lado del cuerpo.", "Aprieta glúteos y sube la cadera.", "Baja despacio sin descansar abajo."],
      respira: "Exhala al subir, inhala al bajar.", cuidado: "Despierta los glúteos para que no cargue la lumbar en el entrenamiento.",
      props: { tapete: true },
      ini: { h: [38, 138], n: [52, 142], p: [94, 142], kL: [120, 116], fL: [134, 147], kR: [122, 118], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [64, 146], hR: [80, 147] },
      fin: { h: [38, 138], n: [52, 141], p: [92, 122], kL: [122, 112], fL: [134, 147], kR: [124, 114], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [64, 146], hR: [80, 147] },
    },
    circulos_brazos: {
      nombre: "Círculos de brazos", musculos: "Hombros", reps: "10 adelante y 10 atrás", series: 1,
      pasos: ["De pie, brazos estirados a los lados a la altura de los hombros.", "Con los brazos estirados, dibuja círculos con las manos hacia adelante, del tamaño de un plato.", "Luego 10 hacia atrás."],
      respira: "Respira normal.", cuidado: "Movimiento suave; prepara los hombros para los press.",
      circulo: { radio: 16 }, // la figura se calcula en index.html (vistasCirculo)
      props: {},
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [93, 120], fL: [91, 150], kR: [107, 120], fR: [109, 150], eL: [91, 64], hL: [89, 86], eR: [109, 64], hR: [111, 86] },
      fin: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [93, 120], fL: [91, 150], kR: [107, 120], fR: [109, 150], eL: [88, 24], hL: [84, 4], eR: [112, 24], hR: [116, 4] },
    },
    flexiones_pared: {
      nombre: "Flexiones en la pared", musculos: "Pecho, hombros y brazos", reps: "10–12 lentas", series: 1,
      pasos: ["De pie a un paso largo de la pared, manos apoyadas a la altura de los hombros.", "Dobla los codos y acerca el pecho a la pared con el cuerpo recto.", "Empuja y vuelve."],
      respira: "Inhala al acercarte, exhala al empujar.", cuidado: "Cuerpo recto de cabeza a talones; sin pesas, solo para calentar.",
      props: { pared: 150 },
      ini: { h: [111, 36], n: [107, 48], p: [91, 93], kL: [80, 121], fL: [70, 150], kR: [81, 122], fR: [71, 150], eL: [128, 49], hL: [148, 50], eR: [129, 50], hR: [149, 51] },
      fin: { h: [139, 50], n: [132, 61], p: [105, 100], kL: [87, 125], fL: [70, 150], kR: [88, 126], fR: [71, 150], eL: [130, 76], hL: [148, 50], eR: [131, 77], hR: [149, 51] },
    },
    sentadilla_aire: {
      nombre: "Sentadilla sin peso", musculos: "Piernas y cadera", reps: "10", series: 1,
      pasos: ["Pies al ancho de hombros, brazos adelante.", "Baja llevando la cadera atrás, hasta donde estés cómodo.", "Sube despacio."],
      respira: "Inhala al bajar, exhala al subir.", cuidado: "Pecho arriba y espalda recta.",
      props: {},
      ini: { h: [100, 28], n: [100, 42], p: [100, 90], kL: [98, 120], fL: [98, 150], kR: [100, 120], fR: [100, 150], eL: [112, 50], hL: [126, 50], eR: [113, 51], hR: [127, 51] },
      fin: { h: [106, 60], n: [100, 72], p: [82, 114], kL: [108, 114], fL: [102, 150], kR: [110, 115], fR: [104, 150], eL: [114, 72], hL: [130, 70], eR: [115, 73], hR: [131, 71] },
    },

    // ---------- Estiramientos (al final) ----------
    cobra: {
      nombre: "Cobra", musculos: "Abdomen y espalda baja", reps: "20–30 s", peso: "—", series: 1,
      pasos: ["Boca abajo en la alfombra, manos bajo los hombros.", "Empuja con las manos y levanta el pecho; la cadera sigue en el suelo.", "Sube solo hasta donde no moleste la lumbar."],
      respira: "Respira lento y profundo.", cuidado: "Si pellizca la espalda baja, quédate apoyado en los antebrazos (esfinge).",
      props: { tapete: true },
      otra: { vista: "de frente", props: { tapete: true },
        ini: { h: [100, 136], n: [100, 142], p: [100, 146], kL: [97, 147], fL: [96, 148], kR: [103, 147], fR: [104, 148], eL: [80, 136], hL: [84, 147], eR: [120, 136], hR: [116, 147] },
        fin: { h: [100, 96], n: [100, 108], p: [100, 146], kL: [97, 147], fL: [96, 148], kR: [103, 147], fR: [104, 148], eL: [86, 128], hL: [84, 147], eR: [114, 128], hR: [116, 147] } },
      ini: { h: [150, 140], n: [138, 144], p: [90, 145], kL: [60, 146], fL: [30, 146], kR: [61, 146], fR: [31, 146], eL: [132, 132], hL: [142, 147], eR: [133, 132], hR: [143, 147] },
      fin: { h: [142, 96], n: [132, 108], p: [92, 142], kL: [60, 146], fL: [30, 146], kR: [61, 146], fR: [31, 146], eL: [134, 128], hL: [138, 147], eR: [135, 128], hR: [139, 147] },
    },
    nino: {
      nombre: "Postura del niño", musculos: "Espalda baja y hombros", reps: "30 s", peso: "—", series: 1,
      pasos: ["En cuatro apoyos sobre la alfombra.", "Lleva la cadera hacia los talones.", "Estira los brazos adelante y apoya la frente."],
      respira: "Respira hacia la espalda, despacio.", cuidado: "Si molestan las rodillas, abre un poco las piernas.",
      props: { tapete: true },
      ini: { h: [138, 96], n: [125, 104], p: [80, 104], kL: [80, 145], fL: [52, 147], kR: [82, 145], fR: [54, 147], eL: [124, 125], hL: [124, 146], eR: [126, 125], hR: [126, 146] },
      fin: { h: [112, 140], n: [100, 136], p: [60, 130], kL: [80, 145], fL: [52, 147], kR: [82, 145], fR: [54, 147], eL: [125, 142], hL: [150, 146], eR: [126, 142], hR: [151, 146] },
    },
    puente_estira: {
      nombre: "Puente (mantenido)", musculos: "Glúteos y cadera", reps: "20–30 s arriba", peso: "—", series: 1,
      pasos: ["Boca arriba, rodillas dobladas, brazos al lado del cuerpo.", "Sube la cadera hasta formar una línea hombro-rodilla.", "Quédate arriba respirando y baja despacio."],
      respira: "Respira normal, no aguantes el aire arriba.", cuidado: "Aprieta glúteos para no arquear la espalda.",
      props: { tapete: true },
      ini: { h: [38, 138], n: [52, 142], p: [94, 142], kL: [120, 116], fL: [134, 147], kR: [122, 118], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [64, 146], hR: [80, 147] },
      fin: { h: [38, 138], n: [52, 141], p: [92, 122], kL: [122, 112], fL: [134, 147], kR: [124, 114], fR: [136, 147], eL: [64, 146], hL: [80, 147], eR: [64, 146], hR: [80, 147] },
    },
    rodillas_pecho: {
      nombre: "Rodillas al pecho", musculos: "Espalda baja y glúteos", reps: "30 s", peso: "—", series: 1,
      pasos: ["Boca arriba en la alfombra.", "Abraza las dos rodillas y llévalas al pecho.", "La cabeza queda apoyada."],
      respira: "Respira profundo; al exhalar, acerca un poco más las rodillas.", cuidado: "Muy bueno para descargar la lumbar. Puedes balancearte suave de lado a lado.",
      props: { tapete: true },
      ini: { h: [46, 138], n: [60, 142], p: [106, 142], kL: [128, 118], fL: [142, 147], kR: [130, 119], fR: [144, 147], eL: [72, 146], hL: [88, 147], eR: [73, 146], hR: [89, 147] },
      fin: { h: [46, 138], n: [60, 142], p: [106, 142], kL: [90, 110], fL: [112, 102], kR: [92, 111], fR: [114, 103], eL: [78, 128], hL: [90, 114], eR: [79, 128], hR: [91, 115] },
    },
    torsion: {
      nombre: "Torsión lumbar acostado", musculos: "Espalda baja, glúteo y cadera", reps: "30 s por lado", peso: "—", series: 1,
      pasos: ["Boca arriba, una pierna estirada y los brazos al lado del cuerpo.", "Dobla la otra rodilla y crúzala por encima de la pierna estirada; el pie queda apoyado al lado de esa rodilla.", "Con la mano de ese lado lleva la rodilla hacia el suelo; los hombros siguen apoyados."],
      respira: "Respira lento; con cada exhalación la rodilla baja un poco más.", cuidado: "Sin forzar: que se sienta estirar, no doler.",
      // Postura en 3D [X a lo largo del cuerpo (cabeza −, pies +), Y altura, Z de lado (− izquierda, + derecha)].
      // Las 3 vistas (desde arriba, de lado e inclinada) salen de aquí, así siempre muestran lo mismo.
      // La rodilla derecha cruza por encima de la pierna izquierda estirada y la mano izquierda la lleva al suelo.
      pose3d: {
        ini: { h: [-62, 5, 0], n: [-48, 4, 0], p: [0, 4, 0], kL: [30, 4, -6], fL: [58, 4, -8], kR: [30, 4, 6], fR: [58, 4, 8],
          eL: [-30, 4, -17], hL: [-10, 4, -19], eR: [-30, 4, 17], hR: [-10, 4, 19] },
        fin: { h: [-62, 5, 0], n: [-48, 4, 0], p: [0, 6, -3], kL: [30, 4, -6], fL: [58, 4, -8], kR: [18, 9, -24], fR: [30, 4, -14],
          eL: [-14, 8, -26], hL: [14, 10, -27], eR: [-30, 4, 17], hR: [-10, 4, 19] },
      },
      props: { tapete: true },
    },
    paloma: {
      // La canilla de adelante cruza de lado bajo el cuerpo: rodilla hacia un lado, talón delante de la otra cadera.
      lado: { kR: 18, fR: -16, kL: -5, fL: -5 },
      nombre: "Paloma", musculos: "Glúteo, cadera y espalda baja", reps: "30 s por lado", peso: "—", series: 1,
      pasos: ["Desde cuatro apoyos, lleva una rodilla adelante y apóyala en el suelo.", "Cruza esa canilla con el talón delante de la rodilla; la otra pierna se estira atrás.", "Con las manos en el suelo, inclina el pecho hacia adelante."],
      respira: "Respira lento; al exhalar, baja un poco más el pecho.", cuidado: "La cadera queda recta, sin caerse a un lado. Si duele la rodilla de adelante, pon una almohada bajo la cadera.",
      props: { tapete: true },
      ini: { h: [104, 74], n: [102, 86], p: [96, 132], kL: [62, 146], fL: [30, 147], kR: [124, 146], fR: [100, 146], eL: [108, 112], hL: [114, 146], eR: [110, 112], hR: [116, 146] },
      fin: { h: [150, 130], n: [136, 128], p: [96, 136], kL: [62, 146], fL: [30, 147], kR: [124, 146], fR: [100, 146], eL: [154, 140], hL: [176, 146], eR: [155, 140], hR: [177, 146] },
    },

  },
};
