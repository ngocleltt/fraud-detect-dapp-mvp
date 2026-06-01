import { ethers } from "ethers";
import contractArtifact from "../../abis/CidStorage.json";

const CONTRACT_ADDRESS = "0x08c3c58ac99d4b3D9bD58B08167a3A86A7C2e605";

export async function saveCID(cid: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install MetaMask.");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = contractArtifact.abi;   // 👈 Lấy đúng mảng ABI
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    
    const tx = await contract.setCid(cid);
    const receipt = await tx.wait();
    
    console.log("CID saved to blockchain, transaction hash:", receipt?.hash);
    return receipt?.hash || "";
  } catch (error) {
    console.error("Error saving CID:", error);
    throw error;
  }
}

export async function fetchCID(): Promise<string> {
  if (!window.ethereum) return "";

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const abi = contractArtifact.abi;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    
    const cid = await contract.cid();
    return cid;
  } catch (error) {
    console.error("Error fetching CID:", error);
    return "";
  }
}