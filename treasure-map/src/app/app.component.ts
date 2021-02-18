import { Component, OnInit } from '@angular/core';
import { MapGeneratorService } from './service/map-generator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'treasure-map';

  public treasureMap: string[][];

  constructor(private mapGeneratorService:MapGeneratorService) {}

  ngOnInit() {
    this.generateTreasureMap()
  }

  public generateTreasureMap() : void {
    this.mapGeneratorService.getGeneratedMapArray()
      .subscribe(data => {
        console.log(data)
        this.treasureMap=data;
      })
  }

}
