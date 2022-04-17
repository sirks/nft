import * as React from "react";
import {createContext, Dispatch, FC, SetStateAction, useState} from "react";

interface AppContextInterface {
    ticketId: string;
    setTicketId: Dispatch<SetStateAction<string>>;
}

export const TicketCtx = createContext<AppContextInterface>({
    ticketId: '',
    setTicketId: () => {}
});

const CtxProvider: FC = ({children}) => {
    const [ticketId, setTicketId] = useState('');
    return (
        <TicketCtx.Provider
            value={{
                ticketId,
                setTicketId,
            }}
        >
            {children}
        </TicketCtx.Provider>
    );
};

export default CtxProvider;
