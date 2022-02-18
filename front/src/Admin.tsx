import React, {MouseEvent, useRef, useState} from 'react';
import './App.css';
import {QrReader} from 'react-qr-reader';
import {verifyMessage} from "./utils";
import {BaseProps} from "./types";
import {Link} from "react-router-dom";
import {OnResultFunction} from "react-qr-reader/src/types/index";

type AdminState = {
    msg: string,
    success: boolean,
    stop: boolean,
}


const Admin = (props: BaseProps) => {
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
        const content = txt.split("|");
        if (content.length !== 2) {
            setState({msg: `incorrect qr code: ${txt}`, success: false, stop});
            return;
        }
        const [tokenId, signature] = content;
        const verifyResp = verifyMessage(tokenId, signature)
        if (verifyResp.nok) {
            setState({msg: `could not verify: ${verifyResp.nok}`, success: false, stop});
            return;
        }
        const ownerAddress = await props.contract.ownerOf(tokenId);
        if (ownerAddress !== verifyResp.ok) {
            setState({msg: `stolen ticket owner:${ownerAddress}, this guy: ${verifyResp.ok}`, success: false, stop});
            return;
        }
        setState({msg: "", success: true, stop});
    }

    const reset = (e: MouseEvent<HTMLDivElement>) => {
        setState({msg: "reading", success: false, stop: false});
    }

    return <div>
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
        ;
}

export default Admin;
