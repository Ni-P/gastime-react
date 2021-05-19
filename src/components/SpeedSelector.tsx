import React, {ChangeEvent, useState} from "react";
import {fuelUsageCoefficient} from "../data";

interface ISpeedSelectorProps {
    id: string;
    distance: number;
    fuelConsumption: number;
    defaultSpeed: number;
    handleSpeedChange: (id:string, speed: number, travelTime: number, fuelCost: number) => void;
}

const SpeedSelector: React.FC<ISpeedSelectorProps> = ({id, distance, defaultSpeed, fuelConsumption, handleSpeedChange}) => {

    const [speed, setSpeed] = useState(defaultSpeed || 100);

    const onSpeedChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newSpeed = Number.parseInt(event.target.value) || 10;
        setSpeed(newSpeed);
        handleSpeedChange(id, newSpeed, calculateTravelTime(distance, newSpeed), calculateFuelCost(newSpeed));
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
        return Math.fround(fuelConsumption * Math.pow(fuelUsageCoefficient, speed - 1) * distance);
    }

    const formatFuelCostString = (cost: string) => {
        return cost.length > 6 ? cost.slice(0, 5).padEnd(6, "0") : cost;
    }

    return (<div className="col-12 col-md-6 row fs-5 my-1 my-md-0 m-auto">
        <div className="col-12 col-md-12 row fs-5">
            <div className="col-12 row">
                <div className="col-12 row">
                    <div className="col-6">
                        <label className="form-label" htmlFor="input-range-speed-1">Ajonopeus</label>
                    </div>
                    <div className="col-6">
                        <p className="d-inline"><span className="fs-4">{speed}</span> (km/h) </p>
                    </div>
                </div>
                <div className="col-12">
                    <input className="w-100" type="range" id="input-range-speed-1" max={200} min={0}
                           step={10} defaultValue={speed}
                           onChange={onSpeedChange}/>
                </div>
            </div>
        </div>
        {/*<div className="col-12">*/}
        {/*    <span className="fs-5">Nopeudella {firstSpeed} km/h</span>*/}
        {/*</div>*/}
        <div className="col-6 col-md-6"><span className="fs-5">Matkan kesto</span></div>
        <div className="col-6 col-md-6"><span className="fs-5">Bensakulutus</span></div>
        <div
            className="col-6 col-md-6 fs-4">{formatTravelTimeToString(calculateTravelTime(distance, speed))}</div>
        <div
            className="col-6 col-md-6 fs-4">{formatFuelCostString(`${calculateFuelCost(speed)}`)} L
        </div>
    </div>)

}

export default SpeedSelector;
