import React, { useEffect, Fragment } from 'react';
import { useFetchHandler, useFirestore, useDiscogsApi } from 'hooks';
import { Album, AlbumDetails } from 'models';
import { Cover, List, YoutubeVideo } from 'components';

interface AlbumProps {
    match: {
        params: {
            id: string;
        };
    };
}

const AlbumDetail: React.FC<AlbumProps> = ({ match }: AlbumProps) => {
    const { params } = match;
    const { id } = params;
    const { fetchReleaseData } = useDiscogsApi();
    const { getAlbumData } = useFirestore();
    const discogsApi = useFetchHandler<AlbumDetails>();
    const firebaseApi = useFetchHandler<Album>();

    useEffect(getDiscogsData, [discogsApi, id]);
    useEffect(getFirebaseData, [firebaseApi, id]);

    const isLoading = firebaseApi.isLoading || discogsApi.isLoading;

    if (isLoading) return <div>Loading</div>;

    if (!discogsApi.apiData || !firebaseApi.apiData) return <div>Error</div>;

    const {
        styles,
        formats,
        labels,
        tracklist,
        extraartists
    } = discogsApi.apiData;
    const { album, artist, cover, youtubeVideoId } = firebaseApi.apiData;
    return (
        <Fragment>
            <List title={'Genre'} array={styles} listClass='genreList' />
            <List
                title={'CD Format'}
                array={formats[0].descriptions}
                listClass='formatsList'
            />
            <List
                title={'Catalog Number'}
                array={labels}
                listClass='catalogList'
                keys={['name', 'catno']}
            />
            <List
                title={'Tracklist'}
                array={tracklist}
                listClass={'trackList'}
                keys={['position', 'title', 'duration']}
            />
            <List
                title={'Credits'}
                array={extraartists}
                listClass='artistList'
                keys={['name', 'role']}
            />
            <YoutubeVideo album={album} artist={artist} id={youtubeVideoId} />
            <Cover album={album} artist={artist} cover={cover} offset={0} />
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
