import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import Principal from '../screens/authenticated/Principal'
import Usuario from '../screens/authenticated/Usuario';
import TopTabNavigation from '../routes/TopTabNavigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from 'react-native';
const Tab = createBottomTabNavigator();

function BottomNavigationSigned() {
  return (
    <Tab.Navigator tabBarOptions={{
      inactiveTintColor: '#6E6E6E',
      activeTintColor: '#597291',
      labelStyle: {
        fontSize: 12,
      },
    
    }}>
      <Tab.Screen name="Inicio" component={Principal} options={{
         tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="home" />
          ),
          
        }} />
      <Tab.Screen name="TopTabNavigation" component={TopTabNavigation} options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="bookmark" />
          ),
        }} />
      <Tab.Screen name="Perfil" component={Usuario} options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="user" />
          ),
        }} />
    </Tab.Navigator>
  );
}
export default BottomNavigationSigned;