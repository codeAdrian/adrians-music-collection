import React, { useEffect, useState } from 'react';
import firebase from 'firebaseInit';
import { Card } from 'components/Card';
import { BackToTop } from 'components/BackToTop';
import { useFetchHandler } from 'hooks';
import { Album } from 'types';
import { LoadMore } from 'components/LoadMore';

const PAGE_SIZE = 12;

const AlbumList: React.FC = () => {
    const fetchHandlerApi = useFetchHandler<Album[]>([]);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
    const [arrayLength, setArrayLength] = useState<number>(PAGE_SIZE);

    const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;

    const getAlbumData = () => {
        if (isLoading) {
            const db = firebase.firestore();
            const albumRef = db
                .collection('albums')
                .orderBy('artist')
                .limit(pageSize);

            const getOptions: { source: 'default' } = {
                source: 'default'
            };

            albumRef.get(getOptions).then(snap => {
                const dataArray = snap.docs.map(doc => doc.data()) as Album[];
                setArrayLength(dataArray.length);
                handleFetch(dataArray);
            });
        }
    };

    const handleLoadMore = () => {
        setPageSize(pageSize + PAGE_SIZE);
        setIsLoading(true);
    };

    useEffect(getAlbumData, [pageSize, isLoading]);

    if (!apiData) return <div>Error</div>;
    const isDisabled = pageSize > arrayLength;

    return (
        <div>
            <ul>{apiData.map(Card)}</ul>
            <LoadMore disabled={isDisabled} callback={handleLoadMore} />
            <BackToTop />
        </div>
    );
};

export default AlbumList;
