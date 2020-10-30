import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';

import AddHabit from './AddHabit';
import WeeklyProgress from './WeeklyProgress';

import Blob from '../../assets/Blob.svg';

const TopMenu = ({setPeriod, showAddHabit, addHabitView, habits}) => {

    // Create buttons group with each period to set
    const generatePeriods = () => {
        var periods = [
            {"duration":7, "name":"Week"},
            {"duration":30, "name":"Month"},
            {"duration":365, "name":"Year"},
            {"duration":999, "name":"All time"},
        ]
        let periodsArr = [];
        for(let i = 0; i<periods.length; i++) {
            periodsArr.push(
            <TouchableOpacity onPress={() => setPeriod(periods[i].duration)} key={i}>
                <View style={styles.periodElement}>
                    <Text style={styles.periodText}>{periods[i].name}</Text>
                </View>
            </TouchableOpacity>);
        }
        return periodsArr;
    }

    return( 
        <View style={styles.topContainer}>
            <Text style={styles.welcomeUser}>Hi, Przemek!</Text>
            <WeeklyProgress habits={habits}/>
            <View style={styles.periodContainer}>
                {generatePeriods()}
            </View>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => showAddHabit(!addHabitView)}>
                    <Text style={styles.buttonText}>Add</Text></TouchableOpacity>
            <Blob style={styles.blob}/>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: -20,
        width: '100%',
        height: '50%',
        borderColor: '#000',
    },
    welcomeUser: {
        color: '#FFF',
        position: 'absolute',
        top: '23%',
        left: '8%',
        fontSize: RFPercentage(4),
    },
    buttonContainer: {
        position: 'absolute',
        top: '60%',
        left: '68%',
        width: '25%',
        height: '10%',
        backgroundColor: '#DF6367',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: RFPercentage(2.5),
    },
    periodContainer: {
        position: 'absolute',
        top: '60%',
        left: '8%',
        width: '45%',
        height: '10%',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        paddingLeft: 5,
        paddingRight: 5,
    },
    periodElement: {
        height: '100%',
        margin: '1%',
    },
    periodText: {
        top: '35%',
        textAlign: 'center',
        color: '#515151',
        fontWeight: 'bold',
        fontSize: RFPercentage(1.6),
    },
    blob: {
        zIndex: -3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      }
})

const mapStateToProps = (state) => {
    const {habits} = state;
    return {habits}
};
export default connect(mapStateToProps)(TopMenu);