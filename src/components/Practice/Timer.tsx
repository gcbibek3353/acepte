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
        <div className='p-4 m-4 text-lg rounded-md inline-block text-white bg-red-500 '>{title ? title : "Remaining time"} : {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
    )
}

export default Timer