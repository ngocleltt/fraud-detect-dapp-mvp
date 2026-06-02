const vi = {
  nav: {
    overview: "Tổng quan Dashboard",
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
      "Sử dụng thanh điều hướng bên trái để kiểm tra bản ghi, chạy kiểm toán và mô phỏng hồ sơ giao dịch đầu vào.",
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
    systemReady: "SYS // ChainEye Forensics Engine đã khởi tạo thành công.",
    ipfsReady: "IPFS // Kết nối đã được xác minh. Bộ đệm CID đã được nạp.",
    modelReady: "AI // Trọng số mô hình XGBoost đã sẵn sàng.",
    fetchedRecords: (count: number) =>
      `REST // Đã lấy ${count} bản ghi ví từ bộ lưu trữ máy chủ.`,
    fetchFailed: (status: number) =>
      `ERR // Không thể tải dataset. Trạng thái ${status}.`,
    backendTimeout: "ERR // Kết nối tới node backend bị hết thời gian chờ.",
    walletConnected: "WALLET // Đã kết nối qua chữ ký tài khoản MetaMask.",
    walletDisconnected: "WALLET // Phiên đã bị ngắt bởi xác thực người dùng.",
    auditSearching: (id: string) =>
      `AUDIT // Đang liên hệ registry cho node: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Đã tìm thấy tài khoản: ${userId}, trạng thái ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Tra cứu registry thất bại cho node: [${id}]`,
    auditBroken: "ERR // Luồng truy xuất registry bị lỗi.",
    simApproved: (classification: string) =>
      `SIM // Mục mạng đã được chấp thuận. Nhãn: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Mô phỏng thất bại với trạng thái ${status}.`,
    simBroken: "ERR // Luồng truyền mô phỏng đã bị sập.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Dung lượng dataset",
      datasetVolumeDesc: "Các bản ghi ví đã được đánh giá",
      suspiciousRateLabel: "Tỷ lệ đáng ngờ",
      suspiciousRateDesc: "Bị gắn cờ trong dataset hiện tại",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerTitle: "IPFS + CID Registry",
      storageLayerDesc: "Tham chiếu lưu trữ forensic được neo",
    },

    batch: {
      label: "Tổng quan batch",
      title: "Dataset ví đã được đánh giá trước",
    },

    filters: {
      all: "TẤT CẢ",
      safe: "AN TOÀN",
      suspicious: "ĐÁNG NGỜ",
    },

    table: {
      userId: "User ID",
      totalErc20Tx: "Tổng ERC20 Tx",
      uniqContract: "Contract duy nhất",
      uniqToken: "Token duy nhất",
      uniqRecAddr: "Địa chỉ nhận duy nhất",
      timeDiff: "Độ lệch thời gian",
      ethReceived: "ETH nhận",
      avgMinPerRec: "TB phút / lần nhận",
      avgVal: "Giá trị TB",
      totalTx: "Tổng Tx",
      uniqFrom: "Nguồn duy nhất",
      risk: "Rủi ro",
      status: "Trạng thái",
    },

    telemetry: "Telemetry forensic trực tiếp",
  },

  audit: {
    hero: {
      badge: "Kiểm tra tài khoản",
      title: "Kiểm tra một ví hoặc bản ghi người dùng riêng lẻ",
      description:
        "Tìm kiếm theo user ID nội bộ hoặc địa chỉ ví để kiểm tra kết quả mô hình, điểm rủi ro và toàn bộ bộ đặc trưng forensic được dùng trong quá trình đánh giá.",
    },

    summary: {
      lookupModeLabel: "Chế độ tra cứu",
      lookupModeValue: "User ID / Wallet",
      outputLabel: "Đầu ra",
      outputValue: "Rủi ro + Đặc trưng",
      statusLabel: "Trạng thái",
      statusValue: "Truy vấn thời gian thực",
    },

    search: {
      placeholder:
        "Nhập User ID hoặc địa chỉ ví (ví dụ: USR-0001 hoặc 0x...)",
      button: "Kiểm tra tài khoản",
    },

    states: {
      loading: "Đang kiểm tra tài khoản, vui lòng chờ...",
      notFoundLabel: "Không tìm thấy bản ghi",
      notFoundDescription:
        "Không tìm thấy danh tính trong registry dataset đã được đánh giá trước. Hãy thử user ID hoặc địa chỉ ví khác.",
    },

    result: {
      label: "Kết quả kiểm tra",
      title: "Tóm tắt danh tính",
      userId: "User ID",
      riskScore: "Điểm rủi ro",
      walletAddress: "Địa chỉ ví",
      interpretationLabel: "Diễn giải",
      suspiciousInterpretation:
        "Danh tính này cho thấy hồ sơ rủi ro đáng ngờ dựa trên các đặc trưng giao dịch đã trích xuất.",
      safeInterpretation:
        "Danh tính này hiện đang nằm trong vùng an toàn dựa trên mẫu giao dịch đã được đánh giá.",
    },

    featureMap: {
      label: "Bản đồ đặc trưng forensic",
      title: "Các chỉ số đã được đánh giá",
      featureCount: "10 đặc trưng",
      table: {
        feature: "Đặc trưng",
        value: "Giá trị",
      },
    },

    features: {
      totalErc20Tx: "Tổng giao dịch ERC20",
      uniqRecContractAddr: "Địa chỉ contract nhận ERC20 duy nhất",
      uniqRecTokenName: "Tên token nhận ERC20 duy nhất",
      uniqRecAddr: "Địa chỉ nhận ERC20 duy nhất",
      timeDiff: "Độ lệch thời gian giữa lần đầu và lần cuối (phút)",
      totalEtherReceived: "Tổng ether đã nhận",
      avgMinBetweenReceived: "TB phút giữa các lần nhận",
      avgValReceived: "Giá trị nhận trung bình",
      totalTransactions:
        "Tổng số giao dịch (bao gồm cả giao dịch tạo contract)",
      uniqueReceivedFromAddresses: "Số địa chỉ gửi đến duy nhất",
    },
  },

  simulate: {
    hero: {
      badge: "Mô phỏng trực tiếp",
      title: "Mô phỏng hồ sơ giao dịch ví mới",
      description:
        "Gửi một danh tính mới cùng bộ đặc trưng giao dịch để chạy đánh giá gian lận thời gian thực thông qua pipeline mô hình.",
    },

    summary: {
      inputModeLabel: "Chế độ nhập",
      inputModeValue: "Đặc trưng thủ công",
      engineLabel: "Công cụ",
      engineValue: "Chấm điểm thời gian thực",
      resultLabel: "Kết quả",
      resultValue: "Nhãn rủi ro",
    },

    groupLabel: "Nhóm đầu vào",

    groups: {
      identity: "Danh tính",
      erc20Activity: "Hoạt động ERC20",
      valueTiming: "Giá trị & Thời gian",
      structuralSignals: "Tín hiệu cấu trúc",
    },

    fields: {
      userId: "User ID",
      walletAddress: "Địa chỉ ví",
      totalErc20Tx: "Tổng ERC20 Tx",
      uniqueContract: "Contract duy nhất",
      uniqueToken: "Token duy nhất",
      uniqueReceiverAddress: "Địa chỉ nhận duy nhất",
      timeDiffMins: "Độ lệch thời gian (phút)",
      ethReceived: "ETH nhận",
      avgMinBetweenReceived: "TB phút giữa các lần nhận",
      avgValueReceived: "Giá trị nhận trung bình",
      totalTxInclCreate: "Tổng Tx (bao gồm tạo contract)",
      uniqueFromAddresses: "Địa chỉ nguồn duy nhất",
    },

    placeholders: {
      userId: "ví dụ: USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Tóm tắt gửi dữ liệu",
      title: "Xem trước payload hiện tại",
      userId: "User ID",
      walletAddress: "Địa chỉ ví",
      featureCount: "Số lượng đặc trưng",
      featureCountValue: "10 chỉ số",
      notProvided: "Chưa cung cấp",
      walletFallback: "0x...",
    },

    note: {
      label: "Ghi chú gửi dữ liệu",
      description:
        "Biểu mẫu này gửi bộ đặc trưng được nhập thủ công để chấm điểm ngay qua luồng mô phỏng hiện có.",
    },

    submitButton: "Đẩy luồng giao dịch",
  },

  howItWorks: {
    hero: {
      badge: "Pipeline phát hiện",
      title: "ChainEye xử lý hoạt động ví đáng ngờ như thế nào",
      description:
        "ChainEye kết hợp việc gửi dữ liệu từ phía client, phân tích AI off-chain và neo CID on-chain thành một quy trình phát hiện gian lận được xây dựng cho việc theo dõi forensic minh bạch.",
    },

    summary: {
      featuresLabel: "Đặc trưng",
      featuresValue: "10 đầu vào",
      aiEngineLabel: "AI Engine",
      aiEngineValue: "XGBoost",
      storageLabel: "Lưu trữ",
      storageValue: "IPFS + CID",
    },

    flow: {
      label: "Các giai đoạn xử lý",
      title: "Luồng phát hiện",
      input: "Đầu vào",
      score: "Điểm",
      anchor: "Neo",
    },

    steps: {
      stepPrefix: "BƯỚC",
      step1Title: "Nhập đặc trưng giao dịch",
      step1Description:
        "Hệ thống thu thập 10 chỉ số cấp giao dịch, bao gồm hoạt động ERC20, mẫu tương tác ví, giá trị nhận được và hành vi thời gian.",
      step2Title: "Chấm điểm rủi ro AI off-chain",
      step2Description:
        "Dịch vụ FastAPI biến đổi payload đầu vào và chạy mô hình XGBoost để phân loại từng ví là AN TOÀN hoặc ĐÁNG NGỜ theo thời gian thực.",
      step3Title: "IPFS + Contract Registry",
      step3Description:
        "Các bản ghi dataset được cập nhật sẽ được lưu trên IPFS, trong khi CID mới nhất được neo on-chain để mọi tham chiếu lưu trữ luôn minh bạch và có thể xác minh.",
    },

    pipeline: {
      label: "Pipeline hệ thống",
      title: "Tóm tắt thực thi",
      frontendLabel: "Frontend",
      frontendDesc:
        "Dữ liệu ví và các đặc trưng giao dịch được gửi từ dashboard phía client.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI đánh giá payload và trả về nhãn gian lận cùng với điểm rủi ro.",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerDesc:
        "Snapshot dataset mới nhất được tải lên IPFS và được tham chiếu on-chain bằng CID.",
    },

    whyItMatters: {
      label: "Vì sao điều này quan trọng",
      description:
        "Mô hình chạy off-chain để tăng tốc độ, trong khi việc đăng ký CID bổ sung một lớp blockchain có thể xác minh cho khả năng audit.",
    },

    indicators: {
      badge: "10 chỉ số mô hình",
      title: "Ý nghĩa của 10 chỉ số đầu vào",
      description:
        "Đây là các trường chính xác mà mô hình sử dụng. Bạn có thể dùng các ví dụ bên dưới khi kiểm thử thủ công biểu mẫu simulate.",
      tipTitle: "Ghi chú nhanh",
      tipDescription:
        "Các ví dụ bên dưới chỉ là giá trị mẫu. Chúng giúp người kiểm thử hiểu định dạng đầu vào mong đợi, không đảm bảo kết quả gian lận.",
      meaningLabel: "Ý nghĩa",
      exampleLabel: "Ví dụ nhập",
      items: {
        totalErc20: {
          meaning: "Tổng số giao dịch ERC20 liên quan tới ví.",
          example: "24",
        },
        uniqContract: {
          meaning:
            "Số lượng địa chỉ contract token khác nhau mà ví đã nhận từ đó.",
          example: "3",
        },
        uniqToken: {
          meaning: "Số lượng tên token khác nhau mà ví đã nhận.",
          example: "2",
        },
        uniqRecAddr: {
          meaning:
            "Số lượng địa chỉ gửi ERC20 khác nhau đã gửi token tới ví.",
          example: "8",
        },
        timeDiff: {
          meaning:
            "Khoảng thời gian tính bằng phút giữa giao dịch đầu tiên và giao dịch cuối cùng được quan sát.",
          example: "180",
        },
        totalEtherReceived: {
          meaning: "Tổng lượng ETH mà ví đã nhận.",
          example: "12.75",
        },
        avgMinBetweenReceived: {
          meaning:
            "Khoảng cách thời gian trung bình tính bằng phút giữa các giao dịch nhận vào.",
          example: "15.5",
        },
        avgValReceived: {
          meaning: "Giá trị trung bình của mỗi giao dịch nhận vào.",
          example: "0.42",
        },
        totalTransactions: {
          meaning:
            "Tổng số giao dịch, bao gồm cả giao dịch tạo contract nếu có.",
          example: "31",
        },
        uniqueReceivedFrom: {
          meaning:
            "Số lượng địa chỉ nguồn duy nhất đã từng gửi tài sản tới ví này.",
          example: "6",
        },
      },
    },

    testHints: {
      label: "Gợi ý kiểm thử",
      title: "Ví dụ định hướng để kiểm thử thủ công",
      description:
        "Nếu ai đó đang tự kiểm thử bản demo, hai mẫu này có thể giúp họ tạo ra các giá trị đầu vào thực tế hơn.",
      safeLikeTitle: "Mẫu giống an toàn",
      safeLikeDescription:
        "Hãy thử số lượng giao dịch vừa phải, số địa chỉ người gửi hạn chế và các giá trị trung bình tương đối ổn định. Trực giác: ít đột biến lớn, ít nguồn không liên quan hơn và khung hoạt động đều đặn hơn.",
      suspiciousLikeTitle: "Mẫu giống đáng ngờ",
      suspiciousLikeDescription:
        "Hãy thử mật độ giao dịch cao hơn, nhiều địa chỉ người gửi duy nhất hơn hoặc hoạt động bị phân mảnh bất thường. Trực giác: nhiều nguồn gửi vào, thời gian dồn nén và hành vi chuyển tiền không nhất quán.",
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
      "Kết nối ví định danh phi tập trung của bạn để bật các tính năng kiểm tra tài khoản và tương tác smart contract.",
    metamaskWallet: "Ví MetaMask",
    walletConnect: "WalletConnect",
    detected: "Đã phát hiện",
    unavailable: "Không khả dụng",
    cancel: "Hủy",
  },
} as const;

export default vi;