const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10) - 1;

    startGame();
}

function startGame() {
    console.log({ canvasSize, elementSize });

    /* Drawing the X emoji in the canvas. */
    game.font = elementSize + 'px Verdana';

    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize);
    }
    
}