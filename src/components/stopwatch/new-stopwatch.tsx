import { Platform, StyleSheet, TouchableOpacity, View, Text, Button, } from "react-native";
import React, { useState } from "react";
import { OnComplete, useTimer } from "@/components/stopwatch/use-timer";
import { createArcPath } from "@/components/stopwatch/create-arc-path";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { useCountdown } from "@/components/stopwatch/use-countdown";




type StopwatchProps = {
    duration: number;
    isPlaying?: boolean;
    size?: number;
    strokeWidth?: number;
    onComplete?: (totalElapsedTime?: number) => OnComplete | void;
}

// Main CountdownCircleTimer component
export const Stopwatch = (
    {
        duration,
        size = 180,
        strokeWidth = 12,
        onComplete
    }: StopwatchProps
) => {
    const [isPlaying, setPlaying] = useState(false);
    const {elapsedTime} = useTimer({isPlaying, duration, onComplete});
    const {path, pathLength} = createArcPath(size, strokeWidth, 'counterclockwise');

    const remainingTime = Math.max(duration - elapsedTime, 0);
    const lineColour = "#FF0000"
    return (
        <View style={{position: "relative", width: size, height: size}}>
            <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                <Path
                    d={path}
                    fill="none"
                    stroke='#d9d9d9'
                    strokeWidth={strokeWidth}
                />
                <Path
                    d={path}
                    fill="none"
                    stroke={lineColour}
                    strokeWidth={strokeWidth}
                    strokeDasharray={pathLength}
                    strokeDashoffset={(elapsedTime / duration) * pathLength}

                />
            </Svg>
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button title={isPlaying ? 'STOP' : 'START'} onPress={() => setPlaying(prev => !prev)} />
                <Text>{remainingTime.toFixed(0)}</Text>
            </View>
        </View>
    );
};

export function NewStopwatch() {
    const duration = 20;
    const [isPlaying, setPlaying] = useState(false);
    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
    } = useCountdown({
        isPlaying: isPlaying,
        duration,
        colors: ['#004777', '#F7B801', '#A30000', '#A30000'],
        colorsTime: [20, 15, 10, 0],
        rotation: 'clockwise',
    });

    return (
    <View >
      <View style={{ width: size, height: size, position: 'relative' }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
              <Stop offset="5%" stopColor="gold"/>
              <Stop offset="95%" stopColor="red"/>
            </LinearGradient>
          </Defs>
          <Path
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {elapsedTime !== duration && (
            <Path
              d={path}
              fill="none"
              stroke={'#d9d9d9'}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
            />
          )}
        </Svg>
        <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button title={isPlaying ? 'STOP' : 'START'} onPress={() => setPlaying(prev => !prev)} />
                <Text>{remainingTime.toFixed(0)}</Text>
            </View>
      </View>
    </View>
  );
}



