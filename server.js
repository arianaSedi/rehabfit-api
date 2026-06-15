const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(cors());
app.use(express.json());

const ejercicios = [
  {
    id: 1,
    nombre: "Extensión suave de rodilla",
    zona: "Rodilla",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Sentado en una silla, extiende lentamente la rodilla y vuelve a la posición inicial.",
    advertencia: "Detente si sientes dolor fuerte."
  },
  {
    id: 2,
    nombre: "Flexión asistida de rodilla",
    zona: "Rodilla",
    nivel: "Media",
    posicion: "Acostado",
    duracionMinutos: 8,
    repeticiones: 8,
    descripcion: "Acostado, flexiona la rodilla lentamente con apoyo si es necesario.",
    advertencia: "No fuerces el movimiento si hay inflamación o dolor intenso."
  },
  {
    id: 3,
    nombre: "Elevación de pierna recta",
    zona: "Rodilla",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 12,
    descripcion: "Eleva la pierna recta lentamente para fortalecer la zona de la rodilla.",
    advertencia: "Mantén el movimiento controlado y sin dolor fuerte."
  },
  {
    id: 4,
    nombre: "Contracción de cuádriceps",
    zona: "Rodilla",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Aprieta el músculo del muslo manteniendo la pierna extendida durante unos segundos.",
    advertencia: "No bloquees la rodilla con fuerza excesiva."
  },
  {
    id: 5,
    nombre: "Deslizamiento de talón",
    zona: "Rodilla",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Desliza el talón hacia los glúteos flexionando la rodilla y regresa lentamente.",
    advertencia: "Realiza el movimiento hasta donde sea cómodo."
  },
  {
    id: 6,
    nombre: "Sentadilla parcial asistida",
    zona: "Rodilla",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 7,
    repeticiones: 8,
    descripcion: "Con apoyo en una silla, flexiona ligeramente las rodillas y vuelve a subir.",
    advertencia: "No bajes demasiado ni permitas dolor fuerte."
  },
  {
    id: 7,
    nombre: "Círculos de tobillo",
    zona: "Tobillo",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 10,
    descripcion: "Mueve el tobillo formando círculos lentos hacia ambos lados.",
    advertencia: "Haz movimientos suaves y controlados."
  },
  {
    id: 8,
    nombre: "Flexión y extensión de tobillo",
    zona: "Tobillo",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 12,
    descripcion: "Lleva la punta del pie hacia arriba y luego hacia abajo lentamente.",
    advertencia: "No fuerces si hay dolor o hinchazón."
  },
  {
    id: 9,
    nombre: "Elevación de talones",
    zona: "Tobillo",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Con apoyo en una silla, eleva los talones y baja lentamente.",
    advertencia: "Usa apoyo para evitar perder el equilibrio."
  },
  {
    id: 10,
    nombre: "Elevación de punta de pie",
    zona: "Tobillo",
    nivel: "Baja",
    posicion: "De pie",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Levanta la punta de los pies manteniendo los talones en el suelo.",
    advertencia: "Realiza el ejercicio con apoyo si lo necesitas."
  },
  {
    id: 11,
    nombre: "Estiramiento de pantorrilla",
    zona: "Tobillo",
    nivel: "Baja",
    posicion: "De pie",
    duracionMinutos: 5,
    repeticiones: 6,
    descripcion: "Apoya las manos en una pared y lleva una pierna atrás para estirar la pantorrilla.",
    advertencia: "No rebotes durante el estiramiento."
  },
  {
    id: 12,
    nombre: "Rotación de hombro suave",
    zona: "Hombro",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Realiza círculos suaves con los hombros hacia adelante y hacia atrás.",
    advertencia: "No eleves demasiado el hombro si causa dolor."
  },
  {
    id: 13,
    nombre: "Péndulo de hombro",
    zona: "Hombro",
    nivel: "Baja",
    posicion: "De pie",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Inclina el cuerpo ligeramente y deja que el brazo cuelgue haciendo movimientos suaves.",
    advertencia: "El movimiento debe ser relajado, no forzado."
  },
  {
    id: 14,
    nombre: "Elevación frontal de brazo",
    zona: "Hombro",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Eleva el brazo hacia el frente hasta una altura cómoda y baja lentamente.",
    advertencia: "Evita pasar del rango sin dolor."
  },
  {
    id: 15,
    nombre: "Apertura lateral de hombro",
    zona: "Hombro",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Eleva el brazo hacia el lado lentamente y vuelve a la posición inicial.",
    advertencia: "Detente si aparece dolor punzante."
  },
  {
    id: 16,
    nombre: "Retracción escapular",
    zona: "Hombro",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Lleva suavemente los hombros hacia atrás juntando los omóplatos.",
    advertencia: "Mantén la espalda recta y evita tensión en el cuello."
  },
  {
    id: 17,
    nombre: "Flexión de muñeca",
    zona: "Muñeca",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 12,
    descripcion: "Dobla la muñeca hacia abajo lentamente y vuelve a la posición inicial.",
    advertencia: "Hazlo sin peso si hay molestia."
  },
  {
    id: 18,
    nombre: "Extensión de muñeca",
    zona: "Muñeca",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 12,
    descripcion: "Dobla la muñeca hacia arriba lentamente y vuelve a la posición inicial.",
    advertencia: "No fuerces el rango de movimiento."
  },
  {
    id: 19,
    nombre: "Rotación de muñeca",
    zona: "Muñeca",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 10,
    descripcion: "Realiza círculos suaves con la muñeca hacia ambos lados.",
    advertencia: "Evita movimientos bruscos."
  },
  {
    id: 20,
    nombre: "Apertura y cierre de mano",
    zona: "Mano",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 15,
    descripcion: "Abre y cierra la mano lentamente para mejorar movilidad.",
    advertencia: "Detente si hay dolor fuerte o rigidez excesiva."
  },
  {
    id: 21,
    nombre: "Toque de dedos",
    zona: "Mano",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Toca con el pulgar la punta de cada dedo de la misma mano.",
    advertencia: "Hazlo despacio y sin forzar las articulaciones."
  },
  {
    id: 22,
    nombre: "Presión suave con pelota",
    zona: "Mano",
    nivel: "Media",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Aprieta suavemente una pelota blanda y suelta lentamente.",
    advertencia: "Usa una pelota suave y evita dolor fuerte."
  },
  {
    id: 23,
    nombre: "Flexión de codo",
    zona: "Brazo",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 12,
    descripcion: "Dobla el codo llevando la mano hacia el hombro y baja lentamente.",
    advertencia: "Realiza el ejercicio sin peso al inicio."
  },
  {
    id: 24,
    nombre: "Extensión de codo",
    zona: "Brazo",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 12,
    descripcion: "Estira el codo lentamente y vuelve a flexionarlo.",
    advertencia: "No bloquees el codo con fuerza."
  },
  {
    id: 25,
    nombre: "Pronación y supinación",
    zona: "Brazo",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Gira el antebrazo mostrando la palma hacia arriba y luego hacia abajo.",
    advertencia: "Mantén el codo pegado al cuerpo."
  },
  {
    id: 26,
    nombre: "Marcha sentada",
    zona: "Pierna",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 12,
    descripcion: "Sentado, eleva una rodilla y luego la otra como si caminaras.",
    advertencia: "Mantén la espalda apoyada si lo necesitas."
  },
  {
    id: 27,
    nombre: "Abducción de cadera sentado",
    zona: "Pierna",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Separa lentamente una pierna hacia el lado y vuelve al centro.",
    advertencia: "Evita movimientos rápidos."
  },
  {
    id: 28,
    nombre: "Elevación lateral de pierna",
    zona: "Pierna",
    nivel: "Media",
    posicion: "Acostado",
    duracionMinutos: 7,
    repeticiones: 10,
    descripcion: "Acostado de lado, eleva la pierna superior y baja con control.",
    advertencia: "Mantén el movimiento dentro de un rango cómodo."
  },
  {
    id: 29,
    nombre: "Puente básico",
    zona: "Pierna",
    nivel: "Media",
    posicion: "Acostado",
    duracionMinutos: 7,
    repeticiones: 8,
    descripcion: "Acostado boca arriba con rodillas dobladas, eleva la pelvis lentamente.",
    advertencia: "No arquees demasiado la espalda."
  },
  {
    id: 30,
    nombre: "Deslizamiento lateral de pierna",
    zona: "Pierna",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Desliza una pierna hacia el lado sobre la cama y vuelve al centro.",
    advertencia: "Haz el movimiento lento y controlado."
  },
  {
    id: 31,
    nombre: "Inclinación pélvica",
    zona: "Espalda",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Contrae suavemente el abdomen llevando la zona lumbar hacia la superficie.",
    advertencia: "No contengas la respiración."
  },
  {
    id: 32,
    nombre: "Rodillas al pecho",
    zona: "Espalda",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Lleva una rodilla hacia el pecho suavemente y mantén unos segundos.",
    advertencia: "No tires con fuerza de la pierna."
  },
  {
    id: 33,
    nombre: "Gato y camello",
    zona: "Espalda",
    nivel: "Baja",
    posicion: "En cuatro apoyos",
    duracionMinutos: 6,
    repeticiones: 10,
    descripcion: "Arquea y redondea la espalda lentamente coordinando la respiración.",
    advertencia: "Evita movimientos bruscos."
  },
  {
    id: 34,
    nombre: "Rotación lumbar suave",
    zona: "Espalda",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Con rodillas dobladas, deja caer ambas piernas suavemente hacia un lado y luego al otro.",
    advertencia: "Mantén los hombros apoyados y no fuerces."
  },
  {
    id: 35,
    nombre: "Extensión lumbar suave",
    zona: "Espalda",
    nivel: "Media",
    posicion: "Boca abajo",
    duracionMinutos: 5,
    repeticiones: 8,
    descripcion: "Apoya los antebrazos y eleva suavemente el pecho manteniendo la pelvis apoyada.",
    advertencia: "Detente si aumenta el dolor lumbar."
  },
  {
    id: 36,
    nombre: "Flexión de cuello",
    zona: "Cuello",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 8,
    descripcion: "Inclina lentamente la cabeza hacia adelante y vuelve al centro.",
    advertencia: "Evita movimientos rápidos."
  },
  {
    id: 37,
    nombre: "Rotación de cuello",
    zona: "Cuello",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 8,
    descripcion: "Gira la cabeza suavemente hacia un lado y luego hacia el otro.",
    advertencia: "No fuerces si hay mareo o dolor fuerte."
  },
  {
    id: 38,
    nombre: "Inclinación lateral de cuello",
    zona: "Cuello",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 8,
    descripcion: "Inclina la cabeza llevando la oreja hacia el hombro sin levantar el hombro.",
    advertencia: "Hazlo lentamente y sin dolor fuerte."
  },
  {
    id: 39,
    nombre: "Retracción cervical",
    zona: "Cuello",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Lleva suavemente la barbilla hacia atrás como haciendo papada y vuelve al centro.",
    advertencia: "No inclines la cabeza hacia arriba."
  },
  {
    id: 40,
    nombre: "Respiración diafragmática",
    zona: "General",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 5,
    repeticiones: 8,
    descripcion: "Respira lentamente llevando el aire hacia el abdomen y exhala con calma.",
    advertencia: "Detente si sientes mareo."
  },
  {
    id: 41,
    nombre: "Movilidad general sentada",
    zona: "General",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 8,
    repeticiones: 10,
    descripcion: "Combina movimientos suaves de hombros, brazos, piernas y tobillos sentado.",
    advertencia: "Ideal para iniciar con baja movilidad."
  },
  {
    id: 42,
    nombre: "Transferencia sentado a de pie",
    zona: "Pierna",
    nivel: "Media",
    posicion: "Sentado",
    duracionMinutos: 8,
    repeticiones: 6,
    descripcion: "Desde una silla estable, levántate lentamente y vuelve a sentarte con control.",
    advertencia: "Usa apoyo si tienes problemas de equilibrio."
  },
  {
    id: 43,
    nombre: "Paso lateral asistido",
    zona: "Pierna",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Con apoyo, da pasos laterales cortos hacia un lado y luego regresa.",
    advertencia: "Realízalo cerca de una pared o silla estable."
  },
  {
    id: 44,
    nombre: "Equilibrio con apoyo",
    zona: "General",
    nivel: "Media",
    posicion: "De pie",
    duracionMinutos: 5,
    repeticiones: 6,
    descripcion: "De pie junto a una silla, intenta mantener el equilibrio unos segundos.",
    advertencia: "No lo hagas sin apoyo si tienes riesgo de caída."
  },
  {
    id: 45,
    nombre: "Estiramiento de isquiotibiales",
    zona: "Pierna",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 6,
    descripcion: "Extiende una pierna al frente e inclina suavemente el tronco hacia adelante.",
    advertencia: "No rebotes durante el estiramiento."
  },
  {
    id: 46,
    nombre: "Estiramiento de muñeca hacia atrás",
    zona: "Muñeca",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 6,
    descripcion: "Con la mano extendida, lleva suavemente los dedos hacia atrás con ayuda de la otra mano.",
    advertencia: "El estiramiento debe ser suave."
  },
  {
    id: 47,
    nombre: "Estiramiento de dedos",
    zona: "Mano",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 4,
    repeticiones: 8,
    descripcion: "Extiende los dedos de la mano y relaja lentamente.",
    advertencia: "No fuerces si hay rigidez o inflamación."
  },
  {
    id: 48,
    nombre: "Apretar omóplatos",
    zona: "Espalda",
    nivel: "Baja",
    posicion: "Sentado",
    duracionMinutos: 5,
    repeticiones: 10,
    descripcion: "Junta suavemente los omóplatos manteniendo el cuello relajado.",
    advertencia: "No eleves los hombros hacia las orejas."
  },
  {
    id: 49,
    nombre: "Elevación de brazos asistida",
    zona: "Hombro",
    nivel: "Baja",
    posicion: "Acostado",
    duracionMinutos: 6,
    repeticiones: 8,
    descripcion: "Con ayuda del otro brazo, eleva lentamente el brazo afectado hasta donde sea cómodo.",
    advertencia: "No superar el rango sin dolor."
  },
  {
    id: 50,
    nombre: "Caminata suave en casa",
    zona: "General",
    nivel: "Baja",
    posicion: "De pie",
    duracionMinutos: 10,
    repeticiones: 1,
    descripcion: "Camina lentamente en un espacio seguro durante algunos minutos.",
    advertencia: "Usa apoyo si lo necesitas y detente si sientes mareo o dolor fuerte."
  }
];

