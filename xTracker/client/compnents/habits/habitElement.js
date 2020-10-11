import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HabitElement({habit}) {


    const printWeek = () => {
        let weekDays = [];
        for(let i = 6; i>=0; i--) {
            var today = new Date();
            today.setDate(today.getDate()-i);
            if(habit.progress.includes(today.toISOString().split('T')[0])) {
                weekDays.push(<Text key={i} style={[styles.weekday, {color: habit.color}]}>y</Text>);
            } else {
                weekDays.push(<Text key={i} style={[styles.weekday,  {color: "#BDBDBD"}]}>x</Text>)
            }
        }
        return weekDays;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.habitName, {color: habit.color}]}>{habit.name}</Text>
            <View style={styles.weekdaysContainer}>
                {printWeek()}
            </View>
            <Text>ok</Text>

        </View>
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
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    weekday: {
        fontWeight: 'bold',
        margin: '2%',
    }
})