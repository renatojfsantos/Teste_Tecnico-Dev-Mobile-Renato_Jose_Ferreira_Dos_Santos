import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../views/SingIn';
import SignUp from '../views/SingUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SingUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
