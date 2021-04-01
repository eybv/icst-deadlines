import * as Type from './types';

const initialState = {
    courses: [],
    filter: {
        courseId: -1,
        event: 'any',
        completed: false,
    },
    view: {
        items: [],
        dates: [],
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.DATA_FETCH_SUCCESS:
            return {...state, courses: action.data};
        case Type.DATA_FILTERED:
            return {...state, view: action.view};
        case Type.SET_COMPLETED:
            return {...state, filter: {...state.filter, completed: action.completed}};
        case Type.SET_COURSE:
            return {...state, filter: {...state.filter, courseId: action.id}};
        case Type.SET_EVENT:
            return {...state, filter: {...state.filter, event: action.event}};
        default:
            return state;
    }
}
