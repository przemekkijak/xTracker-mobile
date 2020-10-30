
import {ADD_HABIT, COMPLETE_HABIT} from '../const/action-types.js';

export function addHabit(payload) {
    return {
        type: ADD_HABIT,
        payload,
    }
};

export function completeHabit(payload) {
    return {
        type: COMPLETE_HABIT,
        payload,
    }
}