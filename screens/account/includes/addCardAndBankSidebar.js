import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function AddCardAndBankSidebar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.addOrEditCard)}>
            <MaterialCommunityIcons name="credit-card" size={32} color="#333" />
            <Text style={styles.buttonLabel}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(Routes.addOrEditBank)}>
            <MaterialCommunityIcons name="bank" size={32} color="#333" />
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
    fontWeight: '300'
  },
});