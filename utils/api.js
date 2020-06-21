import { AsyncStorage } from 'react-native'
export const DECKS_STORAGE_KEY = '@mobile-flashcards:decks'


const newDeckWithTitle = (title)=> {
  return {
    title:title,
    questions:[]
  }
}




export function getDecks(){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck(key){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY,key)
}

export function saveDeckTitle(title){  //this func saves title of deck and key onto decks storage
  
  const deck = newDeckWithTitle(title) // new deck 

  return AsyncStorage.setItem(  DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }) )
  
  
}


export function addCardToDeck(title,card){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data)=>{
    const decks = JSON.parse(data);
    const deck = decks[title]
    deck.questions.concat(card)
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify({
      [title]: deck
    }))
  })
}






/*

export funtion removeDeck(key){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results)=>{
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(data))
  })
}
*/