import React, { useEffect, Fragment } from "react";
import { AlbumList } from "components";
import { withRouter, Link } from "react-router-dom";
import { useFirestore, useFetchHandler } from "hooks";
import { Album } from "models";

const Search = withRouter(({ location }) => {
  const { searchAlbumData } = useFirestore();
  const fetchHandlerApi = useFetchHandler<Album[]>([]);
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("searchQuery");

  const { handleFetch, apiData, isLoading } = fetchHandlerApi;

  useEffect(searchListener, [
    searchQuery,
    searchAlbumData,
    isLoading,
    parseSearchData
  ]);

  const noResults = apiData && apiData.length === 0;

  if ((!apiData || noResults) && isLoading) return <div>Loading</div>;
  if (!apiData) return <div>Error</div>;

  return (
    <Fragment>
      <h1 className="search__heading heading heading--level3">
        {`Search results for "${searchQuery}" (exact matches)`}
      </h1>
      <AlbumList albums={apiData} />
      {apiData.length === 0 && (
        <div>
          Search didn't return any results. Make sure you have typed artist's
          exact name. You can repeat your search or
        </div>
      )}
      <div>
        <Link to="/albums" className="button button--linkToButton button--cta">
          View All Albums
        </Link>
      </div>
    </Fragment>
  );

  function searchListener() {
    searchQuery && searchAlbumData(searchQuery.toString(), parseSearchData);
  }

  function docParser(doc: firebase.firestore.QueryDocumentSnapshot) {
    return doc.data();
  }

  function parseSearchData(snap: firebase.firestore.QuerySnapshot) {
    const dataArray = snap.docs.map(docParser) as Album[] | [];
    handleFetch(dataArray);
  }
});

export default Search;
