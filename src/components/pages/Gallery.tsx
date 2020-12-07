import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import React, {ChangeEvent, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Images: {id: number, name: string}[] = [
    // { id: 1, name: mainPhoto },
    // { id: 2, name: secPhoto }
]

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
                        <img src={image.name} alt="photo"/>
                    </div>
                )}
            </AutoPlaySwipeableViews>
            <Pagination
                count={Images.length}
                page={index + 1}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
            />
        </div>
    );
}

export default PhotosAutoPlay;