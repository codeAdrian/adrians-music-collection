import React from 'react';
import { Link } from 'react-router-dom';
import { Cover } from 'components';
import { Album } from 'models';

const Card: React.FC<Album> = ({ album, artist, cover, discogsId }) => (
    <li key={discogsId}>
        <Link to={`/album/${discogsId}`}>
            <Cover offset={500} cover={cover} artist={artist} album={album} />

            <hr />

            <div>
                <h2>{artist}</h2>
                <h3>{album}</h3>
            </div>
        </Link>
    </li>
);

export { Card };
