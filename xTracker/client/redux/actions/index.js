
import {FETCH_HABITS, COMPLETE_HABIT, RELOAD_HABITS, UNDO_HABIT} from '../const/action-types.js';

export function fetchHabits(payload) {
    return {
        type: FETCH_HABITS,
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

export function reloadHabits(payload) {
    return {
        type: RELOAD_HABITS,
        payload,
    }
}