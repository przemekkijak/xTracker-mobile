
import {ADD_HABIT, COMPLETE_HABIT, UNDO_HABIT} from '../const/action-types.js';

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

export function undoHabit(payload) {
    return {
        type: UNDO_HABIT,
        payload,
    }
}