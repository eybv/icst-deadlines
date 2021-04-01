import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {setCompleted} from "../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexGrow: 0.2,
    },
}));

export default function CompletedSelect() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { completed } = useSelector(state => state.filter);

    const handleChange = e => dispatch(setCompleted(e.target.value));

    return (
        <FormControl variant="outlined" className={classes.root}>
            <InputLabel id="completed-select-label">Completed</InputLabel>
            <Select
                value={completed}
                label="Completed"
                id="completed-select"
                labelId="completed-select-label"
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value={true}>Show</MenuItem>
                <MenuItem value={false}>Hide</MenuItem>
            </Select>
        </FormControl>
    );
}
