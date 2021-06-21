

import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import BottomNavigation from './BottomNavigation';
import telaInformacao from '../screens/notAuthenticated/telaInformacao'
import cadastrar from '../screens/notAuthenticated/cadastrar'
import VisualizarEvento from '../screens/notAuthenticated/VisualizarEvento';
import RecuperarSenha from '../screens/notAuthenticated/RecuperarSenha'
const Stack = createStackNavigator();

function AuthRoutes() {


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
        <Stack.Screen
          name="Cadastrar"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={cadastrar}
        />
        <Stack.Screen
          name="Visualizar Evento"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={VisualizarEvento}
        />
        <Stack.Screen
          name="Recuperar Senha"
          options={{headerTintColor: '#ECEBDF',headerShown:true,headerStyle:{backgroundColor: '#768899'}}}
          
          component={RecuperarSenha}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthRoutes;
