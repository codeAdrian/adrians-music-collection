import React from 'react';
import defineForm from 'react-define-form';

const { Form, Fields } = defineForm(f => ({
    email: f<string>(),
    password: f<string>()
}));

const Admin: React.FunctionComponent = () => <div>ADMIN</div>;

export default Admin;
