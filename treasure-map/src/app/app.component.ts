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
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { EndingSequenceCatalogEntry } from './model/EndingSequenceCatalogEntry';
import { Coordinate } from './model/Coordinate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Help Bill Cipher Find the <i>Amulet of Protection</i>';

  public endingSequenceActive: boolean = false;
  public endingSequenceSceneNumber: number = 0;
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
  private endingSequenceImageCatalog : EndingSequenceCatalogEntry[];
  private treasureCatalog: TreasureCatalogEntry[];

  constructor(private mapGeneratorService:MapGeneratorService, private canvasDrawingService:CanvasDrawingService, private imageService:ImageCatalogService, private movementService:MovementService, private treasureService:TreasureService, private introDialog: MatDialog, private progressDialog: MatDialog) {}

  async ngOnInit() {
    this.canvasDrawingService.drawLoadingCanvas(this.mapWidthInput, this.mapHeightInput);
    this.treasureService.setNumberTreasuresOnMap(this.treasuresInput);
    this.treasureService.setTreasuresFoundOnMap(0);
    document.body.classList.add('bg-img');
    this.imageCatalog = await this.imageService.loadImages();
    this.endingSequenceImageCatalog = await this.imageService.loadEndingSequenceImages();
    this.treasureCatalog = await this.treasureService.loadTreasureImages();
    this.openIntroDialog();
    this.map = await this.generateTreasureMap();
    this.map.mapMetadata.playerSpawnPoint = await this.generatePlayerStartingLocation();
    this.map.mapMetadata.treasureSpawnPoints = await this.generateTreasureLocations();
    this.treasureService.setNumberTreasuresOnMap(this.treasuresInput);
    this.treasureService.setTreasuresFoundOnMap(0);
    this.treasureService.resetTreasuresCollected(this.treasureCatalog);
    this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
    //this.canvasDrawingService.drawTreasures(this.map, this.imageCatalog);
    this.canvasDrawingService.drawPortal(this.map, this.imageCatalog);
    this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
    this.canvasDrawingService.focusCanvas();
  }

  openIntroDialog() {
    this.introDialog.open(IntroDialogBodyComponent, {panelClass: 'custom-modalbox'});
  }

  openProgressDialog() {
    this.progressDialog.open(ProgressTrackerComponent, {panelClass: 'custom-modalbox', data: {map: this.map, treasureCatalog: this.treasureCatalog}});
  }

  public async resetProgress() {
    this.map = await this.generateTreasureMap();
    this.map.mapMetadata.playerSpawnPoint = await this.generatePlayerStartingLocation();
    this.map.mapMetadata.treasureSpawnPoints = await this.generateTreasureLocations();
    this.treasureService.setZodiacTreasureClaimedOnMap(false);
    this.treasureService.setNumberTreasuresOnMap(this.treasuresInput);
    this.treasureService.setTreasuresFoundOnMap(0);
    this.treasureService.resetTreasuresCollected(this.treasureCatalog);
    this.canvasDrawingService.drawTreasureMap(this.map, this.imageCatalog);
    this.canvasDrawingService.drawPortal(this.map, this.imageCatalog);
    this.canvasDrawingService.drawUser(this.map, this.imageCatalog);
    //this.canvasDrawingService.drawTreasures(this.map, this.imageCatalog);
    this.canvasDrawingService.focusCanvas();
  }

  public async generateTreasureMap() {
    var request : MapGeneratorRequest = this.mapGeneratorService.generateRequest(this.mapAlgorithmInput, this.mapHeightInput, this.mapWidthInput, this.maxTunnelsInput, this.maxLengthInput);
    const promiseArray = [];
    promiseArray.push(new Promise<Map>(resolve => {
    this.mapGeneratorService.getGeneratedMapArray(request)
    .subscribe(data => {
        this.map=data;
        this.map.mapMetadata.pathDugCoordinates = [];
        resolve(this.map);
      })

    }))
        await Promise.all(promiseArray);
        return this.map;
  }

  public async generatePlayerStartingLocation() {
    //console.log(JSON.stringify(this.map));
    const promiseArray = [];
    promiseArray.push(new Promise<Coordinate>(resolve => {
      this.mapGeneratorService.getRandomPathCoordinates(this.map, 1)
      .subscribe(data => {
          this.map.mapMetadata.playerSpawnPoint = data[0];
          
          resolve(this.map.mapMetadata.playerSpawnPoint);
        })

      }))
          await Promise.all(promiseArray);
          return this.map.mapMetadata.playerSpawnPoint;
  }

  public async generateTreasureLocations() {
    //console.log(JSON.stringify(this.map));
    const promiseArray = [];
    promiseArray.push(new Promise<Coordinate[]>(resolve => {
      this.mapGeneratorService.getRandomPathCoordinates(this.map, this.treasuresInput)
      .subscribe(data => {
          this.map.mapMetadata.treasureSpawnPoints = data;

          resolve(this.map.mapMetadata.treasureSpawnPoints);
        })

      }))
          await Promise.all(promiseArray);
          return this.map.mapMetadata.treasureSpawnPoints;
  }

  public async movePlayer(event:KeyboardEvent){
    //console.log(event);
    if(this.endingSequenceActive == false) {
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
          this.openProgressDialog();
          break;
        case 'P':
          this.openProgressDialog();
          break;
        case ' ':
          await this.movementService.processAction(this.map, this.imageCatalog, this.canvasDrawingService, this.treasureService, this.treasuresInput);
  
          if(this.treasureService.checkIfAllZodiacsCollected() == true) {
            this.endingSequenceActive = true;
            this.canvasDrawingService.drawEndingSequenceScene(this.endingSequenceImageCatalog[this.endingSequenceSceneNumber]);
          }
          break;
      }
    } else {
      switch (event.key) {
        case ' ':
          if(this.endingSequenceImageCatalog[this.endingSequenceSceneNumber + 1] != undefined) {
            this.endingSequenceSceneNumber++;
            this.canvasDrawingService.drawEndingSequenceScene(this.endingSequenceImageCatalog[this.endingSequenceSceneNumber]);
          }
          break;
        case 'Backspace':
          if(this.endingSequenceImageCatalog[this.endingSequenceSceneNumber - 1] != undefined) {
            this.endingSequenceSceneNumber--;
            this.canvasDrawingService.drawEndingSequenceScene(this.endingSequenceImageCatalog[this.endingSequenceSceneNumber]);
          }
          break;
      }
    }
    
  }
}
