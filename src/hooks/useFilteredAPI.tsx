import { useState, useMemo } from 'react';
import useFetch from './useFetch';

interface FilterParams {
    page?: number;
    limit?: number;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | null;
    bookmarked?: boolean | null;
    answered?: boolean | null;
}

const useFilteredAPI = <T = any>(baseURL: string) => {
    const [queryParams, setQueryParams] = useState<FilterParams>({
        page: 1,
        limit: 10,
        difficulty: null,
        bookmarked: null,
        answered: null
    });

    const URL = useMemo(() => {
        const fullURL = `${process.env.NEXT_PUBLIC_API_URL}${baseURL}`;
        const params = new URLSearchParams();

        params.append('page', queryParams.page!.toString());
        params.append('limit', queryParams.limit!.toString());

        if (queryParams.difficulty) {
            params.append('difficulty', queryParams.difficulty);
        }
        if (queryParams.bookmarked !== null) {
            params.append('bookmarked', queryParams.bookmarked.toString());
        }
        if (queryParams.answered !== null) {
            params.append('answered', queryParams.answered.toString());
        }

        return `${fullURL}?${params.toString()}`;
    }, [baseURL, queryParams]);

    const { data: response, loading, error } = useFetch<{ data: T }>(URL);

    return {
        data: response?.data,
        loading,
        error,
        queryParams,
        setQueryParams
    };
};

export default useFilteredAPI;
export type { FilterParams };