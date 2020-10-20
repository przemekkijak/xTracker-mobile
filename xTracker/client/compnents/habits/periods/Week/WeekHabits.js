import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import GenerateWeek from './GenerateWeek.js';
import Check from '../../../../assets/Check.svg';

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
        width: '90%',
    },  
    habitContainer: {
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
        fontSize: 17,
        fontWeight: 'bold',
    },
    weekdaysContainer: {
        marginRight: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    completeContainer: {
        padding: 0.2,
        marginRight: '8%',
    },
})

export default WeekHabits;