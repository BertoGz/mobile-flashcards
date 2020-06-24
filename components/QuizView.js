import React,{Component} from 'react'
import {View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native'
import {lightPurp, black} from '../utils/colors'


class QuizView extends Component{
		
	state={
		cardNum:0
	}
	 render(){
	 	const { deck } = this.props.route.params;
	 	const numOfQuestions = deck.questions.length;
	 	return(
	 		<View>
	 			<Question card={deck.questions[this.state.cardNum]}/>
	 			
	 			<TouchableOpacity onPress={()=>{this.setState({cardNum:this.state.cardNum+1})}} >
	 				<Text>Correct</Text>
	 			</TouchableOpacity>

	 			<TouchableOpacity onPress={()=>{this.setState({cardNum:this.state.cardNum+1})}}>
	 				<Text>Incorrect</Text>
	 			</TouchableOpacity>
	 		</View>
	 	)
	 }
}
/*
https://youtu.be/XhlPeRywr70

<FlatList data={deck.questions}
	 				renderItem={({item:card})=>{return <Question card={card}/>}}
	 				keyExtractor={(item, index) => index.toString()}
	 			>
	 			</FlatList>*/


const Question=({card})=>{
	if (!card){
		return null
	}
	return(
		<View style={styles.deck}>
		<Text style={styles.questionText}>{ card.question }</Text>
		</View>	
	)
}

styles=StyleSheet.create({
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
	questionText:{
		marginLeft:10,
		marginRight:10,
		fontSize:22,
	},

})

export default QuizView