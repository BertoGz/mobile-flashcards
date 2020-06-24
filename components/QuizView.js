import React,{Component} from 'react'
import {View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native'
import {white,lightPurp, black,green,lightRed} from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import {QUIZ_VIEW,SINGLE_DECK_VIEW} from '../utils/routes'
class QuizView extends Component{
		
	state={
		cardNum:0,
		numCorrect:0,
		flipped: false
	}


	 render(){
	 	const { deck } = this.props.route.params;


	 	const numOfQuestions = deck.questions.length;


	 	if (this.state.cardNum===numOfQuestions){

	 		const handleRestart = () =>{
				this.setState({cardNum:0})
				this.setState({numCorrect:0})
			}

	 		return(
	 			<QuizResults numCorrect={this.state.numCorrect} total={numOfQuestions} handleRestart={handleRestart} deck={deck}/>
	 		)
	 	}

	 	const handleCorrect=()=>{
			this.setState({cardNum:this.state.cardNum+1})
			this.setState({numCorrect:this.state.numCorrect+1})
			this.setState({flipped:false})
		}

		const handleIncorrect=()=>{
			this.setState({cardNum:this.state.cardNum+1})
			this.setState({flipped:false})
		}

		const handleFlip=()=>{
			this.setState({flipped:!this.state.flipped})
		}





	 	return(
	 		<View style={{alignItems:'center'}}>
	 			<Question card={deck.questions[this.state.cardNum]} handleFlip={handleFlip} flipped={this.state.flipped}/>
	 			
	 			<Text style={styles.remaining}>Question {this.state.cardNum+1}/{numOfQuestions}</Text>
	 			{ this.state.flipped && 
	 				<View>
			 			<TouchableOpacity style={[styles.button,{backgroundColor:green}]} 
			 				onPress={handleCorrect} >
			 				<Text style={{fontSize:26}}>Correct</Text>
			 			</TouchableOpacity>

			 			<TouchableOpacity style={[styles.button, {backgroundColor:lightRed}]}
			 			onPress={handleIncorrect} >
			 				<Text style={{fontSize:26}}>Incorrect</Text>
			 			</TouchableOpacity>
		 			</View>
	 			}
	 		</View>
	 	)
	 }
}


// shows the card/question to screen
const Question=({card,handleFlip,flipped})=>{
	if (!card){
		return null
	}

	const flipCard = () =>{
		handleFlip()
	}
	return(
		<TouchableOpacity onPress={flipCard}>
		<View style={styles.deck}>
			<View style={styles.questionContainer}>
				{ !flipped &&
				<Text style={styles.questionText}>{ card.question }</Text>
				}
				{ flipped &&
					<Text style={styles.questionText}>{ card.answer }</Text>
				}
			</View>
			<Text style={{fontSize:20,marginTop:10,color:white}}>Flip Card</Text>
		</View>	
		</TouchableOpacity>
	)
}

// shows the results to the screen
const QuizResults=({numCorrect,total,handleRestart,deck})=>{
	return(
		<View>
			<View style={{justifyContent:'center',alignItems:'center'}}>
				<Text style={{fontSize:36, marginTop:60}}>Quiz Results:</Text>
				<Text style={{fontSize:32, marginTop:20}}>{numCorrect}/{total}</Text>

				<TouchableOpacity style={[styles.button,{backgroundColor:lightPurp}]} 
	 				onPress={handleRestart} >
	 				<Text style={{fontSize:26}}>Restart Quiz</Text>
	 			</TouchableOpacity>
	 			<ReturnButton deck={deck} />
			</View>
		</View>
	)
}


//return button rendered by quiz results
const ReturnButton = ({deck})=>{
	const navigation = useNavigation();

	const handleNav = () =>{
		navigation.navigate(SINGLE_DECK_VIEW,{deck:deck})
	}

	return (

			<TouchableOpacity style={[styles.button,{backgroundColor:lightPurp}]} 
	 				onPress={handleNav} >
	 				<Text style={{fontSize:26}}>Return</Text>
	 		</TouchableOpacity>

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
		textAlign: 'center'

	},
	button:{
		width:200,
		height:60,
		marginTop:40,
		backgroundColor: lightPurp,
		alignItems:'center',
		justifyContent:'center',
		borderColor: black,
		borderBottomWidth: 2,
		borderRadius:10
	},
	questionContainer:{
		backgroundColor:'rgba(255,255,05,0.05)', 
		height:120,
		width:'90%',
		paddingBottom:0,
		justifyContent:'center',
		alignItems:'center'
	},
	remaining:{
		fontSize:22
	}


})

export default QuizView