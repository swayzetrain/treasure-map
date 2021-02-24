import { Injectable } from "@angular/core";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { TreasureType } from "../enum/TreasureType";
import { TreasureCatalogEntry } from "../model/TreasureCatalogEntry";

@Injectable({
    providedIn: 'root'
  })
export class TreasureService {

private treasureCatalog : TreasureCatalogEntry[] = [
    {treasureType: TreasureType.SPECTACLES, imageSourceLarge: 'assets/images/glasses_zodiac_large.png', imageSourceSmall: 'assets/images/glasses_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STITCHED_HEART, imageSourceLarge: 'assets/images/heart_zodiac_large.png', imageSourceSmall: 'assets/images/heart_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRESENT, imageSourceLarge: 'assets/images/cresent_zodiac_large.png', imageSourceSmall: 'assets/images/cresent_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.SIX_FINGERED_HAND, imageSourceLarge: 'assets/images/hand_zodiac_large.png', imageSourceSmall: 'assets/images/hand_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BAG_OF_ICE, imageSourceLarge: 'assets/images/ice_zodiac_large.png', imageSourceSmall: 'assets/images/ice_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.LLAMA, imageSourceLarge: 'assets/images/llama_zodiac_large.png', imageSourceSmall: 'assets/images/llama_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PINE_TREE, imageSourceLarge: 'assets/images/tree_zodiac_large.png', imageSourceSmall: 'assets/images/tree_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.QUESTION_MARK, imageSourceLarge: 'assets/images/question_zodiac_large.png', imageSourceSmall: 'assets/images/question_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.SHOOTING_STAR, imageSourceLarge: 'assets/images/shooting_star_zodiac_large.png', imageSourceSmall: 'assets/images/shooting_star_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PENTACLE, imageSourceLarge: 'assets/images/star_zodiac_large.png', imageSourceSmall: 'assets/images/star_zodiac_small.png', imageLarge: new Image(), imageSmall: new Image(), Collected: false}
];

public async loadTreasureImages() {
    const promiseArray = [];

    for(var entry in this.treasureCatalog) {
        promiseArray.push(new Promise<void>(resolve => {
            this.treasureCatalog[entry].imageSmall.src = this.treasureCatalog[entry].imageSourceSmall;
            this.treasureCatalog[entry].imageSmall.onload = function() {
                resolve();
            };
        }))

        promiseArray.push(new Promise<void>(resolve => {
            this.treasureCatalog[entry].imageLarge.src = this.treasureCatalog[entry].imageSourceLarge;
            this.treasureCatalog[entry].imageLarge.onload = function() {
                resolve();
            };
        }))
    }

    await Promise.all(promiseArray);
    console.log("All Treasure Images Loaded");
    return this.treasureCatalog;
}

public getTreasureFromCatalog() : TreasureCatalogEntry {
    
    var foundTreasureNotCollected : boolean = false;
    
    while(!foundTreasureNotCollected) {
        var entryNumber = Math.floor(Math.random() * (this.treasureCatalog.length));
        console.log("Random number: " + entryNumber);

        if(!this.treasureCatalog[entryNumber].Collected) {
            this.treasureCatalog[entryNumber].Collected = true;
            var treasureCatalogEntry = this.treasureCatalog[entryNumber];
            return treasureCatalogEntry;
        }
    }
}

}