import React, { useEffect } from 'react';
import { useFetchHandler } from 'hooks';
import firebase from 'firebaseInit';
import { Album, AlbumDetails } from 'types';
import { Cover } from 'components/Cover';
import { YoutubeVideo } from 'components/YoutubeVideo';
import { List } from 'components/List';

const DISCOGS_API_URL = 'https://api.discogs.com/releases/';
interface AlbumProps {
    match: {
        params: {
            id: string;
        };
    };
}

const AlbumDetail = ({ match }: AlbumProps): JSX.Element => {
    const { params } = match;
    const { id } = params;
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
        <div>
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
        </div>
    );

    function parseDiscogsData(response: Response) {
        return response.json().then(response => {
            discogsApi.handleFetch(response);
        });
    }

    function getDiscogsData() {
        discogsApi.isLoading &&
            fetch(`${DISCOGS_API_URL}${id}`).then(parseDiscogsData);
    }

    function getFirebaseData() {
        if (firebaseApi.isLoading) {
            const db = firebase.firestore();
            const albumRef = db
                .collection('albums')
                .where('discogsId', '==', id);

            const getOptions: { source: 'default' } = {
                source: 'default'
            };

            albumRef.get(getOptions).then(snap => {
                const dataArray = snap.docs.map(doc => doc.data())[0] as Album;
                firebaseApi.handleFetch(dataArray);
            });
        }
    }
};

export default AlbumDetail;
