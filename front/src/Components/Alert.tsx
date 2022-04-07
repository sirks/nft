import React, {FC} from 'react';
import {TiWarning} from "react-icons/ti";
import {CgClose, CgCheckO} from "react-icons/cg";

type AlertProps = {
    color: string,
    title: string,
    description: string,
    setState: () => void,
}

const Alert: FC<AlertProps> = ({ color, title, description, setState}) => {
    return (
        // <div role="alert" className="pb-4">
        //     <div className={`${color === 'red' ? 'bg-red' : ''} ${color === 'green' ? 'bg-green' : ''} text-white font-bold  px-4 py-2`}>
        //         {title}
        //     </div>
        //     <div className={`border border-t-0 ${color === 'red' ? 'border-red' : ''} ${color === 'green' ? 'border-green' : ''} ${color === 'red' ? 'bg-redLight' : ''} ${color === 'green' ? 'bg-greenLight' : ''} px-4 py-3 text-black text-2xl`}>
        //         <p>{description}</p>
        //     </div>
        // </div>
        <div className={`${color === 'red' ? 'bg-red' : ''} ${color === 'green' ? 'bg-green' : ''} text-white flex items-center p-4 mb-4 rounded-lg`} role="alert">
            <div className="h-[28px] w-[28px]">
                {color === 'red' && <TiWarning className="h-[28px] w-[28px]"/>}
                {color === 'green' && <CgCheckO className="h-[28px] w-[28px]"/>}
            </div>
            <div className="ml-3 pr-7 text-xl">
                {description}
            </div>
            <button
                onClick={setState}
                type="button"
                className="ml-auto rounded-lg p-1.5 inline-flex"
            >
                <span className="sr-only">Close</span>
                <CgClose size="1.5rem"/>
            </button>
        </div>
    );
};

export default Alert;
