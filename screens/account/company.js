import * as React from 'react';
import { Platform, StyleSheet, View, Text, SectionList, Alert, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import ProfileSidebar from './includes/profileSidebar';
import DropDownPicker from '../../components/DropDownPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CompanySidebar from './includes/companySidebar';
import { CommonStyles } from '../../constants/Styles';
import { CompanyService } from '../../services/company';
import Layout from '../../constants/Layout';
import { Routes } from '../../constants/Routes';
import { useFocusEffect } from '@react-navigation/native';
import { AddressService } from '../../services/address';
import Constants from '../../constants/Constants';

const ADDRESS_TYPES = Object.keys(Constants.addressTypes).map(key =>{
  return  { label: key, value:  Constants.addressTypes[key]};
});

const ADDRESS_USE_TYPES = Object.keys(Constants.addressUseTypes).map(key =>{
  return  { label: key, value: Constants.addressUseTypes[key]};
});

export default function CompanyScreen({navigation}) {
  const [companyList, setCompanyList] = React.useState([]);

  const [companyName, setCompanyName] = React.useState('');
  const [companyInfo, setCompanyInfo] = React.useState('');
  const [subsidary, setSubsidary] = React.useState('');
  const [loading, setLoading] = React.useState(true);


  //Address
  const [house, setHouse] = React.useState('');
  const [suite, setSuite] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [addressType, setAddressType] = React.useState(Constants.addressTypes.RESIDENTIAL);
  const [useType, setUseType] = React.useState(Constants.addressUseTypes.BILLING);

  //Get data function
  const _loadData = async ()=>{
    const companyResponse = await CompanyService.list();
    if(companyResponse.status == 'success'){
      setCompanyList(companyResponse.payload);
      setLoading(false);
    }else{
      Alert.alert(companyResponse.msg);
    }
  }

  //Get data
  React.useEffect(() => _loadData, []);

  //Reload data if focus screen
  useFocusEffect(
    React.useCallback(() => {
      _loadData();
    }, [])
  );

  //Edit item
  const editItem = (item) => {
    navigation.navigate(Routes.companyDetail, {id: item.id})
  }

  //Delete item
  const deleteItem = (deleteItem) => {
    Alert.alert(
      'Are you sure?', 
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { 
          text: 'OK',
          onPress: () => CompanyService.deleteCompany(deleteItem.id).then((response)=>{
            var newCompanyList = [...companyList];
            const index = newCompanyList.findIndex((item)=>{
              return item.id == deleteItem.id;
            });

            newCompanyList.splice(index, 1);
            setCompanyList(newCompanyList);
          })
        }
      ]);
  }


  //Validate
	const _validate = ()=>{
    var errors = [];
    var isValid = true;
    
    if(!companyName){
      var isValid = false;
      errors.push('Company name is required');
    }
    
    if(!isValid && errors.length){
      Alert.alert(errors[0]);
    }
    
		return isValid;
	}

  //Create company button
  const submit = async ()=>{
    if(_validate()){
      const createCompanyResult = await CompanyService.addOrEditCompany({
        name: companyName,
        companyInfo: companyInfo,
        subsidary: subsidary ? 'yes' : 'no'
      });

      console.log(createCompanyResult);


      if(createCompanyResult.status == 'success'){
        _loadData();

        //Create address
        const addressData = {
          companyId: createCompanyResult.payload.id,
          house, 
          suite, 
          street, 
          state,  
          country,
          zip,
          addressType: addressType,
          useType: useType,
          useTypeDefault: 'yes'
        }
        const createAddressResult = await AddressService.addOrUpdateAddress(addressData);
        console.log(createAddressResult);
        
        //Clear data
        setCompanyName('');
        setCompanyInfo('');
        setSubsidary(false);
        setHouse('');
        setCountry('');
        setSuite('');
        setStreet('');
        setState('');
        setZip('');
      }else{
        if(Array.isArray(createCompanyResult.msg) && createCompanyResult.msg.length){
          return Alert.alert(createCompanyResult.msg[0]);
        }
      }
    }
  }

  //Render content
  const _renderContent = () => {
    if(loading){
      return (
        <View style={CommonStyles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.mainColor} />
        </View>
      )
    }

    return !companyList.length ? (
      <View style={styles.listFooter}>
        <TextInput style={CommonStyles.input} value={companyName} onChangeText={setCompanyName}  placeholder="Company name"/>
        <TextInput style={CommonStyles.input} value={companyInfo} onChangeText={setCompanyInfo}  placeholder="Company Info"/>
        <CheckBox
          title='Subsidary'
          checked={subsidary}
          onPress={() => setSubsidary(!subsidary)}
          containerStyle={CommonStyles.checkbox}
          checkedColor={Colors.mainColor}
          wrapperStyle={{ marginHorizontal: 0 }}
        />
        <Text style={styles.addressTitle}>ADDRESS DETAILS</Text>

        <View style={styles.houseSuiteContainer}>
          <TextInput placeholder="HOUSE" value={house} onChangeText={setHouse} style={[CommonStyles.input, styles.houseInput]} placeholderTextColor="#333"/>
          <TextInput placeholder="SUITE" value={suite} onChangeText={setSuite} style={[CommonStyles.input, styles.suiteInput]} placeholderTextColor="#333"/>
        </View>

        <TextInput placeholder="STREET" value={street} onChangeText={setStreet} style={CommonStyles.input} placeholderTextColor="#333"/>
        <TextInput placeholder="STATE" value={state} onChangeText={setState} style={CommonStyles.input} placeholderTextColor="#333"/>
        <TextInput placeholder="COUNTRY" value={country} onChangeText={setCountry} style={CommonStyles.input} placeholderTextColor="#333"/>
        <TextInput placeholder="ZIP" value={zip} onChangeText={setZip} style={CommonStyles.input} placeholderTextColor="#333"/>

        <DropDownPicker
          defaultNull={false}
          items={ADDRESS_TYPES}
          defaultIndex={ADDRESS_TYPES.findIndex((item) => addressType == item.value)}
          style={styles.dropdown}
          labelStyle={{ textAlign: 'left' }}
          arrowSize={10}
          arrowStyle={{ top: 0 }}
          dropDownStyle={{zIndex: 100}}
          onChangeItem={item => setAddressType(item.value)}
        />

        <DropDownPicker
          defaultNull={false}
          items={ADDRESS_USE_TYPES}
          defaultIndex={ADDRESS_USE_TYPES.findIndex((item) => useType == item.value)}
          zIndex={10}
          style={styles.dropdown}
          labelStyle={{ textAlign: 'left' }}
          arrowSize={10}
          arrowStyle={{ top: 0 }}
          onChangeItem={item => setUseType(item.value)}
        />

        <TouchableOpacity style={CommonStyles.button} onPress={submit}>
          <Text style={CommonStyles.buttonLabel}>SAVE/UPDATE</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <FlatList
        data={companyList}
        keyExtractor={(item, index) => 'company_' + index}
        renderItem={({item}) => {
          return (<View style={styles.row}>
            <View style={[styles.column, {flex: 1}]}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => editItem(item)}><Text style={styles.viewEditButtonLabel}>view/edit</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteItem(item)}>
              <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>)
        }}
      />

    )
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
          <CompanySidebar />
          <View style={styles.listApprovalContainer}>
            <Text style={styles.title}>My Company</Text>
            {_renderContent()}
            {
              
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
    minHeight: Layout.window.height,
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
    marginBottom: 5
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
    textAlign: 'center',
    fontSize: 18,
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
