import React from 'react';
import { YOUTUBE_EMBED_URL, YOUTUBE_QUERY_VARS } from 'constant';
import { VideoProps } from 'models';

const YoutubeVideo: React.FC<VideoProps> = ({ artist, album, id }) => {
    const videoSrc = `${YOUTUBE_EMBED_URL}${id}${YOUTUBE_QUERY_VARS}`;
    const title = `Music Video for a song from ${artist} - ${album}`;

    return (
        <iframe
            src={videoSrc}
            title={title}
            data-modestbranding='1'
            data-showinfo='0'
            data-controls='0'
            data-fs='0'
        />
    );
};

export { YoutubeVideo };
