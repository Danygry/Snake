var blockSize = 25;
var total_row = 17; //totale numero file
var total_col = 17; //totale numero colonne
var board;
var context;
 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Imposta il numero totale di righe e colonne
var speedX = 0;  //Velocità del serpente in coordinate x.
var speedY = 0;  //Velocità del serpente in coordinate y.
 
var snakeBody = [];
 
var foodX;
var foodY;
 
var gameOver = false;
 
window.onload = function () {
    // Imposta altezza e larghezza del tabellone
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
 
    placeFood();
    document.addEventListener("keyup", changeDirection);  //per movimenti
    // Imposta la velocità del serpente
    setInterval(update, 2000 / 10);
}
 
function update() {
    if (gameOver) {
        return;
    }
 
    // Colore sfondo background gioco
    context.fillStyle = "#00A8FF";
    context.fillRect(0, 0, board.width, board.height);
 
    // Impostare il colore e la posizione del cibo
    context.fillStyle = "black";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
 
    // dimensioni corpo serpente dopo aver preso il mangiare
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // Memorizzerà la parte precedente di Snake nella parte corrente
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
    context.fillStyle = "aliceblue";
    snakeX += speedX * blockSize; //aggiornamento della posizione del serpente in coordinate X.
    snakeY += speedY * blockSize;  //aggiornamento della posizione del serpente in coordinate y.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
         
        // Alert mentre si va fuori gioco
        gameOver = true;
        alert("Game Over");
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Alert se Il serpente mangia il proprio corpo
            gameOver = true;
            alert("Game Over");
        }
    }
}
 
// Movimento del serpente - Stiamo usando addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // Se il tasto freccia su viene premuto con questa condizione...
        // Il serpente non si muoverà nella direzione opposta
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If sotto  tasto freccia premuto
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If sinistra  tasto freccia premuto
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If diritta  tasto freccia premuto
        speedX = 1;
        speedY = 0;
    }
}
 
// Posiziona casualmente il cibo
function placeFood() {
 
    // coordinate in x
    foodX = Math.floor(Math.random() * total_col) * blockSize;
     
    // coordinate in y
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function refreshPage(){
    window.location.reload();
}
