import React, { useEffect } from 'react';
import firebase from 'firebaseInit';
import { Card } from 'components/Card';
import { useFetchHandler } from 'hooks';
import { Album, Albums } from 'types';

const AlbumList: React.FC = () => {
    const { handleFetch, apiData, isLoading } = useFetchHandler<Albums | []>(
        []
    );

    const getAlbumData = () => {
        const firebaseRef: firebase.database.Reference = firebase
            .database()
            .ref('/albums');
        const firebaseCallback = firebaseRef.on('value', snap => {
            const albumData: Albums = snap
                .val()
                .sort((a: Album, b: Album) => a.artist.localeCompare(b.artist));
            handleFetch(albumData);
        });

        return function cleanup() {
            firebaseRef.off('value', firebaseCallback);
        };
    };

    useEffect(getAlbumData, []);

    return <ul>{apiData.map(Card)}</ul>;
};

export default AlbumList;
