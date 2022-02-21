import React from 'react';

const InstallNow = () => {
    return (
        <div className="flex flex-wrap justify-center mt-14">
            <div className="p-4 lg:w-2/3 md:w-full">
                <div
                    className="flex border-2 rounded-lg border-red p-8 sm:flex-row flex-col">
                    <div
                        className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-red text-indigo-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-black text-2xl title-font font-medium mb-3">Ooops...</h2>
                        <p className="leading-relaxed text-base">It seems that you have not installed metamask on your device yet. Install and then try again.</p>
                        <a className="mt-3 text-black inline-flex items-center" href="https://metamask.app.link/dapp/" target="_blank">Install Now
                            <svg fill="none" stroke="currentColor" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 ml-2"
                                 viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallNow;
