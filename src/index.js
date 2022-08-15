import { Game } from "./game";
import { clearPressedKeys, handleKeyDown, handleKeyUp } from "./input";

console.log("JS13K 2022");

const canvas = document.getElementById("canvas");
const tileset = new Image();
const game = new Game(canvas, tileset);

window.onkeyup = handleKeyUp;
window.onkeydown = handleKeyDown;

function run() {
    game.update();
    game.draw();

    clearPressedKeys();

    window.requestAnimationFrame(run);
}


tileset.onload = () => {
    run();
}

tileset.src = "tiles.png"
