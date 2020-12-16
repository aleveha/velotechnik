import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import React, {ChangeEvent, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const getImages = () => {
    function importAll(r: any) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../../img/gallery/small', false, /\.(png|jpe?g|svg)$/));

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

const PhotosAutoPlay = () => {
    const [index, setIndex] = useState<number>(1);

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
                        <img src={image.path} alt="galleryPhoto"/>
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