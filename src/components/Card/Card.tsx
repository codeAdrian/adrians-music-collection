import React from 'react';
import { Link } from 'react-router-dom';
import { Cover } from 'components/Cover';
import { Album } from 'types';

const Card = ({ album, artist, cover, discogsID }: Album): JSX.Element => (
    <li key={discogsID} className='albumsList__albumCard albumCard'>
        <Link to={`/album/${discogsID}`}>
            <Cover offset={500} cover={cover} artist={artist} album={album} />

            <hr className='albumCard__deco' />

            <div className='albumCard__overlay'>
                <h2>{artist}</h2>
                <h3>{album}</h3>
            </div>
        </Link>
    </li>
);

export default Card;
