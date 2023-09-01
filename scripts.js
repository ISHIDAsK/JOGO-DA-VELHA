const cellELements = document.querySelectorAll("[data-cell]");
const board = document.querySelector('[data-board]')
const winningMessegeTextElement = document.querySelector('[data-winning-messege-text]')
const winningMessege = document.querySelector('[data-winning-messege]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4 ,7],
    [2, 5 ,8],
    [0, 4 ,8],
    [2, 4, 6],

]

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellELements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }

    isCircleTurn = false;
    setBoardHoverClass()
    winningMessege.classList.remove("show-winning-messege")
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessegeTextElement.innerText = 'Empate!' 
    }else {
        winningMessegeTextElement.innerText = isCircleTurn 
        ? ' O Venceu!' 
        : " X Venceu!"
    }

    winningMessege.classList.add('show-winning-messege')
}

const checkForWin= (currentPlayer) => {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellELements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellELements].every(cell => {
       return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn){
        board.classList.add('circle')
    }else {
        board.classList.add('x')
    }
};

const placeMark = (cell, classeToAdd) => {
    cell.classList.add(classeToAdd);
};
const swapTurns = () => {
    isCircleTurn = !isCircleTurn
    setBoardHoverClass();
}
const handleClick = (e) => {

    // Colocar a marca (x ou O)

    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd)
    
    // Verificar por empate
    const isDraw = checkForDraw()
    if (isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    }else{
    //mudar símbolo
    swapTurns();
    }
    
};

startGame();

restartButton.addEventListener('click', startGame);