import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import React from "react";

type SectionHeaderProps = {
    title: string;
    viewAll?: () => void;
    leftAlign?: boolean;
}

export function SectionHeader({title, viewAll, leftAlign}: SectionHeaderProps) {
    return (
        <View style={viewAll || leftAlign ? styles.header : styles.headerSingle}>
            <ThemedText type={'title'}>
                {title}
            </ThemedText>

            {viewAll &&
                <TouchableOpacity>
                    <ThemedText style={styles.viewAll} type={'title'} onPress={viewAll}>
                        VIEW ALL
                    </ThemedText>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerSingle: {
      alignItems: 'center',
        justifyContent: 'center',
    },
    viewAll: {
        fontSize: 12,
        opacity: 0.7,
        letterSpacing: 1,
    },
});