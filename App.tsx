import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/themes';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import { SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 0, backgroundColor: theme.colors.primary }} />
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
