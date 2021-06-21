import React from "react";

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import { EventProvider } from './src/contexts/events';
import Routes from './src/routes';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <EventProvider>
          <Routes/>
        </EventProvider>
        
      </AuthProvider>
     
    </NavigationContainer>
  );
}


