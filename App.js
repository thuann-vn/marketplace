import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';

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
import CompanyScreen from './screens/account/company';
import CompanyDetailScreen from './screens/account/companyDetail';

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
            userInfo: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userInfo: action.user,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userInfo: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userInfo: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, userInfo;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userInfo = await AsyncStorage.getItem('userInfo');
      } catch (e) {
        // Restoring token failed
      }

      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, user: JSON.parse(userInfo) });
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async (userData, token) => {
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
          await AsyncStorage.setItem('userToken', token);
        } catch (e) {
          console.log('Sign in context failed');
        }

        dispatch({ type: 'SIGN_IN', token: token, user: userData});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userInfo');
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log('Logout context failed');
        }

        dispatch({ type: 'SIGN_OUT' })
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
              <Stack.Screen name={Routes.settings} component={ProfileScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountSetup} component={AccountSetupScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.addOrEditBank} component={AddOrEditBankScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.addOrEditCard} component={AddOrEditCreditCardScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.profileEdit} component={ProfileEditScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountVerify} component={AccountVerification}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.company} component={CompanyScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.companyDetail} component={CompanyDetailScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountManagementDetail} component={ManagementDetailScreen}  options={Layout.defaultHeaderConfig}/>
              <Stack.Screen name={Routes.accountManagement} component={ManagementScreen}  options={Layout.defaultHeaderConfig}/>
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
