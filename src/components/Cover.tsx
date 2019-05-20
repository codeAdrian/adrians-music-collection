import React from 'react';
import LazyLoad from 'react-lazy-load';

interface CoverProps {
    offset: number;
    cover: string;
    artist: string;
    album: string;
}

const Cover = ({ offset, cover, artist, album }: CoverProps) => (
    <LazyLoad offsetVertical={offset}>
        <img
            src={`https://res.cloudinary.com/adrianbece/image/upload/c_scale,h_900,w_900/music/${cover}`}
            alt={` ${artist} - ${album} cover artwork`}
        />
    </LazyLoad>
);

export { Cover };
