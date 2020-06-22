import { AsyncStorage } from 'react-native'
export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'


const newDeckWithTitle = (title)=> {
  return {
    title:title,
    questions:[]
  }
}


defaultData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}





export function getDecks(){
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results=>{if (results===null){
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(defaultData)) 
    return defaultData
  } else { return JSON.parse(results)}
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

export function initData(){
  return (dispatch)=>{
    
    return getInitialData().then(({decks})=>{
      dispatch(receiveDecks(decks))
    })
  }
}



export function getInitialData () {
  return Promise.all([
    getDecks(),
  ]).then(([decks]) => ({
    decks,
  }))
}

*/

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