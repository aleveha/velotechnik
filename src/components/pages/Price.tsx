import React, {useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog, DialogActions,
    DialogTitle, Divider,
    List,
    ListItem,
    makeStyles
} from "@material-ui/core";
import '../../css/pages/priceList.css';

interface IElemPrice {
    name: string,
    price: number
}

interface ICategory {
    name: string,
    image: { id: number, path: string },
    desc?: string,
    priceList: IElemPrice[]
}

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        maxWidth: 500,
        width: "20vw",
        minHeight: 200,
        height: "15vw",
        margin: "2rem 1rem"
    },
    media: {
        minHeight: 150,
        height: "70%",
    },
    dialogTitle: {
        backgroundColor: "var(--secondBG)",
        color: "var(--secondText)"
    },
    listElement: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    closeButton: {
        '&:hover': {
            backgroundColor: "var(--buttonHoverBG)",
            color: "var(--secondText)"
        }
    }
});

const getImages = () => {
    function importAll(r: any) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../../img/price', false, /\.(png|jpe?g|svg)$/));

    return Object.keys(images).map(key => {
        return images[key].default;
    });
}
const imageArray = getImages();
const Images: { id: number, path: string }[] = imageArray.map(image => {
    return (
        {id: imageArray.indexOf(image) + 1, path: image}
    );
});

const Categories: ICategory[] = [
    {
        name: "РАМА",
        image: {
            id: Images[0].id,
            path: Images[0].path
        },
        desc: "",
        priceList: [
            {name: "ПРИМЕР", price: 500}
        ]
    },
    {
        name: "ВИЛКА",
        image: {
            id: Images[1].id,
            path: Images[1].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "КОЛЁСА",
        image: {
            id: Images[2].id,
            path: Images[2].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "АМОРТИЗАТОР",
        image: {
            id: Images[3].id,
            path: Images[3].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "ТРАНСМИССИЯ",
        image: {
            id: Images[4].id,
            path: Images[4].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "УПРАВЛЕНИЕ",
        image: {
            id: Images[5].id,
            path: Images[5].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "ТОРМОЗА",
        image: {
            id: Images[6].id,
            path: Images[6].path
        },
        desc: "",
        priceList: []
    },
    {
        name: "ПОСАДКА",
        image: {
            id: Images[7].id,
            path: Images[7].path
        },
        desc: "",
        priceList: []
    }
];

const Price = () => {
    return (
        <div className="priceList">
            {Categories.map(category => {
                return (
                    <Category
                        key={category.name}
                        name={category.name}
                        image={category.image}
                        desc={category.desc}
                        priceList={category.priceList}
                    />
                );
            })}
        </div>
    );
};

const ElementPrice = (props: IElemPrice) => {
    const classes = useStyles();
    return (
        <ListItem className={classes.listElement}>
            <p className="dialogPar">{props.name}</p>
            <p className="dialogPar">{props.price} р.</p>
        </ListItem>
    );
}

const Category = (props: ICategory) => {
    const classes = useStyles();
    const [elev, setElev] = useState<number>(5);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleSelected = () => {
        setElev(15);
    }
    const handleUnFocus = () => {
        setElev(5);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    return (
        <div>
            <Card
                className={classes.root}
                elevation={elev}
                onMouseEnter={handleSelected}
                onMouseLeave={handleUnFocus}
                onClick={handleDialogOpen}
            >
                <CardActionArea style={{height: "100%"}}>
                    <CardMedia
                        src={props.image.path}
                        className={classes.media}
                        component="img"
                    />
                    <CardContent>
                        <h2>{props.name}</h2>
                        {props.desc && <p>{props.desc}</p>}
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle className={classes.dialogTitle}>
                    {props.name}
                </DialogTitle>
                <List>
                    {props.priceList.map(elem =>
                        <ElementPrice key={elem.name} name={elem.name} price={elem.price}/>
                    )}
                </List>
                <Divider />
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleDialogClose}
                        className={classes.closeButton}
                    >
                        ЗАКРЫТЬ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Price;