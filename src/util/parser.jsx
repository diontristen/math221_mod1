export const roundOff = (number) => {
    return Number(Math.round(number+'e'+4)+'e-'+4);
}