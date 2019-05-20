export const useDiscogsApi = () => {
    const DISCOGS_API_URL = 'https://api.discogs.com';

    function formDiscogsUrl(segment: string, variable: string) {
        return `${DISCOGS_API_URL}/${segment}/${variable}`;
    }

    function fetchReleaseData(
        id: string,
        callback: (response: Response) => void
    ) {
        const query = formDiscogsUrl('releases', id);
        fetch(query).then(callback);
    }

    return {
        fetchReleaseData
    };
};
