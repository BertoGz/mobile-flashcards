import React,{Component} from 'react'
import {View,Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {red,black, lightPurp, white} from '../utils/colors'

import {connect} from 'react-redux'

import {addCardToDeck} from '../utils/api'
import {addCard} from '../actions/decks'
class NewQuestionView extends Component{



	state={
		textQuestion:'',
		textAnswer:'',
	}

	


	handleChangeQuestion = (event)=>{
		this.setState({textQuestion:event})
	}

	handleChangeAnswer = (event)=>{
		this.setState({textAnswer:event})
	}




	render(){
		const { title } = this.props.route.params.deck

			const handleSubmit = () =>{
				if (this.props.textQuestion === '' || this.props.textAnswer===''){
					console.log('empty')
				}
				else{
					const card = {question:this.state.textQuestion,answer:this.state.textAnswer}

					addCardToDeck(title,card).then(
						this.props.dispatch(addCard({deck:title,question:this.state.textQuestion,answer:this.state.textAnswer}))
					//, navigation.navigate(DECKS_VIEW) 
					)
				}  
			}


		return(
			<View style={{ marginTop:50}}>
				<View style={{alignItems:'center'}}>
					<Text style={styles.title}>{title}</Text>
				</View>
				{/*submit input field 1*/}
				<Text style={styles.field}>Quesion:</Text>
				<TextInput style={styles.input} onChangeText={this.handleChangeQuestion} />
				
				{/*submit input field 2*/}
				<Text style={styles.field}>Answer:</Text>
				<TextInput style={styles.input} onChangeText={this.handleChangeAnswer} />
				

				{/*submit button*/}
				<View style={{alignItems:'center'}}>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={{fontSize:22,color:white}}>Create Card</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	input:{
		height:50,
		marginLeft:30,
		marginRight:30,
		marginTop:10,
		borderWidth:2,
		borderColor:black,
		fontSize:22,
		paddingLeft:10
	},
	title:{
		fontSize:28
	},
	field:{
		paddingLeft:30,
		fontSize:16,
		paddingTop:40
	},
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
})
function mapStateToProps(decksReducer){
	return decksReducer
}

export default connect(mapStateToProps)(NewQuestionView)