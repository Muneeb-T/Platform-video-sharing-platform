const generateOtp = (numberOfDigits) => {
    return Math.random().toFixed(numberOfDigits).split('.')[1];
};
export default generateOtp;
