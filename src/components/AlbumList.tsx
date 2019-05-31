import React from "react";
import { Card } from "components";
import { Album } from "models";

interface AlbumListProps {
  albums: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => (
  <ul className="albumList list--reset">{albums.map(Card)}</ul>
);

export { AlbumList };
