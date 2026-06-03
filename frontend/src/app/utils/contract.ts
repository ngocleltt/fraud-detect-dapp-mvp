import { ethers } from "ethers";
import contractArtifact from "../../abis/CidStorage.json";

const CONTRACT_ADDRESS = "0x08c3c58ac99d4b3D9bD58B08167a3A86A7C2e605";

export async function saveCID(cid: string): Promise<string> {
  console.log("saveCID called, cid:", cid);
  if (!window.ethereum) throw new Error("MetaMask not installed");

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("Signer address:", address);

    const balance = await provider.getBalance(address);
    console.log("Balance:", ethers.formatEther(balance), "ETH");

    const iface = new ethers.Interface(contractArtifact.abi);
    const data = iface.encodeFunctionData("setCid", [cid]);

    // Không set gasPrice, nonce, type - để MetaMask tự ước lượng
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      data: data,
      gasLimit: 300000,
    });
    console.log("Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("Confirmed in block:", receipt.blockNumber);
    return receipt.hash;
  } catch (error: any) {
    console.error("Error:", error);
    alert("Lỗi: " + error.message);
    throw error;
  }
}

export async function fetchCID(): Promise<string> {
  if (!window.ethereum) return "";
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, provider);
    return await contract.cid();
  } catch (error) {
    console.error("Fetch error:", error);
    return "";
  }
}