const keysDown = {}
const keysPressed = {}

function handleKeyUp(e) {
    keysDown[e.code] = false;
}

function handleKeyDown(e) {
    keysDown[e.code] = true;
    keysPressed[e.code] = true;
}

function isKeyDown(key) {
    return keysDown[key];
}

function isKeyPressed(key) {
    return keysPressed[key];
}

function clearPressedKeys() {
    for (const key in keysPressed) {
        delete keysPressed[key];
    }
}

export { handleKeyDown, handleKeyUp, isKeyDown, isKeyPressed, clearPressedKeys };;