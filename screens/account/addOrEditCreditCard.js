import * as React from 'react';
import { Platform, StyleSheet, View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import Colors from '../../constants/Colors';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';
import { AccountService } from '../../services/account';
import Constants from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/Routes';

export default function AddOrEditCreditCardScreen({ navigation, route }) {
  const [name, setName] = React.useState('');
  const [cardNo, setCardNo] = React.useState('');
  const [billAddress, setBillAddress] = React.useState('');
  const [isDefault, setDefault] = React.useState(false);

  const id = route.params?.id ? route.params?.id : 0;

  //Get data
  React.useEffect(()=>{
    if(id > 0){
      AccountService.getAccounts(id).then(response => {
        if(response.status == 'success'){
          const data = response.payload[0];
          setName(data.name);
          setCardNo(data.accountNumber);
          setDefault(data.default == 'yes');
        }
      });
    }
  }, []);

	const _validate = ()=>{
    var errors = [];
    var isValid = true;
    
    if(!name){
      var isValid = false;
      errors.push('Name On The Card is required');
    }
    
    if(!cardNo){
      var isValid = false;
      errors.push('Card No is required');
    }
    
    if(!isValid && errors.length){
      Alert.alert(errors[0]);
    }
    
		return isValid;
	}


  const submit = ()=>{
    if(_validate()){
      AccountService.addOrEditAccount({
        name: name,
        accountNumber: cardNo,
        type: Constants.accountTypes.credit,
        routingNumber: '',
        default: isDefault ? 'yes' : 'no',
        mode: '1',
        city: '1',
        state: '1',
        country: '1',
        zip: '1',
        id: id
      }).then(response =>{
        console.log(response);
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
