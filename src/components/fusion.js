import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, FlatList, TouchableOpacity, Dimensions, Animated, TextInput, ToastAndroid, Alert } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNSecureStore from "react-native-secure-store";
import moment from '../../node_modules/moment';
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'
import 'moment/locale/es-us'
import 'moment/locale/en-gb'

const Fusion = ({route, navigation}) => {

    const { languaje, items, textSettings, userDate, ChroniclesCount, Chronicles } = route.params;

    const Widht = Dimensions.get('window').width - 40
    const Height = Dimensions.get('window').height

    useEffect(() => {
        RNSecureStore.get("userID").then(res => { if (res !== null) {
            setData(res)
            setUserID(res)
        }}, err => console.log(err))
    }, [])

    const [userID, setUserID] = useState('')
    
    const setData = (id) => {
        firestore().collection('Fusions').where('userID', '==', id).onSnapshot(doc => {
            const fusions = [];
            doc.forEach(docSnap => fusions.push({ ...docSnap.data(), key: docSnap.id }))
            setFusions(fusions);
        });
    }

    const [fusionModal, setFusionModal] = useState(false)
    const [fusionID, setFusionID] = useState('')
    const [fusionTitle, setFusionTitle] = useState('')
    const [theme, setTheme] = useState('Trees')
    const [chronicleImage, setChronicleImage] = useState(null)
    const [palette, setPalette] = useState(['#fff', '#fff', '#fff', '#fff', 'Default'])

    const [fusions, setFusions] = useState([]);
    const [Languaje, setLanguaje] = useState(languaje)

    const [chroniclesCount, setChroniclesCount] = useState(ChroniclesCount)
    const count = fusions.length

    const user = auth().currentUser;

    useEffect(() => {
        if (user != null) {
            user.providerData.forEach((profile) => {
                setImage(profile.photoURL)
                setUsername(profile.displayName)
                setEmail(profile.email)
                setEmailVerification(profile.emailVerified)
            });
        }
    }, [])

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [emailVerification, setEmailVerification] = useState()
    const [image, setImage] = useState(null)
    const [profilePhotoModal, setProfilePhotoModal] = useState(false)

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
        launchCamera({ mediaType: 'photo' }, res => {
            if (res.error) ToastAndroid.show(res.error, ToastAndroid.SHORT)
            else {
                setImage(res.uri)
                setProfilePhotoModal(false)
            }
        })
    }

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

    useEffect(() => {
        switch (Languaje) {
            case 'English':
                moment.locale('en-gb')
                setA('Chronicles'); setB('Units'); setC('You have not merged anything yet'); setD('Fusions'); setE('Shared')
                setF('Username'); setG('Email'); setH('User since'); setI('Verify email'); setJ('Save'); setK('Edit info')
                setL('Delete account'); setM('Profile photo'); setN('Choose image from galery'); setO('Take a photo from camera')
                setP('Cancel'); setQ('Delete image'); setR('Edit profile photo'); setS('You have already merged all your Chronicles')
                setT('You do not have chronicles to merge'); setU('To update your email, you must have recently logged in.')
                setV('Are you sure you want to delete your account? This action is permanent.'); setW('Delete')
                setX('This section is under development, it is still not possible to access'); setY('Edit')
                setZ('To delete your user, you must have recently logged in.')
                break;
            case 'Spanish':
                moment.locale('es-us')
                setA('Crónicas'); setB('Units'); setC('Todavía no has fusionado nada'); setD('Fusiones'); setE('Social')
                setF('Nombre de usuario'); setG('Correo electrónico'); setH('Usuario desde'); setI('Verificar email'); setJ('Guardar')
                setK('Editar datos'); setL('Eliminar cuenta'); setM('Foto de perfil'); setN('Escoger imagen de la galeria')
                setO('Tomar foto desde cámara'); setP('Cancelar'); setQ('Borrar imagen'); setR('Editar foto de perfil')
                setS('Ya fusionaste todas tus Chrónicas'); setT('No tienes chrónicas que fusionar');
                setU('Para actualizar tu correo, es necesario que hayas iniciado sesión recientemente.')
                setV('Estas seguro de que quieres borrar tu cuenta?, esta acción es permanente.'); setW('Eliminar')
                setX('Esta sección esta en desarrollo, todavía no es posible acceder'); setY('Editar')
                setZ('Para eliminar tu usuario, es necesario que hayas iniciado sesión recientemente.')
                break;
        }
        return () => languaje
    }, [])

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')
    const [m, setM] = useState(''); const [n, setN] = useState(''); const [o, setO] = useState(''); const [p, setP] = useState('')
    const [q, setQ] = useState(''); const [r, setR] = useState(''); const [s, setS] = useState(''); const [t, setT] = useState('')
    const [u, setU] = useState(''); const [v, setV] = useState(''); const [w, setW] = useState(''); const [x, setX] = useState('')
    const [y, setY] = useState(''); const [z, setZ] = useState('')

    const Profile = useRef(new Animated.Value(115)).current;
    const opacity1000 = useRef(new Animated.Value(0)).current;
    const opacity2000 = useRef(new Animated.Value(0)).current;
    const profileOpacity = useRef(new Animated.Value(1)).current;
    const profileHeight = useRef(new Animated.Value(65)).current;
    const margin = useRef(new Animated.Value(0)).current;
    const marginTop = useRef(new Animated.Value(25)).current;
    const defaultImageOpacity = useRef(new Animated.Value(1)).current;

    return (
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <Animated.View style={{ height: Profile, backgroundColor: colors.otroBlue, flexDirection: 'column', alignItems: 'center' }}>
                <Animated.View style={{flexDirection: 'row', marginTop: marginTop}}>
                    <Animated.View style={{height: margin, width: margin}}/>
                    <TouchableOpacity
                        style={{justifyContent: 'center', alignItems: 'center', marginLeft: 25}}
                        onPress={editable ? () => setProfilePhotoModal(true) : null}
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
                                <Text style={fonts.normalWhite12}>{d}</Text>
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
                <View style={{ height: Height - 160, justifyContent: 'space-between' }}>
                    <Animated.View style={{justifyContent: 'flex-start', opacity: opacity1000}}>
                        <View style={{flexDirection: 'row', height: 16, marginTop: 20, marginBottom: 10}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 16,
                                backgroundColor: colors.darkBlue,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                marginRight: 2.5
                            }}><Text style={fonts.normalWhite12}>{Chronicles}</Text>
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
                            }}><Text style={fonts.normalWhite12}>{count}</Text>
                            </View>
                            <Text style={{...fonts.normalWhite12, marginRight: 15}}>{d}</Text>
                        </View>
                        <View>
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{f}</Text>
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
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{g}</Text>
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
                            <Text style={{...fonts.normalWhite12, marginBottom: 3, marginTop: 7}}>{h}</Text>
                            <Text style={{...fonts.normalWhite16, marginBottom: 7}}>{moment(userDate).format('LL')}</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={{flexDirection: 'column', alignItems: 'center', height: 160, opacity: opacity2000}}>
                        <TouchableOpacity onPress={() => user.sendEmailVerification()}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.otroBlue,
                                borderColor: colors.white,
                                borderWidth: 2,
                                borderRadius: 5,
                                height: 50,
                                width: Dimensions.get('window').width - 50,
                                opacity: emailVerification ? 1 : 0,
                            }}>
                                <Text style={{color: colors.white, fontSize: 18, height: 24}}>{i}</Text>
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
                            style={{ color: colors.white, fontSize: 14, marginVertical: 5, marginTop: 20, height: 20}}
                        >{editable ? j : k}</Text>
                        <Text onPress={() => Alert.alert('Chronos', v, 
                            [
                                {text: p, style: "cancel"},
                                {text: l, onPress: () => {
                                    DeleteAllDocuments()
                                    user.delete()
                                        .then(() => firestore().collection('Users').doc(userID).delete())
                                        .catch(() => Alert.alert('Chronos', x))
                                }}
                            ]
                        )}
                            style={{...fonts.normalWhite14, marginVertical: 5}}
                        >{l}</Text>
                        <Pressable onPress={() => {
                            Animated.timing(Profile, { toValue: 115, duration: 1000, useNativeDriver: false }).start()
                            Animated.timing(opacity1000, { toValue: 0, duration: 500, useNativeDriver: false }).start()
                            Animated.timing(opacity2000, { toValue: 0, duration: 0, useNativeDriver: false }).start()
                            Animated.timing(profileOpacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
                            Animated.timing(profileHeight, { toValue: 65, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(margin, { toValue: 0, duration: 800, useNativeDriver: false }).start()
                            Animated.timing(marginTop, { toValue: 25, duration: 800, useNativeDriver: false }).start()
                        }}>
                            <Image
                                style={{tintColor: colors.white, height: 15, marginBottom: 10, marginTop: 15, width: 22}}
                                source={require('../assets/up-arrow.png')}
                            />
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View>
            <FlatList
                style={{marginLeft: 20, marginTop: 30, height: '100%'}}
                showsVerticalScrollIndicator={false}
                data={fusions}
                scrollEnabled
                ListEmptyComponent={() => (
                    <View style={{ width: Widht, alignItems: 'center'}}>
                        <Text style={fonts.normalGray13}>{c}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Pressable
                        onLongPress={() => {
                            setFusionModal(true)
                            setFusionID(item.key)
                            setFusionTitle(item.title)
                            setChronicleImage(item.image)
                            setTheme(item.theme)
                            setPalette(item.palette)
                        }}
                        onPress={
                            // item.theme == 'Trees' ? 
                            () => navigation.push('HorizontalChronicle',
                                {
                                    fusionID: '',
                                    itemID: item.key,
                                    Palette: item.palette,
                                    aleatorySize: item.aleatorySize,
                                    emotionIcons: item.emotionIcons,
                                    selectableHour: item.selectableHour,
                                    languaje: languaje,
                                    textSettings: textSettings,
                                    theme: item.theme,
                                    mode: 'fusion'
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
                            //         mode: 'fusion'
                            //     }
                            // )
                        }
                    >
                        <View style={{ minHeight: 220, width: Widht, marginBottom: 15 }}>
                            <Image
                                source={require('../assets/grayBlue.jpg')}
                                style={{ position: 'absolute', maxHeight: 220, width: Widht, borderRadius: 5, opacity: 0.6 }}
                            />
                            <Image
                                source={{uri: item.image}}
                                style={{minHeight: 166, width: Widht, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
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
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
            <Modal
                style={{margin: 0, position: 'absolute', bottom: 0, width: '100%', backgroundColor: colors.white}}
                isVisible={fusionModal}
                onBackdropPress={() => setFusionModal(false)}
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
                                items: items,
                                state: 'fusion',
                                docID: fusionID,
                                action: 'Update',
                                docTitle: fusionTitle,
                                theme: theme,
                                palette: palette,
                            }
                        )
                    }}
                        style={fonts.normalDark18X}
                    >{y}</Text>
                    <Text onPress={() => {
                        firestore().collection('Fusions').doc(fusionID).delete().then(() => {
                            firestore().collection('Users').doc(userID).update({'fusions': 0})
                        })
                        setFusionModal(false)
                        setFusionID('')
                    }}
                        style={fonts.normalDark18X}
                    >{w}</Text>
                </View>
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
                    <Pressable onPress={() => navigation.navigate('Individual')}>
                        <Image style={{ width: 30, height: 30, tintColor: colors.grayBlue }} source={require('../assets/individual.png')}/>
                    </Pressable>
                </View>
                <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{ width: 30, height: 30 }} source={require('../assets/fusion.png')}/>
                </View>
                <Pressable onPress={() => {
                    if (chroniclesCount === 0) ToastAndroid.show(t, ToastAndroid.SHORT)
                    else if (count === 1) ToastAndroid.show(s, ToastAndroid.SHORT)
                    else navigation.navigate('Aparience',
                        {
                            languaje: languaje,
                            items: items,
                            state: 'fusion',
                            docID: '',
                            action: 'Set',
                            docTitle: '',
                            theme: theme,
                            palette: ['#fff', '#fff', '#fff', '#fff', 'Default'],
                        }
                    )
                }}>
                    <Image style={{ width: 70, height: 70, marginBottom: 25, }} source={require('../assets/add.png')}/>
                </Pressable>
                <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable onPress={() => Alert.alert('Chronos', x)}>
                        <Image style={{ width: 32, height: 30, tintColor: colors.grayBlue }} source={require('../assets/social.png')}/>
                    </Pressable>
                </View>
            </View>
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
                        borderRadius: 5,
                        width: Dimensions.get('window').width - 60,
                        height: 240
                    }}>
                        <View style={{justifyContent: 'center', marginTop: 40}}>
                            <Text style={{ fontSize: 20, color: colors.grayBlue, marginLeft: 30 }}>{m}</Text>
                            <View style={{marginVertical: 16}}>
                                <Text onPress={GaleryPhoto}
                                    style={{ fontSize: 18, color: colors.darkBlue, marginLeft: 30, marginVertical: 8 }}
                                >{n}</Text>
                                <Text onPress={CameraPhoto}
                                    style={{ fontSize: 18, color: colors.darkBlue, marginLeft: 30, marginVertical: 8 }}
                                >{o}</Text>
                            </View>
                        </View>
                        <Text onPress={() => setProfilePhotoModal(false)}
                            style={{color: colors.grayBlue, fontSize: 16, alignSelf: 'flex-end', marginRight: 30, marginTop: 20 }}
                        >{p}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Fusion;