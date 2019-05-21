import React from 'react';

const Footer: React.FC = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer>
            <article>&copy; {currentYear}, Adrian Bece</article>
            <article>{'Created with ♥ and 🤘 by Adrian Bece'}</article>
        </footer>
    );
};

export { Footer };
