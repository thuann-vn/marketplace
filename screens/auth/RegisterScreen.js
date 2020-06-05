import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';
import {
	KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, validatePassword } from '../../utils/commonUtil';
import { AuthContext } from '../../context/auth';
import { AuthService } from '../../services/auth';
import { Alert } from 'react-native';
import { Input } from 'react-native-elements';

export default class RegisterScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);

    this.state={
      // firstName: 'Thua',
      // familyName: 'Nguyen',
      // email: 'ngocthua92@live.com',
      // password: 'NgocThua92!',
      role: 'BUYER'
    }
  }

	_validate = ()=>{
    const requiredFields = [
      // { key: 'firstName', label: 'First name' },
      // { key: 'familyName', label: 'Family name' },
      { key: 'email', label: 'Email' },
      { key: 'password', label: 'Password' },
    ];
		var isValid = true;

		requiredFields.map((field) => {
      const {key, label} = field;
			if (!this.state[key]){
				isValid = false;
				this.setState({
					[key + '_error']: label + ' is required'
				})
			}else{
				this.setState({
					[key + '_error']: null
				})
			}
    })
    
		if(isValid && this.state.email && !validateEmail(this.state.email)){
			isValid = false;
			this.setState({
				email_error: 'Email format invalid.'
			})
    }
    
		if(isValid){
      var passwordValid = validatePassword(this.state.password);
      if(passwordValid != true){
        isValid = false;
        this.setState({
          password_error: passwordValid
        })
      }
    }
    
		return isValid;
	}


  _submit = ()=>{
    const {firstName, familyName, email, password, role} = this.state;
    if(this._validate()){
      AuthService.register({
        firstName, familyName, email, password, role
      }).then(result => {
        console.log(result);
        if(result.status == 'fail'){
          Alert.alert(result.msg);
        }else{
          AuthService.login(email, password).then((result) => {
            this.context.signIn();
          })
        }
      })
    }

    AuthService.login(email, password).then((result) => {
      if(result.status == 'success'){
        const {Users, token} = result.payload; 
        this.context.signIn(Users, token);
      }
    })
    return;
  }

  render(){
    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView
            extraScrollHeight={100} 
            enableOnAndroid={true} 
            keyboardShouldPersistTaps='handled'
          >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
              <View style={styles.getStartedContainer}>
                <Text style={[styles.text, styles.titleText]}>Join now, It's free</Text>

                <TouchableOpacity style={styles.socialLoginButton}>
                  <Text style={[styles.text, styles.socialLoginLabel]}>JOIN WITH GOOGLE OR FACEBOOK</Text>
                </TouchableOpacity>

                <View style={styles.hr}></View>
                <View style={styles.orContainer}>
                  <Text style={[styles.text, styles.orText]}>OR</Text>
                </View>

                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#fff" 
                  textContentType="name" placeholder="First Name" 
                  returnKeyType="next" 
                  onSubmitEditing={() => this.familyNameInput.focus()} 
                  onChangeText={(text) => this.setState({firstName: text})}
                />
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#fff" 
                  textContentType="familyName" placeholder="Last Name" 
                  returnKeyType="next" 
                  ref={(input) => { this.familyNameInput = input; }} 
                  onSubmitEditing={() => this.emailInput.focus()} 
                  onChangeText={(text) => this.setState({familyName: text})}
                />
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#fff" 
                  textContentType="emailAddress" 
                  placeholder="Email" 
                  keyboardType="email-address" 
                  returnKeyType="next" 
                  value={this.state.email}
                  ref={(input) => { this.emailInput = input; }} 
                  onSubmitEditing={() => this.passwordInput.focus()} 
                  onChangeText={(text) => this.setState({email: text})}
                />

                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#fff" 
                  placeholder="Password" 
                  secureTextEntry={true} 
                  returnKeyType="done" 
                  value={this.state.password}
                  ref={(input) => { this.passwordInput = input; }} 
                  onSubmitEditing={this._submit} 
                  onChangeText={(text) => this.setState({password: text})}
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={this._submit}>
                    <Text style={[styles.text, styles.submitButtonLabel]}>AGREE AND JOIN</Text>
                  </TouchableOpacity>
              </View>
              <Text style={[styles.text, styles.footerInfoText]}>You agree to MarketSpace LLC’s User agreement, Privacy & Cookie Policy</Text>
            </ScrollView>
          </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
  contentContainer: {
    paddingTop: 80,
		paddingHorizontal: 40,    
  },
  footerInfoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  text: {
    color: '#fff'
  },
  titleText:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10
  },
  socialLoginButton:{
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 30
  },
  socialLoginLabel: {
    color: Colors.mainColor,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  hr:{
    borderTopColor: '#fff',
    borderTopWidth: 1
  },
  orContainer:{
    marginTop: -10,
    zIndex: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',    
    backgroundColor: Colors.mainColor,
    width: 30,
    fontSize: 16
  },
  input:{
    color: '#fff',
    borderBottomColor:'#fff',
    borderBottomWidth: 1,
    paddingVertical:10,
    paddingLeft: 10,
    marginBottom: 10
  },
  submitButton:{
    backgroundColor: Colors.mainColor,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 30,
    width: 220,
    alignSelf: 'center',
    marginTop: 20
  },
  submitButtonLabel: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
});
