

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartButton");
const X_element = document.querySelector("#X_points");
const O_element = document.querySelector("#O_points");
const container = document.querySelector("#cellContainer");



const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

 points = [0, 0]



let currentPlayer = "X";
let running = true;
let options = ["", "", "", "", "", "", "", "", ""]



 intializeGame = () => {
    cells.forEach(cell => cell.addEventListener("click", Cellclick));
    restartBtn.addEventListener("click", restart);
    statusText.textContent = `It's ${currentPlayer}'s turn!`
    X_element.textContent = `X: ${points[0]} points`
    O_element.textContent = `O: ${points[1]} points`
}

intializeGame();


function Cellclick() {
    const index = this.dataset.cellIndex;
    
    if (options[index] != "" || !running) {
        return;
    }
    updateCell(this, index)

};

const updateCell = (cell, index) => {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `It's ${currentPlayer}'s turn!`
};

const checkWinner = async () => {
    for (item of winConditions) {
        const A = options[item[0]]
        const B = options[item[1]]
        const C = options[item[2]]
        if (A === "" || B === "" || C === "") {
            continue
        } else if (A === B && B === C) {
            await showWinner(item)
            running = false;
            statusText.textContent = `${currentPlayer} wins!`
            if (currentPlayer === "X") {
                points[0]++
            } else {
                points[1]++
            }
            X_element.textContent = `X: ${points[0]} points`
            O_element.textContent = `O: ${points[1]} points`
            break;
        }
    }
     if (running && options.every(option => option !== "")) {
        running = false;
        statusText.textContent = `Draw!`
     } else if (running) {
        switchPlayer();
     }
}

function restart() {
    if (!running) {
        container.style.color = "black"
        cells.forEach(cell => {cell.style.backgroundColor = "pink"})
        container.style.color = "rgba(0, 0, 0, 0)"
        setTimeout(reset(), 1000)
    }
} 

function showWinner(indexes) {
    return new Promise (resolve => {
        let count = 0;
        const propToWatch = ["color", "borderColor", "backgroundColor"]
        let prop = [];
        indexes.forEach(index => {
                cells[index].style.color = "pink"
                cells[index].style.borderColor = "black"
                cells[index].style.backgroundColor = "black"
                count++;
                if (count === 3 ) {
                    setTimeout(resolve(), 1000)
                }
            })
    })
}

function reset() {
        cells.forEach(cell => cell.textContent = "")
        cells.forEach(cell => {cell.style.color = "black"})
        options = ["", "", "", "", "", "", "", "", ""]
        running = true;
        switchPlayer()
}

