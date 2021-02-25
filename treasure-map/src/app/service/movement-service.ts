import { Injectable } from "@angular/core";
import { MapAlgorithmMapping } from "../enum/MapAlgorithm";
import { TileType } from "../enum/TileType";
import { TreasureCategory } from "../enum/TreasureCategory";
import { ImageCatalogEntry } from "../model/ImageCatalogEntry";
import { Map } from '../model/Map';
import { MapGeneratorRequest } from "../model/MapGeneratorRequest";
import { CanvasDrawingService } from "./canvas-drawing-service";
import { MapGeneratorService } from "./map-generator.service";
import { TreasureService } from "./treasure-service";

@Injectable({
    providedIn: 'root'
  })
  export class MovementService {

    constructor(private mapGeneratorService:MapGeneratorService) {}

    public generatePortal(map:Map, canvasDrawingService:CanvasDrawingService, imageCatalog: ImageCatalogEntry[]) : void {
        this.mapGeneratorService.getRandomPathCoordinate(map)
            .subscribe(data => {
            map.mapMetadata.portalCoordinate=data;
            map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x] = TileType.Portal.toString();
            canvasDrawingService.drawPortal(map, imageCatalog);
            })
    }

    public async generateTreasureMap(map:Map, treasureService: TreasureService, canvasDrawingService:CanvasDrawingService, imageCatalog: ImageCatalogEntry[]) : Promise<Map> {
        const promiseArray = [];
        
        var request : MapGeneratorRequest = this.mapGeneratorService.generateRequest(MapAlgorithmMapping[0], map.mapMetadata.height, map.mapMetadata.width, map.mapMetadata.maxTunnels, map.mapMetadata.maxLength, map.mapMetadata.treasures);

        promiseArray.push(new Promise<Map>(resolve => {
            this.mapGeneratorService.getGeneratedMapArray(request)
          .subscribe(data => {
            map.mapData=data.mapData;
            map.mapMetadata=data.mapMetadata;
            treasureService.setNumberTreasuresOnMap(map.mapMetadata.treasures);
            treasureService.setTreasuresFoundOnMap(0);
            canvasDrawingService.drawTreasureMap(map, imageCatalog);
            canvasDrawingService.drawPortal(map, imageCatalog);
            canvasDrawingService.drawUser(map, imageCatalog);
            canvasDrawingService.focusCanvas();
            resolve(map);
          })

        }))
            await Promise.all(promiseArray);
            return map;
    }
    
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

    public async processAction(map:Map, imageCatalog: ImageCatalogEntry[], canvasDrawingService:CanvasDrawingService, treasureService:TreasureService) {
        var playerPostitionX = map.mapMetadata.spawnCoordinate.x;
        var playerPostitionY = map.mapMetadata.spawnCoordinate.y;

        console.log(map.mapData[playerPostitionY][playerPostitionX]);

        if(map.mapData[playerPostitionY][playerPostitionX] == TileType.Path_Treasure.toString()) {
            //Get Treasure to be drawn and remove from TreasureCatalog
            var treasureCatalogEntry = treasureService.getTreasureFromCatalog();
            
            // Draw treasure above player
            canvasDrawingService.drawFoundTreasureImage(map, imageCatalog, treasureCatalogEntry);

            if(treasureCatalogEntry.treasureCategory == TreasureCategory.ZODIAC) {
                this.generatePortal(map, canvasDrawingService, imageCatalog);
            }

            // Set to just path value since treasure was claimed
            map.mapData[playerPostitionY][playerPostitionX] = TileType.Path.toString();
        } else if(map.mapData[playerPostitionY][playerPostitionX] == TileType.Portal.toString()) {
            map = await this.generateTreasureMap(map, treasureService, canvasDrawingService, imageCatalog);
            treasureService.setZodiacTreasureClaimedOnMap(false);

        }
    }

  }