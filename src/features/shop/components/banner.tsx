import { AutoScaledImage } from "@/components/image";
import React from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel'
const { width } = Dimensions.get('window');

const images = [
    {id: '1', uri: require('@/assets/images/Mobile_Banner-01_720x.jpg')},
    {id: '2', uri: require('@/assets/images/Mobile_Banner-02_720x.jpg')},
]

export function Banner() {

const [index, setIndex] = React.useState<number>(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const finalIndex = Math.floor(contentOffsetX / width);
    setIndex(finalIndex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
          }}
        >
          {images.map((image) => (
            <View
              key={image.id}
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AutoScaledImage
                source={image.uri}
                widthPercent={'100%'}
              />
            </View>
          ))}
        </ScrollView>
        <View style={{ marginTop: -35 }}>
          <AnimatedDotsCarousel
            length={images.length}
            scrollableDotsConfig={{
              setIndex,
              onNewIndex: (newIndex: any) => {
                scrollViewRef?.current?.scrollTo?.({
                  x: newIndex * width,
                  animated: false,
                });
              },
              containerBackgroundColor: 'rgba(230,230,230, 0.5)',
              container: {
                alignItems: 'center',
                borderRadius: 15,
                height: 30,
                justifyContent: 'center',
                paddingHorizontal: 15,
               }
            }}
            currentIndex={index}
            maxIndicators={4}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: 'white',
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: 'white',
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
                quantity: 1,
              },
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
                quantity: 1,
              },
            ]}
          />
        </View>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});