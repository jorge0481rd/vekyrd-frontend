// this will remove the number index from the image path, because we're currently loading images from public folder, not the database
const removeNumberIndexFromImgPath = (str) => {
    if (typeof str === 'undefined') return '';

    let pathName;
    if (str.indexOf("_") > -1) {
        pathName = str.split('_')[1]
        return "/img/products/" + pathName
    }

    return str
}

export default removeNumberIndexFromImgPath;