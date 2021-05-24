import React from "react";
import Header from "./Header";
import Calculator from "./Calculator";


const Main: React.FC = () => {

    return <>
        <Header/>
        <div className="my-1 container-fluid">
            <h1 className="fs-2">Valitse auton bensankulutus ja matkan pituus</h1>
            <h1 className="fs-2">Näe matkan keston ja bensankulutuksen erot eri
                nopeuksilla
            </h1>
            <Calculator/>
        </div>
    </>
}

export default Main;
