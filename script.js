// 1. DATOS DE LAS TÉCNICAS (Base de datos simulada)
const baseDeDatosTecnicas = {
    juegos: {
        titulo: "Juegos de Coordinación (Infantil)",
        videoUrl: "https://www.youtube.com/embed/9Xh9X7lO2gA", // Reemplazar con video real de juegos
        puntosClave: [
            "Desarrollo de la lateralidad.",
            "Saltos con ambos pies y un pie.",
            "Carreras de relevos con conos."
        ],
        estrategia: "El objetivo principal es la diversión y la alfabetización motriz. No forzar la técnica de competición, sino crear una base de movimiento."
    },
    saltos: {
        titulo: "Técnica de Salto de Longitud (Cadetes)",
        videoUrl: "https://www.youtube.com/embed/5t5pXvXwXwA", // Reemplazar con video real
        puntosClave: [
            "Carrera de aproximación: 12 a 16 zancadas progresivas.",
            "Batida: Pie activo, rodilla arriba, mirada al frente.",
            "Vuelo: Técnica de 'tijera' para mantener equilibrio.",
            "Caída: Meter los pies y llevar los brazos atrás."
        ],
        estrategia: "En los primeros saltos, prioriza la seguridad de la batida (no pasar la tabla). En el último salto, arriesga buscando el centímetro extra."
    },
    velocidad: {
        titulo: "Técnica de Carrera de Velocidad (Juveniles)",
        videoUrl: "https://www.youtube.com/embed/7Y8Xh9X7lO2", // Reemplazar con video real
        puntosClave: [
            "Fase de aceleración: Inclinación del tronco hacia adelante.",
            "Fase de máxima velocidad: Tronco erguido, relajación de hombros.",
            "Elevación de rodillas y contacto con el suelo (metatarso).",
            "Zancada amplia y frecuencia de paso."
        ],
        estrategia: "Táctica de carrera: No salir a tope los primeros 10 metros, mantener la relajación para no gastar energía antes de la meta."
    }
};

// 2. LÓGICA DE NAVEGACIÓN Y MOSTRAR TÉCNICAS
document.addEventListener('DOMContentLoaded', () => {
    
    const botonesTecnica = document.querySelectorAll('.ver-tecnica');
    const seccionDetalle = document.getElementById('detalle-tecnica');
    const btnCerrar = document.getElementById('cerrar-detalle');
    
    // Elementos del DOM a actualizar
    const tituloTecnica = document.getElementById('titulo-tecnica');
    const videoPlayer = document.getElementById('video-player');
    const listaTecnica = document.getElementById('lista-tecnica');
    const textoEstrategia = document.getElementById('texto-estrategia');

    // Función para mostrar la técnica
    function mostrarTecnica(idTecnica) {
        const data = baseDeDatosTecnicas[idTecnica];
        
        if (data) {
            tituloTecnica.textContent = data.titulo;
            videoPlayer.src = data.videoUrl;
            
            // Limpiar y llenar la lista de puntos clave
            listaTecnica.innerHTML = '';
            data.puntosClave.forEach(punto => {
                const li = document.createElement('li');
                li.textContent = punto;
                listaTecnica.appendChild(li);
            });

            textoEstrategia.textContent = data.estrategia;

            // Mostrar la sección y hacer scroll
            seccionDetalle.classList.remove('hidden');
            seccionDetalle.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Event Listeners para los botones de las tarjetas
    botonesTecnica.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const tecnicaId = e.target.getAttribute('data-tecnica');
            mostrarTecnica(tecnicaId);
        });
    });

    // Cerrar la sección de detalles
    btnCerrar.addEventListener('click', () => {
        seccionDetalle.classList.add('hidden');
        videoPlayer.src = ""; // Detener el video al cerrar
        document.getElementById('categorias').scrollIntoView({ behavior: 'smooth' });
    });

    // 3. LÓGICA DEL QUIZ INTERACTIVO
    const preguntas = [
        {
            pregunta: "¿Cuál es el ángulo ideal de despegue en el salto de longitud?",
            opciones: ["15° a 20°", "30° a 45°", "60° a 90°"],
            correcta: 0 // Índice de la respuesta correcta
        }
    ];

    let indicePregunta = 0;
    const preguntaTexto = document.getElementById('pregunta-texto');
    const opcionesContainer = document.getElementById('opciones-container');
    const resultadoQuiz = document.getElementById('resultado-quiz');

    function cargarPregunta() {
        const preguntaActual = preguntas[indicePregunta];
        preguntaTexto.textContent = preguntaActual.pregunta;
        opcionesContainer.innerHTML = '';
        resultadoQuiz.textContent = '';

        preguntaActual.opciones.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.classList.add('btn-opcion');
            boton.textContent = opcion;
            boton.addEventListener('click', () => verificarRespuesta(index, boton));
            opcionesContainer.appendChild(boton);
        });
    }

    function verificarRespuesta(indexSeleccionado, botonSeleccionado) {
        const preguntaActual = preguntas[indicePregunta];
        
        // Deshabilitar todos los botones para evitar doble clic
        const todosLosBotones = document.querySelectorAll('.btn-opcion');
        todosLosBotones.forEach(btn => btn.disabled = true);

        if (indexSeleccionado === preguntaActual.correcta) {
            botonSeleccionado.classList.add('correcto');
            resultadoQuiz.textContent = "¡Excelente! Respuesta correcta.";
            resultadoQuiz.style.color = "#4CAF50";
        } else {
            botonSeleccionado.classList.add('incorrecto');
            // Mostrar cuál era la correcta
            todosLosBotones[preguntaActual.correcta].classList.add('correcto');
            resultadoQuiz.textContent = "Incorrecto. La respuesta correcta está marcada en verde.";
            resultadoQuiz.style.color = "#f44336";
        }
    }

    // Iniciar el quiz
    cargarPregunta();
});