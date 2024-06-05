const quiz = [
    {
        question: "1- Se você tem um triângulo com ângulos de 60°, 60° e 60°, qual é o nome desse tipo de triângulo?",
        answers: ["Triângulo equilátero", "Triângulo escaleno", "Triângulo retângulo", "Triângulo isósceles"],
        correct: 0
    },
    {
        question: "2- Qual é o resultado de 3x + 5 = 14?",
        answers: ["x = 3", "x = 1", "x = 2", "x = 4"],
        correct: 0
    },
    {
        question: "3- : Qual é a classe gramatical da palavra 'feliz' na frase 'Ela está feliz'?",
        answers: ["Adjetivo", "Substantivo", "Verbo", "Advérbio"],
        correct: 0
    },
    {
        question: "4- Qual dos seguintes autores escreveu 'Dom Casmurro'?",
        answers: ["Machado de Assis", "José de Alencar", "Graciliano Ramos", "Jorge Amado"],
        correct: 0
    },
    {
        question: "5- Qual é a capital do Canadá?",
        answers: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        correct: 0
    },
    {
        question: "6- Qual é o rio mais extenso do mundo?",
        answers: ["Rio Amazonas", "Rio Nilo", "Rio Yangtzé", "Rio Mississippi"],
        correct: 0
    },
    {
        question: "7- Em que ano começou a Primeira Guerra Mundial?",
        answers: ["1914", "1905", "1923", "1939"],
        correct: 0
    },
    {
        question: "8- Quem foi o primeiro presidente do Brasil?",
        answers: ["Deodoro da Fonseca", "Getúlio Vargas", "Juscelino Kubitschek", "João Goulart"],
        correct: 0
    },
    {
        question: "9-Qual filósofo é conhecido por dizer 'Penso, logo existo'?",
        answers: ["René Descartes", "Aristóteles", "Platão", "Sócrates"],
        correct: 0
    },
    {
        question: "Qual pintor é conhecido por suas obras com o estilo de 'cubismo'?",
        answers: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function shuffleAnswers(answers) {
    const shuffled = answers
        .map((answer, index) => ({ answer, index }))
        .sort(() => Math.random() - 0.5);
    return shuffled;
}

function updateQuestion() {
    const questionElement = document.querySelector('.questao');
    const counterElement = document.querySelector('.contador');
    const answerButtons = document.querySelectorAll('.botao');

    const currentQuestion = quiz[currentQuestionIndex];
    
    const shuffledAnswers = shuffleAnswers(currentQuestion.answers);

    questionElement.textContent = currentQuestion.question;
    counterElement.textContent = `${currentQuestionIndex + 1}/${quiz.length}`;

    // Atualiza os botões de resposta com as respostas embaralhadas
    answerButtons.forEach((button, index) => {
        button.textContent = shuffledAnswers[index].answer;
        button.classList.remove('verde', 'vermelho'); // Limpa as classes de cor anteriores
        button.onclick = () => checkAnswer(shuffledAnswers[index].index);
    });
}

function checkAnswer(selectedIndex) {
    const answerButtons = document.querySelectorAll('.botao');
    const currentQuestion = quiz[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        answerButtons.forEach(button => {
            if (button.textContent === currentQuestion.answers[selectedIndex]) {
                button.classList.add('verde'); // Adiciona classe verde para resposta correta
            }
        });
        correctAnswers++;
    } else {
        answerButtons.forEach(button => {
            if (button.textContent === currentQuestion.answers[selectedIndex]) {
                button.classList.add('vermelho'); // Adiciona classe vermelha para resposta errada
            }
            if (button.textContent === currentQuestion.answers[currentQuestion.correct]) {
                button.classList.add('verde'); // Destaca a resposta correta em verde
            }
        });
        wrongAnswers++;
    }

    // Desabilita cliques adicionais após responder
    answerButtons.forEach(button => {
        button.onclick = null;
    });

    if (wrongAnswers > 3) {
        alert("Você errou mais de 3 questões. Por favor, reinicie o jogo.");
        resetGame();
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                updateQuestion();
            } else {
                showFinalScore();
            }
        }, 1000); // Aguarda 1 segundo antes de avançar para a próxima pergunta
    }
}

function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    updateQuestion();
    
    const questoesContainer = document.querySelector('.questoes-container');
    questoesContainer.style.display = 'flex'; // Exibe o contêiner de questões
    
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.style.display = 'none'; // Oculta o contêiner de pontuação final
}

function showFinalScore() {
    const finalScore = document.querySelector('.final-score');
    const scoreContainer = document.querySelector('.score-container');
    const questoesContainer = document.querySelector('.questoes-container');
    
    finalScore.textContent = `Parabéns, você completou o quiz! Pontuação final: ${correctAnswers} de ${quiz.length}`;
    
    questoesContainer.style.display = 'none'; // Oculta o contêiner de questões
    scoreContainer.style.display = 'block'; // Exibe o contêiner de pontuação final
}

document.addEventListener('DOMContentLoaded', () => {
    updateQuestion();

    const resetButton = document.querySelector('.reiniciar-jogo-botao');
    resetButton.addEventListener('click', resetGame);
});