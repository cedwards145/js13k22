import { GameObject } from "./gameobject";
import { isKeyDown, isKeyPressed } from "./input";
import { distance } from "./util";

const ENABLED = 1
const DISABLING = 2;
const DISABLED = 3;
const ENABLING = 4;

class PlayerGhost extends GameObject {
    constructor(x, y) {
        super(x, y, 8);
        this.applyPhysics = false
        this.state = DISABLED;

        this.body = null;
        this.maxSpirit = 100;
        this.spirit = this.maxSpirit;
    }

    enable() {
        this.state = ENABLING;
    }

    disable() {
        this.state = DISABLING;
    }

    update() {
        super.update();

        if (this.state === DISABLING) {
            this.state = DISABLED;
            this.body.enable();
        }
        else if (this.state === DISABLED) {
            if (this.spirit < this.maxSpirit) {
                this.spirit++;   
            }
        }
        else if (this.state === ENABLING) {
            this.state = ENABLED;
        }
        else if (this.state === ENABLED) {
            this.spirit--;
            if (this.spirit <= 0) {
                this.disable();
            }

            if (isKeyDown("KeyD")) {
                this.velocity.x = 3;
            }
            else if (isKeyDown("KeyA")) {
                this.velocity.x = -3;
            }

            if (isKeyDown("KeyS")) {
                this.velocity.y = 3;
            }
            else if (isKeyDown("KeyW")) {
                this.velocity.y = -3;
            }

            if (isKeyPressed("Space")) {
                this.jump();
            }

            if (isKeyPressed("KeyE")) {
                this.disable();
            }
        }

        if (distance(this.x + this.velocity.x, this.y + this.velocity.y, this.body.x, this.body.y) > 128) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    draw(context) {
        if (this.state === ENABLING || this.state === ENABLED){
            super.draw(context);
        }
    }
}

export { PlayerGhost };
