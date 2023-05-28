// variable to keep track of quiz advancement
var currentQuestionIndex = 0;
//time left value here
var timer = 100;
console.log(timer);

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


// console.log(timerEl);

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class" , 'hide');

  // start timer
  timeLeft = setInterval(clockTick, 1000);
  console.log(timer)

  // show starting time
  timerEl.textContent = timer;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // console.log(currentQuestion);

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; //think dot notation

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
  
}

function questionClick(event) {
  // console.log(event.target);
  var buttonEl = event.target;
  console.log(buttonEl.value);

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value != questions[currentQuestionIndex].answer) {

    // penalize time
    timer = timer-20;
  
   
    // display new time on page
   timerEl.textContent = timer;

  // flash right/wrong feedback on page for half a second

  feedbackEl.textContent = "Wrong";

  feedbackEl.removeAttribute("class", "hide");

  setTimeout(cleearFeedback , 5000);
  function cleearFeedback () {
    feedbackEl.setAttribute("class", "hide");
  }

  } else {
    feedbackEl.textContent = "Correct";
  }

  currentQuestionIndex++;
  // check if we've run out of questions or if time ran out?
  if (currentQuestionIndex == questions.length || timer <= 0) {

    //if it did ???
    quizEnd();

  } else {
    getQuestion(currentQuestionIndex);
    
    // if it didnt??
  }
    // move to next question


    
}



function quizEnd() {
  // stop timer
  clearInterval(timeLeft);
  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class', "hide");

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = timer;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  
  // update time
  timerEl.textContent = timer; 

  // decrement the variable we are using to track time
  timer--;
  
  // update out time

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials) {

    // get saved scores from localstorage, or if not any, set to empty array
    
    var highscores = localStorage.getItem("")
      JSON.parse() /* what would go inside the PARSE??*/ || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(""));

    // redirect to next page
    window.location.href = '/highscores.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
