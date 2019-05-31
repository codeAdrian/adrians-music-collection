export interface AlbumDetails {
  artists_sort: string;
  released: string;
  community: {
    rating: {
      average: number;
    };
  };
  extraartists: Artist[];
  formats: Format[];
  styles: string[];
  labels: Label[];
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

export interface Label {
  name: string;
  catno: string;
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
    released,
    formats,
    styles,
    community,
    labels,
    genres,
    tracklist
  }: AlbumDetails) {
    this.artists_sort = artists_sort;
    this.extraartists = extraartists;
    this.community = community;
    this.formats = formats;
    this.released = released;
    this.styles = styles;
    this.labels = labels;
    this.genres = genres;
    this.tracklist = tracklist;
  }
}
