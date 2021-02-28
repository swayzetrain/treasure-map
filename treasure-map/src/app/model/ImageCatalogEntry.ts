import { PostProcessedTileType } from "../enum/PostProcessedTileType";

export class ImageCatalogEntry {
    id: number;
    sourceLocation: string;
    postProcessedTileType: PostProcessedTileType;
    image: HTMLImageElement;
}