app.get("/", (req, res) => {
  res.json({
    mensaje: "API RehabFit funcionando correctamente",
    descripcion: "API de ejercicios de rehabilitación y ejercicios adaptados.",
    advertenciaGeneral: "Esta información es de apoyo y no sustituye atención médica o fisioterapia profesional.",
    totalEjercicios: ejercicios.length,
    endpoints: [
      "GET /ejercicios",
      "GET /ejercicios/:id",
      "GET /ejercicios/zona/:zona",
      "GET /ejercicios/nivel/:nivel",
      "GET /buscar?texto=rodilla",
      "POST /ia/recomendacion"
    ]
  });
});

app.get("/ejercicios", (req, res) => {
  res.json({
    total: ejercicios.length,
    ejercicios: ejercicios
  });
});

app.get("/ejercicios/zona/:zona", (req, res) => {
  const zona = req.params.zona.toLowerCase();

  const resultado = ejercicios.filter(ejercicio =>
    ejercicio.zona.toLowerCase() === zona
  );

  res.json({
    total: resultado.length,
    zona: req.params.zona,
    ejercicios: resultado
  });
});

app.get("/ejercicios/nivel/:nivel", (req, res) => {
  const nivel = req.params.nivel.toLowerCase();

  const resultado = ejercicios.filter(ejercicio =>
    ejercicio.nivel.toLowerCase() === nivel
  );

  res.json({
    total: resultado.length,
    nivel: req.params.nivel,
    ejercicios: resultado
  });
});

