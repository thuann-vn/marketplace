import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ProfileName from './includes/profileName';
import DropDownPicker from '../../components/DropDownPicker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyles } from '../../constants/Styles';

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
            <TextInput placeholder="" value={file} onChangeText={setFile} style={[CommonStyles.input, styles.fileInput]} placeholderTextColor="#333" />
            <TouchableOpacity style={[CommonStyles.button, {marginTop: 0}]} onPress={_selectFile}>
              <Text style={CommonStyles.buttonLabel}>BROWSE</Text>
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
            style={CommonStyles.dropdown}
            labelStyle={{ textAlign: 'left' }}
            onChangeItem={item => console.log(item.label, item.value)}
          />
          <TouchableOpacity style={[CommonStyles.button, styles.uploadButton]}>
            <Text style={CommonStyles.buttonLabel}>UPLOAD</Text>
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
            <TextInput placeholder="COMMENT TEXT BOX" value={comment} onChangeText={setComment} style={[CommonStyles.input, styles.commentInput]} multiline={true} placeholderTextColor="#333" />

            <TouchableOpacity style={[CommonStyles.button, styles.commentButton]}>
              <Text style={CommonStyles.buttonLabel}>POST</Text>
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
    marginRight: 10,
    height: 34
  },
  inputContainer: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20
  },
  uploadButton: {
    marginTop: 20
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
  commentButton:{
    marginTop: 0
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    minHeight: 100,
    textAlign: 'left'
  }
});
