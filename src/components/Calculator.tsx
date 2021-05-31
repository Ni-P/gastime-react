import React, {useEffect, useState} from "react";
import {Car} from "../models/car";
import {cars, defaultSpeeds, maxDistance, speedIdArray} from "../data";
import SpeedSelector from "./SpeedSelector";
import {calculateFuelCost, calculateTravelTime} from "../application";
import Results from "./Results";
import ResultsForSpeedView from "./ResultsForSpeedView";


const Calculator: React.FC = () => {
    const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
    const [travelDistance, setTravelDistance] = useState(100);
    const [speedArray,] = useState<Array<string>>(speedIdArray());
    const [speedMap, setSpeedMap] = useState<Map<string, number>>(defaultSpeeds(speedArray));
    const [travelTimeMap,] = useState<Map<string, number>>(new Map().set(speedArray[0], 0).set(speedArray[1], 0));
    const [fuelCostMap,] = useState<Map<string, number>>(new Map().set(speedArray[0], 0).set(speedArray[1], 0));
    const [, refresh] = useState({});

    const handleSpeedChange = (id: string, speed: number) => {
        setSpeedMap(new Map(speedMap).set(id, speed));
    }

    const onChanceCarSelectInput = (value: string) => {
        setSelectedCar(cars.find(car => car.name === value) || {name: "", fuelConsumptionKm: 0});
    }

    const onChangeDistanceInput = (value: string) => {
        let distance = Number.parseInt(value);
        if (distance > maxDistance) setTravelDistance(maxDistance);
        else if(distance < 0) setTravelDistance(0);
        else setTravelDistance(distance);
    }

    useEffect(() => {
        speedArray.forEach(id => {
            travelTimeMap.set(id, calculateTravelTime(travelDistance, speedMap.get(id) || 0));
            fuelCostMap.set(id, calculateFuelCost(selectedCar.fuelConsumptionKm, speedMap.get(id) || 0, travelDistance));
        });
        refresh({});
    }, [selectedCar, travelDistance, speedMap, speedArray, travelTimeMap, fuelCostMap]);

    const calculateSavedTime = () => {
        return Math.abs((travelTimeMap.get(speedArray[0]) || 0) - (travelTimeMap.get(speedArray[1]) || 0));
    }

    const calculateExtraFuel = () => {
        return Math.abs((fuelCostMap.get(speedArray[0]) || 0) - (fuelCostMap.get(speedArray[1]) || 0));
    }

    return <div className="row">
        <div className="col-xl-9 col-md-12 col-sm-12 row m-auto">
            <div className="col-xs-12 row m-auto">
                <form className="fs-5 col-12 row m-auto my-1 my-sm-1" onSubmit={(event) => event.preventDefault()}>
                    <div className="col-md-12 col-12 form-floating my-1 my-md-0 row">
                        <div className="col-6 my-1 my-md-1"><label htmlFor="select-car" className="float-end">Auton
                            kulutus</label></div>
                        <div className="col-6 my-1 my-md-1"><select id="select-car" className="form-control w-100"
                                                                    aria-label="Bensankulutus"
                                                                    onChange={(event) => onChanceCarSelectInput(event.target.value)}>
                            {cars.map((car) => <option key={"select" + car.name}
                                                       value={car.name}>{`${car.fuelConsumptionKm * 100}`.slice(0, 3)} Litraa/100km</option>)}
                        </select></div>
                        <div className="col-6 my-1 my-md-1"><label className="float-end" htmlFor="input-distance">Matka
                            (km)</label></div>
                        <div className="col-6 my-1 my-md-1"><input className="form-control w-100" id="input-distance"
                                                                   type="number"
                                                                   defaultValue={travelDistance} max={maxDistance}
                                                                   aria-label="Matka"
                                                                   min={0}
                                                                   value={travelDistance}
                                                                   onChange={(event) => onChangeDistanceInput(event.target.value || "0")}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 form-floating my-1 my-md-0">
                    </div>
                </form>
            </div>

            <div className="border-top w-100 m-auto my-2"/>

            {speedArray.map((id) => {
                return <SpeedSelector id={id} distance={travelDistance} key={id + "-selector"}
                                      fuelConsumptionKm={selectedCar.fuelConsumptionKm}
                                      defaultSpeed={speedMap.get(id) || 10}
                                      handleSpeedChange={handleSpeedChange}>
                    <ResultsForSpeedView travelTime={travelTimeMap.get(id) || 0} key={id + "-view"}
                                         fuelCost={fuelCostMap.get(id) || 0}/>
                </SpeedSelector>
            })}

            <div className="border-top w-100 m-auto my-2"/>

            <Results savedTime={calculateSavedTime()} extraFuel={calculateExtraFuel()}/>
        </div>
    </div>
}

export default Calculator;
