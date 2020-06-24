import React,{Component} from 'react'
import {View, Text} from 'react-native'



class QuizView extends Component{
	
	 render(){
	 	const { item } = this.props.route.params;

	 	return(
	 		<View>
	 			<Text>{ item.title }</Text>
	 		</View>
	 	)
	 }
}

export default QuizView