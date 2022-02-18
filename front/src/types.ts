import {ethers} from "ethers";
import {Contract} from "@ethersproject/contracts";

export type Resp = {
    ok: string,
    nok: any,
}

export type BaseProps = {
    contract: Contract,
    provider: ethers.providers.Web3Provider
}