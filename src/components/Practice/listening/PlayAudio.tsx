'use client'
import React, { useEffect, useRef, useState } from 'react'

const PlayAudio = ({ audioUrl }: { audioUrl: string }) => {
        audioUrl = 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' // TODO : Remove this line after testing
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0)

    const audioRef = useRef<HTMLAudioElement>(null)

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

    return (
    <div className="mb-8 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-6">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    {isPlaying ? (
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Progress Bar Container */}
                <div className="flex-1 flex items-center space-x-4">
                    {/* Progress Bar */}
                    <div className="flex-1 relative bg-gray-200 rounded-full h-3 shadow-inner">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full h-3 bg-transparent rounded-full appearance-none cursor-pointer slider absolute top-0 left-0"
                            style={{
                                background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
                            }}
                        />
                    </div>

                    {/* Time Display */}
                    <div className="flex-shrink-0 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                {/* Volume/Speed Control */}
                <button
                    onClick={handleSpeedChange}
                    className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                >
                    {playbackSpeed}x
                </button>
            </div>
        </div>
    </div>
)
}

export default PlayAudio