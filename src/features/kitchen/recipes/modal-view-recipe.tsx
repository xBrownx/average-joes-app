import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
    Button,
    Linking,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { Rating } from 'react-native-ratings';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserRecipe } from '@/domain';
import { ThemedModalProps } from "@/components/modal/types";
import { ThemedModal } from "@/components/modal";
import { globalStyles } from "@/styles/global-styles";

type ViewRecipeModalProps = ThemedModalProps & {
    selectedRecipe: UserRecipe | null;
};

function FieldValue({name, value}: { name: string; value?: string }) {
    return (
        <View style={{marginTop: 8}}>
            <ThemedText
                type={'defaultSemiBold'}
                style={{color: themedColors.tertiary}}
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
            <View style={{paddingLeft: 8, flexDirection: 'row', gap: 8}}>
                <ThemedText type={'defaultSemiBold'} style={{color: 'black'}}>
                    Dose:
                </ThemedText>
                <ThemedText type={'default'}>{dose}</ThemedText>
            </View>
            <View style={{paddingLeft: 8, flexDirection: 'row', gap: 8}}>
                <ThemedText type={'defaultSemiBold'} style={{color: 'black'}}>
                    Yield:
                </ThemedText>
                <ThemedText type={'default'}>{yieldVal}</ThemedText>
            </View>
            <View style={{paddingLeft: 8, flexDirection: 'row', gap: 8}}>
                <ThemedText type={'defaultSemiBold'} style={{color: 'black'}}>
                    Time:
                </ThemedText>
                <ThemedText type={'default'}>{time}</ThemedText>
            </View>
        </View>
    );
}

export const ViewRecipeModal = (
    {
        isOpen,
        onClose,
        selectedRecipe,
    }: ViewRecipeModalProps
) => {
    if (!selectedRecipe) return;
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
        <ThemedModal isOpen={isOpen} onClose={onClose}>
            <TouchableWithoutFeedback>
                <View style={globalStyles.innerModal}>
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
                        value={selectedRecipe.blendName}
                    />
                    <FieldValue
                        name={'Roaster'}
                        value={selectedRecipe.roasterName ?? 'unknown'}
                    />
                    <FieldValue
                        name={'Tasting Notes'}
                        value={selectedRecipe.tastingNotes ?? 'unknown'}
                    />
                    <Recipe
                        dose={selectedRecipe.dose ?? 'unknown'}
                        yieldVal={selectedRecipe.yield ?? 'unknown'}
                        time={selectedRecipe.time ?? 'unknown'}
                    />
                    <FieldValue name={'Rating'} />
                    <Rating
                        type="heart"
                        ratingCount={5}
                        imageSize={40}
                        startingValue={selectedRecipe.rating ?? 0}
                        jumpValue={0.5}
                        readonly
                        style={{
                            alignItems: 'flex-start',
                            marginBottom: 16,
                        }}
                    />
                    {selectedRecipe && (
                        <Button
                            title={'BUY MORE'}
                            color={themedColors.primary}
                            onPress={() =>
                                openExternalUrl(selectedRecipe.buyLink)
                            }
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </ThemedModal>
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
