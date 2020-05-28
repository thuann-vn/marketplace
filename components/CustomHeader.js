import { Ionicons, Octicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import Menu, { MenuItem } from "react-native-material-menu";

import Colors from '../constants/Colors';

export default class CustomHeader extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
    <View style={styles.container}>
        <Menu
          ref={ref => (this._headerMenu = ref)}
          button={
            <Avatar
              size="small"
              rounded
              onPress={() => this._headerMenu.show()}
              source={require('../assets/images/default_avatar.png')}
              containerStyle={styles.avatar}
            />
         
          }
        >
          <MenuItem onPress={()=>{
          }}>
            <View style={styles.menuItem}>
              <Ionicons name="md-search" style={styles.menuIcon} size={22} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
          </MenuItem>
          <MenuItem onPress={()=>{
          }}>
            <View style={styles.menuItem}>
              <Ionicons name="md-search" style={styles.menuIcon} size={22} />
              <Text style={styles.menuText}>Logout</Text>
            </View>
          </MenuItem>
        </Menu>

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
          <Octicons
            name="comment-discussion"
            size={34}
            color='#777'
          />
        </TouchableOpacity>
    </View>
  );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  avatar: {
    backgroundColor: '#ccc'
  },
  searchInputContainer:{
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  searchInput:{
    borderWidth:1,
    borderColor: '#ccc',
    flex: 1,
    paddingHorizontal: 10,
    paddingLeft: 40,
    borderRadius: 2
  },
  searchIcon:{
    position: 'absolute',
    top: 5,
    left: 10,
    color: '#777'
  },
  menuItem:{
    flex: 1,
    flexDirection: 'row'
  },
  menuText:{
    color: '#000'
  }
});

