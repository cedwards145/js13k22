import json
import sys

def is_tile_blocked(tile):
    for property in tile["properties"]:
        if property["name"] == "block":
            return property["value"]
    return False


def crunch(input_file_path, output_file_path):
    with open(input_file_path, "r") as input_file:
        tiled_data = json.load(input_file)
    
    layers = tiled_data["layers"]
    crunched_map = [layer["data"] for layer in layers]

    tileset = tiled_data["tilesets"][0]
    blocked_tiles = [tile["id"] for tile in tileset["tiles"] if is_tile_blocked(tile)]

    with open(output_file_path, "w+") as output_file:
        json.dump({
            "width": tiled_data["width"],
            "height": tiled_data["height"],
            "layers": crunched_map,
            "blockedTiles": blocked_tiles
        }, output_file)


if __name__ == "__main__":
    input_file_path = sys.argv[1]
    output_file_path = sys.argv[2]

    crunch(input_file_path, output_file_path)
