import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {red,lightPurp,gray,black} from '../utils/colors'

import { useNavigation } from '@react-navigation/native';
import {SINGLE_DECK_VIEW} from '../utils/routes'

const Deck = ({item})=>{


	const navigation = useNavigation();

	return 	(
			<View key={item}>
				<View style={styles.deck}>
				<TouchableOpacity key={item} onPress={() =>
          navigation.navigate(SINGLE_DECK_VIEW)
        } >
				<Text key={item} style={styles.deckTitle}>{item.title}</Text>
				</TouchableOpacity>
				<Text key={item+'1'} style={{fontSize:16}}>{item.questions.length} cards</Text>
				</View>
			</View>
		)

}
export default Deck

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