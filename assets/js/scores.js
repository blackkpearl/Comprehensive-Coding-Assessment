// Grabs high scores
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Sorts scores from highest to lowest
    highscores.sort(function (a, b) {
        return b.score - a.score;
    })

    // Creates li tag for each high score 
    highscores.forEach(function (score) {
        var listTag = document.createElement("li");
        listTag.textContent = score.initials + " - " + score.score;

        // Display 
        var olEl = document.getElementById("highscores");
        olEl.appendChild(listTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;
console.log(clearHighscores)

// Run function when page loads
printHighscores();