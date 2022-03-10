const questionNumber = document.querySelector(".current-question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-box");
const homeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".quiz-over-box");
const countdown = document.querySelector(".time");
const time = 20;
const countdownEl = document.getElementsByClassName(".remaining-time");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

//coundown timer

//push the question into availableQuestions array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}
//set question number and question and option
function getNewQuestion() {
  //set question number
  questionNumber.innerHTML = questionCounter + 1 + "/" + quiz.length;

  //set question text
  //get random question
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  //get the position
  const index1 = availableQuestions.indexOf(questionIndex);
  //remove
  availableQuestions.splice(index1, 1);

  //set options
  //get the length of options
  const optionLen = currentQuestion.option.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.15;
  //creat option in html
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);

    const options = document.createElement("div");
    options.innerHTML = currentQuestion.option[optionIndex];
    options.id = optionIndex;
    options.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    options.className = "option";
    optionContainer.appendChild(options);
    options.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}
function getResult(element) {
  const id = parseInt(element.id);
  if (id === currentQuestion.answer) {
    //green
    element.classList.add("correct");
    correctAnswer++;
    console.log("correct:" + correctAnswer);
  } else {
    //green
    element.classList.add("wrong");
  }
  attempt++;
  unclickableOptions();
}
//make the user onclikable when the user select
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function next() {
  if (questionCounter === quiz.length) {
    console.log("پایان آمون");
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  //hide quiz-box
  quizBox.classList.add("hide");
  //show result box
  resultBox.classList.remove("hide");
  quizResult();
}
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attemp").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
  const percentage = (correctAnswer / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML =
    percentage.toFixed(2) + "/100";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswer + "/" + quiz.length;
}

var myVar;

function startQuiz() {
  myVar = setTimeout(function () {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
  }, 60000 * time);
  //hide home box
  homeBox.classList.add("hide");
  //show quizBox
  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
}
