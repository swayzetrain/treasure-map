import { Coordinate } from './Coordinate';

export class MapGeneratorRequest {
    mapAlgorithm: string;
    height: number;
    width: number;
    maxTunnels: number;
    maxLength: number;
    treasures?: number;
    seed?: number;
    generateSpawnCoordinate: boolean;
    spawnCoordinate?: Coordinate;
}