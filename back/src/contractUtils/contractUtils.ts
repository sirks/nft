import {BigNumber, ethers} from "ethers";
import {BLOCKCHAIN_URL, CONTRACT_ADDRESS, PRIVATE_KEY} from "../config/config";

const ABI = [
    "function safeMint(address to, string memory uri) public",
    "function tokensOf(address owner) public view returns (uint256[] memory)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
]

const provider = new ethers.providers.JsonRpcProvider(BLOCKCHAIN_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

export async function mint(to: string, uri: string): Promise<string> {
    const gasPrice = BigNumber.from(await provider.perform("getGasPrice", {}));
    const baseFee = (await provider.getBlock("latest")).baseFeePerGas;
    const fees = {maxPriorityFeePerGas: gasPrice, maxFeePerGas: baseFee?.mul(2).add(gasPrice)}
    return await contract.safeMint(to, uri, fees);
    // return await contract.safeMint(to, uri);
}

export async function estimateMint(to: string, uri: string): Promise<number> {
    return (await contract.estimateGas.safeMint(to, uri)).toNumber();
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

export async function tokenIdBy(transactionHash: string): Promise<number | undefined> {
    const transaction = await provider.getTransactionReceipt(transactionHash);
    if (transaction && transaction.logs[0]) {
        return BigNumber.from(transaction.logs[0].topics[3]).toNumber();
    }
}