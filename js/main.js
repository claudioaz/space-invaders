import { CONFIG } from "./config.js";
import { Player } from "./entities/player.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const gameMessage = document.getElementById("game-message");

const player = new Player(canvas);

// Como no original, só pode haver um tiro do jogador na tela por vez
let projectile = null;

let gameRunning = false;

// Pinta o fundo preto (chamada a cada quadro)
function clearScreen() {
    ctx.fillStyle = CONFIG.BACKGROUND;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
}

// Tela mostrada antes de apertar START
function drawWaitingScreen() {
    clearScreen();

    ctx.fillStyle = CONFIG.PLAYER_COLOR;
    ctx.font = "14px monospace";
    ctx.textAlign = "center";

    ctx.fillText("SPACE INVADERS", CONFIG.WIDTH / 2, 80);
    ctx.fillText("AGUARDANDO INÍCIO...", CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2);
}

// Lógica: muda o estado do jogo
function update() {
    player.update();

    if (projectile) {
        projectile.update();

        // Tiro saiu pelo topo: libera para um novo disparo
        if (projectile.isOffScreen()) {
            projectile = null;
        }
    }
}

// Visual: desenha o estado atual
function draw() {
    clearScreen();
    player.draw(ctx);

    if (projectile) {
        projectile.draw(ctx);
    }
}

// Game Loop: roda uma vez por quadro enquanto o jogo estiver ativo
function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    gameMessage.style.display = "none";

    console.log("Space Invaders iniciado!");

    requestAnimationFrame(gameLoop);
}

// Teclado: só liga e desliga as flags da nave
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        player.movingLeft = true;
        event.preventDefault();
    }

    if (event.code === "ArrowRight" || event.code === "KeyD") {
        player.movingRight = true;
        event.preventDefault();
    }

    if (event.code === "Space") {
        event.preventDefault();

        // Só atira com o jogo ativo e sem outro tiro na tela
        if (gameRunning && !projectile) {
            projectile = player.shoot();
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        player.movingLeft = false;
    }

    if (event.code === "ArrowRight" || event.code === "KeyD") {
        player.movingRight = false;
    }
});

startButton.addEventListener("click", startGame);

drawWaitingScreen();
