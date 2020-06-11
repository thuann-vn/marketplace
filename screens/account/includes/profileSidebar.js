import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function ProfileSidebar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.profileEdit)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/order.png')} style={{width: 32, height: 32}} resizeMode="stretch"/>
            </View>
            <Text style={styles.buttonLabel}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.accountManagement)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/verify.png')} style={{width: 24, height: 24}}/>
            </View>
            <Text style={styles.buttonLabel}>Management</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    width: 150,
    minHeight: 300,
    borderRightColor: '#ccc',
    borderRightWidth: 1
  },
  button:{
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5
  },
  buttonLabel:{
    color: '#333',
    marginLeft: 5,
    textTransform: 'uppercase',
    fontWeight: '300',
    fontSize: 12,
  },
  imageContainer:{
    width: 32,
    height: 32,
    alignContent: 'center',
    alignItems: 'center'
  }
});
