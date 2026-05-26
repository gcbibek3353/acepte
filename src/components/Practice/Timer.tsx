import { convertSecondsToMinutesAndSeconds } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

type TimerProps = {
    countDownTime: number;
    callbackFn: () => void;
    title?: string;
}

const Timer = ({ countDownTime, callbackFn, title }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(countDownTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            callbackFn();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, callbackFn]);

    const { minutes, seconds } = convertSecondsToMinutesAndSeconds(timeLeft);

<<<<<<< HEAD
   return (
    <div className="fixed top-18 right-4 z-50">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-400">
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
=======
    const isUrgent = timeLeft <= 120;
    const isCritical = timeLeft <= 60;

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-lg transition-colors duration-500 ${
                isCritical
                    ? 'bg-destructive/10 border-destructive/40 text-destructive'
                    : isUrgent
                    ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-400'
                    : 'bg-card border-border text-foreground'
            }`}>
                <svg
                    className={`w-4 h-4 shrink-0 ${isCritical ? 'animate-pulse' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
>>>>>>> 57e0baf (styled all the pages in listening section)
                </svg>
                <span className="text-xs font-medium text-current opacity-70">
                    {title ?? 'Remaining'}
                </span>
                <span className="font-mono font-semibold text-sm tabular-nums">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>
        </div>
    )
}

export default Timer
