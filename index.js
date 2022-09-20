
const btns = document.querySelectorAll(".btn");
const startBtn = document.querySelectorAll(".start");
const letters = document.querySelectorAll(".letter");
const startGame = document.querySelector(".start-game");
const startModal = document.querySelector(".start-modal")
const gameContainer = document.querySelector(".game-container");
const gameEnd = document.querySelector(".game-end");
const winner = document.querySelector(".winner-letter");
const result = document.querySelector(".result-info");
const resultContainer = document.querySelector(".result");
const nextOption = document.querySelectorAll(".next");
const currentPlayer = document.querySelector(".turn");
const you = document.querySelector(".player");
const cpu = document.querySelector(".cpu-letter");
const myScore = document.querySelector(".my-score");
const tieNum = document.querySelector(".tie-num");
const cpuScore = document.querySelector(".cpu-score");
const round = document.querySelector(".round");
const restart = document.querySelector(".restart");
const confirmRestart = document.querySelector(".confirm-restart");
const restartBtns = document.querySelectorAll(".restart-btn");

let playerLetter = "X", opponentLetter = "", opponent = "";
let myCurrentScore = Number(myScore.textContent);
let cpuCurrentScore = Number(cpuScore.textContent);
let currentTieNum = Number(tieNum.textContent);

let previousLetter =  true;

letters.forEach(letter => {
    letter.classList.add("transparent");
});

const removePickedClass = () => {
    letters.forEach(letter => {
        letter.classList.remove("letter-picked");
    });
};

letters.forEach(letter =>
    letter.addEventListener('click', () => {
        playerLetter = letter.dataset.value;
        removePickedClass();
        letter.classList.add("letter-picked");
    }));

const confirmLetter = () => {
    if (playerLetter === "X") {
        opponentLetter = "O";
    } else {
        opponentLetter = "X";
    }
};

startBtn.forEach(btn => btn.addEventListener('click', (e) => {
    confirmLetter();
    opponent = e.target.value;
    you.textContent = `${playerLetter} (YOU)`;
    cpu.textContent = `${opponentLetter} ${opponent === "cpu" ? " (CPU)" : " (PLAYER2)"}`;

    gameContainer.style.display = "grid";
    startGame.classList.add("slide-up");
    if (opponent === "cpu") {
        if (opponentLetter === "X") {
            setTimeout(() => {
                cpuPlayHandler(btnArray);
                currentPlayer.textContent = "O TURN";
            }, 700);
        }
    }
}));

let btnArray = [
    [btns[0].textContent, btns[1].textContent, btns[2].textContent],
    [btns[3].textContent, btns[4].textContent, btns[5].textContent],
    [btns[6].textContent, btns[7].textContent, btns[8].textContent]
];

const allBtn = [
    [btns[0], btns[1], btns[2]],
    [btns[3], btns[4], btns[5]],
    [btns[6], btns[7], btns[8]]
];

const announceWinner = (letter, outcome) => {
    setTimeout(() => {
        gameEnd.style.display = "grid";
        resultContainer.classList.add("slide-down");
        winner.setAttribute("src", `./images/icon-${letter}.svg`);
        result.textContent = outcome;
        gameContainer.classList.add("blurContainer");
    }, 500);
};

const clearPlayedLetters = () => {
    btns.forEach(btn => {
        btn.textContent = "";
        if (btn.disabled === true) {
            btn.disabled = false;
        }
    });
    btnArray = btnArray.map(arr => arr.map(item => item = ""));
};

nextOption.forEach(option => option.addEventListener('click', (e) => {
    removePickedClass();
    clearPlayedLetters();
    startGame.classList.remove("slide-up");

    winner.style.display = "block";
    round.textContent = "TAKES THE ROUND";

    gameEnd.style.display = "none";
    gameContainer.classList.remove("blurContainer");
    result.textContent = "";

    if (e.target.value === "quit") {
        gameContainer.style.display = "none";
        startGame.style.display = "grid";
        resultContainer.classList.remove("slide-down");
        myScore.textContent = 0;
        cpuScore.textContent = 0;
        tieNum.textContent = 0;
    }

    if (e.target.value === "next-round") {
        startGame.style.display = "none";
        if (opponent === "cpu") {
            if (opponentLetter === "X") {
                setTimeout(() => {
                    cpuPlayHandler(btnArray);
                }, 700);
                currentPlayer.textContent = "O TURN";
            }
        }
        currentPlayer.textContent = "X TURN";
    }
}));

restart.addEventListener('click', () => {
    gameContainer.classList.add("blurContainer");
    confirmRestart.style.display = "flex";
});

restartBtns.forEach(btn => btn.addEventListener('click', () => {
    gameContainer.classList.remove("blurContainer");
    if (btn.dataset.action === "yes") {
        clearPlayedLetters();
        currentPlayer.textContent = "X TURN";
        confirmRestart.style.display = "none";
        if (opponent === "cpu" && opponentLetter === "X") {
            setTimeout(() => {
                cpuPlayHandler(btnArray);
                currentPlayer.textContent = "O TURN";
            }, 700);
        }
    } else {
        confirmRestart.style.display = "none";
    }
}));

