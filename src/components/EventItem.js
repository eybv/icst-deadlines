import React from "react";
import {makeStyles} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    link: {
        "&:hover": {
            textDecoration: 'none',
        },
    },
    card: {
        margin: theme.spacing(1),
        textAlign: 'left'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
    },
    opens: {
        color: '#37b34a'
    },
    closes: {
        color: '#f43636'
    },
}));

export default function EventItem({ type, course, section, link }) {
    const classes = useStyles();
    return (
        <Link target="_blank" rel="noreferrer" href={link} className={classes.link}>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <div className={classes.header}>
                        <Typography variant="subtitle2">
                            {course}
                        </Typography>
                        <Typography variant="caption" className={
                            type === "opens" ? classes.opens : classes.closes
                        }>
                            {type}
                        </Typography>
                    </div>
                    <Typography variant="body2">
                        {section}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
