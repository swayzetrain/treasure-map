import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { CanvasDrawingService } from '../service/canvas-drawing-service';

@Component({
  selector: 'app-intro-dialog-body',
  templateUrl: './intro-dialog-body.component.html',
  styleUrls: ['./intro-dialog-body.component.css']
})
export class IntroDialogBodyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IntroDialogBodyComponent>, private canvasDrawingService:CanvasDrawingService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
    this.canvasDrawingService.focusCanvas();
  }

}
