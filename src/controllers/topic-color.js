const setTopicColor = (count) => {
  let color = "light"
  if (count >= 80 && count >= 80) {
    color = "dark";
  }
  if (count >= 70 && count < 80) {
    color = "danger";
  }
  if (count >= 60 && count < 70) {
    color = "warning";
  }
  if (count >= 50 && count < 60) {
    color = "tertiary";
  }
  if (count >= 40 && count < 50) {
    color = "success";
  }
  if (count >= 30 && count < 40) {
    color = "primary";
  }
  if (count >= 20 && count < 30) {
    color = "secondary";
  }
  if (count >= 10 && count < 20) {
    color = "medium";
  }
  if (count >= 0 && count < 10) {
    color = "light";
  }
  return color
};

export default setTopicColor