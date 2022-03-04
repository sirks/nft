import React from 'react';

const UnlockAccount = () => {
    return (
        <div className="flex flex-wrap justify-center my-5 sm:my-20">
            <div className="p-4 lg:w-2/3 md:w-full">
                <div
                    className="flex border-2 rounded-lg border-orange p-8 sm:flex-row flex-col items-center">
                    <div
                        className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-orange text-indigo-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                        </svg>
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="text-black text-lg sm:text-3xl font-medium mb-3">Need to unlock</h2>
                        <p className="leading-relaxed text-base">It seems that you have installed metamask on your device but you need to unlock it. Please, do it!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnlockAccount;
