var board, pen;
var player, enemy, goal;
var gameResult; // 1 for incomplete, 2 for win, 3 for loss

function isColliding(box1, box2){
	if(Math.abs(box1.x - box2.x) <= 50 && Math.abs(box1.y - box2.y) <= 50){
		return true;
	} else {
		return false;
	}
}

function render(){
	update();

	if(gameResult == 1){
		draw();
		window.requestAnimationFrame(render);
	} else if(gameResult == 2){
		var again = confirm("You won. Do you want to play again?");
		if(again){
			init();
		}
	} else if(gameResult == 3){
		var again = confirm("You lost. Do you want to play again?");
		if(again){
			init();
		}
	}
}

function update(){
	if(isColliding(player, enemy)){
		gameResult = 3;
		return;
	} else if(isColliding(player, goal)){
		gameResult = 2;
		return;
	}

	// player
	player.x += player.speed;

	// enemy
	if(enemy.speed > 0){
		if(enemy.y == 500 - enemy.h){
			enemy.speed = -1 * enemy.speed;
		} 
	} else {
		if(enemy.y == 0){
			enemy.speed = -1 * enemy.speed;
		}
	}
	
	enemy.y = enemy.y + enemy.speed;
}

function draw(){
	pen.clearRect(0, 0, 500, 500);

	// pen.fillStyle = player.style;
	// pen.fillRect(player.x, player.y, player.w, player.h);
	pen.drawImage(player.image, player.x, player.y, player.w, player.h);

	// pen.fillStyle = enemy.style;
	// pen.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
	pen.drawImage(enemy.image, enemy.x, enemy.y, enemy.w, enemy.h);

	// pen.fillStyle = goal.style;
	// pen.fillRect(goal.x, goal.y, goal.w, goal.h);
	pen.drawImage(goal.image, goal.x, goal.y, goal.w, goal.h);
}

function init(){
	board = document.getElementById("board");
	pen = board.getContext('2d');

	player = {
		x: 0,
		y: 225,
		w: 50,
		h: 50,
		style: 'red',
		image: document.getElementById('playerImg'),
		speed: 0
	};

	enemy = {
		x: 225,
		y: 0,
		w: 50,
		h: 50,
		style: 'green',
		image: document.getElementById('enemyImg'),
		speed: 2
	};

	goal = {
		x: 450,
		y: 225,
		w: 50,
		h: 50,
		style: 'blue',
		image: document.getElementById('goalImg'),
	};

	gameResult = 1; // incomplete

	window.addEventListener('mousedown', function(){
		player.speed = 5;
	});
	window.addEventListener('mouseup', function(){
		player.speed = 0;
	});

	window.requestAnimationFrame(render);
}

init();