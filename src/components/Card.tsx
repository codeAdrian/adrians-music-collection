import React from 'react';
import { Link } from 'react-router-dom';
import { Cover } from 'components';
import { Album } from 'types';

const Card = ({ album, artist, cover, discogsId }: Album): JSX.Element => (
    <li key={discogsId} className='albumsList__albumCard albumCard'>
        <Link to={`/album/${discogsId}`}>
            <Cover offset={500} cover={cover} artist={artist} album={album} />

            <hr className='albumCard__deco' />

            <div className='albumCard__overlay'>
                <h2>{artist}</h2>
                <h3>{album}</h3>
            </div>
        </Link>
    </li>
);

export { Card };
