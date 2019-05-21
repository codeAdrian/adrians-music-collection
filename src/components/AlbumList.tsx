import React from 'react';
import { Card } from 'components';
import { Album } from 'models';

interface AlbumListProps {
    albums: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => (
    <ul>{albums.map(Card)}</ul>
);

export { AlbumList };
