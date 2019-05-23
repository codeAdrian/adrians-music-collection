export interface Album {
    youtubeVideoId: string;
    album: string;
    artist: string;
    cover: string;
    discogsId: string;
}

// Class declaration merging
/*
const item = {

} as Album

const itemx: Album = {

}

cosnt itemz = new Album() */

export class Album {
    constructor({ youtubeVideoId, album, artist, cover, discogsId }: Album) {
        this.youtubeVideoId = youtubeVideoId;
        this.album = album;
        this.artist = artist;
        this.cover = cover;
        this.discogsId = discogsId;
    }
}
