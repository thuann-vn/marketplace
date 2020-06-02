import * as React from 'react';
import { Platform, StyleSheet, View, Text, SectionList } from 'react-native';
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
import CompanySidebar from './includes/companySidebar';

const COMPANYLIST = [
  {
    id: 1,
    name: 'Test LLC'
  },
  {
    id: 1,
    name: 'Test LLC 2'
  },
]

export default function CompanyScreen() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [role, setRole] = React.useState('');
  const [isSelected, setSelection] = React.useState(false);
  const [editable, setEditable] = React.useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <ProfileName hideTitle />
        <ProfileProgressBar />
        <View style={styles.separator}></View>
        <View style={styles.listContainer}>
          <CompanySidebar />

          <View style={styles.listApprovalContainer}>
            <FlatList
              data={COMPANYLIST}
              keyExtractor={(item, index) => 'approve_' + index}
              renderItem={({item}) => {
                return (<View style={styles.row}>
                  <View style={[styles.column, {flex: 1}]}>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={styles.column}>
                    <TouchableOpacity><Text style={styles.viewEditButtonLabel}>view/edit</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
                  </TouchableOpacity>
                </View>)
              }}
              ListFooterComponent={() => (
                <View style={styles.listFooter}>
                  <TextInput style={[styles.input]} placeholder="Company name"/>
                  <TextInput style={[styles.input]} placeholder="Company Info"/>
                  <TextInput style={[styles.input]} placeholder="subsidary yes/no"/>

                  <Text style={styles.addressTitle}>ADDRESS DETAILS</Text>

                  <View style={styles.houseSuiteContainer}>
                    <TextInput placeholder="HOUSE" value={firstName} onChangeText={setFirstName} style={[styles.input, styles.houseInput]} placeholderTextColor="#333" editable={editable} />
                    <TextInput placeholder="SUITE" value={lastName} onChangeText={setLastName} style={[styles.input, styles.suiteInput]} placeholderTextColor="#333" editable={editable} />
                  </View>

                  <TextInput placeholder="STREET" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} placeholderTextColor="#333" editable={editable} />
                  <TextInput placeholder="STATE" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} placeholderTextColor="#333" editable={editable} />
                  <TextInput placeholder="COUNTRY" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} placeholderTextColor="#333" editable={editable} />
                  <TextInput placeholder="ZIP" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} placeholderTextColor="#333" editable={editable} />

                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonLabel}>SAVE/UPDATE</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  contentSeparator:{
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginTop: 10
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
    backgroundColor: '#666666',
    padding: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20
  },
  buttonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '700'
  },
  listApprovalContainer: {
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
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inviteButton: {
    backgroundColor: '#666666',
    padding: 6,
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: 80,
    alignItems: 'center'
  },
  inviteButtonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '700'
  },
  inviteInput:{
    marginBottom: 0,
    marginRight: 10,
    flex: 1
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
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '600'
  },
  addressTitle:{
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600'
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
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
    backgroundColor: '#B3CAC7',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderColor: '#fff',
    borderWidth: 0.5
  },
  viewEditButtonLabel:{
    color: '#55308D',
    fontWeight: '600'
  },
  deleteButton:{
    marginLeft: 0
  },
  listFooter:{
    marginTop: 10
  }
});
