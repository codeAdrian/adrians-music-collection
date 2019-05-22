import React, { useEffect, Fragment } from 'react';
import { LoadMore, BackToTop, AlbumList, Loading } from 'components';
import { useFirestore, useInfiniteLoader, useFetchHandler } from 'hooks';
import { PAGE_SIZE } from 'constant';
import { Album } from 'models';

const Albums: React.FC = () => {
    const {
        canLoadMore,
        currentPageSize,
        setCurrentPageSize,
        setArrayLength
    } = useInfiniteLoader(PAGE_SIZE);
    const { getAlbumCatalog } = useFirestore();
    const fetchHandlerApi = useFetchHandler<Album[]>([]);
    const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;

    useEffect(getAlbumData, [currentPageSize, isLoading]);

    const noResults = apiData && apiData.length === 0;
    if ((!apiData || noResults) && isLoading) return <Loading />;
    if (!apiData) return <div>Error</div>;

    return (
        <Fragment>
            <AlbumList albums={apiData} />
            <LoadMore
                canLoadMore={isLoading || canLoadMore}
                onElementVisible={handleLoadMore}
            />
            <BackToTop />
        </Fragment>
    );

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

export default Albums;
