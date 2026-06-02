import en from "./en";

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
    walletLinked: "Кошелек подключен",
    walletOffline: "Кошелек офлайн",
    description:
      "Используйте левую навигацию, чтобы просматривать записи, запускать проверки и моделировать входящие профили транзакций.",
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
    systemReady: "SYS // Движок форензики ChainEye успешно инициализирован.",
    ipfsReady: "IPFS // Соединение подтверждено. Буфер записей CID загружен.",
    modelReady: "AI // Веса модели XGBoost активны.",
    fetchedRecords: (count: number) =>
      `REST // Загружено ${count} записей кошельков из серверного хранилища.`,
    fetchFailed: (status: number) =>
      `ERR // Не удалось загрузить датасет. Код ${status}.`,
    backendTimeout: "ERR // Истекло время ожидания соединения с backend-узлом.",
    walletConnected: "WALLET // Подключено через подпись аккаунта MetaMask.",
    walletDisconnected:
      "WALLET // Сессия отключена по инициативе пользователя.",
    auditSearching: (id: string) =>
      `AUDIT // Запрос к реестру для узла: [${id}]`,
    auditFound: (userId: string, classification: string) =>
      `AUDIT // Аккаунт найден: ${userId}, статус ${classification}.`,
    auditNotFound: (id: string) =>
      `AUDIT // Не удалось найти запись в реестре для узла: [${id}]`,
    auditBroken: "ERR // Поток получения данных из реестра прерван.",
    simApproved: (classification: string) =>
      `SIM // Сетевая запись подтверждена. Метка: ${classification.toUpperCase()}`,
    simFailed: (status: number) =>
      `ERR // Симуляция завершилась ошибкой со статусом ${status}.`,
    simBroken: "ERR // Передача данных симуляции прервана.",
  },

  overview: {
    cards: {
      datasetVolumeLabel: "Объем датасета",
      datasetVolumeDesc: "Оцененные записи кошельков",
      suspiciousRateLabel: "Доля подозрительных",
      suspiciousRateDesc: "Помечено в текущем датасете",
      storageLayerLabel: "Слой хранения",
      storageLayerTitle: "IPFS + реестр CID",
      storageLayerDesc: "Закрепленная форензическая ссылка на хранилище",
    },

    batch: {
      label: "Пакетный обзор",
      title: "Предварительно оцененный датасет кошельков",
    },

    filters: {
      all: "ВСЕ",
      safe: "БЕЗОПАСНО",
      suspicious: "ПОДОЗРИТЕЛЬНО",
    },

    table: {
      userId: "ID пользователя",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqContract: "Уник. контракт",
      uniqToken: "Уник. токен",
      uniqRecAddr: "Уник. адрес получателя",
      timeDiff: "Разница времени",
      ethReceived: "Получено ETH",
      avgMinPerRec: "Ср. мин / получение",
      avgVal: "Ср. значение",
      totalTx: "Всего Tx",
      uniqFrom: "Уник. отправители",
      risk: "Риск",
      status: "Статус",
    },

    telemetry: "Форензическая телеметрия в реальном времени",
  },

  audit: {
    hero: {
      badge: "Проверка аккаунта",
      title: "Проверка отдельного кошелька или записи пользователя",
      description:
        "Ищите по внутреннему ID пользователя или адресу кошелька, чтобы увидеть результат модели, риск-скор и полный набор форензических признаков, использованных при оценке.",
    },

    summary: {
      lookupModeLabel: "Режим поиска",
      lookupModeValue: "ID пользователя / Кошелек",
      outputLabel: "Вывод",
      outputValue: "Риск + Признаки",
      statusLabel: "Статус",
      statusValue: "Запрос в реальном времени",
    },

    search: {
      placeholder:
        "Введите ID пользователя или адрес кошелька (например, USR-0001 или 0x...)",
      button: "Проверить аккаунт",
    },

    states: {
      loading: "Выполняется проверка аккаунта, пожалуйста, подождите...",
      notFoundLabel: "Запись не найдена",
      notFoundDescription:
        "Идентификатор не найден в реестре предварительно оцененного датасета. Попробуйте другой ID пользователя или адрес кошелька.",
    },

    result: {
      label: "Результат проверки",
      title: "Сводка по идентификатору",
      userId: "ID пользователя",
      riskScore: "Риск-скор",
      walletAddress: "Адрес кошелька",
      interpretationLabel: "Интерпретация",
      suspiciousInterpretation:
        "Этот идентификатор показывает подозрительный профиль риска на основе извлеченных транзакционных признаков.",
      safeInterpretation:
        "Этот идентификатор в данный момент находится в безопасном диапазоне на основе оцененного шаблона транзакций.",
    },

    featureMap: {
      label: "Карта форензических признаков",
      title: "Оцененные индикаторы",
      featureCount: "10 признаков",
      table: {
        feature: "Признак",
        value: "Значение",
      },
    },

    features: {
      totalErc20Tx: "Всего ERC20 tnxs",
      uniqRecContractAddr: "Уник. адрес контракта получателя ERC20",
      uniqRecTokenName: "Уник. имя токена получателя ERC20",
      uniqRecAddr: "Уник. адрес получателя ERC20",
      timeDiff: "Разница между первой и последней транзакцией (мин)",
      totalEtherReceived: "Всего получено ether",
      avgMinBetweenReceived: "Среднее число минут между входящими транзакциями",
      avgValReceived: "Среднее полученное значение",
      totalTransactions:
        "Всего транзакций (включая транзакцию создания контракта)",
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
      identity: "Идентификатор",
      erc20Activity: "Активность ERC20",
      valueTiming: "Значение и время",
      structuralSignals: "Структурные сигналы",
    },

    fields: {
      userId: "ID пользователя",
      walletAddress: "Адрес кошелька",
      totalErc20Tx: "Всего ERC20 Tx",
      uniqueContract: "Уникальный контракт",
      uniqueToken: "Уникальный токен",
      uniqueReceiverAddress: "Уникальный адрес получателя",
      timeDiffMins: "Разница времени (мин)",
      ethReceived: "Получено ETH",
      avgMinBetweenReceived: "Среднее время между получениями",
      avgValueReceived: "Среднее полученное значение",
      totalTxInclCreate: "Всего Tx (вкл. создание контракта)",
      uniqueFromAddresses: "Уникальные адреса отправителей",
    },

    placeholders: {
      userId: "например, USR-0051",
      walletAddress: "0x...",
    },

    preview: {
      label: "Сводка отправки",
      title: "Предпросмотр текущего payload",
      userId: "ID пользователя",
      walletAddress: "Адрес кошелька",
      featureCount: "Количество признаков",
      featureCountValue: "10 индикаторов",
      notProvided: "Не указано",
      walletFallback: "0x...",
    },

    note: {
      label: "Примечание к отправке",
      description:
        "Эта форма отправляет вручную введенный набор признаков для немедленной оценки в текущем потоке симуляции.",
    },

    submitButton: "Отправить поток транзакции",
  },

  howItWorks: {
    hero: {
      badge: "Пайплайн обнаружения",
      title: "Как ChainEye обрабатывает подозрительную активность кошельков",
      description:
        "ChainEye объединяет отправку данных на стороне клиента, off-chain AI-анализ и on-chain закрепление CID в один процесс обнаружения мошенничества для прозрачного форензического отслеживания.",
    },

    summary: {
      featuresLabel: "Признаки",
      featuresValue: "10 входов",
      aiEngineLabel: "AI-движок",
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
        "Система собирает 10 индикаторов на уровне транзакций, включая активность ERC20, шаблоны взаимодействия кошелька, полученную стоимость и временное поведение.",
      step2Title: "Off-chain AI оценка риска",
      step2Description:
        "Сервис FastAPI преобразует входной payload и запускает модель XGBoost, чтобы классифицировать каждый кошелек как БЕЗОПАСНЫЙ или ПОДОЗРИТЕЛЬНЫЙ в реальном времени.",
      step3Title: "IPFS + реестр контракта",
      step3Description:
        "Обновленные записи датасета сохраняются в IPFS, а последний CID закрепляется on-chain, чтобы каждая ссылка на хранилище оставалась прозрачной и проверяемой.",
    },

    pipeline: {
      label: "Системный пайплайн",
      title: "Сводка выполнения",
      frontendLabel: "Frontend",
      frontendDesc:
        "Данные кошелька и транзакционные признаки отправляются с клиентской панели.",
      backendLabel: "Backend",
      backendDesc:
        "FastAPI оценивает payload и возвращает метку мошенничества с риск-скором.",
      storageLayerLabel: "Слой хранения",
      storageLayerDesc:
        "Последний снимок датасета загружается в IPFS и ссылается on-chain через CID.",
    },

    whyItMatters: {
      label: "Почему это важно",
      description:
        "Модель работает off-chain для скорости, а регистрация CID добавляет проверяемый блокчейн-слой для аудируемости.",
    },
  },
  header: {
  brandTitle: "CHAINEYE FORENSICS",
  brandSubtitle: "ДВИЖОК ОБНАРУЖЕНИЯ АНОМАЛИЙ ON-CHAIN",
  networkLabel: "Сеть",
  networkValue: "Ganache Localnet",
  aiModelLabel: "AI-модель",
  aiModelValue: "XGBoost",
  languageSwitcherAriaLabel: "Сменить язык",
  connectWallet: "Подключить кошелек",
  disconnectWallet: "Отключить кошелек",
  web3Access: "Доступ Web3",
  selectWalletProvider: "Выберите провайдера кошелька",
  walletModalDescription:
    "Подключите ваш децентрализованный кошелек идентификации, чтобы включить функции проверки аккаунта и взаимодействия со смарт-контрактами.",
  metamaskWallet: "Кошелек MetaMask",
  walletConnect: "WalletConnect",
  detected: "Обнаружено",
  unavailable: "Недоступно",
  cancel: "Отмена",
},
} as const;

export default ru;