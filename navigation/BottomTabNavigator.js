import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerShown: false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require('../assets/images/icons/home.png')}/>,
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={LinksScreen}
        options={{
          title: 'My Tasks',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require('../assets/images/icons/tasks.png')}  />,
        }}
      />
      <BottomTab.Screen
        name="Invoice"
        component={LinksScreen}
        options={{
          title: 'Invoice',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require('../assets/images/icons/invoice.jpg')} style={{height: 24}}  />,
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={LinksScreen}
        options={{
          title: 'Post',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require('../assets/images/icons/post.png')}  />,
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={LinksScreen}
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require('../assets/images/icons/notification.png')}   style={{height: 20}}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  return routeName
}
