import React from 'react';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => (
    <div>
        <Helmet>
            <meta charSet='utf-8' />
            <title>My Title</title>
            <meta name='description' content='Helmet application' />
        </Helmet>
        Homepage
    </div>
);

export default Home;
