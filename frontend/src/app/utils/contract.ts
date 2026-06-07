import { ethers } from "ethers";
import contractArtifact from "../../abis/CidStorage.json";

// Địa chỉ contract sau khi deploy (cập nhật đúng)
const CONTRACT_ADDRESS = "0xddc5519ba3dbdd1dde6801a31211c20321a18957"; 

export async function getContract(withSigner: boolean = false): Promise<ethers.Contract> {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  if (withSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, signer);
  }
  return new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, provider);
}

// Ghi CID lên blockchain (có lý do)
export async function saveCID(cid: string, reason: string = ""): Promise<string> {
  console.log("saveCID called, cid:", cid, "reason:", reason);
  const contract = await getContract(true);  // lấy contract có signer
  const tx = await contract.setCid(cid, reason, {
    gasLimit: 500000,
    maxFeePerGas: ethers.parseUnits("2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
  });
  console.log("Transaction hash:", tx.hash);
  const receipt = await tx.wait();
  console.log("Confirmed in block:", receipt.blockNumber);
  return receipt.hash;
}

// Đọc CID hiện tại
export async function fetchCID(): Promise<string> {
  try {
    const contract = await getContract(false);
    return await contract.cid();
  } catch (error) {
    console.error("fetchCID error:", error);
    return "";
  }
}

// Đọc số lần ghi (count)
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

// Lấy toàn bộ lịch sử (nếu cần)
export async function getHistory(): Promise<{cid: string, timestamp: number, modifiedBy: string, reason: string}[]> {
  try {
    const contract = await getContract(false);
    const raw = await contract.getAllHistory();
    return raw.map((item: any) => ({
      cid: item.cid,
      timestamp: Number(item.timestamp),
      modifiedBy: item.modifiedBy,
      reason: item.reason
    }));
  } catch (error) {
    console.error("getHistory error:", error);
    return [];
  }
}