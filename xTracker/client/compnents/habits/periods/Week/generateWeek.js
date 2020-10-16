import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const GenerateWeek = ({habit}) => {
        let weekDays = [];
        for(let i = 6; i>=0; i--) {
            var today = new Date();
            today.setDate(today.getDate()-i);
            if(habit.progress.includes(today.toISOString().split('T')[0])) {
                weekDays.push(<Text key={i} style={[styles.weekday, {color: habit.color}]}>✓</Text>);
            } else {
                weekDays.push(<Text key={i} style={[styles.weekday,  {color: "#BDBDBD"}]}>x</Text>)
            }
        }
        return weekDays;
}

const styles = StyleSheet.create({
    weekday: {
        fontWeight: 'bold',
        padding: '2.4%',
    }
})

export default GenerateWeek;