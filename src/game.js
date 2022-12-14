import { Enemy } from "./enemy";
import { GameObject } from "./gameobject";
import mapData from "./map.json";
import { PlayerBody } from "./playerbody";
import { PlayerGhost } from "./playerghost";

const TILE_SIZE = 16;
const TILESET_WIDTH = 16;

class Game {
    constructor(canvas, tileset) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.tileset = tileset;

        this.playerGhost = new PlayerGhost(0, 24);
        this.playerBody = new PlayerBody(0, 0);
        this.playerGhost.body = this.playerBody;
        this.playerBody.ghost = this.playerGhost;

        this.gameObjects = [
            this.playerBody,
            this.playerGhost,
            new Enemy(136, 32, 8)
        ];

        this.collidables = this.generateCollidables();
    }

    update() {
        this.gameObjects.forEach(g => {
            g.update();
            this.collidables.forEach(c => g.checkCollision(c));
            this.gameObjects.forEach(otherG => g.checkCollision(otherG));
            g.lateUpdate();
        })
    }

    drawMap() {
        mapData.layers.forEach(layer => {
            for (let x = 0; x < mapData.width; x++) {
                for (let y = 0; y < mapData.height; y++) {
                    const tileIndex = layer[x + y * mapData.width] - 1;
                    const sourceX = tileIndex % TILESET_WIDTH;
                    const sourceY = Math.floor(tileIndex / TILESET_WIDTH);
                    
                    this.context.drawImage(this.tileset,
                                           sourceX * TILE_SIZE, sourceY * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                                           x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        });
    }

    drawHud() {
        const spiritGaugeWidth = 200;
        this.context.fillStyle = "purple";
        this.context.fillRect(this.width - spiritGaugeWidth - 32,
                              32,
                              (this.playerGhost.spirit / this.playerGhost.maxSpirit * spiritGaugeWidth),
                              32);
        this.context.fillStyle = "white";
        this.context.rect(this.width - spiritGaugeWidth - 32, 32, spiritGaugeWidth, 32);
        this.context.stroke();
    }
    
    draw() {
        this.context.fillStyle = "cornflowerBlue";
        this.context.fillRect(0, 0, this.width, this.height);

        this.drawMap();

        this.context.fillStyle = "white";
        this.gameObjects.forEach(g => g.draw(this.context));

        this.drawHud();
    }

    generateCollidables() {
        const collidables = [];

        mapData.layers.forEach(layer => {
            for (let x = 0; x < mapData.width; x++) {
                for (let y = 0; y < mapData.height; y++) {
                    const tileIndex = layer[x + y * mapData.width] - 1;
                    if (mapData.blockedTiles.includes(tileIndex)) {
                        collidables.push({x: x * TILE_SIZE, y: y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE});
                    }
                }
            }
        })

        return collidables;
    }
}

export { Game };