const ticTactToe = (arr) => {

    confirmLetter();

    if ((arr[0][0] === playerLetter && arr[0][1] === playerLetter && arr[0][2] === playerLetter) ||
        (arr[1][0] === playerLetter && arr[1][1] === playerLetter && arr[1][2] === playerLetter) ||
        (arr[2][0] === playerLetter && arr[2][1] === playerLetter && arr[2][2] === playerLetter) ||

        (arr[0][0] === playerLetter && arr[1][0] === playerLetter && arr[2][0] === playerLetter) ||
        (arr[0][1] === playerLetter && arr[1][1] === playerLetter && arr[2][1] === playerLetter) ||
        (arr[0][2] === playerLetter && arr[1][2] === playerLetter && arr[2][2] === playerLetter) ||

        (arr[0][0] === playerLetter && arr[1][1] === playerLetter && arr[2][2] === playerLetter) ||
        (arr[0][2] === playerLetter && arr[1][1] === playerLetter && arr[2][0] === playerLetter)) {

        announceWinner(playerLetter.toLocaleLowerCase(), "YOU WON!");
        myCurrentScore += 1;
        myScore.textContent = myCurrentScore;
        previousLetter = false;
    }
    else if ((arr[0][0] === opponentLetter && arr[0][1] === opponentLetter && arr[0][2] === opponentLetter) ||
        (arr[1][0] === opponentLetter && arr[1][1] === opponentLetter && arr[1][2] === opponentLetter) ||
        (arr[2][0] === opponentLetter && arr[2][1] === opponentLetter && arr[2][2] === opponentLetter) ||

        (arr[0][0] === opponentLetter && arr[1][0] === opponentLetter && arr[2][0] === opponentLetter) ||
        (arr[0][1] === opponentLetter && arr[1][1] === opponentLetter && arr[2][1] === opponentLetter) ||
        (arr[0][2] === opponentLetter && arr[1][2] === opponentLetter && arr[2][2] === opponentLetter) ||

        (arr[0][0] === opponentLetter && arr[1][1] === opponentLetter && arr[2][2] === opponentLetter) ||
        (arr[0][2] === opponentLetter && arr[1][1] === opponentLetter && arr[2][0] === opponentLetter)) {

        announceWinner(opponentLetter.toLocaleLowerCase(), "YOU LOSE!");
        cpuCurrentScore += 1;
        cpuScore.textContent = cpuCurrentScore;
    }
    else {
        let count = 0;
        arr.forEach(a => a.forEach(item => item === "" ? count++ : count += 0));
        if (count === 0) {
            announceWinner("", "THIS GAME IS A TIE!");
            currentTieNum += 1;
            tieNum.textContent = currentTieNum;
            winner.style.display = "none";
            round.textContent = "OOPS!";
        } else {
            return;
        }
    }
};

const checkForAvailableSpaces = () => {
    const availableSapces = [];
    btnArray.forEach((arr, index) => arr.forEach((a, ind) => {
        if (a == "") {
            availableSapces.push([index, ind]);
        }
    }));
    return availableSapces;
};

const cpuPlayHandler = (arr) => {

    confirmLetter();

    let availableSapces = [];
    availableSapces = checkForAvailableSpaces();

    const spacesLength = availableSapces.length
    let position = availableSapces[Math.floor(Math.random() * spacesLength)];

    arr[position[0]][position[1]] = opponentLetter;
    allBtn[position[0]][position[1]].textContent = opponentLetter;

    const current = allBtn[position[0]][position[1]];
    current.disabled = true;
    current.classList.add("bump");
    setTimeout(() => {
        current.classList.remove("bump");
    }, 300);

    currentPlayer.textContent = `${playerLetter} TURN`;

    availableSapces = checkForAvailableSpaces();
};


btns.forEach(((btn, index) => btn.addEventListener('click', (e) => {

    if (opponent === "player2") {

        if (previousLetter) {
            btn.textContent = "X";
            btnArray[Math.floor(index / 3)][Number(e.target.value)] = "X";
            currentPlayer.textContent = `O TURN`;
            previousLetter = false;
        } else {
            btn.textContent = "O";
            btnArray[Math.floor(index / 3)][Number(e.target.value)] = "O";
            currentPlayer.textContent = `X TURN`;
            previousLetter = true;
        }

    } else {
        btn.textContent = playerLetter;
        btnArray[Math.floor(index / 3)][Number(e.target.value)] = playerLetter;

        setTimeout(() => {
            if (result.textContent === "YOU WON!") {
                return;
            } else {
                cpuPlayHandler(btnArray);
            }
            ticTactToe(btnArray);
        }, 1000);

        currentPlayer.textContent = `${opponentLetter} TURN`;
    }

    btn.disabled = true;

    ticTactToe(btnArray);
})));