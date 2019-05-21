import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => (
    <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About Me</NavLink>
        <NavLink to='/albums'>Album List</NavLink>
    </nav>
);

export { Navigation };
