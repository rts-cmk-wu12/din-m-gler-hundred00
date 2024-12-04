// so we dont have to keep adding these to different pages we can just refer to them here. i would have a larger libaray file but since i am only using one in this project i will just have this

export function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
    // to have the commas and dots in numbers
}