import React from 'react';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
    createStyles({
        bookingButton: {
            height: "4.5vh",
            margin: "0 1rem",
            backgroundColor: "var(--buttonBG)",
            '&:hover': {
                backgroundColor: "var(--buttonHoverBG)",
            },
        },
        buttonText: {
            fontSize: "1.7rem"
        }
    }),
);

const BookingButton = () => {
    const classes = useStyles();

    return (
        <Link to="/booking">
            <Button
                variant="contained"
                color="secondary"
                className={classes.bookingButton}
            >
                <p className={classes.buttonText}>ЗАПИСАТЬСЯ</p>
            </Button>
        </Link>
    );
};

export default BookingButton;