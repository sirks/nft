import React, {FC} from 'react';
import {FaAlignCenter, FaMapMarkerAlt, FaRegClock} from "react-icons/fa";

type EventProps = {
    display: string,
    location: string,
    time: string
}

const Event: FC<EventProps> = ({display, location, time}) => {
    return (
        <div className="px-5 mx-auto pt-4">
            <div className="flex flex-col text-center w-full mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome to</h1>
                <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-900 uppercase">{display}</h1>
            </div>
            <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 md:w-1/3 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <FaAlignCenter className="w-9 h-9 mb-3 inline-block"/>
                        <p className="leading-relaxed text-base">{display}</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <FaMapMarkerAlt className="w-9 h-9 mb-3 inline-block"/>
                        <p className="leading-relaxed text-base">{location}</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <FaRegClock className="w-9 h-9 mb-3 inline-block"/>
                        <p className="leading-relaxed text-base">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
