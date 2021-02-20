import { Component, OnInit } from '@angular/core';
import { MapGeneratorService } from './service/map-generator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treasure-map';

  public treasureMap: string[][];

  private images = {};

  constructor(private mapGeneratorService:MapGeneratorService) {}

  ngOnInit() {
    this.loadImages();
  }

  public generateTreasureMap() : void {
    this.mapGeneratorService.getGeneratedMapArray()
      .subscribe(async data => {
        this.treasureMap=data;
        this.drawTreasureMap();
        this.drawUser();
      })
  }

  public loadImages() {
    var imagesLoaded = 0;
    var imageSources = [
      'assets/images/30x30_tree.png',
      'assets/images/30x30_sand.png',
      'assets/images/30x30_treasure.png',
      'assets/images/30x30_billciper.png'
    ];

    for(var src in imageSources) {
      console.log(src);
      console.log(imageSources[src]);
      this.images[src] = new Image();
      this.images[src].src = imageSources[src];
      this.images[src].onload = function() {
        console.log('Loading image');
        imagesLoaded++;

        if(imageSources.length == this.imagesLoaded) {
          console.log('Image Loading Complete!');
        }
      }
    }
  }

  public drawTreasureMap() {

    var canvas = <HTMLCanvasElement> document.getElementById('treasureMapCanvas');

    var height = this.treasureMap.length
    var width = this.treasureMap[0].length

    // draw the canvas
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.canvas.width = width * 30;
      ctx.canvas.height = height * 30;

      console.log('Drawing');

      for(let y = 0; y < this.treasureMap.length; y++) {
        for(let x = 0; x < this.treasureMap[y].length; x++) {
          if(this.treasureMap[y][x] == '0') {
              ctx.drawImage(this.images[0], (x*30), (y*30));
          } else if(this.treasureMap[y][x] == '1') {
              ctx.drawImage(this.images[1], (x*30), (y*30));
          } else if(this.treasureMap[y][x] == '2') {
              ctx.drawImage(this.images[2], (x*30), (y*30));
          }
        }
      }
        
      };
    }

    public drawUser() {
      var canvas = <HTMLCanvasElement> document.getElementById('treasureMapCanvas');

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(this.images[3], 100, 100);

      }
    }
}
