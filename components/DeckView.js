import React,{Component} from 'react'
import {Text,View, StyleSheet, FlatList,TouchableOpacity} from 'react-native'
import {red,lightPurp,gray,black} from '../utils/colors'

import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions/decks'


import { useNavigation } from '@react-navigation/native';
import {SINGLE_DECK_VIEW} from '../utils/routes'




class DeckView extends Component{

	state={
		data:null
	}

	componentDidMount(){
		getDecks().then(decks=>this.props.dispatch(receiveDecks(decks)))

	}


	render(){
		
		//grab decks from store
		const decks=this.props.decksReducer
	
		if (this.props.loading){
			return <Text style={{paddingTop:100}}>nothing to show</Text>
		}

		// render if no decks
		if (Object.values(decks).length===0){
			return (
				<View style={{alignItems:'center',paddingTop:100}}> 
					<Text style={{fontSize:36}}>No Decks</Text> 
					<Text style={{fontSize:18,paddingTop:20}}>Please Create A Deck</Text> 
				</View>
				)
		}

		return(
			<View style={styles.decksContainer}>
				<FlatList data={Object.values(decks)} 
				renderItem={ ({item: deck})=>{return <Deck deck={deck} />}} 
				keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		)

	}

}



const Deck = ({deck})=>{
	const Clickable = ({deck}) => {
	    const navigator = useNavigation();
	    
	    const handleNav = () => {
	        navigator.navigate(SINGLE_DECK_VIEW, {
	            item: deck,
	          });
	    };

	    return(
	    	<TouchableOpacity onPress={handleNav} >
	    		<View style={styles.deck} >
					<Text style={styles.deckTitle} >{deck.title}</Text>
					<Text  style={{fontSize:16}} >{deck.questions.length} cards</Text>
				</View>
			</TouchableOpacity>
	    )
	}

	return(
			<View >
				<Clickable deck={deck} key={deck}/>
			</View>
	)


}








const styles=StyleSheet.create({
	deck:{
		justifyContent:'center',
		alignItems:'center',
		margin:30,
		width:230,
		height:120,
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
		fontSize:36,
	},
	decksContainer:{
		paddingTop:10,
		width:'auto',
		alignItems:'center',
	}

})

function mapStateToProps(decksReducer){
	return {
		decksReducer,
		loading: decksReducer === null 
	}
}
export default connect(mapStateToProps)(DeckView)