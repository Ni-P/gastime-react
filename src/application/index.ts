import {fuelUsageCoefficient} from "../data";

export const calculateFuelCost = (fuelPerKm: number, speed: number, distance: number) => {
    return Math.fround(fuelPerKm * Math.pow(fuelUsageCoefficient, speed - 1) * distance);
}

export const formatFuelCostString = (cost: number) => {
    let costString = cost.toString();
    return costString.length > 6 ? costString.slice(0, 5).padEnd(6, "0") : cost;
}

export const calculateTravelTime = (distance: number, speed: number) => {
    return distance / speed;
}

export const formatTravelTimeToString = (time: number) => {
    if (isNaN(time)) time = 0;
    if(!isFinite(time)) time = 0;
    let hours = Math.floor(time);
    let minutes = (time - hours) * 60;
    return `${hours} tuntia ${Math.round(minutes)} minuuttia`;
}
