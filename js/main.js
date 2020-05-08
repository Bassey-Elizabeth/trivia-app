

const questions = [
    {
        question: 'A dark room is filled with many black and many white socks, how many socks would you pick to get a pair of same color?',
        answers: [
            {text: "3", correct: true},
            {text: "4", correct: false},
            {text: "2", correct: false}
        ]
    },
    {
        question: 'How many eggs does a peacock lay?',
        answers: [
            {text: "1", correct: false},
            {text: "3", correct: false},
            {text: "none", correct: true}
        ]
    },
    {
        question: 'what do snowmen eat for breakfast?',
        answers: [
            {text: "Frosted flakes", correct: true},
            {text: "Frozen flakes", correct: false},
            {text: "Corn flakes", correct: false}
        ]
    },
    {
        question: 'Where can you find an ocean without water?',
        answers: [
            {text: "In Thailand", correct: false},
            {text: "In a desert", correct: false},
            {text: "On a map", correct: true}
        ]
    },
    {
        question: 'How do you eat an elephant with one hand?',
        answers: [
            {text: 'Bit by bit', correct: false},
            {text: 'One at a time', correct: false},
            {text: 'None of the above', correct: true}
        ]
    },
];


//DOM variables
const startPage =  document.querySelector('.start-page');
const startButton = document.querySelector('.start-btn');
const questionContainerElements = document.querySelector('.question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-btns');
const currentScore = document.querySelector('.current-score');
const gameContainer = document.querySelector('.game-container');
const nextButton = document.querySelector('.next-btn');
const gameOver = document.querySelector('.game-over');
const totalScore = document.querySelector('.total-score');
const currentQuestion = document.querySelector('.quest-num');

let shuffledQuestions, currentQuestionNum, currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
    if (currentQuestionIndex + 1 > questions.length ) {
        nextButton.classList.add('hide');
        gameOver.classList.remove('hide');
    }
});


//function startgame 
function startGame() {
    startButton.classList.add('hide');
    startPage.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionContainerElements.classList.remove('hide');
    gameContainer.classList.remove('hide');
    setNextQuestion();
    showProgress();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
    currentQuestionNum = currentQuestionIndex + 1;
    currentQuestion.innerHTML = `${currentQuestionNum}/5`;
    currentScore.innerHTML = `SCORE:${score}`;
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        // startButton.classList.remove('hide');
    }
 
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');
        score += 1;
    } else {
        element.classList.add('wrong');
        score = 0;
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function remark(){
    const remark = document.querySelector(".remark");
    if(score<=2) {
        remark.textContent="Oh..oh..Your score is quite low! You can do better!";
    }
    else if(score>=3&&score<=4){
        remark.textContent="Nice try.. You can do even more!";
    }
    else{
        remark.textContent="Excellent! You're a genius!";
    }
}

