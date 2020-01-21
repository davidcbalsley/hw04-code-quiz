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
    var answerDiv = document.createElement("div");

    function getQuestion() {
        var questionEl = document.createElement("h3");
        questionEl.textContent = questions[0].title;
        playAreaEl.append(questionEl);
        playAreaEl.append(answerDiv);

        for (var k = 0; k < questions[0].choices.length; k++) {
            var answerEl = document.createElement("div");
            answerEl.textContent = questions[0].choices[k];
            answerEl.setAttribute("data-id", k);

            answerDiv.append(answerEl);
        }
    }

    answerDiv.addEventListener("click", function(event) {
        var element = event.target;

        // 
    })

    // Randomly pull new question from list of available questions

    // At first, pull just first question and display it
    // var questionEl = document.createElement("h3");
    // questionEl.textContent = questions[0].title;
    // playAreaEl.append(questionEl);

    // for (var k = 0; k < questions[0].choices.length; k++) {
    //     var answerEl = document.createElement("div");
    //     answerEl.textContent = questions[0].choices[k];

    //     playAreaEl.append(answerEl);
    // }

    // Clear the screen
    $("#play-area").empty();

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