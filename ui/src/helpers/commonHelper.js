exports.getFirstImage = (images) => {
  if (images) {
    const imageArray = images.split(',');
    return imageArray[0];
  }
  return null;
};
