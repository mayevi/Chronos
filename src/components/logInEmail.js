import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, ToastAndroid, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import RNSecureStore, {ACCESSIBLE} from "react-native-secure-store";
import colors from '../resources/colors'
import fonts from '../resources/fonts'
import AuthContext from '../resources/context'

const LogInEmail = ({route, navigation}) => {

    const { Email, Password, Username } = route.params;

    const [user, setUser] = useContext(AuthContext)

    const Widht = Dimensions.get('window').width - 40

    const [email, setEmail] = useState(Email)
    const [password, setPassword] = useState(Password)

    const [loading, setLoading] = useState(false)

    const onLoginPress = () => {
        if (email.length == 0) ToastAndroid.show(g, ToastAndroid.SHORT)
        else if (password.length == 0) ToastAndroid.show(h, ToastAndroid.SHORT)
        else {
            setLoading(true)
            auth().signInWithEmailAndPassword(email, password).then(res => {
                const uid = res.user.uid
                RNSecureStore.set('userID', uid, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            }).then(() => {
                Auth.updateProfile({ displayName: Username }).then(() => GetToken())
            }).catch(() => {
                setLoading(false)
                ToastAndroid.show(i, ToastAndroid.LONG)
            })
        }
    }

    const Auth = auth().currentUser
    const GetToken = () => {
        RNSecureStore.get("userID").then(res => {
            if (res !== null && Auth !== null ) {
                setLoading(false)
                setUser(true)
            } else if (res == null | Auth == null) {
                setLoading(false)
                ToastAndroid.show(j, ToastAndroid.SHORT)
            }
        }, )
    }

    const [passwordVisivility, setPasswordVisivility] = useState(false)
    const [visivility, setVisivility] = useState(c)

    useEffect(() => {
        if (passwordVisivility) setVisivility(d)
        else setVisivility(c)
    }, )

    const [languaje, setLanguaje] = useState('English')

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Email'); setB('Password'); setC('Show'); setD('Hide'); setE('Log In'); setF('Forget your password?')
            setG('You have not entered an email'); setH('You have not entered a password');
            setI('There is no account with this email or the password you entered is incorrect')
            setJ('It was not possible to authenticate this user')
                break;
            case 'Spanish':
            setA('Correo electrónico'); setB('Contraseña'); setC('Mostrar'); setD('Ocultar'); setE('Iniciar Sesión')
            setF('Olvidaste tu Contraseña?'); setG('No has escrito un correo electronico'); setH('No has escrito una contraseña')
            setI('No existe una cuenta con este correo electronico o la contraseña que ingresaste es incorrecta')
            setJ('No fue posible autenticar este asuario')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')

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
                    placeholder={b}
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
                        borderBottomWidth: 0.5,
                        borderTopWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderColor: colors.darkBlue,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: colors.otroBlue}}>{visivility}</Text>
                    </View>
                </Pressable>
            </View>
            <Pressable onPress={onLoginPress}>
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
                    <Text style={{...fonts.normalWhite18, opacity: loading ? 0 : 1}}>{e}</Text>
                </View>
            </Pressable>
            <Text onPress={() => navigation.navigate('ChangePassword', { email: email })}
                style={{...fonts.normalDark15, marginTop: 30}}
            >{f}</Text>
        </View>
    );
}

export default LogInEmail;