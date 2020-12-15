import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

interface ICategory {
    name: string,
    image: string,
    desc?: string
}

const Categories: ICategory[] = [
    { name: "РАМА", image: "", desc: "" },
    { name: "ВИЛКА", image: "", desc: "" },
    { name: "КОЛЁСА", image: "", desc: "" },
    { name: "АМОРТИЗАТОР", image: "", desc: "" },
    { name: "ТРАНСМИССИЯ", image: "", desc: "" },
    { name: "УПРАВЛЕНИЕ", image: "", desc: "" },
    { name: "ТОРМОЗА", image: "", desc: "" },
    { name: "ПОСАДКА", image: "", desc: "" }
]

const Price = () => {
    return (
        <div className="priceList">

        </div>
    );
};

const Category = (props: ICategory) => {
    return(
        <Card className="category">
            <CardActionArea>
                <CardMedia src={props.image} />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    {props.desc &&
                        <Typography variant="body2" component="p">
                            {props.desc}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Price;