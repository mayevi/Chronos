import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Button, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import RNSecureStore from "react-native-secure-store";
import moment from '../../node_modules/moment';
import MiniSlider from "../resources/miniSlider";
import Modal from 'react-native-modal';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const VerticalChronicle = ({route, navigation}) => {

    const { fusionID, chronicleID, Palette, languaje, textSettings, aleatorySize, emotionIcons, selectableHour, theme } = route.params;

    const Width = Dimensions.get('window').width

    useEffect(() => {
        RNSecureStore.get("userID").then(res => { if (res !== null) {
            setUserID(res)
        }}, err => console.log(err))
    }, [])

    useEffect(() => {
        firestore().collection('Articles').where('chronicleID', '==', chronicleID).onSnapshot(doc => {
            const article = [];
            doc.forEach(doc => {
                article.push({ ...doc.data(), key: doc.id })
                // setYears(doc.data().year)
            })
            doc.forEach(doc => {
                // article.push({ ...doc.data(), key: doc.id })
                setYears(doc.data().year)
            })
            setArticle(article);
        });
    }, )

    useEffect(() => {
        if (aleatorySize) setSize(Math.floor(Math.random() * (Math.floor(1) - Math.ceil(6)) + Math.ceil(6)))
    }, [])

    const [article, setArticle] = useState([]);
    const [userID, setUserID] = useState('')
    const flatlist = useRef(null);
    const count = article.length
    const chronicleUnits = article.length + 1

    //Add Article
    const [loading, setLoading] = useState(false)

    const [color, setColor] = useState(Palette[2])
    const [size, setSize] = useState(1);
    const [assignedDate, setAssignedDate] = useState('')

    const newArticle = () => {
        const articleDataWithEmotions = {
            userID: userID,
            fusionID: fusionID,
            chronicleID: chronicleID,
            title: '',
            content: '',
            color: color,
            size: size,
            sizeData: [height, width, borderRadius, rotate, padding],
            emotionIcon: '',
            emotionalStates: [],
            year: JSON.parse(articleYear),
            month: articleMonth,
            assignedDate: assignedDate,
            articleDate: moment().format('LLLL'),
        }
        const articleData = {
            userID: userID,
            fusionID: fusionID,
            chronicleID: chronicleID,
            title: '',
            content: '',
            color: color,
            size: size,
            sizeData: [height, width, borderRadius, rotate, padding],
            year: JSON.parse(articleYear),
            month: articleMonth,
            assignedDate: assignedDate,
            articleDate: moment().format('LLLL'),
        }
        setColor(color)
        setColorModal(false)
        setLoading(true)
        firestore().collection('Articles').doc().set(emotionIcons ? articleDataWithEmotions : articleData).then(() => {
            firestore().collection('Chronicles').doc(chronicleID).update({'units': chronicleUnits})
            setSize(Math.floor(Math.random() * (Math.floor(1) - Math.ceil(6)) + Math.ceil(6)))
        }).then(setLoading(false))
    }

    useEffect(() => {
        firestore().collection('Articles').orderBy('assignedDate', 'asc')
    }, [])

    //Date Selector
    const [selector, setSelector] = useState(false)
    const [state, setState] = useState(false)

    useEffect(() => {
        setActualMonth(moment().format('MMMM'))
        setActualYear(moment().format('YYYY'))
    }, [])

    // useEffect(() => {
    //     flatlist.current.scrollToItem({viewPosition: 0, item: Articles.})
    // }, )

    const [actualMonth, setActualMonth] = useState('')
    const [actualYear, setActualYear] = useState()

    
    const [Years, setYears] = useState([2015, 2016, 2017, 2018, 2019, 2020, 2021])
    const Months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    //DateTime Picker
    const [dateModal, setDateModal] = useState(false);
    const [articleYear, setArticleYear] = useState()
    const [articleMonth, setArticleMonth] = useState()

    const confirmDate = (date) => {
        if (date <= moment()) {
            setAssignedDate(moment(date).format('LLLL'))
            setArticleYear(moment(date).format('YYYY'))
            setArticleMonth(moment(date).format('MMMM'))
            setDateModal(false)
            if (!aleatorySize) setSizeModal(true)
            else setColorModal(true)
        } else ToastAndroid.show(d, ToastAndroid.SHORT) 
    };

    //Modal
    const [SizeModal, setSizeModal] = useState(false)
    const [ColorModal, setColorModal] = useState(false)

    const [height, setHeight] = useState()
    const [width, setWidth] = useState()
    const [borderRadius, setBorderRadius] = useState()
    const [rotate, setRotate] = useState()
    const [padding, setPadding] = useState()

    const SizeSettings = [height, width, borderRadius, rotate]

    useEffect(() => {
        switch (theme) {
            case 'Circles':
                setBorderRadius(height / 2)
                setRotate(0)
            switch (size) {
                case 1: setHeight(35); setWidth(35); setPadding(0)
                    break;
                case 2: setHeight(40); setWidth(40); setPadding(5)
                    break;
                case 3: setHeight(45); setWidth(45); setPadding(10)
                    break;
                case 4: setHeight(50); setWidth(50); setPadding(15)
                    break;
                case 5: setHeight(55); setWidth(55); setPadding(20)
                    break;
            }
                break;
            case 'Diamonds':
                setBorderRadius(6)
                setRotate(45);
            switch (size) {
                case 1: setHeight(30); setWidth(30); setPadding(0)
                    break;
                case 2: setHeight(35); setWidth(35); setPadding(5)
                    break;
                case 3: setHeight(40); setWidth(40); setPadding(10)
                    break;
                case 4: setHeight(45); setWidth(45); setPadding(15)
                    break;
                case 5: setHeight(50); setWidth(50); setPadding(12.5)
                    break;
            }
                break;
        }
    }, )

    useEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Today'); setB('Units'); setC('Next'); setD('You cannot select a day in the future')
            setE('January'); setF('February'); setG('March'); setH('April'); setI('May'); setJ('June'); setK('July')
            setL('August'); setM('September'); setN('October'); setO('November'); setP('December')
                break;
            case 'Spanish':
            setA('Hoy'); setB('Units'); setC('Seguir'); setD('No puedes seleccionar un día en el futuro')
            setE('Enero'); setF('Febrero'); setG('Marzo'); setH('Abril'); setI('Mayo'); setJ('Junio'); setK('Julio')
            setL('Agosto'); setM('Septiembre'); setN('Octubre'); setO('Noviembre'); setP('Diciembre')
                break;
        }
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')

    const [e, setE] = useState(''); const [f, setF] = useState(''); const [g, setG] = useState(''); const [h, setH] = useState('')
    const [i, setI] = useState(''); const [j, setJ] = useState(''); const [k, setK] = useState(''); const [l, setL] = useState('')
    const [m, setM] = useState(''); const [n, setN] = useState(''); const [o, setO] = useState(''); const [p, setP] = useState('')

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={colors.white} size={'large'}/>
            </View>
        )
    } else {
        return (
            <GestureRecognizer
                onSwipeUp={() => setDateModal(true)}
                config={{velocityThreshold: 0.5, directionalOffsetThreshold: 40, gestureIsClickThreshold: 8}}
                style={{flex: 1, backgroundColor: Palette[0], position: 'relative' }}
            >
                <StatusBar hidden/>
                <View style={{ backgroundColor: colors.azulDeFondo, opacity: state ? 1 : 0 }}>
                    <FlatList
                        style={{height: state ? 45 : 0}}
                        data={selector ? Years : Months}
                        keyExtractor={item => JSON.stringify(item)}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled
                        horizontal
                        renderItem={({ item }) => (
                            <Text
                                onPress={() => {
                                    selector ? setActualYear(item) : setActualMonth(item)
                                    flatlist.current.scrollToEnd()
                                    setState(false)
                                }}
                                style={fonts.normalDark16, {marginHorizontal: 10, alignSelf: 'center'}}
                            >{item}</Text>
                        )}
                    />
                </View>
                <View style={{
                    backgroundColor: colors.azulDeFondo,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 45,
                    opacity: state ? 0 : 1
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
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text onPress={() => {setState(true); setSelector(false)}} style={fonts.normalDark16}>{actualMonth}</Text>
                        <Text style={fonts.normalDark16}>   |   </Text>
                        <Text onPress={() => {setState(true); setSelector(true)}} style={fonts.normalDark16}>{actualYear}</Text>
                    </View> */}
                    <Text onPress={() => {setState(true); setSelector(false)}} style={fonts.normalDark16}
                    >{actualMonth} - {actualYear}</Text>
                    <TouchableOpacity>
                        <View style={{
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: colors.darkBlue,
                        }}>
                            <Text  onPress={() => flatlist.current.scrollToEnd()} style={fonts.normalDark12}>{a}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center', flexDirection: 'row', height: '100%', marginTop: 0 }}>
                    <FlatList
                        ref={flatlist}
                        style={{marginBottom: 45}}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled
                        data={article}
                        keyExtractor = {(item, index) => item.year+item.month+index.toString()}
                        renderItem={({ item }) => (
                            // <View style={{ alignSelf: 'center', height: 75, marginVertical: 1, paddingBottom: item.sizeData[4], backgroundColor: colors.white}}>
                            <View style={{ height: 70, marginVertical: 1}}>
                                <Pressable onPress={() => navigation.push('Article',
                                    {
                                        articleID: item.key,
                                        chronicleID: chronicleID,
                                        emotionalStates: item.emotionalStates,
                                        emotionIcon: item.emotionIcon,
                                        Title: item.title,
                                        Date: item.assignedDate,
                                        Content: item.content,
                                        chronicleUnits: chronicleUnits,
                                        languaje: languaje,
                                        Palette: Palette,
                                        textSettings: textSettings,
                                        Size: item.size,
                                        Color: item.color,
                                        aleatorySize: aleatorySize,
                                        icons: emotionIcons,
                                        Year: item.year,
                                        Month: item.month
                                    }
                                )}>
                                    <MiniSlider
                                        color={item.color}
                                        height={item.sizeData[0]}
                                        width={item.sizeData[1]}
                                        borderRadius={item.sizeData[2]}
                                        minPosition={Width / 4}
                                        maxPosition={Width / 4 * 3}
                                    />
                                </Pressable>
                            </View>
                        )}
                    />
                    <DateTimePickerModal
                        isVisible={dateModal}
                        mode={selectableHour}
                        onConfirm={confirmDate}
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
                                    <View style={{
                                        backgroundColor: Palette[2],
                                        height: SizeSettings[0],
                                        width: SizeSettings[1],
                                        borderRadius: SizeSettings[2],
                                        rotation: SizeSettings[3]
                                    }}/>
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
                                <Text onPress={() => setSize(1)} style={{ color: size == 2 ? colors.white : colors.grayBlue, fontSize: 35 }}>2</Text>
                                <Text onPress={() => setSize(1)} style={{ color: size == 3 ? colors.white : colors.grayBlue, fontSize: 35 }}>3</Text>
                                <Text onPress={() => setSize(1)} style={{ color: size == 4 ? colors.white : colors.grayBlue, fontSize: 35 }}>4</Text>
                                <Text onPress={() => setSize(1)} style={{ color: size == 5 ? colors.white : colors.grayBlue, fontSize: 35 }}>5</Text>
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
                                    <View style={{
                                        backgroundColor: color,
                                        height: SizeSettings[0],
                                        width: SizeSettings[1],
                                        borderRadius: SizeSettings[2],
                                        rotation: SizeSettings[3]
                                    }}/>
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
                                <Pressable onPress={() => setColor(Palette[1])}>
                                    <View style={{ backgroundColor: Palette[1], height: 65, width: 83 }}></View>
                                </Pressable>
                                <Pressable onPress={() => setColor(Palette[2])}>
                                    <View style={{ backgroundColor: Palette[2], height: 65, width: 83 }}></View>
                                </Pressable>
                                <Pressable onPress={() => setColor(Palette[3])}>
                                    <View style={{ backgroundColor: Palette[3], height: 65, width: 83 }}></View>
                                </Pressable>
                            </View>
                        </View>
                        <Button title={c} color={colors.grayBlue} onPress={newArticle}/>
                    </Modal>
                </View>
            </GestureRecognizer>
        );
    }
}

export default VerticalChronicle;