import React, {useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import RNSecureStore from "react-native-secure-store";
import { enableScreens } from 'react-native-screens'
import auth, {firebase} from '@react-native-firebase/auth';
// import Animated from 'react-native-reanimated'
// import { FragmentActivity } from 'react-native-screens';

import SettingsSelect from './src/components/settingsSelect';
import Loading from './src/components/loading';
import Security from './src/components/security';
import Individual from './src/components/individual';
import LogIn from './src/components/logIn';
import SignUp from './src/components/signUp';
import SignUpEmail from './src/components/signUpEmail';
import LogInEmail from './src/components/logInEmail';
// import Style from './src/components/style';
// import Theme from './src/components/theme';
import Aparience from './src/components/aparience';
// import VerticalChronicle from './src/components/verticalChronicle';
import HorizontalChronicle from './src/components/horizontalChronicle';
import Fusion from './src/components/fusion';
import Name from './src/components/name';
import ChroniclePreferences from './src/components/preferences';
import EmotionState from './src/components/emotionState';
import EmotionStateSelect from './src/components/emotionStateSelect';
import Page from './src/components/page'
import Passcode from './src/components/passcode'
import SelectChronicles from './src/components/selectChronicles'
import ChangePassword from './src/components/changePassword'
import Load from './src/components/load'
import MiniSlider from './src/resources/miniSlider'

import AuthContext from './src/resources/context'

enableScreens()
const Stack = createStackNavigator();

const App = () => {

  const Auth = auth().currentUser

  useEffect(() => {
    GetToken()
  }, )

  const GetToken = async() => {
    RNSecureStore.get("userID").then(res => {
      if (res !== null && Auth !== null ) {
        setUser(true)
        setLoading(false)
      } else if (res == null | Auth == null) setLoading(false)
    }, )
  }

  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
              <Stack.Screen name='Loading' component={Loading} options={{animationEnabled: false}}/>
          ) : user ? (
            <>
              {/* <Stack.Screen name='MiniSlider' component={MiniSlider} options={{animationTypeForReplace: user ? 'push' : 'pop'}}/> */}
              <Stack.Screen name='Individual' component={Individual} options={{animationTypeForReplace: user ? 'push' : 'pop'}}/>
              <Stack.Screen name='Fusion' component={Fusion} options={{animationEnabled: false}}/>
              <Stack.Screen name='Load' component={Load} options={{animationEnabled: false}}/>
              <Stack.Screen name='SelectChronicles' component={SelectChronicles}/>
              {/* <Stack.Screen name="VerticalChronicle" component={VerticalChronicle}/> */}
              <Stack.Screen name="HorizontalChronicle" component={HorizontalChronicle}/>
              <Stack.Screen name="Page" component={Page}/>
              <Stack.Screen name="EmotionalStateSelect" component={EmotionStateSelect}/>
              <Stack.Screen name="EmotionalState" component={EmotionState}
                options={() => ({
                  animationEnabled: false, gestureEnabled: false,
                  transitionSpec: {
                    open: {animation: 'timing', config: {duration: 1000}},
                    close: {animation: 'timing', config: {duration: 1000}}
                  },
                  cardStyleInterpolator: ({current: {progress}}) => {
                    return { cardStyle: { opacity: progress } }
                  }
                })}
              />
              <Stack.Screen name="SettingsSelect" component={SettingsSelect}/>
              <Stack.Screen name="Security" component={Security}/>
              <Stack.Screen name="Passcode" component={Passcode}/>
              {/* <Stack.Screen name="Style" component={Style} options={{animationEnabled: false}}/> */}
              {/* <Stack.Screen name="Theme" component={Theme} options={{animationEnabled: false}}/> */}
              <Stack.Screen name="Aparience" component={Aparience} options={{animationEnabled: false}}/>
              <Stack.Screen name="ChroniclePreferences" component={ChroniclePreferences} options={{animationEnabled: false}}/>
              <Stack.Screen name="Name" component={Name} options={{animationEnabled: false}}/>
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{animationEnabled: false, animationTypeForReplace: !user ? 'push' : 'pop'}}
              />
              <Stack.Screen name="LogIn" component={LogIn} options={{animationEnabled: false}}/>
              <Stack.Screen name="SignUpEmail" component={SignUpEmail}/>
              <Stack.Screen name="LogInEmail" component={LogInEmail}/>
              <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

{/* <Stack.Screen name="Premium" component={Premium}/>
<Stack.Screen name="StyleSelect" component={StyleSelect}/>
<Stack.Screen name="FontSize" component={FontSize}/>
<Stack.Screen name="FontColors" component={FontColors}/>
<Stack.Screen name="Tipografy" component={Tipografy}/> */}
{/* <Stack.Screen name="Background" component={Background}/> */}
{/* <Stack.Screen name='Social' component={Social} options={{animationEnabled: false}}/> */}