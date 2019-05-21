import React from 'react';
import LazyLoad from 'react-lazy-load';
import { CLOUDINARY_API, CLOUDINARY_CONFIG, CLOUDINARY_MUSIC } from 'constant';

interface CoverProps {
    offset: number;
    cover: string;
    artist: string;
    album: string;
}

const Cover: React.FC<CoverProps> = ({ offset, cover, artist, album }) => {
    const coverUrl = `${CLOUDINARY_API}/${CLOUDINARY_CONFIG}/${CLOUDINARY_MUSIC}/${cover}`;
    const alt = `${artist} - ${album} cover artwork`;

    return (
        <LazyLoad offsetVertical={offset}>
            <img src={coverUrl} alt={alt} />
        </LazyLoad>
    );
};

export { Cover };
