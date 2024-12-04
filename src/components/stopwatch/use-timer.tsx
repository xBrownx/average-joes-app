import React from 'react'

export type OnComplete = {
  /** Indicates if the loop should start over. Default: false */
  shouldRepeat?: boolean
  /** Delay in seconds before looping again. Default: 0 */
  delay?: number
  /** Set new initial remaining when starting over the animation */
  newInitialRemainingTime?: number
}

type UseTimerProps = {
    isPlaying: boolean;
    duration: number;
    startAt?: number;
    onUpdate?: (remainingTime: number) => void;
    onComplete?: (totalElapsedTime?: number) => OnComplete | void;
}

export const useTimer = ({ isPlaying, duration, onUpdate, onComplete }: UseTimerProps) => {
  const [elapsedTime, setElapsedTime] = React.useState(duration);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const newElapsed = prev - 0.02 > 0 ? prev - 0.02 : 0;
          onUpdate?.(newElapsed);
          if (newElapsed <= 0) {
            clearInterval(timerRef.current!);
            onComplete?.();
          }
          return newElapsed;
        });
      }, 0.02 * 1000);
    } else {
      clearInterval(timerRef.current!);
    }

    return () => clearInterval(timerRef.current!);
  }, [isPlaying]);

  return { elapsedTime };
};