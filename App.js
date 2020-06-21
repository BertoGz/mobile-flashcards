import * as React from "react";
import { View, Text, StyleSheet} from "react-native";
import NewDeckView from './components/NewDeckView';
import DeckView from './components/DeckView';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {DECKS_VIEW, NEW_DECK_VIEW} from './utils/routes'
import {red,black} from './utils/colors'
import { AntDesign } from '@expo/vector-icons'


  const NewDeckViewStack = createStackNavigator();

  function NewDeckViewStackFunc() {
  return (
    <NewDeckViewStack.Navigator>
      <NewDeckViewStack.Screen name={NEW_DECK_VIEW} component={NewDeckView} />
    </NewDeckViewStack.Navigator>
  );
}


  const Tab = createBottomTabNavigator();
  
  function DeckViewTabs() {
    return (
      <Tab.Navigator >
          <Tab.Screen name={DECKS_VIEW}  
          options={{ title:'Decks',
            tabBarIcon: () => (
                <AntDesign name="home" color={black} size={22} />
              )}} 
          component={DeckView} />
          <Tab.Screen name="New Deck" component={NewDeckViewStackFunc} />
      </Tab.Navigator>
    );
  }


const RootStack = createStackNavigator();

export default function App() {


  return (

    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={DECKS_VIEW} component={DeckViewTabs}/>
      </RootStack.Navigator>
    </NavigationContainer>
 
  );
}


const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})