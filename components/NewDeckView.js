import React,{Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput,AsyncStorage} from 'react-native'
import {red,black,white,gray,lightPurp} from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import {DECKS_VIEW,SINGLE_DECK_VIEW} from '../utils/routes'

import {connect} from 'react-redux'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions/decks'
import {getDeck} from '../utils/api'



class NewDeckView extends Component{

	state={
		deckTitle:''
	}
	
	handleChange = (event)=>{
		this.setState({deckTitle:event})
	}





	render(){

		CreateDeckButton = () => {
			const text = this.state.deckTitle
			const navigation = useNavigation();

			const handlePress = () =>{
				if (text === ''){
					console.log('empty')
				}
				else{
					
					saveDeckTitle(text).then(this.props.dispatch(addDeck(text)))
					getDeck(text).then(result=>{navigation.navigate(DECKS_VIEW) , navigation.navigate(SINGLE_DECK_VIEW,{item: result})}    )

				}  
			}

			return(
				<TouchableOpacity
					onPress={handlePress}
					style={styles.button}
					>
					<Text style={{fontSize:22,color:white}}>Create Deck</Text>
				</TouchableOpacity>
			)
		}
		
		return(
			<View> 
				
				<View style={[styles.container, {paddingTop:10}]}>
					<Text style={{fontSize:36, paddingBottom:120}}>Add New Deck</Text>
					<Text style={{fontSize:26}}>What is the title of the Deck?</Text>
				</View>
				
				<TextInput
			      style={styles.input}
			      onChangeText={this.handleChange}
			    />
			    
			    <View style={styles.container}>
					<CreateDeckButton />
				</View>

			</View>
		)
	}
}







const styles=StyleSheet.create({
	button:{
		width:200,
		height:60,
		marginTop:70,
		backgroundColor: lightPurp,
		alignItems:'center',
		justifyContent:'center',
		borderColor: black,
		borderBottomWidth: 2,
		borderRadius:10
	},
	input:{
		margin:20,
		marginTop:20,
		height:50,
    	borderColor: gray,
    	borderWidth: 2,
    	borderRadius:6,
    	fontSize:22,
    	paddingRight:5,
    	textAlign:'center'
	},
	container:{
		flexDirection:'column',
		alignItems:'center',
	},


})

function mapStateToProps(decksReducer){
	return decksReducer
}
export default connect(mapStateToProps)(NewDeckView)