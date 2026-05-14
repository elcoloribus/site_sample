import { useState, useEffect, Fragment } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  X,
  Search,
  Star,
  Download,
  Shield,
  Box,
  Sparkles,
  Zap,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Send,
  Play,
  Lock,
  Bot,
  Cpu,
  FileCheck,
  FileText,
  Layers,
  Menu,
  SlidersHorizontal,
  Settings,
  Folder,
  Circle,
  GitBranch,
  Save,
  Disc,
  CheckCircle2,
  Plug,
  Terminal,
  ChevronDown,
  Minus,
  User2,
  Building2,
} from "lucide-react";

// ───────────────────────────────────────────────────────────────────────────
// DATA
// ───────────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "act-reconciliation",
    name: "Сверка актов",
    type: "AI-агент",
    category: "Финансы",
    platforms: ["ROBIN", "N8N"],
    rating: 4.8,
    downloads: 1240,
    verified: true,
    free: true,
    icon: FileCheck,
    short:
      "Сопоставляет акты выполненных работ с договорами и реестрами оплат, фиксирует расхождения.",
    description:
      "Агент автоматически сверяет акты выполненных работ с договорами и регистрами оплат. На входе — сканы или PDF, на выходе — отчёт о расхождениях с указанием сумм, периодов и контрагентов. Сокращает время закрытия месяца в финансовой службе на 60–70%.",
    llms: ["GigaChat 4.0 Pro", "YandexGPT 5", "T-Pro"],
    version: "1.8.2",
    author: "ROBIN Lab",
    updated: "28 апреля 2026",
  },
  {
    id: "contract-check",
    name: "Проверка договоров",
    type: "AI-агент",
    category: "Сервис",
    platforms: ["ROBIN", "Dify"],
    rating: 4.9,
    downloads: 2105,
    verified: true,
    free: false,
    icon: Shield,
    short:
      "Извлекает ключевые условия договоров, сравнивает с шаблоном компании, помечает риски.",
    description:
      "Юридический агент для проверки входящих и исходящих договоров. Извлекает реквизиты, предмет, сроки, ответственность, сравнивает с эталонным шаблоном, детектирует «красные флаги» — невыгодные пени, односторонний выход, неустойки. Возвращает комментарии в формате Track Changes для MS Word.",
    llms: ["GigaChat 4.0 Pro", "YandexGPT 5 Pro", "Llama 3.3 70B"],
    version: "2.4.1",
    author: "ROBIN Lab",
    updated: "28 апреля 2026",
  },
  {
    id: "smart-search",
    name: "Интеллектуальный поиск",
    type: "AI-агент",
    category: "Сервис",
    platforms: ["ROBIN"],
    rating: 4.7,
    downloads: 870,
    verified: true,
    free: true,
    icon: Search,
    short:
      "Семантический поиск по корпоративным базам знаний — СЭД, Confluence, файловые шары.",
    description:
      "Подключается к внутренним хранилищам через MCP-коннекторы, индексирует документы и обеспечивает семантический поиск с цитированием первоисточников. Поддерживает многошаговые запросы и уточнения через диалог.",
    llms: ["GigaChat 4.0", "YandexGPT 5", "Qwen 2.5 72B"],
    version: "1.3.0",
    author: "ROBIN Lab",
    updated: "12 марта 2026",
  },
  {
    id: "osv-1c",
    name: "Формирование ОСВ в 1С",
    type: "RPA",
    category: "Финансы",
    platforms: ["ROBIN", "1C"],
    rating: 4.9,
    downloads: 3410,
    verified: true,
    free: true,
    icon: Layers,
    short:
      "Автоматическая выгрузка оборотно-сальдовых ведомостей по списку контрагентов и периодам.",
    description:
      "RPA-сценарий для бухгалтерии: открывает 1С под учёткой бота, формирует ОСВ в нужных разрезах, выгружает в Excel и отправляет ответственному. Поддерживает все типовые конфигурации 1С:Бухгалтерия и 1С:ERP.",
    llms: [],
    version: "3.1.0",
    author: "ROBIN Lab",
    updated: "20 апреля 2026",
  },
  {
    id: "upd-recognition",
    name: "Распознавание УПД",
    type: "RPA",
    category: "Финансы",
    platforms: ["ROBIN"],
    rating: 4.8,
    downloads: 2760,
    verified: true,
    free: false,
    icon: FileCheck,
    short:
      "Извлечение реквизитов из универсальных передаточных документов с загрузкой в учётную систему.",
    description:
      "Гибрид RPA + AI: распознаёт сканы и PDF УПД, извлекает реквизиты сторон, номенклатуру, суммы и НДС. Загружает данные в 1С через типовой обмен или прямой API. Точность распознавания на чистых сканах — 98%.",
    llms: ["YandexGPT 5", "GigaChat 4.0 Pro"],
    version: "2.7.4",
    author: "ROBIN Lab",
    updated: "18 апреля 2026",
  },
  {
    id: "kedo",
    name: "КЭДО — массовая отправка",
    type: "RPA",
    category: "HR",
    platforms: ["ROBIN", "1C"],
    rating: 4.7,
    downloads: 1580,
    verified: true,
    free: false,
    icon: Send,
    short:
      "Кадровый ЭДО: формирование, подписание и рассылка пакетов документов сотрудникам.",
    description:
      "Сценарий для HR-департамента: автоматически собирает кадровые документы (приказы, заявления, согласия), отправляет на подпись через КЭДО-провайдеров и контролирует статусы. Интегрируется с СБИС, Контур.Диадок, ROBIN.КЭДО.",
    llms: [],
    version: "1.9.1",
    author: "ROBIN Lab",
    updated: "15 апреля 2026",
  },
  {
    id: "mcp-1c",
    name: "MCP · 1С Connector",
    type: "MCP",
    category: "Финансы",
    platforms: ["ROBIN", "Кросс"],
    rating: 4.9,
    downloads: 4020,
    verified: true,
    free: true,
    icon: Plug,
    short:
      "Двусторонний коннектор к 1С: чтение справочников, регистров, документов; запись через интерфейсные методы.",
    description:
      "Универсальный коннектор протокола MCP для всех типовых конфигураций 1С 8.3. Позволяет AI-агентам читать данные и выполнять записи без отдельных интеграционных решений. Работает через HTTP-сервисы 1С с авторизацией по сертификатам.",
    llms: [],
    version: "4.0.2",
    author: "ROBIN Lab",
    updated: "30 апреля 2026",
  },
  {
    id: "mcp-browser",
    name: "MCP · Browser Control",
    type: "MCP",
    category: "Сервис",
    platforms: ["ROBIN", "Кросс"],
    rating: 4.6,
    downloads: 2240,
    verified: true,
    free: true,
    icon: Terminal,
    short:
      "Управление браузерами через CDP. Headless и headful режимы, перехват сетевых запросов.",
    description:
      "MCP-коннектор для управления Chromium, Edge и Firefox через Chrome DevTools Protocol. Поддерживает запись действий, перехват сетевых запросов, обход капчи через интеграцию с anti-captcha сервисами. Идеально для веб-скрейпинга в энтерпрайзе.",
    llms: [],
    version: "2.2.0",
    author: "ROBIN Lab",
    updated: "22 апреля 2026",
  },
  {
    id: "mcp-excel",
    name: "MCP · Excel",
    type: "MCP",
    category: "Финансы",
    platforms: ["ROBIN", "Кросс"],
    rating: 4.8,
    downloads: 3690,
    verified: true,
    free: true,
    icon: Plug,
    short:
      "Чтение, запись, формульный пересчёт книг Excel. Поддержка xlsx, xlsm, защищённых файлов.",
    description:
      "Полнофункциональный MCP-коннектор к Microsoft Excel. Открывает книги без запуска приложения, поддерживает формулы, сводные таблицы, защищённые листы. AI-агенты могут читать и формировать отчёты в нативном формате.",
    llms: [],
    version: "1.6.3",
    author: "ROBIN Lab",
    updated: "19 апреля 2026",
  },
  {
    id: "lead-scoring",
    name: "Скоринг лидов",
    type: "AI-агент",
    category: "Продажи",
    platforms: ["ROBIN", "N8N"],
    rating: 4.7,
    downloads: 1830,
    verified: true,
    free: false,
    icon: Zap,
    short:
      "Оценивает входящие лиды по 12 критериям, обогащает данными из открытых источников, расставляет приоритеты в CRM.",
    description:
      "AI-агент для отдела продаж: подключается к amoCRM, Bitrix24 или 1С:CRM, оценивает каждый входящий лид по 12 критериям (отрасль, размер компании, история обращений, активность в digital), обогащает контакт данными из открытых источников и автоматически расставляет приоритеты.",
    llms: ["GigaChat 4.0 Pro", "YandexGPT 5"],
    version: "1.4.0",
    author: "ROBIN Lab",
    updated: "10 апреля 2026",
  },
  {
    id: "hr-onboarding",
    name: "Бот онбординга",
    type: "AI-агент",
    category: "HR",
    platforms: ["ROBIN", "Dify"],
    rating: 4.8,
    downloads: 1120,
    verified: true,
    free: true,
    icon: Bot,
    short:
      "Сопровождает новичка первые 90 дней: отвечает на вопросы, выдаёт задания, фиксирует прогресс для HR-менеджера.",
    description:
      "Чат-бот для адаптации новых сотрудников. Работает в Telegram или корпоративном мессенджере, отвечает на вопросы по политикам компании (на основе ваших регламентов), назначает задания на 1/30/90 дней, собирает обратную связь и формирует отчёт для HR-BP.",
    llms: ["GigaChat 4.0", "YandexGPT 5"],
    version: "2.0.1",
    author: "ROBIN Lab",
    updated: "05 апреля 2026",
  },
  {
    id: "oee-monitor",
    name: "OEE Monitor",
    type: "RPA",
    category: "Производство",
    platforms: ["ROBIN"],
    rating: 4.9,
    downloads: 940,
    verified: true,
    free: false,
    icon: Cpu,
    short:
      "Снимает показатели OEE с производственных линий, формирует посменные отчёты для руководителя цеха.",
    description:
      "Сценарий для производства: подключается к АСУ ТП и MES-системам, рассчитывает показатели OEE (доступность × производительность × качество), выявляет простои и формирует посменные отчёты для начальника цеха и директора по производству.",
    llms: [],
    version: "1.2.0",
    author: "ROBIN Lab",
    updated: "01 апреля 2026",
  },
];

const CATEGORIES = ["Все", "Финансы", "Продажи", "HR", "Сервис", "Производство"];
const TYPES = ["Все", "AI-агент", "RPA", "MCP"];

// ───────────────────────────────────────────────────────────────────────────
// LOGO
// ───────────────────────────────────────────────────────────────────────────

