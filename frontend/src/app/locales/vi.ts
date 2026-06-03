const vi = {
  nav: {
    overview: "Tổng quan bảng điều khiển",
    audit: "Kiểm tra tài khoản",
    simulate: "Mô phỏng giao dịch",
    howItWorks: "Cách hoạt động",
    navigation: "ĐIỀU HƯỚNG",
  },

  session: {
    title: "Phiên làm việc",
    walletLinked: "Đã kết nối ví",
    walletOffline: "Ví đang ngoại tuyến",
    description:
      "Dùng thanh điều hướng bên trái để xem bản ghi, chạy kiểm tra và mô phỏng hồ sơ giao dịch mới.",
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
    ipfsReady: "IPFS // Đã xác minh kết nối. Bộ đệm bản ghi CID đã sẵn sàng.",
    modelReady: "AI // Trọng số mô hình XGBoost đã hoạt động.",
    fetchedRecords: (count: number) =>
      `REST // Đã tải ${count} bản ghi ví từ bộ nhớ máy chủ.`,
    fetchFailed: (status: number) =>
      `ERR // Không thể tải tập dữ liệu. Mã trạng thái ${status}.`,
    backendTimeout: "ERR // Kết nối node backend bị hết thời gian chờ.",
    walletConnected: "WALLET // Đã kết nối qua chữ ký tài khoản MetaMask.",
    walletDisconnected: "WALLET // Phiên làm việc đã bị tách theo xác thực người dùng.",
    auditSearching: (id: string) =>
      `AUDIT // Đang liên hệ registry cho node: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Đã tìm thấy tài khoản: ${userId}, trạng thái ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Tra cứu registry thất bại cho node: [${id}]`,
    auditBroken: "ERR // Luồng truy xuất registry bị gián đoạn.",
    simApproved: (classification: string) =>
      `SIM // Mục nhập mạng đã được chấp nhận. Nhãn: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Mô phỏng thất bại với mã trạng thái ${status}.`,
    simBroken: "ERR // Truyền mô phỏng bị sụp.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Dung lượng dữ liệu",
      datasetVolumeDesc: "Các bản ghi ví đã được đánh giá",
      suspiciousRateLabel: "Tỷ lệ đáng ngờ",
      suspiciousRateDesc: "Số bản ghi bị gắn cờ trong toàn bộ tập dữ liệu",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerTitle: "IPFS + CID Registry",
      storageLayerDesc: "Tham chiếu lưu trữ pháp chứng đã được neo lại",
    },

    batch: {
      label: "Tổng quan batch",
      title: "Tập dữ liệu ví đã được đánh giá trước",
    },

    filters: {
      all: "TẤT CẢ",
      safe: "AN TOÀN",
      suspicious: "ĐÁNG NGỜ",
    },

    table: {
      userId: "User ID",
      totalErc20Tx: "ERC20 Tx tổng",
      uniqContract: "Contract duy nhất",
      uniqToken: "Token duy nhất",
      uniqRecAddr: "Địa chỉ nhận duy nhất",
      timeDiff: "Độ lệch thời gian",
      ethReceived: "ETH nhận",
      avgMinPerRec: "TB phút / lần nhận",
      avgVal: "Giá trị TB",
      totalTx: "Tổng giao dịch",
      uniqFrom: "Nguồn duy nhất",
      risk: "Rủi ro",
      status: "Trạng thái",
    },

    telemetry: "Telemetry pháp chứng trực tiếp",
  },

  riskModal: {
    panelLabel: "Bảng chi tiết rủi ro",
    close: "Đóng",
    walletAddress: "Địa chỉ ví",
    riskScore: "Điểm rủi ro",
    confidenceHint: "Mức độ tin cậy của phân loại mô hình",
    activityWindow: "Khoảng thời gian hoạt động",
    activityWindowDesc: "Số phút giữa giao dịch đầu tiên và cuối cùng được quan sát",
    totalEthReceived: "Tổng ETH nhận được",
    totalEthReceivedDesc: "Tổng giá trị ETH đi vào ví",
    featureMap: "Bản đồ đặc trưng",
    featureMapTitle: "Các chỉ số giao dịch được đánh giá",
    signalSummary: "Tóm tắt tín hiệu",
    signalSummaryTitle: "Vì sao bản ghi này nổi bật",
    interpretation: "Diễn giải nhanh",
    status: "Trạng thái",

    suspiciousInterpretation:
      "Hồ sơ ví này cho thấy mật độ tín hiệu rủi ro cao hơn, gồm tần suất hoạt động dày, tương tác đầu vào rộng hơn, hoặc thời gian giao dịch bị nén bất thường.",
    safeInterpretation:
      "Hồ sơ ví này hiện nằm trong ngưỡng an toàn hơn dựa trên các đặc trưng giao dịch quan sát được trong tập dữ liệu và chưa thể hiện dị thường pháp chứng nổi bật.",

    suspiciousStatus:
      "Định danh này đang bị gắn cờ đáng ngờ trong đầu ra hiện tại của mô hình và nên được ưu tiên kiểm tra sâu hơn.",
    safeStatus:
      "Định danh này hiện được đánh dấu an toàn trong tập dữ liệu và kết quả chấm điểm mô hình hiện tại.",

    signals: {
      highErc20Density: "Mật độ giao dịch ERC20 cao",
      broadReceiverInteraction: "Phạm vi tương tác đầu vào từ người nhận rộng",
      manyInboundSources: "Có nhiều địa chỉ nguồn gửi vào khác nhau",
      compressedWindow: "Khung thời gian hoạt động bị nén",
      largeEthInflow: "Tổng dòng ETH vào lớn",
      elevatedAvgValue: "Giá trị nhận trung bình ở mức cao",
      noStrongAnomaly: "Chưa phát hiện tín hiệu bất thường mạnh",
    },

    features: {
      totalErc20: "Tổng giao dịch ERC20",
      uniqContracts: "Số contract ERC20 duy nhất",
      uniqTokens: "Số token ERC20 duy nhất",
      uniqReceivers: "Số địa chỉ nhận duy nhất",
      activityWindow: "Khung thời gian hoạt động (phút)",
      totalEtherReceived: "Tổng ETH nhận được",
      avgMinutesBetween: "TB phút giữa các lần nhận",
      avgValueReceived: "Giá trị nhận trung bình",
      totalTransactions: "Tổng số giao dịch",
      uniqFrom: "Số địa chỉ gửi vào duy nhất",
    },
  },

  audit: {
    hero: {
      badge: "Kiểm tra tài khoản",
      title: "Kiểm tra một ví hoặc bản ghi người dùng riêng lẻ",
      description:
        "Tìm theo User ID nội bộ hoặc địa chỉ ví để xem kết quả mô hình, điểm rủi ro và toàn bộ tập đặc trưng pháp chứng dùng trong quá trình đánh giá.",
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
      placeholder: "Nhập User ID hoặc địa chỉ ví (ví dụ: USR-0001 hoặc 0x...)",
      button: "Kiểm tra tài khoản",
    },

    states: {
      loading: "Đang kiểm tra tài khoản, vui lòng đợi...",
      notFoundLabel: "Không tìm thấy bản ghi",
      notFoundDescription:
        "Không tìm thấy định danh trong registry dữ liệu đã đánh giá trước. Hãy thử User ID hoặc địa chỉ ví khác.",
    },

    result: {
      label: "Kết quả kiểm tra",
      title: "Tóm tắt định danh",
      userId: "User ID",
      riskScore: "Điểm rủi ro",
      walletAddress: "Địa chỉ ví",
      interpretationLabel: "Diễn giải",
      suspiciousInterpretation:
        "Định danh này cho thấy hồ sơ rủi ro đáng ngờ dựa trên các đặc trưng giao dịch đã trích xuất.",
      safeInterpretation:
        "Định danh này hiện có vẻ nằm trong vùng an toàn dựa trên mẫu giao dịch đã được đánh giá.",
    },

    featureMap: {
      label: "Bản đồ đặc trưng pháp chứng",
      title: "Các chỉ số đã đánh giá",
      featureCount: "10 đặc trưng",
      table: {
        feature: "Đặc trưng",
        value: "Giá trị",
      },
    },

    features: {
      totalErc20Tx: "Tổng ERC20 tnxs",
      uniqRecContractAddr: "ERC20 uniq rec contract addr",
      uniqRecTokenName: "ERC20 uniq rec token name",
      uniqRecAddr: "ERC20 uniq rec addr",
      timeDiff: "Time Diff between first and last (Mins)",
      totalEtherReceived: "total ether received",
      avgMinBetweenReceived: "Avg min between received tnx",
      avgValReceived: "avg val received",
      totalTransactions:
        "total transactions (including tnx to create contract)",
      uniqueReceivedFromAddresses: "Unique Received From Addresses",
    },
  },

  simulate: {
    hero: {
      badge: "Mô phỏng trực tiếp",
      title: "Mô phỏng một hồ sơ giao dịch ví mới",
      description:
        "Gửi một định danh mới và bộ đặc trưng giao dịch để chạy đánh giá gian lận thời gian thực qua pipeline mô hình.",
    },

    summary: {
      inputModeLabel: "Chế độ nhập",
      inputModeValue: "Đặc trưng thủ công",
      engineLabel: "Engine",
      engineValue: "Chấm điểm thời gian thực",
      resultLabel: "Kết quả",
      resultValue: "Nhãn rủi ro",
    },

    groupLabel: "Nhóm nhập liệu",

    groups: {
      identity: "Định danh",
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
      avgValueReceived: "Giá trị nhận TB",
      totalTxInclCreate: "Tổng Tx (gồm tạo contract)",
      uniqueFromAddresses: "Địa chỉ nguồn duy nhất",
    },

    placeholders: {
      userId: "ví dụ: USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Tóm tắt gửi lên",
      title: "Xem trước payload hiện tại",
      userId: "User ID",
      walletAddress: "Địa chỉ ví",
      featureCount: "Số đặc trưng",
      featureCountValue: "10 chỉ số",
      notProvided: "Chưa cung cấp",
      walletFallback: "0x...",
    },

    note: {
      label: "Ghi chú gửi dữ liệu",
      description:
        "Biểu mẫu này gửi bộ đặc trưng nhập tay để chấm điểm ngay thông qua luồng mô phỏng hiện có.",
    },

    submitButton: "Đẩy luồng giao dịch",
  },

  howItWorks: {
    hero: {
      badge: "Pipeline phát hiện",
      title: "ChainEye xử lý hoạt động ví đáng ngờ như thế nào",
      description:
        "ChainEye kết hợp việc nhập dữ liệu từ client, phân tích AI off-chain và neo CID on-chain thành một quy trình phát hiện gian lận phục vụ theo dõi pháp chứng minh bạch.",
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
      input: "Nhập",
      score: "Chấm điểm",
      anchor: "Neo dữ liệu",
    },

    steps: {
      stepPrefix: "BƯỚC",
      step1Title: "Nhập đặc trưng giao dịch",
      step1Description:
        "Hệ thống thu thập 10 chỉ số ở cấp giao dịch, gồm hoạt động ERC20, mẫu tương tác ví, giá trị nhận và hành vi thời gian.",
      step2Title: "Chấm điểm rủi ro AI off-chain",
      step2Description:
        "Dịch vụ FastAPI chuyển đổi payload đầu vào và chạy mô hình XGBoost để phân loại từng ví là AN TOÀN hoặc ĐÁNG NGỜ theo thời gian thực.",
      step3Title: "IPFS + registry hợp đồng",
      step3Description:
        "Bản ghi dữ liệu cập nhật được lưu trên IPFS, còn CID mới nhất được neo on-chain để mọi tham chiếu lưu trữ đều minh bạch và có thể xác minh.",
    },

    pipeline: {
      label: "Pipeline hệ thống",
      title: "Tóm tắt thực thi",
      frontendLabel: "Frontend",
      frontendDesc:
        "Dữ liệu ví và đặc trưng giao dịch được gửi từ dashboard client.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI đánh giá payload và trả về nhãn gian lận cùng điểm rủi ro.",
      storageLayerLabel: "Lớp lưu trữ",
      storageLayerDesc:
        "Bản chụp dữ liệu mới nhất được tải lên IPFS và được tham chiếu on-chain bằng CID.",
    },

    whyItMatters: {
      label: "Vì sao quan trọng",
      description:
        "Mô hình chạy off-chain để tăng tốc độ, trong khi đăng ký CID bổ sung lớp blockchain có thể xác minh cho mục đích kiểm toán.",
    },

    indicators: {
      badge: "10 chỉ số mô hình",
      title: "Ý nghĩa của 10 chỉ số đầu vào",
      description:
        "Đây là đúng các trường mà mô hình sử dụng. Bạn có thể dùng ví dụ bên dưới khi test thủ công form mô phỏng.",
      tipTitle: "Lưu ý nhanh",
      tipDescription:
        "Các ví dụ bên dưới chỉ là giá trị mẫu. Chúng giúp người test hiểu định dạng đầu vào mong đợi, không phải kết quả gian lận chắc chắn.",
      meaningLabel: "Ý nghĩa",
      exampleLabel: "Giá trị ví dụ",
      items: {
        totalErc20: {
          meaning:
            "Tổng số giao dịch ERC20 liên quan đến ví.",
          example: "24",
        },
        uniqContract: {
          meaning:
            "Số địa chỉ hợp đồng token khác nhau mà ví đã nhận từ.",
          example: "3",
        },
        uniqToken: {
          meaning:
            "Số tên token khác nhau đã được ví nhận.",
          example: "2",
        },
        uniqRecAddr: {
          meaning:
            "Số địa chỉ gửi ERC20 khác nhau đã chuyển token vào ví.",
          example: "8",
        },
        timeDiff: {
          meaning:
            "Khoảng thời gian tính bằng phút giữa giao dịch đầu tiên và cuối cùng quan sát được.",
          example: "180",
        },
        totalEtherReceived: {
          meaning: "Tổng lượng ETH mà ví đã nhận.",
          example: "12.75",
        },
        avgMinBetweenReceived: {
          meaning:
            "Khoảng cách thời gian trung bình tính bằng phút giữa các giao dịch vào.",
          example: "15.5",
        },
        avgValReceived: {
          meaning: "Giá trị trung bình của mỗi giao dịch vào.",
          example: "0.42",
        },
        totalTransactions: {
          meaning:
            "Tổng số giao dịch, bao gồm cả giao dịch tạo contract nếu có.",
          example: "31",
        },
        uniqueReceivedFrom: {
          meaning:
            "Số địa chỉ nguồn duy nhất đã gửi tài sản vào ví này.",
          example: "6",
        },
      },
    },

    testHints: {
      label: "Gợi ý test",
      title: "Ví dụ hướng dẫn khi test thủ công",
      description:
        "Nếu ai đó đang test demo bằng tay, hai mẫu dưới đây sẽ giúp họ tạo giá trị đầu vào thực tế hơn.",
      safeLikeTitle: "Mẫu giống an toàn",
      safeLikeDescription:
        "Hãy thử số lượng giao dịch vừa phải, số lượng địa chỉ gửi hạn chế và giá trị trung bình khá ổn định. Ý tưởng ví dụ: ít đột biến, ít nguồn không liên quan hơn và cửa sổ hoạt động đều đặn hơn.",
      suspiciousLikeTitle: "Mẫu giống đáng ngờ",
      suspiciousLikeDescription:
        "Hãy thử mật độ giao dịch cao hơn, nhiều địa chỉ gửi khác nhau hơn hoặc hoạt động bị phân mảnh bất thường. Ý tưởng ví dụ: nhiều nguồn đi vào, thời gian bị nén và hành vi chuyển tiền không đồng nhất.",
    },
  },

  header: {
    brandTitle: "CHAINEYE FORENSICS",
    brandSubtitle: "CÔNG CỤ PHÁT HIỆN BẤT THƯỜNG ON-CHAIN",
    networkLabel: "Mạng",
    networkValue: "Ganache Localnet",
    aiModelLabel: "Mô hình AI",
    aiModelValue: "XGBoost",
    languageSwitcherAriaLabel: "Thay đổi ngôn ngữ",
    connectWallet: "Kết nối ví",
    disconnectWallet: "Ngắt kết nối ví",
    web3Access: "Truy cập Web3",
    selectWalletProvider: "Chọn nhà cung cấp ví",
    walletModalDescription:
      "Kết nối ví danh tính phi tập trung của bạn để bật các tính năng kiểm tra tài khoản và tương tác với smart contract.",
    metamaskWallet: "Ví MetaMask",
    walletConnect: "WalletConnect",
    detected: "Đã phát hiện",
    unavailable: "Không khả dụng",
    cancel: "Hủy",
  },
} as const;

export default vi;