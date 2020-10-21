import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';


const WeeklyProgress = ({habits}) => {
    const [progress, setProgress] = useState(0.0);

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
        console.log(success);
        setProgress(success);
    }, [habits])
    return(
        <View style={styles.weeklyProgress}>
            <Text style={styles.progressHeader}>This week</Text>
            <Progress.Bar
            progress={progress}
            width={100}
            height={12}
            borderRadius={30}
            color={'#DF6367'}
            unfilledColor={'#DFDBDB'}
            borderWidth={0}/>
            <Text style={styles.percentage}>{progress*100}%</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weeklyProgress: {
        position: 'absolute',
        top: '85%',
        left: '15%',
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