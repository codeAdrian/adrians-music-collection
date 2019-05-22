import React from 'react';
import { Navigation, Logo, Search, Toggle } from 'components';

const Header: React.FC = () => (
    <header>
        <Logo />
        <Navigation />
        <Toggle>
            <Search />
        </Toggle>
    </header>
);

export { Header };
