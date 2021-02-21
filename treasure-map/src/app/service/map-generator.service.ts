import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapGeneratorRequest } from '../model/MapGeneratorRequest';

@Injectable({
    providedIn: 'root'
  })
  export class MapGeneratorService {
  
    private URL = 'https://procedural-map.swayzetrain.tech/procedural-map/v1/generate-map';
  
    constructor(private httpClient: HttpClient) { }
  
    public getGeneratedMapArray(): Observable<any> {

        const headers = { 'content-type': 'application/json'}
        const requestBody: MapGeneratorRequest = {
            mapAlgorithm: "RANDOM_WALK",
            height: 40,
            width: 75,
            maxTunnels: 450,
            maxLength: 20,
            treasures: 10,
            generateSpawnCoordinate: true
        };

        return this.httpClient.post(this.URL, JSON.stringify(requestBody), {'headers':headers});


    }
  }