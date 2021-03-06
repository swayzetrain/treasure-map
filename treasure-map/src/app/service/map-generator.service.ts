import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MapGeneratorRequest } from '../model/MapGeneratorRequest';
import { Map } from '../model/Map';

import { MapAlgorithm } from '../enum/MapAlgorithm';
import { MapDataPoint } from '../model/MapDataPoint';
import { Coordinate } from '../model/Coordinate';

@Injectable({
  providedIn: 'root'
})
export class MapGeneratorService {

  constructor(private httpClient: HttpClient) { }

  public generateRequest(mapAlgorithmInput:any, mapHeight:number, mapWidth:number, mapMaxTunnels:number, mapMaxLength:number): MapGeneratorRequest {
    var requestBody: MapGeneratorRequest

    switch(mapAlgorithmInput.value) {
      case MapAlgorithm.RANDOM_WALK: 
        requestBody = {
          mapAlgorithm: MapAlgorithm.RANDOM_WALK,
          height: mapHeight,
          width: mapWidth,
          maxTunnels: mapMaxTunnels,
          maxLength: mapMaxLength,
          edgePostProcessingEnabled: true
        };
        break;
    }
    console.log(JSON.stringify(requestBody));
    return requestBody;
  }

  public getGeneratedMapArray(requestBody: MapGeneratorRequest): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    var URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/generate-map';

    return this.httpClient.post(URL, JSON.stringify(requestBody), { 'headers': headers });
  }

  public getRandomPathCoordinates(map:Map, quantity:number) : Observable<any> {

    const headers = { 'content-type': 'application/json' }
    var URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/randomization/coordinates/path-categories';

    var requestBody : MapDataPoint[][] = [];
    
    for(var y = 0; y < map.mapData.length; y++) {
        requestBody[y] = [];
      for(var x = 0; x < map.mapData[y].length; x++) {
        requestBody[y][x] = new MapDataPoint();
        requestBody[y][x].tileCategory = map.mapData[y][x].tileCategory;
      }
    }

    map.mapData;

    let params = new HttpParams();
    params = params.append('quantity', quantity.toString());

    return this.httpClient.post(URL, JSON.stringify(requestBody), { 'headers': headers, params: params});
  }

  public async generateTreasureMap(map:Map, mapAlgorithmInput:any, mapHeight:number, mapWidth:number, mapMaxTunnels:number, mapMaxLength:number) : Promise<Map> {
    const promiseArray = [];
    
    var request : MapGeneratorRequest = this.generateRequest(mapAlgorithmInput, mapHeight, mapWidth, mapMaxTunnels, mapMaxLength);

    console.log(JSON.stringify(request));
    promiseArray.push(new Promise<Map>(resolve => {
        this.getGeneratedMapArray(request)
      .subscribe(data => {
        map.mapData=data.mapData;
        map.mapMetadata=data.mapMetadata;
        map.mapMetadata.pathDugCoordinates = [];
        resolve(map);
      })

    }))
        await Promise.all(promiseArray);
        return map;
  }

  public async generatePlayerStartingLocation(map:Map) {
    //console.log(JSON.stringify(this.map));
    const promiseArray = [];
    promiseArray.push(new Promise<Coordinate>(resolve => {
      this.getRandomPathCoordinates(map, 1)
      .subscribe(data => {
          map.mapMetadata.playerSpawnPoint = data[0];
          map.mapMetadata.playerStance = 0;
          
          resolve(map.mapMetadata.playerSpawnPoint);
        })

      }))
          await Promise.all(promiseArray);
          return map.mapMetadata.playerSpawnPoint;
  }

  public async generateTreasureLocations(map:Map, treasuresInput:number) {
    //console.log(JSON.stringify(this.map));
    const promiseArray = [];
    promiseArray.push(new Promise<Coordinate[]>(resolve => {
      this.getRandomPathCoordinates(map, treasuresInput)
      .subscribe(data => {
          map.mapMetadata.treasureSpawnPoints = data;

          resolve(map.mapMetadata.treasureSpawnPoints);
        })

      }))
          await Promise.all(promiseArray);
          return map.mapMetadata.treasureSpawnPoints;
  }
}