import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

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

    const url = useMemo(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
        const fullURL = `${apiUrl}${baseURL}`;
        const params = new URLSearchParams();

        params.append('page', queryParams.page!.toString());
        params.append('limit', queryParams.limit!.toString());

        if (queryParams.difficulty) {
            params.append('difficulty', queryParams.difficulty);
        }
        if (queryParams.bookmarked !== null) {
            params.append('bookmarked', queryParams.bookmarked!.toString());
        }
        if (queryParams.answered !== null) {
            params.append('answered', queryParams.answered!.toString());
        }

        return `${fullURL}?${params.toString()}`;
    }, [baseURL, queryParams]);

    const { data: response, isLoading, error } = useQuery<{ data: T }>({
        queryKey: [baseURL, queryParams],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            return res.json();
        },
    });

    return {
        data: response?.data,
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : 'Something went wrong') : null,
        queryParams,
        setQueryParams,
    };
};

export default useFilteredAPI;
export type { FilterParams };
