import React, { useEffect, useState } from 'react';
import { useFetchHandler, useFirestore, useDiscogsApi } from 'hooks';
import { Album, AlbumDetails, AlbumProps } from 'models';
import { Cover, List, YoutubeVideo } from 'components';

const firebaseSkeleton = new Album({
    youtubeVideoId: '',
    album: 'Loading',
    artist: 'Loading',
    cover: '',
    discogsId: ''
});

const discogsSkeleton = new AlbumDetails({
    artists_sort: 'Loading',
    extraartists: [{ name: 'Loading', role: 'Loading' }],
    formats: [{ descriptions: ['Loading'] }],
    styles: ['Loading'],
    labels: ['Loading'],
    genres: ['Loading'],
    tracklist: [
        {
            position: 'Loading',
            title: 'Loading',
            duration: 'Loading'
        }
    ]
});

const AlbumDetail: React.FC<AlbumProps> = ({ match }: AlbumProps) => {
    const { params } = match;
    const { id } = params;
    const { fetchReleaseData } = useDiscogsApi();
    const { getAlbumData, searchAlbumData } = useFirestore();
    const [relatedAlbums, setRelatedAlbums] = useState<Album[]>([]);
    const discogsApi = useFetchHandler<AlbumDetails>(discogsSkeleton);
    const firebaseApi = useFetchHandler<Album>(firebaseSkeleton);

    useEffect(getFirebaseData, []);
    useEffect(getDiscogsData, []);

    const isLoading = firebaseApi.isLoading || discogsApi.isLoading;

    if (!isLoading && (!discogsApi.apiData || !firebaseApi.apiData))
        return <div>Error</div>;

    const {
        styles,
        formats,
        labels,
        tracklist,
        extraartists
    } = discogsApi.apiData;
    const {
        album,
        discogsId,
        artist,
        cover,
        youtubeVideoId
    } = firebaseApi.apiData;

    searchAlbumData(artist, parseAlbumsByArtist);

    return (
        <section className='albumDetail'>
            <aside className='albumDetail__aside container--pattern'>
                <Cover
                    album={album}
                    artist={artist}
                    cover={cover}
                    offset={100}
                />

                <h2>{artist}</h2>

                <h3>{album}</h3>

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
            </aside>
            <article className='albumDetail__main'>
                <YoutubeVideo
                    album={album}
                    artist={artist}
                    id={youtubeVideoId}
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
            </article>
        </section>
    );

    function parseAlbumsByArtist(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs
            .map(doc => doc.data())
            .filter(album => album.discogsId !== discogsId) as Album[];

        if (dataArray.length > 4) dataArray.length = 4;

        !relatedAlbums && setRelatedAlbums(dataArray);
    }

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
