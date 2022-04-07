import React from 'react';
import {CgSpinner} from "react-icons/cg";

const Spinner = () => {
    return (
        <div className="flex justify-center pb-4">
            <CgSpinner color="orange" className="spinner" size="4.25rem"/>
        </div>
    );
};

export default Spinner;
