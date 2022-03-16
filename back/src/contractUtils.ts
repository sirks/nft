import {ethers} from "ethers";
import {BLOCKCHAIN_URL, CONTRACT_ADDRESS, PRIVATE_KEY} from "./config/config";

const ABI = [
    "function safeMint(address to, string memory uri) public",
    "function tokensOf(address owner) public view returns (uint256[] memory)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
]
const MINT_GAS_LIMIT = 100000

const provider = new ethers.providers.JsonRpcProvider(BLOCKCHAIN_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

export async function mint(to: string, uri: string): Promise<string> {
    return await contract.safeMint(to, uri, {gasLimit: MINT_GAS_LIMIT});
}

export default function recoverAddress(msg: string, signature: string): string {
    return ethers.utils.verifyMessage(msg, signature)
}

export async function tokensOf(address: string): Promise<string[]> {
    return (await contract.tokensOf(address)).map(t => t.toString());
}

export async function tokenURI(token: string): Promise<string> {
    return await contract.tokenURI(token);
}

export async function ownerOf(token: string): Promise<string> {
    return await contract.ownerOf(token);
}
