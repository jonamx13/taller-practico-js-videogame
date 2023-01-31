const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

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
    game.textAlign = 'end';

    /* Splitting the map into rows and columns. */
    const map = maps[2];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({ map, mapRows, mapRowCols });

    /* Drawing the map in the canvas. */
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize  * (rowI + 1);
            game.fillText(emoji, posX, posY)
        })
    });

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
    //     }
    // }
}


window.addEventListener('keydown',moveByKeys);
/* Adding an event listener to the buttons. */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

const moves = {
    GamerMode: {
        Up: 'w',
        Left: 'a',
        Right: 'd',
        Down: 's'
    },
    mortalMode: {
        Up: 'ArrowUp',
        Left: 'ArrowLeft',
        Right: 'ArrowRight',
        Down: 'ArrowDown'
    }
    
}

function moveByKeys(event) {
    const pressedKey = event.key;

    pressedKey == moves.GamerMode.Up ||
    pressedKey == moves.mortalMode.Up ?
    moveUp() :
    pressedKey == moves.GamerMode.Left ||
    pressedKey == moves.mortalMode.Left ?
    moveLeft() :
    pressedKey == moves.GamerMode.Right ||
    pressedKey == moves.mortalMode.Right ?
    moveRight() :
    pressedKey == moves.GamerMode.Down ||
    pressedKey == moves.mortalMode.Down ?
    moveDown() :
    console.log(pressedKey);
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
}
function moveLeft() {
    console.log('Me quiero mover hacia izquierda');
}
function moveRight() {
    console.log('Me quiero mover hacia derecha');
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');
}