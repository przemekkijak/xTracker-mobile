import {ADD_HABIT, COMPLETE_HABIT} from '../const/action-types';

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
            return state.map((habit, index) => {
                if(habit._id === action.payload.habitId) {
                    return {
                        ...habit,
                        progress: progress.concat(action.payload.todayDate)
                    }
                }
            return habit;
            });
    }
    return state;
}

export default rootReducer;