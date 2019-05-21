export interface AlbumDetails {
    artists_sort: string;
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
