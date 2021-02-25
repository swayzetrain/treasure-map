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
    this.drawPortal(map, imageCatalog);
    this.drawUser(map, imageCatalog);
    this.focusCanvas();
  }

  public drawLoadingCanvas(mapWidth:number, mapHeight:number) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    // draw the canvas
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.canvas.width = mapWidth * 30;
      ctx.canvas.height = mapHeight * 30;

      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'red'; 
      ctx.fillText("Loading...", ((mapWidth * 30 / 2) - 50), ((mapHeight * 30 / 2) - 24));
    }
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
          } else if (map.mapData[y][x] == TileType.Path.toString() || map.mapData[y][x] == TileType.Portal.toString()) {
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

  public drawPortal(map: Map, imageCatalog: ImageCatalogEntry[]) {
    if(map.mapMetadata.portalCoordinate != null) {
      var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = map.mapMetadata.portalCoordinate.x * 30
        var y = map.mapMetadata.portalCoordinate.y * 30

        ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Portal).image, x, y);

      }
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

  public drawFoundTreasureImage(map: Map, imageCatalog: ImageCatalogEntry[], treasureCatalogEntry: TreasureCatalogEntry) {
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

  public drawProgressChart(map: Map, treasureCatalog: TreasureCatalogEntry[]) {
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

    var uncommonWidth = 300;
    var uncommonWidthPadding = 20;
    var uncommonHeightPadding = 40;


    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.clearRect(mapCenter.x - (zodiacWidth / 2) - (uncommonWidth / 2), mapCenter.y - (zodiacHeight / 2), (zodiacWidth + uncommonWidth), zodiacHeight);

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge), (mapCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width)), mapCenter.y - (zodiacHeight / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width)), mapCenter.y - (zodiacHeight / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge), mapCenter.x - (uncommonWidth / 2), mapCenter.y - (zodiacHeight / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).transparentImageLarge), mapCenter.x - (uncommonWidth / 2), mapCenter.y - (zodiacHeight / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75)), mapCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5) - (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5) - (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)), mapCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.width)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) * 0.4));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.width)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) * 0.4));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE).imageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.width) * 0.75)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) * 0.4));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.width) * 0.75)), mapCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) * 0.4));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge), (mapCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width)), mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).transparentImageLarge), (mapCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width)), mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge), mapCenter.x - (uncommonWidth / 2), mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.height));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).transparentImageLarge), mapCenter.x - (uncommonWidth / 2), mapCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.height));
      }

      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y - (uncommonHeightPadding * 4.5));
      ctx.fillStyle = '#000202'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y - (uncommonHeightPadding * 3.5));
      ctx.fillStyle = '#001c1b'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y - (uncommonHeightPadding * 2.5));
      ctx.fillStyle = '#001c1b'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y - (uncommonHeightPadding * 1.5));
      ctx.fillStyle = '#00b5b1';
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y - (uncommonHeightPadding * 0.5));
      ctx.fillStyle = '#00b5b1'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y + (uncommonHeightPadding * 0.5));
      ctx.fillStyle = '#00b5b1'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y + (uncommonHeightPadding * 1.5));
      ctx.fillStyle = '#1bfffc'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y+ (uncommonHeightPadding * 2.5));
      ctx.fillStyle = '#34fffd'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y + (uncommonHeightPadding * 3.5));
      ctx.fillStyle = '#4efffd'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).treasureType, mapCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, mapCenter.y + (uncommonHeightPadding * 4.5));

      if(treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall.width), mapCenter.y - (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge.width), mapCenter.y - (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall.width), mapCenter.y - (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge.width), mapCenter.y - (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall.width), mapCenter.y - (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge.width), mapCenter.y - (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MABLE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall.width), mapCenter.y - (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge.width), mapCenter.y - (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall.width), mapCenter.y - (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge.width), mapCenter.y - (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall.width), mapCenter.y + (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge.width), mapCenter.y + (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SOOS && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall.width), mapCenter.y + (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge.width), mapCenter.y + (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall.width), mapCenter.y + (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge.width), mapCenter.y + (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall.width), mapCenter.y + (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge.width), mapCenter.y + (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.WENDY && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall.width), mapCenter.y + (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge), mapCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge.width), mapCenter.y + (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge.height / 2)));
      }
    }
  }

  public focusCanvas() {
    //console.log("trying to focus.");
    document.getElementById('treasureMapCanvas').focus();
  }

}