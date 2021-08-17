import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, Linking, ToastAndroid, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import RNSecureStore, {ACCESSIBLE} from "react-native-secure-store";
import moment from '../../node_modules/moment';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const SignUpEmail = ({navigation}) => {

    const Widht = Dimensions.get('window').width - 40

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const userData = {
        languaje: 'English',
        fusions: 0,
        tutorial: [true, true],
        premium: false,
        passcode: false,
        fingerprint: false,
        passcodeNumbers: [],
        requirePasscode: 0,
        textSettings: ['', '', 3, 1],
        userDate: firestore.FieldValue.serverTimestamp(moment().format('LLLL'))
    };

    const authentication = () => {
        if (username.length == 0) ToastAndroid.show(j, ToastAndroid.SHORT)
        else if (username.length < 3) ToastAndroid.show(k, ToastAndroid.SHORT)
        else if (email.length == 0) ToastAndroid.show(l, ToastAndroid.SHORT)
        else if (password.length == 0) ToastAndroid.show(m, ToastAndroid.SHORT)
        else if (password.length <= 5) ToastAndroid.show(n, ToastAndroid.SHORT)
        // else if (!passwordFormat) ToastAndroid.Contraseña que escribiste tiene un formato incorrecto', ToastAndroid.SHORT)
        else {
            setLoading(true)
            auth().createUserWithEmailAndPassword(email, password).then(res => {
                const uid = res.user.uid
                firestore().collection('Users').doc(uid).set(userData)
                RNSecureStore.set('userID', uid, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            }).then(() => {
                setLoading(false)
                navigation.navigate('LogInEmail', {Email: email, Password: password, Username: username})
            }).catch(err => {
                setLoading(false)
                ToastAndroid.show(err, ToastAndroid.SHORT)
            })
        }
    }

    const [passwordVisivility, setPasswordVisivility] = useState(false)
    const [visivility, setVisivility] = useState('Show')

    useEffect(() => {
        if (passwordVisivility) setVisivility(e)
        else setVisivility(d)
    }, )

    const [passwordFormat, setPasswordFormat] = useState(false)

    // useEffect(() => {
    //     if (password.length >= 6) setCheckMinimun(true)
    //     else setCheckMinimun(false)
    //     if (password.includes(0)) setCheckNumber(true)
    //     if (password.includes(number)) setCheckNumber(true)
    //     else setCheckNumber(false)
    //     if (password.includes('a')) setCheckLetter(true)
    //     else setCheckLetter(false)
    //     if (checkLetter && checkNumber) {
    //         if (checkMinimun) setPasswordFormat(true)
    //     }
    // }, )

    const [checkLetter, setCheckLetter] = useState(false)
    const [checkNumber, setCheckNumber] = useState(false)
    const [checkMinimun, setCheckMinimun] = useState(false)

    const [languaje, setLanguaje] = useState('English')

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English':
                setA('Email'); setB('Username'); setC('Password'); setD('Show'); setE('Hide')
                setF('The password must be at least 6 characters'); setG('Sign Up'); setH('By signing up, you agree to our')
                setI('Privacy Policy.')
                setJ('You have not entered a username'); setK('Your username must be at least 3 characters long')
                setL('You have not entered a email'); setM('You have not entered a password')
                setN('Your password has a wrong format')
                setO('There is already an account with this email or the format of the data you entered is invalid')
                setP('It was not possible to authenticate this user')
                break;
            case 'Spanish':
                setA('Correo electrónico'); setB('Nombre de usuario'); setC('Contraseña'); setD('Mostrar'); setE('Ocultar')
                setF('La contraseña debe tener al menos 6 caracteres'); setG('Registrarse')
                setH('Al registrarte, estas de acuerdo con nuestra'); setI('Política de Privacidad')
                setJ('No has escrito un nombre de usuario'); setK('Tu nombre de usuario debe tener al menos 3 caracteres')
                setL('No has escrito un correo electronico'); setM('No has escrito una contraseña')
                setN('Tu contraseña tiene un formato incorrecto')
                setO('Ya existe una cuenta con este correo o el formato de los datos que ingresaste es invalido')
                setP('No fue posible autenticar este asuario')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')
    const [m, setM] = useState(''); const [n, setN] = useState(''); const [o, setO] = useState(''); const [p, setP] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{
                    height: 50,
                    width: Widht,
                    backgroundColor: colors.azulDeFondo,
                    borderColor: colors.darkBlue,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    marginTop: 20,
                    padding: 15
                }}
                placeholder={a}
                placeholderTextColor={colors.grayBlue}
                onChangeText={text => setEmail(text)}
                value={email}
                autoCompleteType={'email'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                selectionColor={colors.grayBlue}
            />
            <TextInput
                style={{
                    height: 50,
                    width: Widht,
                    backgroundColor: colors.azulDeFondo,
                    borderColor: colors.darkBlue,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    marginTop: 10,
                    padding: 15
                }}
                placeholder={b}
                placeholderTextColor={colors.grayBlue}
                onChangeText={text => setUsername(text)}
                value={username}
                autoCompleteType={'username', 'name'}
                autoCapitalize={'words'}
                autoCorrect={false}
                maxLength={18}
                selectionColor={colors.grayBlue}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <TextInput
                    style={{
                        height: 50,
                        width: Widht - 65,
                        backgroundColor: colors.azulDeFondo,
                        borderColor: colors.darkBlue,
                        borderWidth: 0.5,
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                        padding: 15
                    }}
                    placeholder={c}
                    placeholderTextColor={colors.grayBlue}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    autoCompleteType={'password'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    maxLength={45}
                    secureTextEntry
                    keyboardType={passwordVisivility ? 'visible-password' : 'default'}
                    selectionColor={colors.grayBlue}
                />
                <Pressable onPress={() => setPasswordVisivility(state => !state)}>
                    <View style={{
                        height: 50,
                        width: 65,
                        backgroundColor: colors.azulPerla,
                        borderBottomRightRadius: 5,
                        borderTopRightRadius: 5,
                        borderWidth: 0.5,
                        borderLeftWidth: 0,
                        borderColor: colors.darkBlue,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: colors.otroBlue}}>{visivility}</Text>
                    </View>
                </Pressable>
            </View>
            <Text style={{...fonts.normalDark12, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10}}>{f}</Text>
            {/* <Text style={{...fonts.normalDark12, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10}}
            >Tu contraseña debe tener al menos: </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 20}}>
                <Image source={require('../assets/small-check.png')} style={{height: 15, width: 15, tintColor: checkLetter ? '#75cfb8' : colors.darkBlue}}/>
                <Text style={{fontSize: 12, color: checkLetter ? '#75cfb8' : colors.darkBlue, alignSelf: 'flex-start', marginLeft: 5, marginVertical: 2}}>Una letra (mayuscula o minuscula)</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 20}}>
                <Image source={require('../assets/small-check.png')} style={{height: 15, width: 15, tintColor: checkNumber ? '#75cfb8' : colors.darkBlue}}/>
                <Text style={{fontSize: 12, color: checkNumber ? '#75cfb8' : colors.darkBlue, alignSelf: 'flex-start', marginLeft: 5, marginVertical: 2}}>Un numero o caracter especial</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 20}}>
                <Image source={require('../assets/small-check.png')} style={{height: 15, width: 15, tintColor: checkMinimun ? '#75cfb8' : colors.darkBlue}}/>
                <Text style={{fontSize: 12, color: checkMinimun ? '#75cfb8' : colors.darkBlue, alignSelf: 'flex-start', marginLeft: 5, marginVertical: 2}}>Minimo seis caracteres</Text>
            </View> */}
            <Pressable onPress={authentication}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: colors.darkBlue,
                    width: Widht,
                    height: 50,
                    marginTop: 20
                }}>
                    <ActivityIndicator style={{opacity: loading ? 1 : 0, position: 'absolute'}} color={colors.white}/>
                    <Text style={{...fonts.normalWhite18, opacity: loading ? 0 : 1}}>{g}</Text>
                </View>
            </Pressable>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{...fonts.normalDark12, marginTop: 20}}>{h} </Text>
                <Text onPress={() => Linking.openURL("https://sites.google.com/view/privacy-policy-chronos/privacy-policy")}
                    style={fonts.underlineNormalDark12}
                >{i}</Text>
            </View>
            {/* <Text style={{...fonts.normalDark12, marginTop: 20}}>By signing up, you agree to our </Text> */}
            {/* <View style={{ flexDirection: 'row' }}> */}
                {/* <Text
                    onPress={() => Linking.openURL("https://sites.google.com/view/chronos-terms-and-conditions/p%C3%A1gina-principal")}
                    style={fonts.underlineNormalDark12}
                >Terms of use</Text>
                <Text style={fonts.normalDark12}> and </Text> */}
                {/* <Text
                    onPress={() => Linking.openURL("https://sites.google.com/view/privacy-policy-chronos/privacy-policy")}
                    style={fonts.underlineNormalDark12}
                >Privacy Policy.</Text> */}
            {/* </View> */}
        </View>
    );
}

export default SignUpEmail;