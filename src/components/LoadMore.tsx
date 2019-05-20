import React, { useEffect, useState } from 'react';

interface loadMoreProps {
    onElementVisible: () => void;
    disabled: boolean;
}

const LoadMore = ({ onElementVisible, disabled }: loadMoreProps) => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);

        return function cleanup() {
            window.removeEventListener('scroll', scrollListener);
        };
    });

    if (disabled) {
        window.removeEventListener('scroll', scrollListener);
        return <div>No more to load</div>;
    }

    return <div id='load-more'>Load more</div>;

    function isInViewport(
        e: HTMLElement,
        { top, height } = e && e.getBoundingClientRect()
    ) {
        return top <= window.innerHeight && top + height >= 0;
    }

    function scrollListener() {
        setDebounce(false);
        const loadMore = document && document.getElementById('load-more');
        const isElementInViewport = loadMore && isInViewport(loadMore);

        if (!debounce && isElementInViewport) {
            setDebounce(true);
            onElementVisible();
        }
    }
};

export { LoadMore };
