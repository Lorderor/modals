export default (...args) => {
    return args.reduce((prevVal, curVal) => {
        prevVal = {...prevVal, ...curVal()}
        return prevVal;
    }, {})
}