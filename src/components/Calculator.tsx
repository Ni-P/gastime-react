import React, {useState} from "react";
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
        return cost.length > 6 ? cost.slice(0, 5).padEnd(6, "0") : cost;
    }

    const calculateSavedTime = () => {
        return formatTravelTimeToString(Math.abs(calculateTravelTime(travelDistance, firstSpeed) - calculateTravelTime(travelDistance, secondSpeed)));
    }

    const calculateExtraFuel = () => {
        return formatFuelCostString(formatFuelCostString(`${Math.abs(calculateFuelCost(secondSpeed) - calculateFuelCost(firstSpeed))}`));
    }

    return <div className="row">
        <div className="col-xl-9 col-md-12 col-sm-12 row m-auto">
            <div className="col-xs-12 row m-auto">
                <form target="#" className="fs-5 col-12 row m-auto">
                    <div className="col-4 col-md-5 col-sm-6 col-12 my-1 my-sm-1">
                        <label htmlFor="select-car" className="w-25 form-label">Auton kulutus</label>
                        <select id="select-car" className="w-75 form-select-sm"
                                onChange={(event) => onChanceCarSelectInput(event.target.value)}>
                            {cars.map((car) => <option key={"select" + car.name}
                                                       value={car.name}>{`${car.fuelConsumptionKm * 100}`.slice(0, 3)} Litraa/100km</option>)}
                        </select>
                    </div>
                    <div className="col-4 col-md-5 col-sm-6 col-12 row my-1 my-sm-1">
                        <label className="col-6 form-label" htmlFor="input-distance">Matka (km)</label>
                        <input className="col-6 form-control-sm" id="input-distance" type="number" defaultValue={travelDistance} max={2000} aria-label=""
                               onChange={(event) => onChangeDistanceInput(event.target.value || "0")}/>
                    </div>
                    {/*<div className="col-md-2 col-sm-2 col-sm-12 col-12 my-1 my-sm-1">*/}
                    {/*    <button className="btn btn-primary w-100" type="submit"*/}
                    {/*            onClick={(e) => e.preventDefault()}>Laske*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </form>
            </div>
            <div className="border-top w-100 m-auto my-2"/>


            <div className="col-12 col-md-6 row fs-5 my-1 my-md-0">
                <div className="col-12 col-md-12 row fs-5">
                    <div className="col-12 row">
                        <div className="col-12 row">
                            <div className="col-6">
                                <label className="form-label" htmlFor="input-range-speed-1">Ajonopeus</label>
                            </div>
                            <div className="col-6">
                                <p className="d-inline"><span className="fs-4">{firstSpeed}</span> (km/h) </p>
                            </div>
                        </div>
                        <div className="col-12">
                            <input className="w-100" type="range" id="input-range-speed-1" max={200} min={0}
                                   step={10} defaultValue={firstSpeed}
                                   onChange={(event => setFirstSpeed(Number.parseInt(event.target.value) || 10))}/>
                        </div>
                    </div>
                </div>
                {/*<div className="col-12">*/}
                {/*    <span className="fs-5">Nopeudella {firstSpeed} km/h</span>*/}
                {/*</div>*/}
                <div className="col-6 col-md-6"><span className="fs-5">Matkan kesto</span></div>
                <div className="col-6 col-md-6"><span className="fs-5">Bensakulutus</span></div>
                <div
                    className="col-6 col-md-6 fs-4">{formatTravelTimeToString(calculateTravelTime(travelDistance, firstSpeed))}</div>
                <div
                    className="col-6 col-md-6 fs-4">{formatFuelCostString(`${calculateFuelCost(firstSpeed)}`)} L
                </div>

            </div>
            {/*<div className="col-12 col-md-6 row fs-5 my-1 my-md-0">*/}
            {/*    */}
            {/*</div>*/}
            <div className="col-12 col-md-6 row fs-5 my-1 my-md-0">
                <div className="col-12 col-md-12 row fs-5">
                    <div className="col-12">
                        <label className="form-label w-100" htmlFor="input-range-speed-1">Ajonopeus</label><p
                        className="d-inline"><span className="fs-4">{secondSpeed}</span> (km/h)</p>
                        <input className="w-100" type="range" id="input-range-speed-1" max={200} min={0}
                               step={10} defaultValue={secondSpeed}
                               onChange={(event => setSecondSpeed(Number.parseInt(event.target.value) || 10))}/>
                    </div>
                </div>
                {/*<div className="col-12">*/}
                {/*    Nopeudella {secondSpeed} km/h*/}
                {/*</div>*/}
                <div className="col-6"><span className="fs-5">Matkan kesto</span></div>
                <div className="col-6"><span className="fs-5">Bensakulutus</span></div>
                <div
                    className="col-6 fs-4">{formatTravelTimeToString(calculateTravelTime(travelDistance, secondSpeed))}</div>
                <div
                    className="col-6 fs-4">{formatFuelCostString(`${calculateFuelCost(secondSpeed)}`)} L
                </div>
            </div>


            <div className="border-top w-100 m-auto my-2"/>
            <div className="col-12 row fs-5">
                <div className="col-12">
                    <p className="d-inline">Arviot</p>
                </div>
                <div className="col-6 px-1 px-md-1">
                    <span className="fs-5 float-end">Säästetty aika: </span>
                </div>
                <div className="col-6 px-1 px-md-1">
                    <span className="fs-4 float-md-start float-none">{calculateSavedTime()}</span>
                </div>
                <div className="col-6 px-0 px-md-1">
                    <span className="fs-5 float-end">Ylimääräinen bensakulutus: </span>
                </div>
                <div className="col-6 px-0 px-md-1">
                    <span className="fs-4 float-md-start float-none">{calculateExtraFuel()} Litraa</span>
                </div>
            </div>

        </div>
    </div>

}

export default Calculator;
