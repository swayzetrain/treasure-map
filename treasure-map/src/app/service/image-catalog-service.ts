import { Injectable } from "@angular/core";
import { PostProcessedTileType } from "../enum/PostProcessedTileType";
import { EndingSequenceCatalogEntry } from "../model/EndingSequenceCatalogEntry";
import { ImageCatalogEntry } from "../model/ImageCatalogEntry";

@Injectable({
    providedIn: 'root'
  })
export class ImageCatalogService {

    private imageCatalog : ImageCatalogEntry[] = [
        {id: 1, sourceLocation:'assets/images/30x30_tree_grass.png', postProcessedTileType: PostProcessedTileType.SIMPLE_WALL, image: new Image()},
        {id: 2, sourceLocation:'assets/images/Tree-upper-left-edge.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_GROUP_WALL, image: new Image()},
        {id: 3, sourceLocation:'assets/images/Tree-upper-middle-edge.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_GROUP_WALL, image: new Image()},
        {id: 4, sourceLocation:'assets/images/Tree-upper-right-edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_GROUP_WALL, image: new Image()},
        {id: 5, sourceLocation:'assets/images/Tree-middle-left-edge.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_GROUP_WALL, image: new Image()},
        {id: 6, sourceLocation:'assets/images/Tree-middle-middle-inside.png', postProcessedTileType: PostProcessedTileType.MID_MIDDLE_GROUP_WALL, image: new Image()},
        {id: 7, sourceLocation:'assets/images/Tree-middle-middle-no-upper-left.png', postProcessedTileType: PostProcessedTileType.MID_MIDDLE_NO_UPPER_LEFT_GROUP_WALL, image: new Image()},
        {id: 8, sourceLocation:'assets/images/Tree-middle-middle-no-upper-right.png', postProcessedTileType: PostProcessedTileType.MID_MIDDLE_NO_UPPER_RIGHT_GROUP_WALL, image: new Image()},
        {id: 9, sourceLocation:'assets/images/Tree-middle-middle-no-bottom-left.png', postProcessedTileType: PostProcessedTileType.MID_MIDDLE_NO_BOTTOM_LEFT_GROUP_WALL, image: new Image()},
        {id: 10, sourceLocation:'assets/images/Tree-middle-middle-no-bottom-right.png', postProcessedTileType: PostProcessedTileType.MID_MIDDLE_NO_BOTTOM_RIGHT_GROUP_WALL, image: new Image()},
        {id: 11, sourceLocation:'assets/images/Tree-middle-right-edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_MIDDLE_GROUP_WALL, image: new Image()},
        {id: 12, sourceLocation:'assets/images/Tree-bottom-left-edge.png', postProcessedTileType: PostProcessedTileType.LEFT_BOTTOM_GROUP_WALL, image: new Image()},
        {id: 13, sourceLocation:'assets/images/Tree-bottom-middle-edge.png', postProcessedTileType: PostProcessedTileType.MID_BOTTOM_GROUP_WALL, image: new Image()},
        {id: 14, sourceLocation:'assets/images/Tree-bottom-right-edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_BOTTOM_GROUP_WALL, image: new Image()},
        {id: 15, sourceLocation:'assets/images/Tree-upper-right-bottom-left.png', postProcessedTileType: PostProcessedTileType.BOTTOM_LEFT_UPPER_RIGHT_GROUP_WALL, image: new Image()},
        {id: 16, sourceLocation:'assets/images/Tree-upper-left-bottom-right.png', postProcessedTileType: PostProcessedTileType.UPPER_LEFT_BOTTOM_RIGHT_GROUP_WALL, image: new Image()},
        {id: 17, sourceLocation:'assets/images/30x30_sand.png', postProcessedTileType: PostProcessedTileType.SIMPLE_PATH, image: new Image()},
        {id: 18, sourceLocation:'assets/images/30x30_sand_ul_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_EDGE_PATH, image: new Image()},
        {id: 19, sourceLocation:'assets/images/30x30_sand_mu_edge.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_EDGE_PATH, image: new Image()},
        {id: 20, sourceLocation:'assets/images/30x30_sand_ur_edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_EDGE_PATH, image: new Image()},
        {id: 21, sourceLocation:'assets/images/30x30_sand_ml_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_EDGE_PATH, image: new Image()},
        {id: 22, sourceLocation:'assets/images/30x30_sand_mr_edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_MIDDLE_EDGE_PATH, image: new Image()},
        {id: 23, sourceLocation:'assets/images/30x30_sand_bl_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_BOTTOM_EDGE_PATH, image: new Image()},
        {id: 24, sourceLocation:'assets/images/30x30_sand_bm_edge.png', postProcessedTileType: PostProcessedTileType.MID_BOTTOM_EDGE_PATH, image: new Image()},
        {id: 25, sourceLocation:'assets/images/30x30_sand_br_edge.png', postProcessedTileType: PostProcessedTileType.RIGHT_BOTTOM_EDGE_PATH, image: new Image()},
        {id: 26, sourceLocation:'assets/images/30x30_sand_ul_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_CORNER_PATH, image: new Image()},
        {id: 27, sourceLocation:'assets/images/30x30_sand_ul_ur_corner.png', postProcessedTileType: PostProcessedTileType.UPPER_CORNERS_PATH, image: new Image()},
        {id: 28, sourceLocation:'assets/images/30x30_sand_ur_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_CORNER_PATH, image: new Image()},
        {id: 29, sourceLocation:'assets/images/30x30_sand_ul_bl_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_CORNERS_PATH, image: new Image()},
        {id: 30, sourceLocation:'assets/images/30x30_sand_ur_br_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_CORNERS_PATH, image: new Image()},
        {id: 31, sourceLocation:'assets/images/30x30_sand_all_4_corner.png', postProcessedTileType: PostProcessedTileType.ALL_CORNERS_PATH, image: new Image()},
        {id: 32, sourceLocation:'assets/images/30x30_sand_bl_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 33, sourceLocation:'assets/images/30x30_sand_bl_br_corner.png', postProcessedTileType: PostProcessedTileType.BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 34, sourceLocation:'assets/images/30x30_sand_br_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 35, sourceLocation:'assets/images/30x30_sand_mr_edge_bl_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_MIDDLE_EDGE_LEFT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 36, sourceLocation:'assets/images/30x30_sand_mr_edge_ul_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_MIDDLE_EDGE_LEFT_UPPER_CORNER_PATH, image: new Image()},
        {id: 37, sourceLocation:'assets/images/30x30_sand_mr_edge_ul_bl_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_MIDDLE_EDGE_LEFT_CORNERS_PATH, image: new Image()},
        {id: 38, sourceLocation:'assets/images/30x30_sand_ml_edge_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_EDGE_RIGHT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 39, sourceLocation:'assets/images/30x30_sand_ml_edge_ur_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_EDGE_RIGHT_UPPER_CORNER_PATH, image: new Image()},
        {id: 40, sourceLocation:'assets/images/30x30_sand_ml_edge_ur_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_EDGE_RIGHT_CORNERS_PATH, image: new Image()},
        {id: 41, sourceLocation:'assets/images/30x30_sand_ml_mr_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_EDGE_RIGHT_MIDDLE_EDGE_PATH, image: new Image()},
        {id: 42, sourceLocation:'assets/images/30x30_sand_um_bm_edge.png', postProcessedTileType: PostProcessedTileType.UPPER_MIDDLE_EDGE_BOTTOM_MIDDLE_EDGE, image: new Image()},
        {id: 43, sourceLocation:'assets/images/30x30_sand_ml_mr_bm_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_RIGHT_MIDDLE_BOTTOM_MIDDLE_EDGE_PATH, image: new Image()},
        {id: 44, sourceLocation:'assets/images/30x30_sand_bm_edge_ul_corner.png', postProcessedTileType: PostProcessedTileType.MID_BOTTOM_EDGE_LEFT_UPPER_CORNER_PATH, image: new Image()},
        {id: 45, sourceLocation:'assets/images/30x30_sand_bm_edge_ul_ur_corner.png', postProcessedTileType: PostProcessedTileType.MID_BOTTOM_EDGE_UPPER_CORNERS_PATH, image: new Image()},
        {id: 46, sourceLocation:'assets/images/30x30_sand_bm_edge_ur_corner.png', postProcessedTileType: PostProcessedTileType.MID_BOTTOM_EDGE_RIGHT_UPPER_CORNER_PATH, image: new Image()},
        {id: 47, sourceLocation:'assets/images/30x30_sand_mu_edge_bl_corner.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_EDGE_LEFT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 48, sourceLocation:'assets/images/30x30_sand_mu_edge_bl_br_corner.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_EDGE_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 49, sourceLocation:'assets/images/30x30_sand_mu_edge_br_corner.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_EDGE_RIGHT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 50, sourceLocation:'assets/images/30x30_sand_ul_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_RIGHT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 51, sourceLocation:'assets/images/30x30_sand_ur_bl_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_LEFT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 52, sourceLocation:'assets/images/30x30_sand_ur_bl_br_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_LEFT_BOTTOM_RIGHT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 53, sourceLocation:'assets/images/30x30_sand_bl_edge_ur_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_BOTTOM_EDGE_RIGHT_UPPER_CORNER_PATH, image: new Image()},
        {id: 54, sourceLocation:'assets/images/30x30_sand_um_mr_bm_edge.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_RIGHT_MIDDLE_MID_BOTTOM_EDGE_PATH, image: new Image()},
        {id: 55, sourceLocation:'assets/images/30x30_sand_ur_edge_bl_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_UPPER_EDGE_LEFT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 56, sourceLocation:'assets/images/30x30_sand_ul_edge_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_EDGE_RIGHT_BOTTOM_CORNER_PATH, image: new Image()},
        {id: 57, sourceLocation:'assets/images/30x30_sand_um_ml_bm_edge.png', postProcessedTileType: PostProcessedTileType.MID_UPPER_LEFT_MIDDLE_MID_BOTTOM_EDGE_PATH, image: new Image()},
        {id: 58, sourceLocation:'assets/images/30x30_sand_ml_um_mr_edge.png', postProcessedTileType: PostProcessedTileType.LEFT_MIDDLE_MID_UPPER_RIGHT_MIDDLE_EDGE_PATH, image: new Image()},
        {id: 59, sourceLocation:'assets/images/30x30_sand_ul_bl_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_LEFT_BOTTOM_RIGHT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 60, sourceLocation:'assets/images/30x30_sand_br_edge_ul_corner.png', postProcessedTileType: PostProcessedTileType.RIGHT_BOTTOM_EDGE_LEFT_UPPER_CORNER_PATH, image: new Image()},
        {id: 61, sourceLocation:'assets/images/30x30_sand_ul_ur_br_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_RIGHT_UPPER_RIGHT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 62, sourceLocation:'assets/images/30x30_sand_ul_ur_bl_corner.png', postProcessedTileType: PostProcessedTileType.LEFT_UPPER_RIGHT_UPPER_LEFT_BOTTOM_CORNERS_PATH, image: new Image()},
        {id: 18, sourceLocation:'assets/images/30x30_sand_dug.png', postProcessedTileType: PostProcessedTileType.PATH_DUG, image: new Image()},
        {id: 20, sourceLocation:'assets/images/30x30_billcipher.png', postProcessedTileType: PostProcessedTileType.PLAYER, image: new Image()},
        {id: 21, sourceLocation:'assets/images/30x30_Portal_teal.png', postProcessedTileType: PostProcessedTileType.PORTAL, image: new Image()},
        {id: 19, sourceLocation:'assets/images/30x30_treasure.png', postProcessedTileType: PostProcessedTileType.TREASURE, image: new Image()}
    ];

    private endingSequenceImageCatalog : EndingSequenceCatalogEntry[] = [
        {id: 1, sourceLocation: 'assets/images/Ending_Scene_1.png', image: new Image(), storyText: 'Now that I have all 10 Zodiac pieces, I will become unstoppable!', storyTextFontStyle: '36px Arial'},
        {id: 2, sourceLocation: 'assets/images/Ending_Scene_2.png', image: new Image(), storyText: 'Magister animi mentibus. Protector corporum formae. Fortius magis quam hominibus. Clipeum ab omnia. Quod editio symboli nam quaero.', storyTextFontStyle: '30px Arial'},
        {id: 3, sourceLocation: 'assets/images/Ending_Scene_3.png', image: new Image(), storyText: 'Bill becomes surronded by the Zodiac pieces. The sky continues to darken and he begins to glow.', storyTextFontStyle: '36px Arial'},
        {id: 4, sourceLocation: 'assets/images/Ending_Scene_4.png', image: new Image(), storyText: 'Thank you for this, Connor. I can feel it already. My friends are ready for their return.', storyTextFontStyle: '36px Arial'}
    ]

    public async loadImages() {
        const promiseArray = [];
    
        for(var entry in this.imageCatalog) {
            promiseArray.push(new Promise<void>(resolve => {
                this.imageCatalog[entry].image.src = this.imageCatalog[entry].sourceLocation;
                this.imageCatalog[entry].image.onload = function() {
                    resolve();
                 };
            }))
           
        }

        await Promise.all(promiseArray);
        console.log("All Images Loaded");
        return this.imageCatalog;
    }

    public async loadEndingSequenceImages() {
        const promiseArray = [];

        for(var entry in this.endingSequenceImageCatalog) {
            promiseArray.push(new Promise<void>(resolve => {
                this.endingSequenceImageCatalog[entry].image.src = this.endingSequenceImageCatalog[entry].sourceLocation;
                this.endingSequenceImageCatalog[entry].image.onload = function() {
                    resolve();
                };
            }))
        }

        await Promise.all(promiseArray);
        console.log("All Ending Scene Images Loaded.");
        return this.endingSequenceImageCatalog;
    }
}