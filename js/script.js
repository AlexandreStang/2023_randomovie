const colors = {pos: "green-txt", mid: "yellow-txt", neg: "red-txt"}

document.addEventListener('DOMContentLoaded', function () {

    // INTERACTIVE SCORE SLIDER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Variables
    const scorePercent = document.getElementById("min-score-percentage");
    const scoreSlider = document.getElementById("min-score-input");

    // Set score percentage and color based on the default score
    const defaultScore = scoreSlider.value;
    scorePercent.innerHTML = defaultScore + "%";
    scorePercent.classList.add(getColor(defaultScore));

    // Change score percentage and color based on the new value
    scoreSlider.addEventListener("input", function (e) {

        var score = this.value
        scorePercent.innerHTML = score + "%";

        // Remove all color classes
        scorePercent.classList.remove(colors.pos);
        scorePercent.classList.remove(colors.mid);
        scorePercent.classList.remove(colors.neg);

        // Add the appropriate color class
        scorePercent.classList.add(getColor(score));

    });

    // POPUP INTERACTION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

});

// Return the appropriate color class based on the score percentage
function getColor(score) {

    if (score > 69) {
        return colors.pos;
    } else if (score > 39) {
        return colors.mid;
    } else {
        return colors.neg;
    }

}

function loadPopup() {
    document.getElementById("popup-container").style.display = "block";
}

function reloadPopup() {

}

function closePopup() {
    document.getElementById("popup-container").style.display = "none";
}



