import { Enemy } from "./enemy";
import { GameObject } from "./gameobject";
import { isKeyDown, isKeyPressed } from "./input";

const ENABLED = 1
const DISABLING = 2;
const DISABLED = 3;
const ENABLING = 4;

class PlayerBody extends GameObject {
    constructor(x, y) {
        super(x, y, 8);
        this.state = ENABLED;

        this.ghost = null;
    }

    enable() {
        this.state = ENABLING;
    }

    disable() {
        if (this.state === ENABLED) {
            this.state = DISABLING;
        }
    }

    update() {
        super.update();

        if (this.state === DISABLING) {
            this.state = DISABLED;
            this.ghost.x = this.x;
            this.ghost.y = this.y - this.radius * 3;
            this.ghost.enable();
        }
        else if (this.state === ENABLING) {
            this.state = ENABLED;
        }

        if (this.state === ENABLED) {
            if (isKeyDown("KeyD")) {
                this.velocity.x = 3;
            }
            else if (isKeyDown("KeyA")) {
                this.velocity.x = -3;
            }
            if (isKeyPressed("Space")) {
                this.jump();
            }
            if (this.grounded && isKeyPressed("KeyE")) {
                this.disable();
            }
        }
    }

    handleGameObjectCollision(gameObject) {
        if (gameObject instanceof Enemy) {
            this.disable();
        }
    }
}

export { PlayerBody };
