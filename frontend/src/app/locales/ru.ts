const ru = {
  nav: {
    overview: "Обзор панели",
    audit: "Проверка аккаунта",
    simulate: "Симуляция транзакции",
    howItWorks: "Как это работает",
    navigation: "НАВИГАЦИЯ",
  },

  session: {
    title: "Сессия",
    walletLinked: "Кошелёк подключён",
    walletOffline: "Кошелёк не в сети",
    description:
      "Используйте левую панель навигации, чтобы просматривать записи, запускать проверки и моделировать входящие профили транзакций.",
  },

  language: {
    label: "Язык",
    en: "English",
    vi: "Tiếng Việt",
    ru: "Русский",
  },

  common: {
    safe: "Безопасно",
    suspicious: "Подозрительно",
  },

  logs: {
    systemReady: "SYS // ChainEye Forensics Engine успешно инициализирован.",
    ipfsReady: "IPFS // Соединение подтверждено. Буфер записей CID загружен.",
    modelReady: "AI // Веса модели XGBoost доступны.",
    fetchedRecords: (count: number) =>
      `REST // Получено ${count} записей кошельков из серверного хранилища.`,
    fetchFailed: (status: number) =>
      `ERR // Не удалось загрузить dataset. Статус ${status}.`,
    backendTimeout: "ERR // Истекло время ожидания соединения с backend-узлом.",
    walletConnected: "WALLET // Подключено через подпись аккаунта MetaMask.",
    walletDisconnected: "WALLET // Сессия отключена по запросу пользователя.",
    auditSearching: (id: string) =>
      `AUDIT // Обращение к registry для узла: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Аккаунт найден: ${userId}, статус ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Registry не вернул запись для узла: [${id}]`,
    auditBroken: "ERR // Поток запроса к registry повреждён.",
    simApproved: (classification: string) =>
      `SIM // Сетевой ввод одобрен. Метка: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Симуляция завершилась неудачно со статусом ${status}.`,
    simBroken: "ERR // Передача симуляции прервана.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Объём dataset",
      datasetVolumeDesc: "Оценённые записи кошельков",
      suspiciousRateLabel: "Доля подозрительных",
      suspiciousRateDesc: "Помечено в текущем dataset",
      storageLayerLabel: "Слой хранения",
      storageLayerTitle: "IPFS + CID Registry",
      storageLayerDesc: "Закреплённая forensic-ссылка на хранилище",
    },

    batch: {
      label: "Обзор batch",
      title: "Предварительно оцененный dataset кошельков",
    },

    filters: {
      all: "ВСЕ",
      safe: "БЕЗОПАСНО",
      suspicious: "ПОДОЗРИТЕЛЬНО",
    },

    table: {
      userId: "User ID",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqContract: "Уник. contract",
      uniqToken: "Уник. token",
      uniqRecAddr: "Уник. адрес получ.",
      timeDiff: "Разница времени",
      ethReceived: "Получено ETH",
      avgMinPerRec: "Сред. мин / получ.",
      avgVal: "Сред. значение",
      totalTx: "Всего Tx",
      uniqFrom: "Уник. отправители",
      risk: "Риск",
      status: "Статус",
    },

    telemetry: "Живая forensic-телеметрия",
  },

  audit: {
    hero: {
      badge: "Проверка аккаунта",
      title: "Проверка отдельного кошелька или записи пользователя",
      description:
        "Ищите по внутреннему User ID или адресу кошелька, чтобы просмотреть результат модели, уровень риска и полный набор forensic-признаков, использованных при оценке.",
    },

    summary: {
      lookupModeLabel: "Режим поиска",
      lookupModeValue: "User ID / Wallet",
      outputLabel: "Результат",
      outputValue: "Риск + Признаки",
      statusLabel: "Статус",
      statusValue: "Запрос в реальном времени",
    },

    search: {
      placeholder:
        "Введите User ID или адрес кошелька (например: USR-0001 или 0x...)",
      button: "Проверить аккаунт",
    },

    states: {
      loading: "Выполняется проверка аккаунта, подождите...",
      notFoundLabel: "Запись не найдена",
      notFoundDescription:
        "Идентификатор не найден в registry предварительно оцененного dataset. Попробуйте другой User ID или адрес кошелька.",
    },

    result: {
      label: "Результат проверки",
      title: "Сводка по идентификатору",
      userId: "User ID",
      riskScore: "Уровень риска",
      walletAddress: "Адрес кошелька",
      interpretationLabel: "Интерпретация",
      suspiciousInterpretation:
        "Этот идентификатор показывает подозрительный профиль риска на основе извлечённых транзакционных признаков.",
      safeInterpretation:
        "Этот идентификатор в данный момент находится в безопасном диапазоне на основе оценённого паттерна транзакций.",
    },

    featureMap: {
      label: "Карта forensic-признаков",
      title: "Оценённые индикаторы",
      featureCount: "10 признаков",
      table: {
        feature: "Признак",
        value: "Значение",
      },
    },

    features: {
      totalErc20Tx: "Общее число ERC20-транзакций",
      uniqRecContractAddr: "Уникальный адрес полученного ERC20 contract",
      uniqRecTokenName: "Уникальное имя полученного ERC20 token",
      uniqRecAddr: "Уникальный адрес получения ERC20",
      timeDiff: "Разница между первой и последней транзакцией (мин)",
      totalEtherReceived: "Общий объём полученного ether",
      avgMinBetweenReceived: "Сред. мин между входящими транзакциями",
      avgValReceived: "Среднее значение полученных транзакций",
      totalTransactions:
        "Общее число транзакций (включая создание contract)",
      uniqueReceivedFromAddresses: "Уникальные адреса отправителей",
    },
  },

  simulate: {
    hero: {
      badge: "Живая симуляция",
      title: "Смоделировать новый профиль транзакций кошелька",
      description:
        "Отправьте новый идентификатор и набор транзакционных признаков, чтобы выполнить оценку мошенничества в реальном времени через pipeline модели.",
    },

    summary: {
      inputModeLabel: "Режим ввода",
      inputModeValue: "Ручные признаки",
      engineLabel: "Движок",
      engineValue: "Оценка в реальном времени",
      resultLabel: "Результат",
      resultValue: "Метка риска",
    },

    groupLabel: "Группа ввода",

    groups: {
      identity: "Идентификация",
      erc20Activity: "ERC20-активность",
      valueTiming: "Значение и время",
      structuralSignals: "Структурные сигналы",
    },

    fields: {
      userId: "User ID",
      walletAddress: "Адрес кошелька",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqueContract: "Уникальный contract",
      uniqueToken: "Уникальный token",
      uniqueReceiverAddress: "Уникальный адрес получателя",
      timeDiffMins: "Разница времени (мин)",
      ethReceived: "Получено ETH",
      avgMinBetweenReceived: "Сред. мин между получениями",
      avgValueReceived: "Среднее значение получения",
      totalTxInclCreate: "Всего Tx (вкл. создание)",
      uniqueFromAddresses: "Уникальные адреса отправителей",
    },

    placeholders: {
      userId: "например: USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Сводка отправки",
      title: "Предпросмотр текущего payload",
      userId: "User ID",
      walletAddress: "Адрес кошелька",
      featureCount: "Количество признаков",
      featureCountValue: "10 индикаторов",
      notProvided: "Не указано",
      walletFallback: "0x...",
    },

    note: {
      label: "Примечание к отправке",
      description:
        "Эта форма отправляет вручную введённый набор признаков для немедленной оценки через существующий поток симуляции.",
    },

    submitButton: "Отправить поток транзакции",
  },

  howItWorks: {
    hero: {
      badge: "Пайплайн обнаружения",
      title: "Как ChainEye обрабатывает подозрительную активность кошелька",
      description:
        "ChainEye объединяет отправку данных с клиента, off-chain AI-анализ и on-chain закрепление CID в единый workflow обнаружения мошенничества для прозрачного forensic-отслеживания.",
    },

    summary: {
      featuresLabel: "Признаки",
      featuresValue: "10 входов",
      aiEngineLabel: "AI Engine",
      aiEngineValue: "XGBoost",
      storageLabel: "Хранение",
      storageValue: "IPFS + CID",
    },

    flow: {
      label: "Этапы обработки",
      title: "Поток обнаружения",
      input: "Вход",
      score: "Оценка",
      anchor: "Якорь",
    },

    steps: {
      stepPrefix: "ШАГ",
      step1Title: "Ввод транзакционных признаков",
      step1Description:
        "Система собирает 10 индикаторов на уровне транзакций, включая ERC20-активность, паттерны взаимодействия кошелька, полученное значение и временное поведение.",
      step2Title: "Off-chain AI-оценка риска",
      step2Description:
        "Сервис FastAPI преобразует входной payload и запускает модель XGBoost, чтобы в реальном времени классифицировать каждый кошелёк как БЕЗОПАСНО или ПОДОЗРИТЕЛЬНО.",
      step3Title: "IPFS + Contract Registry",
      step3Description:
        "Обновлённые записи dataset сохраняются в IPFS, а последний CID закрепляется on-chain, чтобы каждая ссылка на хранилище оставалась прозрачной и проверяемой.",
    },

    pipeline: {
      label: "Системный pipeline",
      title: "Сводка выполнения",
      frontendLabel: "Frontend",
      frontendDesc:
        "Данные кошелька и транзакционные признаки отправляются с клиентского dashboard.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI оценивает payload и возвращает метку мошенничества вместе с уровнем риска.",
      storageLayerLabel: "Слой хранения",
      storageLayerDesc:
        "Последний snapshot dataset загружается в IPFS и ссылается on-chain через CID.",
    },

    whyItMatters: {
      label: "Почему это важно",
      description:
        "Модель работает off-chain для скорости, а регистрация CID добавляет проверяемый blockchain-слой для аудита.",
    },

    indicators: {
      badge: "10 индикаторов модели",
      title: "Значение 10 входных индикаторов",
      description:
        "Это точные поля, которые использует модель. Вы можете использовать примеры ниже при ручном тестировании формы simulate.",
      tipTitle: "Быстрая заметка",
      tipDescription:
        "Примеры ниже — это только образцы значений. Они помогают тестировщику понять ожидаемый формат ввода, но не гарантируют fraud-результат.",
      meaningLabel: "Значение",
      exampleLabel: "Пример ввода",
      items: {
        totalErc20: {
          meaning: "Общее количество ERC20-транзакций, связанных с кошельком.",
          example: "24",
        },
        uniqContract: {
          meaning:
            "Количество различных адресов token contract, от которых кошелёк получал активы.",
          example: "3",
        },
        uniqToken: {
          meaning: "Количество различных token name, полученных кошельком.",
          example: "2",
        },
        uniqRecAddr: {
          meaning:
            "Количество различных ERC20-адресов отправителей, которые отправляли токены на кошелёк.",
          example: "8",
        },
        timeDiff: {
          meaning:
            "Промежуток времени в минутах между первой и последней наблюдаемой транзакцией.",
          example: "180",
        },
        totalEtherReceived: {
          meaning: "Общий объём ETH, полученный кошельком.",
          example: "12.75",
        },
        avgMinBetweenReceived: {
          meaning:
            "Средний временной интервал в минутах между входящими транзакциями.",
          example: "15.5",
        },
        avgValReceived: {
          meaning: "Среднее значение каждой входящей транзакции.",
          example: "0.42",
        },
        totalTransactions: {
          meaning:
            "Общее количество транзакций, включая транзакции создания contract, если они есть.",
          example: "31",
        },
        uniqueReceivedFrom: {
          meaning:
            "Количество уникальных адресов-источников, которые отправляли активы на этот кошелёк.",
          example: "6",
        },
      },
    },

    testHints: {
      label: "Подсказки для тестирования",
      title: "Примеры направлений для ручной проверки",
      description:
        "Если кто-то тестирует демо вручную, эти два шаблона помогут составить более реалистичные входные данные.",
      safeLikeTitle: "Шаблон, похожий на безопасный",
      safeLikeDescription:
        "Попробуйте умеренное количество транзакций, ограниченное число адресов отправителей и относительно стабильные средние значения. Интуитивно: меньше резких всплесков, меньше несвязанных источников и более регулярное окно активности.",
      suspiciousLikeTitle: "Шаблон, похожий на подозрительный",
      suspiciousLikeDescription:
        "Попробуйте более высокую плотность транзакций, больше уникальных адресов отправителей или необычно фрагментированную активность. Интуитивно: много входящих источников, сжатые интервалы времени и нестабильное поведение переводов.",
    },
  },

  header: {
    brandTitle: "CHAINEYE FORENSICS",
    brandSubtitle: "ДВИЖОК ОБНАРУЖЕНИЯ ON-CHAIN АНОМАЛИЙ",
    networkLabel: "Сеть",
    networkValue: "Ganache Localnet",
    aiModelLabel: "AI Model",
    aiModelValue: "XGBoost",
    languageSwitcherAriaLabel: "Сменить язык",
    connectWallet: "Подключить кошелёк",
    disconnectWallet: "Отключить кошелёк",
    web3Access: "Доступ Web3",
    selectWalletProvider: "Выберите провайдера кошелька",
    walletModalDescription:
      "Подключите свой децентрализованный identity-кошелёк, чтобы включить функции проверки аккаунта и взаимодействия со smart contract.",
    metamaskWallet: "Кошелёк MetaMask",
    walletConnect: "WalletConnect",
    detected: "Обнаружено",
    unavailable: "Недоступно",
    cancel: "Отмена",
  },
} as const;

export default ru;