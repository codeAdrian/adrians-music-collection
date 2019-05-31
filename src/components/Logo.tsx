import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <h1 className='logo heading heading--level4'>
        <Link className='logo__link link--reset' to='/'>
            Adrian's Music Collection
        </Link>
    </h1>
);

export { Logo };
