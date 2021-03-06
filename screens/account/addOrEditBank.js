import * as React from 'react';
import { Platform, StyleSheet, View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';
import { AccountService } from '../../services/account';
import Constants from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/Routes';

export default function AddOrEditBankScreen({ navigation, route }) {
  const [name, setName] = React.useState('');
  const [routingNumber, setRoutingNumber] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [isDefault, setDefault] = React.useState(false);
  const [isDefaultReceipt, setDefaultReceipt] = React.useState(false);
  const id = route.params?.id ? route.params?.id : 0;

  //Get data
  React.useEffect(()=>{
    if(id > 0){
      AccountService.getAccounts(id).then(response => {
        if(response.status == 'success'){
          const data = response.payload[0];
          setName(data.name);
          setRoutingNumber(data.accountNumber);
          setAccountNumber(data.routingNumber);
          setDefault(data.default == 'yes');
          setDefaultReceipt(data.mode == 'receipt');
        }
      });
    }
  }, []);

	const _validate = ()=>{
    var errors = [];
    var isValid = true;
    
    if(!name){
      var isValid = false;
      errors.push('Account name is required');
    }
    
    if(!routingNumber){
      var isValid = false;
      errors.push('Routing number is required');
    }
    
    if(!routingNumber){
      var isValid = false;
      errors.push('Routing number is required');
    }
    
    if(!isValid && errors.length){
      Alert.alert(errors[0]);
    }
    
		return isValid;
	}


  const submit = ()=>{
    if(_validate()){
      AccountService.addOrEditAccount({
        id: id,
        name: name,
        accountNumber: accountNumber,
        routingNumber: routingNumber,
        type: Constants.accountTypes.bank,
        default: isDefault ? 'yes' : 'no',
        mode: isDefaultReceipt ? 'receipt' : 'out',
        city: '1',
        state: '1',
        country: '1',
        zip: '1'
      }).then(response =>{
        if(response.status == 'success'){
          navigation.navigate(Routes.accountSetup);
        }else{
          if(Array.isArray(response.msg) && response.msg.length){
            return Alert.alert(response.msg[0]);
          }
        }
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <View style={styles.cardNoContainer}>
              <TextInput placeholder="ROUTING NUMBER" value={routingNumber} onChangeText={setRoutingNumber} style={[CommonStyles.input, styles.routingNameInput]} placeholderTextColor="#333" />
              <TextInput placeholder="ACCOUNT NUMBER" value={accountNumber} onChangeText={setAccountNumber} style={[CommonStyles.input, styles.accountNumberInput]} placeholderTextColor="#333" />
            </View>
            <TextInput placeholder="ACCOUNT NAME" value={name} onChangeText={setName} style={CommonStyles.input} placeholderTextColor="#333" />

            <CheckBox
              title='Default Payment'
              checked={isDefault}
              onPress={() => setDefault(!isDefault)}
              containerStyle={CommonStyles.checkbox}
              checkedColor={Colors.mainColor}
              wrapperStyle={{ marginHorizontal: 0 }}
            />
            <CheckBox
              title='Default Receipt'
              checked={isDefaultReceipt}
              onPress={() => setDefaultReceipt(!isDefaultReceipt)}
              containerStyle={CommonStyles.checkbox}
              checkedColor={Colors.mainColor}
            />
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={[CommonStyles.button, {marginTop: 0}]} onPress={submit}>
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
