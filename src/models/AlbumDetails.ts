export interface AlbumDetails {
    artists_sort: string;
    released: string;
    extraartists: Artist[];
    formats: Format[];
    styles: string[];
    labels: string[];
    genres: string[];
    tracklist: TrackList[];
}

export interface AlbumProps {
    match: {
        params: {
            id: string;
        };
    };
}

export interface TrackList {
    position: string;
    title: string;
    duration: string;
}
export interface Artist {
    name: string;
    role: string;
}

export interface Format {
    descriptions: string[];
}

export class AlbumDetails {
    constructor({
        artists_sort,
        extraartists,
        formats,
        styles,
        labels,
        genres,
        tracklist
    }: AlbumDetails) {
        this.artists_sort = artists_sort;
        this.extraartists = extraartists;
        this.formats = formats;
        this.styles = styles;
        this.labels = labels;
        this.genres = genres;
        this.tracklist = tracklist;
    }
}
