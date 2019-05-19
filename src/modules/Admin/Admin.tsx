import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components/Input';
import { FieldRenderProps } from 'react-define-form';
import firebase from 'firebaseInit';

const { Form, Fields } = defineForm(f => ({
    artist: f<string>(),
    album: f<string>(),
    youtubeVideoID: f<string>(),
    discogsID: f<string>(),
    cover: f<string>()
}));

interface AdminFormFields {
    artist: string;
    album: string;
    youtubeVideoID: string;
    discogsID: string;
    cover: string;
}

const initialValues = {
    artist: '',
    album: '',
    youtubeVideoID: '',
    discogsID: '',
    cover: ''
};

const Admin: React.FunctionComponent = () => {
    const handleSubmit = (values: AdminFormFields) => {
        const dataRef = firebase
            .database()
            .ref('/collection')
            .push();
        dataRef.set(values);
    };

    const getArtistField = ({
        input,
        meta
    }: FieldRenderProps<string, 'artist', any>): React.ReactNode => (
        <Input label='Artist' type='text' meta={meta} {...input} />
    );

    const getAlbumField = ({
        input,
        meta
    }: FieldRenderProps<string, 'album', any>): React.ReactNode => (
        <Input label='Album' type='text' meta={meta} {...input} />
    );

    const getVideoField = ({
        input,
        meta
    }: FieldRenderProps<string, 'youtubeVideoID', any>): React.ReactNode => (
        <Input label='Youtube Video ID' type='text' meta={meta} {...input} />
    );

    const getDiscogsField = ({
        input,
        meta
    }: FieldRenderProps<string, 'discogsID', any>): React.ReactNode => (
        <Input label='Discogs ID' type='text' meta={meta} {...input} />
    );

    const getCoverField = ({
        input,
        meta
    }: FieldRenderProps<string, 'cover', any>): React.ReactNode => (
        <Input label='Cover' type='text' meta={meta} {...input} />
    );

    return (
        <div>
            <Form
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Fields.artist render={getArtistField} />
                        <Fields.album render={getAlbumField} />
                        <Fields.youtubeVideoID render={getVideoField} />
                        <Fields.discogsID render={getDiscogsField} />
                        <Fields.cover render={getCoverField} />
                        <button type='submit'>Save</button>
                    </form>
                )}
            />
        </div>
    );
};

export default Admin;
