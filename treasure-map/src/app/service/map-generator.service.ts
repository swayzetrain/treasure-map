import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapGeneratorRequest } from '../model/MapGeneratorRequest';
import { Map } from '../model/Map';

import { MapAlgorithm, MapAlgorithmMapping } from '../enum/MapAlgorithm';

@Injectable({
  providedIn: 'root'
})
export class MapGeneratorService {

  private URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/generate-map';

  constructor(private httpClient: HttpClient) { }

  public generateRequest(mapAlgorithmInput:any, mapHeight:number, mapWidth:number, mapMaxTunnels:number, mapMaxLength:number, mapTreasures:number): MapGeneratorRequest {
    var requestBody: MapGeneratorRequest

    switch(mapAlgorithmInput.value) {
      case MapAlgorithm.RANDOM_WALK: 
        requestBody = {
          mapAlgorithm: MapAlgorithm.RANDOM_WALK,
          height: mapHeight,
          width: mapWidth,
          maxTunnels: mapMaxTunnels,
          maxLength: mapMaxLength,
          treasures: mapTreasures,
          generateSpawnCoordinate: true
        };
        break;
    }
    return requestBody;
  }

  public getGeneratedMapArray(requestBody: MapGeneratorRequest): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    var URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/generate-map';

    console.log(JSON.stringify(requestBody));

    return this.httpClient.post(URL, JSON.stringify(requestBody), { 'headers': headers });
  }

  public getRandomPathCoordinate(map:Map) : Observable<any> {

    const headers = { 'content-type': 'application/json' }
    var URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/randomization/path-coordinates';

    var requestBody = map.mapData;

    return this.httpClient.post(URL, JSON.stringify(requestBody), { 'headers': headers });


  }
}