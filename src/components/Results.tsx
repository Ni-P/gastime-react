import React from "react";
import {formatFuelCostString, formatTravelTimeToString} from "../application";

interface IResultsProps  {
    savedTime: number;
    extraFuel: number;
}

const Results: React.FC<IResultsProps> = ({savedTime, extraFuel}) =>{

    return <div className="col-12 row fs-5">
        <div className="col-12">
            <p className="d-inline">Arviot</p>
        </div>
        <div className="col-12 row justify-content-around">
            <div className="col-6 col-md-5 px-1 px-md-1">
                <span className="fs-5 float-end">Säästetty aika: </span>
            </div>
            <div className="col-6 col-md-5 px-1 px-md-1">
                <span className="fs-4 float-md-start float-none">{formatTravelTimeToString(savedTime)}</span>
            </div>
        </div>
        <div className="col-12 row justify-content-around">
            <div className="col-6 col-md-5 px-0 px-md-1">
                <span className="fs-5 float-end">Ylimääräinen bensakulutus: </span>
            </div>
            <div className="col-6 col-md-5 px-0 px-md-1">
                <span className="fs-4 float-md-start float-none">{formatFuelCostString(extraFuel)} Litraa</span>
            </div>
        </div>
    </div>
}

export default Results;
