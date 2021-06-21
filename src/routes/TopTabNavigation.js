import React from 'react';
import {Text,View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeusEventos from '../screens/authenticated/MeusEventos';
import ListarEventos from '../screens/authenticated/ListarEventos';

const TabTop = createMaterialTopTabNavigator();

function TopTabNavigation() {

  return (
    <TabTop.Navigator
      tabBarOptions={{
        activeTintColor: '#597291',
        inactiveTintColor:'#6E6E6E',
        indicatorStyle: {
          backgroundColor: '#6E6E6E',
          borderBottomColor: '#597291',
          borderBottomWidth: 2,
        },
        labelStyle: {
          alignSelf: 'stretch',
        },
      }}
    >
      <TabTop.Screen
        name="ListarEventos"
        component={ListarEventos}
        options={{
          tabBarLabel: ({ focused }) => <Text style={{color:focused?'#597291':'#6E6E6E'}}>Todos Eventos</Text>,
        }}
      />
      <TabTop.Screen
        name="MeusEventos"
        component={MeusEventos}
        options={{
          tabBarLabel: ({ focused }) => <Text style={{color:focused?'#597291':'#6E6E6E'}}>Meus Eventos</Text>,
        }}
      />
    </TabTop.Navigator>
  );
};

export default TopTabNavigation;
