import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, TextInput, ActivityIndicator, Animated, ToastAndroid, Dimensions } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import RNSecureStore from "react-native-secure-store";
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Name = ({route, navigation}) => {

    const { selectableUnitSize, emotionStateIcons, selectableHour, theme, palette, languaje, state, items, units, action, docID, docTitle, chronicleImage } = route.params;
    const Width = Dimensions.get('window').width

    useEffect(() => {
        RNSecureStore.get("userID").then(res => { if (res !== null) setUserID(res)})
    }, [])

    const [userID, setUserID] = useState('')
    const [name, setName] = useState(docTitle)

    const reference = storage().ref().child(`Covers/${userID}.${name}`)
    const [imageAdded, setImageAdded] = useState(false)
    const [importedImage, setImportedImage] = useState(false)

    const newItem = () => {
        if (name.length < 4) ToastAndroid.show(c, ToastAndroid.SHORT)
        else {
            setLoading(true)
            if (imageAdded) {
                reference.putFile(image).then(() => 
                reference.getDownloadURL().then(res => {
                    navigation.navigate('Load',
                        { 
                            userID: userID,
                            title: name,
                            units: units,
                            image: res,
                            theme: theme,
                            chronicles: items,
                            palette: palette,
                            aleatorySize: selectableUnitSize,
                            emotionIcons: emotionStateIcons,
                            selectableHour: selectableHour,
                            docTitle: docTitle,
                            state: state,
                            action: action,
                            docID: docID
                        }
                    )
                }))
            } else if (importedImage) {
                navigation.navigate('Load',
                    { 
                        userID: userID,
                        title: name,
                        units: units,
                        image: image,
                        theme: theme,
                        chronicles: items,
                        palette: palette,
                        aleatorySize: selectableUnitSize,
                        emotionIcons: emotionStateIcons,
                        selectableHour: selectableHour,
                        docTitle: docTitle,
                        state: state,
                        action: action,
                        docID: docID
                    }
                )
            } else {
                navigation.navigate('Load',
                    { 
                        userID: userID,
                        title: name,
                        units: units,
                        image: 'empty',
                        theme: theme,
                        chronicles: items,
                        palette: palette,
                        aleatorySize: selectableUnitSize,
                        emotionIcons: emotionStateIcons,
                        selectableHour: selectableHour,
                        docTitle: docTitle,
                        state: state,
                        action: action,
                        docID: docID
                    }
                )
            }
        }
    }

    const [loading, setLoading] = useState(false)
    const [focus, setFocus] = useState(false)

    const GaleryPhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, res => {
            setImage(res.uri)
            setProfilePhotoModal(false)
            setImageAdded(true)
        })
    }
    const CameraPhoto = () => {
        launchCamera({ mediaType: 'photo' }, res => {
            setImage(res.uri)
            setProfilePhotoModal(false)
            setImageAdded(true)
        })
    }

    useEffect(() => {
        if (chronicleImage == null) setImportedImage(false)
        else setImportedImage(true)
    }, [])

    const [image, setImage] = useState(chronicleImage)
    const [profilePhotoModal, setProfilePhotoModal] = useState(false)

    const buttonOpacity = useRef(new Animated.Value(1)).current;
    const buttonHeight = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        if (focus) {
            Animated.timing(buttonOpacity, { toValue: 0, duration: 300, useNativeDriver: false }).start()
            Animated.timing(buttonHeight,  { toValue: 0, duration: 300, useNativeDriver: false }).start()
        } else {
            Animated.timing(buttonOpacity, { toValue: 1, duration: 300, useNativeDriver: false }).start()
            Animated.timing(buttonHeight,  { toValue: 50, duration: 300, useNativeDriver: false }).start();
        }
    }, )

    const [Height, setHeight] = useState()

    useEffect(() => {
        if (focus) setHeight(0)
        else if (state == 'fusion') setHeight(200)
        else if (state == 'chronicle')setHeight(338)
    }, )

    useEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Add'); setB('Title'); setC('The title must have at least 4 letters'); setD('Choose photo from galery');
            setE('Take photo from camera'); setF('Cover'); setG('Cancel'); setH('Select Cover')
                break;
            case 'Spanish':
            setA('Añadir'); setB('Título'); setC('El título debe tener al menos 4 letras'); setD('Escoger imagen de la galeria');
            setE('Tomar foto desde camara'); setF('Portada'); setG('Cancelar'); setH('Escoger Portada')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo }}>
            <Modal
                isVisible={profilePhotoModal}
                onBackdropPress={() => setProfilePhotoModal(false)}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                animationInTiming={80}
                animationOutTiming={160}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ backgroundColor: colors.white, borderRadius: 5, width: Width - 60, height: 250 }}>
                        <View style={{ marginTop: 40, marginHorizontal: 30}}>
                            <Text style={{...fonts.normalGray20}}>{f}</Text>
                            <View style={{marginVertical: 16}}>
                                <Text onPress={GaleryPhoto} style={{...fonts.normalDark18, marginVertical: 8}}>{d}</Text>
                                <Text onPress={CameraPhoto} style={{...fonts.normalDark18, marginVertical: 8, marginBottom: 30}}>{e}</Text>
                            </View>
                            <Text onPress={() => setProfilePhotoModal(false)} style={{...fonts.normalGray16, alignSelf: 'flex-end' }}>{g}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '92%', marginRight: 25 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22, marginLeft: 20, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <View style={{ marginTop: 15, opacity: 0.7 }}>
                    <ActivityIndicator style={{position: 'absolute', opacity: loading ? 1 : 0}} color={colors.grayBlue}/>
                    <Text onPress={newItem} style={{...fonts.normalDark15, opacity: loading ? 0 : 1}}>{a}</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                <View>
                    <Animated.Image
                        source={require('../assets/grayBlue.jpg')}
                        style={{position: 'absolute', width: state == 'fusion' ? 320 : 234, height: Height, opacity: 0.6, borderRadius: 5}}
                    />
                    <Animated.Image
                        source={{uri: image}}
                        style={{width: state == 'fusion' ? 320 : 234, height: Height, borderRadius: 5}}
                    />
                </View>
                <Pressable onPress={() => GaleryPhoto()}>
                    <Animated.View style={{
                            backgroundColor: colors.darkBlue,
                            height: 50,
                            width: state == 'fusion' ? 320 : 234,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            opacity: buttonOpacity
                        }}>
                        <Text style={{color: colors.white, fontSize: 18, opacity: 1}}>{h}</Text>
                    </Animated.View>
                </Pressable>
                <TextInput
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 5,
                        height: 55,
                        width: state == 'fusion' ? 320 : 234,
                        paddingLeft: 15,
                    }}
                    placeholder={b}
                    placeholderTextColor={colors.grayBlue}
                    onChangeText={text => setName(text)}
                    value={name}
                    maxLength={18}
                    autoCorrect={false}
                    selectionColor={colors.grayBlue}
                    onFocus={() => setFocus(true)}
                    onEndEditing={() => setFocus(false)}
                />
            </View>
        </View>
    );
}

export default Name;