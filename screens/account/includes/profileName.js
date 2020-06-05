import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../constants/Routes';

export default function ProfileName(props) {
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch();
  console.log(settings);
  
  return (
    <View style={styles.container}>
        <Text style={styles.profileName}>Thua Nguyen</Text>
        {
            !props.hideTitle && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.title || 'ACCOUNT SETUP'}</Text>
                </View>
            )
        }
       
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
      flex: 1
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
});
