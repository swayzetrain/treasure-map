import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CanvasDrawingService } from '../service/canvas-drawing-service';
import { Map } from '../model/Map';
import { TreasureCatalogEntry } from '../model/TreasureCatalogEntry';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {

  map:Map;
  treasureCatalog:TreasureCatalogEntry[];

  constructor(
    public dialogRef: MatDialogRef<ProgressTrackerComponent>,
    private canvasDrawingService:CanvasDrawingService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.map = data.map;
      this.treasureCatalog = data.treasureCatalog;
    }

  ngOnInit(): void {
    this.canvasDrawingService.drawProgressChart(this.map, this.treasureCatalog);
  }

  close() {
    this.dialogRef.close();
    this.canvasDrawingService.focusCanvas();
  }

}
