import React, {ReactElement} from 'react';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
    createStyles({
        bookingButton: {
            margin: "0 1rem",
            backgroundColor: "var(--buttonBG)",
            '&:hover': {
                backgroundColor: "var(--buttonHoverBG)",
            },
            borderRadius: "20px"
        },
        buttonText: {
            fontSize: "1.7rem"
        }
    }),
);

const MyButton = (props: {
    path: string
    content: string,
    icon?: ReactElement,
    onClick?: () => void
}) => {
    const classes = useStyles();

    return (
        <Link to={props.path} className="myButton">
            <Button
                variant="contained"
                color="secondary"
                className={classes.bookingButton}
                endIcon={props.icon}
                onClick={props.onClick}
            >
                <p className={classes.buttonText}>{props.content}</p>
            </Button>
        </Link>
    );
};

export default MyButton;