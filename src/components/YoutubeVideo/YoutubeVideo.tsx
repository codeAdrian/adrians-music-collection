import React from 'react';

interface VideoProps {
    artist: string;
    album: string;
    id: string;
}

const YoutubeVideo = ({ artist, album, id }: VideoProps): JSX.Element => (
    <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;controls=0;showinfo=0;modestbranding=1;fs=0;`}
        data-modestbranding='1'
        data-showinfo='0'
        data-controls='0'
        data-frameBorder='0'
        data-fs='0'
        title={`Music Video for a song from ${artist} - ${album}`}
    />
);

export default YoutubeVideo;
