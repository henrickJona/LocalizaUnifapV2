import React from 'react';
import { StatusBar, Image, View, ActivityIndicator } from 'react-native';
/* import localizaUnifapLogo from '@assets/localizaUnifapLogo.png'; */
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { signed, loadingApp } = useAuth();
  if (loadingApp) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/localizaUnifapLogo.png')} resizeMode="center"  />
        <ActivityIndicator animating={loadingApp} color={'#E6E6E6'} size='large'  />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={'#FFF'}
        barStyle="light-content"
        hidden={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {signed ? (
          <Stack.Screen name="App" component={AppRoutes} />
        ) : (
          <Stack.Screen name="Auth" component={AuthRoutes} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default Routes;
