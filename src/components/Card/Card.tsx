import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { Album } from 'types';

const Card = ({ album, artist, cover, discogsID }: Album): JSX.Element => (
    <li key={discogsID} className='albumsList__albumCard albumCard'>
        <Link to={`/album/${discogsID}`}>
            <LazyLoad offsetVertical={500}>
                <img
                    src={`https://res.cloudinary.com/adrianbece/image/upload/c_scale,h_900,w_900/music/${cover}`}
                    alt={` ${artist} - ${album} cover artwork`}
                />
            </LazyLoad>

            <hr className='albumCard__deco' />

            <div className='albumCard__overlay'>
                <h2>{artist}</h2>
                <h3>{album}</h3>
            </div>
        </Link>
    </li>
);

export default Card;
