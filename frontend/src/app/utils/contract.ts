import { ethers } from "ethers";
import contractArtifact from "../../abis/CidStorage.json";

// Địa chỉ contract sau khi deploy (giữ nguyên)
const CONTRACT_ADDRESS = "0x57461dDd08f2df00c4c8E547e71f0aCDc2C91b5D";

// Lấy contract instance (có hoặc không signer)
export async function getContract(withSigner: boolean = false): Promise<ethers.Contract> {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  if (withSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
  }
  return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, provider);
}

// Ghi CID lên blockchain (chỉ cần một tham số)
export async function saveCID(cid: string): Promise<string> {
  console.log("saveCID called, cid:", cid);
  const contract = await getContract(true);
  const tx = await contract.setCid(cid, { 
    gasLimit: 1000000,  
    gasPrice: 20000000000 
  });
  console.log("Transaction hash:", tx.hash);
  const receipt = await tx.wait();
  console.log("Confirmed in block:", receipt.blockNumber);
  return receipt.hash;
}

// Đọc CID hiện tại (string public cid)
export async function fetchCID(): Promise<string> {
  try {
    const contract = await getContract(false);
    return await contract.cid();
  } catch (error) {
    console.error("fetchCID error:", error);
    return "";
  }
}

// Đọc số lần đã gọi setCid (count)
export async function getCount(): Promise<number> {
  try {
    const contract = await getContract(false);
    const count = await contract.count();
    return Number(count);
  } catch (error) {
    console.error("getCount error:", error);
    return 0;
  }
}

// (Tuỳ chọn) Gọi getCid() - giống fetchCID nhưng dùng hàm view riêng
export async function getCid(): Promise<string> {
  try {
    const contract = await getContract(false);
    return await contract.getCid();
  } catch (error) {
    console.error("getCid error:", error);
    return "";
  }
}