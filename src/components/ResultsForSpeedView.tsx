import React from "react";
import {formatFuelCostString, formatTravelTimeToString} from "../application";


export const ResultsForSpeedView: React.FC<{ travelTime: number, fuelCost: number }> = ({travelTime, fuelCost}) => {

    return <div className="col-12 row g-0 mt-1">
        <div className="col-6 col-md-6"><span className="fs-5">Matkan kesto</span></div>
        <div className="col-6 col-md-6"><span className="fs-5">Bensakulutus</span></div>
        <div
            className="col-6 col-md-6 fs-4 "><span className="float-start float-md-none">{formatTravelTimeToString(travelTime)}</span></div>
        <div
            className="col-6 col-md-6 fs-4 float-sm-end"><span className="">{formatFuelCostString(fuelCost)} L</span>
        </div>
    </div>
}

export default ResultsForSpeedView;