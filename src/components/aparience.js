import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Image, ToastAndroid, Dimensions } from 'react-native';
import MiniSlider from "../resources/miniSlider";
import Palette_ from "../resources/palette";
import colors from '../resources/colors'
import fonts from '../resources/fonts' 
import { Beach, Halloween, Forest, Cake, BlueCream, Blues, Nature, Spices, Retro } from '../resources/chonicleColors'

const Aparience = ({route, navigation}) => {

    const { theme, languaje, state, items, action, docID, docTitle, palette, preferences, image } = route.params;
    const Widht = Dimensions.get('window').width

    const [Palette, setPalette] = useState(palette)
    const [State, setState] = useState(false)
    const [itemType, setItemType] = useState(state)

    const selectPalette = (colors) => {
        if (!State) {
            setPalette(colors)
            setState(true)
        } else if (State) {
            if (Palette == colors) {
                setPalette(palette)
                setState(false)
            } else {
                setPalette(colors)
                setState(true)
            }
        }
    }

    useEffect(() => {
        if (palette[4] != 'Default') {
            setState(true)
            setPalette(palette)
        }
    }, [])

    useLayoutEffect(() => {
        if (state == 'fusion') setNavigateTo('SelectChronicles')
        else if (state == 'chronicle') setNavigateTo('ChroniclePreferences')
    }, [])

    const [navigateTo, setNavigateTo] = useState('')

    const Next = () => {
        if (!State) ToastAndroid.show(e, ToastAndroid.SHORT)
        else if (Palette[4] == 'Beach') navigation.navigate(navigateTo, { paletteColors: [Beach[0], Beach[1], Beach[2], Beach[3], Beach[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Halloween') navigation.navigate(navigateTo, { paletteColors: [Halloween[0], Halloween[1], Halloween[2], Halloween[3], Halloween[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Forest') navigation.navigate(navigateTo, { paletteColors: [Forest[0], Forest[1], Forest[2], Forest[3], Forest[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Cake') navigation.navigate(navigateTo, { paletteColors: [Cake[0], Cake[1], Cake[2], Cake[3], Cake[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'BlueCream') navigation.navigate(navigateTo, { paletteColors: [BlueCream[0], BlueCream[1], BlueCream[2], BlueCream[3], BlueCream[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Blues') navigation.navigate(navigateTo, { paletteColors: [Blues[0], Blues[1], Blues[2], Blues[3], Blues[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Nature') navigation.navigate(navigateTo, { paletteColors: [Nature[0], Nature[1], Nature[2], Nature[3], Nature[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Spices') navigation.navigate(navigateTo, { paletteColors: [Spices[0], Spices[1], Spices[2], Spices[3], Spices[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
        else if (Palette[4] == 'Retro') navigation.navigate(navigateTo, { paletteColors: [Retro[0], Retro[1], Retro[2], Retro[3], Retro[4]], theme: theme, languaje: languaje, state: itemType, items: items, action: action, docID: docID, docTitle: docTitle, preferences: preferences, image: image })
    }

    useLayoutEffect(() => {
        switch (languaje) {
            case 'English': // setC('Aparience');
            setA('Style. '); setB('Theme. '); setC('Color palettes'); setD('Next'); setE('Choose a color palette to continue')
                break;
            case 'Spanish': // setC('Apariencia');
            setA('Estilo. '); setB('Tema. '); setC('Paletas de color'); setD('Seguir'); setE('Escoge una paleta de color para poder continuar')
                break;
        }

        return () => languaje
    }, [])

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')

    const Widht1 = Widht - 40 - 102 - 10 - 27.5 / 2

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo, alignItems: 'center' }}>
            {/* <Text>{State}</Text> */}
            {/* <Text>{Palette}</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Widht - 40 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <Text onPress={Next} style={{...fonts.normalDark15, marginTop: 15, opacity: State ? 0.7 : 0.3}}>{d}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', marginBottom: 8, alignSelf: 'flex-start' }}>
                    {/* <Text style={fonts.normalDark22}>{a}</Text>
                    <Text style={fonts.normalDark22}>{b}</Text> */}
                    <Text style={Palette[4] == 'Default' ? fonts.normalGray22 : fonts.normalDark22}>{c}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: Palette[4] == 'Default' ? colors.grayBlue : Palette[0],
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        width: Widht - 40 - 102 - 10,
                        height: '100%',
                        borderRadius: 5,
                    }}>
                        <View style={{
                            height: '100%',
                            width: Widht / 11,
                            backgroundColor: Palette[4] == 'Default' ? colors.darkBlue : Palette[1],
                            position: 'absolute',
                            borderBottomRightRadius: 5,
                            borderTopRightRadius: 5
                        }}>
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[1], transform: [{ rotate: '-90deg' }], marginRight: 61 + 8, height: 110, width: 17}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[3], transform: [{ rotate: '-90deg' }], marginRight: 61, height: 90, width: 14}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[2], transform: [{ rotate: '-90deg' }], marginRight: 61 + 4, height: 100, width: 15.5}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[1], transform: [{ rotate: '-90deg' }], marginRight: 61 + 12, height: 120, width: 18.5}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[2], transform: [{ rotate: '-90deg' }], marginRight: 61, height: 90, width: 14}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[3], transform: [{ rotate: '-90deg' }], marginRight: 61 + 8, height: 110, width: 17}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[2], transform: [{ rotate: '-90deg' }], marginRight: 61, height: 90, width: 14}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[1], transform: [{ rotate: '-90deg' }], marginRight: 61 + 16, height: 130, width: 20}}
                            />
                        </View>
                        <View style={{height: 40}}>
                            <Image
                                source={require('../assets/Tree.png')}
                                style={{ tintColor: Palette[2], transform: [{ rotate: '-90deg' }], marginRight: 61 + 4, height: 100, width: 15.5}}
                            />
                        </View>
                        {/* <MiniSlider color={paletteName == '' ? colors.darkBlue : Palette[2]} height={27.5} width={27.5} borderRadius={13.75} minPosition={Widht3 / 4} maxPosition={Widht3 / 4 * 3}/> */}
                    </View>
                    <View>
                    <ScrollView style={{ height: '65%', marginLeft: 10 }} showsVerticalScrollIndicator={false}>
                        <Pressable onPress={() => selectPalette(Blues)}>
                            <Palette_
                                paletteName={'Blues'} opacity={Palette[4] == 'Blues' ? 1 : 0}
                                first={Blues[0]} second={Blues[1]} thrird={Blues[2]} four={Blues[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Nature)}>
                            <Palette_
                                paletteName={'Nature'} opacity={Palette[4] == 'Nature' ? 1 : 0}
                                first={Nature[0]} second={Nature[1]} thrird={Nature[2]} four={Nature[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Beach)}>
                            <Palette_
                                paletteName={'Beach'} opacity={Palette[4] == 'Beach' ? 1 : 0}
                                first={Beach[0]} second={Beach[1]} thrird={Beach[2]} four={Beach[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(BlueCream)}>
                            <Palette_
                                paletteName={'BlueCream'} opacity={Palette[4] == 'BlueCream' ? 1 : 0}
                                first={BlueCream[0]} second={BlueCream[1]} thrird={BlueCream[2]} four={BlueCream[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Forest)}>
                            <Palette_
                                paletteName={'Forest'} opacity={Palette[4] == 'Forest' ? 1 : 0}
                                first={Forest[0]} second={Forest[1]} thrird={Forest[2]} four={Forest[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Cake)}>
                            <Palette_
                                paletteName={'Cake'} opacity={Palette[4] == 'Cake' ? 1 : 0}
                                first={Cake[0]} second={Cake[1]} thrird={Cake[2]} four={Cake[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Spices)}>
                            <Palette_
                                paletteName={'Spices'} opacity={Palette[4] == 'Spices' ? 1 : 0}
                                first={Spices[0]} second={Spices[1]} thrird={Spices[2]} four={Spices[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Halloween)}>
                            <Palette_
                                paletteName={'Halloween'} opacity={Palette[4] == 'Halloween' ? 1 : 0}
                                first={Halloween[0]} second={Halloween[1]} thrird={Halloween[2]} four={Halloween[3]}
                            />
                        </Pressable>
                        <Pressable onPress={() => selectPalette(Retro)}>
                            <Palette_
                                paletteName={'Retro'} opacity={Palette[4] == 'Retro' ? 1 : 0}
                                first={Retro[0]} second={Retro[1]} thrird={Retro[2]} four={Retro[3]}
                            />
                        </Pressable>
                    </ScrollView>
                    </View>
                    {/* <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={fonts.normalDark15}>Mode</Text>
                        <View style={{
                            backgroundColor: colors.otroBlue,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 101,
                            height: 40,
                            marginBottom: 5,
                            marginTop: 5,
                            borderRadius: 5
                        }}>
                            <Text style={fonts.normalWhite18}>Cascade</Text>
                        </View>
                        <View style={{
                            backgroundColor: colors.white,
                            borderColor: colors.darkBlue,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1.5,
                            width: 101,
                            height: 40,
                            borderRadius: 5
                        }}>
                            <Text style={fonts.normalDark10}>Horizon</Text>
                        </View>
                    </View> */}
                </View>
            </View>
        </View>
    );
}

export default Aparience;