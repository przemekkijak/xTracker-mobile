import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HabitElement({text}) {
    return (
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '80%',
        height: '8%',
        margin: '1%',
    }
})