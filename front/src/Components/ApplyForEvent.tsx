import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Alert from "./Alert";
import {register} from "../utils";
import {ERR} from "../Types/types";
import Event from "./Event";

type EventState = {
    name: string,
    location: string,
    time: string
}

type ApplyForEventProps = {
    ticketId: string,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const ApplyForEvent: FC<ApplyForEventProps> = ({isLoading, ticketId, setIsLoading}) => {
    const [applyInput, setApplyInput] = useState<string>('');
    const [err, setErr] = useState<string>("");
    const [event, setEvent] = useState<EventState | null>(null);

    const onRegister = async (code: string, ticket: string) => {
        try {
            if (code === '') {
                setErr('Code is not specified');
                return;
            }
            setIsLoading(true);
            const registerResult = await register(code, ticket);
            console.log('registerResult', registerResult);
            if (registerResult.err) {
                let msg = "";
                switch (registerResult.err.code) {
                    case ERR.INCORRECT_DATA:
                        msg = "Incorect data";
                        break;
                    case ERR.TICKET_NOT_EXIST:
                        msg = "Ticket not exist";
                        break;
                    case ERR.CODE_NOT_EXIST:
                        msg = "Incorrect code";
                        break;
                    case ERR.CODE_USED:
                        msg = "Event fully booked";
                        break;
                    default:
                        //unknown error
                        msg = "Something went wrong";
                }
                setErr(msg);
                setIsLoading(false);
                setEvent(null);
                return;
            }
            setErr('');
            setIsLoading(false);
            setEvent({name: registerResult.data.event.name, location: registerResult.data.event.location, time: registerResult.data.event.time})
        } catch (e) {
            setErr('Something went wrong');
            setIsLoading(false);
        }
    }

    const reset = () => {
        setErr('');
    }

    return (
        <div className="pt-4 pb-4 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">Secret side event</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Type in event code and apply for afterparty. Dont forget to share the link with your friends.</p>
            </div>
            <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-center flex-col sm:flex-row">
                <div className="w-full sm:w-auto relative sm:mr-4 mb-3 sm:mb-0">
                    <input
                        value={applyInput}
                        onChange={e => setApplyInput(e.target.value)}
                        type="text"
                        placeholder="Code..."
                        className="w-full sm:w-auto bg-gray-100 bg-opacity-50 border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-orange focus:border-orange text-base outline-none text-black py-4 px-5 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button
                    className={`${isLoading ? 'cursor-not-allowed' : ''} flex w-full sm:w-auto text-white bg-orange border-0 justify-center py-4 px-12 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase`}
                    disabled={isLoading}
                    onClick={e => onRegister(applyInput, ticketId)}
                >Register
                </button>
            </div>
            {err &&
                <div className="mt-6 flex justify-center">
                    <Alert color={'red'} title={'Error'} description={err} setState={reset}/>
                </div>
            }
            {event && <Event name={event.name} location={event.location} time={event.time} />}
        </div>
    );
};

export default ApplyForEvent;
