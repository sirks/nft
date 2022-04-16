import React, {FC, useRef} from 'react';
import {BaseProps, MintState} from "../Types/types";

type TicketInputProps = {
    address: string;
    isLoading: boolean,
    onCheck: (code: string) => Promise<void>,
    mintState: MintState
} & BaseProps

const TicketInput: FC<TicketInputProps> = ({ mintState, isLoading, onCheck}) => {

    const codeRef = useRef<HTMLInputElement>(null);

    // const stateForBtn = mintState === MintState.IS_MINTING;

    // const text = mintState === MintState.IS_MINTING ? 'Checking...' : 'Check';

    return (
        <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <div className="flex-1 relative w-full md:mr-4 mb-3 md:mb-0">
                <input
                    ref={codeRef}
                    type="text"
                    placeholder="Ticked ID..."
                    className="w-full bg-gray-100 bg-opacity-50 border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-orange focus:border-orange text-base outline-none text-black py-4 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button
                className={`${isLoading ? 'cursor-not-allowed' : ''} flex mx-auto text-white bg-orange border-0 w-full md:w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase`}
                disabled={isLoading}
                onClick={e => onCheck(codeRef?.current?.value || '')}
            >Check
            </button>
        </div>
    );
};

export default TicketInput;
