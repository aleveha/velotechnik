import React from 'react';
import { Backdrop, createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

interface ITab {
    id: number,
    name: string,
    path: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            backgroundColor: "rgba(0, 0, 0, 85%)"
        }
    }),
);

export const Tabs: ITab[] = [
    { id: 1, name: "ГЛАВНАЯ", path: "/home" },
    { id: 2, name: "ЗАПИСЬ", path: "/booking" },
    { id: 3, name: "УСЛУГИ", path: "/services" },
    { id: 4, name: "ГАЛЕРЕЯ", path: "/photos" },
    { id: 5, name: "КОНТАКТЫ", path: "/contacts" }
]

const Menu = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <IconButton onClick={handleToggle} >
                <MenuIcon fontSize="large" style={{color: "#fff", fontSize: "3rem"}}/>
            </IconButton>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <div className="tabs">
                    {Tabs.map(tab =>
                        <Link
                            to={tab.path}
                            key={tab.id}
                            className="tab"
                        >
                            <h2>{tab.name}</h2>
                        </Link>
                    )}
                </div>
            </Backdrop>
        </div>
    );
};

export default Menu;