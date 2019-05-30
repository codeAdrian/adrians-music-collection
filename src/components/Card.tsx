import React from "react";
import { Link } from "react-router-dom";
import { Cover } from "components";
import { Album } from "models";

const Card: React.FC<Album> = ({ album, artist, cover, discogsId }) => (
  <li className="card" key={discogsId}>
    <Link
      className="card__wrapper link--reset"
      to={`/albums/album/${discogsId}`}
    >
      <Cover offsetVertical={768} cover={cover} artist={artist} album={album} />

      <div className="card__info container--pattern">
        <hr className="divider card__divider" />

        <h2 className="card__title card__title--primary heading heading--level4">
          {artist}
        </h2>
        <h3 className="card__title card__title--secondary heading heading--level5">
          {album}
        </h3>
      </div>
    </Link>
  </li>
);

export { Card };
