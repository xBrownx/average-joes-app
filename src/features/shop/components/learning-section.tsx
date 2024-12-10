import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { AutoScaledImage } from "@/components/image";
import { THEME_COLOURS } from "@/constants";


export function LearningSection() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
            }}>
                <AutoScaledImage
                    source={require('@/assets/images/3_must_coffee_720x.png')}
                    widthPercent={'100%'}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
                <View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>AVERAGE JOE'S BLOG SERIES</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
                <View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>AVERAGE JOE'S LEARNING CENTER</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>NEED HELP DIALING IN YOUR ESPRESSO?</Text>
                <Text style={styles.paragraphText}>Send us a DM on Instagram with a video of your shot and we will give you some feedback for free!</Text>
                <Text style={styles.messageText}>MESSAGE US</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
        width: '100%',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ce2127',
        opacity: 0.8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        flex: 0,
        padding: 0,
        margin: 0,
        width: 'auto',
    },
    textContainer: {
        gap: 16
    },
    headingText: {
        color: THEME_COLOURS.tertiary,
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    paragraphText: {
        color: THEME_COLOURS.tertiary,
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: 'Poppins',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    messageText: {
        color: 'grey',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    }
})