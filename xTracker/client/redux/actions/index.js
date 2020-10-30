
import {ADD_HABIT} from '../actions/action-types';

export function incrementNumber(payload) {
    return {
        type: ADD_HABIT,
        payload,
    }
};