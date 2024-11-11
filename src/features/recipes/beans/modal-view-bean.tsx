import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
    Button,
    Linking,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { Rating } from 'react-native-ratings';

import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';

import { UserRecipe } from '@/domain';

type ViewBeanModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    selectedBean: UserRecipe | null;
    withInput?: boolean;
};

function FieldValue({ name, value }: { name: string; value?: string }) {
    return (
        <View style={{ marginTop: 8 }}>
            <ThemedText
                type={'defaultSemiBold'}
                style={{ color: themedColors.tertiary }}
            >
                {name}:
            </ThemedText>
            {value && <ThemedText type={'default'}>{value}</ThemedText>}
        </View>
    );
}

function Recipe({
                    dose,
                    yieldVal,
                    time,
                }: {
    dose: string;
    yieldVal: string;
    time: string;
}) {
    return (
        <View>
            <FieldValue name={'Recipe'} />
            <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 8 }}>
                <ThemedText type={'defaultSemiBold'} style={{ color: 'black' }}>
                    Dose:
                </ThemedText>
                <ThemedText type={'default'}>{dose}</ThemedText>
            </View>
            <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 8 }}>
                <ThemedText type={'defaultSemiBold'} style={{ color: 'black' }}>
                    Yield:
                </ThemedText>
                <ThemedText type={'default'}>{yieldVal}</ThemedText>
            </View>
            <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 8 }}>
                <ThemedText type={'defaultSemiBold'} style={{ color: 'black' }}>
                    Time:
                </ThemedText>
                <ThemedText type={'default'}>{time}</ThemedText>
            </View>
        </View>
    );
}

export const ViewBeanModal = ({
                                  isOpen,
                                  onClose,
                                  selectedBean,
                                  withInput,
                                  children,
                                  ...rest
                              }: ViewBeanModalProps) => {
    if (!selectedBean) return;
    const openExternalUrl = (url: string | undefined | null) => {
        if (!url) return;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            style={styles.container}
            {...rest}
        >
            <TouchableOpacity style={styles.modalOuter} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalInner}>
                        <View style={styles.titleContainer}>
                            <ThemedText type={'subtitle'}>
                                Blend Details
                            </ThemedText>
                            <Ionicons.Button
                                name="close"
                                size={24}
                                backgroundColor={'transparent'}
                                color={themedColors.tertiary}
                                onPress={onClose}
                            />
                        </View>
                        <FieldValue
                            name={'Blend Name'}
                            value={selectedBean.blendName}
                        />
                        <FieldValue
                            name={'Roaster'}
                            value={selectedBean.roasterName ?? 'unknown'}
                        />
                        <FieldValue
                            name={'Tasting Notes'}
                            value={selectedBean.tastingNotes ?? 'unknown'}
                        />
                        <Recipe
                            dose={selectedBean.recipe?.dose ?? 'unknown'}
                            yieldVal={selectedBean.recipe?.yield ?? 'unknown'}
                            time={selectedBean.recipe?.time ?? 'unknown'}
                        />
                        <FieldValue name={'Rating'} />
                        <Rating
                            type="heart"
                            ratingCount={5}
                            imageSize={40}
                            startingValue={selectedBean.rating ?? 0}
                            jumpValue={0.5}
                            readonly
                            style={{
                                alignItems: 'flex-start',
                                marginBottom: 16,
                            }}
                        />
                        {selectedBean && (
                            <Button
                                title={'BUY MORE'}
                                color={themedColors.primary}
                                onPress={() =>
                                    openExternalUrl(selectedBean.buyLink)
                                }
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
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
        width: '100%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    content: {
        gap: 8,
    },
    input: {
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
    },
});
