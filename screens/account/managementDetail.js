import * as React from 'react';
import { Platform, StyleSheet, View, Text, SectionList } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { CheckBox, Input } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import ProfileSidebar from './includes/profileSidebar';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';

const ROLES = [
  {
    title: 'Post',
    checked: false
  },
 
  {
    title: 'Edit Payment',
    checked: false
  },
  {
    title: 'View Payment',
    checked: false
  },
  {
    title: 'Verify Documents',
    checked: false
  },
  {
    title: 'Delete Users',
    checked: false
  },
  {
    title: 'Transfer Ownership',
    checked: false
  },
  {
    title: 'Add Users',
    checked: false
  },
]

export default function ManagementDetailScreen() {
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
          <ProfileSidebar />

          <View style={styles.detailContainer}>
              <Text style={styles.name}>MIKE TAYLOR, Commodity Specialist</Text>
              <View style={[styles.separator, {marginHorizontal: 0, marginBottom: 20}]}></View>

              <TextInput placeholder="mtaylor@themarketspace.co" style={CommonStyles.input}/>
              <View style={styles.roleList}>
                {
                  ROLES.map((item, index) => (
                    <CheckBox
                      title={item.title}
                      checked={item.checked}
                      onPress={() => item.checked = !item.checked}
                      containerStyle={CommonStyles.checkbox}
                      textStyle={{marginLeft: 0}}
                      checkedColor={Colors.mainColor}
                      wrapperStyle={{ marginHorizontal: 0 }}
                      key={'role_' + index}
                    />
                  ))
                }
              </View>
             
              <TouchableOpacity style={CommonStyles.button}>
                <Text style={CommonStyles.buttonLabel}>SUBMIT</Text>
              </TouchableOpacity>
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
  detailContainer: {
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
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonLabel: {
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
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '600'
  },
  name:{
    fontWeight: '600'
  },
  roleList:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
