import * as Type from './types';

export const loadData = () => dispatch => {
    fetch(`${process.env.PUBLIC_URL}/data/courses.json`)
        .then(response => response.json())
        .then(data => dispatch({type: Type.DATA_FETCH_SUCCESS, data}))
        .catch(error => dispatch({type: Type.DATA_FETCH_FAILURE, error}))
        .then(() => dispatch(filterData()));
}

export const setCompleted = completed => dispatch => {
    dispatch({type: Type.SET_COMPLETED, completed});
    dispatch(filterData());
}

export const setEvent = event => dispatch => {
    dispatch({type: Type.SET_EVENT, event});
    dispatch(filterData());
}

export const setCourse = id => dispatch => {
    dispatch({type: Type.SET_COURSE, id});
    dispatch(filterData());
}

const filterData = () => (dispatch, getState) => {
    const { courses } = getState();
    const { completed, event, courseId } = getState().filter;

    let items = courses
        .filter(course => courseId < 0 || course.id === courseId)
        .map(course => course.sections.map(section => ({
            course: course.name,
            link: course.link,
            section: section.name,
            open: section.open,
            close: section.close,
        })))
        .reduce((acc, items) => [...acc, ...items]);

    let dates = new Set();

    items.forEach(item => {
        if (event === 'opens' || event === 'any') {
            dates.add(item.open);
        }
        if (event === 'closes' || event === 'any') {
            dates.add(item.close);
        }
    });

    dates = Array.from(dates).sort((a, b) => {
        return parseDate(a) - parseDate(b);
    });

    if (!completed) {
        dates = dates.filter(date => {
            let now = new Date().setHours(0, 0, 0, 0);
            return parseDate(date) >= now;
        })
        items = items.filter(item => (
            dates.includes(item.open) ||
            dates.includes(item.close)
        ));
    }

    dispatch({type: Type.DATA_FILTERED, view: {items, dates}});
}

function parseDate(date) {
    return new Date(date.split('.').reverse().join('.'));
}
