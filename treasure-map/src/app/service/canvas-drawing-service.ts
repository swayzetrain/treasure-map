import { Injectable } from "@angular/core";
import { ITS_JUST_ANGULAR } from "@angular/core/src/r3_symbols";
import { TileType } from "../enum/TileType";
import { ImageCatalogEntry } from "../model/ImageCatalogEntry";
import { Map } from "../model/Map";
import { TreasureCatalogEntry } from "../model/TreasureCatalogEntry";

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawingService {

  public clearDrawFocusCanvas(map: Map, imageCatalog: ImageCatalogEntry[]) {
    this.clearCanvas(map);
    this.drawTreasureMap(map, imageCatalog);
    this.drawUser(map, imageCatalog);
    this.focusCanvas();
  }

  public drawTreasureMap(map: Map, imageCatalog: ImageCatalogEntry[]) {

    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    var height = map.mapData.length
    var width = map.mapData[0].length

    // draw the canvas
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.canvas.width = width * 30;
      ctx.canvas.height = height * 30;

      //console.log('Drawing');

      for (let y = 0; y < map.mapData.length; y++) {
        for (let x = 0; x < map.mapData[y].length; x++) {
          if (map.mapData[y][x] == TileType.Wall.toString()) {
            ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Wall).image, (x * 30), (y * 30));
          } else if (map.mapData[y][x] == TileType.Path.toString()) {
            ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Path).image, (x * 30), (y * 30));
          } else if (map.mapData[y][x] == TileType.Path_Treasure.toString()) {
            ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Path_Treasure).image, (x * 30), (y * 30));
          }
        }
      }

    };
  }

  public drawUser(map: Map, imageCatalog: ImageCatalogEntry[]) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var x = map.mapMetadata.spawnCoordinate.x * 30
      var y = map.mapMetadata.spawnCoordinate.y * 30

      ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Player).image, x, y);

    }
  }

  public clearCanvas(map: Map) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var height = map.mapData.length
      var width = map.mapData[0].length

      ctx.clearRect(0,0,width,height);
    }
  }

  public drawFoundTreasureLargeImage(map:Map, imageCatalog: ImageCatalogEntry[], treasureCatalogEntry: TreasureCatalogEntry) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var playerHeight = map.mapMetadata.spawnCoordinate.y * 30;
      var playerWidth = map.mapMetadata.spawnCoordinate.x * 30;

      var x = (playerWidth + (imageCatalog.find(x => x.tileType == TileType.Player).image.width / 2)) - (treasureCatalogEntry.imageSmall.width / 2);
      var y = 0;
      
      if(playerHeight >= treasureCatalogEntry.imageSmall.height) {
        y = playerHeight - treasureCatalogEntry.imageSmall.height;
      } else {
        y = playerHeight + (imageCatalog.find(x => x.tileType == TileType.Player).image.height);
      }
      
      ctx.drawImage(treasureCatalogEntry.imageSmall, x, y);
    }
  }

  public focusCanvas() {
    //console.log("trying to focus.");
    document.getElementById('treasureMapCanvas').focus();
  }

}