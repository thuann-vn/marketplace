import * as React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import ProfileSidebar from './includes/profileSidebar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';
import { Routes } from '../../constants/Routes';
import { AccountService } from '../../services/account';

const APPROVELIST = [
  {
    title: 'My pending approvals',
    data: [
      {
        id: 1,
        name: 'John Stewart'
      },
      {
        id: 1,
        name: 'Mike Taylor'
      },
    ]
  },
  {
    title: 'Approved users',
    data: [
      {
        id: 1,
        name: 'John Stewart'
      },
      {
        id: 1,
        name: 'Mike Taylor'
      },
    ]
  }
 
]

export default function ManagementScreen(props) {
  const [inviteUser, setInviteUser] = React.useState('');
  const [costCode, setCostCode] = React.useState('');
  const [addUser, setAddUser] = React.useState('');

  React.useEffect(()=>{
    Promise.all([
      AccountService.getProfile().then(response=>{
        return response;
      }),
      // AddressService.detail(1).then((response)=>{
      //   return response;
      // })
    ]).then(result=>{
      
    }).catch(error => {
      console.error('error', error);
    })
  }, [])

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

          <View style={styles.listApprovalContainer}>
            <SectionList
              sections={APPROVELIST}
              keyExtractor={(item, index) => 'approve_' + index}
              renderSectionHeader={({section}) => (<Text style={styles.title}>{section.title}</Text>)}
              renderItem={({item}) => {
                return (<View style={styles.row}>
                  <View style={[styles.column, {flex: 1}]}>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={styles.column}>
                    <TouchableOpacity onPress={()=> props.navigation.navigate(Routes.accountManagementDetail)}><Text style={styles.viewEditButtonLabel}>view/edit</Text></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
                  </TouchableOpacity>
                </View>)
              }}
              ListFooterComponent={() => (
                <View style={styles.listFooter}>
                  <View style={styles.contentSeparator}></View>
                  <Text style={styles.title}>Invite User</Text>
                  <View style={styles.inviteContainer}>
                    <TextInput style={[CommonStyles.input, styles.inviteInput]} placeholder="USER NAME"/>
                    <TouchableOpacity style={styles.inviteButton}><Text style={styles.inviteButtonLabel}>INVITE</Text></TouchableOpacity>
                  </View>


                  <View style={styles.contentSeparator}></View>
                  <Text style={styles.title}>Join Company</Text>
                  <View style={styles.inviteContainer}>
                    <TextInput style={[CommonStyles.input, styles.inviteInput]} placeholder="COST CODE"/>
                    <TouchableOpacity style={styles.inviteButton}><Text style={styles.inviteButtonLabel}>JOIN</Text></TouchableOpacity>
                  </View>


                  <View style={styles.contentSeparator}></View>
                  <Text style={styles.title}>Add Anonymous Users</Text>
                  <View style={styles.inviteContainer}>
                    <TextInput style={[CommonStyles.input, styles.inviteInput]} placeholder="0"/>
                    <TouchableOpacity style={styles.inviteButton}><Text style={styles.inviteButtonLabel}>UPDATE</Text></TouchableOpacity>
                  </View>

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
  listApprovalContainer: {
    flex: 1,
    padding: 10
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
