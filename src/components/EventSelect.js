import React from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {setEvent} from "../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexGrow: 0.2,
    },
}));

export default function EventSelect() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { event } = useSelector(state => state.filter);

    const handleChange = e => dispatch(setEvent(e.target.value));

    return (
        <FormControl variant="outlined" className={classes.root}>
            <InputLabel id="event-select-label">Event</InputLabel>
            <Select
                value={event}
                label="Event"
                id="event-select"
                labelId="event-select-label"
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="opens">Opens</MenuItem>
                <MenuItem value="closes">Closes</MenuItem>
            </Select>
        </FormControl>
    );
}
