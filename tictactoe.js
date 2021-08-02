let playerXScore = 0;
let playerOScore = 0;
let tieScore = 0;
let grid = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let playerOneTurn = true;
let gameIsOver = false;

let playerXScoreText = document.querySelector(".player-x");
let playerOScoreText = document.querySelector(".player-o");
let tieScoreText = document.querySelector(".tie-score");
let newGameBtn = document.querySelector(".new-game-btn");
let buttons = document.querySelectorAll(".box-btn");

buttons.forEach((currentBtn) => {
	currentBtn.addEventListener("click", handleMove);
});

newGameBtn.addEventListener("click", handleNewGame);

function handleNewGame(e) {
	grid = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	buttons.forEach((e) => {
		e.textContent = "";
		e.style.animation = "none";
	});

	playerOneTurn = true;
	gameIsOver = false;
}

function handleMove(e) {
	if (!gameIsOver) {
		let emptyBox = boxIsEmpty(e);
		if (!emptyBox) {
			return;
		}
		if (playerOneTurn === true) {
			e.target.textContent = "X";
		} else {
			e.target.textContent = "O";
		}
		addMoveToGrid(e);
		checkForWinner(e.target.textContent);

		playerOneTurn = !playerOneTurn;
	}
}

function boxIsEmpty(e) {
	return e.target.textContent === "";
}

function addMoveToGrid(e) {
	let boxId = e.target.id;
	let row = boxId.charAt(1);
	let col = boxId.charAt(3);

	if (playerOneTurn) {
		grid[row - 1][col - 1] = "X";
	} else {
		grid[row - 1][col - 1] = "O";
	}
}

function checkForWinner(player) {
	if (checkVertically(player)) {
		gameOver(player);
	}
	if (checkHorizontally(player)) {
		gameOver(player);
	}
	if (checkDiagonally(player)) {
		gameOver(player);
	}

	let grid2 = grid.filter((x) => x.every((y) => y != ""));
	if (grid2.length === 3) {
		tieScore++;
		gameOver();
	}
}

function equals3(a, b, c) {
	return a == b && b == c && a == c;
}

function winningMovesFlash(a, b, c) {
	console.log(a);
	let box1 = document.getElementById(a);
	let box2 = document.getElementById(b);
	let box3 = document.getElementById(c);
	box1.style.animation = "blink 1s ease-in-out infinite";
	box2.style.animation = "blink 1s ease-in-out infinite";
	box3.style.animation = "blink 1s ease-in-out infinite";
}

function checkVertically(player) {
	for (let i = 0; i < 3; i++) {
		if (grid[0][i] == player) {
			if (equals3(grid[0][i], grid[1][i], grid[2][i])) {
				if (player === "X") {
					let a = "r1c" + (i + 1);
					let b = "r2c" + (i + 1);
					let c = "r3c" + (i + 1);
					winningMovesFlash(a, b, c);
					playerXScore++;
				} else {
					let a = "r1c" + (i + 1);
					let b = "r2c" + (i + 1);
					let c = "r3c" + (i + 1);
					winningMovesFlash(a, b, c);
					playerOScore++;
				}
				return true;
			}
		}
	}
}

function checkHorizontally(player) {
	for (let i = 0; i < 3; i++) {
		if (grid[i][0] == player) {
			if (equals3(grid[i][0], grid[i][1], grid[i][2])) {
				let a = "r" + (i + 1) + "c1";
				let b = "r" + (i + 1) + "c2";
				let c = "r" + (i + 1) + "c3";
				winningMovesFlash(a, b, c);
				if (player === "X") {
					playerXScore++;
				} else {
					playerOScore++;
				}
				return true;
			}
		}
	}
}

function checkDiagonally(player) {
	if (grid[1][1] == player) {
		if (equals3(grid[0][0], grid[1][1], grid[2][2])) {
			winningMovesFlash("r1c1", "r2c2", "r3c3");
			if (player === "X") {
				playerXScore++;
			} else {
				playerOScore++;
			}
			return true;
		}

		if (equals3(grid[0][2], grid[1][1], grid[2][0])) {
			winningMovesFlash("r1c3", "r2c2", "r3c1");
			if (player === "X") {
				playerXScore++;
			} else {
				playerOScore++;
			}
			return true;
		}
	}
}

function gameOver(player) {
	gameIsOver = true;
	playerXScoreText.textContent = `${playerXScore}`;
	playerOScoreText.textContent = `${playerOScore}`;
	tieScoreText.textContent = `${tieScore}`;
	console.log("Game Over");
}
