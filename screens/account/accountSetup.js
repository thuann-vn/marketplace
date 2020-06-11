import * as React from 'react';
import { Platform, StyleSheet, View, Text, Alert } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Routes } from '../../constants/Routes';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';
import { AccountService } from '../../services/account';
import Constants from '../../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountSetupScreen() {
  const navigation = useNavigation();
  const [accounts, setAccounts] = React.useState([]);


  //Get data function
  const _loadData = ()=>{
    AccountService.getAccounts().then(response => {
      if(response.status == 'success'){
        setAccounts(response.payload);
      }
    });
  }

  //Get data
  React.useEffect(_loadData, []);

  //Reload data if focus screen
  useFocusEffect(
    React.useCallback(() => {
      _loadData();
    }, [])
  );

  const editItem = (item) => {
    if(item.type == Constants.accountTypes.credit){
      navigation.navigate(Routes.addOrEditCard, {id: item.id})
    }else{
      navigation.navigate(Routes.addOrEditBank, {id: item.id})
    }
  }

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
          onPress: () => AccountService.deleteAccount(deleteItem.id).then((response)=>{
            let newAccounts = [...accounts];
            const index = newAccounts.findIndex((item)=>{
              return item.id == deleteItem.id;
            });
            
            newAccounts.splice(index, 1);
            setAccounts(newAccounts);
          })
        }
      ]);
  }

  const _renderItems = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text style={styles.cardNo}>{item.accountNumber}</Text>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.type}>{item.type == 'bank' ? 'Bank' : 'Credit Card'}</Text>
        </View>

        <TouchableOpacity style={styles.listItemButton} onPress={()=>deleteItem(item)}>
          <MaterialCommunityIcons name="delete-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemButton} onPress={()=>editItem(item)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <ProfileName />
      <View style={styles.separator}></View>
      <View style={styles.listContainer}>
        <AddCardAndBankSidebar />
        <FlatList
          data={accounts}
          renderItem={_renderItems}
          keyExtractor={(item, index) => 'item_' + index}
        />
      </View>
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
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  cardNo: {
    marginRight: 5,
  },
  cardName: {
    marginRight: 5
  },
  type: {
    marginRight: 5
  },
  listItemButton: {
    paddingHorizontal: 5
  }
});
