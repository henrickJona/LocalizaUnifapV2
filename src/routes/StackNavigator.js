

import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import BottomNavigation from './BottomNavigation';

const Stack = createStackNavigator();

function StackNavigator() {


  return (
    <>
      <Stack.Navigator
      
        screenOptions={{
            headerShown:false
         /*  headerBackTitleVisible: false,
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
          }, */
        }}
      >
        <Stack.Screen
          name="Index"
          
          component={BottomNavigation}
        />
        
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
