import { Injectable } from "@angular/core";
import { TileType } from "../enum/TileType";
import { ImageCatalogEntry } from "../model/ImageCatalog";
import {Map} from '../model/Map';
import { CanvasDrawingService } from "./canvas-drawing-service";

@Injectable({
    providedIn: 'root'
  })
  export class MovementService {
    
    public moveUp(map:Map) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;


        if(playerPostitionY - 1 < 0) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY-1][playerPostitionX] == TileType.Wall.toString()) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.spawnCoordinate.y -= 1;
        }
    }

    public moveDown(map:Map) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;

        var mapHeight = map.mapMetadata.height;

        if(playerPostitionY + 1 >= mapHeight) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY + 1][playerPostitionX] == TileType.Wall.toString()) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.spawnCoordinate.y += 1;
        }
    }

    public moveLeft(map:Map) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;

        if(playerPostitionX - 1 < 0) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY][playerPostitionX - 1] == TileType.Wall.toString()) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.spawnCoordinate.x -= 1;
        }
    }

    public moveRight(map:Map) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;

        var mapWidth = map.mapMetadata.width;

        if(playerPostitionX + 1 >= mapWidth) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY][playerPostitionX + 1] == TileType.Wall.toString()) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.spawnCoordinate.x += 1;
        }
    }

    public digForTreasure(map:Map, imageCatalog:ImageCatalogEntry[], canvasDrawingService:CanvasDrawingService) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;

        if(map.mapData[playerPostitionY][playerPostitionX] == TileType.Path_Treasure.toString()) {
            // Draw opening Treasure Animation
            canvasDrawingService.drawFoundTreasureLargeImage(map, imageCatalog);

            // Set to just path value since treasure was claimed
            map.mapData[playerPostitionY][playerPostitionX] = TileType.Path.toString();
        }
    }

  }