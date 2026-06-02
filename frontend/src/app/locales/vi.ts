import en from "./en";
const vi = {
  nav: {
    overview: "Tổng quan bảng điều khiển",
    audit: "Kiểm tra tài khoản",
    simulate: "Mô phỏng giao dịch",
    howItWorks: "Cách hoạt động",
    navigation: "ĐIỀU HƯỚNG",
  },

  session: {
    title: "Phiên",
    walletLinked: "Ví đã kết nối",
    walletOffline: "Ví ngoại tuyến",
    description:
      "Dùng thanh điều hướng bên trái để xem bản ghi, chạy kiểm tra và mô phỏng các hồ sơ giao dịch đến.",
  },

  language: {
    label: "Ngôn ngữ",
    en: "English",
    vi: "Tiếng Việt",
    ru: "Русский",
  },

  common: {
    safe: "An toàn",
    suspicious: "Đáng ngờ",
  },

  logs: {
    systemReady: "SYS // Công cụ pháp chứng ChainEye đã khởi tạo thành công.",
    ipfsReady: "IPFS // Kết nối đã được xác minh. Bộ đệm bản ghi CID đã tải.",
    modelReady: "AI // Trọng số mô hình XGBoost đã trực tuyến.",
    fetchedRecords: (count: number) =>
      `REST // Đã tải ${count} bản ghi ví từ bộ nhớ máy chủ.`,
    fetchFailed: (status: number) =>
      `ERR // Không thể tải tập dữ liệu. Mã trạng thái ${status}.`,
    backendTimeout: "ERR // Hết thời gian kết nối tới nút backend.",
    walletConnected: "WALLET // Đã kết nối qua chữ ký tài khoản MetaMask.",
    walletDisconnected: "WALLET // Phiên đã bị ngắt bởi người dùng.",
    auditSearching: (id: string) =>
      `AUDIT // Đang liên hệ sổ đăng ký cho nút: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Đã tìm thấy tài khoản: ${userId}, trạng thái ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Tra cứu sổ đăng ký thất bại cho nút: [${id}]`,
    auditBroken: "ERR // Luồng truy xuất sổ đăng ký bị gián đoạn.",
    simApproved: (classification: string) =>
      `SIM // Mục mạng đã được chấp nhận. Nhãn: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Mô phỏng thất bại với mã trạng thái ${status}.`,
    simBroken: "ERR // Luồng truyền mô phỏng bị gián đoạn.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Quy mô dữ liệu",
      datasetVolumeDesc: "Số bản ghi ví đã đánh giá",
      suspiciousRateLabel: "Tỷ lệ đáng ngờ",
      suspiciousRateDesc: "Đã bị gắn cờ trong tập dữ liệu hiện tại",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerTitle: "IPFS + Sổ đăng ký CID",
      storageLayerDesc: "Tham chiếu lưu trữ pháp chứng đã được neo",
    },

    batch: {
      label: "Tổng quan lô",
      title: "Tập dữ liệu ví đã đánh giá trước",
    },

    filters: {
      all: "TẤT CẢ",
      safe: "AN TOÀN",
      suspicious: "ĐÁNG NGỜ",
    },

    table: {
      userId: "Mã người dùng",
      totalErc20Tx: "Tổng giao dịch ERC20",
      uniqContract: "Hợp đồng duy nhất",
      uniqToken: "Token duy nhất",
      uniqRecAddr: "Địa chỉ nhận duy nhất",
      timeDiff: "Chênh lệch thời gian",
      ethReceived: "ETH nhận được",
      avgMinPerRec: "TB phút / lần nhận",
      avgVal: "Giá trị TB",
      totalTx: "Tổng giao dịch",
      uniqFrom: "Nguồn gửi duy nhất",
      risk: "Rủi ro",
      status: "Trạng thái",
    },

    telemetry: "Dữ liệu pháp chứng trực tiếp",
  },

  audit: {
    hero: {
      badge: "Kiểm tra tài khoản",
      title: "Kiểm tra một ví hoặc bản ghi người dùng riêng lẻ",
      description:
        "Tìm theo mã người dùng nội bộ hoặc địa chỉ ví để xem kết quả mô hình, điểm rủi ro và toàn bộ bộ đặc trưng pháp chứng dùng trong quá trình đánh giá.",
    },

    summary: {
      lookupModeLabel: "Chế độ tra cứu",
      lookupModeValue: "Mã người dùng / Ví",
      outputLabel: "Đầu ra",
      outputValue: "Rủi ro + Đặc trưng",
      statusLabel: "Trạng thái",
      statusValue: "Truy vấn thời gian thực",
    },

    search: {
      placeholder:
        "Nhập Mã người dùng hoặc Địa chỉ ví (ví dụ: USR-0001 hoặc 0x...)",
      button: "Kiểm tra tài khoản",
    },

    states: {
      loading: "Đang kiểm tra tài khoản, vui lòng chờ...",
      notFoundLabel: "Không tìm thấy bản ghi",
      notFoundDescription:
        "Không tìm thấy danh tính trong sổ đăng ký tập dữ liệu đã đánh giá trước. Hãy thử mã người dùng hoặc địa chỉ ví khác.",
    },

    result: {
      label: "Kết quả kiểm tra",
      title: "Tóm tắt danh tính",
      userId: "Mã người dùng",
      riskScore: "Điểm rủi ro",
      walletAddress: "Địa chỉ ví",
      interpretationLabel: "Diễn giải",
      suspiciousInterpretation:
        "Danh tính này cho thấy hồ sơ rủi ro đáng ngờ dựa trên các đặc trưng giao dịch đã trích xuất.",
      safeInterpretation:
        "Danh tính này hiện nằm trong vùng an toàn dựa trên mẫu giao dịch đã được đánh giá.",
    },

    featureMap: {
      label: "Bản đồ đặc trưng pháp chứng",
      title: "Các chỉ báo đã đánh giá",
      featureCount: "10 đặc trưng",
      table: {
        feature: "Đặc trưng",
        value: "Giá trị",
      },
    },

    features: {
      totalErc20Tx: "Tổng ERC20 tnxs",
      uniqRecContractAddr: "Địa chỉ hợp đồng nhận ERC20 duy nhất",
      uniqRecTokenName: "Tên token nhận ERC20 duy nhất",
      uniqRecAddr: "Địa chỉ nhận ERC20 duy nhất",
      timeDiff: "Chênh lệch giữa giao dịch đầu và cuối (phút)",
      totalEtherReceived: "Tổng ether nhận được",
      avgMinBetweenReceived: "Số phút trung bình giữa các lần nhận",
      avgValReceived: "Giá trị nhận trung bình",
      totalTransactions: "Tổng giao dịch (bao gồm giao dịch tạo hợp đồng)",
      uniqueReceivedFromAddresses: "Số địa chỉ gửi đến duy nhất",
    },
  },

  simulate: {
    hero: {
      badge: "Mô phỏng trực tiếp",
      title: "Mô phỏng một hồ sơ giao dịch ví mới",
      description:
        "Gửi một danh tính mới cùng bộ đặc trưng giao dịch để chạy đánh giá gian lận thời gian thực qua pipeline mô hình.",
    },

    summary: {
      inputModeLabel: "Chế độ nhập",
      inputModeValue: "Đặc trưng thủ công",
      engineLabel: "Bộ máy",
      engineValue: "Chấm điểm thời gian thực",
      resultLabel: "Kết quả",
      resultValue: "Nhãn rủi ro",
    },

    groupLabel: "Nhóm dữ liệu nhập",

    groups: {
      identity: "Danh tính",
      erc20Activity: "Hoạt động ERC20",
      valueTiming: "Giá trị & thời gian",
      structuralSignals: "Tín hiệu cấu trúc",
    },

    fields: {
      userId: "Mã người dùng",
      walletAddress: "Địa chỉ ví",
      totalErc20Tx: "Tổng giao dịch ERC20",
      uniqueContract: "Hợp đồng duy nhất",
      uniqueToken: "Token duy nhất",
      uniqueReceiverAddress: "Địa chỉ nhận duy nhất",
      timeDiffMins: "Chênh lệch thời gian (phút)",
      ethReceived: "ETH nhận được",
      avgMinBetweenReceived: "TB phút giữa các lần nhận",
      avgValueReceived: "Giá trị nhận trung bình",
      totalTxInclCreate: "Tổng giao dịch (gồm tạo hợp đồng)",
      uniqueFromAddresses: "Địa chỉ gửi đến duy nhất",
    },

    placeholders: {
      userId: "ví dụ: USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Tóm tắt gửi dữ liệu",
      title: "Xem trước payload hiện tại",
      userId: "Mã người dùng",
      walletAddress: "Địa chỉ ví",
      featureCount: "Số lượng đặc trưng",
      featureCountValue: "10 chỉ báo",
      notProvided: "Chưa cung cấp",
      walletFallback: "0x...",
    },

    note: {
      label: "Ghi chú gửi dữ liệu",
      description:
        "Biểu mẫu này gửi bộ đặc trưng được nhập thủ công để chấm điểm ngay trong luồng mô phỏng hiện tại.",
    },

    submitButton: "Đẩy luồng giao dịch",
  },

  howItWorks: {
    hero: {
      badge: "Pipeline phát hiện",
      title: "Cách ChainEye xử lý hoạt động ví đáng ngờ",
      description:
        "ChainEye kết hợp việc gửi dữ liệu từ phía client, phân tích AI off-chain và neo CID on-chain thành một quy trình phát hiện gian lận minh bạch cho mục đích pháp chứng.",
    },

    summary: {
      featuresLabel: "Đặc trưng",
      featuresValue: "10 đầu vào",
      aiEngineLabel: "Bộ máy AI",
      aiEngineValue: "XGBoost",
      storageLabel: "Lưu trữ",
      storageValue: "IPFS + CID",
    },

    flow: {
      label: "Các giai đoạn xử lý",
      title: "Luồng phát hiện",
      input: "Đầu vào",
      score: "Chấm điểm",
      anchor: "Neo dữ liệu",
    },

    steps: {
      stepPrefix: "BƯỚC",
      step1Title: "Nhập đặc trưng giao dịch",
      step1Description:
        "Hệ thống thu thập 10 chỉ báo ở mức giao dịch, bao gồm hoạt động ERC20, mẫu tương tác ví, giá trị nhận được và hành vi thời gian.",
      step2Title: "Chấm điểm rủi ro AI off-chain",
      step2Description:
        "Dịch vụ FastAPI biến đổi payload đầu vào và chạy mô hình XGBoost để phân loại mỗi ví thành AN TOÀN hoặc ĐÁNG NGỜ theo thời gian thực.",
      step3Title: "IPFS + Sổ đăng ký hợp đồng",
      step3Description:
        "Các bản ghi tập dữ liệu cập nhật được lưu trên IPFS, trong khi CID mới nhất được neo on-chain để mọi tham chiếu lưu trữ đều minh bạch và có thể xác minh.",
    },

    pipeline: {
      label: "Pipeline hệ thống",
      title: "Tóm tắt thực thi",
      frontendLabel: "Frontend",
      frontendDesc:
        "Dữ liệu ví và các đặc trưng giao dịch được gửi từ bảng điều khiển phía client.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI đánh giá payload và trả về nhãn gian lận cùng điểm rủi ro.",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerDesc:
        "Ảnh chụp tập dữ liệu mới nhất được tải lên IPFS và được tham chiếu on-chain bằng CID.",
    },

    whyItMatters: {
      label: "Vì sao điều này quan trọng",
      description:
        "Mô hình chạy off-chain để tăng tốc độ, trong khi đăng ký CID bổ sung một lớp blockchain có thể xác minh cho khả năng kiểm toán.",
    },
  },
  header: {
    brandTitle: "CHAINEYE FORENSICS",
    brandSubtitle: "CÔNG CỤ PHÁT HIỆN BẤT THƯỜNG ON-CHAIN",
    networkLabel: "Mạng",
    networkValue: "Ganache Localnet",
    aiModelLabel: "Mô hình AI",
    aiModelValue: "XGBoost",
    languageSwitcherAriaLabel: "Đổi ngôn ngữ",
    connectWallet: "Kết nối ví",
    disconnectWallet: "Ngắt kết nối ví",
    web3Access: "Truy cập Web3",
    selectWalletProvider: "Chọn nhà cung cấp ví",
    walletModalDescription:
      "Kết nối ví định danh phi tập trung của bạn để bật tính năng kiểm tra tài khoản và tương tác hợp đồng thông minh.",
    metamaskWallet: "Ví MetaMask",
    walletConnect: "WalletConnect",
    detected: "Đã phát hiện",
    unavailable: "Không khả dụng",
    cancel: "Hủy",
  },
} as const;

export default vi;