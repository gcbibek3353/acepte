import { convertSecondsToMinutesAndSeconds } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

type TimerProps = {
    countDownTime: number;  // In seconds
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

    const { minutes, seconds } = convertSecondsToMinutesAndSeconds(timeLeft)

   return (
    <div className="fixed top-4 right-4 z-50">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg border-2 border-red-400">
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-lg">
                    {title ? title : "Remaining time"}: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </div>
        </div>
    </div>
)
}

export default Timer