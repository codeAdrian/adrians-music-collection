import React, { useEffect } from 'react';
import { useFetchHandler } from 'hooks';
import firebase from 'firebaseInit';
import { Album, AlbumDetails } from 'types';
import { Cover } from 'components/Cover';
import { YoutubeVideo } from 'components/YoutubeVideo';
import { List } from 'components/List';
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
    const albumDetailApi = useFetchHandler<AlbumDetails>();
    const albumsQueryApi = useFetchHandler<Album>();

    useEffect(() => {
        albumDetailApi.isLoading &&
            fetch(`https://api.discogs.com/releases/${id}`).then(response =>
                response.json().then(response => {
                    albumDetailApi.handleFetch(response);
                })
            );
    }, [albumDetailApi, id]);

    useEffect(() => {
        if (albumsQueryApi.isLoading) {
            const db = firebase.firestore();
            const albumRef = db
                .collection('albums')
                .where('discogsId', '==', id);

            const getOptions: { source: 'default' } = {
                source: 'default'
            };

            albumRef.get(getOptions).then(snap => {
                const dataArray = snap.docs.map(doc => doc.data())[0] as Album;
                albumsQueryApi.handleFetch(dataArray);
            });
        }
    }, [albumsQueryApi, id]);

    const isLoading = albumsQueryApi.isLoading || albumDetailApi.isLoading;

    if (isLoading) return <div>Loading</div>;

    if (!albumDetailApi.apiData || !albumsQueryApi.apiData)
        return <div>Error</div>;

    const {
        styles,
        formats,
        labels,
        tracklist,
        extraartists
    } = albumDetailApi.apiData;
    const { album, artist, cover, youtubeVideoId } = albumsQueryApi.apiData;

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
};

export default AlbumDetail;
