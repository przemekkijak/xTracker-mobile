import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Button, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addHabits} from '../../redux/actions/index';


const AddHabit = ({showAddHabit, addHabits}) => {
    const [selectedColor, selectColor] = useState();
    const [nameInput, setNameInput] = useState();
    const [durationInput, setDurationInput] = useState();

    const AddHabit = () => {
        if(!nameInput) {
            alert('You have to enter name for habit');
        }
        else if(!durationInput) {
            alert('You have to set duration')
        }
        else if(!selectedColor) {
            alert('Pick color for your habit');
        } else {
            fetch('http://192.168.0.227:2999/habits/createHabit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    name: nameInput,
                    duration: durationInput,
                    creatorID: '5f786aef04f18a02e4e8e06e',
                    color: selectedColor,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.success == true) {
                    addHabits(data.habit);
                    showAddHabit(false);
                }
            })
            .catch((error) => console.log(error));
        }
    }

    // display 5 colored dots to choose which color you want for your habbit
    const displayColorPicker = () => {
        var colors = ['#D82121', '#2C82D2', '#80E21D', '#DD1FA8', '#F8FC2B'];
        let colorsElements = [];
        for(let color of colors) {
            colorsElements.push(
                <TouchableOpacity onPress={() => selectColor(color)} key={color}>
                    {selectedColor === color 
                    ? <View style={[styles.colorButton, {backgroundColor: color}, styles.selectedColorButton]}></View>  
                    : <View style={[styles.colorButton, {backgroundColor: color}]}></View>
                    }
                </TouchableOpacity>
            )
        }
        return colorsElements;
    }

   return(
       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.formContainer}>
                    <TouchableOpacity onPress={() => showAddHabit(false)}>
                        <Text style={styles.closeButton}>x</Text>
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Create Habit</Text>
                    </View>
                    <View style={styles.dataInputsContainer}>
                        <Text style={styles.inputLabel}>Enter your title:</Text>
                        <TextInput style={[styles.dataInput, styles.name]} onChangeText={input => setNameInput(input)}/>
                        <Text style={styles.inputLabel}>Duration:</Text>
                        <TextInput style={[styles.dataInput, styles.duration]} keyboardType='number-pad' onChangeText={input => setDurationInput(input)}/>
                        <Text style={styles.inputLabel}>Pick your color:</Text>
                        <View style={styles.colorsContainer}>
                            {displayColorPicker()}
                        </View>
                        <TouchableOpacity style={styles.createButton} onPress={() => AddHabit()}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </TouchableWithoutFeedback>
   )
}

const styles = StyleSheet.create({
    formContainer: {
        zIndex: 3,
        opacity: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.35)',
    },
    closeButton: {
        color: '#FFF',
        zIndex: 7,
        top: '130%',
        left: '90%',
        fontSize: 35,
    },
    headerContainer: {
        zIndex: -1,
        top: -50,
        left: -1,
        width: '101%',
        backgroundColor: '#1E3B4A',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
    },  
    title: {
        color: '#F5F5F5',
        top: 40,
        fontWeight: 'bold',
        fontSize: 40,
        left: '30%',
    },
    dataInputsContainer: {
        top: -50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataInput: {
        textAlign: 'center',
        fontSize: 23,
        margin: 20,
        height: '10%',
        color: 'black',
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderColor: 'rgba(0,0,0,0.3)',
    },
    inputLabel: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',  
        color: '#847F7F',
    },
    name: {
        width: '50%',
    },
    duration: {
        width: '35%',
    },
    colorsContainer: {
        top: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    colorButton: {
        margin: 5,
        width: 40,
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    selectedColorButton: {
        borderColor: 'rgba(0,0,0,0.8)',
    },
    createButton: {
        backgroundColor: '#1E3B4A',
        width: '40%',
        height: '8%',
        borderRadius: 5,
        top: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: '#F5F5F5',
    }
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addHabits,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(AddHabit);