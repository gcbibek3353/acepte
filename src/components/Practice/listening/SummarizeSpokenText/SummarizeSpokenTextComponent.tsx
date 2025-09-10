import React, { useEffect, useState, useRef } from 'react'

interface SummarizeSpokenTextComponentProps {
    passageId: string;
    audioUrl: string;
}

const SummarizeSpokenTextComponent = ({ passageId, audioUrl }: SummarizeSpokenTextComponentProps) => {
    audioUrl='https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' // TODO : Remove this line after testing
    const [essay, setEssay] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0)

    const audioRef = useRef<HTMLAudioElement>(null)

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/practice/listening/summarizeSpokenText/${passageId}`

    useEffect(() => {
        const words = essay.trim().split(/\s+/).filter(word => word.length > 0)
        setWordCount(words.length)
    }, [essay])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audioUrl])

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current
        if (!audio) return

        const newTime = (parseFloat(e.target.value) / 100) * duration
        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = () => {
        const audio = audioRef.current
        if (!audio) return

        const newSpeed = playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : 1.0
        audio.playbackRate = newSpeed
        setPlaybackSpeed(newSpeed)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    const handleSubmit = async () => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summarizedText: essay,
                })
            })

            const result = await response.json()

            if (result.success) {
                alert('Essay submitted and evaluated successfully!')
                console.log('Evaluation result:', result.data)
                setEssay('')
            } else {
                alert(`Error: ${result.message}`)
            }
        } catch (error) {
            console.error('Error submitting essay:', error)
            alert('Failed to submit essay. Please try again.')
        }
    }

    return (
        <div>
            {/* Audio Player */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <audio ref={audioRef} src={audioUrl} preload="metadata" />

                <div className="flex items-center space-x-4">
                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlayPause}
                        className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
                    >
                        {isPlaying ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Progress Bar Container */}
                    <div className="flex-1 flex items-center space-x-3">
                        {/* Progress Bar */}
                        <div className="flex-1 relative">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleProgressChange}
                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${progress}%, #d1d5db ${progress}%, #d1d5db 100%)`
                                }}
                            />
                        </div>

                        {/* Time Display */}
                        <div className="flex-shrink-0 text-sm text-gray-600">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    {/* Volume/Speed Control */}
                    <button
                        onClick={handleSpeedChange}
                        className="flex-shrink-0 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        X{playbackSpeed}
                    </button>

                </div>
            </div>

            {/* Essay Textarea */}
            <div className="mb-4">
                <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    className="w-full h-96 p-4 border-2 border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Start writing your essay here..."
                />
            </div>

            {/* Word Count and Submit */}
            <div className="flex justify-between items-center">
                <span className="text-gray-600">
                    Word Count: {wordCount}
                </span>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    Submit Essay
                </button>
            </div>
        </div>
    )
}

export default SummarizeSpokenTextComponent