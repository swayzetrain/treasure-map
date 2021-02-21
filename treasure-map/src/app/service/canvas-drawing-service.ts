import { Injectable } from "@angular/core";
import { TileType } from "../enum/TileType";
import { ImageCatalogEntry } from "../model/ImageCatalog";
import { Map } from "../model/Map";

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawingService {

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

  public drawFoundTreasureLargeImage(map:Map, imageCatalog: ImageCatalogEntry[]) {
    var canvas = <HTMLCanvasElement>document.getElementById('treasureMapCanvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      var mapHeight = map.mapData.length * 30;
      var mapWidth = map.mapData[0].length * 30;

      var x = (mapWidth / 2) - (imageCatalog.find(x => x.tileType == TileType.Treasure_Large).image.width / 2);
      var y = (mapHeight / 2) - (imageCatalog.find(x => x.tileType == TileType.Treasure_Large).image.height / 2);

      ctx.drawImage(imageCatalog.find(x => x.tileType == TileType.Treasure_Large).image, x, y);
    }
  }

}