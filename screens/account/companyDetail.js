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

            <TouchableOpacity style={CommonStyles.button}>
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
