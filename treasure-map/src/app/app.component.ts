import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapGeneratorService } from './service/map-generator.service';
import { Map } from './model/Map';
import { CanvasDrawingService } from './service/canvas-drawing-service';
import { ImageCatalogService } from './service/image-catalog-service';
import { ImageCatalogEntry } from './model/ImageCatalogEntry';
import { MovementService } from './service/movement-service';
import { MapAlgorithmMapping } from './enum/MapAlgorithm';
import { MapGeneratorRequest } from './model/MapGeneratorRequest';
import { TreasureService } from './service/treasure-service';
import { TreasureCatalogEntry } from './model/TreasureCatalogEntry';
import { IntroDialogBodyComponent } from './intro-dialog-body/intro-dialog-body.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Help Bill Cipher Find the <i>Amulet of Protection</i>';

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
  private treasureCatalog: TreasureCatalogEntry[];

  constructor(private mapGeneratorService:MapGeneratorService, private canvasDrawingService:CanvasDrawingService, private imageService:ImageCatalogService, private movementService:MovementService, private treasureService:TreasureService, private introDialog: MatDialog) {}

  async ngOnInit() {
    this.canvasDrawingService.drawLoadingCanvas(this.mapWidthInput, this.mapHeightInput);
    this.treasureService.setNumberTreasuresOnMap(this.treasuresInput);
    this.treasureService.setTreasuresFoundOnMap(0);
    document.body.classList.add('bg-img');
    this.imageCatalog = await this.imageService.loadImages();
    this.treasureCatalog = await this.treasureService.loadTreasureImages();
    this.openDialog();
    this.generateTreasureMap();
  }

  openDialog() {
    this.introDialog.open(IntroDialogBodyComponent, {panelClass: 'custom-modalbox'});
  }

  public generateTreasureMap() : void {
    var request : MapGeneratorRequest = this.mapGeneratorService.generateRequest(this.mapAlgorithmInput, this.mapHeightInput, this.mapWidthInput, this.maxTunnelsInput, this.maxLengthInput, this.treasuresInput);
    this.mapGeneratorService.getGeneratedMapArray(request)
      .subscribe(data => {
        this.map=data;
        this.treasureService.setNumberTreasuresOnMap(this.treasuresInput);
        this.treasureService.setTreasuresFoundOnMap(0);
        this.treasureService.resetTreasuresCollected(this.treasureCatalog);
        this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
        this.canvasDrawingService.drawPortal(this.map, this.imageCatalog);
        this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
        this.canvasDrawingService.focusCanvas();
      })
  }

  public async movePlayer(event:KeyboardEvent){
    //console.log(event);
    switch (event.key) {
      case 'w':
        this.movementService.moveUp(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'W':
        this.movementService.moveUp(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'a':
        this.movementService.moveLeft(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'A':
        this.movementService.moveLeft(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 's':
        this.movementService.moveDown(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'S':
        this.movementService.moveDown(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'd':
        this.movementService.moveRight(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'D':
        this.movementService.moveRight(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.movementService.moveUp(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.movementService.moveLeft(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.movementService.moveDown(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.movementService.moveRight(this.map);
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'Enter':
        event.preventDefault();
        this.canvasDrawingService.clearDrawFocusCanvas(this.map, this.imageCatalog);
        break;
      case 'p':
        this.canvasDrawingService.drawProgressChart(this.map, this.treasureCatalog);
        break;
      case 'P':
        this.canvasDrawingService.drawProgressChart(this.map, this.treasureCatalog);
        break;
      case ' ':
        await this.movementService.processAction(this.map, this.imageCatalog, this.canvasDrawingService, this.treasureService);
        break;
    }
  }
}
