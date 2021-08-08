const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvasH = canvas.height;
const canvasW = canvas.width;
const gameSound = new Audio('music/gameover.mp3');

let paddle = { h: 50, w: 5 };
let leftPddle = (rightPaddle = ball = {});
let score = 0;
let hiscoreval = 0;
let speedIncriment = 0.6;



setInitialVariable();
drawBall();
drawLeftPaddle();
drawRightPaddle();
drawScore();
drawCenterLine();
moveBall();
moveLeftPaddle();

function setInitialVariable() {

    ball = { x: 150, y: 150, r: 10, dx: 2, dy: 1 };
    leftPddle = { x: 0, y: 125 };
    rightPaddle = { x: canvasW - 5, y: 125 };

}

function moveLeftPaddle() {
    document.addEventListener("mousemove", (e) => {
        leftPddle.y = e.screenY - 350;
    });
}

function detectCollision() {

    // detect Right paddle collison

    if (ball.x > rightPaddle.x - ball.r) {
        ball.dx = -ball.dx;
        gameSound.play();

    }

    // detect Left paddle collison

    if (ball.x < 0 + ball.r + paddle.w && ball.y > leftPddle.y && ball.y < leftPddle.y + paddle.h) {
        ball.dx = -ball.dx + 2 * speedIncriment;
        ball.dy += speedIncriment;
        score++;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        gameSound.play();

    }

    // detect TOP or Bottom collision

    if (ball.y > canvasH - ball.r || (ball.y < 0 + ball.r)) {
        ball.dy = -ball.dy
    }

    // detect Left collision

    if (ball.x < 0 + ball.r) {
        alert("You LOOSE !!");
        setInitialVariable();
        score = 0;
    }


}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    rightPaddle.y = ball.y - paddle.h / 2

    ctx.clearRect(0, 0, canvasW, canvasH);
    detectCollision();

    drawBall();
    drawScore();
    drawLeftPaddle();
    drawRightPaddle();
    drawCenterLine();

    requestAnimationFrame(moveBall);
}

function drawBall() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillstyle = "white" ;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function drawLeftPaddle() {                
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(leftPddle.x, leftPddle.y, paddle.w, paddle.h);
    ctx.fillstyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function drawRightPaddle() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(rightPaddle.x, rightPaddle.y, paddle.w, paddle.h);
    ctx.fillstyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.fillText("Score: " + score, 20, 10);
    ctx.closePath();
}

function drawCenterLine() {
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(150, 0)
    ctx.lineTo(150, canvasH);
    ctx.stroke();
    ctx.closePath();
}

