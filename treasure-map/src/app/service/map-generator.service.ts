import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MapGeneratorRequest } from '../model/MapGeneratorRequest';
import { Map } from '../model/Map';

import { MapAlgorithm, MapAlgorithmMapping } from '../enum/MapAlgorithm';
import { MapDataPoint } from '../model/MapDataPoint';

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
}