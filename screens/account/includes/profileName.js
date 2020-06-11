import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';
import { useSelector, useDispatch } from 'react-redux';
import ProfileProgressBar from './profileProgressBar';

export default function ProfileName(props) {
  const navigation = useNavigation();
  const settings = useSelector(state => state.settings);
  const userName = settings.userInfo && (settings.userInfo.firstName || settings.userInfo.lastName) ? settings.userInfo.firstName + ' ' + settings.userInfo.lastName : '';
  return (
    <View style={styles.container}>
        <Text style={styles.profileName}>{userName ? userName : 'User name'}</Text>
        {
            !props.hideTitle && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.title || 'ACCOUNT SETUP'}</Text>

                    <TouchableOpacity onPress={()=> navigation.canGoBack && navigation.goBack()}>
                      <Image source={require('../../../assets/images/icons/leftArrow.png')} style={styles.backIcon}/>
                    </TouchableOpacity>
                </View>
            )
        }

        {
          props.showProgressbar && (
            <ProfileProgressBar showBackButton={props.hideTitle}/>
          )
        }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
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
    paddingBottom: 0,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    flex: 1
  },
  backIcon:{
    width: 36,
    height: 36
  }
});
