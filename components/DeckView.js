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
		//getDecks().then(results=>{this.setState({data:results}), console.log(results)})
		getDecks().then(decks=>this.props.dispatch(receiveDecks(decks)))

	}


	render(){
		
		const decks=this.props.decksReducer
	
		if (this.props.loading){
			return <Text style={{paddingTop:100}}>nothing to show</Text>
		}

		return(
			<View style={styles.decksContainer}>
				<FlatList data={Object.values(decks)} renderItem={Deck}/>

			</View>
		)

	}

}


const Deck=({item})=>{
	return(
			<View key={item}>
				<Clickable item={item}/>
			</View>
	)
}

const Clickable = ({item}) => {
    const navigator = useNavigation();
    const handleNav = () => {
        navigator.navigate(SINGLE_DECK_VIEW, {
            item: item,
          });
    };
    return(
    	<TouchableOpacity key={item} onPress={handleNav} >
    		<View style={styles.deck}>
				<Text key={item} style={styles.deckTitle}>{item.title}</Text>
				<Text key={item+'1'} style={{fontSize:16}}>{item.questions.length} cards</Text>
				
			</View>
		</TouchableOpacity>
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