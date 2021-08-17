import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import moment from '../../node_modules/moment';
import colors from '../resources/colors'

const Load = ({route, navigation}) => {

    const { userID, title, units, image, theme, palette, aleatorySize, emotionIcons, selectableHour, chronicles, state, action, docID } = route.params;

    const chronicleData = {
        userID: userID,
        title: title,
        units: units,
        image: image,
        theme: theme,
        palette: palette,
        aleatorySize: aleatorySize,
        emotionIcons: emotionIcons,
        selectableHour: selectableHour,
        chronicleDate: firestore.FieldValue.serverTimestamp(moment().format('LLLL'))
    }
    const fusionData = {
        userID: userID,
        title: title,
        units: units,
        chronicles: chronicles,
        image: image,
        theme: theme,
        palette: palette,
        fusionDate: firestore.FieldValue.serverTimestamp(moment().format('LLLL'))
    }

    const newFusionID = userID + title
    const batch = firestore().batch()

    const UpdatePages = (gggg) => {
        const AA = firestore().collection('Pages').where('chronicleID', '==', gggg).get()
            AA.forEach(docc => batch.update(docc, {'fusionID': 'aaaa'}))
            return batch.commit();
    }

    useEffect(() => {
        if (action == 'Set') {
            firestore().collection('Chronicles').doc().set(chronicleData).then(() => navigation.navigate('Individual'))
        } else if (action == 'Update') {
            firestore().collection('Chronicles').doc(docID).update({
                'title': title,
                'image': image,
                'theme': theme,
                'palette': palette,
                'aleatorySize': aleatorySize,
                'emotionIcons': emotionIcons,
                'selectableHour': selectableHour,
            }).then(() => navigation.navigate('Individual'))
        }
        // if (action == 'Set') {
        //     if (state == 'fusion') {
        //         firestore().collection('Fusions').doc(newFusionID).set(fusionData).then(() => {
        //             firestore().collection('Users').doc(userID).update({'fusions': 1})
        //             items.forEach(item => {
        //                 // firestore().collection('Chronicles').doc(item).update({'fusionID': newFusionID})
        //                 UpdatePages(item)
        //                 // firestore().collection('Pages').where('chronicleID', '==', item).update({'fusionID': newFusionID})
        //             })
        //             navigation.navigate('Fusion')
        //         })
        //     } else
        //     firestore().collection('Chronicles').doc().set(chronicleData).then(() => navigation.navigate('Individual'))
        // } else if (action == 'Update') {
        //     if (state == 'fusion') firestore().collection('Fusions').doc(docID)
        //         .update({'title': title, 'chronicles': chronicles, 'image': image, 'theme': theme, 'palette': palette}).then(() => {
        //             items.forEach(item => {
        //                 firestore().collection('Chronicles').doc(item).update({'fusionID': docID})
        //                 firestore().collection('Pages').where('chronicleID', '==', item).update({'fusionID': newFusionID})
        //             })
        //             navigation.navigate('Fusion')
        //         })
        //     else firestore().collection('Chronicles').doc(docID).update({
        //             'title': title,
        //             'image': image,
        //             'theme': theme,
        //             'palette': palette,
        //             'aleatorySize': aleatorySize,
        //             'emotionIcons': emotionIcons,
        //             'selectableHour': selectableHour,
        //         }).then(() => navigation.navigate('Individual'))
        // }
    }, )

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.grayBlue}/>
        </View>
    )
}

export default Load;