import React, {Dispatch, FC, SetStateAction} from 'react';
import {BaseProps, MintState} from "../Types/types";

type TicketInputProps = {
    address: string,
    isLoading: boolean,
    onCheck: (code: string) => Promise<void>,
    mintState: MintState,
    ticketInput: string,
    setTicketInput: Dispatch<SetStateAction<string>>
} & BaseProps

const TicketInput: FC<TicketInputProps> = ({ isLoading, onCheck, ticketInput, setTicketInput}) => {

    // const codeRef = useRef<HTMLInputElement>(null);

    // const stateForBtn = mintState === MintState.IS_MINTING;

    // const text = mintState === MintState.IS_MINTING ? 'Checking...' : 'Check';

    return (
        <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-center flex-col sm:flex-row">
            <div className="w-full sm:w-auto relative sm:mr-4 mb-3 sm:mb-0">
                <input
                    value={ticketInput}
                    onChange={e => setTicketInput(e.target.value)}
                    type="password"
                    placeholder="ticket code..."
                    className="w-full sm:w-auto bg-gray-100 bg-opacity-50 border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-orange focus:border-orange text-base outline-none text-black py-4 px-5 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button
                className={`${isLoading ? 'cursor-not-allowed' : ''} flex w-full sm:w-auto text-white bg-orange border-0 justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase`}
                disabled={isLoading}
                onClick={e => onCheck(ticketInput)}
            >Check
            </button>
        </div>
    );
};

export default TicketInput;
