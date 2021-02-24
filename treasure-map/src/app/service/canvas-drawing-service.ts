import { Injectable } from "@angular/core";
import { ITS_JUST_ANGULAR } from "@angular/core/src/r3_symbols";
import { TileType } from "../enum/TileType";
import { TreasureType } from "../enum/TreasureType";
import { Coordinate } from "../model/Coordinate";
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

      ctx.clearRect(0, 0, width, height);
    }
  }

  public drawFoundTreasureLargeImage(map: Map, imageCatalog: ImageCatalogEntry[], treasureCatalogEntry: TreasureCatalogEntry) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var playerHeight = map.mapMetadata.spawnCoordinate.y * 30;
      var playerWidth = map.mapMetadata.spawnCoordinate.x * 30;

      var x = (playerWidth + (imageCatalog.find(x => x.tileType == TileType.Player).image.width / 2)) - (treasureCatalogEntry.imageSmall.width / 2);
      var y = 0;

      if (playerHeight >= treasureCatalogEntry.imageSmall.height) {
        y = playerHeight - treasureCatalogEntry.imageSmall.height;
      } else {
        y = playerHeight + (imageCatalog.find(x => x.tileType == TileType.Player).image.height);
      }

      ctx.drawImage(treasureCatalogEntry.imageSmall, x, y);
    }
  }

  public drawZodiacLarge(map: Map, treasureCatalog: TreasureCatalogEntry[]) {
    console.log(treasureCatalog);

    var mapCenter: Coordinate = new Coordinate();
    mapCenter.x = (map.mapData[0].length * 30) / 2;
    mapCenter.y = (map.mapData.length * 30) / 2;

    var zodiacHeight = (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height)
      + ((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.height) * 0.54)
      + (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height)
      + ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.height) * 0.54)
      + (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height);

    var zodiacWidth = ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) 
      + ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5)
      + (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)
      + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) 
      + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)
      + (treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.width);


    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.clearRect(mapCenter.x - (zodiacWidth / 2),mapCenter.y - (zodiacHeight / 2),zodiacWidth,zodiacHeight);

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge), (mapCenter.x - (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width)), mapCenter.y - (zodiacHeight / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge), mapCenter.x, mapCenter.y - (zodiacHeight / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge), (mapCenter.x - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height) / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge), (mapCenter.x + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.height) / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge), (mapCenter.x - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5) - (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge), (mapCenter.x + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) / 2));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge), (mapCenter.x - ((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.width)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) * 0.4));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE).imageLarge), (mapCenter.x + ((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.width) * 0.75)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) * 0.4));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge), (mapCenter.x - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width)), mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height));
      }
      if(treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge), mapCenter.x, mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.height));
      }
    }
  }

  public focusCanvas() {
    //console.log("trying to focus.");
    document.getElementById('treasureMapCanvas').focus();
  }

}