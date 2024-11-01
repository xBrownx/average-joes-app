import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, View, Image } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import SlideForwardView from "@/components/anim/slide-forward";
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import { AddMachineModal } from "@/features/recipes/components/add-machine-modal";
import { useAppSelector } from "@/store/store";
import { selectAppData, selectUserMachines } from "@/store/app-data-slice";

interface UserMachine {
    id: string;
    make: string;
    image: any;
}

type RecipeMachinesProps = {
    navBack: () => void;
};

const initialValue = {
    id: 'add',
    make: "ADD\nNEW",
    image: "",
};

export default function RecipeMachines({navBack}: RecipeMachinesProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const userData = useAppSelector(selectAppData);
    const [machinesList, setMachinesList] = useState<UserMachine[]>([]);

    const userMachines = useAppSelector(selectUserMachines);

    useEffect(() => {
        setMachinesList(
            [...userMachines.map((machine, idx) => {
                return {id: idx + machine.make, make: machine.make, image: ""}
            }), initialValue]
        );
    }, [userMachines])

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleItemSelect = (id: string) => {
        if(id === "add") {
            setModalOpen(true)
        }
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

                        </ThemedView >
                        <ThemedView >
                            <ThemedText type="default" >Add, edit or delete your machines here.</ThemedText >
                        </ThemedView >
                    </ThemedView >
                }
                columnWrapperStyle={{gap: 16}}
                contentContainerStyle={{gap: 8}}
                data={machinesList}
                renderItem={({item}) => (
                    <CardView id={item.id} onPress={() => handleItemSelect(item.id)} >

                        {/*<Image*/}
                        {/*    source={item.img}*/}
                        {/*    style={styles.cardImage}*/}
                        {/*/>*/}
                        <ThemedText style={styles.cardText} type={'defaultSemiBold'}>{item.make}</ThemedText >

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
    cardImage: {
        flex: 1,
        width: 'auto',
        objectFit: 'contain',
    },
    cardText: {
        alignSelf: "center",
        color: colors.tertiary
    },
});
