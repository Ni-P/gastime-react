import React, {ChangeEvent, PropsWithChildren, useState} from "react";

interface ISpeedSelectorProps extends PropsWithChildren<any> {
    id: string;
    distance: number;
    fuelConsumptionKm: number;
    defaultSpeed: number;
    handleSpeedChange: (id:string, speed: number) => void;
}

const SpeedSelector: React.FC<ISpeedSelectorProps> = ({id, defaultSpeed, handleSpeedChange, children}) => {
    const [speed, setSpeed] = useState(defaultSpeed || 100);

    const onSpeedChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newSpeed = Number.parseInt(event.target.value) || 10;
        setSpeed(newSpeed);
        handleSpeedChange(id, newSpeed);
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
                    <input className="w-100" type="range" id="input-range-speed-1" max={200} min={10}
                           step={10} defaultValue={speed}
                           onChange={onSpeedChange}/>
                </div>
            </div>
        </div>
        {children}
    </div>)

}

export default SpeedSelector;
