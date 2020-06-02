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
import { CommonStyles } from '../../constants/Styles';

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
            <TextInput placeholder="NAME ON THE CARD" value={name} onChangeText={setName} style={CommonStyles.input} placeholderTextColor="#333" />
            <View style={styles.cardNoContainer}>
              <TextInput placeholder="CREDIT CARD" value={cardNo} onChangeText={setCardNo} style={[CommonStyles.input, styles.cardNoInput]} placeholderTextColor="#333" />
              <TextInput placeholder="CVV" value={cvv} onChangeText={setCvv} style={[CommonStyles.input, styles.cvvInput]} placeholderTextColor="#333" />
              <TextInput placeholder="EXP" value={exp} onChangeText={setExp} style={[CommonStyles.input, styles.expInput]} placeholderTextColor="#333" />
            </View>
            <TextInput placeholder="BILLING ADDRESS" value={billAddress} onChangeText={setBillAddress} style={CommonStyles.input} placeholderTextColor="#333" />

            <View style={styles.saveButtonContainer}>
              <CheckBox
                title='Default Payment'
                checked={isDefault}
                onPress={() => setDefault(!isDefault)}
                containerStyle={CommonStyles.checkbox}
                checkedColor={Colors.mainColor}
              />

              <TouchableOpacity style={[CommonStyles.button, {marginTop: 0}]}>
                <Text style={CommonStyles.buttonLabel}>SAVE</Text>
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
  inputContainer: {
    flex: 1,
    padding: 10
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
});
