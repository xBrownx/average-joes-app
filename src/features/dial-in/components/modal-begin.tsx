import { Button, ModalProps as RNModalProps, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { ThemedModal } from '@/components/modal';
import { globalStyles } from '@/styles/global-styles';
import { ExternalLink } from '@/components/ExternalLink';

type ModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
};

export function ModalBegin({ isOpen, onClose }: ModalProps) {
    return (
        <ThemedModal isOpen={isOpen} close={onClose} >
            <View style={globalStyles.innerModal} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        Before we start you'll need the following to dial in coffee.
                    </ThemedText >
                </View >
                <View style={styles.stepContainer} >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'} >1.</ThemedText > The coffee you are using needs to be
                        fresh, roasted less than 40 days ago. If its older
                        than that chances are its going off, which makes dialing it in super hard. You can still try but
                        im telling you now that it will be tough.
                    </ThemedText >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'} >2.</ThemedText > Freshly ground - If you are buying pre
                        ground coffee, this is the reason your coffee isn't
                        great.
                    </ThemedText >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'} >3.</ThemedText > Scales - Even kitchen scales will do for
                        now but you should invest in some coffee
                        scales.
                    </ThemedText >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'} >4.</ThemedText > A timer - Can use your phone (coffee
                        scales will have then inbuilt).
                    </ThemedText >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'} >5.</ThemedText > We are going to use a double shot basket.
                        18g to 22g depending on your machine.
                    </ThemedText >
                    <ThemedText >
                        If you need coffee or scales you can grab them
                        <ExternalLink href={'https://averagejoescoffee.com.au/products/the-holy-grail-coffee-scale'}>
                            <ThemedText type={'defaultSemiBold'}>
                                {' '}here.{' '}
                            </ThemedText >
                        </ExternalLink>
                        If you have good coffee and some scales let get cracking!
                    </ThemedText >
                </View >
                <View style={styles.stepContainer} >
                    <Button title={'OK I\'m Ready'} color={themedColors.primary} onPress={onClose} />
                </View >
            </View >
        </ThemedModal >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepContainer: {
        gap: 16,
        marginBottom: 16,
    },
    reactLogo: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
});