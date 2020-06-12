import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import ProfileName from './includes/profileName';
import ProfileSidebar from './includes/profileSidebar';
import DropDownPicker from '../../components/DropDownPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';
import { AccountService } from '../../services/account';
import { useSelector } from 'react-redux';
import Constants from '../../constants/Constants';

const ADDRESSTYPES = [
  { label: 'RESIDENTIAL', value: 'residential'},
  { label: 'BUSINESS', value: 'business'}
];

const BILLINGTYPES = [
  { label: 'BILLING', value: 'billing'},
  { label: 'SHIPPING', value: 'shipping'},
  { label: 'BOTH', value: 'both'}
]

export default function ProfileEditScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [role, setRole] = React.useState('');
  const [editable, setEditable] = React.useState(false);
  
  const [house, setHouse] = React.useState('');
  const [suite, setSuite] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [addressType, setAddressType] = React.useState('residential');
  const [billingType, setBillingType] = React.useState('billing');
  const [isDefault, setDefault] = React.useState(false);

  const settings = useSelector(state => state.settings);
  React.useEffect(()=>{
    Promise.all([
      AccountService.getProfile().then(response=>{
        return response;
      }),
      // AddressService.detail(1).then((response)=>{
      //   return response;
      // })
    ]).then(result=>{
      console.log('ABC',result);
      const userResponse = result[0];

      //Prepare user information
      if(userResponse.status == 'success'){
        if(userResponse.payload.id.length == 1){
          const user = userResponse.payload.id[0];
          setEditable(false);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.mobileNo);
          setRole(user.role);
  
          setHouse(user.house);
          setSuite(user.suite);
          setStreet(user.street);
          setState(user.state);
          setCountry(user.country);
          setZip(user.zip ? user.zip.toString() : '');
        }
      }

    }).catch(error => {
      console.error('error', error);
    })
  }, [])

  const firstNameInput = React.useRef(null);
  const setEditOn = () =>{
    setEditable(!editable);
    setTimeout(()=>{
      firstNameInput.current.focus();
    })
  }

  const submit = () =>{
    const updateData = {
      email: settings.userInfo.email,
      password: settings.userInfo.password,
      firstName, lastName,
      mobileNo: phoneNumber, 
      house, 
      suite, 
      street, 
      state,  
      country,
      zip,
      role,
    }
    AccountService.updateProfile(updateData).then(response => {
      if(response.status == 'success'){
        setEditable(false);
        Alert.alert(response.msg);
      }else{
        Alert.alert(response.msg);
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />

      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <ProfileName hideTitle showProgressbar/>
        <View style={styles.separator}></View>
        <View style={styles.listContainer}>
          <ProfileSidebar />
          <View style={styles.inputContainer}>
            {
              !editable && (
                <TouchableOpacity onPress={setEditOn} style={styles.editButton}>
                    <Text>Edit</Text>
                </TouchableOpacity>
              )
            }
            
            <TextInput placeholder="FIRST NAME" value={firstName} onChangeText={setFirstName} style={styles.input} placeholderTextColor="#333" editable={editable} ref={firstNameInput}/>
            <TextInput placeholder="LAST NAME" value={lastName} onChangeText={setLastName} style={styles.input} placeholderTextColor="#333" editable={editable} />
            <TextInput placeholder="MOBILE NUMBER" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} placeholderTextColor="#333" editable={editable} />

            <DropDownPicker
              items={Object.keys(Constants.roles).map((key) => {
                return  { label: Constants.roles[key], value: key}
              })}
              defaultIndex={0}
              style={styles.dropdown}
              labelStyle={{ textAlign: 'left' }}
              arrowSize={10}
              arrowStyle={{ top: 0 }}
              onChangeItem={item => setRole(item.value)}
              disabled={true}
            />

            <Text style={styles.addressTitle}>ADDRESS DETAILS</Text>

            <View style={styles.houseSuiteContainer}>
              <TextInput placeholder="HOUSE" value={house} onChangeText={setHouse} style={[CommonStyles.input, styles.houseInput]} placeholderTextColor="#333" editable={editable} />
              <TextInput placeholder="SUITE" value={suite} onChangeText={setSuite} style={[CommonStyles.input, styles.suiteInput]} placeholderTextColor="#333" editable={editable} />
            </View>

            <TextInput placeholder="STREET" value={street} onChangeText={setStreet} style={CommonStyles.input} placeholderTextColor="#333" editable={editable} />
            <TextInput placeholder="STATE" value={state} onChangeText={setState} style={CommonStyles.input} placeholderTextColor="#333" editable={editable} />
            <TextInput placeholder="COUNTRY" value={country} onChangeText={setCountry} style={CommonStyles.input} placeholderTextColor="#333" editable={editable} />
            <TextInput placeholder="ZIP" value={zip} onChangeText={setZip} style={CommonStyles.input} placeholderTextColor="#333" editable={editable} />

            <DropDownPicker
              items={ADDRESSTYPES}
              defaultIndex={ADDRESSTYPES.findIndex((item) => addressType == item.value)}
              style={styles.dropdown}
              labelStyle={{ textAlign: 'left' }}
              arrowSize={10}
              arrowStyle={{ top: 0 }}
              dropDownStyle={{zIndex: 100}}
              onChangeItem={item => setAddressType(item.value)}
              disabled={!editable}
            />

            <DropDownPicker
              items={BILLINGTYPES}
              defaultIndex={BILLINGTYPES.findIndex((item) => billingType == item.value)}
              zIndex={10}
              style={styles.dropdown}
              labelStyle={{ textAlign: 'left' }}
              arrowSize={10}
              arrowStyle={{ top: 0 }}
              onChangeItem={item => setBillingType(item.value)}
              disabled={!editable}
            />

            <CheckBox
                title='Default Address'
                checked={isDefault}
                onPress={() => editable && setDefault(!isDefault)}
                containerStyle={CommonStyles.checkbox}
                checkedColor={Colors.mainColor}
              />
            {
              editable && (
                <View style={styles.saveButtonContainer}>
                  <TouchableOpacity style={styles.saveButton} onPress={submit}>
                    <Text style={styles.saveButtonLabel}>SAVE/UPDATE</Text>
                  </TouchableOpacity>
                </View>
              )
            }
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
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    textAlign: 'center',
    marginBottom: 5
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
    padding: 8,
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  saveButtonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
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

  dropdown: {
    height: 30,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 0,
    textAlign: 'left',
    marginBottom: 5
  },
  editButton: {
    right: 0,
    top: 0,
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  addressTitle: {
    textAlign: 'center',
    marginVertical: 20
  },
  houseSuiteContainer: {
    flexDirection: 'row'
  },
  suiteInput: {
    marginLeft: 5,
    width: 70
  },
  houseInput: {
    flex: 1
  }
});
