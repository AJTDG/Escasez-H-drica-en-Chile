// Obtener elementos del DOM
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const progressBar = document.getElementById('progress-bar');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Array con las 10 preguntas y respuestas
const questions = [
    {
        question: '¿Cómo se define la escasez hídrica según los documentos presentados?',
        answers: [
            { text: 'a) Es un fenómeno puramente meteorológico, resultado de la falta de lluvias.', correct: false },
            { text: 'b) Es sinónimo de sequía y ocurre cuando la demanda supera la oferta de agua.', correct: false },
            { text: 'c) Tiene que ver con la gestión humana del agua y se relaciona con que la demanda supera la oferta, generando un déficit asociado a un daño.', correct: true }
        ]
    },
    {
        question: 'Según los informes, ¿qué posición ocupa Chile en el ranking mundial de países con mayor Riesgo Hídrico al año 2025?',
        answers: [
            { text: 'a) Entre los 10 países con menor riesgo, gracias a su abundancia de glaciares.', correct: false },
            { text: 'b) Entre los 50 países con mayor riesgo, pero sin una situación crítica aún.', correct: false },
            { text: 'c) Entre los 30 países con mayor Riesgo Hídrico.', correct: true }
        ]
    },
    {
        question: 'De acuerdo con el estudio de Taucare et al. (2024), ¿cuál es el principal factor que impulsa el agotamiento de los acuíferos en Chile Central?',
        answers: [
            { text: 'a) La megasequía que comenzó en 2010 es el único factor determinante.', correct: false },
            { text: 'b) Una disminución natural en la recarga de agua es la causa principal del problema.', correct: false },
            { text: 'c) El aumento sostenido de las extracciones de agua subterránea y la sobreasignación de derechos.', correct: true }
        ]
    },
    {
        question: '¿Qué porcentaje de la superficie chilena se reporta afectada por sequía, desertificación y suelo degradado, según la "Radiografía del Agua"?',
        answers: [
            { text: 'a) Aproximadamente el 50% de la superficie.', correct: false },
            { text: 'b) El 76% de la superficie.', correct: true },
            { text: 'c) Menos del 25% del territorio.', correct: false }
        ]
    },
    {
        question: '¿Cuál es el sector que más consume agua proveniente de fuentes superficiales y subterráneas (Huella Hídrica Azul) en Chile?',
        answers: [
            { text: 'a) El sector minero, debido a sus procesos intensivos.', correct: false },
            { text: 'b) El sector agrícola, que utiliza el 87% de este tipo de consumo a nivel nacional.', correct: true },
            { text: 'c) El sector de agua potable y saneamiento, que abastece a la población.', correct: false }
        ]
    },
    {
        question: '¿Cómo afectó la Megasequía (desde 2010) la tendencia de los niveles de agua subterránea en Chile Central?',
        answers: [
            { text: 'a) Revirtió la tendencia de descenso, provocando un aumento en los niveles de agua.', correct: false },
            { text: 'b) Exacerbó el descenso ya existente, con un aumento significativo en la tasa de declive de aproximadamente 30 cm/año.', correct: true },
            { text: 'c) No tuvo un impacto estadísticamente significativo en los niveles, ya que la sobreexplotación era anterior.', correct: false }
        ]
    },
    {
        question: '¿Qué revelan los documentos sobre la relación entre los Derechos de Aprovechamiento de Aguas (DAA) otorgados y la captación real de agua a nivel nacional en Chile?',
        answers: [
            { text: 'a) La captación de agua es ligeramente mayor que los DAA otorgados, lo que indica un uso eficiente.', correct: false },
            { text: 'b) Los DAA consuntivos y permanentes registrados superan más de seis veces la captación real de agua a nivel nacional.', correct: true },
            { text: 'c) Ambos volúmenes son aproximadamente iguales, demostrando un equilibrio en la gestión del recurso.', correct: false }
        ]
    },
    {
        question: '¿Cuál es una de las principales limitaciones de la red de monitoreo de aguas subterráneas en Chile, según los documentos?',
        answers: [
            { text: 'a) Monitorea principalmente pozos en rocas duras, descuidando los acuíferos aluviales de mayor importancia.', correct: false },
            { text: 'b) Se basa en un modelo hidrogeológico simplificado, monitoreando principalmente acuíferos aluviales y con una escasez de datos y baja frecuencia de medición en muchas estaciones, especialmente del Maule al sur.', correct: true },
            { text: 'c) Los datos recopilados son demasiado recientes para establecer tendencias significativas a largo plazo.', correct: false }
        ]
    },
    {
        question: 'Respecto al Código de Aguas en Chile y los derechos de aprovechamiento, ¿cuál de las siguientes afirmaciones es correcta?',
        answers: [
            { text: 'a) El Código de Aguas de 1981 prohíbe estrictamente la comercialización de derechos de agua para evitar la especulación.', correct: false },
            { text: 'b) Históricamente, los derechos de agua se otorgaban de forma perpetua y podían ser libremente transables, aunque una reforma reciente (Ley 21.435) ha cambiado el carácter perpetuo para los nuevos derechos.', correct: true },
            { text: 'c) El estado tiene un control estricto y centralizado sobre todas las asignaciones de derechos de agua, con una regulación constante y mínima participación privada.', correct: false }
        ]
    },
    {
        question: 'Según el Índice Estandarizado de Precipitación y Evapotranspiración (SPEI), ¿qué regiones de Chile han mostrado los cambios más significativos en la sequía meteorológica en los últimos 15 años (2000-2014)?',
        answers: [
            { text: 'a) Las regiones australes (Aysén y Magallanes) son las más afectadas, aunque en menor proporción que la zona central.', correct: false },
            { text: 'b) Las regiones de Tarapacá y Antofagasta en el norte grande, con un aumento generalizado de precipitaciones en el altiplano.', correct: false },
            { text: 'c) Las regiones entre Atacama y Los Lagos, con la mayor intensidad entre Vallenar y Elqui, registrando una disminución de precipitaciones y un aumento de la evapotranspiración potencial.', correct: true }
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    // Limpiar el contenedor anterior
    questionContainer.innerHTML = '';
    
    // Actualizar la barra de progreso
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Obtener la pregunta actual
    const currentQuestion = questions[currentQuestionIndex];
    
    // Mostrar el texto de la pregunta
    const questionText = document.createElement('h2');
    questionText.className = 'question-text';
    questionText.innerText = currentQuestion.question;
    questionContainer.appendChild(questionText);

    // Crear y mostrar los botones de respuesta
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        questionContainer.appendChild(button);
    });
}

function selectAnswer(button, isCorrect) {
    if (isCorrect) {
        score++;
    }
    
    // Deshabilitar todos los botones y mostrar feedback visual
    Array.from(questionContainer.getElementsByClassName('answer-btn')).forEach(btn => {
        const answerObj = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText);
        if (answerObj.correct) {
            btn.classList.add('correct');
        }
        btn.disabled = true;
    });
    
    if (!isCorrect) {
        button.classList.add('incorrect');
    }

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 500); // Espera 0.5 segundos
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreText.innerText = `Tu puntuación final es: ${score} de ${questions.length} correctas.`;
}

// Event listener para el botón de reinicio
restartButton.addEventListener('click', startQuiz);

// Iniciar el cuestionario al cargar la página
startQuiz();