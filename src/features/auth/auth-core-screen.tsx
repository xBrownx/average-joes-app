import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';import React, { useEffect } from 'react';import { AutoScaledImage } from '@/components/image';import { SafeAreaView } from 'react-native-safe-area-context';import { configGoogleSignIn } from '@/features/auth/sign-in-with-google';import { SignInMain } from "@/features/auth/sign-in-main";import { SignUp } from "@/features/auth/sign-up";import { SignInWithEmail } from "@/features/auth/sign-in-with-email";import { LayoutAnimationConfig } from "react-native-reanimated";export default function AuthCoreScreen() {    const [screen, setScreen] = React.useState<'main' | 'sign-in-with-email' | 'sign-up'>('main');    useEffect(() => {        configGoogleSignIn();    }, []);    return (        <SafeAreaView style={styles.container}>            <View style={styles.container}>                <View style={styles.header}>                    {screen !== 'main' ?                        <TouchableOpacity style={styles.backContainer} onPress={() => setScreen('main')}>                            <Text style={styles.navText}>                                BACK                            </Text>                        </TouchableOpacity>                        : <View></View>                    }                    <TouchableOpacity style={styles.skipContainer} onPress={() => {                    }}>                        <Text style={styles.navText}>                            SKIP                        </Text>                    </TouchableOpacity>                </View>                <View style={styles.imageContainer}>                    <AutoScaledImage source={require('@/assets/images/average_joe_logo_white.png')}                                     widthPercent={'100%'} />                </View>                <LayoutAnimationConfig skipEntering>                    {                        {                            'main': <SignInMain setScreen={setScreen} />,                            'sign-in-with-email': <SignInWithEmail setScreen={setScreen} />,                            'sign-up': <SignUp setScreen={setScreen} />,                        }[screen]                    }                </LayoutAnimationConfig>            </View>        </SafeAreaView>    );}const styles = StyleSheet.create({    container: {        backgroundColor: '#1A1313',        width: '100%',        height: '100%',        flexDirection: 'column',        gap: 16,    },    header: {        flexDirection: 'row',        width: '100%',        alignItems: 'flex-end',        padding: 16,        justifyContent: 'space-between',    },    backContainer: {},    skipContainer: {        alignSelf: 'flex-end',    },    navText: {        color: '#fff',        fontSize: 18,        fontFamily: 'Poppins_400Regular',    },    imageContainer: {        padding: 64,    },});// {/*<LayoutAnimationConfig skipEntering>*/}// {/*    {isSignUp*/}// {/*        ? <SignUp setSignIn={() => setSignUp(false)} />*/}// {/*        : <SignIn setSignUp={() => setSignUp(true)} />*/}// {/*    }*/}// {/*</LayoutAnimationConfig>*/}