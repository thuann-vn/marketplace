import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function ProfileSidebar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.profileEdit)}>
            <MaterialCommunityIcons name="credit-card" size={32} color="#333" />
            <Text style={styles.buttonLabel}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.accountManagement)}>
            <MaterialCommunityIcons name="bank" size={32} color="#333" />
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
    fontWeight: '300'
  },
});
