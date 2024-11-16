import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ThemedText } from "@/components/text/themed-text";
import React from "react";

export function FadeInText({children}: {children: React.ReactNode}) {
    return (
      <Animated.View entering={FadeIn.duration(250).delay(200)} exiting={FadeOut.duration(200)}>
          <ThemedText>{children}</ThemedText>
      </Animated.View>
    );
}