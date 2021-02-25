import { TreasureCategory } from "../enum/TreasureCategory";
import { TreasureType } from "../enum/TreasureType";

export class TreasureCatalogEntry {
    treasureType: TreasureType;
    treasureCategory: TreasureCategory; 
    transparentImageLargeSource?: string;
    imageSourceLarge?: string;
    imageSourceSmall: string;
    transparentImageLarge?: HTMLImageElement;
    imageLarge?: HTMLImageElement;
    imageSmall: HTMLImageElement;
    Collected?: boolean;
}