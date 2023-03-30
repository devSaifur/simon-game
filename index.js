let gamePattern = []

let userClickedPattern = []

const buttonColors = ["red", "blue", "green", "yellow"]

const allBtn = document.querySelectorAll(".btn")

const h1 = document.getElementById("level-title")

let level = 0

let started = false

const soundBlue = new Audio ("sounds/blue.mp3")
const soundGreen = new Audio ("sounds/green.mp3")
const soundYellow = new Audio ("sounds/yellow.mp3")
const soundRed = new Audio ("sounds/red.mp3")
const soundWrong = new Audio ("sounds/wrong.mp3")

document.addEventListener("keypress", function() {
    if (!started) {
        nextSequence()
        started = true
    }
})

for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].addEventListener("click", (e) => {
        let userChosenColor = e.target.getAttribute("id")
        userClickedPattern.push(userChosenColor)

        playAudio(userChosenColor)
        checkAnswer(userClickedPattern.length - 1)

        let animatedBtn = document.getElementById(e.target.id)
        animatePress(animatedBtn)
    })
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        gameOver()
    }
}

function nextSequence() {
    userClickedPattern = []

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColors[randomNumber]

    gamePattern.push(randomChosenColour)

    let randomBtn = document.getElementById(randomChosenColour)
    
    randomBtn.classList.add("pressed")
    setTimeout(() => {
        randomBtn.classList.remove("pressed")
    }, 200)

    playAudio(randomChosenColour)

    level++

    h1.innerText = `Level ${level}`
}

function playAudio(key) {
    switch (key) {
        case "blue" : soundBlue.play()
        break

        case "green" : soundGreen.play()
        break

        case "yellow" : soundYellow.play()
        break

        case "red" : soundRed.play()
        break

        default : soundWrong.play()
    }
}

function animatePress(currentColour) {
    currentColour.classList.add("pressed")
    setTimeout(() => {
        currentColour.classList.remove("pressed")
    }, 100)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

function gameOver() {
    playAudio("wrong")
    h1.innerText = "Game Over, Press Any Key to Restart"

    let body = document.querySelector("body")
    body.classList.add("game-over")
    setTimeout(() => {
        body.classList.remove("game-over")
    }, 200)

    startOver()
}
