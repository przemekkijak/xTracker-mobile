import {View, Text, StyleSheet} from 'react-native';
import React from 'react';  

const HabitInfo = () => {
    return(
        <View style={styles.container}>
            <Text>test</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'pink',
        width: '100%',
        height: '100%',

    }
})

export default HabitInfo;