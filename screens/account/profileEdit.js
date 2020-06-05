import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import ProfileSidebar from './includes/profileSidebar';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';
import { AccountService } from '../../services/account';

export default function ProfileEditScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [role, setRole] = React.useState('');
  const [isSelected, setSelection] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  
  const [house, setHouse] = React.useState(false);
  const [suite, setSuite] = React.useState(false);
  const [street, setStreet] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [country, setCountry] = React.useState(false);
  const [zip, setZip] = React.useState(false);

  React.useEffect(()=>{
    AccountService.getProfile().then(response => {
      if(response.status == 'success'){
        if(response.payload.id.length == 1){
          const user = response.payload.id[0];
          setEditable(false);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.mobileNo);
          setRole(user.role);
  
          setHouse(user.house);
          setSuite(user.suite);
          setStreet(user.street);
          setState(user.state);
          setCountry(user.state);
          setZip(user.zip);
        }
      }
    });
  }, [])

  const firstNameInput = React.useRef(null);
  const setEditOn = () =>{
    setEditable(!editable);
    setTimeout(()=>{
      firstNameInput.current.focus();
    })
  }

  const submit = () =>{
    
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
              items={[
                { label: 'ID Proof', value: '1' },
                { label: 'Address Proof', value: '2' },
                { label: 'ID & Address Proof', value: '3' },
                { label: 'Company Incoproation', value: '4' },
                { label: 'Tax Certificate', value: '5' },
              ]}
              defaultIndex={0}
              style={styles.dropdown}
              labelStyle={{ textAlign: 'left' }}
              arrowSize={10}
              arrowStyle={{ top: 0 }}
              onChangeItem={item => console.log(item.label, item.value)}
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
