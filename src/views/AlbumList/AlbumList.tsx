import React, { useEffect } from 'react';
import { Card, LoadMore, Search, BackToTop } from 'components';
import { Album } from 'types';
import { useFirestore, useInfiniteLoader, useFetchHandler } from 'hooks';
import { PAGE_SIZE } from 'constant';

const AlbumList = () => {
    const {
        canLoadMore,
        currentPageSize,
        setCurrentPageSize,
        setArrayLength
    } = useInfiniteLoader(PAGE_SIZE);
    const { getAlbumCatalog, searchAlbumData } = useFirestore();
    const fetchHandlerApi = useFetchHandler<Album[]>([]);
    const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;

    useEffect(getAlbumData, [currentPageSize, isLoading]);

    if (!apiData && isLoading) return <div>Loading</div>;

    if (!apiData) return <div>Error</div>;

    return (
        <div>
            <Search handleSubmit={searchByArtist} />
            <ul>{apiData.map(Card)}</ul>
            <LoadMore
                canLoadMore={!canLoadMore}
                onElementVisible={handleLoadMore}
            />
            <BackToTop />
        </div>
    );

    function parseSearchData(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs.map(doc => doc.data()) as Album[];
        setArrayLength(dataArray.length);
        handleFetch(dataArray);
    }

    function searchByArtist(values: { searchQuery: string }) {
        searchAlbumData(values, parseSearchData);
    }

    function parseAlbumData(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs.map(doc => doc.data()) as Album[];
        setArrayLength(dataArray.length);
        handleFetch(dataArray);
    }

    function getAlbumData() {
        isLoading && getAlbumCatalog(currentPageSize, parseAlbumData);
    }

    function handleLoadMore() {
        setCurrentPageSize(currentPageSize + PAGE_SIZE);
        setIsLoading(true);
    }
};

export default AlbumList;
