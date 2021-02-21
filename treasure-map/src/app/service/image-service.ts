import { Injectable } from "@angular/core";
import { TileType } from "../enum/TileType";
import { ImageCatalogEntry } from "../model/ImageCatalog";

@Injectable({
    providedIn: 'root'
  })
export class ImageService {

    private imageCatalog : ImageCatalogEntry[] = [
        {id: 1, sourceLocation:'assets/images/30x30_tree.png', tileType: TileType.Wall, image: new Image() },
        {id: 2, sourceLocation:'assets/images/30x30_sand.png', tileType: TileType.Path, image: new Image() },
        {id: 3, sourceLocation:'assets/images/30x30_treasure.png', tileType: TileType.Path_Treasure, image: new Image() },
        {id: 4, sourceLocation:'assets/images/30x30_billcipher.png', tileType: TileType.Player, image: new Image() },
        {id: 5, sourceLocation:'assets/images/1000x550_treasure1_large.png', tileType: TileType.Treasure_Large, image: new Image() }
    ];

    public async loadImages() {
        const promiseArray = [];
        var imagesToLoad = this.imageCatalog.length;
        var imagesLoaded = 0;
    
        for(var entry in this.imageCatalog) {
            promiseArray.push(new Promise<void>(resolve => {
                this.imageCatalog[entry].image.src = this.imageCatalog[entry].sourceLocation;
                this.imageCatalog[entry].image.onload = function() {
                    imagesLoaded++;
                    resolve();
                 };
            }))
           
        }

        await Promise.all(promiseArray);
        console.log("All Images Loaded");
        return this.imageCatalog;
    }
}