import React from 'react';
import { Navigation, Logo, Search, Toggle } from 'components';

const Header: React.FC = () => (
    <header className='header header--fixed container--alt'>
        <Logo />
        <Navigation />
        <Toggle>
            <Search />
        </Toggle>
    </header>
);

export { Header };
