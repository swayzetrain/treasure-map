import { Injectable } from "@angular/core";
import { PostProcessedTileType } from "../enum/PostProcessedTileType";
import { TreasureType } from "../enum/TreasureType";
import { Coordinate } from "../model/Coordinate";
import { EndingSequenceCatalogEntry } from "../model/EndingSequenceCatalogEntry";
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
    //this.drawTreasures(map, imageCatalog);
    this.drawPathDug(map, imageCatalog);
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

      console.log('Drawing');

      for (let y = 0; y < map.mapData.length; y++) {
        for (let x = 0; x < map.mapData[y].length; x++) {

          ctx.drawImage(imageCatalog.find(z => z.postProcessedTileType == map.mapData[y][x].postProcessedTileType).image, (x * 30), (y * 30));
        }
      }

    };
  }

  public drawTreasures(map: Map, imageCatalog: ImageCatalogEntry[]) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for(var entry in map.mapMetadata.treasureSpawnPoints) {

        //console.log("Drawing Treasure");
        var x = map.mapMetadata.treasureSpawnPoints[entry].x * 30
        var y = map.mapMetadata.treasureSpawnPoints[entry].y * 30

        ctx.drawImage(imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.TREASURE).image, x, y);
      }
    }
  }

  public drawUser(map: Map, imageCatalog: ImageCatalogEntry[]) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var x = map.mapMetadata.playerSpawnPoint.x * 30
      var y = map.mapMetadata.playerSpawnPoint.y * 30

      ctx.drawImage(imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.PLAYER).image, x, y);

    }
  }

  public drawPathDug(map:Map, imageCatalog:ImageCatalogEntry[]) {
    if(map.mapMetadata.pathDugCoordinates != null) {
      var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        for(var entry in map.mapMetadata.pathDugCoordinates) {
          ctx.drawImage(imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.PATH_DUG).image, (map.mapMetadata.pathDugCoordinates[entry].x * 30), (map.mapMetadata.pathDugCoordinates[entry].y * 30));
        }
      }
    }
  }

  public drawPortal(map: Map, imageCatalog: ImageCatalogEntry[]) {
    if(map.mapMetadata.portalCoordinate != null) {
      var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = map.mapMetadata.portalCoordinate.x * 30
        var y = map.mapMetadata.portalCoordinate.y * 30

        ctx.drawImage(imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.PORTAL).image, x, y);

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

      var playerHeight = map.mapMetadata.playerSpawnPoint.y * 30;
      var playerWidth = map.mapMetadata.playerSpawnPoint.x * 30;

      var x = (playerWidth + (imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.PLAYER).image.width / 2)) - (treasureCatalogEntry.imageSmall.width / 2);
      var y = 0;

      if (playerHeight >= treasureCatalogEntry.imageSmall.height) {
        y = playerHeight - treasureCatalogEntry.imageSmall.height;
      } else {
        y = playerHeight + (imageCatalog.find(x => x.postProcessedTileType == PostProcessedTileType.PLAYER).image.height);
      }

      ctx.drawImage(treasureCatalogEntry.imageSmall, x, y);
    }
  }

  public drawProgressChart(map: Map, treasureCatalog: TreasureCatalogEntry[]) {
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
    
    var trackerCenter: Coordinate = new Coordinate();
    trackerCenter.x = (zodiacWidth + uncommonWidth) / 2;
    trackerCenter.y = zodiacHeight / 2;


    var canvas = <HTMLCanvasElement>document.getElementById('progressTrackerCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.canvas.width = (zodiacWidth + uncommonWidth);
      ctx.canvas.height = zodiacHeight;

      ctx.clearRect(trackerCenter.x - (zodiacWidth / 2) - (uncommonWidth / 2), trackerCenter.y - (zodiacHeight / 2), (zodiacWidth + uncommonWidth), zodiacHeight);

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge), (trackerCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width)), trackerCenter.y - (zodiacHeight / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width)), trackerCenter.y - (zodiacHeight / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge), trackerCenter.x - (uncommonWidth / 2), trackerCenter.y - (zodiacHeight / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).transparentImageLarge), trackerCenter.x - (uncommonWidth / 2), trackerCenter.y - (zodiacHeight / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width)), trackerCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width)), trackerCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75)), trackerCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75)), trackerCenter.y - (zodiacHeight / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5) - (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)), trackerCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SPECTACLES).imageLarge.width) * 0.75) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STITCHED_HEART).imageLarge.width) * 0.5) - (treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.width)), trackerCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)), trackerCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) / 2));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.QUESTION_MARK).imageLarge.width) * 0.75) + ((treasureCatalog.find(x => x.treasureType == TreasureType.BAG_OF_ICE).imageLarge.width) * 0.5)), trackerCenter.y - ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) / 2));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.width)), trackerCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) * 0.4));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width) * 0.75) - (treasureCatalog.find(x => x.treasureType == TreasureType.LLAMA).imageLarge.width)), trackerCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.SHOOTING_STAR).imageLarge.height) * 0.4));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE).imageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.width) * 0.75)), trackerCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) * 0.4));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PINE_TREE).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) + ((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.width) * 0.75)), trackerCenter.y + ((treasureCatalog.find(x => x.treasureType == TreasureType.CRESENT).imageLarge.height) * 0.4));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge), (trackerCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width)), trackerCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).transparentImageLarge), (trackerCenter.x - (uncommonWidth / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.width)), trackerCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.SIX_FINGERED_HAND).imageLarge.height));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge), trackerCenter.x - (uncommonWidth / 2), trackerCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.height));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).transparentImageLarge), trackerCenter.x - (uncommonWidth / 2), trackerCenter.y + (zodiacHeight / 2) - (treasureCatalog.find(x => x.treasureType == TreasureType.PENTACLE).imageLarge.height));
      }

      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000'; 
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y - (uncommonHeightPadding * 4.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y - (uncommonHeightPadding * 3.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y - (uncommonHeightPadding * 2.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y - (uncommonHeightPadding * 1.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y - (uncommonHeightPadding * 0.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y + (uncommonHeightPadding * 0.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y + (uncommonHeightPadding * 1.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y+ (uncommonHeightPadding * 2.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y + (uncommonHeightPadding * 3.5));
      ctx.fillText(treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).treasureType, trackerCenter.x + (zodiacWidth / 2) - (uncommonWidth / 2) + uncommonWidthPadding, trackerCenter.y + (uncommonHeightPadding * 4.5));

      if(treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall.width), trackerCenter.y - (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge.width), trackerCenter.y - (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.DIPPER).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall.width), trackerCenter.y - (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge.width), trackerCenter.y - (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GOMPERS).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall.width), trackerCenter.y - (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge.width), trackerCenter.y - (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.GRUNKLE_STAN).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MABLE && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall.width), trackerCenter.y - (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge.width), trackerCenter.y - (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MABLE).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall.width), trackerCenter.y - (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge.width), trackerCenter.y - (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCGUCKET).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall.width), trackerCenter.y + (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge.width), trackerCenter.y + (uncommonHeightPadding * 0.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.MCSKIRMISH).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.SOOS && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall.width), trackerCenter.y + (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge.width), trackerCenter.y + (uncommonHeightPadding * 1.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.SOOS).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall.width), trackerCenter.y + (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge.width), trackerCenter.y + (uncommonHeightPadding * 2.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.STANFORD).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall.width), trackerCenter.y + (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge.width), trackerCenter.y + (uncommonHeightPadding * 3.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WADDLES).transparentImageLarge.height / 2)));
      }

      if(treasureCatalog.find(x => x.treasureType == TreasureType.WENDY && x.Collected == true)) {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall.width), trackerCenter.y + (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).imageSmall.height / 2)));
      } else {
        ctx.drawImage((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge), trackerCenter.x + (zodiacWidth / 2) + (uncommonWidth / 2) - uncommonWidthPadding - (treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge.width), trackerCenter.y + (uncommonHeightPadding * 4.5) - ((treasureCatalog.find(x => x.treasureType == TreasureType.WENDY).transparentImageLarge.height / 2)));
      }
    }
  }

  public drawEndingSequenceScene(endingSequenceImageCatalogEntry : EndingSequenceCatalogEntry) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.drawImage(endingSequenceImageCatalogEntry.image, ((canvas.width / 2) - endingSequenceImageCatalogEntry.image.width / 2), ((canvas.height / 2) - endingSequenceImageCatalogEntry.image.height / 2));

      ctx.font = endingSequenceImageCatalogEntry.storyTextFontStyle;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(endingSequenceImageCatalogEntry.storyText, ((canvas.width / 2) - (ctx.measureText(endingSequenceImageCatalogEntry.storyText).width) / 2), ((canvas.height / 2) + (endingSequenceImageCatalogEntry.image.height / 2)) - parseInt(ctx.font));

    }
  }

  public focusCanvas() {
    //console.log("trying to focus.");
    document.getElementById('treasureMapCanvas').focus();
  }

}