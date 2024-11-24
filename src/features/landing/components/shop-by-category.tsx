import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import React from "react";
import { SectionHeader } from "@/features/landing/components/section-header";
import { themedColors } from "@/constants";
import { AutoScaledImage } from "@/components/image";


const categories = [
    {
        imgSrc: require("@/assets/images/cat_coffee.png"),
        name: 'Coffee',
    },
    {
        imgSrc: require("@/assets/images/cat_accessories.png"),
        name: 'Accessories',
    },
    {
        imgSrc: require("@/assets/images/cat_home_machines.png"),
        name: 'Home Machines',
    },
    {
        imgSrc: require("@/assets/images/cat_commercial_machines.png"),
        name: 'Commercial Machines',
    },
]

export function ShopByCategory() {
    return (
        <View style={styles.container}>
            <SectionHeader
                title="SHOP BY CATEGORY"
            />
            <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                    <View style={styles.category} key={category.name}>
                        <TouchableOpacity>
                            <AutoScaledImage
                                source={category.imgSrc}
                                widthPercent={'100%'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.catText}>
                            {category.name}
                        </Text>
                    </View>
                ))}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
    },
    categoriesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 16,
        width: '100%',
        justifyContent: 'space-between',
    },
    category: {
        width: '47.5%',
        marginBottom: 16,
        height: "auto",
        justifyContent: 'center',
        gap: 16,
    },
    catText: {
        color: themedColors.tertiary,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Poppins",
        textAlign: 'center'
    }
});

