import {Car} from "../models/car";

export const fuelUsageCoefficient = 1.009;
export const minSpeed = 10;

export const cars: Array<Car> = [
    {name: "A", fuelConsumptionKm: 0.03},
    {name: "B", fuelConsumptionKm: 0.035},
    {name: "C", fuelConsumptionKm: 0.04}
]

export const supportedSpeedSelectors = 2;

export const speedIdArray = (): Array<string> => {
    let arr = [];
    while (arr.push(`speed-${arr.length}`) < supportedSpeedSelectors) ;
    return arr;
}

export const defaultSpeeds = (speedIds: Array<string>): Map<string, number> => {
    let map = new Map<string, number>();
    speedIds.forEach((id) => map.set(id, minSpeed));
    return map;
}