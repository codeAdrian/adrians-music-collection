import React from 'react';
import { Navigation, Logo, Search } from 'components';

const Header: React.FC = () => (
    <header>
        <Logo />
        <Navigation />
        <Search />
    </header>
);

export { Header };
