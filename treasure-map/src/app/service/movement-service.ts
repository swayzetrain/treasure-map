import { Injectable } from "@angular/core";
import { MapAlgorithmMapping } from "../enum/MapAlgorithm";
import { PostProcessedTileType } from "../enum/PostProcessedTileType";
import { TileCategory } from "../enum/TileCategory";
import { TileType } from "../enum/TileType";
import { TreasureCategory } from "../enum/TreasureCategory";
import { Coordinate } from "../model/Coordinate";
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
        this.mapGeneratorService.getRandomPathCoordinates(map, 1)
            .subscribe(data => {
            map.mapMetadata.portalCoordinate=data[0];
            console.log("pre-portal category: " + map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x].tileCategory);
            console.log("pre-portal type: " + map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x].postProcessedTileType);
            map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x].postProcessedTileType = PostProcessedTileType.PORTAL;
            console.log("post-portal category: " + map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x].tileCategory);
            console.log("post-portal type: " + map.mapData[map.mapMetadata.portalCoordinate.y][map.mapMetadata.portalCoordinate.x].postProcessedTileType);
            canvasDrawingService.drawPortal(map, imageCatalog);
            })
    }

    public async generateTreasureMap(map:Map, treasureService: TreasureService, canvasDrawingService:CanvasDrawingService, imageCatalog: ImageCatalogEntry[], treasuresInput: number) : Promise<Map> {
        const promiseArray = [];
        
        var request : MapGeneratorRequest = this.mapGeneratorService.generateRequest(MapAlgorithmMapping[0], map.mapMetadata.height, map.mapMetadata.width, map.mapMetadata.maxTunnels, map.mapMetadata.maxLength);

        promiseArray.push(new Promise<Map>(resolve => {
            this.mapGeneratorService.getGeneratedMapArray(request)
          .subscribe(data => {
            map.mapData=data.mapData;
            map.mapMetadata=data.mapMetadata;
            resolve(map);
          })

        }))
            await Promise.all(promiseArray);
            return map;
    }

    public async generatePlayerStartingLocation(map:Map) {
        //console.log(JSON.stringify(this.map));
        const promiseArray = [];
        promiseArray.push(new Promise<Coordinate>(resolve => {
          this.mapGeneratorService.getRandomPathCoordinates(map, 1)
          .subscribe(data => {
              map.mapMetadata.playerSpawnPoint = data[0];
              
              resolve(map.mapMetadata.playerSpawnPoint);
            })
    
          }))
              await Promise.all(promiseArray);
              return map.mapMetadata.playerSpawnPoint;
      }
    
      public async generateTreasureLocations(map:Map, treasuresInput:number) {
        //console.log(JSON.stringify(this.map));
        const promiseArray = [];
        promiseArray.push(new Promise<Coordinate[]>(resolve => {
          this.mapGeneratorService.getRandomPathCoordinates(map, treasuresInput)
          .subscribe(data => {
              map.mapMetadata.treasureSpawnPoints = data;
    
              resolve(map.mapMetadata.treasureSpawnPoints);
            })
    
          }))
              await Promise.all(promiseArray);
              return map.mapMetadata.treasureSpawnPoints;
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
        }
    }

    public async processAction(map:Map, imageCatalog: ImageCatalogEntry[], canvasDrawingService:CanvasDrawingService, treasureService:TreasureService, treasuresInput:number) {
        var playerPostitionX = map.mapMetadata.playerSpawnPoint.x;
        var playerPostitionY = map.mapMetadata.playerSpawnPoint.y;

        if(map.mapMetadata.treasureSpawnPoints.find(x => x.x == playerPostitionX && x.y == playerPostitionY) != undefined) {
            console.groupCollapsed("In there");
            //Update map to have a dug path image
            map.mapData[playerPostitionY][playerPostitionX].postProcessedTileType = PostProcessedTileType.PATH_DUG;
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
        } else if(map.mapData[playerPostitionY][playerPostitionX].postProcessedTileType == PostProcessedTileType.PORTAL) {
            console.groupCollapsed("In here");
            map = await this.generateTreasureMap(map, treasureService, canvasDrawingService, imageCatalog, treasuresInput);
            map.mapMetadata.playerSpawnPoint = await this.generatePlayerStartingLocation(map);
            map.mapMetadata.treasureSpawnPoints = await this.generateTreasureLocations(map, treasuresInput);
            treasureService.setZodiacTreasureClaimedOnMap(false);
            treasureService.setNumberTreasuresOnMap(treasuresInput);
            treasureService.setTreasuresFoundOnMap(0);
            canvasDrawingService.drawTreasureMap(map, imageCatalog);
            canvasDrawingService.drawPortal(map, imageCatalog);
            canvasDrawingService.drawUser(map, imageCatalog);
            canvasDrawingService.drawTreasures(map,imageCatalog);
            canvasDrawingService.focusCanvas();

        } else if(map.mapData[playerPostitionY][playerPostitionX].tileCategory == TileCategory.PATH){
            //Update map to have a dug path image
            map.mapData[playerPostitionY][playerPostitionX].postProcessedTileType = PostProcessedTileType.PATH_DUG;
            canvasDrawingService.clearDrawFocusCanvas(map, imageCatalog);
            
        } 
    }

  }