app.get("/buscar", (req, res) => {
  const texto = req.query.texto;

  if (!texto) {
    return res.status(400).json({
      mensaje: "Debes enviar un texto de búsqueda. Ejemplo: /buscar?texto=rodilla"
    });
  }

  const busqueda = texto.toLowerCase();

  const resultado = ejercicios.filter(ejercicio =>
    ejercicio.nombre.toLowerCase().includes(busqueda) ||
    ejercicio.zona.toLowerCase().includes(busqueda) ||
    ejercicio.nivel.toLowerCase().includes(busqueda) ||
    ejercicio.posicion.toLowerCase().includes(busqueda) ||
    ejercicio.descripcion.toLowerCase().includes(busqueda)
  );

  res.json({
    total: resultado.length,
    busqueda: texto,
    ejercicios: resultado
  });
});

function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectarZonaYPrioridades(consulta) {
  const texto = normalizarTexto(consulta);

  if (texto.includes("rodilla") || texto.includes("rodillas")) {
    return {
      zonaDetectada: "Rodilla",
      palabrasClave: ["rodilla", "cuadriceps", "talon", "pierna"]
    };
  }

  if (
    texto.includes("tobillo") ||
    texto.includes("tobillos") ||
    texto.includes("pie") ||
    texto.includes("pies")
  ) {
    return {
      zonaDetectada: "Tobillo",
      palabrasClave: ["tobillo", "pie", "talon", "pantorrilla"]
    };
  }

  if (texto.includes("hombro") || texto.includes("hombros")) {
    return {
      zonaDetectada: "Hombro",
      palabrasClave: ["hombro", "escapular", "omoplatos", "brazo"]
    };
  }

  if (
    texto.includes("muneca") ||
    texto.includes("muñeca") ||
    texto.includes("munecas") ||
    texto.includes("muñecas")
  ) {
    return {
      zonaDetectada: "Muñeca",
      palabrasClave: ["muneca", "muñeca"]
    };
  }

  if (
    texto.includes("mano") ||
    texto.includes("manos") ||
    texto.includes("dedo") ||
    texto.includes("dedos")
  ) {
    return {
      zonaDetectada: "Mano",
      palabrasClave: ["mano", "dedos"]
    };
  }

  if (
    texto.includes("espalda") ||
    texto.includes("lumbar") ||
    texto.includes("columna") ||
    texto.includes("lumbalgia")
  ) {
    return {
      zonaDetectada: "Espalda",
      palabrasClave: ["espalda", "lumbar", "columna", "omoplatos"]
    };
  }

  if (
    texto.includes("cuello") ||
    texto.includes("cervical") ||
    texto.includes("cervicales")
  ) {
    return {
      zonaDetectada: "Cuello",
      palabrasClave: ["cuello", "cervical"]
    };
  }

  if (
    texto.includes("pierna") ||
    texto.includes("piernas") ||
    texto.includes("cadera")
  ) {
    return {
      zonaDetectada: "Pierna",
      palabrasClave: ["pierna", "cadera", "isquiotibiales"]
    };
  }

  return {
    zonaDetectada: "General",
    palabrasClave: ["general", "movilidad", "suave", "respiracion", "sentado"]
  };
}

