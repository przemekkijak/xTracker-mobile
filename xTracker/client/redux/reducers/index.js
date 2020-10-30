import {ADD_HABIT, COMPLETE_HABIT, UNDO_HABIT} from '../const/action-types';

const initialState = {
    habits: [],
    user: {
        id: "5f786aef04f18a02e4e8e06e",
    },
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_HABIT:
            return Object.assign({}, state, {
                habits: state.habits.concat(action.payload)
            });
        case COMPLETE_HABIT:
            const tempCompleteHabits = state.habits.map((habit) => {
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
                habits: tempCompleteHabits,
            };
        case UNDO_HABIT:
            const tempUndoHabits = state.habits.map((habit) => {
                if(habit._id === action.payload.habitId) {
                    return Object.assign({}, habit, {
                        progress: habit.progress.slice(0, -1),
                    });
                } else {
                    return habit;
                }
            });
            return {
                ...state,
                habits: tempUndoHabits,
            };
    }
    return state;
}

export default rootReducer;