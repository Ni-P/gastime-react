import React, {useState} from "react";
import {Car} from "../models/car";
import {cars, fuelUsageCoefficient} from "../data";
import SpeedSelector from "./SpeedSelector";

const defaultSpeeds = new Map<string, number>();
defaultSpeeds.set("speed-1", 60);
defaultSpeeds.set("speed-2", 100);

const Calculator: React.FC = () => {
    const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
    const [travelDistance, setTravelDistance] = useState(100);
    const [speedMap,] = useState<Map<string, number>>(defaultSpeeds);
    const [, refresh] = useState({});

    const handleSpeedChange = (id: string, speed: number, travelTime: number, fuelCost: number) => {
        speedMap.set(id, speed);
        refresh({});
    }

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
        return formatTravelTimeToString(Math.abs(calculateTravelTime(travelDistance, speedMap.get("speed-1") || 10) - calculateTravelTime(travelDistance, speedMap.get("speed-2") || 10)));
    }

    const calculateExtraFuel = () => {
        return formatFuelCostString(formatFuelCostString(`${Math.abs(calculateFuelCost(speedMap.get("speed-2") || 10) - calculateFuelCost(speedMap.get("speed-1") || 10))}`));
    }

    return <div className="row">
        <div className="col-xl-9 col-md-12 col-sm-12 row m-auto">
            <div className="col-xs-12 row m-auto">
                <form target="#" className="fs-5 col-12 row m-auto my-1 my-sm-1">
                    <div className="col-md-12 col-12 form-floating my-1 my-md-0 row">
                        <div className="col-6 my-1 my-md-1"><label htmlFor="select-car" className="float-end">Auton kulutus</label></div>
                        <div className="col-6 my-1 my-md-1"><select id="select-car" className="form-control w-100"
                                                       aria-label="Bensankulutus"
                                                       onChange={(event) => onChanceCarSelectInput(event.target.value)}>
                            {cars.map((car) => <option key={"select" + car.name}
                                                       value={car.name}>{`${car.fuelConsumptionKm * 100}`.slice(0, 3)} Litraa/100km</option>)}
                        </select></div>
                        <div className="col-6 my-1 my-md-1"><label className="float-end" htmlFor="input-distance">Matka (km)</label></div>
                        <div className="col-6 my-1 my-md-1"><input className="form-control w-100" id="input-distance" type="number"
                                                      defaultValue={travelDistance} max={2000} aria-label="Matka"
                                                      onChange={(event) => onChangeDistanceInput(event.target.value || "0")}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 form-floating my-1 my-md-0">
                    </div>
                </form>
            </div>
            <div className="border-top w-100 m-auto my-2"/>

            <SpeedSelector id={"speed-1"} distance={travelDistance} fuelConsumption={selectedCar.fuelConsumptionKm}
                           defaultSpeed={speedMap.get("speed-1") || 10}
                           handleSpeedChange={handleSpeedChange}/>
            <SpeedSelector id={"speed-2"} distance={travelDistance} fuelConsumption={selectedCar.fuelConsumptionKm}
                           defaultSpeed={speedMap.get("speed-2") || 10}
                           handleSpeedChange={handleSpeedChange}/>

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
