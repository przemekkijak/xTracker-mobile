import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GenerateWeek from './generateWeek';

const WeekHabits = ({habits}) => {

    const generateHabits = () => {
        let habitsElements = [];
        if(habits.length) {
            for(let i = 0; i<habits.length; i++) {
                habitsElements.push(
                    <View style={styles.container} key={habits[i].id}>
                        <Text style={[styles.habitName, {color: habits[i].color}]}>{habits[i].name}</Text>
                        <View style={styles.weekdaysContainer}>
                            <GenerateWeek habit={habits[i]}/>
                        </View>
                        <Text>done</Text>
                    </View>
                )
            }
        }
    return habitsElements;
    } 

    return (
        generateHabits()
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '90%',
        height: '8%',
        margin: '2%',
    },
    habitName: {
        flex: 2,
        left: '65%',
        textAlign: 'left',
        fontSize: 19,
        fontWeight: 'bold',
    },
    weekdaysContainer: {
        marginRight: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})

export default WeekHabits;