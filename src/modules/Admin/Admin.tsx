import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components/Input';
import { FieldRenderProps } from 'react-define-form';
import firebase from 'firebaseInit';

const { Form, Fields } = defineForm(f => ({
    artist: f<string>(),
    album: f<string>(),
    youtubeVideoId: f<string>(),
    discogsId: f<string>(),
    cover: f<string>()
}));

interface AdminFormFields {
    artist: string;
    album: string;
    youtubeVideoId: string;
    discogsId: string;
    cover: string;
}

const initialValues = {
    artist: '',
    album: '',
    youtubeVideoId: '',
    discogsId: '',
    cover: ''
};

const Admin: React.FunctionComponent = () => {
    const handleSubmit = (values: AdminFormFields) => {
        const db = firebase.firestore();
        db.collection('albums')
            .doc()
            .set(values)
            .then(function() {
                console.log('Document successfully written!');
            })
            .catch(function(error) {
                console.error('Error writing document: ', error);
            });
    };

    const getArtistField = ({
        input,
        meta
    }: FieldRenderProps<string, 'artist', any>): React.ReactNode => (
        <Input label='Artist' required type='text' meta={meta} {...input} />
    );

    const getAlbumField = ({
        input,
        meta
    }: FieldRenderProps<string, 'album', any>): React.ReactNode => (
        <Input label='Album' required type='text' meta={meta} {...input} />
    );

    const getVideoField = ({
        input,
        meta
    }: FieldRenderProps<string, 'youtubeVideoId', any>): React.ReactNode => (
        <Input
            label='Youtube Video ID'
            required
            type='text'
            meta={meta}
            {...input}
        />
    );

    const getDiscogsField = ({
        input,
        meta
    }: FieldRenderProps<string, 'discogsId', any>): React.ReactNode => (
        <Input label='Discogs ID' type='text' required meta={meta} {...input} />
    );

    const getCoverField = ({
        input,
        meta
    }: FieldRenderProps<string, 'cover', any>): React.ReactNode => (
        <Input label='Cover' type='text' required meta={meta} {...input} />
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
                        <Fields.youtubeVideoId render={getVideoField} />
                        <Fields.discogsId render={getDiscogsField} />
                        <Fields.cover render={getCoverField} />
                        <button type='submit'>Save</button>
                    </form>
                )}
            />
        </div>
    );
};

export default Admin;
