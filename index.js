var questionsArr = [
  {
    question: 'What is the mascot of University of Florida?',
    answer: 'Gator',
    options: ['Gator', 'Bulldog', 'Seminole', 'Hoosier']
  },
  {
    question: 'When was University of Florida founded?',
    answer: '1905',
    options: ['1865', '1975', '1899', '1905']
  },
  {
    question: 'What are the official colors of the University of Florida?',
    answer: 'Blue and orange',
    options: ['Blue and red', 'Red and white', 'Blue and orange', 'Orange and red']
  },
  {
    question: 'What city is the University of Florida located in?',
    answer: 'Gainesville',
    options: ['Orlando', 'Gainesville', 'Tampa', 'Jacksonville']
  },
  {
    question: 'What is the University of Florida’s official fight song?',
    answer: 'Orange and Blue',
    options: ['Orange and Blue', 'Gator Chomp', 'Go Gators Go', 'The Swamp Song']
  }
];

const quizElement = document.getElementById('quiz');
let questionIndex = 0;
let timer;
let score = 0;

function initQuiz() {
  quizElement.innerHTML = '';
  const previousScore = localStorage.getItem('previous-score');

  if (previousScore) {
    const scoreShowed = document.createElement('p');
    scoreShowed.textContent = `Previous Score: ${previousScore}%`;
    quizElement.appendChild(scoreShowed);
  }

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Quiz!';
  startButton.id = 'start-quiz';
  startButton.addEventListener('click', startQuiz);
  quizElement.appendChild(startButton);
}

function startQuiz() {
  questionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  if (questionIndex >= questionsArr.length) {
    const finalScore = Math.round((score / questionsArr.length) * 100);
    localStorage.setItem('previous-score', finalScore);
    initQuiz();
    return;
  }

  const currentQuestion = questionsArr[questionIndex];
  quizElement.innerHTML = '';

  const questionText = document.createElement('p');
  questionText.textContent = currentQuestion.question;
  quizElement.appendChild(questionText);

  const choices = document.createElement('div');
  currentQuestion.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => {
      if (option === currentQuestion.answer) score++;
      clearInterval(timer);
      questionIndex++;
      showQuestion();
    });
    choices.appendChild(btn);
  });
  quizElement.appendChild(choices);

  const countdown = document.createElement('p');
  countdown.textContent = '30';
  quizElement.appendChild(countdown);

  timer = setInterval(function() {
    let time = Number(countdown.textContent);
    if (time > 0) {
      countdown.textContent = time - 1;
    } else {
      clearInterval(timer);
      questionIndex++;
      showQuestion();
    }
  }, 1000);
}

window.addEventListener('load', initQuiz);