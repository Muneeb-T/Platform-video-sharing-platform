function generateVerificationCode(numberOfDigits) {
    return Math.random().toFixed(numberOfDigits).split('.')[1];
}
export { generateVerificationCode };
