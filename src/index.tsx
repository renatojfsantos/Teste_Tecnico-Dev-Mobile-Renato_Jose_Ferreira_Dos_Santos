import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './navigations';
import { AppProvider } from '~/contexts/App';

const App: React.FC = () => (
  <AppProvider>
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </NavigationContainer>
  </AppProvider>
);

export default App;
