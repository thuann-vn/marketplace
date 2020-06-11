import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { CheckBox } from 'react-native-elements';
import Colors from '../../constants/Colors';
import ProfileName from './includes/profileName';
import ProfileProgressBar from './includes/profileProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CompanySidebar from './includes/companySidebar';
import { CommonStyles } from '../../constants/Styles';
import { CompanyService } from '../../services/company';
import { Routes } from '../../constants/Routes';

export default function CompanyDetailScreen({navigation, route}) {
  const [companyName, setCompanyName] = React.useState('');
  const [companyInfo, setCompanyInfo] = React.useState('');
  const [billToParent, setBillToParent] = React.useState(false);
  const id = route.params?.id ? route.params?.id : 0;

  //Get data
  React.useEffect(()=>{
    if(id > 0){
      CompanyService.detail(id).then(response => {
        if(response.status == 'success'){
          const data = response.payload[0];
          setCompanyName(data.name);
          setCompanyInfo(data.companyInfo);
          setBillToParent(data.payUsingParent == 'yes');
        }
      });
    }
  }, []);


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

  const submit = ()=>{
    if(_validate()){
      CompanyService.addOrEditCompany({
        id: id,
        name: companyName,
        companyInfo: companyInfo,
        payUsingParent: billToParent? 'yes' : 'no'
      }).then(response =>{
        console.log(response);
        if(response.status == 'success'){
          navigation.navigate(Routes.company);
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
        <ProfileName hideTitle showProgressbar/>
        <View style={styles.separator}></View>
        <View style={styles.contentContainer}>
          <CompanySidebar />

          <View style={styles.inputContainer}>
            <TextInput placeholder="Company name" value={companyName} onChangeText={setCompanyName} style={CommonStyles.input} placeholderTextColor="#333" />
            <TextInput placeholder="Company Info" value={companyInfo} onChangeText={setCompanyInfo} style={CommonStyles.input} placeholderTextColor="#333"/>
            <CheckBox
              title='Bill To Parent'
              checked={billToParent}
              onPress={() => setBillToParent(!billToParent)}
              containerStyle={CommonStyles.checkbox}
              checkedColor={Colors.mainColor}
            />

            <TouchableOpacity style={CommonStyles.button} onPress={submit}>
              <Text style={CommonStyles.buttonLabel}>SAVE/UPDATE</Text>
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
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  contentContainer: {
    marginTop: 20,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  },
  inputContainer:{
    flex: 1,
    paddingHorizontal: 10,
  },
});
