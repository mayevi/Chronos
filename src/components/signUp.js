import React, {useState, useLayoutEffect} from 'react';
import { View, Text, Pressable, Image, Linking, ToastAndroid, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import RNSecureStore, {ACCESSIBLE} from "react-native-secure-store";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

GoogleSignin.configure({ webClientId: '108173530653-q8fhe0gg6nk97vbkgrs8u9ajoeduluoq.apps.googleusercontent.com' })

const SignUp = ({navigation}) => {

    const Widht = Dimensions.get('window').width - 40

    const onGoogleButtonPress = async() => {
        const { idToken } = await GoogleSignin.signIn() // Get the users ID token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken) // Create a Google credential with the token
        RNSecureStore.set('userID', googleCredential, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY}).then(res => {
            console.log(res)
            auth().currentUser.updateProfile({displayName: JSON.stringify(googleCredential)});
        }, err => ToastAndroid.show(err, ToastAndroid.SHORT))
        return auth().signInWithCredential(googleCredential) // Sign-in the user with the credential
    }

    const onFacebookButtonPress = async() => {
        // Attempt login with permissions
        // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        // if (result.isCancelled) ToastAndroid.show('User cancelled the login process', ToastAndroid.SHORT)
        // // Once signed in, get the users AccesToken
        // const data = await AccessToken.getCurrentAccessToken();
        // if (!data) ToastAndroid.show('Something went wrong obtaining access token', ToastAndroid.SHORT)
        // // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        // // Sign-in the user with the credential
        // RNSecureStore.set('userID', facebookCredential, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY}).then(res => {
        //     console.log(res)
        //     auth().currentUser.updateProfile({displayName: JSON.stringify(facebookCredential)});
        // }, err => ToastAndroid.show(err, ToastAndroid.SHORT))
        // return auth().signInWithCredential(facebookCredential);
    }

    const [languaje, setLanguaje] = useState('English')

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English':
                setA('Sign Up with Google'); setB('Sign Up with Facebook'); setC('Sign Up with Email'); setD('Have an acount?')
                setE('Log In'); setF('By signing up, you agree to our '); setG('Privacy Policy.'); setH('Log In with Email')
                break;
            case 'Spanish':
                setA('Registrate con Google'); setB('Registrate con Facebook'); setC('Registrate con Correo'); setD('Ya tienes una cuenta?')
                setE('Inicia Sesión'); setF('Al registrarte, estas de acuerdo con nuestra'); setG('Política de Privacidad'); setH('Iniciar Sesion con Correo')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ marginBottom: 25, width: 315, height: 145 }} source={require('../assets/chronos.png')}/>
            {/* <Pressable onPress={() => onGoogleButtonPress()}>
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
            </Pressable> */}
            {/* <Pressable onPress={() => onFacebookButtonPress()}>
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
            </Pressable> */}
            <Pressable onPress={() => navigation.navigate('SignUpEmail')}>
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
                    {/* <Image style={{ marginRight: 10, width: 26, height: 17.5 }} source={require('../assets/email.png')}/> */}
                    <Text style={fonts.normalDark18}>{c}</Text>
                </View>
            </Pressable>
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
                    marginTop: 15,
                    marginBottom: 50
                }}>
                    {/* <Image style={{ marginRight: 10, width: 26, height: 17.5 }} source={require('../assets/email.png')}/> */}
                    <Text style={fonts.normalDark18}>{h}</Text>
                </View>
            </Pressable>
            {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={fonts.normalDark16}>{d} </Text>
                <Text
                    onPress={() => navigation.navigate('LogIn')}
                    style={{...fonts.normalDark16, textDecorationLine: 'underline'}}
                >{e}</Text>
            </View> */}
            {/* <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{...fonts.normalDark12, marginTop: 20}}>{f}</Text>
                <Text
                    onPress={() => Linking.openURL("https://sites.google.com/view/privacy-policy-chronos/privacy-policy")}
                    style={fonts.underlineNormalDark12}
                >{g}</Text>
            </View> */}
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

export default SignUp;