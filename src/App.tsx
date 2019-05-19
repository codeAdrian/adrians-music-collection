import React from 'react';
import { Routing } from 'components/Routing';
import styles from './App.module.css';

const App: React.FC = () => {
    console.log('STYLES', styles);
    return (
        <div className='App-logo'>
            <Routing />
        </div>
    );
};

export default App;
