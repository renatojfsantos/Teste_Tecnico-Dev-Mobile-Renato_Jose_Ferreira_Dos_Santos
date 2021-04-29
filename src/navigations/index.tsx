import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from '~/views/Categories';
import Questions from '~/views/Questions';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Categories" component={Categories} />
    <App.Screen name="Questions" component={Questions} />
  </App.Navigator>
);

export default AuthRoutes;
