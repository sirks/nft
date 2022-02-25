import React, {FC} from 'react';

type InfoCardProps = {
    title: string;
    description: string;
    children:  React.ReactChild | React.ReactNode;
}

const InfoCard: FC<InfoCardProps> = ({ title, description, children}) => {
    return (
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div
                className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-orange text-black mb-5 flex-shrink-0">
                {children}
            </div>
            <div className="flex-grow">
                <h2 className="font-helveticaBold title-font mb-4 font-bold text-black text-lg title-font mb-3">{title}</h2>
                <p className="leading-relaxed text-base">{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;
