import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Button} from 'react-native';


const AddHabit = ({showAddHabit}) => {
    const [selectedColor, selectColor] = useState();
    const [nameInput, setNameInput] = useState();
    const [durationInput, setDurationInput] = useState();

    const addHabit = () => {
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
            .then((encoded) => {
                if(encoded.success == true) {
                    showAddHabit(false);
                }
            })
            .catch((error) => console.log(error));
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
           <View style={styles.formContainer}>
                <TouchableOpacity onPress={() => showAddHabit(false)}>
                    <Text style={styles.closeButton}>x</Text>
                </TouchableOpacity>
                <TextInput style={[styles.dataInput, styles.name]} placeholder= "Name" onChangeText={input => setNameInput(input)}/>
                <TextInput style={[styles.dataInput, styles.duration]} placeholder="Duration" keyboardType='number-pad' onChangeText={input => setDurationInput(input)}/>
                <View style={styles.colorsContainer}>
                    {displayColorPicker()}
                </View>
                <View style={styles.createButton}>
                    <Button onPress={() => addHabit()} title="Create"/>
                </View>
           </View>
   )
}

const styles = StyleSheet.create({
    formContainer: {
        zIndex: 3,
        opacity: 1,
        position: 'absolute',
        width: '60%',
        height: '40%',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.35)',
        top: '25%',
        left: '20%',
    },
    closeButton: {
        zIndex: 7,
        color: 'black',
        top: '50%',
        left: '85%',
        fontSize: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        left: '10%',
    },
    dataInput: {
        height: '10%',
        padding: 10,
        color: '#373737',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
    },
    name: {
        top: '15%',
        left: '25%',
        width: '50%',
    },
    duration: {
        top: '22%',
        width: '35%',
        left: '32%',
    },
    colorsContainer: {
        width: '100%',
        top: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    colorButton: {
        margin: 5,
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    selectedColorButton: {
        borderColor: 'rgba(0,0,0,0.8)',
    },
    createButton: {
        top: '40%',
    }
})

export default AddHabit;