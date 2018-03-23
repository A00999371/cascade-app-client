import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Badge, Card, Divider, Button } from 'react-native-elements';
import { Font } from 'expo';
import Entypo from 'react-native-vector-icons/Entypo';
import Moment from 'moment';

export default class TaskComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
			taskStatus:'Finish',
			taskColor: '#00c6ff'
		}
		this.finishGoal = this.finishGoal.bind(this);
	}

	async componentDidMount() {
		//load the custom fonts using the Font package from expo
		await Font.loadAsync({
			'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
			'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
			'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),			
		});
		this.setState({fontLoaded:true})
	}

	finishGoal() {
		this.setState({taskStatus:'Done', taskColor:'#00E676'})
	}

  render() {
	  	Moment.locale('en');
		let {task} = this.props;
		var due_date = task.due_date.substring(0,10);
		var formatted_date = Moment(due_date).format('MMMM D, YYYY')

    return (
		!this.state.fontLoaded ? <Text>Loading....</Text> : 
		<Card title={task.title}>
			<Text style={{fontSize:15, fontFamily:'Montserrat-Regular'}}>{task.description}</Text>
			<Text style={{fontSize:25, fontFamily:'Montserrat-SemiBold'}}>{formatted_date}</Text>
			<Button
			title ={this.state.taskStatus}
			buttonStyle={[styles.doneButton,{backgroundColor:this.state.taskColor}]}
			textStyle={{fontFamily:'Montserrat-Bold'}}
			icon={{name: 'check', type: 'font-awesome'}}
			onPress={this.finishGoal}
			/>
		</Card>
    );
  }
};

const styles = StyleSheet.create({
	wrapper:{
		flex:1	
	},
	taskContainer:{
		width:390,
		height: 100,
		backgroundColor:'rgba(0,0,0,0.5)',
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 5,
	},
	text:{
		marginVertical:2
	},
	textContainer:{
		marginHorizontal:10,
		marginVertical:10
	},
	doneButton:{
		height: 50,
		backgroundColor: '#00c6ff',
		//borderRadius: 30,
		marginVertical: 10
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#191919',
		paddingLeft: 40,
		paddingRight: 40,
	},
})