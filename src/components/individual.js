import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, AppState, Dimensions, TextInput, Animated, Alert, ToastAndroid } from 'react-native';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
// import BackgroundTimer from 'react-native-background-timer';
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import moment from '../../node_modules/moment';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'
import 'moment/locale/es-us'
import 'moment/locale/en-gb'

const Individual = ({navigation}) => {

    const [userID, setUserID] = useState('')

    const Widht = Dimensions.get('window').width - 40
    const Height = Dimensions.get('window').height

    useLayoutEffect(() => {
        RNSecureStore.get("userID").then(res => { if (res !== null) {
            setData(res)
            setUserID(res)
        }}, err => console.log(err))
    }, [])
    
    const setData = (id) => {
        firestore().collection('Users').doc(id).onSnapshot(doc => {
            setUserDate(doc.data().userDate.toDate())
            setLanguaje(doc.data().languaje)
            setTextSettings(doc.data().textSettings)
            setTutorial(doc.data().tutorial)
            setPremium(doc.data().premium)
            setFusions(doc.data().fusions)
            setPasscode(doc.data().passcode)
            setPasscodeNumbers(doc.data().passcodeNumbers)
            setRequirePasscode(doc.data().requirePasscode)
        })
        firestore().collection('Chronicles').where('userID', '==', id).onSnapshot(doc => {
            const chronicles = [];
            doc.forEach(doc => chronicles.push({...doc.data(), key: doc.id }) )
            setChronicles(chronicles)
        });
    }

    const [chronicles, setChronicles] = useState([])
    const count = chronicles.length

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [emailVerification, setEmailVerification] = useState()
    const [textSettings, setTextSettings] = useState([])
    const [fusions, setFusions] = useState()
    const [UserDate, setUserDate] = useState()
    const [languaje, setLanguaje] = useState('')
    const [tutorial, setTutorial] = useState([])
    const [premium, setPremium] = useState()
    const [passcode, setPasscode] = useState()
    const [passcodeNumbers, setPasscodeNumbers] = useState([])
    const [requirePasscode, setRequirePasscode] = useState('')

    const [chronicleModal, setChronicleModal] = useState(false)
    const [chronicleID, setChronicleID] = useState('')
    const [chronicleTitle, setChronicleTitle] = useState('')
    const [aleatorySize, setAleatorySize] = useState(false)
    const [emotionIcons, setEmotionIcons] = useState(false)
    const [selectableHour, setSelectableHour] = useState(false)
    const [theme, setTheme] = useState('Trees')
    const [chronicleImage, setChronicleImage] = useState(null)
    const [palette, setPalette] = useState(['#fff', '#fff', '#fff', '#fff', 'Default'])

    const Delete = '<'

    const [numbers, setNumbers] = useState([])

    const [redAlert, setRedAlert] = useState(false)

    useEffect(() => {
        if (JSON.stringify(passcodeNumbers) == JSON.stringify(numbers) && numbers.length === 4) {
            setLocked(false)
        } else if (JSON.stringify(passcodeNumbers) !== JSON.stringify(numbers) && numbers.length === 4) {
            numbers.splice(0, 4)
            setRedAlert(true)
            setTimeout(() => { setRedAlert(false) }, 250);
        }
    }, )

    //Require Passcode
    // const appState = useRef(AppState.currentState);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [locked, setLocked] = useState(true)

    // useEffect(() => {
    //     AppState.addEventListener("change", Lock)
    //     return () => {
    //         AppState.removeEventListener("change", Lock);
    //     };
    //     }, []);
    //     const Lock = (nextAppState) => {
    //     if (appState.current == 'background' && JSON.stringify(passcode)) {
    //         const lock = setTimeout(() => {
    //             if (appState.current == 'active') {
    //                 clearTimeout(lock)
    //                 if (!locked) console.log('Time cleaned')
    //             } else {
    //                 setLocked(true)
    //                 if (locked) console.log('locked after', 0, 'seconds.')
    //             }
    //         }, 0);
    //     }
    //     appState.current = nextAppState;
    //     setAppStateVisible(appState.current);
    //     console.log("AppState", appState.current);
    // };

    const user = auth().currentUser;

    useEffect(() => {
        user.providerData.forEach(profile => {
            setImage(profile.photoURL)
            setUsername(profile.displayName)
            setEmail(profile.email)
            setEmailVerification(profile.emailVerified)
        })
    }, [])

    const updateProfile = () => {
        setEditable(false)
        user.updateEmail(email).catch(() => Alert.alert('Chronos', u))
        user.updateProfile({displayName: username, photoURL: image})
    }

    const [editable, setEditable] = useState(false)

    const GaleryPhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, res => {
            if (res.error) ToastAndroid.show(res.error, ToastAndroid.SHORT)
            else {
                setImage(res.uri)
                setProfilePhotoModal(false)
            }
        })
    }
    const CameraPhoto = () => {
        launchCamera({ mediaType: 'photo', cameraType: 'back', saveToPhotos: false, includeBase64: false }, res => {
            if (res.error) ToastAndroid.show(res.error, ToastAndroid.SHORT)
            else {
                setImage(res.uri)
                setProfilePhotoModal(false)
            }
        })
    }

    const [image, setImage] = useState(null)
    const [profilePhotoModal, setProfilePhotoModal] = useState(false)

    const DeleteAllDocuments = async() => {
        const Pages = await firestore().collection('Pages').where('userID', '==', userID).get()
        Pages.forEach(doc => batch.delete(doc.ref))

        const Chronicles = await firestore().collection('Chronicles').where('userID', '==', userID).get()
        Chronicles.forEach(doc => batch.delete(doc.ref))

        const Fusions = await firestore().collection('Fusions').where('userID', '==', userID).get()
        Fusions.forEach(doc => batch.delete(doc.ref))

        return batch.commit();
    }

    const batch = firestore().batch()

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English':
                moment.locale('en-gb')
                setA('Chronicles'); setB('Pages'); setC('Enter your passcode'); setD('You have not added any Chronicle yet');
                setE('Fusions'); setF('Shared'); setG('Username'); setH('Email'); setI('User since'); setJ('Verify email')
                setK('Save'); setL('Edit info'); setM('Delete account'); setN('Profile photo'); setO('Choose image from galery')
                setP('Take a photo from camera'); setQ('Cancel'); setR('Edit'); setS('Delete')
                setT('At the moment it is not possible to have more than two Chronicles per user, the only way is to have the premium version that will be available soon.')
                setU('To update your email, you must have recently logged in.')
                setV('This section is under development, it is still not possible to access'); setW('Delete')
                setX('To delete your user, you must have recently logged in.')
                setY('Are you sure you want to delete your account? This action is permanent.')
                setZ('Long press on the header to display your user information');
                break;
            case 'Spanish':
                moment.locale('es-us')
                setA('Crónicas'); setB('Paginas'); setC('Ingresa tu Pin'); setD('Todavía no has agregado ninguna Chrónica');
                setE('Fusiones'); setF('Social'); setG('Nombre de usuario'); setH('Correo electrónico'); setI('Usuario desde')
                setJ('Verificar email'); setK('Guardar'); setL('Editar datos'); setM('Eliminar cuenta'); setN('Foto de perfil')
                setO('Escoger imagen de la galeria'); setP('Tomar foto desde cámara'); setQ('Cancelar'); setR('Editar'); setS('Eliminar')
                setT('Por el momento no es posible tener más de dos Chrónicas por usuario, la única forma es teniendo la versión premium que estará disponible próximamente.')
                setU('Para actualizar tu correo, es necesario que hayas iniciado sesión recientemente.')
                setV('Esta sección esta en desarrollo, todavía no es posible acceder'); setW('Eliminar')
                setX('Para eliminar tu usuario, es necesario que hayas iniciado sesión recientemente.')
                setY('Estas seguro de que quieres borrar tu cuenta?, esta acción es permanente.');
                setZ('Mantenga presionado el encabezado para desplegar su informacion de usuario');
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')
    const [m, setM] = useState(''); const [n, setN] = useState(''); const [o, setO] = useState(''); const [p, setP] = useState('')
    const [q, setQ] = useState(''); const [r, setR] = useState(''); const [s, setS] = useState(''); const [t, setT] = useState('')
    const [u, setU] = useState(''); const [v, setV] = useState(''); const [w, setW] = useState(''); const [x, setX] = useState('')
    const [y, setY] = useState(''); const [z, setZ] = useState(''); 

    const Profile = useRef(new Animated.Value(115)).current;
    const opacity1000 = useRef(new Animated.Value(0)).current;
    const opacity2000 = useRef(new Animated.Value(0)).current;
    const profileOpacity = useRef(new Animated.Value(1)).current;
    const profileHeight = useRef(new Animated.Value(65)).current;
    const margin = useRef(new Animated.Value(0)).current;
    const marginTop = useRef(new Animated.Value(25)).current;
    const defaultImageOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        switch (tutorial[0]) {
            case true:
            setTimeout(() => setTutorialModal(true), 1000)
                break;
            case false:
            setTimeout(() => setTutorialModal(false), 1000)
                break;
        }
    }, )

    const [tutorialModal, setTutorialModal] = useState(false)

    if (passcode && locked) {
        return(
        <View style={{ flex: 1, backgroundColor: colors.white, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={fonts.normalDark15}>{c}</Text>
            {/* <Text style={fonts.normalDark15}>numbers: {JSON.stringify(numbers)}</Text> */}
            <Text style={fonts.normalDark15}>{locked}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, width: 110 }}>
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
                    <View style={{height: 80, width: 90, justifyContent: 'center', alignItems: 'center', opacity: 0.7}}>
                        <Text style={fonts.normalDark20}>{Delete}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
        )
    } else {
        return (
            <View style={{flex: 1, backgroundColor: colors.white }}>
                <Animated.View style={{ height: Profile, backgroundColor: colors.otroBlue, flexDirection: 'column', alignItems: 'center' }}>
                    <Animated.View style={{flexDirection: 'row', marginTop: marginTop}}>
                        <Animated.View style={{height: margin, width: margin}}/>
                        <TouchableOpacity
                            style={{justifyContent: 'center', alignItems: 'center', marginLeft: 25}}
                            onPress={editable ? () => GaleryPhoto() : null}
                            onLongPress={() => {
                                Animated.timing(Profile, { toValue: Height, duration: 1000, useNativeDriver: false }).start()
                                Animated.timing(opacity1000, { toValue: 1, duration: 1000, useNativeDriver: false }).start()
                                Animated.timing(opacity2000, { toValue: 1, duration: 2000, useNativeDriver: false }).start()
                                Animated.timing(profileOpacity, { toValue: 0, duration: 0, useNativeDriver: false }).start()
                                Animated.timing(profileHeight, { toValue: 100, duration: 800, useNativeDriver: false }).start()
                                Animated.timing(margin, { toValue: 40, duration: 800, useNativeDriver: false }).start()
                                Animated.timing(marginTop, { toValue: 30, duration: 800, useNativeDriver: false }).start()
                            }}
                        >
                            <Animated.Image
                                source={require('../assets/default-profile.jpg')}
                                style={{
                                    position: 'absolute',
                                    height: profileHeight,
                                    width: profileHeight,
                                    borderRadius: 5,
                                    opacity: defaultImageOpacity,
                                }}
                            />
                            <Animated.Image
                                source={{uri: image}}
                                style={{ height: profileHeight, width: profileHeight, borderRadius: 5, opacity: editable ? 0.5 : 1 }}
                            />
                            <Animated.Image
                                source={require('../assets/edit.png')}
                                style={{position: 'absolute', height: 45, width: 45, opacity: editable ? 1 : 0, tintColor: colors.white}}
                            />
                        </TouchableOpacity>
                        <Pressable style={{width: Widht / 1.6}} onLongPress={() => {
                            Animated.timing(Profile, { toValue: Height, duration: 1000, useNativeDriver: false }).start()
                            Animated.timing(opacity1000, { toValue: 1, duration: 1000, useNativeDriver: false }).start()
                            Animated.timing(opacity2000, { toValue: 1, duration: 2000, useNativeDriver: false }).start()
                            Animated.timing(profileOpacity, { toValue: 0, duration: 0, useNativeDriver: false }).start()
                            Animated.timing(profileHeight, { toValue: 100, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(margin, { toValue: 40, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(marginTop, { toValue: 30, duration: 800, useNativeDriver: false }).start()
                        }}>
                            <Animated.View style={{
                                justifyContent: 'space-around',
                                flexDirection: 'column',
                                opacity: profileOpacity,
                                marginLeft: 10,
                                height: 65
                            }}>
                                <Text style={{...fonts.normalWhite22, height: 28}}>{username}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: colors.darkBlue,
                                        paddingHorizontal: 8,
                                        borderRadius: 5,
                                        marginRight: 2.5
                                    }}><Text style={fonts.normalWhite12}>{count}</Text>
                                    </View>
                                    <Text style={fonts.normalWhite12}>{a}</Text>
                                </View>
                            </Animated.View>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('SettingsSelect', {languaje: languaje, textSettings: textSettings})}>
                            <Animated.Image
                                style={{ marginHorizontal: 25, width: 22, height: 22, alignSelf: 'flex-start', opacity: profileOpacity }}
                                source={require('../assets/bar-menu.png')}
                            />
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={{ height: Height - 330, justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 25, opacity: opacity1000}}>
                        <View style={{flexDirection: 'row', height: 16, marginTop: 20, marginBottom: 10}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 16,
                                backgroundColor: colors.darkBlue,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                marginRight: 2.5
                            }}><Text style={fonts.normalWhite12}>{count}</Text>
                            </View>
                            <Text style={{...fonts.normalWhite12, marginRight: 15}}>{a}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 16,
                                backgroundColor: colors.darkBlue,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                marginRight: 2.5
                            }}><Text style={fonts.normalWhite12}>{fusions}</Text>
                            </View>
                            <Text style={{...fonts.normalWhite12, marginRight: 15}}>{e}</Text>
                            {/* <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 16,
                                backgroundColor: colors.darkBlue,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                marginRight: 2.5
                            }}><Text style={fonts.normalWhite12}>2</Text>
                            </View>
                            <Text style={fonts.normalWhite12}>{f}</Text> */}
                        </View>
                        <View>
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{g}</Text>
                            <TextInput
                                style={{...fonts.normalWhite16, padding: 0, marginBottom: 7}}
                                placeholder='_'
                                placeholderTextColor={colors.white}
                                onChangeText={text => setUsername(text)}
                                value={username}
                                autoCompleteType={'username', 'name'}
                                autoCapitalize={'words'}
                                autoCorrect={false}
                                maxLength={18}
                                selectionColor={colors.grayBlue}
                                editable={editable}
                            />
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{h}</Text>
                            <TextInput
                                style={{...fonts.normalWhite16, padding: 0, marginBottom: 7}}
                                placeholder='_'
                                placeholderTextColor={colors.white}
                                onChangeText={text => setEmail(text)}
                                value={email}
                                autoCompleteType={'email'}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                selectionColor={colors.grayBlue}
                                editable={editable}
                            />
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{i}</Text>
                            <Text style={{...fonts.normalWhite16, marginBottom: 7}}>{moment(UserDate).format('LL')}</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={{ flexDirection: 'column', alignSelf: 'center', alignItems: 'center', height: 160, opacity: opacity2000 }}>
                        <TouchableOpacity onPress={() => user.sendEmailVerification()}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.grayBlue,
                                borderRadius: 5,
                                height: 50,
                                width: Widht - 15,
                                opacity: emailVerification ? 0 : 0.8,
                            }}>
                                <Text style={fonts.normalWhite18}>{j}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text onPress={() => {
                            if (editable) {
                                updateProfile()
                                Animated.timing(defaultImageOpacity, { toValue: 1, duration: 0, useNativeDriver: false }).start()
                            } else {
                                setEditable(true)
                                if (image == null) Animated.timing(defaultImageOpacity, { toValue: 0.5, duration: 800, useNativeDriver: false }).start()
                                else Animated.timing(defaultImageOpacity, { toValue: 0, duration: 0, useNativeDriver: false }).start()
                            }
                        }}
                            style={{...fonts.normalWhite14, marginVertical: 5, marginTop: 20}}
                        >{editable ? k : l}</Text>
                        <Text onPress={() => Alert.alert('Chronos', y, 
                            [
                                {text: q, style: "cancel"},
                                {text: m, onPress: () => {
                                    DeleteAllDocuments()
                                    user.delete()
                                        .then(() => firestore().collection('Users').doc(userID).delete())
                                        .catch(() => Alert.alert('Chronos', x))
                                }}
                            ]
                        )}
                            style={{...fonts.normalWhite14, marginVertical: 5}}
                        >{m}</Text>
                        <Pressable onPress={() => {
                            setEditable(false)
                            Animated.timing(Profile, { toValue: 115, duration: 1000, useNativeDriver: false }).start()
                            Animated.timing(opacity1000, { toValue: 0, duration: 500, useNativeDriver: false }).start()
                            Animated.timing(opacity2000, { toValue: 0, duration: 0, useNativeDriver: false }).start()
                            Animated.timing(profileOpacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
                            Animated.timing(profileHeight, { toValue: 65, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(margin, { toValue: 0, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(marginTop, { toValue: 25, duration: 800, useNativeDriver: false }).start()
                        }}>
                            <Image
                                style={{tintColor: colors.white, height: 15, marginBottom: 10, marginTop: 25, width: 22}}
                                source={require('../assets/up-arrow.png')}
                            />
                        </Pressable>
                    </Animated.View>
                </Animated.View>
                <FlatList
                    style={{width: Widht, alignSelf: 'center', marginTop: 30, height: '100%'}}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle
                    numColumns={2}
                    data={chronicles}
                    scrollEnabled
                    ListEmptyComponent={() => (
                        <View style={{ width: Widht, alignItems: 'center'}}>
                            <Text style={fonts.normalGray13}>{d}</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onLongPress={() => {
                                setChronicleModal(true)
                                setChronicleID(item.key)
                                setChronicleTitle(item.title)
                                setAleatorySize(item.aleatorySize)
                                setEmotionIcons(item.emotionIcons)
                                setSelectableHour(item.selectableHour)
                                setChronicleImage(item.image)
                                setTheme(item.theme)
                                setPalette(item.palette)
                            }}
                            onPress={
                                // item.theme == 'Trees' ? 
                                () => navigation.push('HorizontalChronicle',
                                    {
                                        fusionID: item.fusionID,
                                        itemID: item.key,
                                        Palette: item.palette,
                                        aleatorySize: item.aleatorySize,
                                        emotionIcons: item.emotionIcons,
                                        selectableHour: item.selectableHour,
                                        languaje: languaje,
                                        textSettings: textSettings,
                                        theme: item.theme,
                                        mode: 'chronicle'
                                    }
                                )
                                // : () => navigation.push('VerticalChronicle',
                                //     {
                                //         fusionID: item.fusionID,
                                //         chronicleID: item.key,
                                //         Palette: item.palette,
                                //         aleatorySize: item.aleatorySize,
                                //         emotionIcons: item.emotionIcons,
                                //         selectableHour: item.selectableHour,
                                //         languaje: languaje,
                                //         textSettings: textSettings,
                                //         theme: item.theme,
                                //         mode: 'chronicle'
                                //     }
                                // )
                            }>
                                <View style={{minHeight: 220, maxHeight: 250, width: Widht / 2 - 5, marginBottom: 15, marginRight: 10}}>
                                    <Image
                                        source={require('../assets/grayBlue.jpg')}
                                        style={{ position: 'absolute', maxHeight: 220, width: '100%', borderRadius: 5, opacity: 0.6 }}
                                    />
                                    <Image
                                        source={{uri: item.image}}
                                        style={{
                                            minHeight: 166,
                                            maxHeight: 220,
                                            width: '100%',
                                            borderTopLeftRadius: 5,
                                            borderTopRightRadius: 5
                                        }}
                                    />
                                    <View style={{
                                        backgroundColor: colors.azulPerla,
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5
                                    }}>
                                        <View style={{ marginVertical: 8, marginHorizontal: 10 }}>
                                            <Text style={fonts.mediumDark16}>{item.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{
                                                    backgroundColor: colors.darkBlue,
                                                    paddingHorizontal: 8,
                                                    borderRadius: 5,
                                                    marginRight: 2.5
                                                }}><Text style={fonts.normalWhite12}>{item.units}</Text>
                                                </View>
                                                <Text style={fonts.normalDark12}>{b}</Text>
                                                <Text style={fonts.normalDark12}>{item.colorPalette}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                        </TouchableWithoutFeedback>
                    )}
                />
                <Modal
                    style={{margin: 0, position: 'absolute', bottom: 0, width: '100%', backgroundColor: colors.white}}
                    isVisible={chronicleModal}
                    onBackdropPress={() => setChronicleModal(false)}
                    hideModalContentWhileAnimating
                    backdropTransitionOutTiming={0}
                    animationInTiming={80}
                    animationOutTiming={160}
                >
                    <View style={{margin: 30}}>
                        <Text onPress={() => {
                            navigation.navigate('Aparience',
                                {
                                    image: chronicleImage,
                                    languaje: languaje,
                                    state: 'chronicle',
                                    items: [],
                                    docID: chronicleID,
                                    action: 'Update',
                                    docTitle: chronicleTitle,
                                    theme: theme,
                                    palette: palette,
                                    preferences: [aleatorySize, emotionIcons, selectableHour]
                                }
                            )
                        }}
                            style={fonts.normalDark18X}
                        >{r}</Text>
                        <Text onPress={() => {
                                firestore().collection('Chronicles').doc(chronicleID).delete()
                                firestore().collection('Pages').where('chronicleID', '==', chronicleID).get().then(pages => {
                                    pages.forEach(doc => batch.delete(doc.ref));
                                    setChronicleModal(false)
                                    return batch.commit();
                                }).then(() => setChronicleID(''))
                            }}
                            style={fonts.normalDark18X}
                        >{s}</Text>
                    </View>
                </Modal>
                <Modal //Tutorial
                    isVisible={tutorialModal}
                    onBackdropPress={() => setTutorialModal(false)}
                    hideModalContentWhileAnimating
                    backdropTransitionOutTiming={0}
                    animationInTiming={80}
                    animationOutTiming={160}
                >
                    <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            width: 280,
                            height: 280
                        }}>
                            <Image source={require('../assets/tap.png')} style={{height: 55, width: 55, tintColor: colors.darkBlue}}/>
                            <Text style={{...fonts.normalGray18, textAlign: 'center', marginHorizontal: 35, marginVertical: 24 }}>{z}</Text>
                            <Text
                                onPress={() => firestore().collection('Users').doc(userID).update({'tutorial': [false, tutorial[1]]})}
                                style={{...fonts.normalGray18, position: 'absolute', right: 30, bottom: 20 }}
                            >Ok</Text>
                        </View>
                    </Animated.View>
                </Modal>
                <View style={{
                    backgroundColor: colors.azulPerla,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 55,
                    width: '100%',
                }}>
                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{ width: 30, height: 30 }} source={require('../assets/individual.png')}/>
                    </View>
                    <Pressable onPress={() => Alert.alert('Chronos', v)}>
                    {/* // onPress={() => navigation.navigate('Fusion',
                    //     {
                    //         languaje: languaje,
                    //         Chronicles: count,
                    //         items: chronicles,
                    //         textSettings: textSettings,
                    //         UserDate: UserDate,
                    //         ChroniclesCount: count
                    //     }
                    // )}> */}
                        <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 30, height: 30, tintColor: colors.grayBlue}} source={require('../assets/fusion.png')}/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {
                        if (!premium && count >= 2) Alert.alert('Chronos', t)
                        else navigation.navigate('Aparience',
                            {
                                languaje: languaje,
                                state: 'chronicle',
                                items: [],
                                docID: '',
                                action: 'Set',
                                docTitle: '',
                                theme: theme,
                                palette: ['#fff', '#fff', '#fff', '#fff', 'Default'],
                                preferences: [false, false, false]
                            }
                        ) // alert('No puedes tener mas de dos chronicas con una cuenta gratuita')
                    }}>
                        <Image style={{ width: 70, height: 70, marginBottom: 25, }} source={require('../assets/add.png')}/>
                    </Pressable>
                    <Pressable onPress={() => Alert.alert('Chronos', v)}>
                        <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 32, height: 30, tintColor: colors.grayBlue}} source={require('../assets/social.png')}/>
                        </View>
                    </Pressable>
                    <Modal
                        isVisible={profilePhotoModal}
                        onBackdropPress={() => setProfilePhotoModal(false)}
                        hideModalContentWhileAnimating={true}
                        backdropTransitionOutTiming={0}
                        animationInTiming={80}
                        animationOutTiming={160}
                    >
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{
                                backgroundColor: colors.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 8,
                                width: 280,
                                height: 280
                            }}>
                                <Text style={{...fonts.normalDark18, marginHorizontal: 30, marginVertical: 8 }}>{n}</Text>
                                <View style={{marginVertical: 16}}>
                                    <Text onPress={GaleryPhoto}
                                        style={{...fonts.normalGray18, marginHorizontal: 30, marginVertical: 8 }}
                                    >{o}</Text>
                                    <Text onPress={CameraPhoto}
                                        style={{...fonts.normalGray18, marginHorizontal: 30, marginVertical: 8 }}
                                    >{p}</Text>
                                </View>
                                <Pressable onPress={() => setProfilePhotoModal(false)}>
                                    <View style={{
                                        backgroundColor: colors.otroBlue,
                                        height: 50,
                                        width: 235,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 25
                                    }}><Text style={fonts.normalWhite18}>{q}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

export default Individual;