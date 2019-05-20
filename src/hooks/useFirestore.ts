import firebase from 'firebaseInit';

export const useFirestore = () => {
    const db = firebase.firestore();

    const getOptions: { source: 'default' } = {
        source: 'default'
    };

    function getAlbumCatalog(
        pageSize: number,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = db
            .collection('albums')
            .orderBy('artist')
            .limit(pageSize);

        albumRef.get(getOptions).then(callback);
    }

    function getAlbumData(
        id: string,
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const albumRef = db.collection('albums').where('discogsId', '==', id);

        albumRef.get(getOptions).then(callback);
    }

    function searchAlbumData(
        values: { searchQuery: string },
        callback: (snap: firebase.firestore.QuerySnapshot) => void
    ) {
        const { searchQuery } = values;
        const albumRef = db
            .collection('albums')
            .where('artist', '==', searchQuery)
            .orderBy('album');

        albumRef.get().then(callback);
    }

    return {
        searchAlbumData,
        getAlbumCatalog,
        getAlbumData
    };
};
