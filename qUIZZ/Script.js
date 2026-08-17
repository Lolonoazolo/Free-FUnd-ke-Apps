const questions = [{
  question: "Which is the largest animal on earth?",
  answers: [
    { text: "Shark", correct: "false" },
    { text: "Blue Whale", correct: "false" },
    { text: "Lion", correct: "false" },
    { text: "Giraffe", correct: "true" },
  ]
},
{
  question: "Which is the lasrgest Mammel?",
  answers: [
    {
      text: "Shark", correct: "false"
    },
    { text: "Blue Whale", correct: "true" },
    { text: "Lion", correct: "false" },
    { text: "Giraffe", correct: "false" },
  ]
},
{
  question: "which is animal is reffered to as the KING of forest?",
  answers: [
    {
      text: "Shark", correct: "false"
    },
    { text: "Blue Whale", correct: "false" },
    { text: "Lion", correct: "true" },
    { text: "Giraffe", correct: "false" },
  ]
},
{
  question: "which of these is a bird that cannot fly ",
  answers: [
    {
      text: "Eagle", correct: "false"
    },
    { text: "Crow", correct: "false" },
    { text: "Kiwi", correct: "true" },
    { text: "OWl", correct: "false" },
  ]
},
{
  question: "which of these is a reptile",
  answers: [
    {
      text: "Shark", correct: "false"
    },
    { text: "Blue Whale", correct: "false" },
    { text: "Aligator", correct: "true" },
    { text: "Giraffe", correct: "false" },
  ]
}
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML =
    questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;
    button.classList.add("btn");

    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";

  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetState();

  questionElement.innerHTML =
    `You scored ${score} out of ${questions.length}!`;

  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();