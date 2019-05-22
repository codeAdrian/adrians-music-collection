import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
    <section>
        <article className='container--pattern'>
            <h2 className='heading heading--level2'>Long live rock 'n' roll</h2>
            <p className='paragraph'>
                Collecting oldschool rock and metal CDs since childhood. Proud
                owner of some of the rare releases.
            </p>
            <Link
                className='button button--linkToButton button--cta'
                to='/albums'
            >
                View Collection
            </Link>
        </article>
        <article>Image here</article>
    </section>
);

export default Home;
