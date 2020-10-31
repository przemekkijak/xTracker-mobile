import {FETCH_HABITS, COMPLETE_HABIT, UNDO_HABIT} from '../const/action-types';

const initialState = {
    habits: [],
    user: {
        id: "5f786aef04f18a02e4e8e06e",
    },
};

const rootReducer = (state = initialState, action) => {
    if(action.type === FETCH_HABITS) {
        return Object.assign({}, state, {
            habits: state.habits.concat(action.payload)
        });
    };
    if(action.type === COMPLETE_HABIT) {
        const tempHabits = state.habits.map((habit) => {
            if(habit._id === action.payload.habitId) {
                return Object.assign({}, habit, {
                    progress: habit.progress.concat(action.payload.todayDate)
                });
            } else {
            return habit;
            };
        });
        return {
            ...state,
            habits: tempHabits,
        }
    };
    if(action.type === UNDO_HABIT) {
        let tempHabits = state.habits.map((habit) => {
            if(habit._id === action.payload.habitId) {
                return Object.assign({}, habit, {
                    progress: habit.progress.slice(0, -1),
                })
            };
            return habit;
        })
        return {
            ...state,
            habits: tempHabits,
        };
    };
    return state;
}

export default rootReducer;