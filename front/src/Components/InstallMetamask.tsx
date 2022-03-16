import React, {FC} from 'react';

type InstallMetamaskProps = {
    url: string;
}
const InstallMetamask: FC<InstallMetamaskProps> = ({url}) => {
    return (
        <div className="mt-6 pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <button
                className="flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-xl sm:text-3xl font-black uppercase"
                onClick={e => window.open(url, "_blank")}
            >Install Metamask
            </button>
        </div>
    );
};

export default InstallMetamask;
