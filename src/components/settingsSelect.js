import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, Image, Linking, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import Modal from 'react-native-modal';
import fonts from '../resources/fonts'
import colors from '../resources/colors'
import AuthContext from '../resources/context'

const SettingsSelect = ({route, navigation, navigation: { setParams } }) => {

    const { languaje, textSettings } = route.params;
    const [user, setUser] = useContext(AuthContext)

    const [Languaje, setLanguaje] = useState(languaje)
    const [isModalVisible, setModalVisible] = useState(false);

    const [userID, setUserID] = useState('')
    const Auth = auth().currentUser

    useEffect(() => {
        RNSecureStore.get("userID").then(res => {
            if (res !== null) {
                setData(res)
                setUserID(res)
            } else if (res == null | Auth == null) {
                setUser(false)
            }
        }, err => console.log(err))
    }, )

    const LogOut = () => {
        RNSecureStore.get("userID").then(res => {
            if (res == null | Auth == null) setUser(false)
        }, err => console.log(err))
    }

    const showTutorial = () => {
        firestore().collection('Users').doc(userID).update({'tutorial': [true, true]})
        navigation.goBack()
    }

    const setData = (id) => {
        firestore().collection('Users').doc(id).onSnapshot(doc => setLanguaje(doc.data().languaje))
    }

    const setEnglish = () => {
        firestore().collection('Users').doc(userID).update({'languaje': 'English'})
        setParams({languaje: 'English'})
        setModalVisible(false)
    }
    const setSpanish = () => {
        firestore().collection('Users').doc(userID).update({'languaje': 'Spanish'})
        setParams({languaje: 'Spanish'})
        setModalVisible(false)
    }

    const [tutorial, setTutorial] = useState(false)

    useEffect(() => {
        switch (Languaje) {
            case 'English':
            setA('Premium'); setB('Font Styles'); setC('Security'); setD('Languaje'); setE('Rate App')
            setF('Send Feedback'); setG('Log Out'); setH('English'); setI('Spanish'); setJ('Tutorial is visible again')
                break;
            case 'Spanish':
            setA('Premium'); setB('Estilos de fuente'); setC('Seguridad'); setD('Idioma'); setE('Calificar App')
            setF('Enviar Feedback'); setG('Cerrar Sesión'); setH('Inglés'); setI('Español'); setJ('El tutorial es visible de nuevo')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState('');

        return (
            <View style={{ flex: 1, backgroundColor: colors.azulDeFondo, position: 'relative' }}>
                <Pressable onPress={tutorial ? showTutorial : () => navigation.goBack()}>
                    <Image
                        style={{ width: 20, height: 20, marginRight: 25, marginTop: 25, alignSelf: "flex-end", opacity: 0.7 }}
                        source={require('../assets/x.png')}
                    />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Text onPress={() => navigation.navigate('Premium', {languaje: languaje})} style={fonts.normalDark18X}>{a}</Text>
                    <Text onPress={() => navigation.navigate('StyleSelect', {languaje: languaje, textSettings: textSettings})}
                        style={fonts.normalDark18X}
                    >{b}</Text> */}
                    <Text onPress={() => navigation.navigate('Security', {languaje: languaje})} style={fonts.normalDark18X}>{c}</Text>
                    <Text onPress={() => setModalVisible(!isModalVisible)} style={fonts.normalDark18X}>{d}</Text>
                    <Text
                        onPress={() => {setTutorial(true); ToastAndroid.show(j, ToastAndroid.SHORT)}}
                        style={fonts.normalDark18X}
                    >Tutorial</Text>
                    {/* <Text onPress={() => Linking.openURL("market://search?q=angry_birds_pop")} style={fonts.normalDark18X}>{e}</Text> */}
                    <Text onPress={() => Linking.openURL("mailto: chronos.app7@gmail.com")} style={fonts.normalDark18X}>{f}</Text>
                    <Text onPress={() => RNSecureStore.remove('userID').then(() => auth().signOut().then(LogOut))} style={fonts.normalDark18X}>{g}</Text>
                    <Modal
                        style={{margin: 0, position: 'absolute', bottom: 0, width: '100%', backgroundColor: colors.white}}
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}
                        hideModalContentWhileAnimating={true}
                        backdropTransitionOutTiming={0}
                        animationInTiming={80}
                        animationOutTiming={160}
                    >
                        <View style={{margin: 30}}>
                            <Text onPress={setEnglish} style={fonts.normalDark18X}>{h}</Text>
                            <Text onPress={setSpanish} style={fonts.normalDark18X}>{i}</Text>
                        </View>
                    </Modal>
                </View>
            </View>
        );
}

export default SettingsSelect;