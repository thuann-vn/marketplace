import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';
import { Image } from 'react-native';

export default function TabBarIcon(props) {
  var source = null;
  return (
    <Image source={props.source} style={{width: 32, height: 32, ...props.style}} color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} resizeMethod="resize" resizeMode="contain"/>
  );
}
