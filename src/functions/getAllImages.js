function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../img/gallery/small', false, /\.(png|jpe?g|svg)$/));

const imagesArray = Object.keys(images).map(key => {
    return images[key].default;
})

export default imagesArray;