import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Loading } from 'components';
import { CoverProps } from 'models';
import { CLOUDINARY_API, CLOUDINARY_CONFIG, CLOUDINARY_MUSIC } from 'constant';

const Cover: React.FC<CoverProps> = ({ offsetVertical, cover, artist, album }) => {
    const coverUrl = `${CLOUDINARY_API}/${CLOUDINARY_CONFIG}/${CLOUDINARY_MUSIC}/${cover}`;
    const alt = `${artist} - ${album} cover artwork`;

    return (
        <figure className='cover'>
            <Loading className='cover__loading' />
            {cover && (
                <LazyLoad offsetVertical={offsetVertical}>
                    <img
                        className='image cover__image'
                        src={coverUrl}
                        alt={alt}
                    />
                </LazyLoad>
            )}
        </figure>
    );
};

export { Cover };
