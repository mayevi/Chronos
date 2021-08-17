import React from 'react';
import { View, Text } from 'react-native';
import colors from '../resources/colors'
import fonts from '../resources/fonts' 

const Palette_ = (props) => {
    return (
        <View style={{ flexDirection: 'row', position: 'relative', marginBottom: 8 }}>
            <View style={{
                backgroundColor: props.first,
                width: 24,
                height: 74,
                marginRight: 2,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
            }}/>
            <View style={{backgroundColor: props.second, width: 24, height: 74, marginRight: 2}}/>
            <View style={{backgroundColor: props.thrird, width: 24, height: 74, marginRight: 2}}/>
            <View style={{backgroundColor: props.four, width: 24, height: 74, borderBottomRightRadius: 5, borderTopRightRadius: 5}}/>
            <View style={{
                backgroundColor: colors.white,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: props.opacity,
                borderRadius: 5,
                height: 74,
                width: 102,
            }}>
                <Text style={{...fonts.normalDark18, opacity: props.opacity}}>{props.paletteName}</Text>
            </View>
        </View>
    );
}
export default Palette_;