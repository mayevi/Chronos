import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Animated, ToastAndroid, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Security = ({route, navigation}) => {

    const { languaje } = route.params;

    const Widht = Dimensions.get('window').width - 50

    const [userID, setUserID] = useState('')

    useLayoutEffect(() => {
        const GetID = RNSecureStore.get("userID").then(res => { if (res !== null) {
            setData(res)
            setUserID(res)
        }}, err => console.log(err))

        return () => GetID
    }, [])

    const setData = (id) => {
        firestore().collection('Users').doc(id).onSnapshot(doc => {
            setEnablePasscode(doc.data().passcode)
            setEnableFingerprint(doc.data().fingerprint)
            setRequirePasscode(doc.data().requirePasscode)
        })
    }

    //Passcode
    const [enablePasscode, setEnablePasscode] = useState(false);

    const switchPasscode = () => {
        if (enablePasscode) navigation.navigate('Passcode', {state: 3, languaje: languaje})
        else navigation.navigate('Passcode', {state: 1, languaje: languaje})
    }

    //Fingerprint
    const [enableFingerprint, setEnableFingerprint] = useState(false);

    const switchFingerprint = () => {
        if (enableFingerprint) firestore().collection('Users').doc(userID).update({'fingerprint': false})
        else firestore().collection('Users').doc(userID).update({'fingerprint': true})
    }

    //Require Passcode
    const [RP, setRP] = useState(false);
    const [requirePasscode, setRequirePasscode] = useState('')

    const [requirePasscodeTraslated, setRequirePasscodeTraslated] = useState('')

    // useEffect(() => {
    //     switch (languaje) {
    //         case 'Spanish':
    //             switch (requirePasscode) {
    //                 case 'Inmediately': setRequirePasscodeTraslated('Inmediatamente')
    //                     break;
    //                 case 'After 10 seconds': setRequirePasscodeTraslated('10 segundos despues')
    //                     break;
    //                 case 'After 30 seconds': setRequirePasscodeTraslated('30 segundos despues')
    //                     break;
    //                 case 'After 1 minute': setRequirePasscodeTraslated('1 minuto despues')
    //                     break;
    //                 case 'After 5 minutes': setRequirePasscodeTraslated('5 minutos despues')
    //                     break;
    //             }
    //             break;
    //     }
    //     return () => languaje
    // }, )

    const changeRequirePasscode = (time) => {
        firestore().collection('Users').doc(userID).update({'requirePasscode': time})
        setRP(false);
    }

    useEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Passcode'); setB('Require Passcode'); setC('Change Passcode'); setD('Fingerprint')
            setE('Inmediately'); setF('After 10 seconds'); setG('After 30 seconds'); setH('After 1 minute')
            setI('After 5 minutes'); setJ('You do not have any passcode')
                break;
            case 'Spanish':
            setA('Contraseña'); setB('Requerir Contraseña'); setC('Cambiar Contraseña'); setD('Huella Dactilar')
            setE('Inmediatamente'); setF('10 segundos después'); setG('30 segundos después'); setH('1 minuto después')
            setI('5 minutos después'); setJ('No tienes ninguna contraseña')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState('')

    const fingerprint = useRef(new Animated.Value(5)).current;
    const passcode = useRef(new Animated.Value(5)).current;

    useEffect(() => {
        if (enableFingerprint) Animated.timing(fingerprint, { toValue: 35, duration: 500, useNativeDriver: false }).start()
        else Animated.timing(fingerprint, { toValue: 5, duration: 800, useNativeDriver: false }).start()
        if (enablePasscode) Animated.timing(passcode, { toValue: 35, duration: 500, useNativeDriver: false }).start()
        else Animated.timing(passcode, { toValue: 5, duration: 800, useNativeDriver: false }).start()
        
        return () => enablePasscode
    }, )

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo, position: 'relative', alignItems: 'center' }}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image
                    style={{ width: 22, height: 22, marginRight: Widht, marginTop: 25, opacity: 0.7 }}
                    source={require('../assets/left-arrow.png')}
                />
            </Pressable>
            {/* <Text>{JSON.stringify(enablePasscode)}</Text> */}
            <View style={{ width: Widht, marginTop: 80 }}>
                <View style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={fonts.normalDark18}>{a}</Text>
                    <Pressable onPress={switchPasscode}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            height: 30,
                            width: 60,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: enablePasscode ? colors.otroBlue : colors.grayBlue
                        }}>
                            <Animated.View style={{
                                backgroundColor: enablePasscode ? colors.otroBlue : colors.grayBlue,
                                marginLeft: passcode,
                                height: 20,
                                width: 20,
                                borderRadius: 12.5,
                            }}/>
                        </View>
                    </Pressable>
                </View>
                {/* <View style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={fonts.normalDark18}>{b}</Text>
                    <Pressable onPress={() => setRP(true)}>
                        <Text style={fonts.normalGray13}>{requirePasscodeTraslated}</Text>
                    </Pressable>
                </View> */}
                <Text onPress={() => {
                    if (enablePasscode) navigation.navigate('Passcode', {state: 4, languaje: languaje})
                    else ToastAndroid.show(j, ToastAndroid.SHORT)
                }}
                    style={{...fonts.normalDark18, marginBottom: 25}}
                >{c}</Text>
                {/* <View style={{ marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('SettingsSelect')}>
                        <Text style={fonts.normalDark18}>{d}</Text>
                    </Pressable>
                    <Pressable onPress={switchFingerprint}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            height: 30,
                            width: 60,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: enableFingerprint ? colors.otroBlue : colors.grayBlue
                        }}>
                            <Animated.View style={{
                                backgroundColor: enableFingerprint ? colors.otroBlue : colors.grayBlue,
                                marginLeft: fingerprint,
                                height: 20,
                                width: 20,
                                borderRadius: 12.5,
                            }}></Animated.View>
                        </View>
                    </Pressable>
                </View> */}
            </View>
            {/* <Modal //Require Passcode
                style={{margin: 0, position: 'absolute', bottom: 0, width: '100%', backgroundColor: colors.white}}
                isVisible={RP}
                onBackdropPress={() => setRP(false)}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                animationInTiming={50}
                animationOutTiming={160}
            >
                <View style={{margin: 30}}>
                    <Pressable onPress={() => changeRequirePasscode(0)}>
                        <Text style={fonts.normalDark18X}>{e}</Text>
                    </Pressable>
                    <Pressable onPress={() => changeRequirePasscode(10000)}>
                        <Text style={fonts.normalDark18X}>{f}</Text>
                    </Pressable>
                    <Pressable onPress={() => changeRequirePasscode(30000)}>
                        <Text style={fonts.normalDark18X}>{g}</Text>
                    </Pressable>
                    <Pressable onPress={() => changeRequirePasscode(60000)}>
                        <Text style={fonts.normalDark18X}>{h}</Text>
                    </Pressable>
                    <Pressable onPress={() => changeRequirePasscode(300000)}>
                        <Text style={fonts.normalDark18X}>{i}</Text>
                    </Pressable>
                </View>
            </Modal> */}
        </View>
    );
}

export default Security;