function buscarEjerciciosCandidatos(consulta, dolorActual) {
  const texto = normalizarTexto(consulta);
  const { zonaDetectada, palabrasClave } = detectarZonaYPrioridades(consulta);

  let candidatos = ejercicios.filter(ejercicio => {
    const contenido = normalizarTexto(
      ejercicio.nombre + " " +
      ejercicio.zona + " " +
      ejercicio.nivel + " " +
      ejercicio.posicion + " " +
      ejercicio.descripcion
    );

    return palabrasClave.some(palabra =>
      contenido.includes(normalizarTexto(palabra))
    );
  });

  if (dolorActual >= 7) {
    candidatos = candidatos.filter(ejercicio =>
      normalizarTexto(ejercicio.nivel) === "baja"
    );
  }

  if (texto.includes("sentado") || texto.includes("sentada") || texto.includes("silla")) {
    const sentados = candidatos.filter(ejercicio =>
      normalizarTexto(ejercicio.posicion).includes("sentado")
    );

    if (sentados.length > 0) {
      candidatos = sentados;
    }
  }

  if (texto.includes("acostado") || texto.includes("acostada") || texto.includes("cama")) {
    const acostados = candidatos.filter(ejercicio =>
      normalizarTexto(ejercicio.posicion).includes("acostado")
    );

    if (acostados.length > 0) {
      candidatos = acostados;
    }
  }

  if (texto.includes("de pie") || texto.includes("parado") || texto.includes("parada")) {
    const dePie = candidatos.filter(ejercicio =>
      normalizarTexto(ejercicio.posicion).includes("de pie")
    );

    if (dePie.length > 0) {
      candidatos = dePie;
    }
  }

  if (candidatos.length === 0) {
    candidatos = ejercicios.filter(ejercicio =>
      normalizarTexto(ejercicio.zona) === normalizarTexto(zonaDetectada)
    );
  }

  if (candidatos.length === 0) {
    candidatos = ejercicios.filter(ejercicio =>
      normalizarTexto(ejercicio.nivel) === "baja"
    );
  }

  return candidatos.slice(0, 8);
}

