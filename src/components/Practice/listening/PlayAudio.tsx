'use client'
import React, { useEffect, useRef, useState } from 'react'

const PlayAudio = ({ audioUrl }: { audioUrl: string }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
    const [error, setError] = useState<string | null>(null)

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => {
            setDuration(audio.duration)
            setError(null)
        }
        const handleEnded = () => setIsPlaying(false)
        const handleError = () => {
            setError('Failed to load audio')
            setIsPlaying(false)
        }

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('error', handleError)
        }
    }, [audioUrl])

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) { audio.pause() } else { audio.play() }
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
        const m = Math.floor(time / 60)
        const s = Math.floor(time % 60)
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
        <div className="rounded-lg border border-border bg-muted/30 p-5 mb-6">
            {!audioUrl?.trim() ? (
                <div className="text-sm text-destructive font-medium">No audio URL provided</div>
            ) : error ? (
                <div className="text-sm text-destructive font-medium mb-3">{error}</div>
            ) : null}
            <audio ref={audioRef} src={audioUrl} preload="metadata" crossOrigin="anonymous" />

            <div className="flex items-center gap-5">
                {/* Play / Pause */}
                <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    disabled={!audioUrl?.trim() || !!error}
                    className="shrink-0 w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-sm"
                >
                    {isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Progress bar + time */}
                <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1 relative h-2 bg-border rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-amber-500 rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <span className="shrink-0 text-xs font-mono text-muted-foreground tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                {/* Speed toggle */}
                <button
                    onClick={handleSpeedChange}
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md hover:bg-muted transition-colors"
                >
                    {playbackSpeed}×
                </button>
            </div>
        </div>
    )
}

export default PlayAudio
