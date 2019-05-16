import React, { useEffect } from 'react';
import firebase from 'firebaseInit';
import { Card } from 'components/Card';
import { BackToTop } from 'components/BackToTop';
import { useFetchHandler } from 'hooks';
import { Album, Albums } from 'types';

const AlbumList: React.FC = () => {
    const { handleFetch, apiData, isLoading } = useFetchHandler<Albums | []>(
        []
    );

    const getAlbumData = () => {
        if (isLoading) {
            const firebaseRef: firebase.database.Reference = firebase
                .database()
                .ref('/albums');
            firebaseRef.once('value').then(snap => {
                const albumData: Albums = snap
                    .val()
                    .sort((a: Album, b: Album) =>
                        a.artist.localeCompare(b.artist)
                    );
                handleFetch(albumData);
            });
        }
    };

    useEffect(getAlbumData, []);

    if (!apiData) return <div>Error</div>;

    return (
        <div>
            <ul>{apiData.map(Card)}</ul>
            <BackToTop />
        </div>
    );
};

export default AlbumList;
