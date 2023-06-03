var countdownElement = document.getElementById("countdown");
var numbersElement = document.getElementById("numbers");
var userAnswerElement = document.getElementById("userAnswer");
var answerSection = document.getElementById("answer-section");
var resultElement = document.getElementById("result");
var jugeElement = document.getElementById("juge");
var countdown;

function startGame() {
    var mode = document.getElementById("mode").value;
    document.querySelector('.play h2').classList.add('hide');
    document.querySelector('.play select').classList.add('hide');
    document.querySelector('.play button').classList.add('hide');
    countdownElement.classList.remove("hide");
    countdownElement.innerHTML = "3";
    countdown = setInterval(countdownTimer, 1000);
    setTimeout(function() {
        clearInterval(countdown);
        countdownElement.classList.add("hide");
        numbersElement.classList.remove("hide");
        var numbers = generateNumbers();
        numbers.pop(); // Remove the last number
        showNumbers(mode, numbers);
    }, 4000);
}


function countdownTimer() {
    var count = parseInt(countdownElement.innerHTML);
    if (count > 1) {
        count--;
        countdownElement.innerHTML = count.toString();
    } else {
        countdownElement.innerHTML = "C'est parti !";
    }
}

function generateNumbers() {
    var numbers = [];
    for (var i = 0; i < 10; i++) {
        var randomNumber = Math.random() * Number.MAX_SAFE_INTEGER;
        numbers.push(Math.floor(randomNumber));
    }
    return numbers;
}

function showNumbers(mode, numbers) {
    var index = 0;
    var interval = setInterval(function() {
        if (index < numbers.length) {
            numbersElement.innerHTML = numbers[index].toString();
            index++;
        } else {
            clearInterval(interval);
            answerSection.classList.remove("hide");
            numbersElement.classList.add("hide");
            userAnswerElement.focus();
        }
    }, 1000);
    setTimeout(function() {
        var result = calculateResult(mode, numbers);
        userAnswerElement.dataset.result = result;
    }, (numbers.length + 1) * 1000);
}

function checkAnswer() {
    var userAnswer = parseInt(userAnswerElement.value);
    var result = parseInt(userAnswerElement.dataset.result);
    if (userAnswer === result) {
        jugeElement.innerHTML = "Correct!";
    } else {
        jugeElement.innerHTML = "Incorrect!";
    }
    numbersElement.classList.add("hide");
    resultElement.classList.remove("hide");
    jugeElement.classList.remove("hide");
}

function calculateResult(mode, numbers) {
    var result;
    if (mode === "add") {
        result = numbers.reduce((a, b) => a + b);
    } else if (mode === "sub") {
        result = numbers.reduce((a, b) => a - b);
    } else if (mode === "mul") {
        result = numbers.reduce((a, b) => a * b);
    } else if (mode === "div") {
        result = numbers.reduce((a, b) => a / b);
    }
    return result;
}