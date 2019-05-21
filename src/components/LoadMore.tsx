import React, { useEffect, useState } from 'react';
import { isInViewport } from 'utils';
import { LoadMoreProps } from 'models';

const LoadMore: React.FC<LoadMoreProps> = ({
    onElementVisible,
    canLoadMore
}) => {
    const [debounce, setDebounce] = useState(false);

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
