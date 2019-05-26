import React, { Fragment, useEffect } from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components';
import { FieldRenderProps } from 'react-define-form';
import { useFirebaseAuth, useFirestore, useFetchHandler } from 'hooks';
import { AdminFormFields, Album } from 'models';

const { Form, Fields } = defineForm(f => ({
    artist: f<string>(),
    album: f<string>(),
    youtubeVideoId: f<string>(),
    discogsId: f<string>(),
    cover: f<string>()
}));

type FormInput<T extends string | symbol> = FieldRenderProps<string, T, any>;

const Admin: React.FC = () => {
    const { addAlbumToCatalog, getAlbumCatalog } = useFirestore();
    const fetchHandlerApi = useFetchHandler<Album[]>([]);
    const { handleFetch, apiData, isLoading, setIsLoading } = fetchHandlerApi;
    const { activeUser, signOut } = useFirebaseAuth();

    useEffect(getAlbumData);

    return (
        <Fragment>
            <div>
                Active user: {activeUser && activeUser.email}(
                <button className='button button--link' onClick={signOut}>
                    Log out
                </button>
                )
            </div>
            <Form
                initialValues={{
                    artist: '',
                    album: '',
                    youtubeVideoId: '',
                    discogsId: '',
                    cover: ''
                }}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Fields.artist render={getArtistField} />
                        <Fields.album render={getAlbumField} />
                        <Fields.youtubeVideoId render={getVideoField} />
                        <Fields.discogsId render={getDiscogsField} />
                        <Fields.cover render={getCoverField} />
                        <button className='button button--cta' type='submit'>
                            Save
                        </button>
                    </form>
                )}
            />
            <div>
                <pre>
                    {apiData ? JSON.stringify(apiData, null, 2) : 'No Data'}
                </pre>
            </div>
        </Fragment>
    );

    function parseAlbumData(snap: firebase.firestore.QuerySnapshot) {
        const dataArray = snap.docs.map(doc => doc.data()) as Album[];
        handleFetch(dataArray);
    }

    function getAlbumData() {
        isLoading && getAlbumCatalog(parseAlbumData);
    }

    function handleSubmit(values: AdminFormFields) {
        addAlbumToCatalog(values);
    }

    function getArtistField({ input, meta }: FormInput<'artist'>) {
        return (
            <Input label='Artist' required type='text' meta={meta} {...input} />
        );
    }

    function getAlbumField({ input, meta }: FormInput<'album'>) {
        return (
            <Input label='Album' required type='text' meta={meta} {...input} />
        );
    }

    function getVideoField({ input, meta }: FormInput<'youtubeVideoId'>) {
        return (
            <Input
                label='Youtube Video ID'
                required
                type='text'
                meta={meta}
                {...input}
            />
        );
    }

    function getDiscogsField({ input, meta }: FormInput<'discogsId'>) {
        return (
            <Input
                label='Discogs ID'
                type='text'
                required
                meta={meta}
                {...input}
            />
        );
    }

    function getCoverField({ input, meta }: FormInput<'cover'>) {
        return (
            <Input label='Cover' type='text' required meta={meta} {...input} />
        );
    }
};

export default Admin;
