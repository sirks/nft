import React, {FC} from 'react';
import InstallNow from "./InstallNow";
import InfoCard from "./InfoCard";
import Info from "./Info";

type WelcomeProps = {
    metamaskInstalled?: boolean;
}
const Welcome: FC<WelcomeProps> = ({ metamaskInstalled }) => {
    return (
        <section className="text-black body-font">
            <div className="pt-5 sm:pt-24">
                <div className="text-center">
                    <h1 className="sm:text-6xl text-3xl font-helveticaBlack title-font mb-4 font-black">Welcome to NFT page</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black title-font font-medium">Here you can mint your NFT ticket. After that generate QR code from it.</p>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 bg-orange inline-flex"/>
                    </div>
                </div>
                {/*<Info />*/}

                {/*{!metamaskInstalled && <InstallNow/>}*/}
            </div>
        </section>
    );
};

export default Welcome;
