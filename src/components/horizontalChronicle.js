import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, Pressable, Button, Image, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import moment from '../../node_modules/moment';
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'
import 'moment/locale/es-us'
import 'moment/locale/en-gb'

const HorizontalChronicle = ({route, navigation}) => {

    const { fusionID, itemID, Palette, languaje, textSettings, aleatorySize, emotionIcons, selectableHour, mode } = route.params;
    const Widht = Dimensions.get('window').width
    const Height = Dimensions.get('window').height

    useEffect(() => {
        const GetID = RNSecureStore.get("userID").then(res => { if (res !== null) {
            setUserID(res)
            getTutorial(res)
        }}, err => console.log(err))

        return () => GetID
    }, [])

    const getTutorial = (id) => {
        firestore().collection('Users').doc(id).onSnapshot(doc => setTutorial(doc.data().tutorial))
    }

    useLayoutEffect(() => {
        const GetPages1 = firestore().collection('Pages').where(mode == 'chronicle' ? 'chronicleID': 'fusionID', '==', itemID)
            .onSnapshot(doc => {
                const page = [];
                doc.forEach(doc => page.push({ ...doc.data(), key: doc.id }))
                setPage(page);
            }
        )
        return () => GetPages1()
    }, )

    useEffect(() => {
        if (aleatorySize) setSize(Math.floor(Math.random() * (Math.floor(1) - Math.ceil(6)) + Math.ceil(6)))
    }, [])

    const [Page, setPage] = useState([]);
    const [userID, setUserID] = useState('')
    const flatlist = useRef(null);
    const count = Page.length

    //Add Pages 
    const [loading, setLoading] = useState(false)

    const newPage = () => {
        const pageDataWithEmotions = {
            userID: userID,
            fusionID: fusionID,
            chronicleID: itemID,
            title: '',
            content: '',
            color: color,
            size: size,
            sizeData: [height, width],
            emotionIcon: '',
            emotionalStates: [],
            assignedDate: assignedDate,
            pageDate: firestore.FieldValue.serverTimestamp(new Date())
        }
        const pageData = {
            userID: userID,
            fusionID: fusionID,
            chronicleID: itemID,
            title: '',
            content: '',
            color: color,
            size: size,
            sizeData: [height, width],
            assignedDate: assignedDate,
            pageDate: firestore.FieldValue.serverTimestamp(new Date())
        }
        setColorModal(false)
        setLoading(true)
        firestore().collection('Pages').doc().set(emotionIcons ? pageDataWithEmotions : pageData).then(() => {
            firestore().collection('Chronicles').doc(itemID).update({'units': count + 1})
            setSize(Math.floor(Math.random() * (Math.floor(1) - Math.ceil(6)) + Math.ceil(6)))
        }).then(() => {
            setSize(3)
            setColor(2)
            setLoading(false)
        })
    }

    //Modals
    const [dateModal, setDateModal] = useState(false);
    const [SizeModal, setSizeModal] = useState(false)
    const [ColorModal, setColorModal] = useState(false)

    const [assignedDate, setAssignedDate] = useState()
    const [size, setSize] = useState(3)
    const [color, setColor] = useState(2)

    const [height, setHeight] = useState()
    const [width, setWidth] = useState()

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

    useEffect(() => {
        switch (languaje) {
            case 'English':
            moment.locale('en-gb')
            setA('Today'); setB('Pages'); setC('Next'); setD('You cannot select a day in the future')
            setE('Swipe up to create a new page')
                break;
            case 'Spanish':
            moment.locale('es-us')
            setA('Hoy'); setB('Paginas'); setC('Seguir'); setD('No puedes seleccionar un día en el futuro')
            setE('Desliza hacia arriba para crear una nueva pagina')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')

    const [tutorial, setTutorial] = useState([])
    const [tutorialModal, setTutorialModal] = useState(false)

    useEffect(() => {
        switch (tutorial[1]) {
            case true:
            setTimeout(() => setTutorialModal(true), 2000)
                break;
            case false:
            setTimeout(() => setTutorialModal(false), 1500)
                break;
        }
    }, )

    return (
        <GestureRecognizer
            onSwipeUp={() => setDateModal(true)}
            config={{velocityThreshold: 0.5, directionalOffsetThreshold: 40, gestureIsClickThreshold: 8}}
            style={{flex: 1, backgroundColor: Palette[0], position: 'relative' }}
        >
            <StatusBar hidden />
            {/* <Text>{JSON.stringify(tutorial)}</Text>
            <Text>{JSON.stringify(tutorialModal)}</Text> */}
            <View style={{ position: 'absolute', alignSelf: 'flex-end', backgroundColor: Palette[1], height: '100%', width: Widht / 7 }}/>
            <View style={{
                backgroundColor: colors.azulDeFondo,
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                height: 45,
            }}>
                <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: colors.darkBlue,
                        paddingHorizontal: 10,
                        paddingVertical: 1,
                        borderRadius: 5,
                        marginRight: 2.5
                    }}><Text style={fonts.normalWhite14}>{count}</Text>
                    </View>
                    <Text style={fonts.normalDark12}>{b}</Text>
                </View>
                </TouchableOpacity>
                <Text style={fonts.normalDark16}>{moment().format('MMMM')} - {moment().format('YYYY')}</Text>
                <TouchableOpacity>
                    <View style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: colors.darkBlue,
                    }}>
                        <Text onPress={() => flatlist.current.scrollToEnd()} style={fonts.normalDark12}>{a}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ alignSelf: 'center', flexDirection: 'row', height: '100%' }}>
                <ActivityIndicator
                    style={{position: 'absolute', left: Widht / 2 - 15, top: Height / 2 - 60}}
                    animating={loading ? true : false}
                    color={colors.white}
                    size={'large'}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{marginBottom: 45}}
                    ref={flatlist}
                    scrollEnabled
                    data={Page}
                    keyExtractor = {(item, index) => item.assignedDate + index.toString()}
                    renderItem={({ item }) => (
                        <View style={{height: 55, width: '100%', marginVertical: 1, justifyContent: 'center'}}>
                            <Pressable onPress={() => navigation.push('Page',
                                {
                                    pageID: item.key,
                                    chronicleID: itemID,
                                    emotionalStates: item.emotionalStates,
                                    emotionIcon: item.emotionIcon,
                                    Title: item.title,
                                    Date: item.assignedDate,
                                    Content: item.content,
                                    chronicleUnits: count + 1,
                                    languaje: languaje,
                                    Palette: Palette,
                                    textSettings: textSettings,
                                    Size: item.size,
                                    Color: item.color,
                                    aleatorySize: aleatorySize,
                                    icons: emotionIcons,
                                }
                            )}>
                                {/* <Text style={{position: 'absolute'}}>{moment(item.assignedDate.toDate()).format('LL')}</Text> */}
                                <Image
                                    source={require('../assets/Tree.png')}
                                    style={{
                                        tintColor: Palette[item.color],
                                        transform: [{ rotate: '-90deg' }],
                                        marginLeft: Widht / 7 * 6 - item.sizeData[0] / 2,
                                        height: item.sizeData[0],
                                        width: item.sizeData[1],
                                        opacity: item.content == '' && item.title == '' ? 0.7 : 1
                                    }}
                                />
                            </Pressable>
                        </View>
                    )}
                />
                <DateTimePickerModal
                    isVisible={dateModal}
                    mode={selectableHour}
                    onConfirm={(date) => {
                        if (date <= moment()) {
                            setAssignedDate(date)
                            setDateModal(false)
                            if (!aleatorySize) setSizeModal(true)
                            else setColorModal(true)
                        } else ToastAndroid.show(d, ToastAndroid.SHORT)
                    }}
                    onCancel={() => setDateModal(false)}
                />
                <Modal //Size Modal
                    isVisible={SizeModal}
                    onBackdropPress={() => setSizeModal(false)}
                    hideModalContentWhileAnimating={true}
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
                    <Button
                        title={c}
                        color={colors.grayBlue}
                        onPress={() => {setSize(size); setSizeModal(false); setColorModal(true)}}
                    />
                </Modal>
                <Modal //Color Modal
                    isVisible={ColorModal}
                    onBackdropPress={() => setColorModal(false)}
                    hideModalContentWhileAnimating={true}
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
                                <Image
                                    source={require('../assets/Tree.png')}
                                    style={{tintColor: Palette[color], height: height, width: width}}
                                />
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: colors.darkBlue,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            width: 280,
                            height: 80
                        }}>
                            <Pressable onPress={() => setColor(1)}>
                                <View style={{ backgroundColor: Palette[1], height: 65, width: 83 }}></View>
                            </Pressable>
                            <Pressable onPress={() => setColor(2)}>
                                <View style={{ backgroundColor: Palette[2], height: 65, width: 83 }}></View>
                            </Pressable>
                            <Pressable onPress={() => setColor(3)}>
                                <View style={{ backgroundColor: Palette[3], height: 65, width: 83 }}></View>
                            </Pressable>
                        </View>
                    </View>
                    <Button title={c} color={colors.grayBlue} onPress={newPage}/>
                </Modal>
                <Modal //Tutorial
                    isVisible={tutorialModal}
                    onBackdropPress={() => setTutorialModal(false)}
                    hideModalContentWhileAnimating
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
                            <Image source={require('../assets/arrow.png')} style={{height: 15, width: 20, marginRight: 7, marginBottom: 5, tintColor: colors.darkBlue, transform: [{ rotate: '270deg' }] }}/>
                            <Image source={require('../assets/hand.png')} style={{height: 55, width: 55, tintColor: colors.darkBlue}}/>
                            <Text style={{...fonts.normalGray18, textAlign: 'center', marginHorizontal: 45, marginVertical: 24 }}>{e}</Text>
                            <Text
                                onPress={() => firestore().collection('Users').doc(userID).update({'tutorial': [tutorial[0], false]})}
                                style={{...fonts.normalGray18, position: 'absolute', right: 30, bottom: 20 }}
                            >Ok</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </GestureRecognizer>
    );
}

export default HorizontalChronicle;