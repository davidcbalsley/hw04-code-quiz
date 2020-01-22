var playAreaEl = document.getElementById("play-area");

// Generate a random integer
function getRandomInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
}

// When user presses start button:
// - Clear screen
// - Randomly pull new question from list of available questions
// - Start timer

// When user answers five questions, or when timer runs out:
// - Show screen to allow user to enter initials

// When user enters initials and presses submit button:
// - Show Highscores screen with sorted results
// - Highscores screen should have 'Go Back' and 'Clear Highscores' buttons
// - If user clicks 'Go Back' button, show the start screen
// - If user clicks 'Clear Highscores' button, clear the high scores and update the screen

function runQuiz() {
    /* Elements */
    var timerEl = document.getElementById("timer-value");
    var questionEl = document.createElement("h3");
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "answer-div");
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "result-div");
    var indicesOfQuestionsAlreadyAsked = [];
    
    /* Variables */
    var maxTimer = 75; // The maximum number of seconds for the game
    var timeLeft = 0;  // The number of seconds remaining in a round of play
    var maxAnswerDisplayTime = 2; // The number of seconds to display the 'Correct!' or 'Wrong!'
    var displayTimeLeft = 0; // The number of seconds remaining for displaying 'Correct' or 'Wrong'
    var wrongAnswerDecrement = 15; // The number of seconds to subtract for each wrong answer
    var numQuestionsAsked = 0; // The number of questions that we've asked
    var maxNumQuestions = 5; // The total number of questions to ask
    var roundTimerInterval;

    /* Functions */

    // Run the timer
    function runTimer() {
        // Set time left to the maximum amount of time and update the onscreen timer
        timeLeft = maxTimer;
        timerEl.textContent = timeLeft;

        roundTimerInterval = setInterval(function() {
        // var roundTimerInterval = setInterval(function() {
            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft <= 0) { 
                clearInterval(roundTimerInterval);
            }
        }, 1000);
    }

    // Get a set of questions and answers and display them
    function getQuestion() {
        questionEl = document.createElement("h3");  
        playAreaEl.append(questionEl);
        playAreaEl.append(answerDiv);

        var currentQuestionIndex = 0; // Index into the qeustions array for the current question

        // Randomly choose a question that has not yet been asked
        do {
            currentQuestionIndex = getRandomInt(questions.length); 
        } while (indicesOfQuestionsAlreadyAsked.indexOf(currentQuestionIndex) >= 0);

        questionEl.textContent = questions[currentQuestionIndex].title;

        for (var k = 0; k < questions[currentQuestionIndex].choices.length; k++) {
            var answerEl = document.createElement("div");
            answerEl.textContent = (k + 1) + " " + questions[currentQuestionIndex].choices[k];
            answerEl.setAttribute("data-question-id", currentQuestionIndex);
            answerEl.setAttribute("data-answer-id", k);

            answerDiv.append(answerEl);
        }

        // Record that we already asked this question
        indicesOfQuestionsAlreadyAsked.push(currentQuestionIndex);

        // Increment number of questions asked
        numQuestionsAsked++;

        playAreaEl.append(resultDiv);
    }

    // Get next question
    function getNextQuestion() {
        // Clear out the current question and set of answers
        questionEl.textContent = "";
        $("#answer-div").empty();

        // Show the next question
        getQuestion();
    }

    // Show a message in the result div
    // When user answers question:
    // - If user answers question correctly, display 'Correct!'
    // - If user answers question incorrectly, display 'Wrong!' and decrease time by wrongAnswerDecrement
    function showAnswerResult(message) {
        // Clear the result div
        $("#result-div").empty();

        // Rule line
        var hrEl = document.createElement("hr");

        // Text 
        var resultTextEl = document.createElement("p");
        resultTextEl.textContent = message;
        resultTextEl.style.fontStyle = "italic";

        resultDiv.append(hrEl);
        resultDiv.append(resultTextEl);

        displayTimeLeft = maxAnswerDisplayTime;

        // Display 'Correct!' or 'Wrong!' for a little bit, then make it go away
        var resultTimerInterval = setInterval(function() {
            displayTimeLeft--;

            if (displayTimeLeft === 0) {
                clearInterval(resultTimerInterval);
                $("#result-div").empty();
            }
        }, 1000);
    }

    answerDiv.addEventListener("click", function(event) {
        var element = event.target;

        var questionIndex = element.getAttribute("data-question-id");
        var answerIndex = parseInt(element.getAttribute("data-answer-id"));

        // Answered correctly
        if (answerIndex === parseInt(questions[questionIndex].choices.indexOf(questions[questionIndex].answer))) {
            // Show that user answered correctly
            showAnswerResult("Correct!");
        } else { // Answered incorrectly
            showAnswerResult("Wrong!");
            timeLeft -= wrongAnswerDecrement;
        }

        if ((numQuestionsAsked < maxNumQuestions) && (numQuestionsAsked < questions.length)) {
            // Get next question
            getNextQuestion();
        } else { 
            // Asked all the questions -- stop the timer and show all done screen
            clearInterval(roundTimerInterval);
            showAllDoneScreen(timeLeft);
        }
    })

    // Randomly pull new question from list of available questions

    // Clear the screen
    $("#play-area").empty();

    // Start the timer
    runTimer();

    // Pull the first question
    getQuestion();
} 

// Display the start screen
function showStartScreen() {
    // Elements
    var headerEl = document.createElement("h1");
    var descriptionEl = document.createElement("p");
    var startQuizButton = document.createElement("button");

    // Event listener for start button
    startQuizButton.addEventListener("click", function() {
        runQuiz();
    })

    // Clear the screen
    $("#play-area").empty();

    // Fill in the text for the header, description, and start button
    headerEl.textContent = "Coding Quiz Challenge";
    descriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizButton.textContent = "Start Quiz";

    // Show header, description, and start button
    playAreaEl.append(headerEl);
    playAreaEl.append(descriptionEl);
    playAreaEl.append(startQuizButton); 
}

function showAllDoneScreen(userScore) {
    // Elements
    var headerEl = document.createElement("h3");
    var scoreReportEl = document.createElement("p");
    var initalsSpan = document.createElement("span");

    // Fill in the text for the header and the score report
    headerEl.textContent = "All done!";
    scoreReportEl.textContent = "Your final score is " + userScore + ".";

    // Clear the screen
    $("#play-area").empty();

    // Show our elements
    playAreaEl.append(headerEl);
    playAreaEl.append(scoreReportEl);
}

// On initial page load, show start screen
showStartScreen();