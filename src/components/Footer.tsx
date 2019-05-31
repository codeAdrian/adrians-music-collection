import React from 'react';

const Footer: React.FC = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className='footer container--alt'>
            <article className='footer__col'>
                &copy; {currentYear}, Adrian Bece
            </article>
            <article className='footer__col footer__col--last'>
                {'Created with ♥ and 🤘 by Adrian Bece'}
            </article>
        </footer>
    );
};

export { Footer };
