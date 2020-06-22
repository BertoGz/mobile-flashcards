import React,{Component} from 'react'
import {Text,View, StyleSheet, FlatList} from 'react-native'
import {saveDeckTitle,getDecks} from '../utils/api'
import {red,lightPurp,gray,black} from '../utils/colors'


class DeckView extends Component{

	state={
		data:null
	}

	componentDidMount(){
		getDecks().then(results=>{this.setState({data:results}), console.log(results)})
	}

	renderItem = ({item}) =>{
		return 			<View style={styles.deck}>
							<Text key={item} style={styles.deckTitle}>{item.title}</Text>
						</View>
	}

	render(){
		
		const decks=this.state.data
		if (this.state.data===null){
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
		alignItems:'center',


	}

})


export default DeckView