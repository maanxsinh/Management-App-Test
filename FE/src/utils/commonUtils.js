const {
  openSbTrue,
  severityWarning,
  severitySuccess,
  setSnackbarMessage,
} = require("../Reducer/snackbarSlice");

const moment = require("moment");

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const bufferToBase64 = (img) => {
  const imageShow = new Buffer(img, "base64").toString("binary");
  return imageShow;
};

const toVnd = (price) => {
  const priceConvert = price.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return priceConvert;
};

const setSnackbar = (severity, message, dispatch) => {
  dispatch(openSbTrue());
  if (severity === "warning") {
    dispatch(severityWarning());
  } else {
    dispatch(severitySuccess());
  }
  dispatch(setSnackbarMessage(message));
};

const formatDate = (myDate) => {
  var date = new Date("2017-02-17T22:32:25.000Z");
  var dateSource = new Date(myDate);
  // console.log("typeof date:", dateSource);
  // console.log("typeof date:", typeof dateSource);
  var formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  var dateString = dateSource.toLocaleDateString("en-US", formatOptions);
  // console.log("---data format is:", dateString);
  return dateString;
};

module.exports = {
  getBase64: getBase64,
  bufferToBase64: bufferToBase64,
  toVnd: toVnd,
  setSnackbar: setSnackbar,
  formatDate: formatDate,
};
