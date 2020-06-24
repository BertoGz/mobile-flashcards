import React, {Component} from "react";
import { View, Text, StyleSheet, AsyncStorage} from "react-native";

//view components
import NewDeckView from './components/NewDeckView';
import DeckView from './components/DeckView';
import Home from './components/Home'

import {DECKS_VIEW, NEW_DECK_VIEW} from './utils/routes'

//redux
import {connect} from 'react-redux'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import decksReducer from './reducers/decksReducer'
  
// style imports




export default function App() { 
  return (
    <Provider store={createStore(decksReducer)}>
        <Home/>
  </Provider>
  );
}




