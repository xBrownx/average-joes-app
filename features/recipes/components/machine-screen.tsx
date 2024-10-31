import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import SlideForwardView from "@/components/anim/slide-forward";
import colors from "@/components/colors";
import React, { useState } from "react";
import { AddMachineModal } from "@/features/recipes/components/add-machine-modal";

type RecipeMachinesProps = {
    navBack: () => void;
}

export default function RecipeMachines({navBack}: RecipeMachinesProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [machines, setMachines] = useState<string[]>([]);

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <AddMachineModal isOpen={modalOpen} onClose={closeModal} />
            <FlatList
                ListHeaderComponent={
                    <ThemedView >
                        <ThemedView style={styles.titleContainer} >
                            <Ionicons.Button
                                name="arrow-back"
                                size={24}
                                backgroundColor={'transparent'}
                                color={colors.primary}
                                onPress={navBack}
                            />
                            <ThemedText type="title" >
                                MACHINES
                            </ThemedText >
                            <Ionicons.Button
                                name="add"
                                size={24}
                                backgroundColor={'transparent'}
                                color={colors.primary}
                                onPress={() => setModalOpen(true)}
                            />
                        </ThemedView >
                        <ThemedView >
                            <ThemedText type="default" >Add, edit or delete your machines here.</ThemedText >
                        </ThemedView >
                    </ThemedView >
                }
                columnWrapperStyle={{gap: 16}}
                contentContainerStyle={{gap: 8}}
                data={machines}
                renderItem={({item}) => (
                    <CardView id={""} onPress={() => {
                    }} >
                        <ThemedText >{item}</ThemedText >
                    </CardView >
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
