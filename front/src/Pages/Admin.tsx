import React, {FC, MouseEvent, useRef, useState} from 'react';
import {QrReader} from 'react-qr-reader';
import {entrance, verifyMessage} from "../utils";
import {AdminState, BaseProps, BaseRestResp, ERR, OK} from "../Types/types";
import {Link} from "react-router-dom";
import {OnResultFunction} from "react-qr-reader/src/types/index";
import {ENTRANCE_EVENT} from "../environment";

const Admin: FC<BaseProps> = ({}) => {
    const [state, setState] = useState<AdminState>({msg: "reading", success: false, stop: false});
    const stateRef = useRef<AdminState>(state);
    stateRef.current = state;

    const onRead: OnResultFunction = (result, error) => {
        if (!stateRef.current.stop && result) {
            setState({msg: "checking qr", success: false, stop: true});
            onQr(result.getText());
        }
    }

    const onQr = async (txt: string) => {
        const stop = true;
        const success = false;

        const content = txt.split("|");
        if (content.length !== 2) {
            setState({msg: `incorrect qr code: ${txt}`, success, stop});
            return;
        }
        const [tokenId, signature] = content;
        const verifyResp = verifyMessage(tokenId, signature)
        if (verifyResp.nok) {
            setState({msg: `could not verify: ${verifyResp.nok}`, success, stop});
            return;
        }
        const serverResp: BaseRestResp = await entrance(ENTRANCE_EVENT, tokenId, signature);
        let msg = "";
        if (serverResp.err) {
            switch (serverResp.err.code) {
                case ERR.INCORRECT_DATA:
                    msg = `could not verify: ${serverResp.err.msg}`;
                    break;
                case ERR.TOKEN_USED:
                    msg = "ticket used";
                    break;
                case ERR.NO_SUCH_TOKEN:
                    msg = "no such ticket";
                    break;
                case ERR.TOKEN_STOLEN:
                    msg = "not your ticket";
                    break;
                default:
                    //unknown error
                    msg = "thou shalt not pass";
            }
            setState({msg, success, stop});
            return;
        }
        if (!serverResp.data) {
            //unknown error
            setState({msg: "thou shalt not pass", success, stop});
            return
        }
        msg = serverResp.data.code === OK.NEW_VISIT ? "WEOLCOME" : "WELCOME BACK"
        setState({msg, success: true, stop});
    }

    const reset = (e: MouseEvent<HTMLDivElement>) => {
        setState({msg: "reading", success: false, stop: false});
    }

    return (
        <div>
            <Link to='/'>goto client</Link>
            {state.stop && <div>click on camera to reset</div>}
            <div onClick={reset}>
                <QrReader
                    constraints={{facingMode: 'environment', aspectRatio: 1, height: 300, width: 300}}
                    containerStyle={{height: 300, width: 300}}
                    onResult={onRead}
                />
            </div>
            {state.msg && <div color={"red"}>Error: {state.msg}</div>}
            {state.success && <div color={"green"}>This guy can pass</div>}
        </div>
    );
}

export default Admin;
