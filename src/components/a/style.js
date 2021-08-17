import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Dimensions, ScrollView, ToastAndroid } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const Style = ({route, navigation}) => {

    const { languaje, state, items, action, docID, docTitle, theme, palette, preferences } = route.params;
    const Widht = Dimensions.get('window').width - 40

    const [itemType, setItemType] = useState(state)
    const [State, setState] = useState(false);

    useEffect(() => {
        switch (languaje) {
            case 'English':
            setA('Style. '); setB('Theme. '); setC('Aparience'); setD('Next'); setF('Choose a style to continue')
                break;
            case 'Spanish':
            setA('Estilo. '); setB('Tema. '); setC('Apariencia'); setD('Seguir'); setF('Escoge un estilo para poder continuar')
                break;
        }
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [f, setF] = useState('')

    const images = [
        {
            url:'https://images.pexels.com/photos/3028961/pexels-photo-3028961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'Minimalist'
        },
        {
            url: 'https://images.pexels.com/photos/4498792/pexels-photo-4498792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'Realistic'
        },
        {
            url: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'Watercolor'
        },
        {
            url: 'https://images.pexels.com/photos/16516/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'Pencil Draw'
        }
    ]

    const [active, setActive] = useState(false)

    const change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== active) setActive({active: slide})
    }

    const Next = () => {
        if (State) navigation.navigate('Theme',
            {
                languaje: languaje,
                state: itemType,
                items: items,
                action: action,
                docID: docID,
                docTitle: docTitle,
                theme: theme,
                palette: palette,
                preferences: preferences
            })
        else ToastAndroid.show(f, ToastAndroid.SHORT)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.azulDeFondo }}>
            {/* <Text>{State}</Text> */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
                position: 'relative'
            }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22, marginLeft: 20, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <Text onPress={Next} style={{...fonts.normalDark15, marginTop: 15, opacity: State ? 0.7 : 0.3}}>{d}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', marginBottom: 8, marginLeft: 20 }}>
                    <Text style={fonts.normalGray22}>{a}</Text>
                    <Text style={fonts.normalGray22}>{b}</Text>
                    <Text style={fonts.normalGray22}>{c}</Text>
                </View>
                <View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    onScroll={change}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: Widht, minHeight: 350, maxHeight: 400, alignSelf: 'center' }}
                >
                    {
                        images.map((image) => (
                            <Pressable key={JSON.stringify(image.url)} onPress={() => setState(state => !state)}>
                                <View style={{flexDirection: 'row', opacity: State ? 1 : 0.5}}>
                                    <Image
                                        key={JSON.stringify(image.url)}
                                        source={{ uri: image.url }}
                                        style={{
                                            width: Widht,
                                            minHeight: 453, //350
                                            maxHeight: 503, //400
                                            resizeMode: 'cover',
                                            borderRadius: 5,
                                        }}
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        alignSelf: 'flex-end',
                                        color: colors.white,
                                        fontSize: 30,
                                        bottom: 70,
                                        left: 15
                                    }}>{image.title}</Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </ScrollView>
                </View>
                {/* <View style={{flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    {
                        images.map((k) => (
                            <View style={{
                                backgroundColor: colors.darkBlue,
                                opacity: k == active ? 1 : 0.5,
                                marginHorizontal: 1.5,
                                marginBottom: 8,
                                borderRadius: 4,
                                height: 8,
                                width: 8
                            }} key={k}
                            ></View>
                        ))
                    }
                </View> */}
                {/* <View style={{
                    backgroundColor: colors.grayBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 15,
                    borderRadius: 5,
                    width: Widht,
                    height: 103,
                }}>
                    <Text style={fonts.normalWhite22}>COMING SOON</Text>
                </View> */}
            </View>
        </View>
    );
}

export default Style;