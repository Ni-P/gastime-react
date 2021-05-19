import React from "react";
import Header from "./Header";
import Calculator from "./Calculator";


const Main: React.FC = () => {

    return <>
        <Header/>
        <div className="my-1 container-fluid">
            <Calculator/>
        </div>
    </>
}

export default Main;