app.post("/ia/recomendacion", async (req, res) => {
  try {
    const {
      uid,
      consulta,
      movilidad,
      objetivo,
      apoyoFisico,
      dolorActual
    } = req.body;

    if (!consulta || consulta.trim().length < 10) {
      return res.status(400).json({
        ok: false,
        recomendacion: "Escribe una consulta más detallada. Ejemplo: Tengo dolor leve en rodilla, movilidad baja y quiero ejercicios suaves sentado.",
        ejerciciosRecomendados: []
      });
    }

    const dolor = Number(dolorActual) || 0;
    const { zonaDetectada } = detectarZonaYPrioridades(consulta);
    const candidatos = buscarEjerciciosCandidatos(consulta, dolor);

    const prompt = `
Eres un asistente de apoyo para una app de rehabilitación llamada RehabFit.

IMPORTANTE:
- No eres médico.
- No debes diagnosticar enfermedades.
- No debes prometer curación.
- No recomiendes medicamentos.
- Debes recomendar únicamente ejercicios del catálogo proporcionado.
- Si el dolor es alto, recomienda ejercicios de baja intensidad y consultar a un profesional.
- Responde en español claro, breve y seguro.
- No repitas exactamente la misma recomendación en todas las consultas.
- Adapta la recomendación a la zona afectada detectada.
- Menciona por qué los ejercicios elegidos son adecuados.

Datos del usuario:
- UID: ${uid || "No especificado"}
- Consulta del usuario: ${consulta}
- Zona detectada por el sistema: ${zonaDetectada}
- Movilidad: ${movilidad || "No especificada"}
- Objetivo: ${objetivo || "No especificado"}
- Apoyo físico: ${apoyoFisico || "No especificado"}
- Dolor actual: ${dolor}/10

Catálogo de ejercicios candidatos:
${JSON.stringify(candidatos, null, 2)}

Devuelve SOLO un JSON válido con esta estructura exacta:

{
  "recomendacion": "Texto breve de recomendación. Debe mencionar la zona afectada, explicar cómo estructurar mejor la consulta y agregar una advertencia de seguridad.",
  "idsEjercicios": [1, 2, 3]
}

Reglas:
- idsEjercicios debe tener máximo 5 IDs.
- Los IDs deben existir en el catálogo candidato.
- No inventes ejercicios.
- La recomendación debe variar según la zona afectada y el objetivo del usuario.
- Si el usuario pide ejercicios sentado, prioriza ejercicios en posición sentado.
- Si el usuario menciona espalda, no recomiendes rodilla salvo que esté en el catálogo candidato.
- No agregues texto fuera del JSON.
`;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Falta configurar GEMINI_API_KEY en Render");
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    let textoIA = result.text || "";

    textoIA = textoIA
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let respuestaIA;

    try {
      respuestaIA = JSON.parse(textoIA);
    } catch (errorJson) {
      respuestaIA = {
        recomendacion: textoIA,
        idsEjercicios: candidatos.slice(0, 5).map(ejercicio => ejercicio.id)
      };
    }

    const ids = Array.isArray(respuestaIA.idsEjercicios)
      ? respuestaIA.idsEjercicios
      : [];

    const ejerciciosRecomendados = candidatos.filter(ejercicio =>
      ids.includes(ejercicio.id)
    );

    res.json({
      ok: true,
      zonaDetectada,
      recomendacion: respuestaIA.recomendacion || "Recomendación generada correctamente.",
      ejerciciosRecomendados: ejerciciosRecomendados.length > 0
        ? ejerciciosRecomendados
        : candidatos.slice(0, 5)
    });

  } catch (error) {
    console.error("Error en /ia/recomendacion:", error.message || error);

    const {
      consulta,
      movilidad,
      objetivo,
      apoyoFisico,
      dolorActual
    } = req.body;

    const dolor = Number(dolorActual) || 0;
    const { zonaDetectada } = detectarZonaYPrioridades(consulta || "");
    const candidatos = buscarEjerciciosCandidatos(consulta || "", dolor);

    const recomendacionRespaldo =
      "No se pudo consultar Gemini en este momento, pero RehabFit generó una recomendación de respaldo con base en tu perfil y el catálogo de ejercicios.\n\n" +
      `Zona detectada: ${zonaDetectada}.\n\n` +
      "Cómo estructurar mejor tu consulta:\n" +
      "• Indica la zona afectada: rodilla, hombro, espalda, tobillo, mano, cuello, etc.\n" +
      "• Indica tu dolor actual del 0 al 10.\n" +
      "• Explica tu nivel de movilidad: baja, media o alta.\n" +
      "• Menciona tu objetivo: reducir dolor, mejorar movilidad o fortalecer.\n" +
      "• Indica si necesitas apoyo físico, silla, bastón o ayuda de otra persona.\n\n" +
      "Tomando en cuenta tu perfil:\n" +
      `• Movilidad: ${movilidad || "No especificada"}\n` +
      `• Objetivo: ${objetivo || "No especificado"}\n` +
      `• Apoyo físico: ${apoyoFisico || "No especificado"}\n` +
      `• Dolor actual: ${dolor}/10\n\n` +
      "Recomendación general: realiza ejercicios suaves, lentos y controlados. Detente si el dolor aumenta, aparece inflamación, mareo o inestabilidad.";

    res.json({
      ok: true,
      zonaDetectada,
      recomendacion: recomendacionRespaldo,
      ejerciciosRecomendados: candidatos.slice(0, 5)
    });
  }
});

app.get("/ejercicios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const ejercicio = ejercicios.find(ejercicio => ejercicio.id === id);

  if (!ejercicio) {
    return res.status(404).json({
      mensaje: "Ejercicio no encontrado"
    });
  }

  res.json(ejercicio);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API RehabFit corriendo en el puerto " + PORT);
});