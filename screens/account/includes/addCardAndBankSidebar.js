import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function AddCardAndBankSidebar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.addOrEditCard)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/card.png')} style={{width: 30, height: 24}}/>
            </View>
            <Text style={styles.buttonLabel}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.addOrEditBank)}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/icons/bank.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
            </View>
            <Text style={styles.buttonLabel}>Add Bank</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    width: 135,
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
    marginLeft: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 12,
  },
  imageContainer:{
    width: 32,
    height: 32,
    alignContent: 'center',
    alignItems: 'center'
  }
});
