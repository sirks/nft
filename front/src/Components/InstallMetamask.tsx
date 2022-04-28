import React, {Dispatch, FC, SetStateAction} from 'react';
import MetamaskIcon from "../Assets/MetamaskIcon";


type InstallMetamaskProps = {
    url: string;
    ticketInput: string;
    setIsLoading: Dispatch<SetStateAction<boolean>>
}
const InstallMetamask: FC<InstallMetamaskProps> = ({url, ticketInput, setIsLoading}) => {
    window.onfocus = () => {
        setIsLoading(true)
        setTimeout(() => {
            window.location.reload();
            setIsLoading(false);
        }, 4000);
    }
    return (

        <div
            className="mt-6 pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <button
                className="flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-10 focus:outline-none hover:text-black text-xl sm:text-3xl font-black uppercase"
                onClick={e => {
                    localStorage.setItem('ticketCode', ticketInput);
                    window.open(url, "_blank");
                }}
            >
                <MetamaskIcon/>
                Install Metamask
            </button>
        </div>
    );
};

export default InstallMetamask;
