import React from "react";
import { YOUTUBE_EMBED_URL, YOUTUBE_QUERY_VARS } from "constant";
import { Loading } from "components";

interface VideoProps {
  artist: string;
  album: string;
  id: string;
}

const YoutubeVideo: React.FC<VideoProps> = ({ artist, album, id }) => {
  const videoSrc = `${YOUTUBE_EMBED_URL}${id}${YOUTUBE_QUERY_VARS}`;
  const title = `Music Video for a song from ${artist} - ${album}`;

  return (
    <div className="video">
      <Loading className="video__loading" />
      <iframe
        src={videoSrc}
        className="video__iframe"
        title={title}
        data-modestbranding="1"
        data-showinfo="0"
        data-controls="0"
        data-fs="0"
      />
    </div>
  );
};

export { YoutubeVideo };
