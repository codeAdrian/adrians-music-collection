import React, { useState } from 'react';
import { isInViewport } from 'utils';
import { LoadMoreProps } from 'models';
import { useEventListener } from 'hooks';

const LoadMore: React.FC<LoadMoreProps> = ({
    onElementVisible,
    canLoadMore
}) => {
    const [debounce, setDebounce] = useState(false);

    useEventListener(window, 'scroll', scrollListener);

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
