import React,{Component} from 'react'
import {Text,View, StyleSheet, FlatList} from 'react-native'
import {red,lightPurp,gray,black} from '../utils/colors'

import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions/decks'
import Deck from './Deck'





class DeckView extends Component{

	state={
		data:null
	}

	componentDidMount(){
		//getDecks().then(results=>{this.setState({data:results}), console.log(results)})
		getDecks().then(decks=>this.props.dispatch(receiveDecks(decks)))

	}


	render(){
		
		const decks=this.props.decksReducer
	
		if (this.props.loading){
				console.log('asasd',decks)
			return <Text style={{paddingTop:100}}>nothing to show</Text>
		}

		return(
			<View style={styles.decksContainer}>
			<Text>decks</Text>
				<FlatList data={Object.values(decks)} renderItem={Deck}/>

			</View>
		)

	}

}

const styles=StyleSheet.create({
	decksContainer:{
		paddingTop:60,
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