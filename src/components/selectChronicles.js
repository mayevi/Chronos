import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Image, Dimensions } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const SelectChronicles = ({route, navigation}) => {

    const { theme, languaje, state, items, action, docID, docTitle, paletteColors, preferences } = route.params;


    const Widht = Dimensions.get('window').width - 40

    const [Items, setItems] = useState(items);
    const [selectedItems, setSelectedItems] = useState([])

    const [State, setState] = useState(false)

    const units = selectedItems.length

    useEffect(() => {
        if (units > 0) setState(true)
        else setState(false)
    }, )

    const Array = (title) => {
        if (selectedItems.includes(title)) {
            selectedItems.splice(selectedItems.indexOf(title), 1)
            setSelectedItems([...selectedItems])
        } else setSelectedItems([...selectedItems, title])
    }

    useEffect(() => {
        switch (languaje) {
            case 'English': setA('Articles'); setB('Next'); setC(' of ')
                break;
            case 'Spanish': setA('Artículos'); setB('Seguir'); setC(' de ')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')

    return (
        <View style={{flex: 1, backgroundColor: colors.white, flexDirection: 'column', alignItems: 'flex-start'}}>
            {/* <Text>{JSON.stringify(selectedItems)}</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '92%' }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22, marginLeft: 20, marginTop: 25, opacity: 0.7 }}
                        source={require('../assets/left-arrow.png')}
                    />
                </Pressable>
                <View style={{ marginTop: 15, opacity: State ? 0.7 : 0.3 }}>
                    <Text onPress={() => navigation.navigate('Name', 
                            {
                                palette: paletteColors,
                                units: units,
                                languaje: languaje,
                                theme: theme,
                                state: state,
                                items: selectedItems,
                                action: action,
                                docTitle: docTitle,
                                docID: docID
                            }
                        )}
                        style={fonts.normalDark15}
                    >{b}</Text>
                </View>
            </View>
            <Text style={{marginTop: 30, marginHorizontal: 20}}>{units + c + Items.length}</Text>
            <FlatList
                style={{ marginTop: 10, width: Widht, alignSelf: 'center' }}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                data={Items}
                renderItem={({ item }) => (
                    <Pressable onPress={() => Array(item.key)}>
                        <View style={{
                            marginRight: 10,
                            marginBottom: 15,
                            backgroundColor: colors.azulPerla,
                            height: 90,
                            width: Widht,
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            borderRadius: 5,
                            opacity: selectedItems.includes(item.key) ? 1 : 0.5
                        }}>
                            <Text style={fonts.mediumDark22}>{item.title}</Text>
                            <Text style={fonts.normalDark12}>{item.units + ' ' + a}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

export default SelectChronicles;