import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/Routes';
import AddCardAndBankSidebar from './includes/addCardAndBankSidebar';
import ProfileName from './includes/profileName';

export default function AccountVerification() {
  const navigation = useNavigation();

  const [file, setFile] = React.useState('');
  const [type, setType] = React.useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[0]}>
      <CustomHeader />
      <ProfileName title="ACCOUNT VERIFICATION"/>
      <View style={styles.separator}/>

      <View style={styles.inputContainer}>
        <View style={styles.fileBrowser}>
          <TextInput placeholder="" value={file} onChangeText={setFile} style={[styles.input, styles.fileInput]} placeholderTextColor="#333" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>BROWSE</Text>
          </TouchableOpacity>
        </View>
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
  separator: {
    paddingBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  fileBrowser:{
    flexDirection:'row'
  },
  fileInput:{
    flex: 1,
    marginRight: 10
  },
  inputContainer: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#666666',
    padding: 10,
    paddingHorizontal: 25,
    alignSelf: 'center'
  },
  buttonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700'
  },
});
