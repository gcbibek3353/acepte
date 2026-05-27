'use client';
import useFilteredAPI from '@/hooks/useFilteredAPI';
import FilterQuestions from './FilterQuestions';
import { QuestionListLoading, QuestionListError } from './QuestionListState';

interface RawQuestion {
    id: string;
    questionId: string;
    title?: string;
    textTitle?: string;
    essayTitle?: string;
    difficulty: string;
    bookmarks: unknown[];
    answers: unknown[];
}

interface FilterQuestions2Props {
    apiPath: string;
    initialData?: RawQuestion[];
}

const FilterQuestions2 = ({ apiPath, initialData }: FilterQuestions2Props) => {
    const { data, loading, error, queryParams, setQueryParams } = useFilteredAPI<RawQuestion[]>(apiPath, { initialData });

    const questions = data?.map((q) => ({
        id: q.id,
        questionId: q.questionId,
        title: q.title ?? q.textTitle ?? q.essayTitle ?? '',
        difficulty: q.difficulty,
        bookmarked: q.bookmarks.length > 0,
        answered: q.answers.length > 0,
    })) ?? [];

    if (loading) return <QuestionListLoading />;
    if (error) return <QuestionListError error={error} />;

    return <FilterQuestions questions={questions} queryParams={queryParams} setQueryParams={setQueryParams} />;
};

export default FilterQuestions2;
