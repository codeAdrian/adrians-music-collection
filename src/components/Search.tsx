import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components';
import { FieldRenderProps } from 'react-define-form';

interface SearchProps {
    handleSubmit: (values: { searchQuery: string }) => void;
}

const { Form, Fields } = defineForm(f => ({
    searchQuery: f<string>()
}));

const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
    return (
        <Form
            initialValues={{ searchQuery: '' }}
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Fields.searchQuery render={getSearchInput} />
                    <button type='submit'>Search</button>
                </form>
            )}
        />
    );

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
};

export { Search };
