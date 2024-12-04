import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ArrowLeft from '@/assets/svg/arrow-left.svg'
import ArrowRight from '@/assets/svg/arrow-right.svg'
import Machine from '@/assets/svg/machine-overlay.svg'
import TakePhoto from '@/assets/svg/CAMERA ICON.svg'

export function MachineCameraOverlay() {
    return (
        <View style={styles.container}>
            <View style={[styles.svg, styles.arrowLeft]}>
                <TouchableOpacity>
                    <ArrowLeft />
                </TouchableOpacity>
            </View>
            <View style={[styles.svg, styles.arrowRight]}>
                <TouchableOpacity>
                    <ArrowRight />
                </TouchableOpacity>
            </View>
            <View style={[styles.svg, styles.machine]}>
                <Machine />
            </View>
            <View style={[styles.svg, styles.takePhoto]}>
                <TouchableOpacity>
                    <TakePhoto />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderWidth: 4,
        borderColor: '#FFF',
    },
    svg: {
        position: 'absolute',
    },
    arrowLeft: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 4,
    },
    arrowRight: {
        alignItems: 'flex-end',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        paddingRight: 4,
    },
    machine: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    takePhoto: {
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 12,
    },

});