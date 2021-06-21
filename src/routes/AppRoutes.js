

import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import BottomNavigationSigned from './BottomNavigationSigned';
import InfoScreen from '../screens/authenticated/InfoScreen'
import AddEvento from '../screens/authenticated/AddEvento'
import EditEvento from '../screens/authenticated/EditEvento'
import Event from '../screens/authenticated/Event'
import MudarSenha from '../screens/authenticated/MudarSenha'
const Stack = createStackNavigator();

function AppRoutes() {


  return (
    <>
      <Stack.Navigator
      
        screenOptions={{
            headerShown:false,
          headerBackTitleVisible: false,
          headerTintColor: 'black',
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
        }}
      >
        <Stack.Screen
  options={{headerShown:false}}

          name="Index"
          screenOptions={{
            headerShown:false,
          }}
          component={BottomNavigationSigned}
        />
        <Stack.Screen
          name="Detalhes"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={InfoScreen}
        />
        <Stack.Screen
          name="Adicionar Evento"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={AddEvento}
        />
        <Stack.Screen
          name="Evento"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={Event}
        />
        <Stack.Screen
        name="Edição Evento"
        options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
        
        component={EditEvento}
      />
      <Stack.Screen
        name="Mudar Senha"
        options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
        
        component={MudarSenha}
      />
        
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
