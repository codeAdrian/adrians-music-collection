import { DISCOGS_API_URL, DISCOGS_RELEASES } from 'constant';

export const useDiscogsApi = () => {
    function formDiscogsUrl(segment: string, variable: string) {
        return `${DISCOGS_API_URL}/${segment}/${variable}`;
    }

    function fetchReleaseData(
        id: string,
        callback: (response: Response) => void
    ) {
        const query = formDiscogsUrl(DISCOGS_RELEASES, id);
        fetch(query).then(callback);
    }

    return {
        fetchReleaseData
    };
};
