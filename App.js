import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import RegisterScreen from './screens/auth/RegisterScreen';
import ProfileScreen from './screens/account/profile';
import AccountSetupScreen from './screens/account/accountSetup';
import {AuthContext} from './context/auth';
import { Routes } from './constants/Routes';
import Layout from './constants/Layout';
import AddOrEditCreditCardScreen from './screens/account/addOrEditCreditCard';
import AddOrEditBankScreen from './screens/account/addOrEditBank';
import AccountVerification from './screens/account/accountVerification';
import ProfileEditScreen from './screens/account/profileEdit';
import ManagementScreen from './screens/account/management';
import ManagementDetailScreen from './screens/account/managementDetail';

const Stack = createStackNavigator();
export default function App(props) {
  const isLoadingComplete = useCachedResources();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <AuthContext.Provider value={authContext}>
          <NavigationContainer linking={LinkingConfiguration}>
            {state.userToken == null ? (
            <Stack.Navigator>
              <Stack.Screen name={Routes.auth} component={RegisterScreen} options={Layout.defaultHeaderConfig}/>
            </Stack.Navigator>
            ) : (
            <Stack.Navigator>
              {/* <Stack.Screen name="Main" component={BottomTabNavigator} /> */}
              {/* <Stack.Screen name={Routes.profileEdit} component={ProfileEditScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountVerify} component={AccountVerification}  options={Layout.defaultHeaderConfig}/> */}
              <Stack.Screen name={Routes.accountManagementDetail} component={ManagementDetailScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountManagement} component={ManagementScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.addOrEditBank} component={AddOrEditBankScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.addOrEditCard} component={AddOrEditCreditCardScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.settings} component={ProfileScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountSetup} component={AccountSetupScreen}  options={Layout.defaultHeaderConfig}/>
            </Stack.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
