import React, { useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  useFetchHandler,
  useFirestore,
  useDiscogsApi,
  useOfflineTracker
} from "hooks";
import { Link } from "react-router-dom";
import { Album, AlbumDetails, AlbumProps } from "models";
import { Cover, List, YoutubeVideo } from "components";

const firebaseSkeleton = new Album({
  youtubeVideoId: "",
  album: "Loading",
  artist: "Loading",
  cover: "",
  discogsId: ""
});

const discogsSkeleton = new AlbumDetails({
  artists_sort: "Loading",
  extraartists: [...new Array(5)].map((item, index) => ({
    name: "Loading",
    role: "Loading"
  })),
  formats: [{ descriptions: ["Loading"] }],
  styles: ["Loading"],
  labels: [
    {
      name: "Loading",
      catno: "Loading"
    }
  ],
  released: "Loading",
  genres: ["Loading"],
  tracklist: [...new Array(10)].map((item, index) => ({
    position: `${index + 1}`,
    title: "Loading",
    duration: "0:00"
  }))
});

const AlbumDetail: React.FC<AlbumProps> = ({ match }: AlbumProps) => {
  const { params } = match;
  const { id } = params;
  const { fetchReleaseData } = useDiscogsApi();
  const { getAlbumData } = useFirestore();
  const { isOnline } = useOfflineTracker();
  const discogsApi = useFetchHandler<AlbumDetails>(discogsSkeleton);
  const firebaseApi = useFetchHandler<Album>(firebaseSkeleton);

  useEffect(getFirebaseData, []);
  useEffect(getDiscogsData, []);

  if (!discogsApi.apiData || !firebaseApi.apiData)
    return <Redirect to="/notFound" />;

  const discogsDataReady = discogsApi.apiData && !discogsApi.isLoading;
  const shouldDisplayDiscogsData = isOnline || discogsDataReady;

  const {
    styles,
    formats,
    labels,
    tracklist,
    extraartists,
    released
  } = discogsApi.apiData;

  const { album, artist, cover, youtubeVideoId } =
    firebaseApi.apiData || firebaseSkeleton;

  return (
    <Fragment>
      <section className="albumDetail">
        <Link
          to="/albums"
          className="albumDetail__back button button--fixed deco"
        >
          <span className="deco__content icon--medium fas fa-arrow-left" />
        </Link>
        <aside className="albumDetail__aside container--pattern">
          <Cover
            album={album}
            artist={artist}
            cover={cover}
            offsetVertical={768}
          />
          <article className="albumDetail__wrapper">
            <small className="small small--default">Artist</small>
            <h2 className="heading heading--level3">{artist}</h2>

            <small className="small small--default">Album</small>
            <h3 className="heading heading--level4">{album}</h3>
            {shouldDisplayDiscogsData && (
              <Fragment>
                <small className="small small--default">Release Date</small>
                <h3 className="heading">{released}</h3>

                <List title={"Genre"} array={styles} listClass="genre" />
                <List
                  title={"CD Format"}
                  array={formats[0].descriptions}
                  listClass="format"
                />
                <List
                  title={"Catalog Number"}
                  array={labels}
                  listClass="catalog"
                  keys={["name", "catno"]}
                />
              </Fragment>
            )}
          </article>
        </aside>
        <article className="albumDetail__main">
          <YoutubeVideo album={album} artist={artist} id={youtubeVideoId} />
          {shouldDisplayDiscogsData && (
            <article className="albumDetail__wrapper">
              <List
                title={"Tracklist"}
                array={tracklist}
                listClass={"trackList"}
                keys={["position", "title", "duration"]}
              />
              <List
                title={"Credits"}
                array={extraartists}
                listClass="artist"
                keys={["role", "name"]}
              />
            </article>
          )}
        </article>
      </section>
    </Fragment>
  );

  function parseDiscogsData(response: Response) {
    return response.json().then(response => {
      discogsApi.handleFetch(response);
    });
  }

  function getDiscogsData() {
    discogsApi.isLoading && fetchReleaseData(id, parseDiscogsData);
  }

  function parseAlbumData(snap: firebase.firestore.QuerySnapshot) {
    const dataArray = snap.docs.map(doc => doc.data())[0] as Album;
    firebaseApi.handleFetch(dataArray);
  }

  function getFirebaseData() {
    firebaseApi.isLoading && getAlbumData(id, parseAlbumData);
  }
};

export default AlbumDetail;
