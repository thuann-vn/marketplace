import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const DATA = [
    {
        cardNo: '354466662345',
        cardName: 'Bhavin Rajpara',
        type: 'Credit Card',
        isDefault: true,
    },
    {
        cardNo: '354466662345',
        cardName: 'Bhavin Rajpara',
        type: 'Checking',
        isDefault: true,
    }
];

export default function AccountSetupScreen() {

    const _renderItems = ({item})=> {
        console.log(item);
        return (
            <View style={styles.listItem}>
                <Text style={styles.cardNo}>{item.cardNo}</Text>
                <Text style={styles.cardName}>{item.cardName}</Text>
                <Text style={styles.type}>{item.type}</Text>

                <TouchableOpacity style={styles.listItemButton}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemButton}>
                   <Text>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[0]}>
        <CustomHeader/>
        
        <Text style={styles.profileName}>Thua Nguyen</Text>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>ACCOUNT SETUP</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.listContainer}>
            <View style={styles.listActions}>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="credit-card" size={32} color="#333" />
                    <Text style={styles.buttonLabel}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="bank" size={32} color="#333" />
                    <Text style={styles.buttonLabel}>Add Bank</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={DATA}
                renderItem = {_renderItems}
                keyExtractor={(item, index)=>'item_' + index}
            />
        </View>
      </ScrollView>
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
  profileName: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#DEE6EF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  titleContainer:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  titleText: {
    fontSize: 16
  },
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  listContainer:{
    marginTop: 20,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row'
  },
  listActions:{
    width: 135,
    minHeight: 300,
    borderRightColor: '#ccc',
    borderRightWidth: 1
  },
  button:{
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5
  },
  buttonLabel:{
    color: '#333',
    marginLeft: 10,
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  listItem:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
      paddingHorizontal: 10
  },
  cardNo:{
      marginRight: 5,
  },
  cardName: {
      marginRight: 5
  },
  type: {
      marginRight: 5
  },
  listItemButton:{
      paddingHorizontal: 5
  }
});
