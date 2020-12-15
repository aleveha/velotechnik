import React, {ReactElement} from 'react';
import {Button, makeStyles, createStyles, ButtonProps} from '@material-ui/core';

interface IButtonProps extends ButtonProps {
    content: string | JSX.Element,
    icon?: ReactElement,
}

const useStyles = makeStyles(() =>
    createStyles({
        bookingButton: {
            margin: "0 1rem",
            backgroundColor: "var(--buttonBG)",
            '&:hover': {
                backgroundColor: "var(--buttonHoverBG)",
            },
            borderRadius: "20px",
            fontSize: "2vh"
        }
    }),
);

const MyButton = (props: IButtonProps) => {
    const classes = useStyles();

    return (
        <Button
            type={props.type}
            variant="contained"
            color="secondary"
            className={classes.bookingButton}
            endIcon={props.icon}
            onClick={props.onClick}
        >
            {props.content}
        </Button>
    );
};

export default MyButton;