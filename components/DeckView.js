import React,{Component} from 'react'
import {Text,View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {red,lightPurp,gray,black} from '../utils/colors'

import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions/decks'


class DeckView extends Component{

	state={
		data:null
	}

	componentDidMount(){
		//getDecks().then(results=>{this.setState({data:results}), console.log(results)})
		getDecks().then(decks=>this.props.dispatch(receiveDecks(decks)))

	}

	renderItem = ({item}) =>{
		return 			<View style={styles.deck} key={item}>
							
							<Text key={item} style={styles.deckTitle}>{item.title}</Text>
							<Text key={item+'1'} style={{fontSize:16}}>{item.questions.length} cards</Text>
					
						</View>
	}

	render(){

		
		const decks=this.props.decksReducer
	
		if (this.props.loading){
				console.log('asasd',decks)
			return <Text style={{paddingTop:100}}>nothing to show</Text>
		}

		return(
			<View style={styles.decksContainer}>
				<FlatList data={Object.values(decks)} renderItem={this.renderItem}/>
				{/*<View style={styles.decksContainer}>
				{
					Object.keys(decks).map(deck=>
						<View style={styles.deck}>
							<Text key={deck} style={styles.deckTitle}>{this.state.data[deck].title}</Text>
						</View>
					)
				}
				</View>*/}
			</View>
		)

	}

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