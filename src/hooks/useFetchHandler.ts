import { useState } from 'react';

export const useFetchHandler = <T>(
    initialData?: T | undefined
): {
    handleFetch(response: T): void;
    apiData: T | undefined;
    isLoading: boolean;
} => {
    const [apiData, setApiData] = useState<T | undefined>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleFetch = (response: T) => {
        setApiData(response);
        setIsLoading(!!!response);
    };

    return {
        handleFetch,
        apiData,
        isLoading
    };
};
