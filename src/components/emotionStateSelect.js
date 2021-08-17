import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts'

const EmotionStateSelect = ({route, navigation}) => {

    const { pageID, chronicleID, Title, Content, Size, Palette, chronicleUnits, languaje, Color, aleatorySize, icons, Year, Month } = route.params;

    const Width = Dimensions.get('window').width

    useEffect(() => {
        switch (languaje) {
            case 'English': setA('I feel...')
                break;
            case 'Spanish': setA('Me siento...')
                break;
        }
        return () => languaje
    }, )

    const [a, setA] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image
                    style={{ width: 18, height: 18, marginRight: 25, marginTop: 25, alignSelf: "flex-end", opacity: 0.7 }}
                    source={require('../assets/x.png')}
                />
            </Pressable>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={fonts.normalOtro30}>{a}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15
                }}>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Euphoric', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5 + 0.5, height: Width / 4.5, margin: 3.5 }} source={require('../assets/euphoric.png')}/>
                    </Pressable>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Happy', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5, height: Width / 4.5, margin: 3.5 }} source={require('../assets/happy.png')}/>
                    </Pressable>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Normal', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5 + 1.5, height: Width / 4.5, margin: 3.5 }} source={require('../assets/normal.png')}/>
                    </Pressable>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Sad', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5, height: Width / 4.5 + 0.5, margin: 3.5 }} source={require('../assets/sad.png')}/>
                    </Pressable>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Depressed', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5 + 0.3, height: Width / 4.5, margin: 3.5 }} source={require('../assets/depressed.png')}/>
                    </Pressable>
                    <Pressable onPress={() => navigation.push('EmotionalState',
                        {
                            emotionIcon: 'Angry', pageID: pageID, languaje: languaje, chronicleID: chronicleID, Title: Title,
                            Content: Content, Size: Size, Palette: Palette, chronicleUnits: chronicleUnits, Color: Color,
                            aleatorySize: aleatorySize, icons: icons, Year: Year, Month: Month
                        }
                    )}>
                        <Image style={{ width: Width / 4.5, height: Width / 4.5, margin: 3.5 }} source={require('../assets/angry.png')}/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default EmotionStateSelect;