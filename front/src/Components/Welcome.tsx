import React, {FC} from 'react';
import InstallNow from "./InstallNow";
import InfoCard from "./InfoCard";

type WelcomeProps = {
    metamaskInstalled?: boolean;
}
const Welcome: FC<WelcomeProps> = ({ metamaskInstalled }) => {
    return (
        <section className="text-black body-font">
            <div className="py-24">
                <div className="text-center mb-20">
                    <h1 className="sm:text-6xl text-4xl font-helveticaBlack title-font mb-4 font-black">Welcome to NFT page</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black title-font font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae delectus error itaque mollitia nam, officia perferendis quo sapiente unde.</p>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 bg-orange inline-flex"/>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <InfoCard
                        title={'Mobile phone'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda at ducimus enim excepturi expedita officiis quas velit!'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </InfoCard>
                    <InfoCard
                        title={'QR Code'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda at ducimus enim excepturi expedita officiis quas velit!'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                            <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                        </svg>
                    </InfoCard>
                    <InfoCard
                        title={'Ticket'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda at ducimus enim excepturi expedita officiis quas velit!'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </InfoCard>
                </div>

                {/*{!metamaskInstalled && <InstallNow/>}*/}
            </div>
        </section>
    );
};

export default Welcome;
