import React, { Fragment } from 'react';
import { Header, Footer } from 'components';

interface AppLayoutProps {
    children: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
    <Fragment>
        <Header />
        <main>{children}</main>
        <Footer />
    </Fragment>
);

export { AppLayout };
