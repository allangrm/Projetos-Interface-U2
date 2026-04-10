import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importando nossas telas
import SignInScreen from './screens/SignInScreen';
import FormularioPet from './screens/FormularioPet';
import FeedInicial from './screens/FeedInicial';

// Criando os Navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// O Navegador de Guias (telas principais)
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = 'home';
          if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#841584',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Feed" component={FeedInicial} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// O Navegador Principal (stack)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1. Tela de login */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        {/* 2. Tela de cadastro do pet */}
        <Stack.Screen name="SignUp" component={FormularioPet} />
        {/* 3. Após o cadastro, vai para o feed */}
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}