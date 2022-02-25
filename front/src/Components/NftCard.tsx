import React, {FC} from 'react';

type NftCardProps = {
    name: string;
    src: string;
    id?: string;
    handleSign?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => Promise<void>;
    minted?: boolean;
}

const NftCard: FC<NftCardProps> = ({name, src, id, handleSign, minted}) => {
    return (
        <div className={`p-4 ${!minted ? 'xl:w-1/2' : ''}`}>
            <div
                className="p-4 md:p-0 overflow-hidden border-2 border-orange h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                    title={name}
                    alt={name}
                    className="flex-shrink-0 w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={src}/>
                <div className="flex-grow sm:pl-8">
                    <h3 className="text-black mb-3">{name}</h3>
                    {handleSign && id &&
                        <button
                            className="flex mt-16 text-white bg-orange border-0 py-4 px-14 focus:outline-none hover:text-black text-lg font-machina uppercase"
                            onClick={e => handleSign(e, id)}
                        >Signature
                        </button>
                    }

                </div>
            </div>
        </div>
    );
};

export default NftCard;
