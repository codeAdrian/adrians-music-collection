import React, { useEffect, useState } from 'react';
import firebase from 'firebaseInit';
import { Card, LoadMore, Search, BackToTop } from 'components';
import { useFetchHandler } from 'hooks';
import { Album } from 'types';

const PAGE_SIZE = 12;

const AlbumList = () => {
    const fetchHandlerApi = useFetchHandler<Album[]>([]);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
    const [arrayLength, setArrayLength] = useState<number>(PAGE_SIZE);
    const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;
    const isDisabled = pageSize > arrayLength;

    useEffect(getAlbumData, [pageSize, isLoading]);

    if (!apiData && isLoading) return <div>Loading</div>;

    if (!apiData) return <div>Error</div>;

    return (
        <div>
            <Search handleSubmit={searchByArtist} />
            <ul>{apiData.map(Card)}</ul>
            <LoadMore disabled={isDisabled} onElementVisible={handleLoadMore} />
            <BackToTop />
        </div>
    );

    function parseSearchData(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs.map(doc => doc.data()) as Album[];
        setArrayLength(dataArray.length);
        handleFetch(dataArray);
    }

    function searchByArtist(values: { searchQuery: string }) {
        const { searchQuery } = values;
        const db = firebase.firestore();
        const albumRef = db
            .collection('albums')
            .where('artist', '==', searchQuery)
            .orderBy('album');

        albumRef.get().then(parseSearchData);
    }

    function parseAlbumData(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs.map(doc => doc.data()) as Album[];
        setArrayLength(dataArray.length);
        handleFetch(dataArray);
    }

    function getAlbumData() {
        if (!isLoading) return;

        const db = firebase.firestore();
        const albumRef = db
            .collection('albums')
            .orderBy('artist')
            .limit(pageSize);

        const getOptions: { source: 'default' } = {
            source: 'default'
        };

        albumRef.get(getOptions).then(parseAlbumData);
    }

    function handleLoadMore() {
        setPageSize(pageSize + PAGE_SIZE);
        setIsLoading(true);
    }
};

export default AlbumList;
