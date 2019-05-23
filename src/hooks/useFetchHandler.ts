import { useState } from 'react';

export const useFetchHandler = <T>(
    initialData: T
): {
    handleFetch(response: T): void;
    apiData: T;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
} => {
    const [apiData, setApiData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleFetch = (response: T) => {
        setApiData(response);
        setIsLoading(!!!response);
    };

    return {
        handleFetch,
        setIsLoading,
        apiData,
        isLoading
    };
};
