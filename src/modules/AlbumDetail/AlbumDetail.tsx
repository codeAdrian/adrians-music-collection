import React, { useEffect } from 'react';
import { useFetchHandler } from 'hooks';
import { Album } from 'types';

interface AlbumProps {
    match;
}

const AlbumDetail = ({ match }: AlbumProps): JSX.Element => {
    const { handleFetch, apiData, isLoading } = useFetchHandler<Album | {}>({});
    useEffect(() => {
        fetch(`https://api.discogs.com/releases/${match.params.id}`).then(
            response =>
                response.json().then(response => {
                    handleFetch(response);
                })
        );
    }, []);

    console.log('WOOO', { apiData, isLoading });

    return <div>Album detail</div>;
};

export default AlbumDetail;
