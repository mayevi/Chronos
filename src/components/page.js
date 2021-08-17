import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, TouchableOpacity, Share, Button, Dimensions, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from '../../node_modules/moment';
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'
import 'moment/locale/es-us'
import 'moment/locale/en-gb'

//Article
const Page = ({route, navigation}) => {

    const { pageID, itemID, Title, Content, Size, Palette, emotionalStates, emotionIcon, chronicleUnits, languaje, Color, aleatorySize, icons, Date } = route.params;

    const Widht = Dimensions.get('window').width

    //Content
    const [title, setTitle] = useState(Title)
    const [content, setContent] = useState(Content)

    const [hideDate, setHideDate] = useState(false)

    //Emotion States
    const [image, setImage] = useState()

    useEffect(() => {
        switch (emotionIcon) {
            case 'Euphoric': setImage(require('../assets/euphoric.png'))
                break;
            case 'Happy': setImage(require('../assets/happy.png'))
                break;
            case 'Normal': setImage(require('../assets/normal.png'))
                break;
            case 'Sad': setImage(require('../assets/sad.png'))
                break;
            case 'Depressed': setImage(require('../assets/depressed.png'))
                break;
            case 'Angry': setImage(require('../assets/angry.png'))
                break;
        }
        return () => emotionIcon
    }, )

    const onShare = async () => {
        try {
            const result = await Share.share({ message: title + '\n' + content });
            if (result.action == Share.dismissedAqa3rhiction) ToastAndroid.show(o, ToastAndroid.SHORT)
        } catch (error) {
            alert(error.message);
        }
    };

    //DateTime Picker
    const [assignedDate, setAssignedDate] = useState(Date.toDate())

    const confirmDate = (Date) => {
        if (Date <= moment()) {
            setAssignedDate(Date)
            setDateModal(false)
        } else ToastAndroid.show(n, ToastAndroid.SHORT)
        firestore().collection('Pages').doc(pageID).update({'assignedDate': Date})
    }

    //Modals
    const [SettingsModal, setSettingsModal] = useState(false)
    const [DateModal, setDateModal] = useState(false);
    const [SizeModal, setSizeModal] = useState(false)
    const [ColorModal, setColorModal] = useState(false)

    useEffect(() => {
        if (SizeModal) setSettingsModal(false)
        if (DateModal) setSettingsModal(false)
        if (ColorModal) setSettingsModal(false)
    }, )

    const [color, setColor] = useState(Color)
    const [size, setSize] = useState(Size)

    const [height, setHeight] = useState()
    const [width, setWidth] = useState()
    // const [borderRadius, setBorderRadius] = useState()
    // const [rotate, setRotate] = useState()
    // const [padding, setPadding] = useState()

    // const SizeSettings = [height, width, borderRadius, rotate]

    // useEffect(() => {
    //     switch (size) {
    //         case 1: setHeight(35); setWidth(35); setBorderRadius(height / 2); setRotate(0); setPadding(0)
    //             break;
    //         case 2: setHeight(40); setWidth(40); setBorderRadius(height / 2); setRotate(0); setPadding(5)
    //             break;
    //         case 3: setHeight(45); setWidth(45); setBorderRadius(height / 2); setRotate(0); setPadding(10)
    //             break;
    //         case 4: setHeight(50); setWidth(50); setBorderRadius(height / 2); setRotate(0); setPadding(15)
    //             break;
    //         case 5: setHeight(55); setWidth(55); setBorderRadius(height / 2); setRotate(0); setPadding(20)
    //             break;
    //     }
    // }, )

    useEffect(() => {
        switch (size) {
            case 1: setHeight(100); setWidth(15.5)
                break;
            case 2: setHeight(130); setWidth(20)
                break;
            case 3: setHeight(160); setWidth(24.5)
                break;
            case 4: setHeight(190); setWidth(29)
                break;
            case 5: setHeight(220); setWidth(33.8)
                break;
        }
        return () => size
    }, )

    //Delete Page
    const Deleted = chronicleUnits - 1

    const DeletePage = () => {
        firestore().collection('Pages').doc(pageID).delete().then(() => {
            firestore().collection('Chronicles').doc(itemID).update({'units': Deleted})
            navigation.navigate('HorizontalChronicle')
        })
    }

    useEffect(() => {
        switch (languaje) {
            case 'English':
                moment.locale('en-gb')
                setEmotionLanguaje(0)
                setA('Attach photos'); setB('Image posicion'); setC('Edit page'); setD('Edit size'); setE('Edit color')
                setF('Edit date'); setG('Show date'); setH('Hide date'); setI('Delete page'); setJ('Image Styles'); setK('Slider')
                setL('Carrousel'); setM('Next'); setN('You cannot select a day in the future'); setO('The message could not be sent')
                setP('Select')
                break;
            case 'Spanish':
                moment.locale('es-us')
                setEmotionLanguaje(1)
                setA('Adjuntar fotos'); setB('Posición de imagenes'); setC('Editar pagina'); setD('Editar tamaño')
                setE('Editar color'); setF('Editar fecha'); setG('Mostrar fecha'); setH('Esconder fecha')
                setI('Eliminar pagina'); setJ('Estilos de imagen'); setK('Deslizable'); setL('Carrusel')
                setM('Seguir'); setN('No puedes seleccionar un día en el futuro'); setO('No fue posible enviar el mensaje')
                setP('Seleccionar')
                break;
        }
        return () => languaje
    }, [])

    const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState(''); const [d, setD] = useState('')
    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')
    const [m, setM] = useState(''); const [n, setN] = useState(''); const [o, setO] = useState(''); const [p, setP] = useState('')

    const [focus, setFocus] = useState(false)
    const [changes, setChanges] = useState(false)

    const [emotionLanguaje, setEmotionLanguaje] = useState()

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, flexDirection: 'column' }}>
            <Pressable onPress={changes && !focus ?
                () => {
                    firestore().collection('Pages').doc(pageID).update(
                        {'title': title, 'content': content}
                    ).then(() => navigation.navigate('HorizontalChronicle'))
                }
                : () => {
                    if (!focus) navigation.navigate('HorizontalChronicle')
                }
            }>
                <Image
                    style={{ width: 20, height: 20, marginLeft: 15, marginTop: 25, opacity: 0.5, tintColor: colors.grayBlue}}
                    source={require('../assets/left-arrow.png')}
                />
            </Pressable>
            <View style={{flex: 1, width: Widht - 45, alignSelf: 'center' }}>
                <TextInput
                    style={{ padding: 0, marginTop: 20 }}
                    placeholderTextColor={colors.darkBlue}
                    onChangeText={title => setTitle(title)}
                    maxLength={Widht / 9}
                    placeholder='-'
                    value={title}
                    autoCapitalize={'sentences'}
                    onChange={() => setChanges(true)}
                    selectionColor={colors.grayBlue}
                />
                    <Text onPress={() => setDateModal(true)}
                        style={{
                            ...fonts.normalGray13,
                            marginBottom: hideDate ? 8 : 23,
                            marginTop: hideDate ? 4 : 14,
                            opacity: hideDate ? 0 : 1,
                            height: hideDate ? 0 : 17
                        }}
                    >{moment(assignedDate).format('LLLL')}</Text>
                <TextInput
                    style={{ padding: 0, marginBottom: 20 }}
                    placeholderTextColor={colors.grayBlue}
                    onChangeText={content => setContent(content)}
                    placeholder='-'
                    value={content}
                    autoCapitalize={'sentences'}
                    onChange={() => setChanges(true)}
                    selectionColor={colors.grayBlue}
                    scrollEnabled
                    multiline
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18}}>
                        <Image style={{ width: 50, height: 50, marginLeft: 20 }} source={image}/>
                        <View style={{flexDirection: 'column', marginLeft: 5, opacity: 0.7}}>
                            <Text style={fonts.lightOtro11}>{emotionalStates.aa ? emotionalStates.aa[emotionLanguaje]: null}</Text>
                            <Text style={fonts.lightOtro11}>{emotionalStates.bb ? emotionalStates.bb[emotionLanguaje]: null}</Text>
                            <Text style={fonts.lightOtro11}>{emotionalStates.cc ? emotionalStates.cc[emotionLanguaje]: null}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 12, marginRight: 15 }}>
                    <Pressable onPress={() => navigation.navigate('EmotionalStateSelect', 
                        {
                            pageID: pageID,
                            languaje: languaje,
                            chronicleID: itemID,
                            Title: title,
                            Content: content,
                            Size: Size,
                            Palette: Palette,
                            chronicleUnits: chronicleUnits,
                            Color: Color,
                            aleatorySize: aleatorySize,
                            icons: icons,
                        }
                    )}>
                        <View style={{ height: icons ? 30 : 0, width: icons ? 32 : 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{ width: icons ? 18 : 0, height: icons ? 18 : 0 }} source={require('../assets/emotion.png')}/>
                        </View>
                    </Pressable>
                    <Pressable onPress={onShare}>
                        <View style={{height: 30, width: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{ width: 17, height: 18, tintColor: colors.grayBlue }} source={require('../assets/share.png')}/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => setSettingsModal(true)}>
                        <View style={{height: 30, width: 32, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{ width: 5, height: 18, tintColor: colors.grayBlue }} source={require('../assets/point-menu.png')}/>
                        </View>
                    </Pressable>
                </View>
            </View>
            <Modal //Settings
                style={{margin: 0, position: 'absolute', bottom: 0, width: '100%', backgroundColor: colors.white}}
                isVisible={SettingsModal}
                onBackdropPress={() => setSettingsModal(false)}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                animationInTiming={300}
                animationOutTiming={400}
            >
                <View style={{margin: 30}}>
                    <Text onPress={() => setSizeModal(true)} style={{...fonts.normalDark18X, height: aleatorySize ? 0 : 50 }}>{d}</Text>
                    <Text onPress={() => setColorModal(true)} style={fonts.normalDark18X}>{e}</Text>
                    <Text onPress={() => setDateModal(true)} style={fonts.normalDark18X}>{f}</Text>
                    <Text onPress={() => {setSettingsModal(false); setHideDate(state => ! state)}}
                        style={fonts.normalDark18X}
                    >{hideDate ? g : h}</Text>
                    <Text onPress={DeletePage} style={fonts.normalDark18X}>{i}</Text>
                </View>
            </Modal>
            <DateTimePickerModal
                isVisible={DateModal}
                mode="datetime"
                onConfirm={date => confirmDate(date)}
                onCancel={() => setDateModal(false)}
            />
            <Modal //Size Modal
                isVisible={SizeModal}
                onBackdropPress={() => setSizeModal(false)}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                animationInTiming={80}
                animationOutTiming={160}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: colors.white,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        width: 280,
                        height: 350
                    }}>
                        <View style={{
                            backgroundColor: colors.azulPerla,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 250,
                            height: 335
                        }}>
                            {/* <View style={{
                                backgroundColor: colors.darkBlue,
                                height: SizeSettings[0],
                                width: SizeSettings[1],
                                borderRadius: SizeSettings[2],
                                rotation: SizeSettings[3]
                            }}/> */}
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{tintColor: Palette[color], height: height, width: width}}
                            />
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.otroBlue,
                        justifyContent: "space-around",
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        width: 280,
                        height: 80
                    }}>
                        <Text onPress={() => setSize(1)} style={{ color: size == 1 ? colors.white : colors.grayBlue, fontSize: 35 }}>1</Text>
                        <Text onPress={() => setSize(2)} style={{ color: size == 2 ? colors.white : colors.grayBlue, fontSize: 35 }}>2</Text>
                        <Text onPress={() => setSize(3)} style={{ color: size == 3 ? colors.white : colors.grayBlue, fontSize: 35 }}>3</Text>
                        <Text onPress={() => setSize(4)} style={{ color: size == 4 ? colors.white : colors.grayBlue, fontSize: 35 }}>4</Text>
                        <Text onPress={() => setSize(5)} style={{ color: size == 5 ? colors.white : colors.grayBlue, fontSize: 35 }}>5</Text>
                    </View>
                </View>
                <Button title={p} color={colors.grayBlue} onPress={() => {
                    firestore().collection('Pages').doc(pageID).update({'sizeData': [height, width], 'size': size})
                    setSizeModal(false)
                }}/>
            </Modal>
            <Modal //Color Modal
                // style={{margin: 0, backgroundColor: colors.white}}
                isVisible={ColorModal}
                onBackdropPress={() => setColorModal(false)}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                animationInTiming={80}
                animationOutTiming={160}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: colors.white,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        width: 280,
                        height: 350
                    }}>
                        <View style={{
                            backgroundColor: colors.azulPerla,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 250,
                            height: 335
                        }}>
                            {/* <View style={{
                                backgroundColor: color,
                                height: SizeSettings[0],
                                width: SizeSettings[1],
                                borderRadius: SizeSettings[2],
                                rotation: SizeSettings[3]
                            }}/> */}
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{tintColor: Palette[color], height: height, width: width}}
                            />
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.otroBlue,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        width: 280,
                        height: 80
                    }}>
                        <Pressable onPress={() => setColor(1)}>
                            <View style={{ backgroundColor: Palette[1], height: 65, width: 83 }}/>
                        </Pressable>
                        <Pressable onPress={() => setColor(2)}>
                            <View style={{ backgroundColor: Palette[2], height: 65, width: 83 }}/>
                        </Pressable>
                        <Pressable onPress={() => setColor(3)}>
                            <View style={{ backgroundColor: Palette[3], height: 65, width: 83 }}/>
                        </Pressable>
                    </View>
                </View>
                <Button title={p} color={colors.grayBlue} onPress={() => {
                    firestore().collection('Pages').doc(pageID).update({'color': color})
                    setColorModal(false)
                }}/>
            </Modal>
        </View>
    );
}

export default Page;