const getScreenSize = (width) => {
  let size = "sm";
  if (width < 576) {
    size = "sm";
  }
  if (width >= 576 && width < 768) {
    size = "sm";
  }
  if (width >= 768 && width < 992) {
    size = "lg";
  }
  if (width >= 992) {
    size = "lg";
  }
  return size;
};

export default getScreenSize;
