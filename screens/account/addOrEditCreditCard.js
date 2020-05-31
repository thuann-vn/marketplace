import * as React from 'react';
import { Platform, StyleSheet, View, Text, CheckBox } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AddOrEditCreditCardScreen() {
    const [name, setName] = React.useState('');
    const [cardNo, setCardNo] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const [exp, setExp] = React.useState('');
    const [billAddress, setBillAddress] = React.useState('');
    const [isDefault, setDefault] = React.useState(false);

    const _renderItems = ({item})=> {
        console.log(item);
        return (
            <View style={styles.listItem}>
                <Text style={styles.cardNo}>{item.cardNo}</Text>
                <Text style={styles.cardName}>{item.cardName}</Text>
                <Text style={styles.type}>{item.type}</Text>

                <TouchableOpacity style={styles.listItemButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemButton}>
                   <Text>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[0]}>
        <CustomHeader/>
        
        <Text style={styles.profileName}>Thua Nguyen</Text>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>ACCOUNT SETUP</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.listContainer}>
            <View style={styles.listActions}>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="credit-card" size={32} color="#333" />
                    <Text style={styles.buttonLabel}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="bank" size={32} color="#333" />
                    <Text style={styles.buttonLabel}>Add Bank</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="NAME ON THE CARD" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#333"/>
              <View style={styles.cardNoContainer}>
                <TextInput placeholder="CREDIT CARD" value={cardNo} onChangeText={setCardNo} style={[styles.input, styles.cardNoInput]} placeholderTextColor="#333"/>
                <TextInput placeholder="CVV"  value={cvv} onChangeText={setCvv} style={[styles.input, styles.cvvInput]} placeholderTextColor="#333"/>
                <TextInput placeholder="EXP" value={exp} onChangeText={setExp} style={[styles.input, styles.expInput]} placeholderTextColor="#333"/>
              </View>
              <TextInput placeholder="BILLING ADDRESS" value={billAddress} onChangeText={setBillAddress}  style={styles.input} placeholderTextColor="#333"/>

              <View style={styles.saveButtonContainer}>
                <CheckBox style={styles.defaultCheckbox} value={isDefault} onChange={setDefault}/>
                <Text style={styles.defaultCheckboxLabel}>Default Payment</Text>

                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonLabel}>SAVE</Text>
                </TouchableOpacity>
              </View>
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
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  listContainer:{
    marginTop: 20,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row'
  },
  listActions:{
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
  inputContainer:{
    flex: 1,
    padding: 10
  },
  input:{
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10
  },
  cardNoContainer:{
    flexDirection: 'row',
  },
  cardNoInput:{
    flex: 1
  },
  cvvInput:{
    marginHorizontal: 5
  },
  saveButtonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  saveButton: {
    backgroundColor: '#666666',
    padding: 10,
    paddingHorizontal: 25,
    alignSelf: 'center'
  },
  saveButtonLabel:{
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700'
  },
  defaultCheckbox:{
    width: 20,
    height: 20,
    marginTop: 10,
    borderColor: '#ccc'
  },
  defaultCheckboxLabel:{
    marginLeft: 10,
    marginRight: 10
  }
});
