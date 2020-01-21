var playAreaEl = document.getElementById("play-area");

// When user presses start button:
// - Clear screen
// - Randomly pull new question from list of available questions
// - Start timer

// When user answers question:
// - If user answers question correctly, display 'Correct!'
// - If user answers question incorrectly, display 'Wrong!' and decrease time by 15

// When user answers five questions, or when timer runs out:
// - Show screen to allow user to enter initials

// When user enters initials and presses submit button:
// - Show Highscores screen with sorted results
// - Highscores screen should have 'Go Back' and 'Clear Highscores' buttons
// - If user clicks 'Go Back' button, show the start screen
// - If user clicks 'Clear Highscores' button, clear the high scores and update the screen

/*
playAreaEl.addEventListener("click", function(event) {
    var element = event.target;

    // Handle button clickss
    if (element.matches("button")) {
        var buttonId = element.getAttribute("data-id");

        // switch (element.textContent) {
        switch (buttonId) {
            case "start-quiz":
                // alert("You pressed the start button!");
        }
    }
}) */

function runQuiz() {
    var timerEl = document.getElementById("timer-value");
    var maxTimer = 75; // The maximum number of seconds for the game
    var timeLeft = 0;  // The number of seconds remaining in a round of play
    var wrongAnswerDecrement = 15; // The number of seconds to subtract for each wrong answer
    var questionEl = document.createElement("h3");
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "answer-div");
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "result-div");

    // Run the timer
    function runTimer() {
        // Set time left to the maximum amount of time and update the onscreen timer
        timeLeft = maxTimer;
        timerEl.textContent = timeLeft;

        var timerInterval = setInterval(function() {
            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft === 0) { // Game over, man!
                // End the game
            }
        }, 1000);
    }

    // Get a set of questions and answers and display them
    function getQuestion() {
        questionEl = document.createElement("h3");
        questionEl.textContent = questions[0].title;
        playAreaEl.append(questionEl);
        playAreaEl.append(answerDiv);

        for (var k = 0; k < questions[0].choices.length; k++) {
            var answerEl = document.createElement("div");
            answerEl.textContent = questions[0].choices[k];
            answerEl.setAttribute("data-question-id", 0);
            answerEl.setAttribute("data-answer-id", k);

            answerDiv.append(answerEl);
        }

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

        // Get next question
        getNextQuestion();
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

    // Fill in the text for the header, description, and start button
    headerEl.textContent = "Coding Quiz Challenge";
    descriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizButton.textContent = "Start Quiz";

    // Show header, description, and start button
    playAreaEl.append(headerEl);
    playAreaEl.append(descriptionEl);
    playAreaEl.append(startQuizButton); 
}

// On initial page load, show start screen
showStartScreen();