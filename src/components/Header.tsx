import React from 'react';
import { Navigation, Logo, Search, Toggle } from 'components';

const Header: React.FC = () => {
    const toggleIcon = <span className='fas fa-search' />;

    return (
        <header className='header header--fixed container--alt'>
            <Logo />
            <div className='header__wrapper'>
                <Navigation />
                <Toggle
                    classes={{
                        content: 'search__content',
                        wrapper: 'search',
                        trigger: 'search__trigger'
                    }}
                    toggleIcon={toggleIcon}
                >
                    <Search />
                </Toggle>
            </div>
        </header>
    );
};

export { Header };
