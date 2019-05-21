import { useState } from 'react';

export const useInfiniteLoader = (pageSize: number) => {
    const [currentPageSize, setCurrentPageSize] = useState<number>(pageSize);
    const [arrayLength, setArrayLength] = useState<number>(pageSize);
    const canLoadMore = currentPageSize <= arrayLength;

    return {
        canLoadMore,
        currentPageSize,
        setCurrentPageSize,
        arrayLength,
        setArrayLength
    };
};
