import { GameObject } from "./gameobject";

class Enemy extends GameObject {
    constructor(x, y, radius) {
        super(x, y, radius);
    }

    draw(context) {
        context.fillStyle = "red";
        super.draw(context);
    }
}

export { Enemy };
