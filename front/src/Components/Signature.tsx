import React, {FC} from 'react';

type SignatureProps = {
    signature: string;
    children:  React.ReactChild | React.ReactNode;
}

const Signature: FC<SignatureProps> = ({signature, children}) => {
    return (
        <section className="text-black body-font">
            <div className="px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="text-4xl font-medium title-font mb-4 text-black tracking-widest">Ticket</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Show this QR code to Admin.</p>
                </div>
            </div>
            <div className="flex justify-center align-center m-9">
                {signature && children}
            </div>
        </section>
    );
};

export default Signature;
