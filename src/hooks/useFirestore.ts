import firebase from 'firebaseInit';
import { FIRESTORE_ALBUMS, FIRESTORE_ARTIST } from 'constant';

interface AdminFormFields {
    artist: string;
    album: string;
    youtubeVideoId: string;
    discogsId: string;
    cover: string;
}

export const useFirestore = () => {
    const db = firebase.firestore();
    const albumCollection = db.collection(FIRESTORE_ALBUMS);
    const orderedAlbumCollection = albumCollection.orderBy(FIRESTORE_ARTIST);
    const albumCollectionDoc = albumCollection.doc();

    const getOptions: { source: 'default' } = {
        source: 'default'
    };

    function executeQuery(
        ref: firebase.firestore.Query,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        ref.get(getOptions).then(callback);
    }

    function addAlbumToCatalog(values: AdminFormFields) {
        albumCollectionDoc
            .set(values)
            .then(function() {
                console.log('Document successfully written!');
            })
            .catch(function(error) {
                console.error('Error writing document: ', error);
            });
    }

    function getAlbumCatalog(
        pageSize: number,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = orderedAlbumCollection.limit(pageSize);
        executeQuery(albumRef, callback);
    }

    function getAlbumData(
        id: string,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = albumCollection.where('discogsId', '==', id);
        executeQuery(albumRef, callback);
    }

    function searchAlbumData(
        values: { searchQuery: string },
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const { searchQuery } = values;
        const albumRef = albumCollection
            .where(FIRESTORE_ARTIST, '==', searchQuery)
            .orderBy('album');
        executeQuery(albumRef, callback);
    }

    return {
        addAlbumToCatalog,
        searchAlbumData,
        getAlbumCatalog,
        getAlbumData
    };
};
