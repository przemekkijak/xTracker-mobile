
import {ADD_HABIT} from '../const/action-types.js';

export function addHabit(payload) {
    return {
        type: ADD_HABIT,
        payload,
    }
};