import React from 'react';
import { Card } from 'components';
import { AlbumListProps } from 'models';

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => (
    <ul className='list--reset'>{albums.map(Card)}</ul>
);

export { AlbumList };
