import React from 'react';
import InfoCard from "./InfoCard";
import { MdQrCodeScanner} from "react-icons/md";
import {FaTicketAlt, FaLink, FaQrcode, FaWallet} from "react-icons/fa";

const Info = () => {
    return (
        <div className="mt-6">
            <h1 className="sm:text-3xl text-xl font-helveticaBlack title-font font-black text-center">HOW IT WORKS</h1>
            <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 bg-orange inline-flex"/>
            </div>
            <div className="flex justify-center flex-wrap mt-6 md:space-y-0 space-y-6">
                <InfoCard
                    title={'Link'}
                    description={'Get your secret NFT link'}
                >
                    <FaLink />
                </InfoCard>
                <InfoCard
                    title={'Wallet'}
                    description={'Connect your metamask wallet'}
                >
                    <FaWallet />
                </InfoCard>
                <InfoCard
                    title={'Ticket'}
                    description={'Mint your Techchill 2022 NFT ticket'}
                >
                    <FaTicketAlt />
                </InfoCard>
                <InfoCard
                    title={'QR'}
                    description={'Generate QR code from your NFT'}
                >
                    <FaQrcode />
                </InfoCard>
                <InfoCard
                    title={'Show'}
                    description={'Show your QR code at entrance'}
                >
                    <MdQrCodeScanner />
                </InfoCard>
            </div>
        </div>
    );
};

export default Info;
