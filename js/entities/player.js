import { CONFIG } from "../config.js";

// Nave do jogador: guarda posição, lê o estado dos controles
// e sabe se mover e se desenhar. Não conhece teclado nem loop.
export class Player {
    constructor(canvas) {
        this.canvas = canvas;

        this.width = CONFIG.PLAYER_WIDTH;
        this.height = CONFIG.PLAYER_HEIGHT;

        // Centralizada na horizontal, perto da base do canvas
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - CONFIG.PLAYER_BOTTOM_MARGIN;

        this.speed = CONFIG.PLAYER_SPEED;

        // Estado dos controles (ligado/desligado por quem controla a nave)
        this.movingLeft = false;
        this.movingRight = false;
    }

    // Atualiza a posição a cada quadro
    update() {
        if (this.movingLeft) {
            this.x -= this.speed;
        }

        if (this.movingRight) {
            this.x += this.speed;
        }

        // Impede a nave de sair da tela
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    // Desenha a nave com retângulos (pixel art simples)
    draw(ctx) {
        ctx.fillStyle = CONFIG.PLAYER_COLOR;

        // Canhão
        ctx.fillRect(this.x + 18, this.y, 4, 5);

        // Torre
        ctx.fillRect(this.x + 14, this.y + 5, 12, 5);

        // Corpo
        ctx.fillRect(this.x + 4, this.y + 10, 32, 6);

        // Base
        ctx.fillRect(this.x, this.y + 16, 40, 8);
    }
}

