import { Component, OnInit } from '@angular/core';
import { MapGeneratorService } from './service/map-generator.service';
import {Map} from './model/Map';
import { CanvasDrawingService } from './service/canvas-drawing-service';
import { ImageService } from './service/image-service';
import { ImageCatalogEntry } from './model/ImageCatalog';
import { MovementService } from './service/movement-service';
import { MapAlgorithm, MapAlgorithmMapping } from './enum/MapAlgorithm';
import { MapGeneratorRequest } from './model/MapGeneratorRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treasure-map';

  public map: Map;
  public treasureMap: string[][];

  keys = Object.keys;
  mapAlgorithmValues = MapAlgorithmMapping;

  public mapAlgorithmInput = this.mapAlgorithmValues[0];
  public mapHeightInput : number = 40;
  public mapWidthInput : number = 75;
  public maxTunnelsInput : number = 450;
  public maxLengthInput : number = 20;
  public treasuresInput : number = 10;

  private imageCatalog: ImageCatalogEntry[];

  constructor(private mapGeneratorService:MapGeneratorService, private canvasDrawingService:CanvasDrawingService, private imageService:ImageService, private movementService:MovementService) {}

  async ngOnInit() {
    this.imageCatalog = await this.imageService.loadImages();
    console.log(JSON.stringify(this.imageCatalog));
  }

  public generateTreasureMap() : void {
    var request : MapGeneratorRequest = this.mapGeneratorService.generateRequest(this.mapAlgorithmInput, this.mapHeightInput, this.mapWidthInput, this.maxTunnelsInput, this.maxLengthInput, this.treasuresInput);

    this.mapGeneratorService.getGeneratedMapArray(request)
      .subscribe(data => {
        this.map=data;
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        this.canvasDrawingService.focusCanvas();
      })
  }

  public movePlayer(event: any){
    console.log(event);
    switch(event.key) {
      case 'w':
        this.movementService.moveUp(this.map);
        this.canvasDrawingService.clearCanvas(this.map);
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        break;
      case 'a':
        this.movementService.moveLeft(this.map);
        this.canvasDrawingService.clearCanvas(this.map);
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        break;
      case 's':
        this.movementService.moveDown(this.map);
        this.canvasDrawingService.clearCanvas(this.map);
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        break;
      case 'd':
        this.movementService.moveRight(this.map);
        this.canvasDrawingService.clearCanvas(this.map);
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        break;
      case ' ':
        this.movementService.digForTreasure(this.map, this.imageCatalog, this.canvasDrawingService);
        break;
    }
  }
}
