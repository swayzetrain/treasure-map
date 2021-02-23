import { TreasureType } from "../enum/TreasureType";

export class TreasureCatalogEntry {
    treasureType: TreasureType;
    imageSourceLarge: string;
    imageSourceSmall: string;
    imageLarge: HTMLImageElement;
    imageSmall: HTMLImageElement;
    Collected: boolean;
}