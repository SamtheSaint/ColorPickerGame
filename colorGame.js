function pickRandomColor() {
    return Math.floor(Math.random() * colorArray.length)
}

function generateRandomColors(num = 6) {
    colorArray = []
    for (var i = 0; i < num; i++) {
        red = Math.floor(Math.random() * 256)
        green = Math.floor(Math.random() * 256)
        blue = Math.floor(Math.random() * 256)
        colorArray.push("rgb(" + red + ", " + green + ", " + blue + ")")
    }
}

var setCorrectColor = function() {
    document.getElementById("correct_color").innerText = correctColor
}

var squares = document.getElementsByClassName("square")

var assignColors = function() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colorArray[i];
    }
    if (gameMode == "easy") {
        for (var i = 3; i < 6; i++) {
            squares[i].style.backgroundColor = "rgb(35, 35, 35)"
        }
    }
}

var assignClickListener = function() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            pickedColor = this.style.backgroundColor
            console.log("picked: " + pickedColor)
            game()
        })
    }
}

function message(msg) {
    document.getElementById("message").innerText = msg
}

var game = function() {
    if (pickedColor !== undefined) {
        if (pickedColor === correctColor) {
            message("Correct!!!")
            colorArray = colorArray.map(color => correctColor)
            assignColors()
            document.getElementById("header").style.backgroundColor = correctColor

        } else {
            message("Try Again :(")
            colorArray = colorArray.map(color => color === pickedColor ? "rgb(35, 35, 35)" : color)
            assignColors()
        }
    }
}

function gameModeClickListeners() {
    buttons = document.querySelectorAll("li#modes>button")
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].classList.toggle("active")
            }
            gameMode = gameMode === "easy" ? "hard" : "easy"
            newGame(gameMode)
        })
    }
}

function newGameClickListeners() {
    document.getElementById("new_game").addEventListener("click", newGame)
}

var gameMode = "easy"
var colorArray = undefined
var correctColor = undefined
var pickedColor = undefined

function newGame() {
    message("")
    document.getElementById("header").style.backgroundColor = "rgb(66, 135, 245)"
    generateRandomColors(gameMode === "easy" ? 3 : 6)
    correctColor = colorArray[pickRandomColor()]
    setCorrectColor()
    assignColors()
}

gameModeClickListeners()
newGameClickListeners()
assignClickListener()
newGame()