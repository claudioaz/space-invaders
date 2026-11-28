import { CONFIG } from "../config.js";

// Projétil disparado pela nave: sobe em linha reta até sair da tela.
export class Projectile {
    constructor(x, y) {
        this.width = CONFIG.PROJECTILE_WIDTH;
        this.height = CONFIG.PROJECTILE_HEIGHT;

        // (x, y) é o canto superior esquerdo do tiro
        this.x = x;
        this.y = y;

        this.speed = CONFIG.PROJECTILE_SPEED;
    }

    // Move o tiro para cima a cada quadro
    update() {
        this.y -= this.speed;
    }

    // Verdadeiro quando o tiro saiu completamente pelo topo
    isOffScreen() {
        return this.y + this.height < 0;
    }

    draw(ctx) {
        ctx.fillStyle = CONFIG.PROJECTILE_COLOR;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
