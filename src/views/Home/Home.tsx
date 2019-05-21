import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
    <section>
        <article>
            <h2>Long live rock 'n' roll</h2>
            <p>
                Collecting oldschool rock and metal CDs since childhood. Proud
                owner of some of the rare releases.
            </p>
            <Link to='/albums'>View Collection</Link>
        </article>
        <article>Image here</article>
    </section>
);

export default Home;
