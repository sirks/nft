import React, {useState} from 'react';
import './App.css';
import {QrReader} from 'react-qr-reader';
import {verifyMessage} from "./utils";
import {BaseProps} from "./types";


function Admin(props: BaseProps) {
    const [error, setError] = useState<string>("");
    const [ok, setOk] = useState<boolean>(false);
    const onRead = async (txt: string) => {
        console.log(txt);
        const content = txt.split("|");
        if (content.length !== 2) {
            setError(`incorrect qr code: ${txt}`);
            return;
        }
        const [tokenId, signature] = content;
        const verifyResp = verifyMessage(tokenId, signature)
        if (verifyResp.nok) {
            setError(`could not verify: ${verifyResp.nok}`);
            return;
        }
        const ownerAddress = await props.contract.ownerOf(tokenId);
        if (ownerAddress !== verifyResp.ok) {
            setError(`stolen ticket owner:${ownerAddress}, this guy: ${verifyResp.ok}`);
            return;
        }
        setError("");
        setOk(true);
    }

    return <div>
        <QrReader
            constraints={{aspectRatio:1, height: 500, width:500}}
            containerStyle = {{height: 500, width:500}}
            onResult={(result, error) => {
                if (result) {
                    onRead(result.getText());
                }
            }}
        />
        {error && <div>Error: {error}</div>}
        {ok && <div>This guy can pass</div>}
    </div>
        ;
}

export default Admin;
