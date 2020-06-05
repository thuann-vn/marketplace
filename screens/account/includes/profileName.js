import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';
import { useSelector, useDispatch } from 'react-redux';
import ProfileProgressBar from './profileProgressBar';

export default function ProfileName(props) {
  const settings = useSelector(state => state.settings);
  const userName = settings.userInfo && (settings.userInfo.firstName || settings.userInfo.lastName) ? settings.userInfo.firstName + ' ' + settings.userInfo.lastName : '';
  return (
    <View style={styles.container}>
        <Text style={styles.profileName}>{userName ? userName : 'User name'}</Text>
        {
            !props.hideTitle && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.title || 'ACCOUNT SETUP'}</Text>
                </View>
            )
        }

        {
          props.showProgressbar && (
            <ProfileProgressBar/>
          )
        }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
      flex: 1
  },
  profileName: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#DEE6EF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  titleContainer:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  titleText: {
    fontSize: 16
  },
});
