import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import React, {ChangeEvent, useEffect, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";
import images from '../../functions/getAllImages';
import {duration} from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Images: { id: number, path: string }[] = images.map(image => {
    return (
        { id: images.indexOf(image) + 1, path: image }
    );
});

const PhotosAutoPlay = () => {
    const [index,setIndex] = useState<number>(1);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setIndex(value - 1);
    }
    const handleIndexChange = (value: number) => {
        setIndex(value);
    }

    return (
        <div className="gallery">
            <AutoPlaySwipeableViews
                index={index}
                onChangeIndex={handleIndexChange}
                interval={5000}
                className="images"
            >
                {Images.map(image =>
                    <div key={image.id}>
                        <img src={image.path} alt="photo"/>
                    </div>
                )}
            </AutoPlaySwipeableViews>
            <Pagination
                count={Images.length}
                page={index + 1}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                hidePrevButton
                hideNextButton
            />
        </div>
    );
}

export default PhotosAutoPlay;