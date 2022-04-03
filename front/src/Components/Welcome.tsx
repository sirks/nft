import React, {FC} from 'react';
import {OPENSEA_COLLECTION} from "../environment";
import LastMint from "./LastMint";
import {ipfs2https} from "../utils";
import {ethers} from "ethers";
import {useSearchParams} from "react-router-dom";

type WelcomeProps = {
    metamaskInstalled?: boolean,
    lastMintUrl: string,
    provider: ethers.providers.Web3Provider | null,
    signature: string,
    setSignature: (value: string | ((prevVar: string) => string)) => void,
    resetSign: () => void,
    tokenId: string,
}

const Welcome: FC<WelcomeProps> = ({metamaskInstalled, lastMintUrl, provider, signature, setSignature, resetSign, tokenId}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const path = searchParams.get("code");

    return (
        <section className="text-black body-font">
            <div className="pt-5 lg:pt-12">
                <div className="text-center">
                    {/*<h1 className="sm:text-6xl text-3xl font-helveticaBlack title-font font-black">*/}
                    {/*    {lastMintUrl ? 'YOUR TECHCHILL NFT' : 'MINT YOUR TECHCHILL NFT'}*/}
                    {/*</h1>*/}
                    {/*<p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-black title-font font-medium mt-6">Here*/}
                    {/*    you can mint NFT ticket. After that generate QR code from it.</p>*/}
                    {!lastMintUrl &&
                    <img
                        title="Techchill arts gif"
                        alt="Techchill arts gif"
                        className="flex-shrink-0 w-[256px] h-[256px] object-cover object-center mx-auto mt-6 cursor-pointer"
                        src={'/techchill_nft_gif.gif'}
                        onClick={e => window.open(OPENSEA_COLLECTION, "_blank")}
                    />
                    }
                    {lastMintUrl && provider &&
                    <LastMint signature={signature} resetSign={resetSign} provider={provider}
                              url={ipfs2https(lastMintUrl)} name={'Your NFT is on its way'} tokenId={tokenId}/>
                    }
                    {lastMintUrl &&
                    <div
                        className="pb-4 mt-6 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
                        <button
                            className="flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase"
                            onClick={e => signature ? resetSign() : setSignature(path || '')}
                        >{signature ? 'Show NFT' : 'Generate QR'}
                        </button>
                    </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Welcome;
