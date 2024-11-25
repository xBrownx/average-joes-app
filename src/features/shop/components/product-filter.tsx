import { StyleSheet, Text, View } from "react-native";
import { Product } from "shopify-buy";
import { ThemedText } from "@/components/text";
import { useState } from "react";
import { themedColors } from "@/constants";
import { Dropdown } from "react-native-element-dropdown";

type ProductFilterProps = {
    products: Product[]
}

const FILTERS = [
    {label: 'Featured', value: 'featured'},
    {label: 'Best Selling', value: 'Best Selling'},
    {label: 'Alphabetically, A-Z', value: 'Alphabetically, A-Z'},
    {label: 'Alphabetically, Z-A', value: 'Alphabetically, Z-A'},
    {label: 'Price, low to high', value: 'Price, low to high'},
    {label: 'Price, high to low', value: 'Price, high to low'},
    {label: 'Date, old to new', value: 'Date, old to new'},
    {label: 'Date, new to old', value: 'Date, new to old'},
]

export function ProductFilter({products}: ProductFilterProps) {
    const [selectedFilter, setSelectedFilter] = useState<string>('Featured')
    const [open, setOpen] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <ThemedText type={'subtitle'}>{products.length} products</ThemedText>
            <View style={styles.filterContainer}>
                <Dropdown
                    style={styles.filter}
                    placeholder={''}
                    data={FILTERS}
                    value={selectedFilter}
                    onChange={(value => setSelectedFilter(value.label))}
                    labelField={"label"}
                    valueField={"label"}
                    fontFamily={'Poppins, sans-serif'}
                    itemTextStyle={{color: 'black'}}
                    selectedTextStyle={{color: themedColors.tertiary, fontWeight: 'bold'}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterContainer: {
        borderWidth: 1.5,
        borderColor: '#00000099',
        flex: 0.7,
        height: 40,
        overflow: 'hidden'
    },
    filter: {
        backgroundColor: '#FFF',
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: themedColors.tertiary,
        fontWeight: 'bold'
    }
})