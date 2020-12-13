import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import mapa from '../mapa'
import Perfil from '../Perfil';
import Evento from '../Evento';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from 'react-native';
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator tabBarOptions={{
      inactiveTintColor: '#444950',
      activeTintColor: '#597291',
      labelStyle: {
        fontSize: 12,
      },
    
    }}>
      <Tab.Screen name="Inicio" component={mapa} options={{
         tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="home" />
          ),
          
        }} />
      <Tab.Screen name="Eventos" component={Evento} options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="bookmark" />
          ),
        }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon size={22} color={color} name="user" />
          ),
        }} />
    </Tab.Navigator>
  );
}
export default BottomNavigation;