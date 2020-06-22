import React,{Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {saveDeckTitle,getDecks} from '../utils/api'
import {red,black,white,gray,lightPurp} from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import {DECKS_VIEW} from '../utils/routes'


function CreateDeckButton(props){
	const text = props.deckTitle
	const navigation = useNavigation();

	const handlePress = () =>{
		if (text === ''){
			console.log('empty')
		}
		else{
			saveDeckTitle(text).then(navigation.navigate(DECKS_VIEW), 
				/*props.dispatch(addDeck(([text]:{ title:text, questions:[]}) ))*/)
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


class NewDeckView extends Component{

	state={
		deckTitle:''
	}
	
	handleChange = (event)=>{
		this.setState({deckTitle:event})
	}


	render(){
		
		return(
			<View> 
				
				<View style={[styles.container, {paddingTop:150}]}>
					<Text style={{fontSize:26}}>What is the title of the Deck?</Text>
				</View>
				
				<TextInput
			      style={styles.input}
			      onChangeText={this.handleChange}
			    />
			    
			    <View style={styles.container}>
					<CreateDeckButton deckTitle={this.state.deckTitle} dispatch={this.props.dispatch}/>
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


export default NewDeckView