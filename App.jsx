import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GraphScreen from './pages/Graph';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import SettingsPage from './pages/Settings'; // Importe a página de configurações

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="GraphScreen" component={GraphScreen} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
