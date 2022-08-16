import { isKeyDown, isKeyPressed } from "./input";
import { distance } from "./util";

class GameObject {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.velocity = {
            x: 0,
            y: 0
        }

        this.grounded = false;
        this.applyPhysics = true;
    }

    jump() {
        if (this.grounded) {
            this.velocity.y = -5;
            this.grounded = false;
        }
    }

    update() {
        this.velocity.x = 0;

        if (this.applyPhysics) {
            this.velocity.y += (9.8 / 60.0);
        }
        else {
            this.velocity.y = 0;
        }
    }

    lateUpdate() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw(context) {
        context.fillStyle = "white";
        context.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    checkCollisionWithPosition(collidable, x, y) {
        const closestX = Math.min(Math.max(collidable.x, x), collidable.x + collidable.width);
        const closestY = Math.min(Math.max(collidable.y, y), collidable.y + collidable.height);

        return distance(closestX, closestY, x, y) < this.radius;
    }

    checkCollision(collidable) {
        // Horizontal collision
        if (this.checkCollisionWithPosition(collidable, this.x + this.velocity.x, this.y)) {
            // Left collision
            if (this.velocity.x < 0) {
                this.x = collidable.x + collidable.width + this.radius;
            }
            // Right collision
            else if (this.velocity.x > 0) {
                this.x = collidable.x - this.radius;
            }
            this.velocity.x = 0;
        }

        // Vertical collision
        if (this.checkCollisionWithPosition(collidable, this.x, this.y + this.velocity.y)) {
            // Upwards collision
            if (this.velocity.y < 0) {
                this.y = collidable.y + collidable.height + this.radius;
            }
            // Downwards collision
            else if (this.velocity.y > 0) {
                this.y = collidable.y - this.radius;
                this.grounded = true;
            }
            this.velocity.y = 0;
        }
    }
}

export { GameObject };
