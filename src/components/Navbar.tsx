'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const DropdownValues = {
    speaking: [
        { title: "Read Aloud", link: "/practice/speaking" },
        { title: "Repeat Sentence", link: "/practice/speaking" },
        { title: "Describe Image", link: "/practice/speaking" },
        { title: "Re-tell Lecture", link: "/practice/speaking" },
        { title: "Answer Short Question", link: "/practice/speaking" },
        { title: "Summarize Group Discussion", link: "/practice/speaking" },
        { title: "Respond to a situation", link: "/practice/speaking" }
    ],
    writing: [
        { title: "Summarize Written Text", link: "/practice/summarize-written-text" },
        { title: "Write Essay", link: "/practice/write_essay" }
    ],
    reading: [
        { title: "Fill in the Blanks (Dropdown)", link: "/practice/fib_wr" },
        { title: "Multiple Choice (Multiple)", link: "/practice/r_mcm" },
        { title: "Re-order Paragraphs", link: "/practice/reading" },
        { title: "Fill in the Blanks (Drag and Drop)", link: "/practice/reading" },
        { title: "Multiple Choice (Single)", link: "/practice/reading" }
    ],
    listening: [
        { title: "Summarize Spoken Text", link: "/practice/summarize_spoken_text" },
        { title: "Multiple Choice (Multiple)", link: "/practice/MultipleChoiceMultiple" },
        { title: "Fill in the Blanks", link: "/practice/fill_in_the_blanks" },
        { title: "Highlight Correct Summary", link: "/practice/HighlightCorrectSummary" },
        { title: "Multiple Choice (Single)", link: "/practice/MultipleChoiceSingle" },
        { title: "Select Missing Word", link: "/practice/SelectMissingWord" },
        { title: "Highlight Incorrect Words", link: "/practice/HighlightIncorrectWord" },
        { title: "Write From Dictation", link: "/practice/WriteFromDictation" }
    ]
}

interface DropdownProps {
    title: string
    items: { title: string; link: string }[]
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            >
                {title}
                <svg
                    className={`-mr-1 ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image 
                                src="/logo.png" 
                                alt="logo" 
                                width={120} 
                                height={40}
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Navigation Dropdowns */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Dropdown title="Speaking" items={DropdownValues.speaking} />
                        <Dropdown title="Writing" items={DropdownValues.writing} />
                        <Dropdown title="Reading" items={DropdownValues.reading} />
                        <Dropdown title="Listening" items={DropdownValues.listening} />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar