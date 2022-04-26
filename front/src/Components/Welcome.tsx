import React, {FC} from 'react';
import {OPENSEA_ASSETS, OPENSEA_COLLECTION} from "../environment";
import LastMint from "./LastMint";
import {ipfs2https} from "../utils";

type WelcomeProps = {
    lastMintUrl: string,
    signature: string,
    setSignature: (value: string | ((prevVar: string) => string)) => void,
    resetSign: () => void,
    tokenId: string,
}

const Welcome: FC<WelcomeProps> = ({lastMintUrl, signature, setSignature, resetSign, tokenId}) => {

    return (
        <section className="text-black body-font">
            <div className="pt-5">
                <div className="text-center">
                    <h1 className="sm:text-3xl text-xl font-helveticaBlack title-font font-black text-center">
                        {lastMintUrl ? 'MY TECHCHILL 2022 NFT' : 'MINT MY TECHCHILL 2022 NFT'}
                    </h1>
                    {/*<p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black title-font font-medium mt-6">Here*/}
                    {/*    you can mint NFT ticket. After that generate QR code from it.</p>*/}
                    {!lastMintUrl && <>
                        <p className="leading-relaxed text-base">
                            Browse this collection in
                            <a
                                className="inline pl-2 sm:text-xl text-xl cursor-pointer text-blue"
                                href={OPENSEA_COLLECTION}
                                target="_blank">
                                OPENSEA
                            </a>
                        </p>
                        <img
                            title="Techchill 2022 gif"
                            alt="Techchill 2022 gif"
                            className="flex-shrink-0 w-[256px] h-[256px] object-cover object-center mx-auto mt-6 cursor-pointer"
                            src={'/techchill_nft_gif.gif'}
                            onClick={e => window.open(OPENSEA_COLLECTION, "_blank")}
                        />

                    </>
                    }
                    {lastMintUrl && <>
                        <p className="leading-relaxed text-base">
                            <p className="pr-2 inline">GREAT SUCCESS...</p>
                            {tokenId ? "See my NFT in" : "My NFT is minting. See collection in"}
                            <a
                                className="inline pl-2 sm:text-xl text-xl cursor-pointer text-blue"
                                href={tokenId ? OPENSEA_ASSETS + tokenId : OPENSEA_COLLECTION}
                                target="_blank"
                            >
                                OPENSEA
                            </a>
                        </p>
                        <LastMint signature={signature} resetSign={resetSign}
                                  url={ipfs2https(lastMintUrl)} name={'my techchill 2022 nft'} tokenId={tokenId}/>
                    </>
                    }
                    {/*{lastMintUrl &&*/}
                    {/*    <div*/}
                    {/*        className="pb-4 mt-6 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">*/}
                    {/*        <button*/}
                    {/*            className="flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase"*/}
                    {/*            onClick={e => signature ? resetSign() : setSignature(path)}*/}
                    {/*        >{signature ? 'Show NFT' : 'Generate QR'}*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*}*/}
                </div>
            </div>
        </section>
    );
};

export default Welcome;
