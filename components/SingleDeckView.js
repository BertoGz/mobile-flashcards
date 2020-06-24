import React,{Component} from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import {red,lightPurp,black,white,blue} from '../utils/colors'
import {connect,useDispatch} from 'react-redux'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions/decks'

import {deleteDeckAction} from '../actions/decks'
import {deleteDeck} from '../utils/api'


import {NEW_QUESTION_VIEW,DECKS_VIEW} from '../utils/routes'
import { useNavigation } from '@react-navigation/native';


class SingleDeckView extends Component{
	render(){

		if (this.props.loading){
			return null
		}

	const { item } = this.props.route.params;
	const deck=this.props.decksReducer[item.title]

	if (!deck){
		return null
	}
	return(
		<View style={styles.decksContainer}>
			<View style={styles.deck}>
				<Text style={styles.deckTitle}>{deck.title}</Text>
				<Text style={{fontSize:20,paddingTop:10}}>{deck.questions.length} cards</Text>
			</View>
				
				{/*Add Card Button*/}
				<AddCardButton deck={deck}/>


				{/*Quiz button */}
				<View style={styles.quizButton}>
					<TouchableOpacity><Text style={styles.quizTitle}>QUIZ</Text></TouchableOpacity>
				</View>

				{/*delete button */}
				<DeleteDeckButton deck={deck}/>
		</View>
	)
	}
}

const AddCardButton = ({deck})=>{
	const navigation = useNavigation();

	const handleNav = () =>{
		navigation.navigate(NEW_QUESTION_VIEW,{deck:deck})
	}

	return (
		<View style={styles.addButton}>
			<TouchableOpacity onPress={handleNav} >
				<Text style={styles.addCardTitle}>Add Card</Text>
			</TouchableOpacity>
		</View>
	)
}


const DeleteDeckButton = ({deck})=>{
	const navigation = useNavigation()
	 const dispatch = useDispatch()
	const handlePress = () =>{
		deleteDeck(deck.title).then( dispatch(deleteDeckAction(deck.title)) ).then(
			navigation.navigate(DECKS_VIEW)
		)
	}

	return (
		<View style={[styles.deleteButton,{marginTop:50}]}>
			<TouchableOpacity onPress={handlePress}><Text style={styles.deleteTitle}>Delete Deck</Text></TouchableOpacity>
		</View>
	)
}








function mapStateToProps(decksReducer){
	//const thisDeck = decksReducer[item]
	return {
		decksReducer,
		loading: decksReducer === null,
		//thisDeck,
	}
}
export default connect(mapStateToProps)(SingleDeckView)




const styles=StyleSheet.create({
	deck:{
		justifyContent:'center',
		alignItems:'center',
		margin:30,
		width:300,
		height:190,
		backgroundColor:lightPurp,
		shadowRadius:  2,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.84)',
		shadowOffset:{
			width:5,
			height:6,
		},
		borderWidth:2, borderColor:black
	},
	deckTitle:{
		fontSize:50,
	},
	addCardTitle:{
		color:red,
		fontWeight:'bold',
		fontSize:28,
		shadowRadius:1,
		shadowOpacity:1,
		shadowOffset:{
			width:0,
			height:2,
		},
	},
	quizTitle:{
		color:white,
		fontWeight:'bold',
		fontSize:28,
	},
	deleteTitle:{
		fontSize:20,
	},
	addButton:{
		marginTop:20,
	},
	quizButton:{
		marginTop:20,
		shadowRadius:  2,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.84)',
	},
	deleteButton:{
		marginTop:20,
	},
	decksContainer:{
		paddingTop:70,
		width:'auto',
		alignItems:'center',
	}

})