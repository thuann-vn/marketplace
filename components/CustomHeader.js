import { Ionicons, Octicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, StatusBar, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import Popover from 'react-native-popover-view';
import { withNavigation } from '@react-navigation/compat';

import Colors from '../constants/Colors';
import { AuthContext } from '../context/auth';
import { Routes } from '../constants/Routes';
import { AuthService } from '../services/auth';

class CustomHeader extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      accountSettingVisible: false
    }
  }

  _accountSettingToggle = () =>{
    this.setState({accountSettingVisible: !this.state.accountSettingVisible});
  }

  _navigate =  (route) =>{
    this._accountSettingToggle();
    this.props.navigation.navigate(route);
  }

  _logout = () => {
    this._accountSettingToggle();
    AuthService.logout().then(()=>{
      this.context.signOut();
    })
  }

  render(){
    return (
    <View style={styles.container}>
        <Avatar
          ref={ref => this.avatarRef = ref}
          size="small"
          rounded
          source={require('../assets/images/default_avatar.png')}
          containerStyle={styles.avatar}
          onPress={this._accountSettingToggle}
        />
        <Popover mode="rn-modal"  
          placement="bottom"
          isVisible={this.state.accountSettingVisible}
          fromView={this.avatarRef}
          onRequestClose={() => this._accountSettingToggle()}>
          <TouchableOpacity onPress={()=> this._navigate(Routes.settings)}>
            <View style={styles.menuItem}>
              <Ionicons name="md-settings" style={styles.menuIcon} size={22} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this._logout()}>
            <View style={styles.menuItem}>
              <Ionicons name="md-log-out" style={styles.menuIcon} size={22} />
              <Text style={styles.menuText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </Popover>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="md-search"
            size={30}
            style={styles.searchIcon}
            color='#777'
          />
          <TextInput placeholder="Search" style={styles.searchInput}/>
        </View>
        <TouchableOpacity>
          <Image source={require('../assets/images/icons/messages.png')} style={{width: 32, height: 32}}/>
        </TouchableOpacity>
    </View>
  );
  }
  
}

CustomHeader.contextType = AuthContext;
export default withNavigation(CustomHeader);


const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  avatar: {
    backgroundColor: '#ccc'
  },
  searchInputContainer:{
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 36,
  },
  searchInput:{
    borderWidth:1,
    borderColor: '#ccc',
    flex: 1,
    paddingHorizontal: 10,
    paddingLeft: 40,
    borderRadius: 2,
  },
  searchIcon:{
    position: 'absolute',
    top: 5,
    left: 10,
    color: '#777'
  },
  menuItem:{
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  menuText:{
    color: '#000',
    marginLeft: 10
  }
});

