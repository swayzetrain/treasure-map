import { AudioDistanceCategory } from "../enum/AudioDistanceCategory";

export class AudioCatalogEntry {
    id:number;
    sourceLocation:string;
    audioDistanceCategory:AudioDistanceCategory;
    audio?:HTMLAudioElement;
}