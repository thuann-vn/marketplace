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

export default function CompanyDetailScreen() {
  const [] = React.useState('');
  const [] = React.useState('');
  const [billToParent, setBillToParent] = React.useState(true);


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'
      >
        <ProfileName hideTitle />
        <ProfileProgressBar />
        <View style={styles.separator}></View>
        <View style={styles.contentContainer}>
          <CompanySidebar />

          <View style={styles.inputContainer}>
            <TextInput style={[CommonStyles.input]} placeholder="Company name"/>
            <TextInput style={[CommonStyles.input]} placeholder="Company Info"/>
            <CheckBox
              title='Default Payment'
              checked={billToParent}
              onPress={() => setBillToParent(!billToParent)}
              containerStyle={CommonStyles.checkbox}
              checkedColor={Colors.mainColor}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonLabel}>SAVE/UPDATE</Text>
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
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    textAlign: 'center',
    marginBottom: 5,
    width: '100%'
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
  },
});
