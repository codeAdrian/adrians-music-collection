import React, { useEffect, useState } from 'react';

interface loadMoreProps {
    callback: () => void;
    disabled: boolean;
}

const LoadMore = ({ callback, disabled }: loadMoreProps) => {
    const [debounce, setDebounce] = useState<boolean>(false);

    const isInViewport = (
        e: HTMLElement,
        { top, height } = e && e.getBoundingClientRect()
    ): Boolean => top <= window.innerHeight && top + height >= 0;

    const scrollListener = () => {
        const loadMore = document && document.getElementById('load-more');
        if (loadMore && !debounce && isInViewport(loadMore)) {
            setDebounce(true);
            callback();
        } else {
            setDebounce(false);
        }
    };
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
};

export default LoadMore;
