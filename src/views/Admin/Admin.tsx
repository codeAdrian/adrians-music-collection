import React, { Fragment } from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components';
import { FieldRenderProps } from 'react-define-form';
import { useFirebaseAuth, useFirestore } from 'hooks';
import { AdminFormFields } from 'models';

const { Form, Fields } = defineForm(f => ({
    artist: f<string>(),
    album: f<string>(),
    youtubeVideoId: f<string>(),
    discogsId: f<string>(),
    cover: f<string>()
}));

type FormInput<T extends string | symbol> = FieldRenderProps<string, T, any>;

const Admin: React.FC = () => {
    const { addAlbumToCatalog } = useFirestore();
    const { activeUser, signOut } = useFirebaseAuth();

    return (
        <Fragment>
            <button onClick={signOut}>Log out</button>
            <div>Active user: {activeUser && activeUser.email}</div>
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
                        <button type='submit'>Save</button>
                    </form>
                )}
            />
        </Fragment>
    );

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
