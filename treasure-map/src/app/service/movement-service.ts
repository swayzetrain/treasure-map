import { Injectable } from "@angular/core";
import { AudioDistanceCategory } from "../enum/AudioDistanceCategory";
import { MapAlgorithmMapping } from "../enum/MapAlgorithm";
import { TileCategory } from "../enum/TileCategory";
import { TreasureCategory } from "../enum/TreasureCategory";
import { Coordinate } from "../model/Coordinate";
import { ImageCatalogEntry } from "../model/ImageCatalogEntry";
import { Map } from '../model/Map';
import { CanvasDrawingService } from "./canvas-drawing-service";
import { MapGeneratorService } from "./map-generator.service";
import { TreasureService } from "./treasure-service";

@Injectable({
    providedIn: 'root'
  })
  export class MovementService {

    constructor(private mapGeneratorService:MapGeneratorService) {}

    public generatePortal(map:Map, canvasDrawingService:CanvasDrawingService, imageCatalog: ImageCatalogEntry[]) : void {
        this.mapGeneratorService.getRandomPathCoordinates(map, 1)
            .subscribe(data => {
            map.mapMetadata.portalCoordinate=data[0];
            canvasDrawingService.drawPortal(map, imageCatalog);
            })
    }
    
    public moveUp(map:Map) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        if(playerPostitionY - 1 < 0) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY-1][playerPostitionX].tileCategory == TileCategory.WALL) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.playerSpawnPoint.y -= 1;
            map.mapMetadata.playerStance += 1;
            this.playAudioBasedOnDistanceFromTreasure(map);
        }
    }

    public moveDown(map:Map) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        var mapHeight = map.mapMetadata.height;

        if(playerPostitionY + 1 >= mapHeight) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY + 1][playerPostitionX].tileCategory == TileCategory.WALL) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.playerSpawnPoint.y += 1;
            map.mapMetadata.playerStance += 1;
            this.playAudioBasedOnDistanceFromTreasure(map);
        }
    }

    public moveLeft(map:Map) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        if(playerPostitionX - 1 < 0) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY][playerPostitionX - 1].tileCategory == TileCategory.WALL) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.playerSpawnPoint.x -= 1;
            map.mapMetadata.playerStance += 1;
            this.playAudioBasedOnDistanceFromTreasure(map);
        }
    }

    public moveRight(map:Map) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        var mapWidth = map.mapMetadata.width;

        if(playerPostitionX + 1 >= mapWidth) {
            //out of bounds for canvas
            return;
        }
        else if(map.mapData[playerPostitionY][playerPostitionX + 1].tileCategory == TileCategory.WALL) {
            //would hit a wall
            return;
        } else {
            map.mapMetadata.playerSpawnPoint.x += 1;
            map.mapMetadata.playerStance += 1;
            this.playAudioBasedOnDistanceFromTreasure(map);
        }
    }

    public async processAction(map:Map, imageCatalog: ImageCatalogEntry[], canvasDrawingService:CanvasDrawingService, treasureService:TreasureService, treasuresInput:number) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        if(map.mapMetadata.treasureSpawnPoints.find(x => x.x == playerPostitionX && x.y == playerPostitionY) != undefined) {
            //Update map to have a dug path image
            var coordinate:Coordinate = {
                x:playerPostitionX,
                y:playerPostitionY
            }
            map.mapMetadata.pathDugCoordinates.push(coordinate);

            canvasDrawingService.clearDrawFocusCanvas(map, imageCatalog);

            //Get Treasure to be drawn and remove from TreasureCatalog
            var treasureCatalogEntry = treasureService.getTreasureFromCatalog();
            
            // Draw treasure above player
            canvasDrawingService.drawFoundTreasureImage(map, imageCatalog, treasureCatalogEntry);

            if(treasureCatalogEntry.treasureCategory == TreasureCategory.ZODIAC) {
                this.generatePortal(map, canvasDrawingService, imageCatalog);
            }

            // Set to just path value since treasure was claimed
            var indexOfTreasure = map.mapMetadata.treasureSpawnPoints.findIndex(x => x.x == playerPostitionX && x.y == playerPostitionY);
            if(indexOfTreasure != -1) {
                map.mapMetadata.treasureSpawnPoints.splice(indexOfTreasure, 1);
            }

            console.log("treasure spawn points: " + map.mapMetadata.treasureSpawnPoints.length);
        } else if(map.mapMetadata.portalCoordinate != undefined && (map.mapMetadata.playerSpawnPoint.x == map.mapMetadata.portalCoordinate.x && map.mapMetadata.playerSpawnPoint.y == map.mapMetadata.portalCoordinate.y)) {
            map = await this.mapGeneratorService.generateTreasureMap(map, MapAlgorithmMapping[0], map.mapMetadata.height, map.mapMetadata.width, map.mapMetadata.maxTunnels, map.mapMetadata.maxLength);
            map.mapMetadata.playerSpawnPoint = await this.mapGeneratorService.generatePlayerStartingLocation(map);
            map.mapMetadata.treasureSpawnPoints = await this.mapGeneratorService.generateTreasureLocations(map, treasuresInput);

            treasureService.setZodiacTreasureClaimedOnMap(false);
            treasureService.setNumberTreasuresOnMap(treasuresInput);
            treasureService.setTreasuresFoundOnMap(0);

            canvasDrawingService.clearDrawFocusCanvas(map, imageCatalog);
            //canvasDrawingService.drawTreasures(map,imageCatalog);

        } else if(map.mapData[playerPostitionY][playerPostitionX].tileCategory == TileCategory.PATH){
            //Update map to have a dug path image
            var coordinate:Coordinate = {
                x:playerPostitionX,
                y:playerPostitionY
            }
            map.mapMetadata.pathDugCoordinates.push(coordinate);
            canvasDrawingService.clearDrawFocusCanvas(map, imageCatalog);
        } 
    }

    public playAudioBasedOnDistanceFromTreasure(map:Map) {

        var playerPostionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostionY = map.mapMetadata.playerSpawnPoint.y;

        var audioDistanceCategory: AudioDistanceCategory;
        var distanceFromTreasure: number;

        if(map.mapMetadata.treasureSpawnPoints.length > 0) {

            for(var entry in map.mapMetadata.treasureSpawnPoints) {
                //abs(deltaX^2) + abs(deltaY^2) = distance^2
                var deltaX = Math.abs(map.mapMetadata.treasureSpawnPoints[entry].x - playerPostionX);
                var deltaY = Math.abs(map.mapMetadata.treasureSpawnPoints[entry].y - playerPostionY);

                var distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
                
                if(distanceFromTreasure == undefined) {
                    distanceFromTreasure = distance;
                    continue;
                }

                if (distance < distanceFromTreasure) {
                    distanceFromTreasure = distance;
                }
            }

            if(distanceFromTreasure != undefined) {
                //console.log("distanceFromTreasure: " + distanceFromTreasure);

                if(distanceFromTreasure > 7) {
                    audioDistanceCategory = AudioDistanceCategory.NOT_IN_RANGE
                } else if(distanceFromTreasure > 5) {
                    audioDistanceCategory = AudioDistanceCategory.LONG_RANGE
                } else if(distanceFromTreasure > 3) {
                    audioDistanceCategory = AudioDistanceCategory.MEDIUM_RANGE
                } else if(distanceFromTreasure >= 1) {
                    audioDistanceCategory = AudioDistanceCategory.CLOSE_RANGE
                } else {
                    audioDistanceCategory = AudioDistanceCategory.ON_TILE
                }

                let audio = new Audio();
                audio.src = audioDistanceCategory;
                audio.load();
                audio.play();
            }
        }

        
    }

  }