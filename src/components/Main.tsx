import React from "react";
import Header from "./Header";
import Calculator from "./Calculator";
import Footer from "./Footer";


const Main: React.FC = () => {

    return <div className="">
        <div className="header-body-wrapper">
            <Header/>
            <div className="my-1 container-fluid h-100">
                <h1 className="fs-2 text-center">Valitse auton bensankulutus ja matkan pituus</h1>
                <h1 className="fs-2 text-center">Näe matkan keston ja bensankulutuksen erot eri
                    nopeuksilla
                </h1>
                <Calculator/>
            </div>
        </div>
        <Footer/>
    </div>
}

export default Main;
