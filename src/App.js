import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Timeline from "@material-ui/lab/Timeline";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

import EventItem from "./components/EventItem";
import EventSelect from "./components/EventSelect";
import CourseSelect from "./components/CourseSelect";
import CompletedSelect from "./components/CompletedSelect";
import {loadData} from "./store/actions";

const useStyles = makeStyles(theme => ({
    controls: {
        display: 'flex',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        justifyContent: 'space-around',
    },
}));

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { event } = useSelector(state => state.filter);
    const { items, dates } = useSelector(state => state.view);

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    const getEventsByDate = date => {
        let events = [];
        items.forEach(item => {
            if ((event === 'opens' || event === 'any') && item.open === date) {
                events.push({type: 'opens', item});
            }
            if ((event === 'closes' || event === 'any') && item.close === date) {
                events.push({type: 'closes', item});
            }
        });
        return events;
    }

    const getDotColor = date => {
        let now = new Date();
        date = new Date(date.split('.').reverse().join('.'));
        if (date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) {
            return "#f4cb3690";
        }
        return date < now ? "#f4363690" : "#94949490";
    };

    return (
        <Container maxWidth="md" fixed>
            <Container className={classes.controls}>
                <CourseSelect />
                <EventSelect />
                <CompletedSelect />
            </Container>
            <Timeline align="alternate">
                {dates.map(date => {
                    return (
                        <TimelineItem id={date} key={date}>
                            <TimelineOppositeContent>
                                <Typography color="textSecondary">
                                    {date}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot style={{background: getDotColor(date)}} />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                {getEventsByDate(date).map((event, i) => {
                                    return <EventItem key={i} type={event.type} {...event.item} />
                                })}
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        </Container>
    );
}
