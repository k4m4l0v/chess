import { useState, useRef, useEffect } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface ITimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    setWinner: (win: string) => void;
    setGameEnd: () => void;
}

export function Timer({currentPlayer, restart, setWinner, setGameEnd}: ITimerProps) {
    const [blackTime, setBlackTime] = useState(4);
    const [whiteTime, setWhiteTime] = useState(4);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.BLACK ? decrementBlackTime : decrementWhiteTime;

        timer.current = setInterval(callback, 1000);
    }

    function stopTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
    }

    if (blackTime === 0) {
        stopTimer();
        setWinner('Белые');
        setGameEnd();
    }

    if (whiteTime === 0) {
        stopTimer();
        setWinner('Черные');
        setGameEnd();
    }

    function decrementBlackTime() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTime() {
        setWhiteTime(prev => prev - 1);
    }

    const handleRestart = () => {
        setBlackTime(400);
        setWhiteTime(400);
        restart();
    }

    return (
        <div>
            <button className='transition' onClick={handleRestart}>Начать заново</button>
            <h3>Время черных - {blackTime}</h3>
            <h3>Время белых - {whiteTime}</h3>
        </div>
    )
}
