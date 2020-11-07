
import {ADD_HABITS, COMPLETE_HABIT, UNDO_HABIT, HABIT_INFO} from '../const/action-types.js';

export function addHabits(payload) {
    return {
        type: ADD_HABITS,
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

export function habitInfo(payload) {
    return {
        type: HABIT_INFO,
        payload,
    }
}