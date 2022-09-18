import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth';

import Routes from './src/routes';

export default function appDevPost() {
 return (
  
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#36393f' barStyle='light-content' translucent={ false } />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
   
  );
}