export interface Album {
    YoutubeVideoID: string;
    album: string;
    artist: string;
    cover: string;
    discogsID: string;
}

export type AlbumRenderer = (Album) => JSX.Element;

export interface Albums {
    [index: number]: Album;
    map(renderer: AlbumRenderer): JSX.Element[];
}
