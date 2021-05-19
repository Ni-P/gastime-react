import React, {ChangeEventHandler, useState} from "react";
import {Car} from "../models/car";

const fuelUsageCoefficient = 1.009;
const cars: Array<Car> = [
    {name: "A", fuelConsumptionKm: 0.03},
    {name: "B", fuelConsumptionKm: 0.035},
    {name: "C", fuelConsumptionKm: 0.04}
]

const Calculator: React.FC = () => {
    const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
    const [travelDistance, setTravelDistance] = useState(100);
    const [firstSpeed, setFirstSpeed] = useState(50);
    const [secondSpeed, setSecondSpeed] = useState(100);

    const onChanceCarSelectInput = (value: string) => {
        setSelectedCar(cars.find(car => car.name === value) || {name: "", fuelConsumptionKm: 0});
    }

    const onChangeDistanceInput = (value: string) => {
        setTravelDistance(Number.parseInt(value));
    }

    const calculateTravelTime = (distance: number, speed: number) => {
        return distance / speed;
    }

    const formatTravelTimeToString = (time: number) => {
        let hours = Math.floor(time);
        let minutes = (time - hours) * 60;
        return `${hours} tuntia ${Math.ceil(minutes)} minuuttia`;
    }

    const calculateFuelCost = (speed: number) => {
        return Math.fround(selectedCar.fuelConsumptionKm * Math.pow(fuelUsageCoefficient, speed - 1) * travelDistance);
    }

    const formatFuelCostString = (cost: string) => {
        return cost.length > 6 ? cost.slice(0, 6) : cost;
    }

    return <div className="row">
        <div className="col-xl-9 col-md-12 col-sm-12 row m-auto">
            <div className="col-xs-12 row m-auto">
                <form target="#" className="fs-5 col-12 row m-auto">
                    <div className="col-4 col-md-5 col-sm-6 col-12 my-1 my-sm-1">
                        <label htmlFor="select-car" className="w-25 form-label">Auto</label>
                        <select id="select-car" className="w-75"
                                onChange={(event) => onChanceCarSelectInput(event.target.value)}>
                            {cars.map((car) => <option key={"select" + car.name}
                                                       value={car.name}>{car.name} ({`${car.fuelConsumptionKm * 100}`.slice(0, 3)}L/100km)</option>)}
                        </select>
                    </div>
                    <div className="col-4 col-md-5 col-sm-6 col-12 row my-1 my-sm-1">
                        <label className="col-6 form-label" htmlFor="input-distance">Matka (km)</label>
                        <input className="col-6" id="input-distance" type="number" defaultValue={travelDistance}
                               onChange={(event) => onChangeDistanceInput(event.target.value)}/>
                    </div>
                    {/*<div className="col-md-2 col-sm-2 col-sm-12 col-12 my-1 my-sm-1">*/}
                    {/*    <button className="btn btn-primary w-100" type="submit"*/}
                    {/*            onClick={(e) => e.preventDefault()}>Laske*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </form>
            </div>
            <div className="col-12 my-sm-1 row">
                <div className="col-12 col-md-6 row fs-5">
                    <div className="col-12">
                        <label className="form-label w-100" htmlFor="input-range-speed-1">Ajonopeus</label>
                        <p className="d-inline">{firstSpeed} (km/h)</p>
                        <input className="w-100" type="range" id="input-range-speed-1" max={200} min={0}
                               step={10} defaultValue={firstSpeed}
                               onChange={(event => setFirstSpeed(Number.parseInt(event.target.value) || 10))}/>
                    </div>
                </div>
                <div className="col-12 col-md-6 row fs-5">
                    <div className="col-12">
                        <label className="form-label w-100" htmlFor="input-range-speed-1">Ajonopeus</label><p
                        className="d-inline">{secondSpeed} (km/h)</p>
                        <input className="w-100" type="range" id="input-range-speed-1" max={200} min={0}
                               step={10} defaultValue={secondSpeed}
                               onChange={(event => setSecondSpeed(Number.parseInt(event.target.value) || 10))}/>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 row fs-5 my-1 my-md-0">
                <div className="col-12">
                    Nopeudella {firstSpeed} km/h
                </div>
                <div className="col-6">Matkan kestää</div>
                <div className="col-6">Bensakulutus</div>
                <div
                    className="col-6 fs-4">{formatTravelTimeToString(calculateTravelTime(travelDistance, firstSpeed))}</div>
                <div
                    className="col-6 fs-4">{formatFuelCostString(`${calculateFuelCost(firstSpeed)}`)} L
                </div>
            </div>
            <div className="col-12 col-md-6 row fs-5 my-1 my-md-0">
                <div className="col-12">
                    Nopeudella {secondSpeed} km/h
                </div>
                <div
                    className="col-6 fs-4">Kesto {formatTravelTimeToString(calculateTravelTime(travelDistance, secondSpeed))}</div>
                <div
                    className="col-6 fs-4">Bensakulutus {formatFuelCostString(`${calculateFuelCost(secondSpeed)}`)} L
                </div>
            </div>

        </div>
    </div>

}

export default Calculator;
