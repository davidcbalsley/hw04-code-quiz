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

function showStartScreen () {
    // Show header, description, and start button
    var headerEl = document.createElement("h1");
    var descriptionEl = document.createElement("p");
    var startQuizButton = document.createElement("button");

    headerEl.textContent = "Coding Quiz Challenge";
    descriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizButton.textContent = "Start Quiz";

    playAreaEl.append(headerEl);
    playAreaEl.append(descriptionEl);
    playAreaEl.append(startQuizButton);
}

// On initial page load, show start screen
showStartScreen();