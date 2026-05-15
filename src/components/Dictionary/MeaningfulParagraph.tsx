"use client";

import React, { useState } from 'react';
import { DICTIONARY_URL } from '@/app/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Phonetic {
    text?: string;
    audio?: string;
}

interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface DictionaryEntry {
    word: string;
    phonetic?: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
}

interface WordData {
    entry: DictionaryEntry;
    synonyms: string[];
    antonyms: string[];
}

interface ParagraphProps {
    paragraph: string;
}

const MeaningfulParagraph = ({ paragraph }: ParagraphProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wordData, setWordData] = useState<WordData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleWordClick = async (word: string) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z'-]/g, '');
        if (!cleanWord) return;

        setError(null);
        setWordData(null);
        setIsOpen(true);
        setLoading(true);

        try {
            const res = await fetch(`${DICTIONARY_URL}${cleanWord}`);
            if (!res.ok) {
                setError(`No definition found for "${cleanWord}"`);
                return;
            }
            const data: DictionaryEntry[] = await res.json();
            const entry = data[0];

            const synonyms = [
                ...new Set(
                    entry.meanings.flatMap(m => [
                        ...m.synonyms,
                        ...m.definitions.flatMap(d => d.synonyms),
                    ])
                ),
            ];
            const antonyms = [
                ...new Set(
                    entry.meanings.flatMap(m => [
                        ...m.antonyms,
                        ...m.definitions.flatMap(d => d.antonyms),
                    ])
                ),
            ];

            setWordData({ entry, synonyms, antonyms });
        } catch {
            setError('Failed to fetch word definition. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const tokens = paragraph.split(/(\b[a-zA-Z][a-zA-Z'-]*\b)/g);

    return (
        <>
            <p className="leading-relaxed text-gray-800">
                {tokens.map((token, index) =>
                    /^[a-zA-Z][a-zA-Z'-]*$/.test(token) ? (
                        <span
                            key={index}
                            onClick={() => handleWordClick(token)}
                            className="cursor-pointer hover:text-teal-600 hover:underline underline-offset-2 transition-colors duration-150"
                        >
                            {token}
                        </span>
                    ) : (
                        <span key={index}>{token}</span>
                    )
                )}
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    {loading && (
                        <div className="flex items-center justify-center py-10">
                            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {error && !loading && (
                        <div className="py-8 text-center">
                            <p className="text-gray-500">{error}</p>
                        </div>
                    )}

                    {wordData && !loading && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900 capitalize">
                                    {wordData.entry.word}
                                </DialogTitle>
                                {wordData.entry.phonetic && (
                                    <p className="text-teal-600 text-base">{wordData.entry.phonetic}</p>
                                )}
                            </DialogHeader>

                            <div className="space-y-4">
                                {wordData.entry.phonetics.some(p => p.audio) && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Pronunciation
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {wordData.entry.phonetics
                                                .filter(p => p.audio)
                                                .map((p, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        {p.text && (
                                                            <span className="text-sm text-gray-600">{p.text}</span>
                                                        )}
                                                        <audio controls src={p.audio} className="h-8">
                                                            <track kind="captions" />
                                                        </audio>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {wordData.entry.meanings.map((meaning, i) => (
                                    <div key={i} className="border-t border-gray-100 pt-4">
                                        <span className="inline-block text-xs font-semibold text-white bg-teal-500 px-2 py-0.5 rounded-full mb-3">
                                            {meaning.partOfSpeech}
                                        </span>
                                        <div className="space-y-3">
                                            {meaning.definitions.map((def, j) => (
                                                <div key={j}>
                                                    <p className="text-gray-800 text-sm">
                                                        {j + 1}. {def.definition}
                                                    </p>
                                                    {def.example && (
                                                        <p className="text-gray-400 text-sm italic mt-1 pl-4">
                                                            &ldquo;{def.example}&rdquo;
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {wordData.synonyms.length > 0 && (
                                    <div className="border-t border-gray-100 pt-4">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Synonyms
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {wordData.synonyms.map((word, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full"
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {wordData.antonyms.length > 0 && (
                                    <div className="border-t border-gray-100 pt-4">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Antonyms
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {wordData.antonyms.map((word, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-full"
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MeaningfulParagraph;
