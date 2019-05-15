import { useState } from 'react';

export const useFetchHandler = <T>(
    initialData: T
): {
    handleFetch(response: T): void;
    apiData: T;
    isLoading: boolean;
} => {
    const [apiData, setApiData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleFetch = response => {
        setApiData(response);
        setIsLoading(!!!response);
    };

    return {
        handleFetch,
        apiData,
        isLoading
    };
};
