/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  BackHandler,
  Alert, 
  ToastAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WalkThrough from './src/components/Walk through/walkthrogh';
import Navigator from './src/Navigation/navigator';
import NetInfo from  '@react-native-community/netinfo'
import Splash from './src/components/Splash/splash' 
// import { GoogleSignin } from '@react-native-community/google-signin'; 
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
// import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';
import Payment from './src/components/User/payment'
const obj = {
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '240404485205-d9m1p0jjsu2ncr7l2fa5oqbu5pb7inu1.apps.googleusercontent.com',
  // androidClientId: '240404485205-d9m1p0jjsu2ncr7l2fa5oqbu5pb7inu1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      profileData: '',
      notiToken:'',
      loading: true

    }
  }

  async componentWillMount () {

    
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold_0': require('./assets/fonts/Poppins-Bold_0.ttf'),
      });
  
      this.setState({ loading: false });

    // PushNotification.configure({
    //   senderID: '240404485205',

    //   onRegister: token => {
    //     //process token'
    //     console.log("TOKEN TOKEN TOKEN")
    //     console.log("token",token)
    //   },
   
    //   onNotification: (notification) => {
    //     // process the notification
    //     console.log("notification notification notification")

    //     // required on iOS only
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
   
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },
   
    //   popInitialNotification: true,
    //   requestPermissions: true,
   
    // });




    // GoogleSignin.configure(obj);
    // console.log('GoogleSignin.configure(obj)',GoogleSignin.configure(obj))
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 3000);

    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        ToastAndroid.show("Internet connection seems to be offline", ToastAndroid.SHORT)
      }else {
        ToastAndroid.show("Internet connection seems to be online", ToastAndroid.SHORT)
      }
    })



  //   PushNotification.localNotification({
  //     autoCancel: true,
  //     largeIcon: "ic_launcher",
  //     smallIcon: "ic_notification",
  //     bigText: "My big text that will be shown when notification is expanded",
  //     subText: "This is a subText",
  //     color: "#F9B1B0",
  //     vibrate: true,
  //     vibration: 300,
  //     title: "Notification Title",
  //     message: "Notification Message",
  //     playSound: true,
  //     soundName: 'default',
  //     // actions: '["Accept", "Reject"]',
  //   });
  }

  fetchProfileData = (data) => {
    this.setState({
      profileData: data
    })
  }

  fetchToken = (token) => {
    this.setState({
      notiToken: token
    })
  }

  render() {
    // if (this.state.isLoading) {
    //   return <Splash />
    // } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#bdbdbd" barStyle="light-content" />
        {this.state.loading === false &&  <Navigator screenProps={{ fetchProfileData: this.fetchProfileData, profileData: this.state.profileData, fetchToken: this.fetchToken, notiToken: this.state.notiToken  }} />}
        {/* {this.state.loading === false &&  <Payment />} */}
        </View>
      );
    // }
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    // fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    // fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    // fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;


/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};
const exitAlert = () => {
  Alert.alert(
    'Confirm exit',
    'Do you want to quit the app?'
    [
    { text: 'CANCEL', style: 'cancel' },
    { text: 'OK', onPress: () => BackHandler.exitApp() }
    ]
  );
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener('hardwareBackPress', () => { });
}