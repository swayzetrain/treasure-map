import { TileType } from "../enum/TileType";

export class ImageCatalogEntry {
    id: number;
    sourceLocation: string;
    tileType: TileType;
    image: HTMLImageElement;
}