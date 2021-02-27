import { Coordinate } from './Coordinate';

export class MapGeneratorRequest {
    mapAlgorithm: string;
    height: number;
    width: number;
    maxTunnels: number;
    maxLength: number;
    edgePostProcessingEnabled: boolean;
    seed?: number;
    playerSpawnPoint?: Coordinate;
    treasureSpawnPoints?: Coordinate[];
    portalCoordinate?: Coordinate;
}