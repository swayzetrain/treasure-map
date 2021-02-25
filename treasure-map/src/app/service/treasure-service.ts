import { Injectable } from "@angular/core";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { TreasureCategory } from "../enum/TreasureCategory";
import { TreasureType } from "../enum/TreasureType";
import { TreasureCatalogEntry } from "../model/TreasureCatalogEntry";

@Injectable({
    providedIn: 'root'
  })
export class TreasureService {

private treasureCatalog : TreasureCatalogEntry[] = [
    {treasureType: TreasureType.SPECTACLES, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/glasses_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/glasses_zodiac_large.png', imageSourceSmall: 'assets/images/glasses_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STITCHED_HEART, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/heart_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/heart_zodiac_large.png', imageSourceSmall: 'assets/images/heart_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRESENT, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/cresent_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/cresent_zodiac_large.png', imageSourceSmall: 'assets/images/cresent_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.SIX_FINGERED_HAND, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/hand_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/hand_zodiac_large.png', imageSourceSmall: 'assets/images/hand_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BAG_OF_ICE, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/ice_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/ice_zodiac_large.png', imageSourceSmall: 'assets/images/ice_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.LLAMA, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/llama_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/llama_zodiac_large.png', imageSourceSmall: 'assets/images/llama_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PINE_TREE, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/tree_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/tree_zodiac_large.png', imageSourceSmall: 'assets/images/tree_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.QUESTION_MARK, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/question_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/question_zodiac_large.png', imageSourceSmall: 'assets/images/question_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.SHOOTING_STAR, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/shooting_star_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/shooting_star_zodiac_large.png', imageSourceSmall: 'assets/images/shooting_star_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PENTACLE, treasureCategory: TreasureCategory.ZODIAC, transparentImageLargeSource: 'assets/images/star_zodiac_large_transparent.png', imageSourceLarge: 'assets/images/star_zodiac_large.png', imageSourceSmall: 'assets/images/star_zodiac_small.png', transparentImageLarge: new Image(), imageLarge: new Image(), imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BRAIN_FLASK, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/brain_flask_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CHIPACKERZ, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/chipackerz_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.COIN, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/gold_coin_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRYSTAL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/crystal_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.EYEBALL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/eyeball_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PITT_SODA, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/pitt_soda_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STANATAS, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/stanatas_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BRAIN_FLASK, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/brain_flask_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CHIPACKERZ, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/chipackerz_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.COIN, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/gold_coin_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRYSTAL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/crystal_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.EYEBALL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/eyeball_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PITT_SODA, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/pitt_soda_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STANATAS, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/stanatas_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BRAIN_FLASK, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/brain_flask_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CHIPACKERZ, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/chipackerz_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.COIN, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/gold_coin_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRYSTAL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/crystal_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.EYEBALL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/eyeball_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PITT_SODA, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/pitt_soda_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STANATAS, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/stanatas_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.BRAIN_FLASK, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/brain_flask_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CHIPACKERZ, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/chipackerz_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.COIN, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/gold_coin_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.CRYSTAL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/crystal_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.EYEBALL, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/eyeball_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.PITT_SODA, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/pitt_soda_small.png', imageSmall: new Image(), Collected: false},
    {treasureType: TreasureType.STANATAS, treasureCategory: TreasureCategory.COMMON, imageSourceSmall: 'assets/images/stanatas_small.png', imageSmall: new Image(), Collected: false}
];

private zodiacTreasureClaimedOnMap: boolean = false;
private numberTreasuresOnMap: number;
private treasuresFoundOnMap: number;

public setNumberTreasuresOnMap(numberTreasures:number) {
    this.numberTreasuresOnMap = numberTreasures;
}

public setTreasuresFoundOnMap(numberTreasures:number) {
    this.treasuresFoundOnMap = numberTreasures;
}

public setZodiacTreasureClaimedOnMap(zodiacTreasureClaimedOnMap:boolean) {
    this.zodiacTreasureClaimedOnMap = zodiacTreasureClaimedOnMap;
}

public async loadTreasureImages() {
    const promiseArray = [];

    for(var entry in this.treasureCatalog) {
        promiseArray.push(new Promise<void>(resolve => {
            this.treasureCatalog[entry].imageSmall.src = this.treasureCatalog[entry].imageSourceSmall;
            this.treasureCatalog[entry].imageSmall.onload = function() {
                resolve();
            };
        }))
        if (this.treasureCatalog[entry].treasureCategory == TreasureCategory.ZODIAC) {
            promiseArray.push(new Promise<void>(resolve => {
                this.treasureCatalog[entry].imageLarge.src = this.treasureCatalog[entry].imageSourceLarge;
                this.treasureCatalog[entry].imageLarge.onload = function() {
                    resolve();
                };
            }))
    
            promiseArray.push(new Promise<void>(resolve => {
                this.treasureCatalog[entry].transparentImageLarge.src = this.treasureCatalog[entry].transparentImageLargeSource;
                this.treasureCatalog[entry].transparentImageLarge.onload = function() {
                    resolve();
                };
            }))
        }
    }

    await Promise.all(promiseArray);
    console.log("All Treasure Images Loaded");
    return this.treasureCatalog;
}

public getTreasureFromCatalog() : TreasureCatalogEntry {
    this.treasuresFoundOnMap++;

    var foundTreasureNotCollected : boolean = false;
    
    while(!foundTreasureNotCollected) {
        var entryNumber = Math.floor(Math.random() * (this.treasureCatalog.length));
        console.log("Random number: " + entryNumber);

        if(!this.treasureCatalog[entryNumber].Collected) {
            if(this.treasureCatalog[entryNumber].treasureCategory == TreasureCategory.ZODIAC && this.zodiacTreasureClaimedOnMap == true) {
                continue;
            }

            if(this.treasuresFoundOnMap == this.numberTreasuresOnMap && this.zodiacTreasureClaimedOnMap == false && !(this.treasureCatalog[entryNumber].treasureCategory == TreasureCategory.ZODIAC)) {
                continue;
            }
            
            if(this.treasureCatalog[entryNumber].treasureCategory == TreasureCategory.ZODIAC ) {
                this.treasureCatalog[entryNumber].Collected = true;
                this.zodiacTreasureClaimedOnMap = true;
            }
           
            var treasureCatalogEntry = this.treasureCatalog[entryNumber];
            return treasureCatalogEntry;
        }
    }
}

}