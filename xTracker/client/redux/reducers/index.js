import {ADD_HABIT} from '../const/action-types';

const initialState = {
    habits: [],
};

const rootReducer = (state = initialState, action) => {
    if(action.type === ADD_HABIT) {
        return Object.assign({}, state, {
            habits: state.habits.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;