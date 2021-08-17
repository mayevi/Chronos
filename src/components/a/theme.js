import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Image, ToastAndroid, Dimensions } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Theme = ({route, navigation}) => {

    const { languaje, state, items, action, docID, docTitle, theme, palette, preferences } = route.params;

    const Widht = Dimensions.get('window').width - 40

    const [State, setState] = useState(false);
    const [Theme, setTheme] = useState(theme);

    const [itemType, setItemType] = useState(state)

    const selectTheme = (theme) => {
        if (Theme == theme) setTheme('')
        else setTheme(theme)
    }

    useEffect(() => {
        if (Theme == '') setState(false)
        else setState(true)
    }, )

    const Next = () => {
        if (State) {
            if (Theme == 'Circles') navigation.navigate('Aparience', {theme: Theme, languaje: languaje, items: items, state: itemType, action: action, docID: docID, docTitle: docTitle, palette: palette, preferences: preferences})
            else if (Theme == 'Diamonds') navigation.navigate('Aparience', {theme: Theme, languaje: languaje, item: items, state: itemType, action: action, docID: docID, docTitle: docTitle, palette: palette, preferences: preferences})
            else if (Theme == 'Trees') navigation.navigate('Aparience', {theme: Theme, languaje: languaje, items: items, state: itemType, action: action, docID: docID, docTitle: docTitle, palette: palette, preferences: preferences})
            else alert(error)
        } else ToastAndroid.show(e, ToastAndroid.SHORT)
    }

    useEffect(() => {
        switch (languaje) {
            case 'English':
                setA('Style. '); setB('Theme. '); setC('Aparience'); setD('Next'); setE('Choose a theme to continue')
                break;
            case 'Spanish':
                setA('Estilo. '); setB('Tema. '); setC('Apariencia'); setD('Seguir'); setE('Escoge un tema para poder continuar')
                break;
        }
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
                marginRight: 25,
            }}>
                {/* <Text>{JSON.stringify(palette)}</Text> */}
                <Pressable onPress={() => navigation.navigate('Style')}>
                    <Image
                        style={{ width: 22, height: 22, marginLeft: 20, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <Text onPress={Next} style={{...fonts.normalDark15, marginTop: 15, opacity: State ? 0.7 : 0.3}}>{d}</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
                marginRight: 20
            }}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={fonts.normalDark22}>{a}</Text>
                    <Text style={State ? fonts.normalDark22 : fonts.normalGray22}>{b}</Text>
                    <Text style={fonts.normalGray22}>{c}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ScrollView style={{ height: 445 }}>
                        <Pressable onPress={() => selectTheme('Circles')}>
                            <Image
                                source={require('../assets/Circles.png')}
                                style={{
                                    opacity: Theme == 'Circles' ? 1 : 0.5,
                                    width: Widht,
                                    height: 125,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectTheme('Diamonds')}>
                            <Image
                                source={require('../assets/Squares.png')}
                                style={{
                                    opacity: Theme == 'Diamonds' ? 1 : 0.5,
                                    width: Widht,
                                    height: 125,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectTheme('Trees')}>
                            <Image
                                source={require('../assets/Garden.png')}
                                style={{
                                    opacity: Theme == 'Trees' ? 1 : 0.5,
                                    width: Widht,
                                    height: 125,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Theme;