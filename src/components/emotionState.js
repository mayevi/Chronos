import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, ToastAndroid, Animated, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Negative = (props) => {
    return(
        <Text
            onPress={props.onPress}
            style={{ color: props.state ? '#FF4141' : colors.grayBlue, fontSize: props.state ? 18 : 16,
        }}>{props.name}</Text>
    )
}
const Positive = (props) => {
    return(
        <Text 
            onPress={props.onPress}
            style={{ color: props.state ? '#76DEA2' : colors.grayBlue, fontSize: props.state ? 20 : 18 }}
        >{props.name}</Text>
    )
}

const EmotionState = ({route, navigation}) => {

    const { pageID, chronicleID, Title, Content, Size, Palette, emotionalStates, emotionIcon, chronicleUnits, languaje, Color, aleatorySize, icons, Year, Month } = route.params;

    const [state, setstate] = useState(true)
    const [emotions, setEmotions] = useState([])

    const [angry, setAngry] = useState(false)
    const [boring, setBoring] = useState(false)
    const [depressed, setDepressed] = useState(false)
    const [exhausted, setExhausted] = useState(false)
    const [inquire, setInquire] = useState(false)
    const [lonely, setLonely] = useState(false)
    const [scared, setScared] = useState(false)
    const [tired, setTired] = useState(false)
    const [worried, setWorried] = useState(false)
    const [annoying, setAnnoying] = useState(false)
    const [confused, setConfused] = useState(false)
    const [disappointed, setDisappointed] = useState(false)
    const [frustrated, setFrustrated] = useState(false)
    const [insecure, setInsecure] = useState(false)
    const [resentful, setResentful] = useState(false)
    const [stressed, setStressed] = useState(false)
    const [uncomfortable, setUncomfortable] = useState(false)
    const [ashamed, setAshamed] = useState(false)
    const [demoralized, setDemoralized] = useState(false)
    const [disgusted, setDisgusted] = useState(false)
    const [guilty, setGuilty] = useState(false)
    const [jealous, setJealous] = useState(false)
    const [sad, setSad] = useState(false)
    const [terrified, setTerrified] = useState(false)
    const [unhappy, setUnhappy] = useState(false)

    const [calmed, setCalmed] = useState(false)
    const [enthusiastic, setEnthusiastic] = useState(false)
    const [grateful, setGrateful] = useState(false)
    const [inspired, setInspired] = useState(false)
    const [motivated, setMotivated] = useState(false)
    const [passionate, setPassionate] = useState(false)
    const [relieved, setRelieved] = useState(false)
    const [surprised, setSurprised] = useState(false)
    const [cheerful, setCheerful] = useState(false)
    const [euphoric, setEuphoric] = useState(false)
    const [happy, setHappy] = useState(false)
    const [loved, setLoved] = useState(false)
    const [optimistic, setOptimistic] = useState(false)
    const [relaxed, setRelaxed] = useState(false)
    const [satisfied, setSatisfied] = useState(false)
    const [understood, setUnderstood] = useState(false)

    const Array = (emotion, Function, stringEmotion) => {
        if (emotions.length == 3) {
            if (emotion) emotions.splice(emotions.indexOf(stringEmotion), 1), Function(false)
            else ToastAndroid.show(d, ToastAndroid.SHORT)
        } else {
            if (emotion) emotions.splice(emotions.indexOf(stringEmotion), 1), Function(false)
            else emotions.push(stringEmotion), Function(true)
        }
    }

    const goToPage = () => {
        firestore().collection('Pages').doc(pageID).update(
                {'emotionalStates': {aa: emotions[0], bb: emotions[1], cc: emotions[2]}, 'emotionIcon': emotionIcon})
            .then(navigation.push('Page',
                {
                    emotionalStates: {aa: emotions[0], bb: emotions[1], cc: emotions[2]},
                    emotionIcon: emotionIcon,
                    pageID: pageID,
                    chronicleID: chronicleID,
                    Title: Title,
                    Content: Content,
                    Size: Size,
                    Palette: Palette,
                    chronicleUnits: chronicleUnits,
                    Color: Color,
                    aleatorySize: aleatorySize,
                    icons: icons,
                    Year: Year,
                    Month: Month,
                    languaje: languaje,
                }
            )
        )
    }

    useEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Add'); setB('Negative'); setC('Positive'); setD('You can only choose 3 emotions')
            setE('Calmed'); setF('Enthusiastic'); setG('Grateful'); setH('Inspired'); setI('Motivated'); setJ('Passionate')
            setK('Relieved'); setL('Surprised'); setM('Cheerful'); setN('Euphoric'); setO('Happy'); setP('Loved'); setQ('Optimistic')
            setR('Relaxed'); setS('Satisfied'); setT('Understood'); setU('Angry'); setV('Boring'); setW('Depressed'); setX('Exhausted')
            setY('Inquire'); setZ('Lonely'); setAA('Scared'); setBB('Tired'); setCC('Worried'); setDD('Annoying'); setEE('Confused')
            setFF('Disappointed'); setGG('Frustrated'); setHH('Insecure'); setII('Resentful'); setJJ('Stressed'); setKK('Uncomfortable')
            setLL('Ashamed'); setMM('Demoralized'); setNN('Disgusted'); setOO('Guilty'); setPP('Jealous'); setQQ('Sad')
            setRR('Terrified'); setSS('Unhappy')
                break;
            case 'Spanish':
            setA('Añadir'); setB('Negativo'); setC('Positivo'); setD('Solo puedes escoger 3 emociones')
            setE('Tranquilo'); setF('Entusiasmado'); setG('Agradecido'); setH('Inspirado'); setI('Motivado'); setJ('Apasionado')
            setK('Aliviado'); setL('Sorprendido'); setM('Alegre'); setN('Euforico'); setO('Feliz'); setP('Amado')
            setQ('Optimista'); setR('Relajado'); setS('Satisfecho'); setT('Comprendido'); setU('Enojado'); setV('Aburrido')
            setW('Deprimido'); setX('Cansado'); setY('Confundido'); setZ('Solitario'); setAA('Asustado'); setBB('Cansado')
            setCC('Preocupado'); setDD('Molesto'); setEE('Confundido'); setFF('Decepcionado'); setGG('Frustrado'); setHH('Inseguro')
            setII('Resentido'); setJJ('Estresado'); setKK('Incomodo'); setLL('Avergonzado'); setMM('Desmoralizado'); setNN('Disgustado')
            setOO('Culpable'); setPP('Celoso'); setQQ('Triste'); setRR('Aterrado'); setSS('Infeliz')
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
    const [y, setY] = useState(''); const [z, setZ] = useState('')
    const [AA, setAA] = useState(''); const [BB, setBB] = useState(''); const [CC, setCC] = useState(''); const [DD, setDD] = useState('')
    const [EE, setEE] = useState(''); const [FF, setFF] = useState(''); const [GG, setGG] = useState(''); const [HH, setHH] = useState('')
    const [II, setII] = useState(''); const [JJ, setJJ] = useState(''); const [KK, setKK] = useState(''); const [LL, setLL] = useState('')
    const [MM, setMM] = useState(''); const [NN, setNN] = useState(''); const [OO, setOO] = useState(''); const [PP, setPP] = useState('')
    const [QQ, setQQ] = useState(''); const [RR, setRR] = useState(''); const [SS, setSS] = useState(''); const [TT, setTT] = useState('')
    const [UU, setUU] = useState(''); const [VV, setVV] = useState(''); const [WW, setWW] = useState(''); const [XX, setXX] = useState('')
    const [YY, setYY] = useState(''); const [ZZ, setZZ] = useState('')

    const Width = Dimensions.get('window').width

    const Height = useRef(new Animated.Value(250)).current;
    const Bar = useRef(new Animated.Value(Width / 2 - 20)).current;
    const negativeOpacity = useRef(new Animated.Value(0)).current;
    const positiveOpacity = useRef(new Animated.Value(1)).current;

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo, position: 'relative' }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 20,
                width: Width - 40,
            }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image style={{ width: 20, height: 20, opacity: 0.7 }} source={require('../assets/left-arrow.png')}/>
                </Pressable>
                <Text onPress={goToPage} style={fonts.normalGray15}>{a}</Text>
            </View>
            {/* <Text>{JSON.stringify(emotions)}</Text> */}
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginRight: 20, marginLeft: 20 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row'}}>
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={ emotionIcon == 'Euphoric'
                                    ? require('../assets/euphoric.png')
                                    : require('../assets/grayEuphoric.png')
                                }
                            />
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={ emotionIcon == 'Happy' ? require('../assets/happy.png') : require('../assets/grayHappy.png')}
                            />
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={emotionIcon == 'Normal' ? require('../assets/normal.png') : require('../assets/grayNormal.png')}
                            />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={ emotionIcon == 'Sad' ? require('../assets/sad.png') : require('../assets/graySad.png')}
                            />
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={ emotionIcon == 'Depressed'
                                    ? require('../assets/depressed.png')
                                    : require('../assets/grayDepresed.png')
                                }
                            />
                            <Image
                                style={{ width: Width / 5, height: Width / 5, margin: 2 }}
                                source={ emotionIcon == 'Angry' ? require('../assets/angry.png') : require('../assets/grayAngry.png')}
                            />
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                    <View style={{
                        backgroundColor: colors.white,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        width: '100%',
                        height: 45
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '50%' }}>
                            <Pressable onPress={() => {
                                setstate(false);
                                Animated.timing(Height, { toValue: 320, duration: 800, useNativeDriver: false }).start()
                                Animated.timing(Bar, { toValue: - Width / 2 + 20, duration: 800, useNativeDriver: false }).start()
                                Animated.timing(negativeOpacity, { toValue: 1, duration: 800, useNativeDriver: false }).start()
                                Animated.timing(positiveOpacity, { toValue: 0, duration: 800, useNativeDriver: false }).start()
                            }}>
                                <Text style={fonts.mediumGray22}>{b}</Text>
                            </Pressable>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '50%' }}>
                            <Text
                                onPress={() => {
                                    setstate(true);
                                    Animated.timing(Height, { toValue: 250, duration: 800, useNativeDriver: false }).start()
                                    Animated.timing(Bar, { toValue: Width / 2 - 20, duration: 800, useNativeDriver: false }).start()
                                    Animated.timing(negativeOpacity, { toValue: 0, duration: 800, useNativeDriver: false }).start()
                                    Animated.timing(positiveOpacity, { toValue: 1, duration: 800, useNativeDriver: false }).start()
                                }}
                                style={fonts.mediumGray22}
                            >{c}</Text>
                        </View>
                    </View>
                    <Animated.View style={{
                        // alignSelf: 'flex-start',
                        marginLeft: Bar,
                        borderColor: colors.otroBlue,
                        borderBottomWidth: 2.5,
                        width: '50%',
                    }}/>
                    <Animated.View style={{
                        backgroundColor: colors.white,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        padding: 15,
                        width: '100%',
                        height: Height
                    }}>
                        <Animated.View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            position: state ? 'relative' : 'absolute',
                            opacity: positiveOpacity,
                            height: state ? 250 : 0,
                            width: state ? '100%' : 0
                        }}>
                            <View>
                                <Positive onPress={() => Array(calmed, setCalmed, ['Calmed', 'Tranquilo'])} state={calmed} name={e}/>
                                <Positive onPress={() => Array(enthusiastic, setEnthusiastic, ['Enthusiastic', 'Entusiasmado'])} state={enthusiastic} name={f}/>
                                <Positive onPress={() => Array(grateful, setGrateful, ['Grateful', 'Agradecido'])} state={grateful} name={g}/>
                                <Positive onPress={() => Array(inspired, setInspired, ['Inspired', 'Inspirado'])} state={inspired} name={h}/>
                                <Positive onPress={() => Array(motivated, setMotivated, ['Motivated', 'Motivado'])} state={motivated} name={i}/>
                                <Positive onPress={() => Array(passionate, setPassionate, ['Passionate', 'Apasionado'])} state={passionate} name={j}/>
                                <Positive onPress={() => Array(relieved, setRelieved, ['Relieved', 'Aliviado'])} state={relieved} name={k}/>
                                <Positive onPress={() => Array(surprised, setSurprised, ['Surprised', 'Sorprendido'])} state={surprised} name={l}/>
                            </View>
                            <View> 
                                <Positive onPress={() => Array(cheerful, setCheerful, ['Cheerful', 'Alegre'])} state={cheerful} name={m}/>
                                <Positive onPress={() => Array(euphoric, setEuphoric, ['Euphoric', 'Euforico'])} state={euphoric} name={n}/>
                                <Positive onPress={() => Array(happy, setHappy, ['Happy', 'Feliz'])} state={happy} name={o}/>
                                <Positive onPress={() => Array(loved, setLoved, ['Loved', 'Amado'])} state={loved} name={p}/>
                                <Positive onPress={() => Array(optimistic, setOptimistic, ['Optimistic', 'Optimista'])} state={optimistic} name={q}/>
                                <Positive onPress={() => Array(relaxed, setRelaxed, ['Relaxed', 'Relajado'])} state={relaxed} name={r}/>
                                <Positive onPress={() => Array(satisfied, setSatisfied, ['Satisfied', 'Satisfecho'])} state={satisfied} name={s}/>
                                <Positive onPress={() => Array(understood, setUnderstood, ['Understood', 'Comprendido'])} state={understood} name={t}/>
                            </View>
                        </Animated.View>
                        <Animated.View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            position: !state ? 'relative' : 'absolute',
                            opacity: negativeOpacity,
                            height: !state ? 250 : 0,
                            width: !state ? '100%' : 0
                        }}>
                            <View>
                                <Negative onPress={() => Array(angry, setAngry, ['Angry', 'Enojado'])} state={angry} name={u}/>
                                <Negative onPress={() => Array(boring, setBoring, ['Boring', 'Aburrido'])} state={boring} name={v}/>
                                <Negative onPress={() => Array(depressed, setDepressed, ['Depressed', 'Deprimido'])} state={depressed} name={w}/>
                                <Negative onPress={() => Array(exhausted, setExhausted, ['Exhausted', 'Exhausto'])} state={exhausted} name={x}/>
                                <Negative onPress={() => Array(inquire, setInquire, ['Inquire', 'Curioso'])} state={inquire} name={y}/>
                                <Negative onPress={() => Array(lonely, setLonely, ['Lonely', 'Solitario'])} state={lonely} name={z}/>
                                <Negative onPress={() => Array(scared, setScared, ['Scared', 'Asustado'])} state={scared} name={AA}/>
                                <Negative onPress={() => Array(tired, setTired, ['Tired', 'Cansado'])} state={tired} name={BB}/>
                                <Negative onPress={() => Array(worried, setWorried, ['Worried', 'Preocupado'])} state={worried} name={CC}/>
                                <Negative onPress={() => Array(annoying, setAnnoying, ['Annoying', 'Molesto'])} state={annoying} name={DD}/>
                                <Negative onPress={() => Array(confused, setConfused, ['Confused', 'Confundido'])} state={confused} name={EE}/>
                                <Negative onPress={() => Array(disappointed, setDisappointed, ['Disappointed', 'Decepcionado'])} state={disappointed} name={FF}/>
                                <Negative onPress={() => Array(frustrated, setFrustrated, ['Frustrated', 'Frustrado'])} state={frustrated} name={GG}/>
                            </View>
                            <View>
                                <Negative onPress={() => Array(insecure, setInsecure, ['Insecure', 'Inseguro'])} state={insecure} name={HH}/>
                                <Negative onPress={() => Array(resentful, setResentful, ['Resentful', 'Resentido'])} state={resentful} name={II}/>
                                <Negative onPress={() => Array(stressed, setStressed, ['Stressed', 'Estresado'])} state={stressed} name={JJ}/>
                                <Negative onPress={() => Array(uncomfortable, setUncomfortable, ['Uncomfortable', 'Incomodo'])} state={uncomfortable} name={KK}/>
                                <Negative onPress={() => Array(ashamed, setAshamed, ['Ashamed', 'Avergonzado'])} state={ashamed} name={LL}/>
                                <Negative onPress={() => Array(demoralized, setDemoralized, ['Demoralized', 'Desmoralizado'])} state={demoralized} name={MM}/>
                                <Negative onPress={() => Array(disgusted, setDisgusted, ['Disgusted', 'Disgustado'])} state={disgusted} name={NN}/>
                                <Negative onPress={() => Array(guilty, setGuilty, ['Guilty', 'Culpable'])} state={guilty} name={OO}/>
                                <Negative onPress={() => Array(jealous, setJealous, ['Jealous', 'Celoso'])} state={jealous} name={PP}/>
                                <Negative onPress={() => Array(sad, setSad, ['Sad', 'Triste'])} state={sad} name={QQ}/>
                                <Negative onPress={() => Array(terrified, setTerrified, ['Terrified', 'Aterrado'])} state={terrified} name={RR}/>
                                <Negative onPress={() => Array(unhappy, setUnhappy, ['Unhappy', 'Infeliz'])} state={unhappy} name={SS}/>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
}

export default EmotionState;