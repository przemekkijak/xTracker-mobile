import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

// redux actions
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeHabit, undoHabit, habitInfo} from '../../../../redux/actions/index';

import GenerateWeek from './GenerateWeek.js';
import Check from '../../../../assets/Check.svg';

const WeekHabits = ({habits, completeHabit, undoHabit, habitInfo}) => {

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
                if(res.habit === "done") {
                    completeHabit({habitId: habit._id, todayDate: todayDate});
                } else if(res.habit === "undo") {   
                    undoHabit({habitId: habit._id});
                }
        })
        .catch((error) => console.log(error));    
    }

    // Create Habit Row in week list, with circle progress bar, name and week progress (separated component)
    const generateHabits = () => {
        let habitsElements = [];
            for(let i = 0; i<habits.length; i++) {
                let habitProgress = (habits[i].progress.length / habits[i].duration) * 100;
                habitsElements.push(
                    <View style={styles.habitContainer} key={habits[i]._id}>
                        <AnimatedCircularProgress style={styles.circleProgress} size={27} width={6} fill={habitProgress} tintColor={habits[i].color} backgroundColor="#DFDCDC"/>
                        <TouchableOpacity style={{left: '40%', flex: 2}} onPress={() => {
                            habitInfo({habitInfoId: habits[i]._id});
                            }}>
                        <Text style={{fontWeight: 'bold', textAlign: 'left', color: '#4B6773'}}>{habits[i].name}</Text>
                        </TouchableOpacity>
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
    return habitsElements;
    } 

        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}> 
                    {habits 
                    ? generateHabits()
                    : <Text>ladowanie</Text>}
                </ScrollView>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        top: 170,
        height: '40%',
        width: '90%',
        paddingTop: 10,
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
        height: 50,
        marginBottom: '3%',
        padding: 3,
    },
    circleProgress: {
        marginLeft: 15,
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

const mapStateToProps = (state) => {
    const {habits} = state;
    return {habits};
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      completeHabit,
      undoHabit,
      habitInfo
    }, dispatch)
  );

export default connect(mapStateToProps, mapDispatchToProps)(WeekHabits);