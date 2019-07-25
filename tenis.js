
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 10;

let ballX = cw / 2 
let ballY = ch / 2 

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 4;
let ballSpeedY = 4;

let winning = false;

function player() {
	ctx.fillStyle = 'lime';
	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
	  if (ballX - paddleWidth <= playerX && ballX >= playerX && ballY >= playerY - ballSize && ballY <= playerY + paddleHeight && ballSpeedX <= -1){	
	  	 ballSpeedX = -ballSpeedX;
	  	 let deltaPlayerY = ballY - (playerY + paddleWidth / 2); // Makes ball faster depend on which side we hit the ball
	  	 ballSpeedY = deltaPlayerY * 0.25;
	  	 console.log(ballSpeedY);
   }
}

function AI() {
	ctx.fillStyle = 'yellow';
	ctx.fillRect(aiX, aiY,  paddleWidth, paddleHeight);
	console.log(ballX + ballSize + paddleWidth >= aiX );
	if (ballX + ballSize >= aiX && ballX + ballSize + paddleWidth >= aiX && ballY <= aiY + paddleHeight && ballY >= aiY - ballSize && ballSpeedX >= 1){
    ballSpeedX = -ballSpeedX; 
   }
}
function table() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cw, ch);

	for (let linePosition = 20;linePosition < ch;linePosition = linePosition + 30) {
		ctx.fillStyle = 'gray';
		ctx.fillRect(cw / 2 - lineWidth / 2,linePosition,lineWidth,lineHeight);
	}
}
let cbArray = document.getElementsByClassName("cbg");
	console.log(cbArray);
function toggleCB(cb) {
	let cbArray = document.getElementsByClassName("cbg");
	console.log(cbArray);
	for (let i = 0;i < cbArray.length; i++) {
		cbArray[i].style.background = "#EEE";
		cbArray[i].dataset.checked = 0;
	}
	if (cb.dataset.checked == 0) {
				cb.style.background = "#89D814";
				cb.dataset.checked = 1;
	} else {
				cb.style.background = "#EEE";
				cb.dataset.checked = 0;
	}
}

function customAlert(dialog) {
	this.render = function() {
		let winW = window.innerWidth;
		let winH = window.innerHeight;
		const dialoverlay = document.getElementById('dialoverlay');
		const dialbox = document.getElementById('dialbox');
		dialoverlay.style.display = 'block';
		dialoverlay.style.height = winH+'px';
		dialbox.style.left = (winH / 2) - (550 / 2) + "px";
		dialbox.style.top = "100px";
		dialbox.style.display = "flex";
		dialbox.style.justifycontent = "center";
		dialbox.style.alignitems = "center";
		document.getElementById('dialboxhead').innerHTML = "Thank you for game!"
		document.getElementById('dialboxbody').innerHTML = dialog;
		document.getElementById('dialboxfooter').innerHTML = '<button style="justify-content: center;" onclick="Alert.ok()">OK</button>';
	}
	this.ok = function() {
		document.getElementById('dialbox').style.display = "none";
		document.getElementById('dialoverlay').style.display = "none";
		location.reload();
	}

}

let Alert = new customAlert();



function ballReset() {
	ballX = cw/2;
	ballY = ch/2;
	ballSpeedX = 4;
	ballSpeedY = 4;
}
topCanvas = canvas.offsetTop;

function playerPosition(event) {
	playerY = (event.offsetY) - paddleHeight / 2;
	if(playerY >= ch - paddleHeight) {
		playerY = ch - paddleHeight;
	}
	if (playerY <= 0) {
		playerY = 0;
	}
}	
function speedUp() {
	if (ballSpeedX > 0 && ballSpeedX < 16){
		ballSpeedX += 0.33;
	}
	else if (ballSpeedX < 0 && ballSpeedX > -16) {
		ballSpeedX -= 0.33;
	}
	/*if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 0.33;
    }
    else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= 0.33;
    }*/
}
function aiPosition() {
	const middlePaddel = aiY + paddleHeight/2;
	const middleBall = ballY + ballSize/2;
	  if (ballX > 500) { 
        if (middlePaddel - middleBall > 200) {
          aiY -= 24;

        } else if (middlePaddel - middleBall > 50) {
          aiY -= 10;
        }

        else if (middlePaddel - middleBall < -200) {
          aiY += 24;

        } else if (middlePaddel - middleBall < -50) {
          aiY += 10;

        }
       }

      if (ballX <= 500 && ballX > 100) {
        if (middlePaddel - middleBall > 100) {
          aiY -= 3;

        } 
 	if (middlePaddel - middleBall < -100) {
          aiY += 3;

        }
      }
      if (aiY >= ch - paddleHeight) {
        aiY = ch - paddleHeight
      }

      if (aiY <= 0) {
        aiY = 0;
      } 
};

canvas.addEventListener("mousemove",playerPosition)
let playerScore = 0;
let AIScore = 0;

function ball() {
	ctx.beginPath();
	ctx.arc(ballX ,ballY,ballSize,0,10 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	if(ballY <= 0 || ballY + ballSize >= ch) {
		ballSpeedY = -ballSpeedY;
		speedUp();			
	}
	if(ballX <= 0) {
		AIScore++;
		ballReset();
		ballSpeedX = -ballSpeedX;

		console.log(AIScore + " Wynik AI");
	}
	if (ballX + ballSize >= cw) {
		playerScore++;
		ballReset();
		console.log(playerScore + "Wynik Gracza");
	}
}
function score() {
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.font = '200px WHITE';
	ctx.fillText(playerScore,cw/4 - 50,ch/2 + 50);
	ctx.fillText(AIScore,cw/1.333333333333 - 50,ch/2 + 50);
	if (playerScore == 2) {
		Alert.render("Player has won! One more time?");
		winning = true;
		playerScore = 0;
		AIScore = 0;
	}
	if (AIScore == 2) {
		Alert.render("AI has won! One more time?");	 
		winning = true;
		playerScore = 0;
		AIScore = 0;
	}
}
function game() {
	table();
	ball();
	player();
	AI();
	aiPosition();
	score();
};

setInterval(game,16.667);