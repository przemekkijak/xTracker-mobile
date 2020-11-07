import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

// redux store
import {Provider} from 'react-redux'
import store from './redux/store/index';
import {addHabits} from './redux/actions/index';

// components
import WeekHabits from './compnents/habits/periods/Week/WeekHabits.js';
import TopMenu from './compnents/topMenu/TopMenu';
import AddHabit from './compnents/topMenu/AddHabit';

const App = () => {
  const [displayPeriod, setPeriod] = useState(7);
  const [addHabitView, showAddHabit] = useState(false);

  useEffect(() => {

    if(store.getState().user.id !== undefined) {
      fetch('http://192.168.0.227:2999/habits/getHabits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({userID: store.getState().user.id}),
      })
      .then((res) => res.json())
      .then((encoded) => {
        store.dispatch(addHabits(encoded.habits));
      })
      .catch((error) => console.log(error));
    }
  }, [store.getState().user.id]);

  function displayHabits(period) {
    switch(period) {
      case 7:
        return <WeekHabits/>;
      case 30: 
        return <Text>test</Text>;
      case 365:
        return <Text>year</Text>;
    }
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {addHabitView && <AddHabit showAddHabit={showAddHabit}/>}
        <TopMenu setPeriod={setPeriod} showAddHabit={showAddHabit} addHabitView={addHabitView}/>
        {displayHabits(displayPeriod)}
      </View>
    </Provider>
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

export default App;