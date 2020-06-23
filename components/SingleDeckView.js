import React,{Component} from 'react'
import {View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import {red,lightPurp,gray,black} from '../utils/colors'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions/decks'



export default function SingleDeckView({route}){

	const { item } = route.params;
	return(
		<View style={styles.decksContainer}>
			<View style={styles.deck}>
				<Text style={styles.deckTitle}>{item.title}</Text>
				<Text style={{fontSize:20,paddingTop:10}}>{item.questions.length} cards</Text>
			</View>
				
				<View style={styles.button}>
					<TouchableOpacity>
						<Text style={styles.buttonTitle}>ADD CARD</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.button}>
					<TouchableOpacity><Text style={styles.buttonTitle}>Start Quiz</Text></TouchableOpacity>
				</View>
				<View style={[styles.button,{marginTop:50}]}>
					<TouchableOpacity><Text style={styles.buttonTitle}>Delete Deck</Text></TouchableOpacity>
				</View>
		</View>
	)
}



const styles=StyleSheet.create({
	deck:{
		justifyContent:'center',
		alignItems:'center',
		margin:30,
		width:260,
		height:150,
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
		fontSize:40,
	},
	buttonTitle:{
		fontSize:28,
	},
	button:{
	
		marginTop:20,
				shadowRadius:  2,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.84)',
	},
	decksContainer:{
		paddingTop:70,
		width:'auto',
		alignItems:'center',
	}

})