import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';

export default function AddOrEditBankScreen() {
  const [name, setName] = React.useState('');
  const [routingName, setRoutingName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [isDefault, setDefault] = React.useState(false);
  const [isDefaultReceipt, setDefaultReceipt] = React.useState(false);
  const [isSelected, setSelection] = React.useState(false);


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[0]}>
      <CustomHeader />
      <ProfileName />
      <View style={styles.separator}></View>
      <View style={styles.listContainer}>
        <AddCardAndBankSidebar />
        <View style={styles.inputContainer}>
          <View style={styles.cardNoContainer}>
            <TextInput placeholder="ROUTING NUMBER" value={routingName} onChangeText={setRoutingName} style={[styles.input, styles.routingNameInput]} placeholderTextColor="#333" />
            <TextInput placeholder="ACCOUNT NUMBER" value={accountNumber} onChangeText={setAccountNumber} style={[styles.input, styles.accountNumberInput]} placeholderTextColor="#333" />
          </View>
          <TextInput placeholder="ACCOUNT NAME" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#333" />

          <CheckBox
            title='Default Payment'
            checked={isDefault}
            onPress={() => setDefault(!isDefault)}
            containerStyle={styles.checkbox}
            checkedColor={Colors.mainColor}
            wrapperStyle={{ marginHorizontal: 0 }}
          />
          <CheckBox
            title='Default Receipt'
            checked={isDefaultReceipt}
            onPress={() => setDefaultReceipt(!isDefaultReceipt)}
            containerStyle={styles.checkbox}
            checkedColor={Colors.mainColor}
          />
          <View style={styles.saveButtonContainer}>
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
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  listContainer: {
    marginTop: 20,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row'
  },
  listActions: {
    width: 135,
    minHeight: 300,
    borderRightColor: '#ccc',
    borderRightWidth: 1
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5
  },
  buttonLabel: {
    color: '#333',
    marginLeft: 10,
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  inputContainer: {
    flex: 1,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10
  },
  cardNoContainer: {
    flexDirection: 'row',
  },
  cardNoInput: {
    flex: 1
  },
  routingNameInput: {
    flex: 1,
    marginRight: 5
  },
  accountNumberInput: {
    flex: 1
  },
  saveButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10
  },
  saveButton: {
    backgroundColor: '#666666',
    padding: 10,
    paddingHorizontal: 25,
    alignSelf: 'center'
  },
  saveButtonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700'
  },
  defaultCheckbox: {
    width: 20,
    height: 20,
    borderColor: '#ccc'
  },
  defaultCheckboxLabel: {
    marginLeft: 10,
    marginRight: 10
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: 'transparent'
  },
});