function RobinBirdLogo({ className = "h-8 w-auto", iconOnly = false }) {
  return (
    <svg
      viewBox={iconOnly ? "0 0 70 69" : "0 0 345 69"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ROBIN"
      role="img"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M27.8387 59.3461L24.0101 68.8461H26.3305L30.3524 59.923L27.8387 59.3461Z" fill="#EE2340"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M38.2026 58.8847L42.2246 56.7693C41.3351 58.8077 40.0202 62.8847 38.2026 69H36.0757C37.5066 62.6154 38.2413 59.2308 38.2026 58.8847Z" fill="#EE2340"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.867 28.0385C4.98339 34.6154 -1.59087 42.5385 0.342734 54.2308C1.15485 59.1923 3.4365 63.1154 7.14902 65.9615C6.72363 60.9231 8.07715 57.0769 11.2483 54.4615C14.3807 51.8462 19.3694 50.5385 26.1757 50.5385L13.0272 26.9615C12.5244 27.4231 12.1377 27.8077 11.867 28.0385Z" fill="#C72329"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M53.7875 31.6923C55.5278 36.6154 68.9857 46.1154 68.9857 46.8077
            C68.9857 48.0385 66.8587 51.0385 62.7981 51.0385
            C59.2016 51.0385 58.7762 52.2308 55.2957 51.4615
            C49.8043 57.4231 43.1527 60.5769 35.3796 60.9231
            C34.8769 60.9615 34.4128 60.9615 33.9101 60.9615
            C33.4074 60.9615 32.866 60.9615 32.3632 60.9231
            C31.8991 60.8846 31.3964 60.8462 30.9323 60.8077
            C25.5569 60.2692 21.419 58.3077 18.3253 56.0385
            C12.3311 51.8846 8.07715 45.3846 8.07715 37.5
            C8.07715 33.9615 8.57989 30.6154 9.54669 27.6539
            C10.1654 25.1539 10.8229 22.5385 11.0936 19.6923
            C12.5244 4.38462 19.2147 0 28.38 0C32.3245 0 35.3023 1.3077 37.0812 3.03847
            C38.8601 4.8077 39.6722 5.96154 40.407 7.92308
            C40.6777 9.88462 40.7937 11.3462 40.7937 12.3077
            C40.7937 13.9231 40.4843 15.4615 39.8656 16.8846
            C48.2574 20.8846 51.2738 24.6539 53.7875 31.6923Z" fill="#EF3747"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M65.0799 58.9231C68.1737 62.5001 71.1901 65.9616 69.2565 66.577
            C67.3229 67.1924 61.9862 64.7308 61.9862 65.9616
            C61.9862 67.1924 61.5221 68.5385 60.4006 68.8847
            C59.2791 69.2308 58.467 68.5385 57.2295 67.2308
            C55.992 65.9231 54.0584 61.1539 51.506 55.0001
            C46.8267 58.6924 41.4513 60.6539 35.3798 60.9231
            C34.877 60.9616 34.413 60.9616 33.9102 60.9616
            C33.4075 60.9616 32.8661 60.9616 32.3634 60.9231
            C31.8993 60.8847 31.3966 60.8462 30.9325 60.8078
            C25.5571 60.2693 21.4192 58.3077 18.3254 56.0385
            C18.016 55.8077 17.5133 55.4616 16.8945 55.0001
            C25.4797 57.1924 32.1313 56.3077 36.772 52.4231
            C41.4513 48.5 43.2302 42.7693 42.1087 35.2308
            C45.7826 38.3462 50.0365 41.7308 55.76 42.9231
            C59.0471 43.6155 62.1022 43.3077 63.6104 42.2308
            C67.1682 45.1154 68.9471 46.6539 68.9471 46.8462
            C68.9471 48.077 66.8202 51.077 62.7596 51.077
            C60.6326 51.077 59.6272 51.5 58.4283 51.6539
            C61.058 54.4231 63.533 57.1539 65.0799 58.9231Z" fill="#C72329"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M29.192 12.0001C29.5401 12.5001 30.1201 12.8462 30.7389 12.9616C31.319 13.0385 31.8604 12.9232 32.2858 12.6539C32.6725 12.3847 33.0205 11.9231 33.0979 11.3462C33.1752 10.7308 33.0206 10.1155 32.6338 9.577C31.8604 8.46162 30.5069 8.11546 29.5401 8.73084C28.5733 9.34623 28.3799 10.8847 29.192 12.0001Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M36.6559 6.19228C36.8492 5.80766 37.1586 5.49997 37.5453 5.30767
            C37.8547 5.11536 38.2414 5.03844 38.6668 4.96151
            C39.0922 4.88459 39.4789 4.88459 40.059 4.88459
            C40.2524 4.88459 40.291 4.88459 40.3297 4.88459
            C40.8325 4.88459 41.6059 4.96151 42.8047 5.11536
            C42.9208 5.11536 43.0754 5.15382 43.2301 5.15382
            C43.3848 5.19228 43.4235 5.19228 43.8102 5.23074
            C43.9649 5.23074 44.0809 5.30766 44.1583 5.46151
            C44.2356 5.53843 44.2356 5.65382 44.2356 5.73075
            C44.2356 5.84613 44.1969 5.92305 44.1583 6.0769
            C44.0809 6.2692 43.9649 6.49997 43.8102 6.80766
            C43.5395 7.30766 43.1528 7.96151 42.6114 8.88458
            C42.5727 8.92305 42.5727 8.9615 42.534 9.03843
            C42.418 9.2692 41.9539 9.99997 41.8766 10.1154
            C41.4899 10.7692 41.2192 11.1538 40.9485 11.4615
            C40.8711 11.5384 40.8325 11.6154 40.7551 11.6538
            C40.7938 12.1538 40.7938 12.6538 40.7551 13.2692
            C40.6778 14.2692 40.5231 15 40.3297 15.5384
            C37.1199 16.9615 33.8328 17.4231 30.391 16.8846
            C25.2863 16.1154 23.2753 9.7692 25.2476 6.15381
            C27.1812 2.53843 33.0594 4.11536 36.2691 6.99997L36.3078 7.03844
            C36.4239 6.7692 36.5399 6.46151 36.6559 6.19228Z
            M29.1922 12
            C29.5402 12.5 30.1203 12.8461 30.739 12.9615
            C31.3191 13.0384 31.8605 12.9231 32.2859 12.6538
            C32.6727 12.3846 33.0207 11.923 33.098 11.3461
            C33.1754 10.7307 33.0207 10.1154 32.634 9.5769
            C31.8605 8.46151 30.507 8.11536 29.5402 8.73074
            C28.5734 9.34612 28.3801 10.8846 29.1922 12Z
            M29.8109 11.4615
            C29.8496 11.5384 29.8883 11.5769 29.9269 11.6154
            C30.3523 12.2307 31.5125 12.3461 32.0539 11.7692
            C32.5566 11.1923 32.4406 10.4231 32.0539 9.92305
            C31.6672 9.38459 30.8164 9.19227 30.275 9.61535
            C30.159 9.69227 30.0816 9.80767 30.0043 9.92305
            C30.3523 9.7692 30.8551 9.88458 31.0871 10.2307
            C31.3578 10.6154 31.2418 11.2307 30.8937 11.4615
            C30.5457 11.6538 30.1203 11.6538 29.8109 11.4615Z" fill="#C72329"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M43.1527 5.99994C42.998 5.99994 42.882 5.96147 42.7273 5.96147
            C41.5671 5.80763 40.8324 5.73071 40.3683 5.73071
            C40.291 5.73071 40.2523 5.73071 40.0589 5.73071
            C39.5175 5.73071 39.1695 5.7307 38.8214 5.76917
            C38.1253 5.88455 37.6613 6.11532 37.4292 6.57686
            C37.2745 6.88455 37.1199 7.3461 37.0812 7.8461
            C37.0038 8.5384 37.1198 9.23071 37.4292 9.96148
            C37.7386 10.6153 38.0867 11.0384 38.5507 11.2307
            C38.8988 11.3846 39.2468 11.423 39.5949 11.3846
            C39.8269 11.3461 40.0589 11.1923 40.3296 10.923
            C40.5617 10.6538 40.8324 10.3076 41.1804 9.69225
            C41.2578 9.57686 41.7218 8.8461 41.8378 8.61533
            C41.8765 8.57687 41.9152 8.49993 41.9152 8.46147
            C42.4566 7.5384 42.8433 6.88455 43.0754 6.42302
            C43.1527 6.26917 43.23 6.15379 43.2687 6.0384
            C43.23 6.0384 43.1913 6.0384 43.1527 5.99994Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.546 49.8077C29.5015 49.8077 34.2968 45 34.2968 39.1154C34.2968 33.1923 29.4628 28.4231 23.546 28.4231C17.5905 28.4231 12.7952 33.2308 12.7952 39.1154C12.7952 45.0385 17.6292 49.8077 23.546 49.8077Z" fill="#C72329"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.3809 40.1539L14.4195 39.2692V38.3462
            C14.4195 38.3077 14.4582 38.3077 14.4582 38.3077L16.6625 37.9615L16.7785 37.5385
            C16.9719 36.8462 17.2039 36.2692 17.5133 35.7308L17.7453 35.3846L16.3918 33.5385
            C16.3531 33.5 16.3531 33.4615 16.3918 33.4231L17.0492 32.6539L17.668 32.0385
            C17.668 32.0385 17.7067 32 17.7453 32.0385L19.5629 33.3462L19.911 33.1154
            C20.491 32.7692 21.1098 32.5 21.7286 32.3462L22.1153 32.2308L22.502 30.0385
            C22.502 30 22.5407 30 22.5407 30H24.3582
            C24.3969 30 24.3969 30.0385 24.3969 30.0385L24.7836 32.2308L25.1704 32.3462
            C25.8278 32.5 26.4465 32.7692 26.9879 33.0769L27.336 33.3077L29.1923 32
            C29.2309 32 29.2696 32 29.2696 32L30.5458 33.2692
            C30.5458 33.2692 30.5845 33.3077 30.5458 33.3462L29.2309 35.1923L29.463 35.5385
            C29.811 36.0769 30.043 36.6923 30.1977 37.3462L30.3138 37.7308L32.518 38.1154
            C32.5567 38.1154 32.5567 38.1538 32.5567 38.1538V39.9615
            C32.5567 40 32.518 40 32.518 40L30.3138 40.3846L30.1977 40.7692
            C30.043 41.4231 29.7723 42.0385 29.463 42.5769L29.2309 42.9231L30.5458 44.7692
            C30.5845 44.8077 30.5845 44.8462 30.5458 44.8462L29.2696 46.1154
            C29.2696 46.1154 29.2309 46.1539 29.1923 46.1154L27.336 44.8077L26.9879 45.0385
            C26.4465 45.3462 25.8665 45.6154 25.2477 45.7692L24.861 45.8846L24.4743 48.1154
            C24.4743 48.1539 24.4356 48.1538 24.4356 48.1538H22.618
            C22.5793 48.1538 22.5793 48.1154 22.5793 48.1154L22.1926 45.9231L21.8059 45.8077
            C21.1098 45.6154 20.5297 45.3846 19.9883 45.0769L19.6403 44.8462L17.784 46.1923
            C17.7453 46.2308 17.7066 46.2308 17.7066 46.1923L16.4305 44.9231
            C16.4305 44.9231 16.3918 44.8846 16.4305 44.8462L17.7453 43.0385L17.552 42.6923
            C17.2039 42.0769 16.9332 41.5 16.7785 40.8846L16.6625 40.5L14.4195 40.1154
            C14.4195 40.1923 14.3809 40.1539 14.3809 40.1539Z
            M20.143 35.6923
            C18.2481 37.5769 18.2481 40.6923 20.143 42.5769
            C22.0766 44.5 25.1704 44.5 27.0653 42.5769
            C28.9989 40.6538 28.9989 37.5769 27.0653 35.6923
            C25.1704 33.8077 22.0766 33.8077 20.143 35.6923Z
            M24.9383 37.8462
            C24.2036 37.1154 23.0047 37.1154 22.3086 37.8462
            C21.5739 38.5769 21.5739 39.7692 22.3086 40.4615
            C23.0434 41.1923 24.2036 41.1923 24.9383 40.4615
            C25.6731 39.7308 25.6731 38.5385 24.9383 37.8462Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M110.151 58.2616H101.866V10.7384C104.472 10.7384 114.894 10.6041 116.231 10.6041
            C129.126 10.6041 133.402 17.0479 133.402 25.237
            C133.402 33.3589 128.19 37.4534 124.315 38.7959L139.081 58.1945H128.992
            L115.963 40.4068H110.151V58.2616Z
            M115.83 18.3904
            C114.293 18.3904 112.355 18.4575 110.151 18.5247V32.6205H115.563
            C120.373 32.6205 124.582 30.2041 124.582 25.3041
            C124.582 21.6123 122.578 18.3904 115.83 18.3904Z
            M150.773 34.5
            C150.773 20.7397 160.862 10 175.36 10C189.391 10 200.015 19.7329 200.015 34.5
            C200.015 48.7301 189.391 59 175.36 59C161.263 59 150.773 49.2671 150.773 34.5
            Z
            M159.526 34.5C159.526 44.0315 166.474 51.2137 175.36 51.2137
            C185.316 51.2137 191.262 43.8973 191.262 34.5
            C191.262 24.6329 184.313 17.7863 175.36 17.7863
            C166.274 17.7863 159.526 24.6329 159.526 34.5Z
            M219.39 58.1945
            V10.8726C221.996 10.7384 228.277 10.537 233.02 10.537
            C244.312 10.537 248.588 15.7055 248.588 22.2836
            C248.588 27.7206 245.915 31.1438 241.84 33.0904V33.2247
            C246.517 34.3657 250.124 37.9904 250.124 44.3
            C250.124 54.1 242.575 58.5301 232.553 58.5301
            C228.277 58.5301 222.197 58.3959 219.39 58.1945Z
            M233.622 37.8562
            H227.742V50.4082C228.878 50.5424 230.882 50.7438 233.221 50.7438
            C238.833 50.7438 241.84 48.3945 241.84 43.8973
            C241.84 39.8699 238.766 37.8562 233.622 37.8562Z
            M232.887 18.3233
            C231.016 18.3233 229.145 18.3904 227.675 18.5247V30.5397H233.288
            C237.163 30.5397 240.303 28.5931 240.303 24.2301
            C240.37 20.4041 237.363 18.3233 232.887 18.3233Z
            M272.106 58.2616
            V10.7384H280.391V58.2616H272.106Z
            M344.866 58.2616H338.251
            L312.261 25.3712V58.2616H304.511V10.7384H311.125L337.115 43.763V10.7384H344.866
            V58.2616V58.2616Z" fill="#C72329"/>
    </svg>
  );
}

function RobinLogoMark({ className = "h-7 w-7" }) {
  // Minimal stylised mark: red rounded square with white "R"
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ROBIN"
      role="img"
    >
      <rect width="32" height="32" rx="7" fill="#C72329" />
      <path
        d="M11 9 h5 a4.5 4.5 0 0 1 1.2 8.85 L21 24 h-3.2 l-3.2-6 H13 v6 h-2.6 V9 z m2.6 2.4 v4.4 h2.4 a2.2 2.2 0 0 0 0-4.4 H13.6 z"
        fill="white"
      />
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// MAIN APP
// ───────────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedType, setSelectedType] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sandboxModalOpen, setSandboxModalOpen] = useState(false);
  const [sandboxStep, setSandboxStep] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState("idle"); // idle | processing | success

  // Reset scroll to top whenever active tab changes — мгновенно, без анимации.
  // Срабатывает на ЛЮБОЙ переключатель вкладок: header-nav, mobile drawer,
  // footer-links, CTA-кнопки и т.п., потому что все они идут через setActiveTab.
  useEffect(() => {
    // 1. Останавливаем любую запущенную smooth-scroll анимацию (на случай если
    //    CSS-правило html { scroll-behavior: smooth } активно где-то в проекте).
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    // 2. Мгновенный прыжок в (0, 0).
    window.scrollTo(0, 0);
    // 3. Возвращаем предыдущее значение, чтобы не сломать никакой smooth-scroll в других местах.
    document.documentElement.style.scrollBehavior = prevBehavior;
  }, [activeTab]);
  const [robinGuideOpen, setRobinGuideOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [authorFormSubmitted, setAuthorFormSubmitted] = useState(false);

  // Inject custom fonts and base styling once
  useEffect(() => {
    const styleId = "robin-fonts";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
      /* NO SERIF — entire site uses Inter (modern grotesque) for prose & UI,
         JetBrains Mono for code-like labels. Tailwind utilities like font-bold,
         font-semibold etc. work as normal: they only change font-weight, not family. */
      .font-code { font-family: 'JetBrains Mono', 'SF Mono', Menlo, monospace; font-feature-settings: "liga" 0; }
      /* ───────────────────────────────────────────────────────────────
         INDIGO ACCENT GRADIENT — used on every emphasised heading word
         in place of the former red-orange sunset gradient.
      ─────────────────────────────────────────────────────────────── */
      .text-accent-gradient {
        background: linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #DC2626 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        display: inline-block;
        font-weight: 800;
        letter-spacing: -0.01em;
      }
      /* ───────────────────────────────────────────────────────────────
         GRADIENT-STROKED ICONS — Lucide icons that reference the SVG
         linearGradient (id="robin-accent-grad", injected once at root)
         instead of a solid stroke color. Override the inline
         stroke="currentColor" presentation attribute via CSS specificity.
      ─────────────────────────────────────────────────────────────── */
      .icon-gradient path,
      .icon-gradient line,
      .icon-gradient circle,
      .icon-gradient polyline,
      .icon-gradient polygon,
      .icon-gradient rect {
        stroke: url(#robin-accent-grad) !important;
      }
      .scroll-fade-in { animation: scrollFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
      @keyframes scrollFadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .stagger-1 { animation-delay: 0.05s; }
      .stagger-2 { animation-delay: 0.10s; }
      .stagger-3 { animation-delay: 0.15s; }
      .stagger-4 { animation-delay: 0.20s; }
      ::selection { background: #c7d2fe; color: #1e1b4b; }
      html, body { overflow-x: hidden; max-width: 100%; }
      body { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif; color: #1A1C2E; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      img, svg, video { max-width: 100%; height: auto; }
      /* Прерываем очень длинные слова чтобы не вылезали за viewport на мобиле */
      h1, h2, h3, p { overflow-wrap: break-word; word-wrap: break-word; }
      /* Дополнительная подстройка размеров для очень узких экранов (<400px) */
      @media (max-width: 400px) {
        h1.hero-title { font-size: 1.625rem !important; line-height: 1.15 !important; }
        h1.page-title { font-size: 1.5rem !important; line-height: 1.2 !important; }
      }
      /* ─────────────────────────────────────────────────────────────
         VALUE CARDS GRID — 3 equal columns on desktop, single on mobile.
         All !important to override any Tailwind cascade conflicts and
         ensure correct rendering even before JIT processes utilities.
      ───────────────────────────────────────────────────────────────── */
      .value-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
        align-items: stretch !important;
      }
      @media (min-width: 768px) {
        .value-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
      }
      /* ─────────────────────────────────────────────────────────────
         FOOTER 3-COLUMN GRID — guarantees horizontal layout on md+
         regardless of Tailwind JIT timing on the CDN build.
      ───────────────────────────────────────────────────────────────── */
      .footer-cols {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 2.5rem !important;
      }
      @media (min-width: 768px) {
        .footer-cols {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 3rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Reset modal state when product changes
  useEffect(() => {
    setRobinGuideOpen(false);
    setDownloadStatus("idle");
  }, [selectedProduct]);

  // Reset sandbox step when modal closes
  useEffect(() => {
    if (!sandboxModalOpen) setSandboxStep(0);
  }, [sandboxModalOpen]);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== "Все" && p.category !== selectedCategory) return false;
    if (selectedType !== "Все" && p.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.short.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  const handleNavToCatalog = () => {
    setActiveTab("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavToRegister = () => {
    setActiveTab("register");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="font-body min-h-screen text-slate-900 selection:bg-indigo-200 overflow-x-hidden"
      style={{ background: "#F9F9F9" }}
    >
      {/* Global SVG defs for gradient-stroked Lucide icons (.icon-gradient class) */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <linearGradient id="robin-accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7C3AED" />
            <stop offset="50%"  stopColor="#EC4899" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </svg>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-16">
        {activeTab === "home" && (
          <HomeView
            onCatalog={handleNavToCatalog}
            onSandbox={() => setSandboxModalOpen(true)}
            onRegister={handleNavToRegister}
          />
        )}
        {activeTab === "catalog" && (
          <CatalogView
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={setSelectedProduct}
          />
        )}
        {activeTab === "contacts" && (
          <ContactsView
            authorFormSubmitted={authorFormSubmitted}
            setAuthorFormSubmitted={setAuthorFormSubmitted}
          />
        )}
        {activeTab === "register" && (
          <RegisterView onBack={() => setActiveTab("home")} />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          robinGuideOpen={robinGuideOpen}
          setRobinGuideOpen={setRobinGuideOpen}
          downloadStatus={downloadStatus}
          setDownloadStatus={setDownloadStatus}
          onContact={() => setContactFormOpen(true)}
        />
      )}
      {sandboxModalOpen && (
        <SandboxModal
          step={sandboxStep}
          setStep={setSandboxStep}
          onClose={() => setSandboxModalOpen(false)}
          onGoToCatalog={handleNavToCatalog}
        />
      )}
      {contactFormOpen && <ContactFormModal onClose={() => setContactFormOpen(false)} />}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ───────────────────────────────────────────────────────────────────────────

function Navigation({ activeTab, setActiveTab }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = [
    { id: "home",     label: "О сервисе" },
    { id: "catalog",  label: "Каталог" },
    { id: "contacts", label: "Контакты" },
  ];

  // Close drawer when tab changes
  const goTo = (id) => {
    setActiveTab(id);
    setDrawerOpen(false);
  };

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [drawerOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo — full bird+wordmark on all sizes */}
          <button
            onClick={() => goTo("home")}
            className="flex items-center transition-opacity duration-300 hover:opacity-75 -ml-1"
            aria-label="ROBIN — на главную"
          >
            <RobinBirdLogo className="h-7 sm:h-8 w-auto" />
          </button>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 rounded-full p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                  {/* Heartbeat — fires only for active tab.
                      Brand red #EF3747 (matches the logo). */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute top-1 right-1.5 flex h-1.5 w-1.5"
                    >
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: "#EF3747" }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-1.5 w-1.5"
                        style={{ backgroundColor: "#EF3747" }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right cluster: login (desktop), CTA, burger (mobile) */}
          <div className="flex items-center gap-2 md:gap-3">
            <button className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300">
              Войти
            </button>
            <PrimaryButton size="sm" onClick={() => goTo("register")}>
              <span className="hidden sm:inline">Запросить доступ</span>
              <span className="sm:hidden">Доступ</span>
            </PrimaryButton>

            {/* Burger — only on mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5 text-slate-700" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slide in from right, ~78vw width */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        tabs={tabs}
        activeTab={activeTab}
        onSelect={goTo}
      />
    </>
  );
}

function MobileDrawer({ open, onClose, tabs, activeTab, onSelect }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      {/* Panel — slides from right, 78% screen */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 right-0 z-50 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "78vw", maxWidth: 360 }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            Меню
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-5 h-5 text-slate-700" strokeWidth={2} />
          </button>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelect(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {tab.label}
                <ChevronRight className={`w-4 h-4 ${isActive ? "text-white/80" : "text-slate-400"}`} />
              </button>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Войти
          </button>
        </div>
      </aside>
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// HOME VIEW
// ───────────────────────────────────────────────────────────────────────────

function HomeView({ onCatalog, onSandbox, onRegister }) {
  return (
    <>
      <HeroSection onCatalog={onCatalog} onSandbox={onSandbox} onRegister={onRegister} />
      <PlatformsSection />
      <BusinessValueSection />
      <MetricsBand />
      <CtaFooterBlock onSandbox={onSandbox} onCatalog={onCatalog} onRegister={onRegister} />
    </>
  );
}

// ─── Rotating phrase for hero h1 ────────────────────────────────────────────
// Static "Автоматизация для" stays, the red bold phrase rotates every 2.8s
// with a smooth slide-up + fade. Container width is sized to the longest phrase
// to prevent CLS — invisible "ghost" copies hold the box at max width/height.
const ROTATING_PHRASES = [
  { text: "проверки договоров",      tag: "Юристы" },
  { text: "сверки актов",            tag: "Бухгалтерия" },
  { text: "поиска по базе знаний",   tag: "IT / Service Desk" },
  { text: "заполнения отчётов в 1С", tag: "Финансы" },
  { text: "оформления отпусков",     tag: "HR" },
  { text: "обработки обращений",     tag: "Клиентский сервис" },
];

function RotatingPhrase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // inline-grid: все 6 фраз отрисованы в одной grid-ячейке (1/1/2/2).
  // Контейнер автоматически принимает размер самой длинной/высокой фразы.
  // Между фразами переключается ТОЛЬКО opacity — никаких transform,
  // никакого position:absolute, никаких размерных изменений.
  return (
    <span
      style={{
        display: "inline-grid",
        verticalAlign: "baseline",
      }}
    >
      {ROTATING_PHRASES.map((phrase, i) => (
        <span
          key={i}
          aria-hidden={i !== index}
          style={{
            // Layout & animation
            gridArea: "1 / 1 / 2 / 2",
            opacity: i === index ? 1 : 0,
            transition: "opacity 500ms ease-out",
            pointerEvents: i === index ? "auto" : "none",
            whiteSpace: "nowrap",
            // Typography — explicit weight + display for reliable gradient rendering
            fontWeight: 800,
            display: "inline-block",
            // Energy-pulse gradient violet → pink → red — visually echoes
            // the PrimaryButton hover state and creates a sympathetic
            // connection between the rotating headline word and the CTA.
            background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #DC2626 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            letterSpacing: "-0.01em",
          }}
        >
          {phrase.text}
        </span>
      ))}
    </span>
  );
}

function HeroSection({ onCatalog, onSandbox, onRegister }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/60">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-100/40 via-transparent to-violet-100/30 blur-3xl pointer-events-none"
        style={{ width: "min(1000px, 100%)", height: 600, maxWidth: "100vw" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32">
        {/* TEXT BLOCK — all centered on a single vertical axis */}
        <div className="text-center max-w-3xl mx-auto scroll-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 md:mb-8 rounded-full border border-slate-200 bg-white/60 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-700">
              Российская RPA-платформа корпоративного уровня
            </span>
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight text-slate-900 mb-5 md:mb-7">
            Автоматизация для
            <br />
            <RotatingPhrase />
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
            Готовые No-code решения для автоматизации бизнес-процессов на базе
            ROBIN — российской платформы из реестра отечественного ПО.
            Полноценное использование — после авторизации в платформе
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton onClick={onRegister} icon={<ArrowRight className="w-4 h-4" />}>
              Запросить доступ
            </PrimaryButton>
            <SandboxButton onClick={onCatalog}>Смотреть каталог</SandboxButton>
          </div>

          {/* "How it works" link — opens 4-step sandbox modal */}
          <div className="flex justify-center mt-5 md:mt-6">
            <button
              type="button"
              onClick={onSandbox}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-colors duration-200">
                <Play
                  className="w-3 h-3 text-slate-500 group-hover:text-indigo-600 transition-colors duration-200"
                  strokeWidth={2.5}
                  fill="currentColor"
                />
              </span>
              <span className="group-hover:underline underline-offset-4 decoration-indigo-500/60">
                Как это работает
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 md:mt-10 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
              В реестре отечественного ПО
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
              Соответствие 152-ФЗ
            </div>
          </div>
        </div>

        {/* STUDIO BLOCK — wide illustration centered below text */}
        <div className="mt-16 md:mt-20 max-w-6xl mx-auto scroll-fade-in stagger-2">

          <CodeEditor />
        </div>
      </div>
    </section>
  );
}

// ─── ROBIN Studio scenarios ────────────────────────────────────────────────
// Data-driven scenarios for the interactive Studio mockup. Clicking a sidebar
// item swaps the entire process chain + properties panel via opacity fade.
// Все 4 сценария соответствуют реальным бизнес-кейсам платформы ROBIN.

const STUDIO_SCENARIOS = {
  "ai-agents": {
    label: "ИИ-агенты",
    processName: "Проверка договора",
    defaultNode: "ai-agent",
    nodes: [
      { kind: "node",      id: "start",     tone: "slate", iconKey: "Play",         title: "Начало",                  sub: "Триггер: новый договор" },
      { kind: "node",      id: "mcp",       tone: "sky",   iconKey: "Plug",         title: "MCP: импорт из 1С",       sub: "1С:ERP · договор.pdf" },
      { kind: "node",      id: "ai-agent",  tone: "amber", iconKey: "Cpu",          title: "ИИ-агент: Юрист",         sub: "Анализ рисков · LLM" },
      { kind: "condition", id: "condition", title: "Условие",                       sub: "Результат проверки" },
      { kind: "branch",
        left:  { id: "branch-green", label: "Нарушений нет",    tone: "emerald", iconKey: "CheckCircle2", title: "Загрузка в 1С",         sub: "Архив · /done" },
        right: { id: "branch-red",   label: "Требует внимания", tone: "rose",    iconKey: "Mail",         title: "Уведомить сотрудника",  sub: "Юр. отдел" } },
    ],
    properties: {
      start:          { title: "Начало",        fields: [ { label: "Триггер",   value: "Новый договор" }, { label: "Источник", value: "1С:ERP" } ] },
      mcp:            { title: "MCP-коннектор", fields: [ { label: "Источник",  value: "1С:ERP" }, { label: "Папка", value: "/docs" }, { label: "Формат", value: "PDF" } ] },
      "ai-agent":     { title: "ИИ-агент",      fields: [ { label: "Модель",    value: "LLM-1", kind: "pill-amber" }, { label: "Точность", value: 0.98, kind: "progress" }, { label: "Источник", value: "1С:ERP" } ] },
      condition:      { title: "Условие",       fields: [ { label: "Логика",    value: "Результат проверки" }, { label: "Ветви", value: "2" } ] },
      "branch-green": { title: "Загрузка в 1С", fields: [ { label: "Действие",  value: "Архив" }, { label: "Папка", value: "/done" } ] },
      "branch-red":   { title: "Уведомить",     fields: [ { label: "Получатель", value: "Юр. отдел" }, { label: "Канал", value: "Email" } ] },
    },
  },
  "rpa-1c": {
    label: "1С",
    processName: "Выгрузка банковских выписок",
    defaultNode: "rpa-data",
    nodes: [
      { kind: "node",      id: "start",     tone: "slate", iconKey: "Play",     title: "Начало",                  sub: "Расписание · ежедневно" },
      { kind: "node",      id: "rpa-auth",  tone: "sky",   iconKey: "Lock",     title: "RPA: Авторизация 1С",     sub: "Сертификат · логин" },
      { kind: "node",      id: "rpa-data",  tone: "amber", iconKey: "Download", title: "RPA: Получение данных",   sub: "Выписки за период" },
      { kind: "condition", id: "condition", title: "Условие",                   sub: "Данные полные?" },
      { kind: "branch",
        left:  { id: "branch-green", label: "Полные",   tone: "emerald", iconKey: "CheckCircle2", title: "Сохранить в архив",    sub: "Архив 1С" },
        right: { id: "branch-red",   label: "Неполные", tone: "rose",    iconKey: "Mail",         title: "Запросить уточнение",  sub: "Финансовый отдел" } },
    ],
    properties: {
      start:          { title: "Начало",        fields: [ { label: "Расписание", value: "Ежедневно 09:00" }, { label: "Источник", value: "Планировщик" } ] },
      "rpa-auth":     { title: "Авторизация",   fields: [ { label: "Метод",      value: "Сертификат" }, { label: "Система", value: "1С:Бухгалтерия" } ] },
      "rpa-data":     { title: "Получение данных", fields: [ { label: "Период",  value: "За текущий день" }, { label: "Тип", value: "Банковские выписки" }, { label: "Точность", value: 0.97, kind: "progress" } ] },
      condition:      { title: "Условие",       fields: [ { label: "Проверка",  value: "Полнота данных" }, { label: "Ветви", value: "2" } ] },
      "branch-green": { title: "Сохранение",    fields: [ { label: "Действие",  value: "Архив" }, { label: "Папка", value: "/banks/2026" } ] },
      "branch-red":   { title: "Уведомление",   fields: [ { label: "Получатель", value: "Фин. отдел" }, { label: "Канал", value: "Email" } ] },
    },
  },
  "browsers": {
    label: "Браузеры",
    processName: "Интеллектуальный поиск цен",
    defaultNode: "ai-analyze",
    nodes: [
      { kind: "node", id: "start",       tone: "slate",   iconKey: "Play",     title: "Начало",                       sub: "Триггер: запуск по расписанию" },
      { kind: "node", id: "mcp-browser", tone: "sky",     iconKey: "Search",   title: "MCP: Поиск в браузере",        sub: "Маркетплейсы · API" },
      { kind: "node", id: "ai-analyze",  tone: "amber",   iconKey: "Cpu",      title: "ИИ-агент: Анализ конкурентов", sub: "LLM · сравнение цен" },
      { kind: "node", id: "save",        tone: "emerald", iconKey: "FileText", title: "Сохранить в Excel",            sub: "Отчёт по продуктам" },
    ],
    properties: {
      start:         { title: "Начало",      fields: [ { label: "Расписание", value: "Ежедневно 08:00" }, { label: "Источник", value: "Планировщик" } ] },
      "mcp-browser": { title: "Поиск",       fields: [ { label: "Источник",   value: "Браузер" }, { label: "Цели", value: "Маркетплейсы" } ] },
      "ai-analyze":  { title: "ИИ-агент",    fields: [ { label: "Модель",     value: "LLM-1", kind: "pill-amber" }, { label: "Точность", value: 0.95, kind: "progress" }, { label: "Задача", value: "Сравнение цен" } ] },
      save:          { title: "Сохранение",  fields: [ { label: "Формат",     value: "Excel" }, { label: "Папка", value: "/reports" } ] },
    },
  },
  "integrations": {
    label: "Интеграции",
    processName: "Сверка актов через Диадок",
    defaultNode: "ai-recon",
    nodes: [
      { kind: "node",      id: "start",      tone: "slate", iconKey: "Play", title: "Начало",                sub: "Триггер: новый акт" },
      { kind: "node",      id: "mcp-diadoc", tone: "sky",   iconKey: "Plug", title: "MCP: Коннектор Диадок", sub: "СКБ Контур · документы" },
      { kind: "node",      id: "ai-recon",   tone: "amber", iconKey: "Cpu",  title: "ИИ-агент: Сверка сумм", sub: "LLM · сравнение" },
      { kind: "condition", id: "condition",  title: "Условие",               sub: "Совпадает?" },
      { kind: "branch",
        left:  { id: "branch-green", label: "Совпадает",   tone: "emerald", iconKey: "CheckCircle2", title: "Подписать акт", sub: "ЭП · авто" },
        right: { id: "branch-red",   label: "Расхождение", tone: "rose",    iconKey: "Mail",         title: "Отклонить",     sub: "Уведомить отправителя" } },
    ],
    properties: {
      start:          { title: "Начало",          fields: [ { label: "Триггер", value: "Новый акт" }, { label: "Источник", value: "Диадок" } ] },
      "mcp-diadoc":   { title: "Коннектор Диадок", fields: [ { label: "Сервис", value: "СКБ Контур" }, { label: "Тип", value: "Документы" } ] },
      "ai-recon":     { title: "ИИ-агент",        fields: [ { label: "Модель", value: "LLM-1", kind: "pill-amber" }, { label: "Точность", value: 0.99, kind: "progress" }, { label: "Задача", value: "Сверка сумм" } ] },
      condition:      { title: "Условие",         fields: [ { label: "Проверка", value: "Совпадение сумм" }, { label: "Ветви", value: "2" } ] },
      "branch-green": { title: "Подписание",      fields: [ { label: "Действие", value: "Электронная подпись" }, { label: "Режим", value: "Авто" } ] },
      "branch-red":   { title: "Отклонение",      fields: [ { label: "Получатель", value: "Отправитель" }, { label: "Канал", value: "Email" } ] },
    },
  },
};

const STUDIO_SCENARIO_IDS = ["rpa-1c", "browsers", "ai-agents", "integrations"];

// Map iconKey string → component (Lucide icons already imported above)
const STUDIO_ICONS = {
  Play, Plug, Cpu, GitBranch, CheckCircle2, Mail, Download, Search,
  FileText, Lock, Folder, Settings,
};

function CodeEditor() {
  // Активный сценарий + блок, на который наведён курсор (или null = default)
  const [activeScenario, setActiveScenario] = useState("ai-agents");
  const [hoveredNode, setHoveredNode] = useState(null);
  const scenario = STUDIO_SCENARIOS[activeScenario];
  const currentNodeId = hoveredNode || scenario.defaultNode;
  const props =
    scenario.properties[currentNodeId] ||
    scenario.properties[scenario.defaultNode];

  const handleScenarioChange = (id) => {
    setActiveScenario(id);
    setHoveredNode(null);
  };

  const TONES = {
    slate:   { bg: "bg-slate-50",   border: "border-slate-300", iconBg: "bg-white",       iconColor: "text-slate-700"   },
    sky:     { bg: "bg-sky-50",     border: "border-sky-200",   iconBg: "bg-sky-100",     iconColor: "text-sky-700"     },
    amber:   { bg: "bg-amber-50",   border: "border-amber-200", iconBg: "bg-amber-100",   iconColor: "text-amber-700"   },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-100", iconColor: "text-emerald-700" },
    rose:    { bg: "bg-orange-50",  border: "border-orange-200", iconBg: "bg-orange-100", iconColor: "text-orange-600"  },
  };

  const ActionNode = ({ id, tone, icon: Icon, title, sub }) => {
    const t = TONES[tone];
    return (
      <div
        onMouseEnter={() => setHoveredNode(id)}
        className={`relative w-full max-w-md mx-auto rounded-2xl border ${t.bg} ${t.border} transition-all duration-300 ease-out hover:shadow-md hover:border-slate-400 cursor-default`}
      >
        <div className="flex items-center gap-3 px-3.5 py-2.5">
          <div className={`w-8 h-8 rounded-xl ${t.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${t.iconColor}`} strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold leading-tight text-slate-900" style={{ fontSize: 13 }}>
              {title}
            </div>
            {sub && (
              <div className="text-slate-500 leading-tight truncate" style={{ fontSize: 11 }}>
                {sub}
              </div>
            )}
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" strokeWidth={2} />
        </div>
      </div>
    );
  };

  const VConnector = ({ height = 20 }) => (
    <div className="flex justify-center" style={{ height }}>
      <div className="w-px h-full bg-slate-300" />
    </div>
  );

  // SplitConnector: те же 1px серые линии, что и VConnector.
  // Реализован через абсолютно позиционированные div'ы вместо SVG,
  // чтобы избежать масштабирования stroke при non-uniform scaling.
  const SplitConnector = () => (
    <div className="relative w-full" style={{ height: 36 }}>
      {/* Верхний вертикальный сегмент (от Условие вниз до точки разделения) */}
      <div
        className="absolute bg-slate-300"
        style={{ left: "50%", top: 0, width: 1, height: 16, transform: "translateX(-50%)" }}
      />
      {/* Горизонтальная перемычка */}
      <div
        className="absolute bg-slate-300"
        style={{ left: "15%", right: "15%", top: 16, height: 1 }}
      />
      {/* Левая вертикальная ветка */}
      <div
        className="absolute bg-slate-300"
        style={{ left: "15%", top: 16, width: 1, height: 20 }}
      />
      {/* Правая вертикальная ветка */}
      <div
        className="absolute bg-slate-300"
        style={{ right: "15%", top: 16, width: 1, height: 20 }}
      />
    </div>
  );

  // Render одного узла из массива nodes сценария
  const renderNode = (node, i) => {
    if (node.kind === "node") {
      const Icon = STUDIO_ICONS[node.iconKey] || Play;
      return (
        <ActionNode
          key={node.id}
          id={node.id}
          tone={node.tone}
          icon={Icon}
          title={node.title}
          sub={node.sub}
        />
      );
    }
    if (node.kind === "condition") {
      return (
        <div
          key={node.id}
          onMouseEnter={() => setHoveredNode(node.id)}
          className="rounded-2xl border border-slate-300 bg-white px-3.5 py-2.5 flex items-center gap-3 max-w-md mx-auto transition-all duration-300 ease-out hover:shadow-md hover:border-slate-400 cursor-default"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <GitBranch className="w-4 h-4 text-slate-700" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold leading-tight text-slate-900" style={{ fontSize: 13 }}>
              {node.title}
            </div>
            <div className="text-slate-500 leading-tight" style={{ fontSize: 11 }}>
              {node.sub}
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" strokeWidth={2} />
        </div>
      );
    }
    if (node.kind === "branch") {
      const renderBranch = (b) => {
        const Icon = STUDIO_ICONS[b.iconKey] || CheckCircle2;
        return (
          <div className="flex flex-col items-stretch">
            <span
              className="self-center mb-2 px-2.5 py-0.5 rounded-full font-mono font-medium uppercase tracking-wider border bg-slate-50 text-slate-600 border-slate-200"
              style={{ fontSize: 10 }}
            >
              {b.label}
            </span>
            <ActionNode
              id={b.id}
              tone={b.tone}
              icon={Icon}
              title={b.title}
              sub={b.sub}
            />
          </div>
        );
      };
      return (
        <div key="branch" className="grid grid-cols-2 gap-2">
          {renderBranch(node.left)}
          {renderBranch(node.right)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes fadeProps {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeCanvas {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Soft glow behind window */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/15 via-transparent to-orange-500/15 blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xl shadow-slate-900/15">
        {/* ─── Window header ──────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 px-3 h-10 border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500 bg-transparent text-emerald-600 text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-colors duration-200"
            onClick={(e) => e.preventDefault()}
            aria-label="Запустить"
          >
            <Play className="w-3 h-3" strokeWidth={2.5} fill="currentColor" />
            Запустить
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors"
            onClick={(e) => e.preventDefault()}
            aria-label="Запись"
          >
            <Disc className="w-3.5 h-3.5 text-rose-500" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors"
            onClick={(e) => e.preventDefault()}
            aria-label="Сохранить"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
          </button>
          {/* Process name — обновляется по сценарию через key + fadeProps */}
          <div className="flex-1 flex justify-center">
            <div
              key={activeScenario + "-name"}
              style={{ animation: "fadeProps 240ms ease-out both" }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-700">
                {scenario.processName}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="w-7 h-7 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors"
            onClick={(e) => e.preventDefault()}
            aria-label="Настройки"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
          </button>
        </div>

        {/* ─── Studio body ─────────────────────────────────────────────── */}
        <div className="flex bg-slate-100" style={{ minHeight: 520 }}>
          {/* Actions panel — теперь интерактивная */}
          <aside className="w-48 flex-shrink-0 bg-white border-r border-slate-200 py-3">
            <div
              className="text-slate-400 font-mono font-medium uppercase tracking-widest px-3 mb-2"
              style={{ fontSize: 10 }}
            >
              Действия
            </div>
            <ul className="space-y-0.5">
              {STUDIO_SCENARIO_IDS.map((id) => {
                const s = STUDIO_SCENARIOS[id];
                const active = activeScenario === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleScenarioChange(id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                        active
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <Folder
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          active ? "text-amber-500" : "text-slate-400"
                        }`}
                        strokeWidth={2}
                      />
                      <span className="truncate" style={{ fontSize: 12 }}>
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Canvas — keyed by scenario, fades on swap */}
          <main className="flex-1 min-w-0 p-5 relative">
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div
              key={activeScenario}
              style={{ animation: "fadeCanvas 280ms ease-out both" }}
              className="relative"
            >
              {scenario.nodes.map((node, i) => {
                const isBranch = node.kind === "branch";
                return (
                  <Fragment key={node.id || `branch-${i}`}>
                    {i > 0 && (isBranch ? <SplitConnector /> : <VConnector />)}
                    {renderNode(node, i)}
                  </Fragment>
                );
              })}
            </div>
          </main>

          {/* Properties — keyed by scenario+node, plays fadeProps on update */}
          <aside className="w-56 flex-shrink-0 bg-white border-l border-slate-200 py-3 px-3">
            <div
              className="text-slate-400 font-mono font-medium uppercase tracking-widest mb-3"
              style={{ fontSize: 10 }}
            >
              Свойства
            </div>
            <div
              key={activeScenario + "-" + currentNodeId}
              style={{ animation: "fadeProps 240ms ease-out both" }}
              className="space-y-3"
            >
              <div>
                <div className="text-slate-500 mb-0.5" style={{ fontSize: 10 }}>Блок</div>
                <div className="font-semibold text-slate-900 truncate" style={{ fontSize: 12 }}>
                  {props.title}
                </div>
              </div>
              {props.fields.map((f, i) => (
                <div key={i} className="pt-2 border-t border-slate-100">
                  <div className="text-slate-500 mb-1" style={{ fontSize: 10 }}>{f.label}</div>
                  {f.kind === "pill-amber" && (
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono"
                      style={{ fontSize: 11 }}
                    >
                      <Cpu className="w-3 h-3" strokeWidth={2} />
                      {f.value}
                    </div>
                  )}
                  {f.kind === "progress" && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${Math.round(f.value * 100)}%` }}
                        />
                      </div>
                      <span
                        className="font-mono font-semibold text-slate-900"
                        style={{ fontSize: 11 }}
                      >
                        {f.value}
                      </span>
                    </div>
                  )}
                  {!f.kind && (
                    <div className="text-slate-700 font-medium truncate" style={{ fontSize: 12 }}>
                      {f.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* ─── Bottom strip ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 h-10 border-t border-slate-200 bg-slate-50">
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Процесс готов
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white">
            <Zap className="w-3.5 h-3.5 text-amber-300" strokeWidth={2.5} />
            <span className="font-mono font-semibold tracking-tight text-xs">
              0 строк кода · Собрано в ROBIN Studio
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// BUSINESS VALUE  ·  pastel cards à la "Solutions Made For Your Industry"
// ───────────────────────────────────────────────────────────────────────────

function BusinessValueSection() {
  return (
    <section className="relative border-b border-slate-200/60 bg-slate-50/40 overflow-hidden">
      {/* Soft color blobs behind cards — visible through glassmorphism */}
      <div
        aria-hidden
        className="absolute top-1/3 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"
        style={{ left: "8%" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-300/25 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/3 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl pointer-events-none"
        style={{ right: "8%" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24 lg:py-32">
        {/* Centered header above the grid */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <SectionLabel>Зачем вам это</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-slate-900 leading-tight mb-4">
            Не сервис, а{" "}
            <span className="font-extrabold text-slate-900">инструмент</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Настраиваемый ИИ-агент для развертывания в собственном контуре.
            Полная конфиденциальность данных и гибкая доработка логики
          </p>
        </div>

        <div className="value-grid">
          <IndustryCard
            theme="amber"
            icon={Lock}
            title="Безопасная среда"
            description="Песочница ROBIN: безопасный запуск моделей. Тестируйте ИИ-агентов с доступом к LLM и эмуляторам систем без рисков для продакшна"
            mockup={<SandboxMockup />}
          />
          <IndustryCard
            theme="rose"
            icon={Sparkles}
            title="No-code настройка"
            description="80% готово — 20% настраиваете вы. Визуальный редактор ROBIN Studio: адаптируйте агентов под свои процессы без программирования"
            mockup={<NoCodeMockup />}
          />
          <IndustryCard
            theme="sky"
            icon={Layers}
            title="Готовые сценарии ROBIN"
            description="Проверенные решения для вашего контура. Каждая модель прошла аудит безопасности и проверку зависимостей. Полное соответствие 152-ФЗ"
            mockup={<ReadyScenariosMockup />}
          />
        </div>
      </div>
    </section>
  );
}

const CARD_THEMES = {
  amber: {
    bg: "bg-amber-100/60",
    border: "border-amber-200/50",
    iconBg: "bg-amber-500",
    title: "text-amber-900",
    desc: "text-amber-900/80",
    blob: "bg-amber-200/40",
  },
  rose: {
    bg: "bg-rose-100/60",
    border: "border-rose-200/50",
    iconBg: "bg-rose-500",
    title: "text-rose-900",
    desc: "text-rose-900/80",
    blob: "bg-rose-200/40",
  },
  sky: {
    bg: "bg-sky-100/60",
    border: "border-sky-200/50",
    iconBg: "bg-sky-600",
    title: "text-sky-900",
    desc: "text-sky-900/80",
    blob: "bg-sky-200/40",
  },
};

function IndustryCard({ theme, icon: Icon, title, description, mockup }) {
  const t = CARD_THEMES[theme];
  return (
    <article
      className={`group relative ${t.bg} backdrop-blur-xl border ${t.border} rounded-3xl p-5 lg:p-6 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 h-full min-w-0`}
    >
      {/* Glass highlight along the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
      />
      {/* Soft decorative blob — adds organic depth */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 ${t.blob} rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110`}
      />

      <div className="relative z-10">
        <div
          className={`w-9 h-9 rounded-xl ${t.iconBg} flex items-center justify-center mb-4 shadow-md shadow-black/10`}
        >
          <Icon className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <h3
          className={`text-lg lg:text-xl ${t.title} font-semibold tracking-tight leading-snug mb-2`}
        >
          {title}
        </h3>
        <p className={`text-sm ${t.desc} leading-relaxed`}>
          {description}
        </p>
      </div>

      {/* Glassmorphism mockup at bottom */}
      <div className="relative z-10 mt-auto pt-4">{mockup}</div>
    </article>
  );
}

// — Mockup 1: Sandbox terminal (yellow card) —————————————————

function SandboxMockup() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md p-2.5 shadow-sm">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-amber-200/40">
        <Lock className="w-2.5 h-2.5 text-amber-700" strokeWidth={2.5} />
        <span className="font-mono text-amber-900/80" style={{ fontSize: 9 }}>
          Изолированный контур
        </span>
        <span
          className="ml-auto inline-flex items-center gap-1 font-mono text-amber-900/60"
          style={{ fontSize: 9 }}
        >
          <Shield className="w-2.5 h-2.5" strokeWidth={2} />
          152-ФЗ
        </span>
      </div>
      {/* Three blocks: Модель / Среда / Данные */}
      <div className="mt-2 grid grid-cols-3 gap-1">
        <div className="rounded-md border border-amber-300/50 bg-white/70 px-1.5 py-1">
          <div
            className="font-mono uppercase tracking-wider text-amber-700"
            style={{ fontSize: 7 }}
          >
            Модель
          </div>
          <div className="text-amber-900 font-medium leading-tight" style={{ fontSize: 10 }}>
            ИИ-агент
          </div>
        </div>
        <div className="rounded-md border border-amber-400/70 bg-amber-100/80 px-1.5 py-1">
          <div
            className="font-mono uppercase tracking-wider text-amber-700"
            style={{ fontSize: 7 }}
          >
            Среда
          </div>
          <div className="text-amber-900 font-semibold leading-tight" style={{ fontSize: 10 }}>
            ROBIN
          </div>
        </div>
        <div className="rounded-md border border-amber-300/50 bg-white/70 px-1.5 py-1">
          <div
            className="font-mono uppercase tracking-wider text-amber-700"
            style={{ fontSize: 7 }}
          >
            Данные
          </div>
          <div className="text-amber-900 font-medium leading-tight" style={{ fontSize: 10 }}>
            Тестовые
          </div>
        </div>
      </div>
    </div>
  );
}

// — Mockup 2: No-code workflow (pink card) ——————————————————

function NoCodeMockup() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md p-2.5 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <div
          className="font-mono uppercase tracking-wider text-rose-900/60"
          style={{ fontSize: 8 }}
        >
          Визуальный конструктор
        </div>
        <div className="flex gap-0.5">
          <div className="w-1 h-1 rounded-full bg-rose-300" />
          <div className="w-1 h-1 rounded-full bg-rose-400" />
          <div className="w-1 h-1 rounded-full bg-rose-500" />
        </div>
      </div>
      <div className="space-y-1">
        <WorkflowNode dot="bg-rose-500" label="Триггер" sub="новый документ" />
        <WorkflowConnector />
        <WorkflowNode dot="bg-rose-400" label="AI"      sub="извлечь реквизиты" />
        <WorkflowConnector />
        <WorkflowNode dot="bg-rose-600" label="MCP"     sub="запись в 1С" highlighted />
      </div>
    </div>
  );
}

function WorkflowNode({ dot, label, sub, highlighted }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md px-2 py-1 border ${
        highlighted
          ? "bg-rose-50 border-rose-300"
          : "bg-white/90 border-rose-200/70"
      }`}
    >
      <div className={`w-1 h-1 rounded-full ${dot} flex-shrink-0`} />
      <span className="text-slate-900 font-semibold" style={{ fontSize: 10 }}>
        {label}
      </span>
      {sub && (
        <span className="text-slate-500 truncate" style={{ fontSize: 9 }}>
          · {sub}
        </span>
      )}
    </div>
  );
}

function WorkflowConnector() {
  return (
    <div className="flex pl-2.5" style={{ height: 6 }}>
      <div className="w-px h-full bg-rose-300/70" />
    </div>
  );
}

// — Mockup 3: Ready scenarios list (blue card) —————————————————

function ReadyScenariosMockup() {
  const items = [
    { label: "Сверка актов",        category: "Финансы" },
    { label: "Проверка договоров",  category: "Юр" },
    { label: "Распознавание УПД",   category: "Финансы" },
  ];
  return (
    <div className="rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md p-2.5 shadow-sm">
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div
          className="font-mono uppercase tracking-wider text-sky-900/60"
          style={{ fontSize: 8 }}
        >
          Готово к запуску
        </div>
        <div className="font-mono text-sky-700" style={{ fontSize: 8 }}>
          12 шт
        </div>
      </div>
      <div className="space-y-0.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 bg-white/90 rounded-md px-1.5 py-1 border border-sky-200/60"
          >
            <CheckCircle2
              className="w-3 h-3 text-sky-600 flex-shrink-0"
              strokeWidth={2.25}
            />
            <span className="font-medium text-slate-800 truncate flex-1" style={{ fontSize: 10 }}>
              {item.label}
            </span>
            <span className="text-sky-700/70 font-mono flex-shrink-0" style={{ fontSize: 8 }}>
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PLATFORMS  ·  brand-inspired SVG marks (stylized representations)
// ───────────────────────────────────────────────────────────────────────────

function PlatformsSection() {
  const platforms = [
    <PlatformMarkRobin />,
    <PlatformMarkN8n />,
    <PlatformMarkDify />,
    <PlatformMark1C />,
    <PlatformMarkMake />,
    <PlatformMarkCamunda />,
  ];
  return (
    <section className="border-b border-slate-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-10">
          <SectionLabel>Совместимость</SectionLabel>
          <h2 className="text-xl md:text-2xl lg:text-3xl tracking-tight text-slate-900 max-w-2xl mx-auto leading-tight">
            Интеграция с ключевыми платформами{" "}
            <span className="font-extrabold text-slate-900">автоматизации</span>
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px">
            {platforms.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center bg-white py-10 lg:py-12 transition-colors duration-300 hover:bg-slate-50 cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Stylized brand marks — geometric primitives in each platform's signature color.
// Not pixel-perfect reproductions of trademarked logos; sufficient for indicating
// platform compatibility in a design mockup.

// Real platform logos embedded as base64 data URLs from uploaded files.
const PLATFORM_LOGO_ROBIN   = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ1IiBoZWlnaHQ9IjY5IiB2aWV3Qm94PSIwIDAgMzQ1IDY5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI3LjgzODcgNTkuMzQ2MUwyNC4wMTAxIDY4Ljg0NjFIMjYuMzMwNUwzMC4zNTI0IDU5LjkyM0wyNy44Mzg3IDU5LjM0NjFaIiBmaWxsPSIjRUUyMzQwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzguMjAyNiA1OC44ODQ3TDQyLjIyNDYgNTYuNzY5M0M0MS4zMzUxIDU4LjgwNzcgNDAuMDIwMiA2Mi44ODQ3IDM4LjIwMjYgNjlIMzYuMDc1N0MzNy41MDY2IDYyLjYxNTQgMzguMjQxMyA1OS4yMzA4IDM4LjIwMjYgNTguODg0N1oiIGZpbGw9IiNFRTIzNDAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS44NjcgMjguMDM4NUM0Ljk4MzM5IDM0LjYxNTQgLTEuNTkwODcgNDIuNTM4NSAwLjM0MjczNCA1NC4yMzA4QzEuMTU0ODUgNTkuMTkyMyAzLjQzNjUgNjMuMTE1NCA3LjE0OTAyIDY1Ljk2MTVDNi43MjM2MyA2MC45MjMxIDguMDc3MTUgNTcuMDc2OSAxMS4yNDgzIDU0LjQ2MTVDMTQuMzgwNyA1MS44NDYyIDE5LjM2OTQgNTAuNTM4NSAyNi4xNzU3IDUwLjUzODVMMTMuMDI3MiAyNi45NjE1QzEyLjUyNDQgMjcuNDIzMSAxMi4xMzc3IDI3LjgwNzcgMTEuODY3IDI4LjAzODVaIiBmaWxsPSIjQzcyMzI5Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTMuNzg3NSAzMS42OTIzQzU1LjUyNzggMzYuNjE1NCA2OC45ODU3IDQ2LjExNTQgNjguOTg1NyA0Ni44MDc3QzY4Ljk4NTcgNDguMDM4NSA2Ni44NTg3IDUxLjAzODUgNjIuNzk4MSA1MS4wMzg1QzU5LjIwMTYgNTEuMDM4NSA1OC43NzYyIDUyLjIzMDggNTUuMjk1NyA1MS40NjE1QzQ5LjgwNDMgNTcuNDIzMSA0My4xNTI3IDYwLjU3NjkgMzUuMzc5NiA2MC45MjMxQzM0Ljg3NjkgNjAuOTYxNSAzNC40MTI4IDYwLjk2MTUgMzMuOTEwMSA2MC45NjE1QzMzLjQwNzQgNjAuOTYxNSAzMi44NjYgNjAuOTYxNSAzMi4zNjMyIDYwLjkyMzFDMzEuODk5MSA2MC44ODQ2IDMxLjM5NjQgNjAuODQ2MiAzMC45MzIzIDYwLjgwNzdDMjUuNTU2OSA2MC4yNjkyIDIxLjQxOSA1OC4zMDc3IDE4LjMyNTMgNTYuMDM4NUMxMi4zMzExIDUxLjg4NDYgOC4wNzcxNSA0NS4zODQ2IDguMDc3MTUgMzcuNUM4LjA3NzE1IDMzLjk2MTUgOC41Nzk4OSAzMC42MTU0IDkuNTQ2NjkgMjcuNjUzOUMxMC4xNjU0IDI1LjE1MzkgMTAuODIyOSAyMi41Mzg1IDExLjA5MzYgMTkuNjkyM0MxMi41MjQ0IDQuMzg0NjIgMTkuMjE0NyAwIDI4LjM4IDBDMzIuMzI0NSAwIDM1LjMwMjMgMS4zMDc3IDM3LjA4MTIgMy4wMzg0N0MzOC44NjAxIDQuODA3NyAzOS42NzIyIDUuOTYxNTQgNDAuNDA3IDcuOTIzMDhDNDAuNjc3NyA5Ljg4NDYyIDQwLjc5MzcgMTEuMzQ2MiA0MC43OTM3IDEyLjMwNzdDNDAuNzkzNyAxMy45MjMxIDQwLjQ4NDMgMTUuNDYxNSAzOS44NjU2IDE2Ljg4NDZDNDguMjU3NCAyMC44ODQ2IDUxLjI3MzggMjQuNjUzOSA1My43ODc1IDMxLjY5MjNaIiBmaWxsPSIjRUYzNzQ3Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjUuMDc5OSA1OC45MjMxQzY4LjE3MzcgNjIuNTAwMSA3MS4xOTAxIDY1Ljk2MTYgNjkuMjU2NSA2Ni41NzdDNjcuMzIyOSA2Ny4xOTI0IDYxLjk4NjIgNjQuNzMwOCA2MS45ODYyIDY1Ljk2MTZDNjEuOTg2MiA2Ny4xOTI0IDYxLjUyMjEgNjguNTM4NSA2MC40MDA2IDY4Ljg4NDdDNTkuMjc5MSA2OS4yMzA4IDU4LjQ2NyA2OC41Mzg1IDU3LjIyOTUgNjcuMjMwOEM1NS45OTIgNjUuOTIzMSA1NC4wNTg0IDYxLjE1MzkgNTEuNTA2IDU1LjAwMDFDNDYuODI2NyA1OC42OTI0IDQxLjQ1MTMgNjAuNjUzOSAzNS4zNzk4IDYwLjkyMzFDMzQuODc3IDYwLjk2MTYgMzQuNDEzIDYwLjk2MTYgMzMuOTEwMiA2MC45NjE2QzMzLjQwNzUgNjAuOTYxNiAzMi44NjYxIDYwLjk2MTYgMzIuMzYzNCA2MC45MjMxQzMxLjg5OTMgNjAuODg0NyAzMS4zOTY2IDYwLjg0NjIgMzAuOTMyNSA2MC44MDc4QzI1LjU1NzEgNjAuMjY5MyAyMS40MTkyIDU4LjMwNzcgMTguMzI1NCA1Ni4wMzg1QzE4LjAxNiA1NS44MDc3IDE3LjUxMzMgNTUuNDYxNiAxNi44OTQ1IDU1LjAwMDFDMjUuNDc5NyA1Ny4xOTI0IDMyLjEzMTMgNTYuMzA3NyAzNi43NzIgNTIuNDIzMUM0MS40NTEzIDQ4LjUgNDMuMjMwMiA0Mi43NjkzIDQyLjEwODcgMzUuMjMwOEM0NS43ODI2IDM4LjM0NjIgNTAuMDM2NSA0MS43MzA4IDU1Ljc2IDQyLjkyMzFDNTkuMDQ3MSA0My42MTU1IDYyLjEwMjIgNDMuMzA3NyA2My42MTA0IDQyLjIzMDhDNjcuMTY4MiA0NS4xMTU0IDY4Ljk0NzEgNDYuNjUzOSA2OC45NDcxIDQ2Ljg0NjJDNjguOTQ3MSA0OC4wNzcgNjYuODIwMiA1MS4wNzcgNjIuNzU5NiA1MS4wNzdDNjAuNjMyNiA1MS4wNzcgNTkuNjI3MiA1MS41IDU4LjQyODMgNTEuNjUzOUM2MS4wNTggNTQuNDIzMSA2My41MzMgNTcuMTUzOSA2NS4wNzk5IDU4LjkyMzFaIiBmaWxsPSIjQzcyMzI5Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjkuMTkyIDEyLjAwMDFDMjkuNTQwMSAxMi41MDAxIDMwLjEyMDEgMTIuODQ2MiAzMC43Mzg5IDEyLjk2MTZDMzEuMzE5IDEzLjAzODUgMzEuODYwNCAxMi45MjMyIDMyLjI4NTggMTIuNjUzOUMzMi42NzI1IDEyLjM4NDcgMzMuMDIwNSAxMS45MjMxIDMzLjA5NzkgMTEuMzQ2MkMzMy4xNzUyIDEwLjczMDggMzMuMDIwNiAxMC4xMTU1IDMyLjYzMzggOS41NzdDMzEuODYwNCA4LjQ2MTYyIDMwLjUwNjkgOC4xMTU0NiAyOS41NDAxIDguNzMwODRDMjguNTczMyA5LjM0NjIzIDI4LjM3OTkgMTAuODg0NyAyOS4xOTIgMTIuMDAwMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzYuNjU1OSA2LjE5MjI4QzM2Ljg0OTIgNS44MDc2NiAzNy4xNTg2IDUuNDk5OTcgMzcuNTQ1MyA1LjMwNzY3QzM3Ljg1NDcgNS4xMTUzNiAzOC4yNDE0IDUuMDM4NDQgMzguNjY2OCA0Ljk2MTUxQzM5LjA5MjIgNC44ODQ1OSAzOS40Nzg5IDQuODg0NTkgNDAuMDU5IDQuODg0NTlDNDAuMjUyNCA0Ljg4NDU5IDQwLjI5MSA0Ljg4NDU5IDQwLjMyOTcgNC44ODQ1OUM0MC44MzI1IDQuODg0NTkgNDEuNjA1OSA0Ljk2MTUxIDQyLjgwNDcgNS4xMTUzNkM0Mi45MjA4IDUuMTE1MzYgNDMuMDc1NCA1LjE1MzgyIDQzLjIzMDEgNS4xNTM4MkM0My4zODQ4IDUuMTkyMjggNDMuNDIzNSA1LjE5MjI4IDQzLjgxMDIgNS4yMzA3NEM0My45NjQ5IDUuMjMwNzQgNDQuMDgwOSA1LjMwNzY2IDQ0LjE1ODMgNS40NjE1MUM0NC4yMzU2IDUuNTM4NDMgNDQuMjM1NiA1LjY1MzgyIDQ0LjIzNTYgNS43MzA3NUM0NC4yMzU2IDUuODQ2MTMgNDQuMTk2OSA1LjkyMzA1IDQ0LjE1ODMgNi4wNzY5QzQ0LjA4MDkgNi4yNjkyIDQzLjk2NDkgNi40OTk5NyA0My44MTAyIDYuODA3NjZDNDMuNTM5NSA3LjMwNzY2IDQzLjE1MjggNy45NjE1MSA0Mi42MTE0IDguODg0NThDNDIuNTcyNyA4LjkyMzA1IDQyLjU3MjcgOC45NjE1IDQyLjUzNCA5LjAzODQzQzQyLjQxOCA5LjI2OTIgNDEuOTUzOSA5Ljk5OTk3IDQxLjg3NjYgMTAuMTE1NEM0MS40ODk5IDEwLjc2OTIgNDEuMjE5MiAxMS4xNTM4IDQwLjk0ODUgMTEuNDYxNUM0MC44NzExIDExLjUzODQgNDAuODMyNSAxMS42MTU0IDQwLjc1NTEgMTEuNjUzOEM0MC43OTM4IDEyLjE1MzggNDAuNzkzOCAxMi42NTM4IDQwLjc1NTEgMTMuMjY5MkM0MC42Nzc4IDE0LjI2OTIgNDAuNTIzMSAxNSA0MC4zMjk3IDE1LjUzODRDMzcuMTE5OSAxNi45NjE1IDMzLjgzMjggMTcuNDIzMSAzMC4zOTEgMTYuODg0NkMyNS4yODYzIDE2LjExNTQgMjMuMjc1MyA5Ljc2OTIgMjUuMjQ3NiA2LjE1MzgxQzI3LjE4MTIgMi41Mzg0MyAzMy4wNTk0IDQuMTE1MzYgMzYuMjY5MSA2Ljk5OTk3TDM2LjMwNzggNy4wMzg0NEMzNi40MjM5IDYuNzY5MiAzNi41Mzk5IDYuNDYxNTEgMzYuNjU1OSA2LjE5MjI4Wk0yOS4xOTIyIDEyQzI5LjU0MDIgMTIuNSAzMC4xMjAzIDEyLjg0NjEgMzAuNzM5IDEyLjk2MTVDMzEuMzE5MSAxMy4wMzg0IDMxLjg2MDUgMTIuOTIzMSAzMi4yODU5IDEyLjY1MzhDMzIuNjcyNyAxMi4zODQ2IDMzLjAyMDcgMTEuOTIzIDMzLjA5OCAxMS4zNDYxQzMzLjE3NTQgMTAuNzMwNyAzMy4wMjA3IDEwLjExNTQgMzIuNjM0IDkuNTc2OUMzMS44NjA1IDguNDYxNTEgMzAuNTA3IDguMTE1MzYgMjkuNTQwMiA4LjczMDc0QzI4LjU3MzQgOS4zNDYxMiAyOC4zODAxIDEwLjg4NDYgMjkuMTkyMiAxMlpNMjkuODEwOSAxMS40NjE1QzI5Ljg0OTYgMTEuNTM4NCAyOS44ODgzIDExLjU3NjkgMjkuOTI2OSAxMS42MTU0QzMwLjM1MjMgMTIuMjMwNyAzMS41MTI1IDEyLjM0NjEgMzIuMDUzOSAxMS43NjkyQzMyLjU1NjYgMTEuMTkyMyAzMi40NDA2IDEwLjQyMzEgMzIuMDUzOSA5LjkyMzA1QzMxLjY2NzIgOS4zODQ1OSAzMC44MTY0IDkuMTkyMjcgMzAuMjc1IDkuNjE1MzVDMzAuMTU5IDkuNjkyMjcgMzAuMDgxNiA5LjgwNzY3IDMwLjAwNDMgOS45MjMwNUMzMC4zNTIzIDkuNzY5MiAzMC44NTUxIDkuODg0NTggMzEuMDg3MSAxMC4yMzA3QzMxLjM1NzggMTAuNjE1NCAzMS4yNDE4IDExLjIzMDcgMzAuODkzNyAxMS40NjE1QzMwLjU0NTcgMTEuNjUzOCAzMC4xMjAzIDExLjY1MzggMjkuODEwOSAxMS40NjE1WiIgZmlsbD0iI0M3MjMyOSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQzLjE1MjcgNS45OTk5NEM0Mi45OTggNS45OTk5NCA0Mi44ODIgNS45NjE0NyA0Mi43MjczIDUuOTYxNDdDNDEuNTY3MSA1LjgwNzYzIDQwLjgzMjQgNS43MzA3MSA0MC4zNjgzIDUuNzMwNzFDNDAuMjkxIDUuNzMwNzEgNDAuMjUyMyA1LjczMDcxIDQwLjA1ODkgNS43MzA3MUMzOS41MTc1IDUuNzMwNzEgMzkuMTY5NSA1LjczMDcgMzguODIxNCA1Ljc2OTE3QzM4LjEyNTMgNS44ODQ1NSAzNy42NjEzIDYuMTE1MzIgMzcuNDI5MiA2LjU3Njg2QzM3LjI3NDUgNi44ODQ1NSAzNy4xMTk5IDcuMzQ2MSAzNy4wODEyIDcuODQ2MUMzNy4wMDM4IDguNTM4NCAzNy4xMTk4IDkuMjMwNzEgMzcuNDI5MiA5Ljk2MTQ4QzM3LjczODYgMTAuNjE1MyAzOC4wODY3IDExLjAzODQgMzguNTUwNyAxMS4yMzA3QzM4Ljg5ODggMTEuMzg0NiAzOS4yNDY4IDExLjQyMyAzOS41OTQ5IDExLjM4NDZDMzkuODI2OSAxMS4zNDYxIDQwLjA1ODkgMTEuMTkyMyA0MC4zMjk2IDEwLjkyM0M0MC41NjE3IDEwLjY1MzggNDAuODMyNCAxMC4zMDc2IDQxLjE4MDQgOS42OTIyNUM0MS4yNTc4IDkuNTc2ODYgNDEuNzIxOCA4Ljg0NjEgNDEuODM3OCA4LjYxNTMzQzQxLjg3NjUgOC41NzY4NyA0MS45MTUyIDguNDk5OTMgNDEuOTE1MiA4LjQ2MTQ3QzQyLjQ1NjYgNy41Mzg0IDQyLjg0MzMgNi44ODQ1NSA0My4wNzU0IDYuNDIzMDJDNDMuMTUyNyA2LjI2OTE3IDQzLjIzIDYuMTUzNzkgNDMuMjY4NyA2LjAzODRDNDMuMjMgNi4wMzg0IDQzLjE5MTMgNi4wMzg0IDQzLjE1MjcgNS45OTk5NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMuNTQ2IDQ5LjgwNzdDMjkuNTAxNSA0OS44MDc3IDM0LjI5NjggNDUgMzQuMjk2OCAzOS4xMTU0QzM0LjI5NjggMzMuMTkyMyAyOS40NjI4IDI4LjQyMzEgMjMuNTQ2IDI4LjQyMzFDMTcuNTkwNSAyOC40MjMxIDEyLjc5NTIgMzMuMjMwOCAxMi43OTUyIDM5LjExNTRDMTIuNzk1MiA0NS4wMzg1IDE3LjYyOTIgNDkuODA3NyAyMy41NDYgNDkuODA3N1oiIGZpbGw9IiNDNzIzMjkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4zODA5IDQwLjE1MzlMMTQuNDE5NSAzOS4yNjkyVjM4LjM0NjJDMTQuNDE5NSAzOC4zMDc3IDE0LjQ1ODIgMzguMzA3NyAxNC40NTgyIDM4LjMwNzdMMTYuNjYyNSAzNy45NjE1TDE2Ljc3ODUgMzcuNTM4NUMxNi45NzE5IDM2Ljg0NjIgMTcuMjAzOSAzNi4yNjkyIDE3LjUxMzMgMzUuNzMwOEwxNy43NDUzIDM1LjM4NDZMMTYuMzkxOCAzMy41Mzg1QzE2LjM1MzEgMzMuNSAxNi4zNTMxIDMzLjQ2MTUgMTYuMzkxOCAzMy40MjMxTDE3LjA0OTIgMzIuNjUzOUwxNy42NjggMzIuMDM4NUMxNy42NjggMzIuMDM4NSAxNy43MDY3IDMyIDE3Ljc0NTMgMzIuMDM4NUwxOS41NjI5IDMzLjM0NjJMMTkuOTExIDMzLjExNTRDMjAuNDkxIDMyLjc2OTIgMjEuMTA5OCAzMi41IDIxLjcyODYgMzIuMzQ2MkwyMi4xMTUzIDMyLjIzMDhMMjIuNTAyIDMwLjAzODVDMjIuNTAyIDMwIDIyLjU0MDcgMzAgMjIuNTQwNyAzMEgyNC4zNTgyQzI0LjM5NjkgMzAgMjQuMzk2OSAzMC4wMzg1IDI0LjM5NjkgMzAuMDM4NUwyNC43ODM2IDMyLjIzMDhMMjUuMTcwNCAzMi4zNDYyQzI1LjgyNzggMzIuNSAyNi40NDY1IDMyLjc2OTIgMjYuOTg3OSAzMy4wNzY5TDI3LjMzNiAzMy4zMDc3TDI5LjE5MjMgMzJDMjkuMjMwOSAzMiAyOS4yNjk2IDMyIDI5LjI2OTYgMzJMMzAuNTQ1OCAzMy4yNjkyQzMwLjU0NTggMzMuMjY5MiAzMC41ODQ1IDMzLjMwNzcgMzAuNTQ1OCAzMy4zNDYyTDI5LjIzMDkgMzUuMTkyM0wyOS40NjMgMzUuNTM4NUMyOS44MTEgMzYuMDc2OSAzMC4wNDMgMzYuNjkyMyAzMC4xOTc3IDM3LjM0NjJMMzAuMzEzOCAzNy43MzA4TDMyLjUxOCAzOC4xMTU0QzMyLjU1NjcgMzguMTE1NCAzMi41NTY3IDM4LjE1MzggMzIuNTU2NyAzOC4xNTM4VjM5Ljk2MTVDMzIuNTU2NyA0MCAzMi41MTggNDAgMzIuNTE4IDQwTDMwLjMxMzggNDAuMzg0NkwzMC4xOTc3IDQwLjc2OTJDMzAuMDQzIDQxLjQyMzEgMjkuNzcyMyA0Mi4wMzg1IDI5LjQ2MyA0Mi41NzY5TDI5LjIzMDkgNDIuOTIzMUwzMC41NDU4IDQ0Ljc2OTJDMzAuNTg0NSA0NC44MDc3IDMwLjU4NDUgNDQuODQ2MiAzMC41NDU4IDQ0Ljg0NjJMMjkuMjY5NiA0Ni4xMTU0QzI5LjI2OTYgNDYuMTE1NCAyOS4yMzA5IDQ2LjE1MzkgMjkuMTkyMyA0Ni4xMTU0TDI3LjMzNiA0NC44MDc3TDI2Ljk4NzkgNDUuMDM4NUMyNi40NDY1IDQ1LjM0NjIgMjUuODY2NSA0NS42MTU0IDI1LjI0NzcgNDUuNzY5MkwyNC44NjEgNDUuODg0NkwyNC40NzQzIDQ4LjExNTRDMjQuNDc0MyA0OC4xNTM5IDI0LjQzNTYgNDguMTUzOCAyNC40MzU2IDQ4LjE1MzhIMjIuNjE4QzIyLjU3OTMgNDguMTUzOCAyMi41NzkzIDQ4LjExNTQgMjIuNTc5MyA0OC4xMTU0TDIyLjE5MjYgNDUuOTIzMUwyMS44MDU5IDQ1LjgwNzdDMjEuMTA5OCA0NS42MTU0IDIwLjUyOTcgNDUuMzg0NiAxOS45ODgzIDQ1LjA3NjlMMTkuNjQwMyA0NC44NDYyTDE3Ljc4NCA0Ni4xOTIzQzE3Ljc0NTMgNDYuMjMwOCAxNy43MDY2IDQ2LjIzMDggMTcuNzA2NiA0Ni4xOTIzTDE2LjQzMDUgNDQuOTIzMUMxNi40MzA1IDQ0LjkyMzEgMTYuMzkxOCA0NC44ODQ2IDE2LjQzMDUgNDQuODQ2MkwxNy43NDUzIDQzLjAzODVMMTcuNTUyIDQyLjY5MjNDMTcuMjAzOSA0Mi4wNzY5IDE2LjkzMzIgNDEuNSAxNi43Nzg1IDQwLjg4NDZMMTYuNjYyNSA0MC41TDE0LjQxOTUgNDAuMTE1NEMxNC40MTk1IDQwLjE5MjMgMTQuMzgwOSA0MC4xNTM5IDE0LjM4MDkgNDAuMTUzOVpNMjAuMTQzIDM1LjY5MjNDMTguMjQ4MSAzNy41NzY5IDE4LjI0ODEgNDAuNjkyMyAyMC4xNDMgNDIuNTc2OUMyMi4wNzY2IDQ0LjUgMjUuMTcwNCA0NC41IDI3LjA2NTMgNDIuNTc2OUMyOC45OTg5IDQwLjY1MzggMjguOTk4OSAzNy41NzY5IDI3LjA2NTMgMzUuNjkyM0MyNS4xNzA0IDMzLjgwNzcgMjIuMDc2NiAzMy44MDc3IDIwLjE0MyAzNS42OTIzWk0yNC45MzgzIDM3Ljg0NjJDMjQuMjAzNiAzNy4xMTU0IDIzLjAwNDcgMzcuMTE1NCAyMi4zMDg2IDM3Ljg0NjJDMjEuNTczOSAzOC41NzY5IDIxLjU3MzkgMzkuNzY5MiAyMi4zMDg2IDQwLjQ2MTVDMjMuMDQzNCA0MS4xOTIzIDI0LjIwMzYgNDEuMTkyMyAyNC45MzgzIDQwLjQ2MTVDMjUuNjczMSAzOS43MzA4IDI1LjY3MzEgMzguNTM4NSAyNC45MzgzIDM3Ljg0NjJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExMC4xNTEgNTguMjYxNkgxMDEuODY2VjEwLjczODRDMTA0LjQ3MiAxMC43Mzg0IDExNC44OTQgMTAuNjA0MSAxMTYuMjMxIDEwLjYwNDFDMTI5LjEyNiAxMC42MDQxIDEzMy40MDIgMTcuMDQ3OSAxMzMuNDAyIDI1LjIzN0MxMzMuNDAyIDMzLjM1ODkgMTI4LjE5IDM3LjQ1MzQgMTI0LjMxNSAzOC43OTU5TDEzOS4wODEgNTguMTk0NUgxMjguOTkyTDExNS45NjMgNDAuNDA2OEgxMTAuMTUxVjU4LjI2MTZaTTExNS44MyAxOC4zOTA0QzExNC4yOTMgMTguMzkwNCAxMTIuMzU1IDE4LjQ1NzUgMTEwLjE1MSAxOC41MjQ3VjMyLjYyMDVIMTE1LjU2M0MxMjAuMzczIDMyLjYyMDUgMTI0LjU4MiAzMC4yMDQxIDEyNC41ODIgMjUuMzA0MUMxMjQuNTgyIDIxLjYxMjMgMTIyLjU3OCAxOC4zOTA0IDExNS44MyAxOC4zOTA0Wk0xNTAuNzczIDM0LjVDMTUwLjc3MyAyMC43Mzk3IDE2MC44NjIgMTAgMTc1LjM2IDEwQzE4OS4zOTEgMTAgMjAwLjAxNSAxOS43MzI5IDIwMC4wMTUgMzQuNUMyMDAuMDE1IDQ4LjczMDEgMTg5LjM5MSA1OSAxNzUuMzYgNTlDMTYxLjI2MyA1OSAxNTAuNzczIDQ5LjI2NzEgMTUwLjc3MyAzNC41Wk0xNTkuNTI2IDM0LjVDMTU5LjUyNiA0NC4wMzE1IDE2Ni40NzQgNTEuMjEzNyAxNzUuMzYgNTEuMjEzN0MxODUuMzE2IDUxLjIxMzcgMTkxLjI2MiA0My44OTczIDE5MS4yNjIgMzQuNUMxOTEuMjYyIDI0LjYzMjkgMTg0LjMxMyAxNy43ODYzIDE3NS4zNiAxNy43ODYzQzE2Ni4yNzQgMTcuNzg2MyAxNTkuNTI2IDI0LjYzMjkgMTU5LjUyNiAzNC41Wk0yMTkuMzkgNTguMTk0NVYxMC44NzI2QzIyMS45OTYgMTAuNzM4NCAyMjguMjc3IDEwLjUzNyAyMzMuMDIgMTAuNTM3QzI0NC4zMTIgMTAuNTM3IDI0OC41ODggMTUuNzA1NSAyNDguNTg4IDIyLjI4MzZDMjQ4LjU4OCAyNy43MjA2IDI0NS45MTUgMzEuMTQzOCAyNDEuODQgMzMuMDkwNFYzMy4yMjQ3QzI0Ni41MTcgMzQuMzY1NyAyNTAuMTI0IDM3Ljk5MDQgMjUwLjEyNCA0NC4zQzI1MC4xMjQgNTQuMSAyNDIuNTc1IDU4LjUzMDEgMjMyLjU1MyA1OC41MzAxQzIyOC4yNzcgNTguNTMwMSAyMjIuMTk3IDU4LjM5NTkgMjE5LjM5IDU4LjE5NDVaTTIzMy42MjIgMzcuODU2MkgyMjcuNzQyVjUwLjQwODJDMjI4Ljg3OCA1MC41NDI0IDIzMC44ODIgNTAuNzQzOCAyMzMuMjIxIDUwLjc0MzhDMjM4LjgzMyA1MC43NDM4IDI0MS44NCA0OC4zOTQ1IDI0MS44NCA0My44OTczQzI0MS44NCAzOS44Njk5IDIzOC43NjYgMzcuODU2MiAyMzMuNjIyIDM3Ljg1NjJaTTIzMi44ODcgMTguMzIzM0MyMzEuMDE2IDE4LjMyMzMgMjI5LjE0NSAxOC4zOTA0IDIyNy42NzUgMTguNTI0N1YzMC41Mzk3SDIzMy4yODhDMjM3LjE2MyAzMC41Mzk3IDI0MC4zMDMgMjguNTkzMSAyNDAuMzAzIDI0LjIzMDFDMjQwLjM3IDIwLjQwNDEgMjM3LjM2MyAxOC4zMjMzIDIzMi44ODcgMTguMzIzM1pNMjcyLjEwNiA1OC4yNjE2VjEwLjczODRIMjgwLjM5MVY1OC4yNjE2SDI3Mi4xMDZaTTM0NC44NjYgNTguMjYxNkgzMzguMjUxTDMxMi4yNjEgMjUuMzcxMlY1OC4yNjE2SDMwNC41MTFWMTAuNzM4NEgzMTEuMTI1TDMzNy4xMTUgNDMuNzYzVjEwLjczODRIMzQ0Ljg2NlY1OC4yNjE2VjU4LjI2MTZaIiBmaWxsPSIjQzcyMzI5Ii8+Cjwvc3ZnPgo=";
const PLATFORM_LOGO_N8N     = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj4KCiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggaWQ9InN2Z18xIiBmaWxsPSIjRUE0QjcxIiBkPSJtMjM5LDgzYy0xMS4xODMsMCAtMjAuNTgsLTcuNjQ5IC0yMy4yNDQsLTE4bC0yNy41MDgsMGMtNS44NjYsMCAtMTAuODcyLDQuMjQxIC0xMS44MzYsMTAuMDI3bC0wLjk4Nyw1LjkxOWMtMC45MzYsNS42MTkgLTMuNzc5LDEwLjUwOSAtNy43OTksMTQuMDU0YzQuMDIsMy41NDUgNi44NjMsOC40MzUgNy43OTksMTQuMDU0bDAuOTg3LDUuOTE5YzAuOTY0LDUuNzg2IDUuOTcsMTAuMDI3IDExLjgzNiwxMC4wMjdsMy41MDgsMGMyLjY2NCwtMTAuMzUxIDEyLjA2MSwtMTggMjMuMjQ0LC0xOGMxMy4yNTUsMCAyNCwxMC43NDUgMjQsMjRjMCwxMy4yNTUgLTEwLjc0NSwyNCAtMjQsMjRjLTExLjE4MywwIC0yMC41OCwtNy42NDkgLTIzLjI0NCwtMThsLTMuNTA4LDBjLTExLjczMiwwIC0yMS43NDQsLTguNDgyIC0yMy42NzMsLTIwLjA1NGwtMC45ODcsLTUuOTE5Yy0wLjk2NCwtNS43ODYgLTUuOTcsLTEwLjAyNyAtMTEuODM2LC0xMC4wMjdsLTkuNTA4LDBjLTIuNjY0LDEwLjM1MSAtMTIuMDYxLDE4IC0yMy4yNDQsMThjLTExLjE4MywwIC0yMC41OCwtNy42NDkgLTIzLjI0NCwtMThsLTEzLjUxMiwwYy0yLjY2NCwxMC4zNTEgLTEyLjA2MSwxOCAtMjMuMjQ0LDE4Yy0xMy4yNTQ4LDAgLTI0LC0xMC43NDUgLTI0LC0yNGMwLC0xMy4yNTUgMTAuNzQ1MiwtMjQgMjQsLTI0YzExLjE4MywwIDIwLjU4LDcuNjQ5IDIzLjI0NCwxOGwxMy41MTIsMGMyLjY2NCwtMTAuMzUxIDEyLjA2MSwtMTggMjMuMjQ0LC0xOGMxMS4xODMsMCAyMC41OCw3LjY0OSAyMy4yNDQsMThsOS41MDgsMGM1Ljg2NiwwIDEwLjg3MiwtNC4yNDEgMTEuODM2LC0xMC4wMjdsMC45ODcsLTUuOTE5YzEuOTI5LC0xMS41NzIgMTEuOTQxLC0yMC4wNTQgMjMuNjczLC0yMC4wNTRsMjcuNTA4LDBjMi42NjQsLTEwLjM1MSAxMi4wNjEsLTE4IDIzLjI0NCwtMThjMTMuMjU1LDAgMjQsMTAuNzQ1IDI0LDI0YzAsMTMuMjU1IC0xMC43NDUsMjQgLTI0LDI0em0wLC0xMmM2LjYyNywwIDEyLC01LjM3MyAxMiwtMTJjMCwtNi42MjcgLTUuMzczLC0xMiAtMTIsLTEyYy02LjYyNywwIC0xMiw1LjM3MyAtMTIsMTJjMCw2LjYyNyA1LjM3MywxMiAxMiwxMnptLTE4MCwzNmM2LjYyNywwIDEyLC01LjM3MyAxMiwtMTJjMCwtNi42MjcgLTUuMzczLC0xMiAtMTIsLTEyYy02LjYyNzQsMCAtMTIsNS4zNzMgLTEyLDEyYzAsNi42MjcgNS4zNzI2LDEyIDEyLDEyem03MiwtMTJjMCw2LjYyNyAtNS4zNzMsMTIgLTEyLDEyYy02LjYyNywwIC0xMiwtNS4zNzMgLTEyLC0xMmMwLC02LjYyNyA1LjM3MywtMTIgMTIsLTEyYzYuNjI3LDAgMTIsNS4zNzMgMTIsMTJ6bTk2LDM2YzAsNi42MjcgLTUuMzczLDEyIC0xMiwxMmMtNi42MjcsMCAtMTIsLTUuMzczIC0xMiwtMTJjMCwtNi42MjcgNS4zNzMsLTEyIDEyLC0xMmM2LjYyNywwIDEyLDUuMzczIDEyLDEyeiIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KICA8cGF0aCBpZD0ic3ZnXzIiIGZpbGw9IiMxMDEzMzAiIGQ9Im00MDcuMDE3LDg2Ljg4N2wwLC0wLjU3MWM0LjE4NywtMi4wOTcgOC4zNzQsLTUuNzE5IDguMzc0LC0xMi44NjdjMCwtMTAuMjk0IC04LjQ2OSwtMTYuNDg5IC0yMC4xNzMsLTE2LjQ4OWMtMTEuOTksMCAtMjAuNTU0LDYuNTc2IC0yMC41NTQsMTYuNjc5YzAsNi44NjMgMy45OTYsMTAuNTggOC4zNzQsMTIuNjc3bDAsMC41NzFjLTQuODUzLDEuNzE2IC0xMC42NTgsNi44NjMgLTEwLjY1OCwxNS40NDFjMCwxMC4zODggOC41NjQsMTcuNjMyIDIyLjc0MywxNy42MzJjMTQuMTc4LDAgMjIuNDU3LC03LjI0NCAyMi40NTcsLTE3LjYzMmMwLC04LjU3OCAtNS43MSwtMTMuNjMgLTEwLjU2MywtMTUuNDQxem0tMTEuODk0LC0yMS4xNThjNC43NTgsMCA4LjI3OCwzLjA0OSA4LjI3OCw4LjE5NmMwLDUuMTQ3IC0zLjYxNiw4LjE5NyAtOC4yNzgsOC4xOTdjLTQuNjYzLDAgLTguNTY1LC0zLjA1IC04LjU2NSwtOC4xOTdjMCwtNS4yNDIgMy43MTIsLTguMTk2IDguNTY1LC04LjE5NnptMCw0NS4wODFjLTUuNTIsMCAtOS45OTIsLTMuNTI2IC05Ljk5MiwtOS41MzFjMCwtNS40MzIgMy43MTEsLTkuNTMxIDkuODk2LC05LjUzMWM2LjA5MSwwIDkuODAyLDQuMDAzIDkuODAyLDkuNzIyYzAsNS44MTQgLTQuMjgyLDkuMzQgLTkuNzA2LDkuMzR6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgogIDxwYXRoIGlkPSJzdmdfMyIgZmlsbD0iIzEwMTMzMCIgZD0ibTQzMi4yNiwxMTkuMDA3bDEyLjE4LDBsMCwtMjUuODI5YzAsLTguNDgzIDUuMTM5LC0xMi4yIDEwLjk0MywtMTIuMmM1LjcxLDAgMTAuMTgyLDMuODEzIDEwLjE4MiwxMS42MjhsMCwyNi40MDFsMTIuMTgsMGwwLC0yOC44NzljMCwtMTIuNDg2IC03LjIzMiwtMTkuNzI5IC0xOC41NTUsLTE5LjcyOWMtNy4xMzcsMCAtMTEuMTM0LDIuODU5IC0xMy45ODksNi41NzZsLTAuNzYxLDBsLTEuMDQ3LC01LjYyM2wtMTEuMTMzLDBsMCw0Ny42NTV6Ii8+CiAgPHBhdGggaWQ9InN2Z180IiBmaWxsPSIjMTAxMzMwIiBkPSJtMzI0LjQ0LDExOS4wMDdsLTEyLjE4LDBsMCwtNDcuNjU1bDExLjEzMywwbDEuMDQ3LDUuNjIzbDAuNzYxLDBjMi44NTUsLTMuNzE3IDYuODUyLC02LjU3NiAxMy45ODksLTYuNTc2YzExLjMyMywwIDE4LjU1NSw3LjI0MyAxOC41NTUsMTkuNzI5bDAsMjguODc5bC0xMi4xOCwwbDAsLTI2LjQwMWMwLC03LjgxNSAtNC40NzIsLTExLjYyOCAtMTAuMTgyLC0xMS42MjhjLTUuODA0LDAgLTEwLjk0MywzLjcxNyAtMTAuOTQzLDEyLjJsMCwyNS44Mjl6Ii8+CiA8L2c+Cjwvc3ZnPg==";
const PLATFORM_LOGO_DIFY    = "data:image/webp;base64,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";
const PLATFORM_LOGO_1C      = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcyIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICB3aWR0aD0iNDg5Ljc2MDEiCiAgIGhlaWdodD0iMjM4Ljg1ODE1IgogICB2aWV3Qm94PSIwIDAgNDg5Ljc2MDExIDIzOC44NTgxNiIKICAgc29kaXBvZGk6ZG9jbmFtZT0iMUMuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIj48bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE4Ij48cmRmOlJERj48Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcwogICAgIGlkPSJkZWZzNiI+PGNsaXBQYXRoCiAgICAgICBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGlkPSJjbGlwUGF0aDE4Ij48cGF0aAogICAgICAgICBkPSJNIDAsMCBIIDU5NS4yNzYgViA1OTUuMjc2IEggMCBaIgogICAgICAgICBpZD0icGF0aDE2IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvY2xpcFBhdGg+PC9kZWZzPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE3IgogICAgIGlkPSJuYW1lZHZpZXc0IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIKICAgICBpbmtzY2FwZTp6b29tPSIxLjY4MjAxNSIKICAgICBpbmtzY2FwZTpjeD0iMjExLjI5NzczIgogICAgIGlua3NjYXBlOmN5PSIzMC4wMjIwMjkiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImcxMCIgLz48ZwogICAgIGlkPSJnMTAiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpbmtzY2FwZTpsYWJlbD0iQTlSZGZwa3AxXzFnMmoxa2ZfNmk4IgogICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMzMzMywwLDAsLTEuMzMzMzMzMyw1My42ODY0OSw4OTcuMTg5NjQpIj48ZwogICAgICAgaWQ9ImcxMiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDUuODQyNzE5NiwwLDAsNS44NDI3MTk2LC0xNTgzLjgzNjYsLTIzOTEuMDg2KSI+PGcKICAgICAgICAgaWQ9ImcxNCIKICAgICAgICAgY2xpcC1wYXRoPSJ1cmwoI2NsaXBQYXRoMTgpIj48ZwogICAgICAgICAgIGlkPSJnMjAiCiAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjk2LjgwOTIsNDk3LjgyNzYpIj48cGF0aAogICAgICAgICAgICAgZD0ibSAwLDAgYyAtMS4yMTUsMC4wODEgLTIuNjE2LDAuMjk0IC0zLjcyMSwwLjYxNCAtMC4yMDcsMC4wNiAtMS4wNjQsMC4zNzUgLTEuMjgyLDAuNDc1IC0zLjg0NywxLjc4MiAtNi41MjcsNS42NzIgLTYuNTI3LDEwLjE4NSAwLDYuMTkgNS4wMzYsMTEuMjMyIDExLjIzLDExLjIzMiA2LjEzOSwwIDExLjE0MSwtNC45NTYgMTEuMjI3LC0xMS4wNzYgaCA0LjA1NyBDIDE0Ljg5OCwxOS43ODYgOC4wNzcsMjYuNTU4IC0wLjMsMjYuNTU4IGMgLTguNDI3LDAgLTE1LjI4NiwtNi44NTUgLTE1LjI4NiwtMTUuMjg0IDAsLTUuODExIDMuMjY4LC0xMC44NjUgOC4wNTMsLTEzLjQ0NyAwLjg2NCwtMC40NTcgMi4xMDQsLTAuOTI4IDIuNTI1LC0xLjA1NyAxLjM2NCwtMC40MDYgMy4wMzgsLTAuNjc2IDQuNTI4LC0wLjc4OSAwLjUwNiwtMC4wMzggMi4yNzMsLTAuMDU4IDIuNzg4LC0wLjA2IGggMjcuOTM4IHYgNC4wNDEgSCAyLjM1NSBDIDEuOTg0LC0wLjAzOCAwLjM2MywtMC4wMjQgMCwwIG0gMi4zNTUsNi4zNDUgdiAwIGMgLTAuMjk1LDAgLTEuODM4LDAuMDEgLTIuMTIzLDAuMDM0IC0wLjQ4MywwLjA0MSAtMS4xODMsMC4xMTMgLTEuNjMzLDAuMjE2IC0wLjUwOCwwLjEzNiAtMC45ODUsMC4zMTYgLTEuMiwwLjQzNCAtMS41MDcsMC44MTUgLTIuNTM0LDIuNDA5IC0yLjUzNCw0LjI0NSAwLDIuNjcxIDIuMTYzLDQuODM3IDQuODM1LDQuODM3IDIuNjE2LDAgNC43NDMsLTIuMDgxIDQuODI4LC00LjY4MSBoIDMuODk4IGMgLTAuMDgyLDQuNzUgLTMuOTU0LDguNTc4IC04LjcyNiw4LjU3OCAtNC44MjUsMCAtOC43MzYsLTMuOTEgLTguNzM2LC04LjczNCAwLC0zLjQwMiAxLjk1LC02LjM0IDQuNzksLTcuNzc5IEMgLTMuODA5LDMuMjM5IC0yLjk4NywyLjk3MSAtMi43NTMsMi45MSAtMS45NTEsMi42OTkgLTAuODc0LDIuNTU1IDAsMi40OTEgMC4zMjMsMi40NjQgMS45MDUsMi40NTIgMi4yMzksMi40NSBWIDIuNDQ0IEggMzAuMjQ1IFYgNi4zNDUgWiBNIC0xOC4wODYsLTQuMDY0IGggLTQuMDg0IHYgMjYuNTYxIGggLTUuOTY4IHYgNC4wODUgaCAxMC4wNTIgeiBtIC0xNC41MzYsMjQuNTIgdiAtMy45MjggaCA0LjQ4NCBWIC00LjA2NCBoIDMuOTI0IHYgMjQuNTIgeiIKICAgICAgICAgICAgIHN0eWxlPSJmaWxsOiNkOTE5MjA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmUiCiAgICAgICAgICAgICBpZD0icGF0aDIyIgogICAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz48L2c+PGcKICAgICAgICAgICBpZD0iZzI0IgogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMxOS44Mzg4LDUyNC4xMjQzKSI+PHBhdGgKICAgICAgICAgICAgIGQ9Im0gMCwwIGMgLTEuNDcxLDAgLTIuNjkxLC0xLjE3MyAtMi42OTEsLTIuNjQ1IDAsLTEuNDcyIDEuMjIsLTIuNjkyIDIuNjkxLC0yLjY5MiAxLjUxNiwwIDIuNjg5LDEuMjIgMi42ODksMi42OTIgQyAyLjY4OSwtMS4xNzMgMS41MTYsMCAwLDAgbSAwLC00LjkwMyBjIC0xLjIxNSwwIC0yLjI2MiwwLjk1NSAtMi4yNjIsMi4yNTggMCwxLjIzNyAxLjA0NywyLjIxNiAyLjI2MiwyLjIxNiAxLjIxNCwwIDIuMjU2LC0wLjk3OSAyLjI1NiwtMi4yMTYgMCwtMS4zMDMgLTEuMDQyLC0yLjI1OCAtMi4yNTYsLTIuMjU4IgogICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2Q5MTkyMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgICAgIGlkPSJwYXRoMjYiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvZz48ZwogICAgICAgICAgIGlkPSJnMjgiCiAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIwLjg2MzQsNTIwLjc1NDUpIj48cGF0aAogICAgICAgICAgICAgZD0ibSAwLDAgYyAwLDAuMjk3IC0wLjA0NCwwLjU3MyAtMC4zODQsMC42ODIgMC40MjYsMC4xNDggMC40NjgsMC40MjcgMC40NjgsMC41OTYgMCwwLjY4MyAtMC42MiwwLjc3IC0wLjg3NSwwLjc3IGggLTEuMTczIHYgLTIuNjQ1IGggMC40ODkgdiAxLjA4NSBoIDAuMzg1IGMgMC41NTQsMCAwLjYsLTAuMjU1IDAuNiwtMC40ODggMCwtMC40NTEgMCwtMC41MzYgMC4xMDYsLTAuNTk3IGggMC40OSBDIDAsLTAuNDkgMC4wNDIsLTAuNDA3IDAsMCBtIC0wLjg5OCwwLjg3NCBoIC0wLjU3NyB2IDAuODMzIGggMC40OTQgYyAwLjM0MiwwIDAuNTc0LC0wLjEwOCAwLjU3NCwtMC40MjkgMCwtMC4xNjkgLTAuMDgzLC0wLjQwNCAtMC40OTEsLTAuNDA0IgogICAgICAgICAgICAgc3R5bGU9ImZpbGw6I2Q5MTkyMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgICAgIGlkPSJwYXRoMzAiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4=";
const PLATFORM_LOGO_MAKE    = "data:image/jpeg;base64,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oexK0j3OOyf8waH/ABE/7aldEGuaB0NpPQdsntukbJTWmlnl8tKyIucXvwBklxJPQDx6LY0RBHmrNktq9VX+pv1/0bQ1tyqiDPOZJGGQgAAkNcBnAHXCxkfDnsoyRr26At5LSCOaaYjp6QX4PyFSsiD+Ma1jAxjQ1rRgADAAWpbibaaF3Bp2xav01RXN7G8sc7gWTxjOcNlYQ8DPgDhbciCA28IuzIq/LG23cx/8E3F/J9fwv81Km3+3ui9A0LqPSGnKG0seAJZImF0soHbnkcS9+PWThbQiCLKrh42XqqqWpm0DbvKSvL38ksrBknJw0PAA9QGFktH7K7XaRv8AT3/TujqGhudOHCGoa+R7o+ZpaSOZxAOCRnv1KkFEGl6/2q2917cqe5au0vR3Wsp4fIRTyOex4jyXcuWOGQCSQD2ycdytc9zjsn/MGh/xE/7aldEHjslrt9ktFJaLTRxUdBRxNhp4IhhsbGjAAXsREEZXjYLZ+73aqutw0Lb5ayrldNPIJJWc73HLnYa8AZPXoF5fc47J/wAwaH/ET/tqV0Qee10NHa7bS223U0VLR0kLIKeCJvKyKNoDWtaPAAABa7r3bnQ2vIBFq3TFuupDeRk0sfLOxvobK3D2j5HBbUiCv9w4Qtm6mYyQ0d6om/8ADguLi3/WHH/NZGwcKuy1qnjnk05U3KSM5Ht2ule0n1taWtPyEEKb0QeCw2a0WC2R2yx2uitlDFnkp6SBsUbc9yGtAGV70RAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z";
const PLATFORM_LOGO_CAMUNDA = "data:image/jpeg;base64,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";

function PlatformLogo({ src, alt, sizeClass = "h-10 lg:h-12" }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${sizeClass} w-auto object-contain`}
      style={{ maxWidth: "80%" }}
    />
  );
}

function PlatformMarkRobin()   { return <PlatformLogo src={PLATFORM_LOGO_ROBIN}   alt="ROBIN"   sizeClass="h-7 lg:h-8" />; }
function PlatformMarkN8n()     { return <PlatformLogo src={PLATFORM_LOGO_N8N}     alt="n8n"     />; }
function PlatformMarkDify()    { return <PlatformLogo src={PLATFORM_LOGO_DIFY}    alt="Dify"    />; }
function PlatformMark1C()      { return <PlatformLogo src={PLATFORM_LOGO_1C}      alt="1С"      />; }
function PlatformMarkMake()    { return <PlatformLogo src={PLATFORM_LOGO_MAKE}    alt="Make"    />; }
function PlatformMarkCamunda() { return <PlatformLogo src={PLATFORM_LOGO_CAMUNDA} alt="Camunda" />; }

// ───────────────────────────────────────────────────────────────────────────
// METRICS
// ───────────────────────────────────────────────────────────────────────────

function MetricsBand() {
  const metrics = [
    { value: "250+", label: "моделей в каталоге" },
    { value: "80%", label: "готовности из коробки" },
    { value: "5×", label: "Сокращение цикла внедрения" },
    { value: "40+", label: "MCP-коннекторов" },
  ];
  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="border-l border-slate-800 pl-6 lg:pl-8 transition-all duration-300 hover:border-indigo-500"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2 font-bold">
                {m.value}
              </div>
              <div className="text-sm text-slate-400 leading-relaxed">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// CTA FOOTER BLOCK
// ───────────────────────────────────────────────────────────────────────────

function CtaFooterBlock({ onSandbox, onCatalog, onRegister }) {
  return (
    <section className="border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-slate-50/40 p-12 lg:p-16">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-slate-900 leading-tight mb-6">
              Запросите доступ
              <br />
              <span className="text-accent-gradient">к платформе</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Развёртывание ИИ-агентов и RPA-сценариев в изолированной среде ROBIN.
              LLM-провайдер настроен заранее, API-ключи на стороне клиента не требуются
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={onRegister} icon={<ArrowRight className="w-4 h-4" />}>
                Зарегистрироваться в платформе
              </PrimaryButton>
              <SandboxButton onClick={onCatalog}>Смотреть каталог</SandboxButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// CATALOG VIEW
// ───────────────────────────────────────────────────────────────────────────

function CatalogView({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
}) {
  // Capability filter still drives chips (multi-select)
  const [selectedCaps, setSelectedCaps] = useState(() => new Set());
  const toggleCap = (cap) => {
    setSelectedCaps((prev) => {
      const next = new Set(prev);
      next.has(cap) ? next.delete(cap) : next.add(cap);
      return next;
    });
  };

  // Combined filter: chip-set (capabilities, OR) AND sidebar (single category) AND search
  const visibleModels = CATALOG_MODELS.filter((m) => {
    if (selectedCaps.size > 0 && !selectedCaps.has(m.capability)) return false;
    if (selectedCategory !== "Все" && m.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !m.name.toLowerCase().includes(q) &&
        !m.description.toLowerCase().includes(q) &&
        !m.provider.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  // Sidebar counts — apply other filters but not the category itself
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = CATALOG_MODELS.filter((m) => {
      if (selectedCaps.size > 0 && !selectedCaps.has(m.capability)) return false;
      if (cat === "Все") return true;
      return m.category === cat;
    }).length;
    return acc;
  }, {});

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Lock body scroll while bottom sheet is open
  useEffect(() => {
    if (bottomSheetOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [bottomSheetOpen]);

  const activeFilterCount =
    (selectedCategory && selectedCategory !== "Все" ? 1 : 0) +
    selectedCaps.size;

  return (
    <section>
      {/* Header */}
      <div className="border-b border-slate-200/60 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 md:mb-6">
            <span>Главная</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">Каталог</span>
          </div>
          <h1 className="page-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight mb-3 md:mb-4">
            Каталог шаблонов решений
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl">
            Готовые ИИ-агенты, RPA-роботы и MCP-коннекторы для корпоративных задач.
            Тестирование в безопасной песочнице после регистрации в платформе ROBIN
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex gap-x-10 md:gap-x-12 lg:gap-x-16">
          {/* Sidebar — fixed 250px, hidden on mobile (replaced by bottom sheet) */}
          <aside
            className="hidden md:block flex-shrink-0 sticky top-24 self-start space-y-7"
            style={{ width: 250 }}
          >
            <FilterGroup
              label="Категория"
              options={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              counts={categoryCounts}
            />
          </aside>

          {/* Right column: search + chips + grid */}
          <main className="flex-1 min-w-0">
            {/* Row 1: Search bar — full width */}
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск шаблонов…"
                className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
              />
            </div>

            {/* Row 2 — mobile: filter button + chips horizontal scroll;
                       desktop: just chips. */}
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              {/* Filter button — only on mobile */}
              <button
                onClick={() => setBottomSheetOpen(true)}
                className="md:hidden flex-shrink-0 inline-flex items-center gap-1.5 h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
                Фильтры
                {activeFilterCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center h-5 px-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-semibold"
                    style={{ minWidth: 20 }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Chips — wrap on desktop, horizontal scroll on mobile */}
              <div
                className="flex-1 min-w-0 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <CatalogChips selectedSet={selectedCaps} onToggle={toggleCap} />
              </div>
            </div>

            {/* Counter */}
            <div className="text-sm text-slate-500 mb-6 md:mb-8">
              Найдено{" "}
              <span className="font-medium text-slate-900">
                {visibleModels.length}
              </span>{" "}
              из {CATALOG_MODELS.length}{" "}
              {pluralize(CATALOG_MODELS.length, ["шаблон", "шаблона", "шаблонов"])}
            </div>

            {/* Grid — 2 cols on mobile, 3 on xl */}
            {visibleModels.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-xl p-10 md:p-16 text-center">
                <Search className="w-8 h-8 mx-auto text-slate-400 mb-3" strokeWidth={1.5} />
                <div className="font-medium text-slate-900 mb-1">
                  Ничего не найдено
                </div>
                <p className="text-sm text-slate-500">
                  Попробуйте снять фильтры или изменить запрос.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {visibleModels.map((m, i) => (
                  <ModelCard
                    key={m.id}
                    model={m}
                    delay={i}
                    onClick={() => onSelectProduct(m)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile bottom sheet with filters */}
      <FilterBottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        selectedCaps={selectedCaps}
        toggleCap={toggleCap}
        clearCaps={() => setSelectedCaps(new Set())}
        clearAll={() => {
          setSelectedCategory("Все");
          setSelectedCaps(new Set());
        }}
        resultCount={visibleModels.length}
      />
    </section>
  );
}

function FilterBottomSheet({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  selectedCaps,
  toggleCap,
  clearAll,
  resultCount,
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-200 flex-shrink-0">
          <h3 className="text-base font-semibold text-slate-900">Фильтры</h3>
          <button
            onClick={clearAll}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Сбросить
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          <FilterGroup
            label="Категория"
            options={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            counts={categoryCounts}
          />
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
              Тип возможности
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALL_CAPABILITIES.map((cap) => {
                const isActive = selectedCaps.has(cap);
                return (
                  <button
                    key={cap}
                    onClick={() => toggleCap(cap)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-md font-mono text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
                      isActive
                        ? CAP_ACTIVE[cap]
                        : "bg-white text-slate-500 border-slate-200"
                    }`}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
          >
            Показать {resultCount}{" "}
            {pluralize(resultCount, ["шаблон", "шаблона", "шаблонов"])}
          </button>
        </div>
      </div>
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// CATALOG: chips, model cards, data
// ───────────────────────────────────────────────────────────────────────────

const CATALOG_MODELS = [
  // ─── ИИ-агенты ─────────────────────────────────────────────────────
  {
    id: "act-reconciliation",
    name: "Сверка актов",
    category: "Финансы",
    provider: "ROBIN Lab",
    capability: "ИИ-агент",
    type: "ИИ-агент",
    icon: FileCheck,
    short: "Автоматическая сверка актов выполненных работ с договорами и регистрами оплат.",
    description:
      "Агент извлекает данные из актов, договоров и платежных регистров, сопоставляет суммы, периоды и контрагентов. Формирует отчёт о расхождениях. Сокращает закрытие месяца финансовой службой на 60-70%.",
    platforms: ["ROBIN", "1С:ERP"],
    rating: 4.9,
    downloads: 1240,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "1.8.2",
    author: "ROBIN Lab",
    updated: "28 апреля 2026",
    llms: ["Совместимо с любыми LLM, подключёнными к ROBIN"],
    dot: "#dc2626",
  },
  {
    id: "contract-review",
    name: "Проверка договоров",
    category: "Сервис",
    provider: "ROBIN Lab",
    capability: "ИИ-агент",
    type: "ИИ-агент",
    icon: Shield,
    short: "Проверка договоров на соответствие политикам компании и выявление юридических рисков.",
    description:
      "Анализирует тексты договоров, сопоставляет с шаблонами политики и регламентами. Помечает потенциально рискованные формулировки, нестандартные условия и отклонения от типовых форм.",
    platforms: ["ROBIN", "СЭД"],
    rating: 4.8,
    downloads: 980,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "2.1.0",
    author: "ROBIN Lab",
    updated: "12 апреля 2026",
    llms: ["Совместимо с любыми LLM, подключёнными к ROBIN"],
    dot: "#dc2626",
  },
  {
    id: "smart-search",
    name: "Интеллектуальный поиск",
    category: "Сервис",
    provider: "ROBIN Lab",
    capability: "ИИ-агент",
    type: "ИИ-агент",
    icon: Search,
    short: "Поиск ответов по корпоративной базе знаний на естественном языке.",
    description:
      "Агент индексирует документы из корпоративных хранилищ (СЭД, файловые сервера, базы знаний) и отвечает на вопросы сотрудников на естественном языке со ссылками на источники.",
    platforms: ["ROBIN", "СЭД", "Confluence"],
    rating: 4.7,
    downloads: 2150,
    verified: true,
    robinReady: true,
    pricing: "По запросу",
    free: false,
    version: "1.3.5",
    author: "ROBIN Lab",
    updated: "20 апреля 2026",
    llms: ["Совместимо с любыми LLM, подключёнными к ROBIN"],
    dot: "#dc2626",
  },

  // ─── RPA-роботы ────────────────────────────────────────────────────
  {
    id: "osv-1c-report",
    name: "Формирование отчёта ОСВ в 1С",
    category: "Финансы",
    provider: "ROBIN Lab",
    capability: "RPA",
    type: "RPA",
    icon: FileText,
    short: "Автоматическое формирование оборотно-сальдовой ведомости в 1С по расписанию.",
    description:
      "Робот запускает 1С, формирует ОСВ по нужным счетам и периодам, выгружает в Excel или PDF, рассылает по списку получателей. Работает по расписанию или по событию.",
    platforms: ["ROBIN", "1С:Бухгалтерия", "1С:ERP"],
    rating: 4.8,
    downloads: 1680,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "3.2.1",
    author: "ROBIN Lab",
    updated: "15 апреля 2026",
    llms: [],
    dot: "#2563eb",
  },
  {
    id: "bank-statements",
    name: "Загрузка банковских выписок",
    category: "Финансы",
    provider: "ROBIN Lab",
    capability: "RPA",
    type: "RPA",
    icon: Download,
    short: "Скачивание выписок из клиент-банков и автоматическая загрузка в 1С.",
    description:
      "Робот заходит в клиент-банки крупнейших российских банков, скачивает выписки за указанный период, конвертирует в нужный формат и загружает в учётную систему.",
    platforms: ["ROBIN", "1С", "Клиент-банки"],
    rating: 4.7,
    downloads: 1430,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "2.5.0",
    author: "ROBIN Lab",
    updated: "8 апреля 2026",
    llms: [],
    dot: "#2563eb",
  },
  {
    id: "kedo-onboarding",
    name: "Кадровый ЭДО",
    category: "HR",
    provider: "ROBIN Lab",
    capability: "RPA",
    type: "RPA",
    icon: Layers,
    short: "Автоматизация кадрового электронного документооборота: приём, отпуск, увольнение.",
    description:
      "Робот формирует пакет кадровых документов на основании заявок в HR-системе, отправляет на согласование, рассылает на подписание через КЭДО, загружает в архив. Покрывает приём, перевод, отпуск, увольнение.",
    platforms: ["ROBIN", "1С:ЗУП", "СЭД"],
    rating: 4.6,
    downloads: 870,
    verified: true,
    robinReady: true,
    pricing: "По запросу",
    free: false,
    version: "1.9.4",
    author: "ROBIN Lab",
    updated: "2 апреля 2026",
    llms: [],
    dot: "#2563eb",
  },

  // ─── MCP-коннекторы ────────────────────────────────────────────────
  {
    id: "diadoc-connector",
    name: "Коннектор: Диадок",
    category: "Финансы",
    provider: "ROBIN Lab",
    capability: "MCP",
    type: "MCP",
    icon: Plug,
    short: "MCP-коннектор к системе электронного документооборота Диадок от СКБ Контур.",
    description:
      "Универсальный коннектор для работы ИИ-агентов и RPA-роботов с Диадоком. Получение входящих документов, отправка исходящих, проверка статусов подписания, выгрузка реестров.",
    platforms: ["ROBIN", "Диадок"],
    rating: 4.8,
    downloads: 720,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "1.4.2",
    author: "ROBIN Lab",
    updated: "5 апреля 2026",
    llms: [],
    dot: "#16a34a",
  },
  {
    id: "1c-connector",
    name: "Коннектор: 1С",
    category: "Производство",
    provider: "ROBIN Lab",
    capability: "MCP",
    type: "MCP",
    icon: Plug,
    short: "Универсальный MCP-коннектор для работы с любыми конфигурациями 1С.",
    description:
      "Подключение ИИ-агентов и роботов к 1С:ERP, 1С:Бухгалтерия, 1С:ЗУП и пользовательским конфигурациям. Чтение/запись справочников, документов, регистров. Запуск типовых операций.",
    platforms: ["ROBIN", "1С"],
    rating: 4.9,
    downloads: 3210,
    verified: true,
    robinReady: true,
    pricing: "Бесплатно для ROBIN",
    free: true,
    version: "2.7.0",
    author: "ROBIN Lab",
    updated: "22 апреля 2026",
    llms: [],
    dot: "#16a34a",
  },
  {
    id: "tessa-connector",
    name: "Коннектор: Tessa",
    category: "Сервис",
    provider: "ROBIN Lab",
    capability: "MCP",
    type: "MCP",
    icon: Plug,
    short: "MCP-коннектор к системе электронного документооборота Tessa от Syntellect.",
    description:
      "Двусторонний обмен с Tessa: получение карточек документов, маршрутизация задач, контроль статусов, выгрузка отчётов. Поддерживает кастомные типы документов.",
    platforms: ["ROBIN", "Tessa"],
    rating: 4.6,
    downloads: 540,
    verified: true,
    robinReady: true,
    pricing: "По запросу",
    free: false,
    version: "1.2.1",
    author: "ROBIN Lab",
    updated: "30 марта 2026",
    llms: [],
    dot: "#16a34a",
  },
];

const CAP_BADGE = {
  "ИИ-агент": "bg-indigo-50     text-indigo-600",
  "RPA":      "bg-blue-50    text-blue-700",
  "MCP":      "bg-emerald-50 text-emerald-700",
};

const CAP_ACTIVE = {
  "ИИ-агент": "bg-indigo-50     text-indigo-600     border-indigo-500",
  "RPA":      "bg-blue-50    text-blue-700    border-blue-500",
  "MCP":      "bg-emerald-50 text-emerald-700 border-emerald-500",
};

const ALL_CAPABILITIES = ["ИИ-агент", "RPA", "MCP"];

function CatalogChips({ selectedSet, onToggle }) {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      {ALL_CAPABILITIES.map((cap) => {
        const isActive = selectedSet.has(cap);
        return (
          <button
            key={cap}
            onClick={() => onToggle(cap)}
            className={`flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-md font-mono text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
              isActive
                ? CAP_ACTIVE[cap]
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
            }`}
          >
            {cap}
          </button>
        );
      })}
    </div>
  );
}

function ModelCard({ model, delay = 0, onClick }) {
  const capStyle = CAP_BADGE[model.capability] || CAP_BADGE["ИИ-агент"];
  const Icon = model.icon || Sparkles;
  return (
    <article
      onClick={onClick}
      className="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer scroll-fade-in"
      style={{ animationDelay: `${0.04 * delay}s` }}
    >
      {/* Top row: capability badge + Стандарт ROBIN */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono font-semibold uppercase tracking-wider ${capStyle}`}
          style={{ fontSize: 10 }}
        >
          {model.capability}
        </span>
        {model.robinReady && (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100"
            style={{ fontSize: 10 }}
            title="Решение проверено и совместимо с платформой ROBIN"
          >
            <Shield className="w-2.5 h-2.5" strokeWidth={2.5} />
            Стандарт ROBIN
          </span>
        )}
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600">
          <Icon
            className="w-4 h-4 text-slate-700 transition-colors duration-300 group-hover:text-white"
            strokeWidth={1.75}
          />
        </div>
        <h3 className="text-base font-semibold tracking-tight text-slate-900 leading-snug pt-1">
          {model.name}
        </h3>
      </div>

      {/* Author + platform */}
      <div className="flex items-center gap-1.5 mb-3 ml-12 text-xs">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: model.dot }}
        />
        <span className="text-slate-500 font-medium truncate">{model.author}</span>
        {model.platforms && model.platforms[0] && (
          <>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 truncate">{model.platforms[0]}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p
        className="text-sm text-slate-600 leading-relaxed mb-5 flex-1"
        style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}
      >
        {model.short}
      </p>

      {/* Pricing line — business status instead of token-based price */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
        <span
          className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider ${
            model.free ? "text-emerald-700" : "text-slate-500"
          }`}
          style={{ fontSize: 10 }}
        >
          {model.free ? (
            <>
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
              {model.pricing}
            </>
          ) : (
            <>
              <Mail className="w-3 h-3" strokeWidth={2.5} />
              {model.pricing}
            </>
          )}
        </span>
        <span className="font-mono text-slate-400" style={{ fontSize: 10 }}>
          v{model.version}
        </span>
      </div>
    </article>
  );
}

function CapabilityFilter({ label, options, selectedSet, onToggle, counts }) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        {label}
      </h3>
      <div className="space-y-1">
        {options.map((option) => {
          const checked = selectedSet.has(option);
          const count = counts?.[option] ?? 0;
          return (
            <label
              key={option}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer group hover:bg-slate-100/60 transition-colors"
            >
              <span
                className={`relative w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  checked
                    ? "bg-slate-900 border-slate-900"
                    : "bg-white border-slate-300 group-hover:border-slate-400"
                }`}
              >
                {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900 flex-1 transition-colors">
                {option}
              </span>
              <span className="text-xs font-mono text-slate-400">{count}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function FilterGroup({ label, options, selected, onSelect, counts }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
        {label}
      </div>
      <div className="space-y-1">
        {options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="font-medium">{option}</span>
              <span
                className={`inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-mono font-semibold border transition-colors duration-200 ${
                  active
                    ? "bg-white/15 text-white border-white/20"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
                style={{ minWidth: 28 }}
              >
                {counts?.[option] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100">
      <CheckCircle2 className="w-3 h-3 text-emerald-600" strokeWidth={2.25} />
      <span className="text-xs font-mono uppercase tracking-wider font-medium text-emerald-700">
        Проверено
      </span>
    </div>
  );
}

function ProductCard({ product, onClick, delay = 0 }) {
  const Icon = product.icon;
  return (
    <button
      onClick={onClick}
      className="group relative text-left bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-slate-900 hover:shadow-xl scroll-fade-in overflow-hidden"
      style={{ animationDelay: `${0.03 * delay}s` }}
    >
      {/* Subtle gradient hover wash */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-50/0 via-transparent to-violet-50/40 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600">
            <Icon
              className="w-5 h-5 text-slate-700 transition-colors duration-300 group-hover:text-white"
              strokeWidth={1.75}
            />
          </div>
          {product.verified && <VerifiedBadge />}
        </div>

        <h3 className="text-lg font-medium tracking-tight text-slate-900 mb-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3 text-xs">
          <span className="font-mono uppercase tracking-wider text-indigo-600 font-medium">
            {product.type}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500">{product.platforms.join(", ")}</span>
        </div>

        <p
          className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2"
          style={{ minHeight: 40 }}
        >
          {product.short}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-900">{product.rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              {formatNumber(product.downloads)}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 transition-all duration-300 group-hover:text-indigo-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PRODUCT MODAL
// ───────────────────────────────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
  robinGuideOpen,
  setRobinGuideOpen,
  downloadStatus,
  setDownloadStatus,
  onContact,
}) {
  const Icon = product.icon;
  const [activeTab, setActiveTab] = useState("description");
  const tabs = [
    { id: "description", label: "Описание" },
    { id: "release", label: "Что нового" },
    { id: "llms", label: "Совместимые LLM" },
    { id: "support", label: "Поддержка" },
  ];

  const handleBuy = () => {
    setDownloadStatus("processing");
    setTimeout(() => setDownloadStatus("success"), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm">
      <div
        className="min-h-screen flex items-start justify-center p-4 lg:p-8"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid lg:grid-cols-3">
            {/* LEFT: Content */}
            <div className="lg:col-span-2 p-8 lg:p-10 border-r border-slate-200/60">
              {/* Header */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
                <span>Каталог</span>
                <ChevronRight className="w-3 h-3" />
                <span>{product.type}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 font-medium">{product.name}</span>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl tracking-tight text-slate-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-mono uppercase tracking-wider text-indigo-600 text-xs font-medium">
                      {product.type}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{product.platforms.join(", ")}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">v {product.version}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-7">
                <BadgePill icon={<CheckCircle2 className="w-3 h-3" />} variant="success">
                  Проверено
                </BadgePill>
                <BadgePill icon={<Shield className="w-3 h-3" />}>Стандарт ROBIN</BadgePill>
                <BadgePill icon={<Plug className="w-3 h-3" />}>MCP-совместим</BadgePill>
                <BadgePill icon={<Lock className="w-3 h-3" />}>152-ФЗ</BadgePill>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-x-1 gap-y-0 border-b border-slate-200 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="min-h-52">
                {activeTab === "description" && (
                  <div className="space-y-5">
                    <p className="text-slate-700 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="bg-slate-50/80 rounded-xl border border-slate-200/60 p-5">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                        Что внутри
                      </div>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>Базовый промпт-граф с настроенными узлами</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>YAML-конфигурация под типовой шаблон</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>MCP-коннекторы к учётным системам</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>Тестовый набор и документация по доработке</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "release" && (
                  <div className="space-y-6">
                    <ReleaseEntry
                      version="v 2.4.1"
                      date="28 апреля 2026"
                      items={[
                        "Поддержка договоров с приложениями (анализ как единый документ)",
                        "Улучшено распознавание сканов с печатями, точность +9%",
                        "Исправлена ошибка экспорта DOCX при длинных таблицах",
                      ]}
                    />
                    <ReleaseEntry
                      version="v 2.4.0"
                      date="12 марта 2026"
                      items={[
                        "Добавлен MCP-коннектор к Directum RX",
                        'Новый узел «Сравнение редакций»',
                        "Совместимость с GigaChat 4.0",
                      ]}
                    />
                  </div>
                )}

                {activeTab === "llms" && (
                  <div className="space-y-2">
                    {product.llms.length > 0 ? (
                      product.llms.map((llm, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-slate-900 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-slate-600" strokeWidth={1.75} />
                            </div>
                            <span className="font-medium text-slate-900">{llm}</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-600 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            Рекомендовано
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Модель не использует LLM напрямую — это RPA-сценарий или
                        коннектор данных.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "support" && (
                  <div className="space-y-3">
                    <SupportRow label="Разработчик" value={product.author} />
                    <SupportRow label="Техподдержка" value="support@rpa-robin.ru" />
                    <SupportRow label="Telegram" value="@robin_artifacts" />
                    <SupportRow label="SLA" value="Ответ в течение 8 рабочих часов" />
                    <SupportRow
                      label="База знаний"
                      value="docs.rpa-robin.ru/artifacts"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Action panel */}
            <div className="p-8 lg:p-10 bg-slate-50/40 lg:sticky lg:top-0 lg:self-start">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Стоимость
              </div>
              <div className="text-2xl font-medium tracking-tight text-slate-900 mb-1">
                {product.free ? "Бесплатно" : "Корпоративная лицензия"}
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                {product.free
                  ? "Доступно для клиентов платформы ROBIN без ограничений по числу запусков. Требуется авторизация."
                  : "Стоимость и условия — индивидуально. Менеджер свяжется в течение 1 рабочего дня."}
              </p>

              {/* CTAs per spec: «Оставить заявку», «Попробовать в ROBIN», «Купить» */}
              <div className="space-y-3 mb-6">
                {downloadStatus === "idle" && (
                  <PrimaryButton
                    onClick={handleBuy}
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {product.free ? "Оставить заявку" : "Купить"}
                  </PrimaryButton>
                )}
                {downloadStatus === "processing" && (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-200 text-slate-500 font-medium"
                  >
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Отправляем заявку…
                  </button>
                )}
                {downloadStatus === "success" && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check
                          className="w-4 h-4 text-emerald-600"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-emerald-900 text-sm mb-1">
                          Заявка принята
                        </div>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                          Менеджер ROBIN свяжется в течение 1 рабочего дня для
                          подключения шаблона к вашему контуру.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Open in ROBIN platform — external link */}
                <a
                  href="https://platform.robin-cloud.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border-2 border-indigo-500 text-indigo-600 font-medium hover:bg-indigo-50 transition-all duration-300"
                >
                  Попробовать в ROBIN
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onContact}
                  className="w-full px-7 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                >
                  Связаться с менеджером
                </button>
              </div>

              {/* Meta */}
              <div className="space-y-2.5 pt-6 border-t border-slate-200/60">
                <MetaRow label="Автор" value={product.author} />
                <MetaRow label="Обновлено" value={product.updated} />
                <MetaRow
                  label="Рейтинг"
                  value={
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {product.rating} · {formatNumber(product.downloads)} скачиваний
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseEntry({ version, date, items }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="font-mono text-sm font-medium text-slate-900">{version}</div>
        <div className="h-px flex-1 bg-slate-200" />
        <div className="text-xs text-slate-500">{date}</div>
      </div>
      <ul className="space-y-1.5 text-sm text-slate-700">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Minus className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SupportRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 font-code">{value}</span>
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-medium">{value}</span>
    </div>
  );
}

function GuideStep({ n, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium">
        {n}
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
    </div>
  );
}

function BadgePill({ icon, children, variant = "default" }) {
  const styles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${styles[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SANDBOX MODAL
// ───────────────────────────────────────────────────────────────────────────

function SandboxModal({ step, setStep, onClose, onGoToCatalog }) {
  // No-code визуализация: каждая «строка» шага — блок-узел с цветной точкой
  // и иконкой. Без терминалов и команд.
  const steps = [
    {
      title: "Запуск изолированной среды",
      text: "Песочница ROBIN разворачивается за 30 секунд. Это полностью изолированный контур с предустановленной платформой и подключённым LLM-шлюзом — никаких рисков для продуктивных систем.",
      visual: [
        { type: "trigger", label: "Запрос на песочницу" },
        { type: "process", label: "Развёртывание контура ROBIN" },
        { type: "process", label: "Подключение MCP-шлюза" },
        { type: "process", label: "Подключение LLM Gateway" },
        { type: "success", label: "Песочница готова" },
      ],
    },
    {
      title: "Установка шаблона",
      text: "Выберите любой шаблон из каталога — он добавится в песочницу одним кликом. Все зависимости подтянутся автоматически. Никакого ручного конфигурирования.",
      visual: [
        { type: "trigger", label: "Выбор шаблона из каталога" },
        { type: "process", label: "Проверка подписи ROBIN Ready" },
        { type: "process", label: "Установка зависимостей" },
        { type: "success", label: "Шаблон активен в песочнице" },
      ],
    },
    {
      title: "Загрузка тестовых данных",
      text: "К каждому шаблону приложен набор демо-документов: договоры, акты, УПД, выписки из 1С. Их можно использовать для оценки качества без касания боевых данных.",
      visual: [
        { type: "trigger", label: "Открыть библиотеку демо-данных" },
        { type: "data",    label: "Договор · типовой" },
        { type: "data",    label: "Договор · с отклонениями" },
        { type: "data",    label: "Приложение к договору" },
      ],
    },
    {
      title: "Запуск и анализ результата",
      text: "Шаблон отрабатывает за ~30 секунд и возвращает структурированный отчёт. Видны все шаги: какие данные прочитаны, какие проверки выполнены, какие выводы сделаны.",
      visual: [
        { type: "trigger", label: "Запуск шаблона" },
        { type: "process", label: "Извлечение реквизитов" },
        { type: "process", label: "Сравнение с эталоном" },
        { type: "process", label: "Детектирование рисков" },
        { type: "success", label: "Отчёт сформирован" },
      ],
    },
  ];

  const TYPE_STYLES = {
    trigger: { bg: "bg-amber-50", border: "border-amber-200", iconBg: "bg-amber-100", iconColor: "text-amber-700", icon: Play },
    process: { bg: "bg-white",    border: "border-slate-200", iconBg: "bg-slate-100", iconColor: "text-slate-700", icon: Cpu },
    data:    { bg: "bg-sky-50",   border: "border-sky-200",   iconBg: "bg-sky-100",   iconColor: "text-sky-700",   icon: FileText },
    success: { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-100", iconColor: "text-emerald-700", icon: CheckCircle2 },
  };

  const NodeBlock = ({ type, label }) => {
    const s = TYPE_STYLES[type];
    const Icon = s.icon;
    return (
      <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border ${s.bg} ${s.border} shadow-sm`}>
        <div className={`w-7 h-7 rounded-md ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-3.5 h-3.5 ${s.iconColor}`} strokeWidth={2.25} />
        </div>
        <span className="text-sm font-medium text-slate-800 truncate">{label}</span>
      </div>
    );
  };

  const Arrow = () => (
    <div className="flex justify-center my-1">
      <svg width="14" height="10" viewBox="0 0 14 10" className="text-slate-300" fill="none">
        <path
          d="M7 0 V 7 M4 5 L 7 8 L 10 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6 border-b border-slate-200/60 flex-shrink-0">
          <SectionLabel>Песочница ROBIN</SectionLabel>
          <h2 className="text-2xl tracking-tight text-slate-900 mb-2 leading-tight">
            Как это работает за{" "}
            <span className="font-extrabold text-slate-900">4 шага</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Безопасная среда исполнения. Никаких рисков для продуктивного контура,
            никакого программирования.
          </p>
        </div>

        {/* Step indicator — active step uses the violet→pink→red energy gradient
            (same colors as PrimaryButton hover) */}
        <div className="px-8 pt-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === step
                    ? "flex-1"
                    : i < step
                    ? "flex-1 bg-slate-300"
                    : "w-8 bg-slate-200"
                }`}
                style={
                  i === step
                    ? {
                        background:
                          "linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #DC2626 100%)",
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="px-8 pb-6 overflow-y-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-600 mb-2">
            Шаг {step + 1} из 4
          </div>
          <h3 className="text-xl font-medium tracking-tight text-slate-900 mb-3">
            {current.title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-5">{current.text}</p>

          {/* No-code visual flow */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  Визуальный конструктор
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100"
                style={{ fontSize: 9 }}
              >
                No-code
              </span>
            </div>
            <div className="space-y-0">
              {current.visual.map((node, i) => (
                <div key={`${step}-${i}`}>
                  {i > 0 && <Arrow />}
                  <div
                    className="scroll-fade-in"
                    style={{ animationDelay: `${0.08 * i}s` }}
                  >
                    <NodeBlock type={node.type} label={node.label} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-200/60 bg-slate-50/40 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Назад
          </button>
          {step < steps.length - 1 ? (
            <PrimaryButton
              onClick={() => setStep(step + 1)}
              icon={<ArrowRight className="w-4 h-4" />}
              size="sm"
            >
              Дальше
            </PrimaryButton>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                Понятно
              </button>
              <PrimaryButton
                onClick={() => {
                  onClose();
                  if (onGoToCatalog) onGoToCatalog();
                }}
                icon={<ArrowRight className="w-4 h-4" />}
                size="sm"
              >
                Перейти в каталог
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// CONTACTS VIEW
// ───────────────────────────────────────────────────────────────────────────

function ContactsView({ authorFormSubmitted, setAuthorFormSubmitted }) {
  // Reusable gradient style for accent words
  const gradientStyle = { fontWeight: 800, display: "inline-block", background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #DC2626 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" };

  const factCards = [
    {
      icon: Star,
      label: "Лидерство",
      value: "№1",
      caption: "В Реестре отечественного ПО для автоматизации бизнеса.",
      redAccent: true, // Heartbeat: brand red on Leadership icon
    },
    {
      icon: Zap,
      label: "Эффективность",
      value: "80%",
      caption: "Ускорение цикла разработки и внедрения ИИ-решений.",
    },
    {
      icon: Shield,
      label: "Безопасность",
      value: "152-ФЗ",
      caption: "Развёртывание в закрытом контуре с соблюдением всех стандартов.",
    },
  ];

  const contactCards = [
    {
      icon: Phone,
      title: "Связь",
      rows: [
        { label: "Телефон",         value: "+7 (495) 215-50-86",  href: "tel:+74952155086" },
        { label: "Общие вопросы",   value: "info@rpa-robin.ru",   href: "mailto:info@rpa-robin.ru" },
      ],
    },
    {
      icon: Mail,
      title: "Поддержка",
      rows: [
        { label: "Техподдержка",  value: "support@rpa-robin.ru",  href: "mailto:support@rpa-robin.ru" },
        { label: "Партнёрство",   value: "partners@rpa-robin.ru", href: "mailto:partners@rpa-robin.ru" },
      ],
    },
    {
      icon: MapPin,
      title: "Офис",
      rows: [
        { label: "Адрес",      value: "Москва, ул. Нижняя Красносельская, д. 35, стр. 9" },
        { label: "Часы работы", value: "Пн–Пт · 09:00–19:00 (МСК)" },
      ],
    },
  ];

  const partnerBenefits = [
    {
      title: "1 200+ компаний",
      text: "Корпоративная аудитория клиентов ROBIN из реестра отечественного ПО — крупный бизнес, госсектор, банки.",
    },
    {
      title: "Условия партнёрства",
      text: "Прозрачное распределение выручки, ежемесячные выплаты в рублях, без скрытых комиссий.",
    },
    {
      title: "Песочница ROBIN",
      text: "Тестирование решения в изолированной безопасной среде до публикации в каталоге.",
    },
  ];

  const socialChannels = [
    { name: "Telegram", handle: "@rpa_robin" },
    { name: "VK",       handle: "vk.com/rpa.robin" },
    { name: "YouTube",  handle: "ROBIN RPA" },
  ];

  return (
    <section>
      {/* ─── Hero header ──────────────────────────────────────────────── */}
      <div className="border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-20">
          <SectionLabel>Контакты</SectionLabel>
          <h1 className="page-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-slate-900 leading-tight mb-4">
            Поможем с выбором и{" "}
            <span className="font-extrabold text-slate-900">запуском</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Найдите идеальную модель для своих задач или станьте автором
            на нашем маркетплейсе. Мы поможем с тестированием и внедрением
          </p>
        </div>
      </div>

      {/* ─── Contact cards (3) + Map ──────────────────────────────────── */}
      <div className="border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-3xl bg-white border border-slate-200/80 p-6 md:p-7 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 hover:border-slate-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100">
                  <card.icon className="w-4.5 h-4.5 text-indigo-600" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {card.title}
                </h3>
              </div>
              <div className="space-y-3.5">
                {card.rows.map((row, j) => (
                  <div key={j}>
                    <div className="font-mono uppercase tracking-wider text-slate-500 mb-0.5" style={{ fontSize: 10 }}>
                      {row.label}
                    </div>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-slate-900 font-medium hover:text-indigo-600 transition-colors duration-200 leading-snug"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <div className="text-slate-900 font-medium leading-snug">
                        {row.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Map (compact height) + social pills */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 items-start">
          {/* Map — spans 2 columns on desktop */}
          <div
            className="lg:col-span-2 relative rounded-3xl border border-slate-200/80 overflow-hidden bg-slate-50"
            style={{ height: 320 }}
          >
            {/* Stylized map background */}
            <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-40">
              <defs>
                <pattern id="streets-contacts" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#streets-contacts)" />
              <path d="M 0 200 Q 100 150, 200 200 T 400 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <path d="M 200 0 L 200 400" stroke="#94a3b8" strokeWidth="1.5" />
            </svg>

            {/* ROBIN-style pin in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-30" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Address pill — top left */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl px-3 py-2 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">Офис ROBIN</div>
              <div className="text-slate-500 font-mono" style={{ fontSize: 10 }}>
                55.7741° N, 37.6664° E
              </div>
            </div>

            {/* Route button — bottom right */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-900 transition-all duration-300"
              >
                Построить маршрут
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Social channels card */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-7 self-stretch">
            <div className="font-mono uppercase tracking-wider text-slate-500 mb-4" style={{ fontSize: 11 }}>
              Каналы
            </div>
            <div className="flex flex-col gap-2.5">
              {socialChannels.map((c) => (
                <a
                  key={c.name}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-full border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {c.name}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">{c.handle}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* ─── About ROBIN — centered intro + 3 fact cards ──────────────── */}
      <div className="relative border-b border-slate-200/60 bg-slate-50/40 overflow-hidden">
        {/* Soft color blobs — provide context for glassmorphism cards */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[8%] w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-[8%] w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionLabel>О платформе</SectionLabel>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-slate-900 leading-tight mb-5">
              Единая экосистема{" "}
              <span style={gradientStyle}>автоматизации</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Первая российская платформа интеллектуальной автоматизации,
              объединяющая ИИ-агентов и программных роботов в едином контуре.
              Нам доверяют лидеры банковской, страховой и промышленной сфер.
            </p>
          </div>

          {/* Glassmorphism fact cards — indigo/violet/blue tech accent */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch max-w-5xl mx-auto">
            {factCards.map((f, i) => (
              <div
                key={i}
                className="group relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-900/5 p-6 md:p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/25 hover:border-indigo-200/70"
              >
                {/* Soft inner highlight along top edge */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
                />

                {/* Icon — glass badge.
                    Star/Leadership icon → solid brand red #EF3747 (heartbeat).
                    Others → violet→pink→red SVG gradient. */}
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-200/60 mb-5">
                  <f.icon
                    className={`w-5 h-5 ${f.redAccent ? "" : "icon-gradient"}`}
                    style={f.redAccent ? { color: "#EF3747" } : undefined}
                    strokeWidth={2}
                  />
                </div>

                {/* Section label — uppercase mono */}
                <div
                  className="font-mono font-medium uppercase tracking-wider text-slate-500 mb-2"
                  style={{ fontSize: 10 }}
                >
                  {f.label}
                </div>

                {/* Hero number — solid black, Bold */}
                <div
                  className="text-4xl md:text-5xl tracking-tight mb-3 text-slate-900"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 700,
                    fontFeatureSettings: '"tnum", "cv11"',
                    letterSpacing: "-0.03em",
                  }}
                >
                  {f.value}
                </div>

                {/* Caption */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Partner program — benefits + form (2 columns on desktop) ──── */}
      <div className="border-t border-slate-200/60 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionLabel>Партнёрская программа</SectionLabel>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-slate-900 leading-tight mb-4">
              Опубликовать{" "}
              <span style={gradientStyle}>решение</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Разработчики ИИ-агентов, RPA-роботов и MCP-коннекторов могут разместить
              свои шаблоны в каталоге ROBIN. Дистрибуция, биллинг, поддержка первой линии
              и сертификация ROBIN Ready — на нашей стороне.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* LEFT: Benefits as a checklist */}
            <div className="space-y-6 lg:pt-2">
              {partnerBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-snug mb-1.5">
                      {b.title}
                    </div>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {b.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Application form in contrasted card.
                Constrained to max-w-lg (512px) — optimal reading width for a
                short application form. On mobile the form is full-width up to
                this cap; on desktop it sits centered in its grid column. */}
            <div className="w-full max-w-lg mx-auto">
              {authorFormSubmitted ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 md:p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Менеджер ROBIN свяжется в течение 2 рабочих дней. Решение по
                    публикации — до 10 рабочих дней после проверки шаблона.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAuthorFormSubmitted(true);
                  }}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-5 shadow-sm"
                >
                  <FormField label="Имя и фамилия" required placeholder="Иван Петров" />
                  <FormField
                    label="Корпоративный e-mail"
                    required
                    type="email"
                    placeholder="ivan@company.ru"
                  />
                  <FormField label="Компания" required placeholder="ООО «Компания»" />
                  <FormSelect
                    label="Тип решения"
                    required
                    options={[
                      "ИИ-агент",
                      "RPA-робот",
                      "MCP-коннектор",
                      "Шаблон процесса",
                    ]}
                  />
                  <FormTextarea
                    label="Краткое описание решения"
                    required
                    placeholder="Что делает шаблон, для какой бизнес-задачи, на каких источниках данных…"
                    maxLength={500}
                  />

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-200"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      Я согласен с{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-indigo-600 hover:text-indigo-500 transition-colors duration-300 underline-offset-2 hover:underline"
                      >
                        обработкой персональных данных
                      </a>{" "}
                      и{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-indigo-600 hover:text-indigo-500 transition-colors duration-300 underline-offset-2 hover:underline"
                      >
                        офертой автора моделей
                      </a>
                      .
                    </span>
                  </label>

                  <div className="pt-2">
                    <PrimaryButton type="submit" icon={<Send className="w-4 h-4" />} fullWidth>
                      Отправить заявку
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-200/60 last:border-0">
      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-600" strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          {label}
        </div>
        <div className="text-slate-900 leading-snug">{value}</div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// REGISTER VIEW — partner / customer registration page
// Indigo-first AI design, brand red (#EF3747) micro-accents on required marks,
// glassmorphism inputs, two-column field grid grouped by User / Company.
// ───────────────────────────────────────────────────────────────────────────

function RegisterView({ onBack }) {
  const [submitted, setSubmitted] = useState(false);

  // Reusable gradient style for the "ROBIN" word in the heading
  const headingGradient = {
    fontWeight: 800,
    display: "inline-block",
    background:
      "linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #DC2626 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    letterSpacing: "-0.01em",
  };

  // Success state — emerald confirmation card with link back
  if (submitted) {
    return (
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 backdrop-blur-xl p-10 md:p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-3 tracking-tight">
              Заявка отправлена
            </h2>
            <p className="text-base text-emerald-700 max-w-md mx-auto leading-relaxed mb-7">
              Менеджер ROBIN свяжется в течение 1 рабочего дня. Доступ к
              платформе откроется после проверки данных компании.
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Decorative blobs — same indigo/violet system as other pages */}
      <div
        aria-hidden
        className="absolute top-0 -left-32 w-[28rem] h-[28rem] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-violet-400/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Page heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <SectionLabel>Создание аккаунта</SectionLabel>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            Регистрация в{" "}
            <span style={headingGradient}>ROBIN</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Получите корпоративный доступ к каталогу шаблонов, песочнице и
            инструментам платформы. Заявка обрабатывается в течение 1 рабочего дня.
          </p>
        </div>

        {/* Form card — glassmorphism */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-900/5 p-6 md:p-10"
        >
          {/* ─── Block 1: User ─────────────────────────────────────────── */}
          <BlockHeading icon={User2} title="Пользователь" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-10">
            <RegField label="Имя" required placeholder="Иван" autoComplete="given-name" />
            <RegField label="Фамилия" required placeholder="Петров" autoComplete="family-name" />
            <RegField label="Отчество" placeholder="Сергеевич" autoComplete="additional-name" />
            <RegField label="Должность" placeholder="Руководитель IT-отдела" autoComplete="organization-title" />
            <RegField label="Email" required type="email" placeholder="ivan@company.ru" autoComplete="email" />
            <RegField label="Логин" required placeholder="ivanpetrov" autoComplete="username" />
            <RegField label="Пароль" required type="password" placeholder="Не менее 8 символов" autoComplete="new-password" />
            <RegField label="Подтверждение пароля" required type="password" placeholder="Повторите пароль" autoComplete="new-password" />
          </div>

          {/* ─── Block 2: Company ──────────────────────────────────────── */}
          <BlockHeading icon={Building2} title="Компания" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8">
            <RegField label="Название компании" required placeholder="ООО «Компания»" autoComplete="organization" fullSpan />
            <RegField label="ИНН" required placeholder="7700000000" inputMode="numeric" maxLength={12} />
            <RegField label="Номер телефона" required type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" />
            <RegField label="Сайт" type="url" placeholder="https://company.ru" autoComplete="url" fullSpan />
            <RegTextarea
              label="Краткое описание деятельности"
              placeholder="Чем занимается компания, какие процессы планируете автоматизировать..."
              maxLength={500}
              fullSpan
            />
          </div>

          {/* ─── Consent footer ────────────────────────────────────────── */}
          <div className="space-y-3.5 pt-6 mt-2 border-t border-slate-200/60">
            <RegCheckbox required>
              Я согласен на{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline transition-colors"
              >
                обработку персональных данных
              </a>
            </RegCheckbox>
            <RegCheckbox required>
              Я принимаю{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline transition-colors"
              >
                условия пользовательского соглашения
              </a>
            </RegCheckbox>
          </div>

          {/* ─── Submit + back link ────────────────────────────────────── */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-4 pt-7">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200 px-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться к входу
            </button>
            <PrimaryButton type="submit" icon={<ArrowRight className="w-4 h-4" />}>
              ЗАРЕГИСТРИРОВАТЬСЯ
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─── Register-form sub-components ──────────────────────────────────────────

function BlockHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200/60">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100">
        <Icon className="w-4 h-4 text-indigo-600" strokeWidth={2} />
      </div>
      <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}

function RegField({
  label,
  required,
  type = "text",
  placeholder,
  fullSpan = false,
  ...rest
}) {
  return (
    <label className={`block ${fullSpan ? "md:col-span-2" : ""}`}>
      <div className="text-sm font-semibold text-slate-700 mb-1.5">
        {label}
        {required && (
          <span className="ml-1" style={{ color: "#EF3747" }} aria-hidden>
            *
          </span>
        )}
      </div>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-50/80 border border-indigo-100 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-200"
        {...rest}
      />
    </label>
  );
}

function RegTextarea({ label, required, placeholder, maxLength, fullSpan = false }) {
  const [val, setVal] = useState("");
  return (
    <label className={`block ${fullSpan ? "md:col-span-2" : ""}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-sm font-semibold text-slate-700">
          {label}
          {required && (
            <span className="ml-1" style={{ color: "#EF3747" }} aria-hidden>
              *
            </span>
          )}
        </div>
        {maxLength && (
          <div className="text-xs text-slate-400 font-mono">
            {val.length} / {maxLength}
          </div>
        )}
      </div>
      <textarea
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 bg-slate-50/80 border border-indigo-100 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-200 resize-none"
      />
    </label>
  );
}

function RegCheckbox({ children, required }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group select-none">
      <input
        type="checkbox"
        required={required}
        className="mt-0.5 w-4 h-4 rounded border-slate-300 cursor-pointer transition-all"
        style={{ accentColor: "#4F46E5" }}
      />
      <span className="text-sm text-slate-600 leading-relaxed">
        {children}
        {required && (
          <span className="ml-0.5" style={{ color: "#EF3747" }} aria-hidden>
            *
          </span>
        )}
      </span>
    </label>
  );
}

function FormField({ label, required, type = "text", placeholder }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-slate-700 mb-1.5">
        {label} {required && <span style={{ color: "#EF3747" }}>*</span>}
      </div>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
      />
    </label>
  );
}

function FormSelect({ label, required, options }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-slate-700 mb-1.5">
        {label} {required && <span style={{ color: "#EF3747" }}>*</span>}
      </div>
      <select
        required={required}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
      >
        <option value="">Выберите тип…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function FormTextarea({ label, required, placeholder, maxLength }) {
  const [val, setVal] = useState("");
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs font-medium text-slate-700">
          {label} {required && <span style={{ color: "#EF3747" }}>*</span>}
        </div>
        {maxLength && (
          <div className="text-xs text-slate-400 font-mono">
            {val.length} / {maxLength}
          </div>
        )}
      </div>
      <textarea
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
      />
    </label>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// CONTACT FORM MODAL (called from product detail "Связаться")
// ───────────────────────────────────────────────────────────────────────────

function ContactFormModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              Заявка принята
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Менеджер свяжется в течение 1 рабочего дня.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="p-8 space-y-5"
          >
            <div>
              <h3 className="text-2xl tracking-tight text-slate-900 mb-2 leading-tight">
                Свяжитесь с нами
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Заполните форму — менеджер ROBIN свяжется в течение 1 рабочего дня.
              </p>
            </div>
            <FormField label="Имя" required placeholder="Иван Петров" />
            <FormField
              label="Корпоративный e-mail"
              required
              type="email"
              placeholder="ivan@company.ru"
            />
            <FormField label="Компания" placeholder="ООО «Команда»" />
            <FormTextarea label="Сообщение" placeholder="Опишите задачу или вопрос…" />
            <PrimaryButton type="submit" fullWidth icon={<Send className="w-4 h-4" />}>
              Отправить
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FOOTER
// ───────────────────────────────────────────────────────────────────────────

function Footer({ setActiveTab }) {
  return (
    <footer
      className="relative mt-16"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Top gradient hairline — transparent → indigo → transparent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #4F46E5 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        {/* Brand block — full width on its own row */}
        <div className="mb-12 md:mb-16 max-w-md">
          <button
            onClick={() => setActiveTab("home")}
            className="block mb-5 transition-opacity duration-300 hover:opacity-80"
            aria-label="ROBIN — на главную"
          >
            {/* Original red logo — high contrast on dark bg */}
            <RobinBirdLogo className="h-10 w-auto" />
          </button>
          <p
            className="text-sm"
            style={{ color: "#94A3B8", lineHeight: 1.7 }}
          >
            Маркетплейс ИИ-агентов, RPA-сценариев и MCP-коннекторов
            для корпоративного сектора
          </p>
        </div>

        {/* Three horizontal link columns — guaranteed 3-col layout on md+
            via injected .footer-cols CSS class. */}
        <div className="footer-cols pb-12 md:pb-16 border-b border-white/10">
          <FooterColumn
            title="Продукт"
            items={["Каталог моделей", "Песочница", "Безопасность", "Интеграции"]}
          />
          <FooterColumn
            title="Компания"
            items={["О сервисе", "Контакты", "Вакансии", "Блог"]}
          />
          <FooterColumn
            title="Поддержка"
            items={["Документация", "База знаний", "API", "Условия использования"]}
          />
        </div>

        {/* Copyright row — slightly muted, separated by hairline above */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div
            className="text-xs flex items-center gap-1.5"
            style={{ color: "#64748B" }}
          >
            <span>© 2026 ROBIN</span>
            {/* Brand red micro-dot — heartbeat accent in the copyright */}
            <span
              aria-hidden
              className="inline-block w-1 h-1 rounded-full"
              style={{ backgroundColor: "#EF3747" }}
            />
            <span>Все права защищены</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs transition-colors duration-300"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs transition-colors duration-300"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
            >
              Лицензия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="min-w-0">
      <div className="text-sm font-semibold tracking-tight text-white mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm transition-colors duration-200"
              style={{ color: "#94A3B8", lineHeight: 1.7 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ───────────────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-6 h-px bg-indigo-600" />
      <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-medium">
        {children}
      </span>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  icon,
  size = "md",
  fullWidth = false,
  type = "button",
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 ${
        sizes[size]
      } ${fullWidth ? "w-full" : ""}`}
    >
      {/* Gradient overlay: violet → pink → red (logo brand). 
          Bridges the indigo system back to the red logo on hover — energy pulse. */}
      <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}

function SandboxButton({ children, onClick, icon, fullWidth = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {/* Inner white panel — fades out on hover to reveal full gradient */}
      <span
        className="absolute inset-px bg-white rounded-full transition-opacity duration-200"
        style={{ opacity: hovered ? 0 : 1 }}
      />
      {/* Content — black on white in rest, white on gradient on hover */}
      <span
        className="relative z-10 flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors duration-200"
        style={{ color: hovered ? "#FFFFFF" : "#0F172A" }}
      >
        {children}
        {icon && (
          <span
            className="transition-transform duration-300"
            style={{ transform: hovered ? "translateX(2px)" : "translateX(0)" }}
          >
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// UTILS
// ───────────────────────────────────────────────────────────────────────────

function formatNumber(n) {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}

function pluralize(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
