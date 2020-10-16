import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import GenerateWeek from './GenerateWeek.js';

const WeekHabits = ({habits, setHabits}) => {

    // not mine, stole it from stackoverflow - working good :D Needed it to lighten habit color for circle progress bar 
    const colorShade = (col, amt) => {
        col = col.replace(/^#/, '')
        if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
      
        let [r, g, b] = col.match(/.{2}/g);
        ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
      
        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)
      
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
      
        return `#${rr}${gg}${bb}`
      }
      
    const CompleteHabit = (habit, index) => {
        fetch('http://192.168.0.227:2999/habits/completeHabit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({id: habit._id}),
        })
        .then((res) => {
            console.log(res.status);
            console.log('habit complete');
            if(res.status === 200) {
                let todayDate = new Date().toISOString().split('T')[0];
                let tempHabits = [...habits];
                tempHabits[index].progress.push(todayDate);
                setHabits(tempHabits);
            }
        })
        .catch((error) => console.log(error));    }

    // Create Habit Row in week list, with circle progress bar, name and week progress (separated component)
    const generateHabits = () => {
        let habitsElements = [];
        if(habits.length) {
            for(let i = 0; i<habits.length; i++) {
                let habitProgress = habits[i].duration / habits[i].progress.length;
                habitsElements.push(
                    <View style={styles.habitContainer} key={habits[i]._id}>
                        <AnimatedCircularProgress style={styles.circleProgress} size={30} width={6} fill={habitProgress} tintColor={habits[i].color} backgroundColor={colorShade(habits[i].color, 80)}/>
                        <Text style={[styles.habitName, {color: habits[i].color}]}>{habits[i].name}</Text>
                        <View style={styles.weekdaysContainer}>
                            <GenerateWeek habit={habits[i]}/>
                        </View>
                        <TouchableOpacity onPress={(habit, index) => CompleteHabit(habits[i], i)}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    return habitsElements;
    } 

    // Dates in format (MON - 09) 
    const headerDates = () => {
        let dates = [];
        let today = new Date();
        for(let i = 6; i>=0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            // If it's today date - make it bold and add colored background
            if(today.getDate() === date.getDate()) {
                dates.push(
                    <View key={i} style={styles.todayHeaderBox}>
                        <Text style={[styles.headerDate, {color: 'white'}, {fontWeight: 'bold'}]}>
                        {date.toLocaleString('en-us', {weekday:'long'}).slice(0,3)}{'\n'}
                        {date.toISOString().split('T')[0].slice(8,10)}
                        </Text>
                    </View>)
            } else {
                dates.push(
                    <Text key={i} style={[styles.headerDate, {color: "#BDBDBD"}]}>
                        {date.toLocaleString('en-us', {weekday:'long'}).slice(0,3)}{'\n'}
                        {date.toISOString().split('T')[0].slice(8,10)}
                    </Text>)
            }
        }
        return dates;
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabHeader}>
                {headerDates()}
            </View>
            {generateHabits()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        top: '25%',
    },  
    tabHeader: {
        top: '2%',
        justifyContent: 'center',
        left: '10%',
        flexDirection: 'row',
    },
    headerDate: {
        fontSize: 10,
        padding: '1%',
        textAlign: 'center',
    },
    todayHeaderBox: {
        backgroundColor: '#537A8F',
        borderRadius: 5,
    },  
    habitContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        height: '12%',
        marginTop: '4%',
    },
    circleProgress: {
        paddingLeft: '3%',
    },
    habitName: {
        flex: 2,
        left: '20%',
        textAlign: 'left',
        fontSize: 19,
        fontWeight: 'bold',
    },
    weekdaysContainer: {
        marginRight: '9%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})

export default WeekHabits;