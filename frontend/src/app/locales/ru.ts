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
    walletOffline: "Кошелёк офлайн",
    description:
      "Используйте левую навигацию, чтобы просматривать записи, выполнять проверки и симулировать профили входящих транзакций.",
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
    modelReady: "AI // Веса модели XGBoost подключены.",
    fetchedRecords: (count: number) =>
      `REST // Получено ${count} записей кошельков из серверного хранилища.`,
    fetchFailed: (status: number) =>
      `ERR // Не удалось загрузить набор данных. Статус ${status}.`,
    backendTimeout: "ERR // Тайм-аут соединения с backend-узлом.",
    walletConnected: "WALLET // Подключено через подпись аккаунта MetaMask.",
    walletDisconnected: "WALLET // Сеанс отключён по авторизации пользователя.",
    auditSearching: (id: string) =>
      `AUDIT // Выполняется обращение к реестру для узла: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Аккаунт найден: ${userId}, статус ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Поиск в реестре не дал результата для узла: [${id}]`,
    auditBroken: "ERR // Поток запроса к реестру прерван.",
    simApproved: (classification: string) =>
      `SIM // Сетевой ввод одобрен. Метка: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Симуляция завершилась ошибкой со статусом ${status}.`,
    simBroken: "ERR // Передача симуляции оборвана.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Объём набора данных",
      datasetVolumeDesc: "Оценённые записи кошельков",
      suspiciousRateLabel: "Доля подозрительных",
      suspiciousRateDesc: "Отмечено в текущем наборе данных",
      storageLayerLabel: "Слой хранения",
      storageLayerTitle: "IPFS + реестр CID",
      storageLayerDesc: "Закреплённая ссылка на форензик-хранилище",
    },

    batch: {
      label: "Обзор пакета",
      title: "Предварительно оценённый набор кошельков",
    },

    filters: {
      all: "ВСЕ",
      safe: "БЕЗОПАСНО",
      suspicious: "ПОДОЗРИТЕЛЬНО",
    },

    table: {
      userId: "User ID",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqContract: "Уник. контракт",
      uniqToken: "Уник. токен",
      uniqRecAddr: "Уник. адреса получ.",
      timeDiff: "Разница времени",
      ethReceived: "Получено ETH",
      avgMinPerRec: "Средн. мин / получ.",
      avgVal: "Средн. знач.",
      totalTx: "Всего Tx",
      uniqFrom: "Уник. отправители",
      risk: "Риск",
      status: "Статус",
    },

    telemetry: "Живая форензик-телеметрия",
  },

  riskModal: {
    panelLabel: "Панель деталей риска",
    close: "Закрыть",
    walletAddress: "Адрес кошелька",
    riskScore: "Оценка риска",
    confidenceHint: "Просмотр уверенности классификации модели",
    activityWindow: "Окно активности",
    activityWindowDesc:
      "Минуты между первой и последней зафиксированной транзакцией",
    totalEthReceived: "Всего получено ETH",
    totalEthReceivedDesc: "Совокупный входящий объём ETH",
    featureMap: "Карта признаков",
    featureMapTitle: "Оценённые транзакционные индикаторы",
    signalSummary: "Сводка сигналов",
    signalSummaryTitle: "Почему эта запись выделяется",
    interpretation: "Краткая интерпретация",
    status: "Статус",

    suspiciousInterpretation:
      "Этот профиль кошелька показывает более высокую концентрацию рискованных транзакционных сигналов, включая более высокую плотность активности, более широкие паттерны входящих взаимодействий или необычно сжатое время транзакций.",
    safeInterpretation:
      "Этот профиль кошелька сейчас находится в более безопасном диапазоне на основе наблюдаемых транзакционных признаков в наборе данных и не демонстрирует необычно сильных форензик-аномалий.",

    suspiciousStatus:
      "Этот идентификатор помечен как подозрительный в текущем выводе модели и должен быть приоритетом для более глубокой проверки.",
    safeStatus:
      "Этот идентификатор сейчас отмечен как безопасный в текущем наборе данных и в результатах оценки модели.",

    signals: {
      highErc20Density: "Высокая плотность ERC20-транзакций",
      broadReceiverInteraction: "Широкое взаимодействие с входящими адресами получателей",
      manyInboundSources: "Много уникальных входящих адресов-источников",
      compressedWindow: "Сжатое окно активности",
      largeEthInflow: "Большой совокупный входящий ETH-поток",
      elevatedAvgValue: "Повышенное среднее значение полученных средств",
      noStrongAnomaly: "Сильных транзакционных аномалий не обнаружено",
    },

    features: {
      totalErc20: "Всего ERC20 Txns",
      uniqContracts: "Уникальные ERC20 контракты",
      uniqTokens: "Уникальные ERC20 токены",
      uniqReceivers: "Уникальные адреса получателей",
      activityWindow: "Окно активности (мин.)",
      totalEtherReceived: "Всего получено Ether",
      avgMinutesBetween: "Средн. минуты между Txns",
      avgValueReceived: "Среднее значение полученного",
      totalTransactions: "Всего транзакций",
      uniqFrom: "Уникальные адреса отправителей",
    },
  },

  audit: {
    hero: {
      badge: "Проверка аккаунта",
      title: "Проверка отдельного кошелька или записи пользователя",
      description:
        "Ищите по внутреннему User ID или адресу кошелька, чтобы посмотреть результат модели, риск-скор и полный набор форензик-признаков, использованный при оценке.",
    },

    summary: {
      lookupModeLabel: "Режим поиска",
      lookupModeValue: "User ID / Wallet",
      outputLabel: "Вывод",
      outputValue: "Риск + признаки",
      statusLabel: "Статус",
      statusValue: "Запрос в реальном времени",
    },

    search: {
      placeholder: "Введите User ID или адрес кошелька (например, USR-0001 или 0x...)",
      button: "Проверить аккаунт",
    },

    states: {
      loading: "Проверка аккаунта, пожалуйста подождите...",
      notFoundLabel: "Запись не найдена",
      notFoundDescription:
        "Идентификатор не найден в реестре предварительно оценённых данных. Попробуйте другой User ID или адрес кошелька.",
    },

    result: {
      label: "Результат проверки",
      title: "Сводка по идентификатору",
      userId: "User ID",
      riskScore: "Оценка риска",
      walletAddress: "Адрес кошелька",
      interpretationLabel: "Интерпретация",
      suspiciousInterpretation:
        "Этот идентификатор демонстрирует подозрительный профиль риска на основе извлечённых транзакционных признаков.",
      safeInterpretation:
        "Этот идентификатор сейчас выглядит находящимся в безопасном диапазоне на основе оценённого транзакционного паттерна.",
    },

    featureMap: {
      label: "Форензик-карта признаков",
      title: "Оценённые индикаторы",
      featureCount: "10 признаков",
      table: {
        feature: "Признак",
        value: "Значение",
      },
    },

    features: {
      totalErc20Tx: "Всего ERC20 tnxs",
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
      badge: "Живая симуляция",
      title: "Симуляция нового профиля транзакций кошелька",
      description:
        "Отправьте новый идентификатор и набор транзакционных признаков, чтобы запустить оценку мошенничества в реальном времени через модельный pipeline.",
    },

    summary: {
      inputModeLabel: "Режим ввода",
      inputModeValue: "Ручные признаки",
      engineLabel: "Engine",
      engineValue: "Оценка в реальном времени",
      resultLabel: "Результат",
      resultValue: "Метка риска",
    },

    groupLabel: "Группа ввода",

    groups: {
      identity: "Идентификация",
      erc20Activity: "Активность ERC20",
      valueTiming: "Стоимость и время",
      structuralSignals: "Структурные сигналы",
    },

    fields: {
      userId: "User ID",
      walletAddress: "Адрес кошелька",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqueContract: "Уник. контракт",
      uniqueToken: "Уник. токен",
      uniqueReceiverAddress: "Уник. адрес получателя",
      timeDiffMins: "Разница времени (мин.)",
      ethReceived: "Получено ETH",
      avgMinBetweenReceived: "Средн. мин между получениями",
      avgValueReceived: "Среднее полученное значение",
      totalTxInclCreate: "Всего Tx (вкл. создание)",
      uniqueFromAddresses: "Уник. адреса отправителей",
    },

    placeholders: {
      userId: "например, USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Сводка отправки",
      title: "Текущий предпросмотр payload",
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
        "Эта форма отправляет введённый вручную набор признаков для немедленной оценки через существующий flow симуляции.",
    },

    submitButton: "Отправить поток транзакции",
  },

  howItWorks: {
    hero: {
      badge: "Pipeline обнаружения",
      title: "Как ChainEye обрабатывает подозрительную активность кошелька",
      description:
        "ChainEye объединяет отправку с клиента, off-chain AI-анализ и on-chain закрепление CID в одном workflow обнаружения мошенничества для прозрачного форензик-учёта.",
    },

    summary: {
      featuresLabel: "Признаки",
      featuresValue: "10 входов",
      aiEngineLabel: "AI Engine",
      aiEngineValue: "XGBoost",
      storageLabel: "Хранилище",
      storageValue: "IPFS + CID",
    },

    flow: {
      label: "Этапы обработки",
      title: "Поток обнаружения",
      input: "Ввод",
      score: "Оценка",
      anchor: "Закрепление",
    },

    steps: {
      stepPrefix: "ШАГ",
      step1Title: "Ввод транзакционных признаков",
      step1Description:
        "Система собирает 10 индикаторов уровня транзакций, включая активность ERC20, паттерны взаимодействия кошелька, полученную стоимость и временное поведение.",
      step2Title: "Off-chain AI оценка риска",
      step2Description:
        "Сервис FastAPI преобразует входной payload и запускает модель XGBoost, чтобы классифицировать каждый кошелёк как SAFE или SUSPICIOUS в реальном времени.",
      step3Title: "IPFS + реестр контракта",
      step3Description:
        "Обновлённые записи набора данных хранятся в IPFS, а последний CID закрепляется on-chain, чтобы каждая ссылка на хранилище оставалась прозрачной и проверяемой.",
    },

    pipeline: {
      label: "Системный pipeline",
      title: "Сводка выполнения",
      frontendLabel: "Frontend",
      frontendDesc:
        "Данные кошелька и транзакционные признаки отправляются с клиентской панели.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI оценивает payload и возвращает метку мошенничества вместе с risk score.",
      storageLayerLabel: "Слой хранения",
      storageLayerDesc:
        "Последний снимок набора данных загружается в IPFS и ссылается on-chain через CID.",
    },

    whyItMatters: {
      label: "Почему это важно",
      description:
        "Модель работает off-chain для скорости, а регистрация CID добавляет проверяемый блокчейн-слой для аудита.",
    },

    indicators: {
      badge: "10 индикаторов модели",
      title: "Значение 10 входных индикаторов",
      description:
        "Это точные поля, которые использует модель. Вы можете использовать примеры ниже при ручном тестировании формы simulate.",
      tipTitle: "Краткая заметка",
      tipDescription:
        "Примеры ниже — только sample values. Они помогают понять ожидаемый формат входа, а не гарантированный результат по мошенничеству.",
      meaningLabel: "Значение",
      exampleLabel: "Пример ввода",
      items: {
        totalErc20: {
          meaning:
            "Общее количество ERC20 транзакций, связанных с кошельком.",
          example: "24",
        },
        uniqContract: {
          meaning:
            "Количество различных адресов контрактов токенов, от которых кошелёк получал средства.",
          example: "3",
        },
        uniqToken: {
          meaning:
            "Количество разных названий токенов, полученных кошельком.",
          example: "2",
        },
        uniqRecAddr: {
          meaning:
            "Количество разных адресов отправителей ERC20, переводивших токены на кошелёк.",
          example: "8",
        },
        timeDiff: {
          meaning:
            "Временной интервал в минутах между первой и последней наблюдаемой транзакцией.",
          example: "180",
        },
        totalEtherReceived: {
          meaning: "Общее количество ETH, полученное кошельком.",
          example: "12.75",
        },
        avgMinBetweenReceived: {
          meaning:
            "Средний временной разрыв в минутах между входящими транзакциями.",
          example: "15.5",
        },
        avgValReceived: {
          meaning: "Среднее значение каждой входящей транзакции.",
          example: "0.42",
        },
        totalTransactions: {
          meaning:
            "Общее количество транзакций, включая транзакции создания контракта, если они есть.",
          example: "31",
        },
        uniqueReceivedFrom: {
          meaning:
            "Количество уникальных исходных адресов, отправлявших активы на этот кошелёк.",
          example: "6",
        },
      },
    },

    testHints: {
      label: "Подсказки для теста",
      title: "Примеры направлений для ручного тестирования",
      description:
        "Если кто-то тестирует демо вручную, эти два паттерна помогут создать более реалистичные значения ввода.",
      safeLikeTitle: "Паттерн, похожий на безопасный",
      safeLikeDescription:
        "Попробуйте умеренное количество транзакций, ограниченное число адресов отправителей и довольно стабильные средние значения. Идея: меньше резких всплесков, меньше неродственных источников и более ровное окно активности.",
      suspiciousLikeTitle: "Паттерн, похожий на подозрительный",
      suspiciousLikeDescription:
        "Попробуйте более высокую плотность транзакций, больше уникальных адресов отправителей или необычно фрагментированную активность. Идея: много входящих источников, сжатое время и непоследовательное поведение переводов.",
    },
  },

  header: {
    brandTitle: "CHAINEYE FORENSICS",
    brandSubtitle: "ДВИЖОК ОБНАРУЖЕНИЯ ON-CHAIN АНОМАЛИЙ",
    networkLabel: "Сеть",
    networkValue: "Ganache Localnet",
    aiModelLabel: "AI-модель",
    aiModelValue: "XGBoost",
    languageSwitcherAriaLabel: "Изменить язык",
    connectWallet: "Подключить кошелёк",
    disconnectWallet: "Отключить кошелёк",
    web3Access: "Доступ к Web3",
    selectWalletProvider: "Выберите провайдера кошелька",
    walletModalDescription:
      "Подключите свой кошелёк децентрализованной идентичности, чтобы включить проверку аккаунта и функции взаимодействия со smart contract.",
    metamaskWallet: "Кошелёк MetaMask",
    walletConnect: "WalletConnect",
    detected: "Обнаружено",
    unavailable: "Недоступно",
    cancel: "Отмена",
  },
  graphicsPanel: {
    badge: "GRAPHICS PANEL",
    title: "Форензик-сигналы в стиле рынка",
    subtitle: "Компактная визуализация метрик для текущей активности кошельков",

    tabs: {
      risk: "Риск",
      eth: "ETH",
      erc20: "ERC20",
      velocity: "Скорость",
    },

    noData: "Пока нет данных для отображения",

    overview: {
      totalRecords: "Всего записей",
      suspiciousRate: "Доля подозрительных",
      avgRisk: "Средний риск",
      avgEth: "Средний полученный ETH",
    },

    chart: {
      eyebrow: "ДВИЖЕНИЕ МЕТРИКИ",
      title: "Линейный тренд по загруженным записям",
      subtitle: "Более чистый market-style вид для выбранной метрики",
      currentLabel: "Текущее",
      deltaLabel: "Изменение",
    },

    distribution: {
      eyebrow: "БАЛАНС КЛАССОВ",
      title: "Текущее соотношение SAFE и SUSPICIOUS",
      subtitle: "Распределение классифицированных кошельков в загруженном наборе данных",
      safe: "Безопасные",
      suspicious: "Подозрительные",
    },

    leaders: {
      eyebrow: "ЛИДЕРЫ",
      title: "Наибольшие значения по выбранной метрике",
      subtitle: "Топ кошельков по активной метрике",
    },

    insight: {
      eyebrow: "ИНСАЙТ МЕТРИКИ",
      title: "Что подчеркивает этот режим",
      descriptions: {
        risk: "Режим риска подчеркивает давление модельного скоринга и помогает быстрее замечать кошельки с выраженными аномальными признаками.",
        eth: "Режим ETH акцентирует масштаб входящего объема и помогает выявлять кошельки с необычно большим полученным значением.",
        erc20: "Режим ERC20 фокусируется на активности токеновых транзакций и помогает выявлять плотные паттерны взаимодействия.",
        velocity: "Режим скорости приблизительно показывает плотность транзакций во времени и помогает замечать сжатые всплески активности.",
      },
    },
  },
} as const;

export default ru;