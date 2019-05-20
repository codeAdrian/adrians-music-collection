import React, { useEffect, useState } from 'react';
import { isInViewport } from 'utils';

interface loadMoreProps {
    onElementVisible: () => void;
    canLoadMore: boolean;
}

const LoadMore = ({ onElementVisible, canLoadMore }: loadMoreProps) => {
    const [debounce, setDebounce] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);

        return function cleanup() {
            window.removeEventListener('scroll', scrollListener);
        };
    });

    if (!canLoadMore) {
        window.removeEventListener('scroll', scrollListener);
        return <div>No more to load</div>;
    }

    return <div id='load-more'>Load more</div>;

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
