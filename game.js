const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
}
let enemyPositions = [];

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
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({ map, mapRows, mapRowCols });

    showLives();

    enemyPositions = [];
    /* Clearing the canvas. */
    game.clearRect(0,0,canvasSize, canvasSize);
    /* Drawing the map in the canvas. */
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize  * (rowI + 1);

            /* Setting play on initial position. */
            if(col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                playerPosition.y = posY;
                console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }

            game.fillText(emoji, posX, posY)
        })
    });

    movePlayer();
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
    //     }
    // }
}

function movePlayer() {
    /* Checking if the player is in the same position as the gift. */
    /* Clamping coincidence to 3 decimals */
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY; 

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste contra un enemigo');
    lives --;

    console.log(lives);

    if ( lives <= 0) {
        level = 0;
        lives = 3;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego');
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]
    //console.log(heartsArray);

    /* Clearing the span element. */
    spanLives.innerHTML = "";

    /* Adding the hearts to the span element. */
    heartsArray.forEach(heart => {
        spanLives.append(heart);
    });
}

function showTime() {
    spanTime = Date.now() - timeStart;
}

window.addEventListener('keydown',moveByKeys);
/* Adding an event listener to the buttons. */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

/*Enum object for key entries*/ 
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
    (playerPosition.y - elementSize) < 0 ? console.log('OUT') : playerPosition.y -= elementSize;
    startGame();
}
function moveLeft() {
    console.log('Me quiero mover hacia izquierda');(playerPosition.x - elementSize) < elementSize ? console.log('OUT') : playerPosition.x -= elementSize;
    startGame();
}
function moveRight() {
    console.log('Me quiero mover hacia derecha');
    (playerPosition.x + elementSize) > canvasSize ? console.log('OUT') : playerPosition.x += elementSize;
    startGame();
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');
    (playerPosition.y + elementSize) > canvasSize ? console.log('OUT') : playerPosition.y += elementSize;
    startGame();
}