import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// components
import WeekHabits from './compnents/habits/periods/Week/WeekHabits.js';
import TopMenu from './compnents/topMenu/TopMenu';

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
      <TopMenu/>
      <WeekHabits habits={habits} setHabits={setHabits}/>
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
});
