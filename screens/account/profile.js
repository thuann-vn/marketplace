import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import Layout from '../../constants/Layout';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Routes } from '../../constants/Routes';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile({ navigation: { navigate } }) {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <ProfileName hideTitle={true} showProgressbar={true}/>
      <View style={styles.separator}></View>
      <View style={styles.buttonListContainer}>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountSetup)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/icons/order.png')} style={{width: 32, height: 32}}/>
            </View>
            
            <Text style={styles.buttonLabel}>Account Setup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountVerify)}>
            <Image source={require('../../assets/images/icons/verify.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>Verify Credentials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountManagement)}>
              <Image source={require('../../assets/images/icons/users.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.company)}>
            <Image source={require('../../assets/images/icons/company.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/images/icons/coupon.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>My Rewards</Text>
          </TouchableOpacity>

        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/images/icons/agreement.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>Agreements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/images/icons/rating.png')} style={{width: 32, height: 32}}/>
            <Text style={styles.buttonLabel}>Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  text: {
    fontSize: 16
  },
  titleText: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#DEE6EF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  profileCompleteContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  completeBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  completeBar: {
    borderBottomColor: '#1BB147',
    borderBottomWidth: 1,
    width: Layout.window.width / 6 - 20
  },
  completeRedBar: {
    borderBottomColor: '#FF261A',
  },
  updateProfileButton: {
    backgroundColor: '#729FCF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 0,
  },
  updateProfileText: {
    textTransform: 'uppercase'
  },
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  buttonListContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonLabel: {
    color: '#333',
    marginLeft: 10
  }
});
