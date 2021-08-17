import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, Pressable, Image, Dimensions, Alert } from 'react-native';
import RNSecureStore, {ACCESSIBLE} from "react-native-secure-store";
import RNLocation from 'react-native-location';
import auth from '@react-native-firebase/auth';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const LogIn = ({navigation}) => {

    const Widht = Dimensions.get('window').width - 40

    const [languaje, setLanguaje] = useState('English')

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English':
                setA('Log In with Google'); setB('Log In with Facebook'); setC('Log In with Email'); setD('Don’t have an acount?')
                setE('Sign Up')
                break;
            case 'Spanish':
                setA('Inicia Sesión con Google'); setB('Inicia Sesión con Facebook'); setC('Inicia Sesión con Email')
                setD('No tienes una cuenta?'); setE('Registrate')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ marginBottom: 25, width: 315, height: 145 }} source={require('../assets/chronos.png')}/>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 5,
                backgroundColor: colors.azulDeFondo,
                borderColor: colors.darkBlue,
                borderWidth: 1,
                width: Widht,
                height: 50,
            }}>
                <Image style={{ marginRight: 10, width: 25, height: 25 }} source={require('../assets/google.png')}/>
                <Text style={fonts.normalDark18}>{a}</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 5,
                backgroundColor: colors.azulDeFondo,
                borderColor: colors.darkBlue,
                borderWidth: 1,
                width: Widht,
                height: 50,
                marginTop: 15
            }}>
                <Image style={{ marginRight: 10, width: 25, height: 25 }} source={require('../assets/facebook.png')}/>
                <Text style={fonts.normalDark18}>{b}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('LogInEmail', {Email: '', Password: '', Username: undefined})}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 5,
                    backgroundColor: colors.azulDeFondo,
                    borderColor: colors.darkBlue,
                    borderWidth: 1,
                    width: Widht,
                    height: 50,
                    marginTop: 15
                }}>
                    <Image style={{ marginRight: 10, width: 25, height: 17.5 }} source={require('../assets/email.png')}/>
                    <Text style={fonts.normalDark18}>{c}</Text>
                </View>
            </Pressable>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={fonts.normalDark16}>{d} </Text>
                <Text onPress={() => navigation.navigate('SignUp')} style={{...fonts.normalDark16, textDecorationLine: 'underline'}}>{e}</Text>
            </View>
        </View>
    );
}

export default LogIn;