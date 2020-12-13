

import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import BottomNavigation from './BottomNavigation';
import telaInformacao from '../telaInformacao'
const Stack = createStackNavigator();

function StackNavigator() {


  return (
    <>
      <Stack.Navigator
      
       /*  screenOptions={{
            headerShown:false
          headerBackTitleVisible: false,
          headerTintColor: '#ECEBDF',
          headerTitleAlign: 'left',
        
          cardStyle: {
            backgroundColor: '#ECEBDF',
          },
          headerStyle: {
            backgroundColor: '#ECEBDF',
            borderBottomWidth: 0,
            borderBottomColor: '#ECEBDF',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            elevation: 3,
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          },
        }} */
      >
        <Stack.Screen
  options={{headerShown:false}}

          name="Index"
          screenOptions={{
            headerShown:false
          }}
          component={BottomNavigation}
        />
        <Stack.Screen
          name="Detalhes"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={telaInformacao}
        />
        
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
