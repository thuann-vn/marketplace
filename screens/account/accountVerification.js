import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ProfileName from './includes/profileName';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AUDIT = [
  {
    user: 'Manjunath Rajesh',
    date: '02/20/2020',
    message: 'Can you please send us company certificate'
  },
  {
    user: 'Ken Carlson',
    date: '02/21/2020',
    message: 'Sorry, we dont have'
  }
]

export default function AccountVerification() {

  const [file, setFile] = React.useState('');
  const [] = React.useState('');
  const [comment, setComment] = React.useState('');

  const _selectFile = () => {
    DocumentPicker.getDocumentAsync({
      multiple: true
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <ProfileName title="ACCOUNT VERIFICATION" />
        <View style={styles.separator} />

        <View style={styles.inputContainer}>
          <View style={styles.fileBrowser}>
            <TextInput placeholder="" value={file} onChangeText={setFile} style={[styles.input, styles.fileInput]} placeholderTextColor="#333" />
            <TouchableOpacity style={styles.button} onPress={_selectFile}>
              <Text style={styles.buttonLabel}>BROWSE</Text>
            </TouchableOpacity>
          </View>
          <DropDownPicker
            items={[
              { label: 'ID Proof', value: '1' },
              { label: 'Address Proof', value: '2' },
              { label: 'ID & Address Proof', value: '3' },
              { label: 'Company Incoproation', value: '4' },
              { label: 'Tax Certificate', value: '5' },
            ]}
            defaultIndex={0}
            style={styles.dropdown}
            labelStyle={{ textAlign: 'left' }}
            onChangeItem={item => console.log(item.label, item.value)}
          />
          <TouchableOpacity style={[styles.button, styles.uploadButton]}>
            <Text style={styles.buttonLabel}>UPLOAD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.auditContainer}>
          <Text style={styles.auditTitle}>AUDIT TRAIL</Text>
          <FlatList
            style={styles.auditList}
            data={AUDIT}
            keyExtractor={(item, index) => 'audit_' + index}
            renderItem={({ item }) => {
              return (
                <View style={styles.auditItem}>
                  <Text>{item.user} >>>> </Text>
                  <Text>{item.date}: {item.message}</Text>
                </View>
              )
            }}
          />

          <View style={styles.commentContainer}>
            <TextInput placeholder="COMMENT TEXT BOX" value={comment} onChangeText={setComment} style={[styles.input, styles.commentInput]} multiline={true} placeholderTextColor="#333" />

            <TouchableOpacity style={[styles.button, styles.commentButton]}>
              <Text style={styles.buttonLabel}>POST</Text>
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
    borderBottomWidth: 6,
    borderBottomColor: '#ccc'
  },
  fileBrowser: {
    flexDirection: 'row'
  },
  fileInput: {
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
  uploadButton: {
    marginTop: 20
  },
  buttonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700'
  },
  dropdown: {
    height: 40,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: '#000',
    borderRadius: 0,
    textAlign: 'left',
  },
  auditContainer: {
    paddingHorizontal: 20
  },
  auditTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  auditList: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10
  },
  auditItem: {
    marginTop: 5
  },
  commentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    minHeight: 100
  }
});
