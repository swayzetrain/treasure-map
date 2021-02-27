import { Coordinate } from './Coordinate';
import { MapDataPoint } from './MapDataPoint';
import { MapGeneratorRequest } from './MapGeneratorRequest';

export class Map {
    mapData: MapDataPoint[][];
    mapMetadata: MapGeneratorRequest;

}