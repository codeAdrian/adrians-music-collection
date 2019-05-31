import React from 'react';
import { Routing, AppLayout } from 'components';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routing />
            </AppLayout>
        </BrowserRouter>
    );
};

export default App;
