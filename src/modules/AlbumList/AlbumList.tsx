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
            const query = firebase
                .database()
                .ref('collection')
                .orderByChild('artist')
                .limitToFirst(pageSize);

            query.once('value', snap => {
                const albumsArray: Album[] = Object.values(snap.val());
                handleFetch(albumsArray);
                setArrayLength(albumsArray.length);
            });
        }
    };

    const handleLoadMore = () => {
        setPageSize(pageSize + PAGE_SIZE);
        setIsLoading(true);
    };

    useEffect(getAlbumData, [pageSize, isLoading]);

    if (!apiData) return <div>Error</div>;

    return (
        <div>
            <ul>{apiData.map(Card)}</ul>
            <LoadMore
                disabled={pageSize > arrayLength}
                callback={handleLoadMore}
            />
            <BackToTop />
        </div>
    );
};

export default AlbumList;
