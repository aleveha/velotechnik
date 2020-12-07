import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import React, {ChangeEvent, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const PhotosAutoPlay = () => {
    const [index,setIndex] = useState<number>(1);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setIndex(value - 1);
    }

    const handleIndexChange = (value: number) => {
        setIndex(value);
    }

    return (
        <div>
            <AutoPlaySwipeableViews index={index} onChangeIndex={handleIndexChange}>
                <div style={{minHeight: '100px', backgroundColor: "red"}}>slide n°1</div>
                <div style={{minHeight: '100px', backgroundColor: "red"}}>slide n°2</div>
                <div style={{minHeight: '100px', backgroundColor: "red"}}>slide n°3</div>
            </AutoPlaySwipeableViews>
            <Pagination
                count={3}
                page={index + 1}
                onChange={handlePageChange}
                color="primary"
            />
        </div>
    );
}

export default PhotosAutoPlay;