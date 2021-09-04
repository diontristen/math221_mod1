export const roundOff = (number) => {
    return Number(Math.round(parseFloat(number)+'e'+7)+'e-'+7);
}