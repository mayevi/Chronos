import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Animated, Dimensions } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const ChroniclePreferences = ({route, navigation}) => {

    const { theme, paletteColors, languaje, state, items, action, docID, docTitle, preferences, image } = route.params;
    const Widht = Dimensions.get('window').width - 40

    const [enableAleatorySize, setEnableAleatorySize] = useState(preferences[0]);
    const [enableEmotionIcon, setEnableEmotionIcon] = useState(preferences[1]);
    const [enableSelectableHour, setEnableSelectableHour] = useState(preferences[2]);

    useEffect(() => {
        if (enableSelectableHour) setHour('datetime')
        else setHour('date')
    }, )
    const [Hour, setHour] = useState('date')

    useEffect(() => {
        switch (languaje) {
            case 'English':
                setA('Article preferences'); setB('Aleatory size'); setC('Emotion icons'); setD('Next')
                setE('By default, you can select the size manually.')
                setF('Add a icon to each article according to your emotional state.')
                setG('Selectable Hour'); setH('Select manually the hour of each article.')
                break;
            case 'Spanish':
                setA('Preferencias de artículo'); setB('Tamaño aleatorio'); setC('Iconos de Emociones'); setD('Seguir')
                setE('Por defecto, puedes escoger el tamaño manualmente.')
                setF('Agrega un icono a cada artículo acorde a tu estado emocional.')
                setG('Hora Seleccionable'); setH('Selecciona manualmente la hora de cada artículo.')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')
    const [f, setF] = useState('')
    const [g, setG] = useState('')
    const [h, setH] = useState('')

    const aleatorySize = useRef(new Animated.Value(5)).current;
    const emotionIcon = useRef(new Animated.Value(5)).current;
    const selectableHour = useRef(new Animated.Value(5)).current;

    useEffect(() => {
        if (enableAleatorySize) Animated.timing(aleatorySize, { toValue: 35, duration: 500, useNativeDriver: false }).start()
        else Animated.timing(aleatorySize, { toValue: 5, duration: 800, useNativeDriver: false }).start()
        if (enableEmotionIcon) Animated.timing(emotionIcon, { toValue: 35, duration: 500, useNativeDriver: false }).start()
        else Animated.timing(emotionIcon, { toValue: 5, duration: 800, useNativeDriver: false }).start()
        if (enableSelectableHour) Animated.timing(selectableHour, { toValue: 35, duration: 500, useNativeDriver: false }).start()
        else Animated.timing(selectableHour, { toValue: 5, duration: 800, useNativeDriver: false }).start()
    }, )

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
                marginRight: 25,
            }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22, marginLeft: 20, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <Text
                    onPress={() => navigation.navigate('Name',
                        {
                            selectableUnitSize: enableAleatorySize,
                            emotionStateIcons: enableEmotionIcon,
                            selectableHour: Hour,
                            theme: theme,
                            palette: paletteColors,
                            languaje: languaje,
                            docTitle: docTitle,
                            state: state,
                            action: action,
                            docID: docID,
                            chronicleImage: image,
                            items: items,
                            units: 0
                        }
                    )}
                    style={{...fonts.normalDark15, marginTop: 15, opacity: 0.7}}
                >{d}</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', width: Widht, marginTop: 100, height: 400 }}>
                <Text style={{...fonts.normalDark22, marginLeft: 20}}>{a}</Text>
                <View style={{
                    marginLeft: 30,
                    marginTop: 20,
                    marginBottom: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{width: '75%'}}>
                        <Text style={fonts.normalDark18}>{b}</Text>
                        <Text style={fonts.normalGray13}>{e}</Text>
                    </View>
                    <Pressable onPress={() => setEnableAleatorySize(State => !State)}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            height: 30,
                            width: 60,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: enableAleatorySize ? colors.otroBlue : colors.grayBlue
                        }}>
                            <Animated.View style={{
                                backgroundColor: enableAleatorySize ? colors.otroBlue : colors.grayBlue,
                                marginLeft: aleatorySize,
                                height: 20,
                                width: 20,
                                borderRadius: 12.5,
                            }}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{
                    marginLeft: 30,
                    marginBottom: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{width: '70%'}}>
                        <Text style={fonts.normalDark18}>{c}</Text>
                        <Text style={fonts.normalGray13}>{f}</Text>
                    </View>
                    <Pressable onPress={() => setEnableEmotionIcon(State => !State)}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            height: 30,
                            width: 60,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: enableEmotionIcon ? colors.otroBlue : colors.grayBlue
                        }}>
                            <Animated.View style={{
                                backgroundColor: enableEmotionIcon ? colors.otroBlue : colors.grayBlue,
                                marginLeft: emotionIcon,
                                height: 20,
                                width: 20,
                                borderRadius: 12.5,
                            }}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{
                    marginLeft: 30,
                    marginBottom: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{width: '70%'}}>
                        <Text style={fonts.normalDark18}>{g}</Text>
                        <Text style={fonts.normalGray13}>{h}</Text>
                    </View>
                    <Pressable onPress={() => setEnableSelectableHour(State => !State)}>
                        <View style={{
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            height: 30,
                            width: 60,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: enableSelectableHour ? colors.otroBlue : colors.grayBlue
                        }}>
                            <Animated.View style={{
                                backgroundColor: enableSelectableHour ? colors.otroBlue : colors.grayBlue,
                                marginLeft: selectableHour,
                                height: 20,
                                width: 20,
                                borderRadius: 12.5,
                            }}/>
                        </View>
                    </Pressable>
                </View>
                {/* <View style={{
                    marginLeft: 30,
                    marginBottom: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={fonts.normalDark18}>Background Template</Text>
                    <Switch
                        trackColor={{ false: colors.white, true: colors.white }}
                        thumbColor={changeTemplate ? colors.darkBlue : colors.grayBlue}
                        onValueChange={toggleSwitch3}
                        value={changeTemplate}
                    />
                </View> */}
            </View>
        </View>
    );
}

export default ChroniclePreferences;