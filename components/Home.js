import React, {Component} from "react";
import { View, Text, StyleSheet} from "react-native";

//view components
import NewDeckView from './NewDeckView';
import DeckView from './DeckView';


//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {DECKS_VIEW, NEW_DECK_VIEW} from '../utils/routes'


// style imports
import {red,black} from '../utils/colors'
import { AntDesign } from '@expo/vector-icons'


const RootStack = createStackNavigator();



export default function Home() { 

  return (
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{
            headerShown: false
          }}>
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









const NewDeckViewStack = createStackNavigator();

  function NewDeckViewStackFunc() {
  return (
    <NewDeckViewStack.Navigator screenOptions={{
    headerShown: false
  }}>
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

          <Tab.Screen name="New Deck" options={{
            tabBarIcon:()=>(
              <AntDesign name="plus" size={22} color={black} />
            )
          }} component={NewDeckViewStackFunc} />
      </Tab.Navigator>
    );
  }

