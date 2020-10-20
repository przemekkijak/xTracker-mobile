import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import Blob from '../../assets/Blob.svg';

const TopMenu = () => {

    return( 
        <View style={styles.topContainer}>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <Blob style={styles.blob}/>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        top: -20,
        width: '100%',
        height: '50%',
        borderColor: '#000',
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
    blob: {
        zIndex: -3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      }
})

export default TopMenu;