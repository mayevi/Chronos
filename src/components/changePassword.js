import React, { useState } from 'react';
import { View, Text, Pressable, Image, TextInput, Dimensions, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import fonts from '../resources/fonts'
import colors from '../resources/colors'

const changePassword = ({route, navigation }) => {

    const { email } = route.params;

    const Widht = Dimensions.get('window').width - 40

    const [Email, setEmail] = useState(email)
    const [state, setState] = useState(false)

        return (
            <View style={{ flex: 1, backgroundColor: colors.azulDeFondo }}>
                {/* <Text>{JSON.stringify(state)}</Text> */}
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 20, height: 20, marginRight: 25, marginTop: 25, alignSelf: "flex-end", opacity: 0.7 }}
                        source={require('../assets/x.png')}
                    />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
                    <View>
                        <Text style={{...fonts.normalDark20, marginBottom: 5}}>Do you have problems logging in?</Text>
                        <Text style={fonts.normalGray16}>
                            {
                                !state ? 'Enter your email to receive a link to update your password.'
                                : 'If you did not receive any email, press the button again.'
                            }
                        </Text>
                    </View>
                    <TextInput
                        style={{
                            height: 50,
                            width: Widht,
                            backgroundColor: colors.azulDeFondo,
                            borderColor: colors.darkBlue,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            marginTop: 30,
                            padding: 15
                        }}
                        placeholder='Email'
                        placeholderTextColor={colors.grayBlue}
                        onChangeText={text => setEmail(text)}
                        value={Email}
                        autoCompleteType={'email'}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        selectionColor={colors.grayBlue}
                    />
                    <Pressable onPress={() => auth().sendPasswordResetEmail(Email).then(() => setState(true)).catch(() => ToastAndroid.show('El usuario no existe o el formato es incorrecto', ToastAndroid.SHORT))}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor: colors.darkBlue,
                            width: Widht,
                            height: 50,
                            marginTop: 15
                        }}><Text style={fonts.normalWhite18}>Send email</Text></View>
                    </Pressable>
                </View>
            </View>
        );
}

export default changePassword;