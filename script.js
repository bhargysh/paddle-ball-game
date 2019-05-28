var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); //rendering
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleXpos = (canvas.width - paddleWidth) / 2; //position where paddle starts
var rightPressed = false;
var leftPressed = false;
var interval = setInterval(draw, 10);

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status: 1 };
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX = (c * (brickWidth+brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight+brickPadding)) + brickOffsetTop;
            if(bricks[c][r].status == 1) { //if brick is not hit by ball draw it
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            else {
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "purple";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0; //hit by ball
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleXpos, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy * 1.4; //ball is faster when it hits the paddle
    } else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleXpos && x < paddleXpos + paddleWidth) {
            dy = -dy;
        } //is center of ball between left and right corner of paddle
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if(rightPressed & paddleXpos < canvas.width - paddleWidth) {
        paddleXpos += 4;
    }
    else if(leftPressed & paddleXpos > 0) {
        paddleXpos -= 4;
    }
    x += dx;
    y += dy;
}

function keyDownHandler(event) {
    if(event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    if(event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    if(event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false); // when keydown event is triggered on any key, keyDownHandler() will be executed
document.addEventListener("keyup", keyUpHandler, false);
interval;