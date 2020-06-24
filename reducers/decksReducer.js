import {RECEIVE_DECKS,ADD_DECK,ADD_CARD, DELETE_DECK} from '../actions/decks'



function decksReducer(state={},action){
	switch(action.type)
	{
		case RECEIVE_DECKS:
		return{
			...state,
			...action.decks,
		}

		case ADD_DECK:
		
			
			const newDeck = {[action.deck]:{
				title:action.deck,
				questions:[]
			}}
		return {
			...state,
			...newDeck
		}

		case ADD_CARD:
		const {deck,card}=action
		return{
			...state,
			[deck]:{
				...state[deck],
				questions:[...state[deck].questions].concat(card)
			}
		}

		case DELETE_DECK:
  delete state[action.deck]
  return {
   ...state,
  }
		

		default: return state
	}

}

export default decksReducer