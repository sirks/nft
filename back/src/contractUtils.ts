import {ethers} from "ethers";
import {BLOCKCHAIN_URL, CONTRACT_ADDRESS} from "../config";

export const ABI = [
    "function safeMint(address to, string memory uri) public onlyOwner",
]

const provider = new ethers.providers.JsonRpcProvider(BLOCKCHAIN_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

export async function mint(to:string) {

}
