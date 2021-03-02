// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AjouterProduitScreen from './Pages/AjouterProduit';
import AfficherListe from './Pages/AfficherListe';
import ProduitScreen from './Pages/Produit';
import UserScreen from './Pages/Utilisateur';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Page d'accueil</Text>

      <View style={{ flexDirection: 'row' }}>
        <Button title="Afficher la liste" onPress={() => navigation.navigate('AfficherListe')}/>
        <Button title="Ajouter un produit" onPress={() => navigation.navigate('AjouterProduit')}/>
      </View>
    </View>
  );
}

const Bottom = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackProd() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Produit" component={ProduitScreen}/>
      <Stack.Screen name="AjouterProduit" component={AjouterProduitScreen} />
      <Stack.Screen name="AfficherListe" component={AfficherListe} />
    </Stack.Navigator>
  );
}

function User() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserScreen}/>
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Produit" component={StackProd} />
      <Bottom.Screen name="Utilisateur" component={User} />
    </Bottom.Navigator>
  );
}



function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;