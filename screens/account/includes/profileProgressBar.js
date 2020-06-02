
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Layout from '../../../constants/Layout';

export default function ProfileProgressBar({ }) {
  return (
    <View style={styles.profileCompleteContainer}>
        <Text style={styles.text}>Your profile is complete.</Text>

        <View style={{flexDirection:'row', marginTop: 10}}>
          <View style={styles.completeBarContainer}>
            <View style={styles.completeBar}></View>
            <View style={styles.completeBar}></View>
            <View style={styles.completeBar}></View>
            <View style={[styles.completeBar, styles.completeRedBar]}></View>
            <View style={[styles.completeBar, styles.completeRedBar]}></View>
          </View>

          <TouchableOpacity style={styles.updateProfileButton}><Text style={styles.updateProfileText}>Update</Text></TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCompleteContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  completeBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    flex: 1
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
    marginLeft: 10,
  },
  updateProfileText: {
    textTransform: 'uppercase'
  },
});
