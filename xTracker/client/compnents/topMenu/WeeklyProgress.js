import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';


const WeeklyProgress = ({habits}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // create array with 5 last days 
        var week = [];
        for(let i = 4; i>=0; i--) {
            let date = new Date();
            date.setDate(date.getDate()-i);
            week.push(date.toISOString().split('T')[0]);
        }
        // increment success if habit.progress includes one of Week[] element
        var success = 0;
        habits.map((habit) => {
            for(let i = habit.progress.length-1; i>=habit.progress.length-5; i--) {
                if(week.includes(habit.progress[i])) {
                    success += 1;
                }
            }
        })
        success = success/(habits.length*5);
        setProgress(success);
    }, [habits])
    return(
        <View style={styles.weeklyProgress}>
            <Text style={styles.progressHeader}>This week</Text>
            <Text style={styles.percentage}>{Math.round(progress*100)}%</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weeklyProgress: {
        position: 'absolute',
        top: '82%',
        left: '10%',
    },
    progressHeader: {
        marginBottom: '5%',
        color: '#F3F3F3',
        fontWeight: 'bold',
    },
    percentage: {
        color: '#F3F3F3',
        top: '-51%',
        left: '70%',
    }
})
export default WeeklyProgress;