import { GameObject } from "./gameobject";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.player = new GameObject(320, 450, 8);

        this.collidables = [
            { x: 0, y: 500, width: 1280, height: 16 },
            //{ x: 0, y: 400, width: 1280, height: 16 },
            { x: 32, y: 430, width: 16, height: 75 },
            { x: 400, y: 430, width: 16, height: 75 },
        ]
    }

    update() {
        this.player.update();

        this.collidables.forEach(c => {
            this.player.checkCollision(c);
        });

        this.player.lateUpdate();
    }
    
    draw() {
        this.context.fillStyle = "cornflowerBlue";
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = "lightGray";
        this.collidables.forEach(c => this.context.fillRect(c.x, c.y, c.width, c.height));

        this.player.draw(this.context);
    }
}

export { Game };
