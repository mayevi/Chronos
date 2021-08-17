import { StyleSheet } from 'react-native';
import colors from './colors'

const fonts = StyleSheet.create({
    //Style-Theme-Aparience
    normalDark18: { color: colors.darkBlue, fontSize: 18 },
    normalDark22: { color: colors.darkBlue, fontSize: 22 },
    normalGray22: { color: colors.grayBlue, fontSize: 22 },
    normalDark15: { color: colors.darkBlue, fontSize: 15 },
    //Individual
    normalDark20: { color: colors.darkBlue, fontSize: 20 },
    normalWhite22: { color: colors.white, fontSize: 22 },
    normalWhite12: { color: colors.white, fontSize: 12 },
    normalWhite16: { color: colors.white, fontSize: 16 },
    mediumDark16: { color: colors.darkBlue, fontSize: 16, fontWeight: 'bold' },
    normalDark12: { color: colors.darkBlue, fontSize: 12 },
    normalDark18X: { color: colors.darkBlue, fontSize: 18, lineHeight: 50 },
    normalWhite18: { color: colors.white, fontSize: 18 },
    normalWhite14: { color: colors.white, fontSize: 14 },
    normalGray18: { color: colors.grayBlue, fontSize: 18 },

    underlineNormalDark12: { color: colors.darkBlue, fontSize: 12, lineHeight: 15, textDecorationLine: 'underline' },
    //Otros
    normalDark45: { color: colors.darkBlue, fontSize: 45 },
    normalDark35: { color: colors.darkBlue, fontSize: 35 },
    normalGray35: { color: colors.grayBlue, fontSize: 35 },
    normalWhite35: { color: colors.white, fontSize: 35 },
    normalDark30: { color: colors.darkBlue, fontSize: 30 },
    normalOtro30: { color: colors.otroBlue, fontSize: 30 },
    normalGray25: { color: colors.grayBlue, fontSize: 25 },
    normalWhite25: { color: colors.white, fontSize: 25 },
    mediumDark22: { color: colors.darkBlue, fontSize: 22, fontWeight: '900' },
    mediumGray22: { color: colors.grayBlue, fontSize: 22, fontWeight: '900' },
    normalGray20: { color: colors.grayBlue, fontSize: 20 },
    normalGray18X: { color: colors.grayBlue, fontSize: 18, lineHeight: 3 },
    lightDark18: { color: colors.darkBlue, fontSize: 18, fontWeight: "500" },
    normalDark16: { color: colors.darkBlue, fontSize: 16 },
    normalGray16: { color: colors.grayBlue, fontSize: 16 },
    normalGray15: { color: colors.grayBlue, fontSize: 15 },
    normalGray14: { color: colors.grayBlue, fontSize: 14 },
    normalGray13: { color: colors.grayBlue, fontSize: 13 },
    normalGray12: { color: colors.grayBlue, fontSize: 12 },
    normalDark11: { color: colors.darkBlue, fontSize: 11 },
    lightOtro11: { color: colors.otroBlue, fontSize: 11, fontWeight: '500' },
})

export default fonts;