import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components';
import { withRouter } from 'react-router-dom';
import { FieldRenderProps } from 'react-define-form';

const { Form, Fields } = defineForm(f => ({
    searchQuery: f<string>()
}));

const Search = withRouter(({ history, location }) => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('searchQuery');

    return (
        <Form
            initialValues={{ searchQuery: searchQuery || '' }}
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Fields.searchQuery render={getSearchInput} />
                    <button type='submit'>Search</button>
                </form>
            )}
        />
    );

    function handleSubmit(values: { searchQuery: string }) {
        const newUrl = `/search?searchQuery=${values.searchQuery}`;
        history.push(newUrl);
    }

    function getSearchInput({
        input,
        meta
    }: FieldRenderProps<string, 'searchQuery', any>) {
        return (
            <Input
                label='Search'
                type='search'
                meta={meta}
                required
                {...input}
            />
        );
    }
});

export { Search };
