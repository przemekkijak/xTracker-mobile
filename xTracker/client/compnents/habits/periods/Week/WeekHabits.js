import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import GenerateWeek from './GenerateWeek.js';
import Check from '../../../../assets/Check.svg';

const WeekHabits = ({habits, setHabits}) => {

    const CompleteHabit = (habit, index) => {
        fetch('http://192.168.0.227:2999/habits/completeHabit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({id: habit._id}),
        })
        .then((res) => res.json())
        .then((res) => {
                let todayDate = new Date().toISOString().split('T')[0];
                let tempHabits = [...habits];
                if(res.habit === "done") {
                    tempHabits[index].progress.push(todayDate);
                } else if(res.habit === "undo") {
                    tempHabits[index].progress.pop();
                }
                setHabits(tempHabits);
        })
        .catch((error) => console.log(error));    
    }

    // Create Habit Row in week list, with circle progress bar, name and week progress (separated component)
    const generateHabits = () => {
        let habitsElements = [];
        if(habits.length) {
            for(let i = 0; i<habits.length; i++) {
                let habitProgress = (habits[i].progress.length / habits[i].duration) * 100;
                habitsElements.push(
                    <View style={styles.habitContainer} key={habits[i]._id}>
                        <AnimatedCircularProgress style={styles.circleProgress} size={27} width={6} fill={habitProgress} tintColor={habits[i].color} backgroundColor="#DFDCDC"/>
                        <Text style={styles.habitName}>{habits[i].name}</Text>
                        <View style={styles.weekdaysContainer}>
                            <GenerateWeek habit={habits[i]}/>
                        </View>
                        <TouchableOpacity onPress={() => CompleteHabit(habits[i], i)} style={styles.completeContainer}>
                            {!habits[i].progress.includes(new Date().toISOString().split('T')[0]) 
                            ? <Check width={20} height={20} fill="#DFDCDC"/>
                            : <Check width={20} height={20} fill="#DF6367"/>}
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    return habitsElements;
    } 


    return (
        <View style={styles.container}>
            {generateHabits()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 250,
        width: '90%',
    },  
    habitContainer: {
        top: 10,
        borderRadius: 35,
        borderColor: '#CED5D9',
        borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        height: '12%',
        marginTop: '5%',
        padding: 3,
    },
    circleProgress: {
        marginLeft: 15,
    },
    habitName: {
        color: '#4B6773',
        flex: 2,
        left: '20%',
        textAlign: 'left',
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
    },
    weekdaysContainer: {
        marginRight: '12%',
        width: '35%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginLeft: '5%',
    },
    completeContainer: {
        padding: 0.2,
        marginRight: '8%',
    },
})

export default WeekHabits;