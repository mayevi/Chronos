import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Passcode = ({route, navigation}) => {

    const { state, languaje } = route.params;

    const [s, setS] = useState(state)
    const [userID, setUserID] = useState('')

    useLayoutEffect(() => {
        RNSecureStore.get("userID").then(res => { if (res !== null) {
            setData(res)
            setUserID(res)
        }}, err => console.log(err))
    }, [])

    const setData = (id) => {
        firestore().collection('Users').doc(id).onSnapshot(doc => {
        setPasscode(doc.data().passcodeNumbers)
    })
    }

    const updatePasscode = (passcodeNumbers, passcode) => {
        firestore().collection('Users').doc(userID).update({'passcodeNumbers': passcodeNumbers, 'passcode': passcode})
    }

    const Delete = '<'

    const [redAlert, setRedAlert] = useState(false)
    const [passcode, setPasscode] = useState()
    const [title, setTitle] = useState(state)
    const [numbers, setNumbers] = useState([])
    const [pendingPasscode, setPendingPasscode] = useState([])

    const n = JSON.stringify(numbers)

    useEffect(() => {
        switch (s) {
            case 1:
                setTitle(a)
                if (numbers.length === 4) {
                    setPendingPasscode(JSON.stringify(numbers))
                    numbers.splice(0, 4)
                    setS(2)
                }
                break;
            case 2:
                setTitle(b)
                if (n === pendingPasscode && numbers.length === 4) {
                    updatePasscode(JSON.parse(pendingPasscode), true)
                    navigation.navigate('Security')
                } else if (n != pendingPasscode && numbers.length === 4) {
                    setPendingPasscode(null)
                    numbers.splice(0, 4)
                    setS(1)
                    setRedAlert(true)
                    setTimeout(() => { setRedAlert(false) }, 250);
                }
                break;
            case 3:
                setTitle(c)
                if (JSON.stringify(passcode) == JSON.stringify(numbers) && numbers.length === 4) {
                    updatePasscode([], false)
                    navigation.navigate('Security')
                }
                else if (JSON.stringify(passcode) !== JSON.stringify(numbers) && numbers.length === 4) {
                    numbers.splice(0, 4)
                    setRedAlert(true)
                    setTimeout(() => { setRedAlert(false) }, 250);
                }
                break;
            case 4:
                setTitle(c)
                if (JSON.stringify(passcode) == JSON.stringify(numbers) && numbers.length === 4) {
                    numbers.splice(0, 4)
                    setS(1)
                }
                break;
        }
        
        return () => s
    }, )

    useEffect(() => {
        switch (languaje) {
            case 'English': setA('Enter a new passcode'); setB('Verify your passcode'); setC('Enter your passcode')
                break;
            case 'Spanish': setA('Ingresa una nuevo pin'); setB('Verifica tu pin'); setC('Ingresa tu pin')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={fonts.normalDark15}>{title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, width: 110 }}>
                <View style={{
                    backgroundColor: numbers.length >= 1 ? colors.otroBlue : colors.grayBlue | redAlert ? '#FF4141' : colors.grayBlue,
                    height: 10, width: 10, borderRadius: 5, opacity: 0.7
                }}/>
                <View style={{
                    backgroundColor: numbers.length >= 2 ? colors.otroBlue : colors.grayBlue | redAlert ? '#FF4141' : colors.grayBlue,
                    height: 10, width: 10, borderRadius: 5, opacity: 0.7
                }}/>
                <View style={{
                    backgroundColor: numbers.length >= 3 ? colors.otroBlue : colors.grayBlue | redAlert ? '#FF4141' : colors.grayBlue,
                    height: 10, width: 10, borderRadius: 5, opacity: 0.7
                }}/>
                <View style={{
                    backgroundColor: numbers.length == 4 ? colors.otroBlue : colors.grayBlue | redAlert ? '#FF4141' : colors.grayBlue,
                    height: 10, width: 10, borderRadius: 5, opacity: 0.7
                }}/>
            </View>
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: 300,
                marginTop: 150,
                marginBottom: 30
            }}>
                <Pressable onPress={() => setNumbers([...numbers, 1])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>1</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 2])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>2</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 3])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>3</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 4])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>4</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 5])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>5</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 6])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>6</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 7])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>7</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 8])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>8</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setNumbers([...numbers, 9])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>9</Text>
                    </View>
                </Pressable>
                <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}></View>
                <Pressable onPress={() => setNumbers([...numbers, 0])}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>0</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => { numbers.pop(), setNumbers([...numbers]) }}>
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={fonts.normalDark20}>{Delete}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

export default Passcode;