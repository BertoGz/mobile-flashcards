 import { AsyncStorage } from 'react-native'
export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'
export const NOTIFICATION_KEY = 'mobile-flashcards:notifications'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'



const newDeckWithTitle = (title)=> {
  return {
    title:title,
    questions:[]
  }
}


defaultData = {
  Cooking: {
    title: 'Cooking',
    questions: [
      {
        question: 'When a food is salty, its ____ levels are high',
        answer: 'Sodium'
      },
      {
        question: 'Do you need to wash chicken?',
        answer: 'No, but you can'
      },
      {
        question: 'What is the flavor phenomenon that happens when all types of flavor are present?',
        answer: 'Umami'
      },
      {
        question: 'When a burger is smashed its known as a ____ burger',
        answer: 'smash'
      },
    ]
  },
  Pets: {
    title: 'Pets',
    questions: [
      {
        question: 'Who are good boys?',
        answer: 'Dogs'
      },
      {
        question: 'Who are the slowest?',
        answer: 'Turtles'
      },
      {
        question: 'The biggest Animal',
        answer: 'Whale'
      },
      {
        question: 'Who has 9 Lives?',
        answer: 'Cats'
      },
    ]
  }
}





export function getDecks(){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data=>{if (data===null){
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(defaultData)) 
    return defaultData
  } else { return JSON.parse(data)}
})
}

export function getDeck(key){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY,key)
}

export function saveDeckTitle(title){  //this func saves title of deck and key onto decks storage
  
  const deck = newDeckWithTitle(title) // new deck 
    
  return AsyncStorage.mergeItem(  DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }) )
  
}


export function addCardToDeck(title,card){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks=>JSON.parse(decks))
  .then(
    decks=>{
      decks[title].questions.push(card)  
      AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(decks))
    })
}

export function deleteDeck(title){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data=>JSON.parse(data))
  .then(
    data=>{
      delete data[title]
      AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(data) )} )
}




export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
  return{
    title: 'Time To Study!',
    body:'You havent studied your flashcards recently..',
    ios:{
      sound: true
    },
    andriod:{
      sound:true,
      priority: 'high',
      sticky:false,
      vibrate: true
    }
  }
}
export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data)=>{
    if (data===null){
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
        if (status==='granted'){
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()

          tomorrow.setDate(tomorrow.getDate()+1)
          tomorrow.setHours(18)
          tomorrow.setMinutes(0)
          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time:tomorrow,
              repeat: 'day',
            }
            )
            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
          
        }
      })
    }
  })
}

