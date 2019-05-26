import { firebaseInit } from 'modules';
import {
    FIRESTORE_ALBUMS,
    FIRESTORE_ALBUM,
    FIRESTORE_ARTIST,
    FIRESTORE_DISCOGS_ID
} from 'constant';
import { AdminFormFields } from 'models';

export const useFirestore = () => {
    const db = firebaseInit.firestore();
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
        callback: (snap: firebase.firestore.QuerySnapshot) => void,
        pageSize?: number
    ) {
        const albumRef = pageSize
            ? orderedAlbumCollection.limit(pageSize)
            : orderedAlbumCollection;
        executeQuery(albumRef, callback);
    }

    function getAlbumData(
        id: string,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = albumCollection.where(FIRESTORE_DISCOGS_ID, '==', id);
        executeQuery(albumRef, callback);
    }

    function searchAlbumData(
        searchQuery: string,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = albumCollection
            .where(FIRESTORE_ARTIST, '==', searchQuery)
            .orderBy(FIRESTORE_ALBUM);
        executeQuery(albumRef, callback);
    }

    return {
        addAlbumToCatalog,
        searchAlbumData,
        getAlbumCatalog,
        getAlbumData
    };
};
