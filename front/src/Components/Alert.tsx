import React, {FC} from 'react';

type AlertProps = {
    color: string;
    title: string;
    description: string;
}

const Alert: FC<AlertProps> = ({ color, title, description}) => {
    return (
        <div role="alert" className="pb-4">
            <div className={`${color === 'red' ? 'bg-red' : ''} ${color === 'green' ? 'bg-green' : ''} text-white font-bold  px-4 py-2`}>
                {title}
            </div>
            <div className={`border border-t-0 ${color === 'red' ? 'border-red' : ''} ${color === 'green' ? 'border-green' : ''} ${color === 'red' ? 'bg-redLight' : ''} ${color === 'green' ? 'bg-greenLight' : ''} px-4 py-3 text-black text-2xl`}>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Alert;
