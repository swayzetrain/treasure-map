import { PostProcessedTileType } from "../enum/PostProcessedTileType";
import { TileType } from "../enum/TileType";

export class ImageCatalogEntry {
    id: number;
    sourceLocation: string;
    postProcessedTileType: PostProcessedTileType;
    image: HTMLImageElement;
}