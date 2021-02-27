// DOM variables 
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");

// Quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Audio
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // Clears out last question choices
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;
        // Display on page
        choicesEl.appendChild(choiceNode);
    })
}

function questionClick() {
    //    Checks user time and penalizes 
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        //   Displays new time on page
        timerEl.textContent = time;

        // Incorrect answer audio 
        sfxWrong.play();

        feedbackEl.textContent = "Wrong!";
    } else {
        //  Correct answer audio
        sfxRight.play();

        feedbackEl.textContent = "Correct!";
    }

    //    Display right/wrong slide
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    //    Next question
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // Stop timer
    clearInterval(timerId);

    // Display end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // Show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // Hide questions screen
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // Current time
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        // Save to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // Show highscores
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// Saves user initials
submitBtn.onclick = saveHighscore;

// User click to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;