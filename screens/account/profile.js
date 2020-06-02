import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import Layout from '../../constants/Layout';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Routes } from '../../constants/Routes';

export default function Profile({ navigation: { navigate } }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[0]}>
      <CustomHeader />

      <Text style={styles.titleText}>Thua Nguyen</Text>
      <View style={styles.profileCompleteContainer}>
        <Text style={styles.text}>Your profile is complete.</Text>

        <View style={styles.completeBarContainer}>
          <View style={styles.completeBar}></View>
          <View style={styles.completeBar}></View>
          <View style={styles.completeBar}></View>
          <View style={[styles.completeBar, styles.completeRedBar]}></View>
          <View style={[styles.completeBar, styles.completeRedBar]}></View>

          <TouchableOpacity style={styles.updateProfileButton}><Text style={styles.updateProfileText}>Update</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.buttonListContainer}>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountSetup)}>
            <MaterialCommunityIcons name="briefcase-edit-outline" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Account Setup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountVerify)}>
            <MaterialCommunityIcons name="account-check-outline" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Verify Credentials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.accountManagement)}>
            <MaterialIcons name="person" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate(Routes.company)}>
            <MaterialCommunityIcons name="office-building" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="medal" size={32} color="#333" />
            <Text style={styles.buttonLabel}>My Rewards</Text>
          </TouchableOpacity>

        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <FontAwesome5 name="handshake" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Agreements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="star" size={32} color="#010101" />
            <Text style={styles.buttonLabel}>Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
