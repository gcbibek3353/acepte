export function QuestionListLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="text-base font-medium">Loading questions…</span>
            </div>
        </div>
    );
}

export function QuestionListError({ error }: { error: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-4 text-destructive text-sm font-medium">
                {error}
            </div>
        </div>
    );
}
