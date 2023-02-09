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
    (playerPosition.y - elementSize) < 0 ? playerPosition.y : playerPosition.y -= elementSize;
    startGame();
}
function moveLeft() {
    console.log('Me quiero mover hacia izquierda');(playerPosition.x - elementSize) < elementSize ? playerPosition.x : playerPosition.x -= elementSize;
    startGame();
}
function moveRight() {
    console.log('Me quiero mover hacia derecha');
    (playerPosition.x + elementSize) > canvasSize ? playerPosition.x : playerPosition.x += elementSize;
    startGame();
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');
    (playerPosition.y + elementSize) > canvasSize ? playerPosition.y : playerPosition.y += elementSize;
    startGame();
}