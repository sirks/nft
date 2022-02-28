import React, {FC, MouseEvent, useRef, useState} from 'react';
import {QrReader} from 'react-qr-reader';
import {entrance, verifyMessage} from "../utils";
import {BaseProps, BaseRestResp, ERR, OK} from "../Types/types";
import {Link} from "react-router-dom";
import {OnResultFunction} from "react-qr-reader/src/types/index";
import {ENTRANCE_EVENT} from "../environment";
import Alert from "../Components/Alert";

export type AdminState = {
    msg: string,
    success: boolean,
    stop: boolean,
}

const Admin: FC<BaseProps> = ({}) => {
    const [state, setState] = useState<AdminState>({msg: "Reading", success: false, stop: false});
    const [eventName, setEventName] = useState<string>('');
    const stateRef = useRef<AdminState>(state);
    stateRef.current = state;

    const onRead: OnResultFunction = (result, error) => {
        if (!stateRef.current.stop && result) {
            setState({msg: "Checking qr", success: false, stop: true});
            onQr(result.getText());
        }
    }

    const onQr = async (txt: string) => {
        const stop = true;
        const success = false;

        const content = txt.split("|");
        if (content.length !== 2) {
            setState({msg: `Incorrect qr code: ${txt}`, success, stop});
            return;
        }
        const [tokenId, signature] = content;
        const verifyResp = verifyMessage(tokenId, signature)
        if (verifyResp.nok) {
            setState({msg: `Could not verify: ${verifyResp.nok}`, success, stop});
            return;
        }
        const serverResp: BaseRestResp = await entrance(eventName, tokenId, signature);
        let msg = "";
        if (serverResp.err) {
            switch (serverResp.err.code) {
                case ERR.INCORRECT_DATA:
                    msg = `Could not verify: ${serverResp.err.msg}`;
                    break;
                case ERR.TOKEN_USED:
                    msg = "Ticket used";
                    break;
                case ERR.NO_SUCH_TOKEN:
                    msg = "No such ticket";
                    break;
                case ERR.TOKEN_STOLEN:
                    msg = "Not your ticket";
                    break;
                default:
                    //unknown error
                    msg = "Thou shalt not pass";
            }
            setState({msg, success, stop});
            return;
        }
        if (!serverResp.data) {
            //unknown error
            setState({msg: "Thou shalt not pass", success, stop});
            return
        }
        msg = serverResp.data.code === OK.NEW_VISIT ? "WELCOME" : "WELCOME BACK"
        setState({msg, success: true, stop});
    }

    const reset = (e: MouseEvent<HTMLDivElement>) => {
        setState({msg: "Reading", success: false, stop: false});
    }

    return (
        <div className="bg-orange min-h-screen flex flex-col justify-center items-center text-black text-4xl">
            {/*<Link to='/'>goto client</Link>*/}
            {state.stop &&
                <div className="flex items-center bg-blue text-white text-sm font-bold px-12 py-3 my-4" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
                    </svg>
                    <p>Click on camera to reset.</p>
                </div>
            }
            <div onClick={reset} className="pb-4">
                <QrReader
                    constraints={{facingMode: 'environment', aspectRatio: 1, height: 300, width: 300}}
                    containerStyle={{height: 300, width: 300}}
                    onResult={onRead}
                />
            </div>
            <div className="min-w-[300px] relative pb-4">
                <input
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                    type="text"
                    id="mint"
                    name="mint"
                    placeholder="Event name..."
                    className="w-full bg-gray-100 bg-opacity-50 border border-gray-300 text-base outline-none text-black py-4 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="min-w-[300px]">
                {state.msg && <Alert color={state.success ? 'green' : 'red'} title={state.success ? 'Success' : 'Error'} description={state.msg} />}
                {state.success && <Alert color={'green'} title={'Scanned'} description={'This guy can pass'} />}
            </div>
        </div>
    );
}

export default Admin;
