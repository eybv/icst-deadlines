import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {setCourse} from "../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
}));

export default function CourseSelect() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state);
    const { courseId } = useSelector(state => state.filter)

    const handleChange = e => dispatch(setCourse(e.target.value));

    return (
        <FormControl variant="outlined" className={classes.root}>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
                value={courseId}
                label="Course"
                id="course-select"
                labelId="course-select-label"
                onChange={handleChange}
            >
                <MenuItem value={-1}>All</MenuItem>
                {courses.map((course, i) => {
                    return(
                        <MenuItem key={i} value={course.id}>
                            {course.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
