import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import Colors from '../../constants/Colors';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddOrEditCreditCardScreen() {
  const [name, setName] = React.useState('');
  const [cardNo, setCardNo] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [billAddress, setBillAddress] = React.useState('');
  const [isDefault, setDefault] = React.useState(false);

  return (
    <SafeAreaView style={styles.container} >
      <CustomHeader />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <ProfileName />
        <View style={styles.separator}></View>
        <View style={styles.listContainer}>
          <AddCardAndBankSidebar />

          <View style={styles.inputContainer}>
            <TextInput placeholder="NAME ON THE CARD" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#333" />
            <View style={styles.cardNoContainer}>
              <TextInput placeholder="CREDIT CARD" value={cardNo} onChangeText={setCardNo} style={[styles.input, styles.cardNoInput]} placeholderTextColor="#333" />
              <TextInput placeholder="CVV" value={cvv} onChangeText={setCvv} style={[styles.input, styles.cvvInput]} placeholderTextColor="#333" />
              <TextInput placeholder="EXP" value={exp} onChangeText={setExp} style={[styles.input, styles.expInput]} placeholderTextColor="#333" />
            </View>
            <TextInput placeholder="BILLING ADDRESS" value={billAddress} onChangeText={setBillAddress} style={styles.input} placeholderTextColor="#333" />

            <View style={styles.saveButtonContainer}>
              <CheckBox
                title='Default Payment'
                checked={isDefault}
                onPress={() => setDefault(!isDefault)}
                containerStyle={styles.checkbox}
                checkedColor={Colors.mainColor}
              />

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonLabel}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
  cvvInput: {
    marginHorizontal: 5
  },
  saveButtonContainer: {
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
  saveButtonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700'
  },
  defaultCheckbox: {
    width: 20,
    height: 20,
    marginTop: 10,
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
