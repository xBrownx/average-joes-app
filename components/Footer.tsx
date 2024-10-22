import React from 'react';
// import FooterSVG from '@/assets/images/footer.svg';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from './colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Footer: any = ({ aspectRatio, children }: any) => {
  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.view1}>{children}</View>
      <Image
        source={require('@/assets/images/footer-small.png')}
        style={
          aspectRatio == 'small' ? styles.samllLogoImage : styles.logoImage
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative', // Allows the image to be positioned
  },
  view1: {
    flex: 1, // Takes up all remaining space
  },

  logoImage: {
    // height: 'auto', // Adjust height as needed

    position: 'absolute',
    // top: 0,
    // right: 0,
     bottom: -85,
    // left: 0,
    transform: 'translateY(0px)',
    width: '100%',
    height: undefined,
    aspectRatio: '225/131',
    // height: 'auto',
    // position: 'static',
    // bottom: 0,
    // height: '100%',

    // marginTop: 'auto',
    // height: 50,
    // resizeMode: 'contain', // Ensures the image scales correctly
    // alignSelf: 'center', // Centers the image horizontally
    // position: 'fixed', // Allows the image to be positioned
    // bottom: 0, // Positions the image at the bottom of the container
    // alignItems: 'flex-end', // Centers the image horizontally
    // alignSelf: 'flex-end', // Centers the image horizontally
    // alignSelf: 'center', // Centers the image horizontally
  },
  samllLogoImage: {
    // height: 'auto', // Adjust height as needed

    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: undefined,
    aspectRatio: '300/100',
    // height: 'auto',
    // position: 'static',
    // bottom: 0,
    // height: '100%',

    // marginTop: 'auto',
    // height: 50,
    // resizeMode: 'contain', // Ensures the image scales correctly
    // alignSelf: 'center', // Centers the image horizontally
    // position: 'fixed', // Allows the image to be positioned
    // bottom: 0, // Positions the image at the bottom of the container
    // alignItems: 'flex-end', // Centers the image horizontally
    // alignSelf: 'flex-end', // Centers the image horizontally
    // alignSelf: 'center', // Centers the image horizontally
  },
});

export default Footer;
