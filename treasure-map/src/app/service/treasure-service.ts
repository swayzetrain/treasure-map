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
    var entryNumber = Math.floor(Math.random() * (this.treasureCatalog.length));
    console.log("Random number: " + entryNumber);

    var treasureCatalogEntry = this.treasureCatalog[entryNumber];
    console.log(treasureCatalogEntry);
    console.log(this.treasureCatalog);

    this.treasureCatalog.splice(entryNumber, 1);
    console.log(treasureCatalogEntry);
    console.log(this.treasureCatalog);

    return treasureCatalogEntry;
}

}