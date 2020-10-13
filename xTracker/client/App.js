import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// components
import WeekHabits from './compnents/habits/periods/Week/WeekHabits';
import Blob from './compnents/Blob';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState({id: "5f786aef04f18a02e4e8e06e"});

  useEffect(() => {

    if(user.id) {
      fetch('http://192.168.0.227:2999/habits/getHabits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({userID: user.id}),
      })
      .then((res) => res.json())
      .then((encoded) => setHabits(encoded.habits))
      .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.blob}>
        <Blob style={styles.blob}/>
      </View>
      <WeekHabits habits={habits}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3F3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
});
