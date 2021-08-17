import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../resources/colors'

const Loading = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.grayBlue}/>
        </View>
    )
}
export default Loading;