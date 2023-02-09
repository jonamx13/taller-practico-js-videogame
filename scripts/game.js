const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

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

    canvasSize = Number(canvasSize.toFixed(2))
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10) - 1;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {
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
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

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
}

function movePlayer() {
    /* Checking if the player is in the same position as the gift. */
    /* Clamping coincidence to 3 decimals */
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY; 

    if (giftCollision) { levelWin() }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) { levelFail() }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    level++;
    startGame();
}

function levelFail() {
    lives --;

    if ( lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    clearInterval(timeInterval);
    recordStorage();
}



window.addEventListener('keydown',moveByKeys);
/* Adding an event listener to the buttons. */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

