import React, { useEffect, Fragment } from "react";
import { LoadMore, BackToTop, AlbumList } from "components";
import { useFirestore, useInfiniteLoader, useFetchHandler } from "hooks";
import { PAGE_SIZE } from "constant";
import { Album } from "models";

const skeletonArray: Album[] = Array.from({ length: PAGE_SIZE }).map(
  (item, index) =>
    new Album({
      album: "Loading",
      artist: "Loading",
      cover: "",
      discogsId: `skeleton-${index}`,
      youtubeVideoId: ""
    })
);

const Albums: React.FC = () => {
  const { sessionStorage } = window;
  const savedPageSize = sessionStorage.getItem("ALBUMS_PAGE_SIZE");
  const {
    canLoadMore,
    currentPageSize,
    setCurrentPageSize,
    setArrayLength
  } = useInfiniteLoader(
    (savedPageSize && parseInt(savedPageSize)) || PAGE_SIZE
  );
  const { getAlbumCatalog } = useFirestore();
  const fetchHandlerApi = useFetchHandler<Album[]>([]);
  const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;

  useEffect(getAlbumData, [currentPageSize, isLoading]);

  const noResults = !apiData || !apiData.length || apiData.length === 0;
  if (!apiData && !isLoading) return <div>Error</div>;

  const skeleton = <AlbumList albums={skeletonArray} />;

  return (
    <Fragment>
      <AlbumList albums={(!noResults && apiData) || []} />
      <LoadMore
        skeleton={skeleton}
        canLoadMore={isLoading || canLoadMore}
        isLoadingMore={!noResults && isLoading}
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
    isLoading && getAlbumCatalog(parseAlbumData, currentPageSize);
  }

  function handleLoadMore() {
    if (!isLoading) {
      const newPageSize = currentPageSize + PAGE_SIZE;
      setCurrentPageSize(newPageSize);
      sessionStorage.setItem("ALBUMS_PAGE_SIZE", newPageSize.toString());
      setIsLoading(true);
    }
  }
};

export default Albums;
