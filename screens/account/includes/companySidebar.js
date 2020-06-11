import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function CompanySidebar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.company)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/company.png')} style={{width: 32, height: 32}}/>
            </View>
            <Text style={styles.buttonLabel}>My Company</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.companyDetail)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/plus.png')} style={{width: 24, height: 24}}/>
            </View>
            <Text style={styles.buttonLabel}>Add Company</Text>
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
    fontSize: 12,
    fontWeight: '600',
  },
  imageContainer:{
    width: 32,
    height: 32,
    alignContent: 'center',
    alignItems: 'center'
  }
});
