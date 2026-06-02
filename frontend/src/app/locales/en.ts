const en = {
  nav: {
    overview: "Dashboard Overview",
    audit: "Account Audit",
    simulate: "Simulate Transaction",
    howItWorks: "How It Works",
    navigation: "NAVIGATION",
  },

  session: {
    title: "Session",
    walletLinked: "Wallet linked",
    walletOffline: "Wallet offline",
    description:
      "Use the left navigation to inspect records, run audits, and simulate incoming transaction profiles.",
  },

  language: {
    label: "Language",
    en: "English",
    vi: "Tiếng Việt",
    ru: "Русский",
  },

  common: {
    safe: "Safe",
    suspicious: "Suspicious",
  },

  logs: {
    systemReady: "SYS // ChainEye Forensics Engine initialised successfully.",
    ipfsReady: "IPFS // Connection verified. CID record buffer loaded.",
    modelReady: "AI // XGBoost model weights online.",
    fetchedRecords: (count: number) =>
      `REST // Fetched ${count} wallet records from server storage.`,
    fetchFailed: (status: number) =>
      `ERR // Failed to fetch dataset. Status ${status}.`,
    backendTimeout: "ERR // Backend node connection timeout.",
    walletConnected: "WALLET // Connected via MetaMask account signature.",
    walletDisconnected: "WALLET // Session detached by user authorization.",
    auditSearching: (id: string) =>
      `AUDIT // Contacting registry for node: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Account found: ${userId}, status ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Registry lookup failed for node: [${id}]`,
    auditBroken: "ERR // Registry fetch stream broken.",
    simApproved: (classification: string) =>
      `SIM // Network entry approved. Label: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Simulation failed with status ${status}.`,
    simBroken: "ERR // Simulation transmission collapsed.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Dataset volume",
      datasetVolumeDesc: "Evaluated wallet records",
      suspiciousRateLabel: "Suspicious rate",
      suspiciousRateDesc: "Flagged across current dataset",
      storageLayerLabel: "Storage layer",
      storageLayerTitle: "IPFS + CID Registry",
      storageLayerDesc: "Anchored forensic storage reference",
    },

    batch: {
      label: "Batch overview",
      title: "Pre-evaluated wallet dataset",
    },

    filters: {
      all: "ALL",
      safe: "SAFE",
      suspicious: "SUSPICIOUS",
    },

    table: {
      userId: "User ID",
      totalErc20Tx: "Total ERC20 Tx",
      uniqContract: "Uniq Contract",
      uniqToken: "Uniq Token",
      uniqRecAddr: "Uniq Rec Addr",
      timeDiff: "Time Diff",
      ethReceived: "ETH Received",
      avgMinPerRec: "Avg Min / Rec",
      avgVal: "Avg Val",
      totalTx: "Total Tx",
      uniqFrom: "Uniq From",
      risk: "Risk",
      status: "Status",
    },

    telemetry: "Live forensic telemetry",
  },

  audit: {
    hero: {
      badge: "Account Inspection",
      title: "Audit an individual wallet or user record",
      description:
        "Search by internal user ID or wallet address to inspect the model result, risk score, and the full forensic feature set used during evaluation.",
    },

    summary: {
      lookupModeLabel: "Lookup mode",
      lookupModeValue: "User ID / Wallet",
      outputLabel: "Output",
      outputValue: "Risk + Features",
      statusLabel: "Status",
      statusValue: "Real-time query",
    },

    search: {
      placeholder: "Enter User ID or Wallet Address (e.g. USR-0001 or 0x...)",
      button: "Audit Account",
    },

    states: {
      loading: "Auditing account, please wait...",
      notFoundLabel: "No record found",
      notFoundDescription:
        "Identity not found in the pre-evaluated dataset registry. Try a different user ID or wallet address.",
    },

    result: {
      label: "Audit result",
      title: "Identity summary",
      userId: "User ID",
      riskScore: "Risk score",
      walletAddress: "Wallet address",
      interpretationLabel: "Interpretation",
      suspiciousInterpretation:
        "This identity shows a suspicious risk profile based on the extracted transaction features.",
      safeInterpretation:
        "This identity currently appears within the safe range based on the evaluated transaction pattern.",
    },

    featureMap: {
      label: "Forensic feature map",
      title: "Evaluated indicators",
      featureCount: "10 features",
      table: {
        feature: "Feature",
        value: "Value",
      },
    },

    features: {
      totalErc20Tx: "Total ERC20 tnxs",
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
      badge: "Live Simulation",
      title: "Simulate a new wallet transaction profile",
      description:
        "Submit a fresh identity and transaction feature set to run a real-time fraud evaluation through the model pipeline.",
    },

    summary: {
      inputModeLabel: "Input mode",
      inputModeValue: "Manual features",
      engineLabel: "Engine",
      engineValue: "Real-time scoring",
      resultLabel: "Result",
      resultValue: "Risk label",
    },

    groupLabel: "Input group",

    groups: {
      identity: "Identity",
      erc20Activity: "ERC20 Activity",
      valueTiming: "Value & Timing",
      structuralSignals: "Structural Signals",
    },

    fields: {
      userId: "User ID",
      walletAddress: "Wallet Address",
      totalErc20Tx: "Total ERC20 Tx",
      uniqueContract: "Unique Contract",
      uniqueToken: "Unique Token",
      uniqueReceiverAddress: "Unique Receiver Address",
      timeDiffMins: "Time Diff (Mins)",
      ethReceived: "ETH Received",
      avgMinBetweenReceived: "Avg Min Between Received",
      avgValueReceived: "Avg Value Received",
      totalTxInclCreate: "Total Tx (Incl Create)",
      uniqueFromAddresses: "Unique From Addresses",
    },

    placeholders: {
      userId: "e.g. USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Submission summary",
      title: "Current payload preview",
      userId: "User ID",
      walletAddress: "Wallet Address",
      featureCount: "Feature Count",
      featureCountValue: "10 indicators",
      notProvided: "Not provided",
      walletFallback: "0x...",
    },

    note: {
      label: "Submission note",
      description:
        "This form sends the manually entered feature set for immediate scoring through the existing simulation flow.",
    },

    submitButton: "Push Transaction Flow",
  },

    howItWorks: {
    hero: {
      badge: "Detection Pipeline",
      title: "How ChainEye processes suspicious wallet activity",
      description:
        "ChainEye combines client-side submission, off-chain AI analysis, and on-chain CID anchoring into one fraud-detection workflow built for transparent forensic tracking.",
    },

    summary: {
      featuresLabel: "Features",
      featuresValue: "10 inputs",
      aiEngineLabel: "AI Engine",
      aiEngineValue: "XGBoost",
      storageLabel: "Storage",
      storageValue: "IPFS + CID",
    },

    flow: {
      label: "Processing stages",
      title: "Detection flow",
      input: "Input",
      score: "Score",
      anchor: "Anchor",
    },

    steps: {
      stepPrefix: "STEP",
      step1Title: "Transaction Feature Input",
      step1Description:
        "The system collects 10 transaction-level indicators, including ERC20 activity, wallet interaction patterns, received value, and timing behavior.",
      step2Title: "Off-Chain AI Risk Scoring",
      step2Description:
        "A FastAPI service transforms the incoming payload and runs the XGBoost model to classify each wallet as SAFE or SUSPICIOUS in real time.",
      step3Title: "IPFS + Contract Registry",
      step3Description:
        "Updated dataset records are stored on IPFS, while the latest CID is anchored on-chain so every storage reference remains transparent and verifiable.",
    },

    pipeline: {
      label: "System pipeline",
      title: "Execution summary",
      frontendLabel: "Frontend",
      frontendDesc:
        "Wallet data and transaction features are submitted from the client dashboard.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI evaluates the payload and returns a fraud label with a risk score.",
      storageLayerLabel: "Storage layer",
      storageLayerDesc:
        "The latest dataset snapshot is uploaded to IPFS and referenced on-chain by CID.",
    },

    whyItMatters: {
      label: "Why this matters",
      description:
        "The model runs off-chain for speed, while CID registration adds a verifiable blockchain layer for auditability.",
    },

    indicators: {
      badge: "10 model indicators",
      title: "Meaning of the 10 input indicators",
      description:
        "These are the exact fields used by the model. You can use the examples below when manually testing the simulate form.",
      tipTitle: "Quick note",
      tipDescription:
        "The examples below are sample values only. They help the tester understand the expected input format, not guaranteed fraud outcomes.",
      meaningLabel: "Meaning",
      exampleLabel: "Example input",
      items: {
        totalErc20: {
          meaning:
            "Total number of ERC20 transactions associated with the wallet.",
          example: "24",
        },
        uniqContract: {
          meaning:
            "Number of distinct token contract addresses the wallet has received from.",
          example: "3",
        },
        uniqToken: {
          meaning:
            "Number of different token names received by the wallet.",
          example: "2",
        },
        uniqRecAddr: {
          meaning:
            "Number of distinct ERC20 sender addresses that sent tokens to the wallet.",
          example: "8",
        },
        timeDiff: {
          meaning:
            "Time span in minutes between the first and last observed transactions.",
          example: "180",
        },
        totalEtherReceived: {
          meaning: "Total amount of ETH received by the wallet.",
          example: "12.75",
        },
        avgMinBetweenReceived: {
          meaning:
            "Average time gap in minutes between incoming transactions.",
          example: "15.5",
        },
        avgValReceived: {
          meaning: "Average value of each incoming transaction.",
          example: "0.42",
        },
        totalTransactions: {
          meaning:
            "Total number of transactions, including contract-creation transactions if any.",
          example: "31",
        },
        uniqueReceivedFrom: {
          meaning:
            "Number of unique source addresses that have sent assets to this wallet.",
          example: "6",
        },
      },
    },

    testHints: {
      label: "Testing hints",
      title: "Example directions for manual testing",
      description:
        "If someone is testing the demo manually, these two patterns can help them create more realistic input values.",
      safeLikeTitle: "Safe-like pattern",
      safeLikeDescription:
        "Try moderate transaction counts, a limited number of sender addresses, and fairly stable average values. Example intuition: fewer extreme spikes, fewer unrelated sources, and a more regular activity window.",
      suspiciousLikeTitle: "Suspicious-like pattern",
      suspiciousLikeDescription:
        "Try higher transaction density, more unique sender addresses, or unusually fragmented activity. Example intuition: many incoming sources, compressed timing, and inconsistent transfer behavior.",
    },
  },
  header: {
  brandTitle: "CHAINEYE FORENSICS",
  brandSubtitle: "ON-CHAIN ANOMALY DETECTION ENGINE",
  networkLabel: "Network",
  networkValue: "Ganache Localnet",
  aiModelLabel: "AI Model",
  aiModelValue: "XGBoost",
  languageSwitcherAriaLabel: "Change language",
  connectWallet: "Connect Wallet",
  disconnectWallet: "Disconnect wallet",
  web3Access: "Web3 access",
  selectWalletProvider: "Select wallet provider",
  walletModalDescription:
    "Connect your decentralised identity wallet to enable account audit and smart contract interaction features.",
  metamaskWallet: "MetaMask Wallet",
  walletConnect: "WalletConnect",
  detected: "Detected",
  unavailable: "Unavailable",
  cancel: "Cancel",
},
} as const;

export default en;