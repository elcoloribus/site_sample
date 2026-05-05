import { useState, useEffect, useRef } from 'react';
import {
  Sparkles, ArrowRight, Play, ShieldCheck, Layers, Code2,
  Zap, Search, Filter, Star, Download, X, Check, ChevronRight,
  Bot, Workflow, Plug, MapPin, Phone, Mail, Send, FileCheck,
  Boxes, Lock, Cpu, Building2, ExternalLink, Copy, Terminal,
  CircleCheck, Package, Rocket, BookOpen, MessageSquare, Globe,
  ChevronDown
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 *  ROBIN ARTIFACTS — Marketplace prototype
 *  Single-file React SPA. Tailwind core classes + minimal inline styles for
 *  values that aren't in the pre-built Tailwind stylesheet.
 *  ──────────────────────────────────────────────────────────────────────── */

const DISPLAY_FONT = "'Instrument Serif', 'Times New Roman', serif";
const SANS_FONT = "'Geist', system-ui, -apple-system, sans-serif";
const MONO_FONT = "'JetBrains Mono', 'Menlo', monospace";

const CATEGORIES = ['Все', 'Финансы', 'Продажи', 'HR', 'Сервис', 'Производство'];
const TYPES = ['Все типы', 'AI-агент', 'RPA', 'MCP'];

const PRODUCTS = [
  { id: 1,  type: 'AI-агент', icon: Bot,      name: 'Сверка актов',              cat: 'Финансы',     short: 'Сопоставляет акты выполненных работ с договорами и реестрами оплат, фиксирует расхождения.', rating: 4.8, downloads: 1240, ready: true,  version: 'v2.4.1',     platforms: ['ROBIN', 'N8N'],   price: 'Бесплатно' },
  { id: 2,  type: 'AI-агент', icon: Bot,      name: 'Проверка договоров',        cat: 'Сервис',      short: 'Извлекает условия из договоров, сравнивает с эталонным шаблоном компании, помечает риски.', rating: 4.9, downloads: 2105, ready: true,  version: 'v2.4.1',     platforms: ['ROBIN', 'Dify'],  price: 'Бесплатно' },
  { id: 3,  type: 'RPA',      icon: Workflow, name: 'Отчёт ОСВ в 1С',            cat: 'Финансы',     short: 'Автоматическая выгрузка оборотно-сальдовых ведомостей по списку контрагентов и периодам.',    rating: 4.9, downloads: 3410, ready: true,  version: 'v3.1.0',     platforms: ['ROBIN', '1C'],    price: 'Бесплатно' },
  { id: 4,  type: 'RPA',      icon: Workflow, name: 'Распознавание УПД',         cat: 'Финансы',     short: 'Извлечение реквизитов из универсальных передаточных документов с загрузкой в учётную систему.', rating: 4.8, downloads: 2760, ready: true,  version: 'v1.8.2',     platforms: ['ROBIN'],          price: 'Корп. лицензия' },
  { id: 5,  type: 'RPA',      icon: Workflow, name: 'КЭДО — массовая отправка',  cat: 'HR',          short: 'Кадровый ЭДО: формирование, подписание и рассылка пакетов документов сотрудникам.',           rating: 4.7, downloads: 1580, ready: true,  version: 'v2.0.1',     platforms: ['ROBIN', '1C'],    price: 'Бесплатно' },
  { id: 6,  type: 'MCP',      icon: Plug,     name: '1C Connector',              cat: 'Производство', short: 'Двусторонний MCP-коннектор: чтение справочников, регистров, документов; запись через интерфейс.', rating: 4.9, downloads: 4020, ready: true,  version: 'v4.2.0',     platforms: ['ROBIN', 'Кросс'], price: 'Бесплатно' },
  { id: 7,  type: 'MCP',      icon: Plug,     name: 'Browser Control',           cat: 'Сервис',      short: 'Управление браузерами через CDP. Headless и headful, перехват сетевых запросов.',             rating: 4.6, downloads: 2240, ready: false, version: 'v0.9.1 beta', platforms: ['ROBIN', 'Кросс'], price: 'Бесплатно' },
  { id: 8,  type: 'MCP',      icon: Plug,     name: 'Excel Connector',           cat: 'Финансы',     short: 'Чтение, запись, формульный пересчёт книг Excel. Поддержка xlsx, xlsm, защищённых файлов.',     rating: 4.8, downloads: 3690, ready: true,  version: 'v2.1.0',     platforms: ['ROBIN', 'Кросс'], price: 'Бесплатно' },
  { id: 9,  type: 'AI-агент', icon: Bot,      name: 'Подбор резюме',             cat: 'HR',          short: 'Семантический скрининг резюме под вакансию: ранжирует кандидатов и формирует обоснование.',     rating: 4.7, downloads: 980,  ready: true,  version: 'v1.3.0',     platforms: ['ROBIN', 'Dify'],  price: 'Корп. лицензия' },
  { id: 10, type: 'AI-агент', icon: Bot,      name: 'Лид-скоринг',               cat: 'Продажи',     short: 'Оценивает входящие лиды по 18 признакам, прогнозирует вероятность закрытия сделки.',         rating: 4.6, downloads: 1320, ready: true,  version: 'v2.0.0',     platforms: ['ROBIN'],          price: 'Бесплатно' },
  { id: 11, type: 'RPA',      icon: Workflow, name: 'Автозаполнение CRM',        cat: 'Продажи',     short: 'Сбор данных о контрагенте из открытых источников и автозаполнение карточки в CRM.',          rating: 4.5, downloads: 870,  ready: true,  version: 'v1.5.0',     platforms: ['ROBIN'],          price: 'Бесплатно' },
  { id: 12, type: 'AI-агент', icon: Bot,      name: 'Контроль качества линии',   cat: 'Производство', short: 'Анализ видеопотока с производственной линии, детекция дефектов и аномалий в реальном времени.', rating: 4.8, downloads: 540,  ready: true,  version: 'v0.7.2 beta', platforms: ['ROBIN'],          price: 'Корп. лицензия' },
];

/* ────────────  REUSABLE BUTTONS  ──────────── */

function PrimaryButton({ children, onClick, icon: Icon, size = 'md', className = '' }) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-7 py-3.5 text-base' };
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden bg-zinc-900 text-white ${sizes[size]} rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-px ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </span>
    </button>
  );
}

function GradientBorderButton({ children, onClick, icon: Icon, size = 'md', className = '' }) {
  const padding = size === 'lg' ? 'px-7 py-3.5' : 'px-6 py-3';
  return (
    <button
      onClick={onClick}
      style={{ padding: '1.5px' }}
      className={`group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 ${className}`}
    >
      <span className={`relative flex items-center justify-center gap-2 bg-white group-hover:bg-transparent text-indigo-600 group-hover:text-white ${padding} rounded-md text-sm font-medium transition-all duration-300 z-10`}>
        {children}
        {Icon && <Icon className="w-4 h-4" />}
      </span>
    </button>
  );
}

function GhostButton({ children, onClick, icon: Icon, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 hover:text-indigo-600 transition-colors duration-300 ${className}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </button>
  );
}

/* ────────────  NAV  ──────────── */

function Nav({ tab, setTab }) {
  const tabs = [
    { id: 'home',     label: 'О сервисе' },
    { id: 'catalog',  label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];
  return (
    <nav
      className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md"
      style={{ fontFamily: SANS_FONT }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => setTab('home')} className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Sparkles className="relative w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tracking-tight text-zinc-900">ROBIN</span>
            <span className="text-xs uppercase tracking-widest text-zinc-500">Artifacts</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50/60 p-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === t.id
                  ? 'text-white'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab === t.id && (
                <span className="absolute inset-0 rounded-full bg-zinc-900" />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:block text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors duration-300 px-3 py-2">
            Войти
          </button>
          <PrimaryButton size="sm" onClick={() => setTab('contacts')}>
            Запросить доступ
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
}

/* ────────────  HERO + HOME  ──────────── */

function CodeEditor() {
  const lines = [
    { n: 1,  jsx: <><span className="text-zinc-500">{`// ROBIN MCP — единая шина для AI-агентов`}</span></> },
    { n: 2,  jsx: <><span className="text-purple-400">import</span><span className="text-zinc-300">{` { `}</span><span className="text-cyan-300">MCPConnector</span><span className="text-zinc-300">{` } `}</span><span className="text-purple-400">from</span><span className="text-emerald-400">{` "@robin/core"`}</span><span className="text-zinc-400">;</span></> },
    { n: 3,  jsx: <><span className="text-purple-400">import</span><span className="text-zinc-300">{` { `}</span><span className="text-cyan-300">ContractAgent</span><span className="text-zinc-300">{` } `}</span><span className="text-purple-400">from</span><span className="text-emerald-400">{` "@robin/agents"`}</span><span className="text-zinc-400">;</span></> },
    { n: 4,  jsx: <>&nbsp;</> },
    { n: 5,  jsx: <><span className="text-purple-400">const</span><span className="text-zinc-200">{` mcp `}</span><span className="text-zinc-400">=</span><span className="text-purple-400">{` new `}</span><span className="text-cyan-300">MCPConnector</span><span className="text-zinc-400">{`({`}</span></> },
    { n: 6,  jsx: <>&nbsp;&nbsp;<span className="text-zinc-200">sources</span><span className="text-zinc-400">: </span><span className="text-zinc-400">[</span><span className="text-emerald-400">"1c:erp"</span><span className="text-zinc-400">, </span><span className="text-emerald-400">"excel"</span><span className="text-zinc-400">, </span><span className="text-emerald-400">"browsers"</span><span className="text-zinc-400">],</span></> },
    { n: 7,  jsx: <>&nbsp;&nbsp;<span className="text-zinc-200">sandbox</span><span className="text-zinc-400">: </span><span className="text-amber-300">true</span><span className="text-zinc-400">,</span></> },
    { n: 8,  jsx: <><span className="text-zinc-400">{`});`}</span></> },
    { n: 9,  jsx: <>&nbsp;</> },
    { n: 10, jsx: <><span className="text-purple-400">const</span><span className="text-zinc-200">{` agent `}</span><span className="text-zinc-400">=</span><span className="text-purple-400">{` new `}</span><span className="text-cyan-300">ContractAgent</span><span className="text-zinc-400">{`({ `}</span><span className="text-zinc-200">connector</span><span className="text-zinc-400">: </span><span className="text-zinc-200">mcp</span><span className="text-zinc-400">{` });`}</span></> },
    { n: 11, jsx: <>&nbsp;</> },
    { n: 12, jsx: <><span className="text-purple-400">await</span><span className="text-zinc-200">{` agent.`}</span><span className="text-blue-300">run</span><span className="text-zinc-400">{`({ `}</span><span className="text-zinc-200">document</span><span className="text-zinc-400">: </span><span className="text-emerald-400">"./contract_2026.pdf"</span><span className="text-zinc-400">{` });`}</span></> },
    { n: 13, jsx: <><span className="text-zinc-500">{`// → артефакт развёрнут за 4 минуты вместо 4 недель`}</span></> },
  ];

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 ring-1 ring-zinc-900/5"
      style={{ background: '#0E0E13' }}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500" style={{ fontFamily: MONO_FONT }}>
          <Terminal className="w-3.5 h-3.5" />
          mcp_connector.ts
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
          <Copy className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors duration-300" />
        </div>
      </div>

      {/* code body */}
      <div className="px-2 py-4 text-sm leading-relaxed" style={{ fontFamily: MONO_FONT, fontSize: '13px' }}>
        {lines.map(l => (
          <div key={l.n} className="flex gap-4 hover:bg-white/[0.02] px-3 transition-colors duration-300">
            <span className="text-zinc-600 select-none w-5 text-right shrink-0">{l.n}</span>
            <span className="whitespace-pre">{l.jsx}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeView({ setTab }) {
  return (
    <div style={{ fontFamily: SANS_FONT }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* dotted background */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
          }}
        />
        {/* soft glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 60%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-600" />
                </span>
                <span className="uppercase tracking-wider">Enterprise AI Artifacts</span>
                <span className="text-zinc-400">·</span>
                <span className="text-zinc-500">v 4.0</span>
              </div>

              {/* H1 */}
              <h1
                className="mt-6 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-zinc-900"
                style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
              >
                Маркетплейс <span className="italic text-indigo-600">ИИ-агентов</span><br />
                для&nbsp;корпоративного<br />сектора
              </h1>

              {/* subhead */}
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-zinc-600">
                Готовые на 80% артефакты-шаблоны, агенты и RPA-сценарии для ИТ-команд.
                Сокращайте время разработки и внедрения интеллектуальных решений в&nbsp;5&nbsp;раз —
                без боли с&nbsp;инфраструктурой и ключами к&nbsp;LLM.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryButton size="lg" icon={ArrowRight} onClick={() => setTab('catalog')}>
                  Смотреть каталог
                </PrimaryButton>
                <GradientBorderButton size="lg" icon={Play} onClick={() => alert('Sandbox откроется в новой вкладке')}>
                  Попробовать в Sandbox
                </GradientBorderButton>
              </div>

              <p className="mt-5 text-xs text-zinc-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Песочница без регистрации · 14 дней корпоративного триала
              </p>
            </div>

            {/* code editor right */}
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl opacity-40 blur-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              />
              <div className="relative">
                <CodeEditor />
                {/* floating chip */}
                <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg">
                  <CircleCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium text-zinc-700">Развёрнуто за 4 мин</span>
                </div>
                <div className="absolute -top-4 -right-4 hidden md:flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-medium text-zinc-700">ROBIN Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* metrics strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-zinc-200">
            {[
              { k: '250+', v: 'моделей в каталоге' },
              { k: '80%',  v: 'готовности из коробки' },
              { k: '5×',   v: 'ускорение time-to-prod' },
              { k: '40+',  v: 'MCP-коннекторов' },
            ].map((m, i) => (
              <div key={i} className="group">
                <div
                  className="text-4xl md:text-5xl tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-indigo-600"
                  style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
                >
                  {m.k}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS VALUE */}
      <section className="bg-zinc-50 border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Зачем</div>
            <h2
              className="mt-3 text-4xl md:text-5xl tracking-tight text-zinc-900"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
            >
              Не сервис, а <span className="italic">инструмент</span>
            </h2>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed">
              Распространяемый шаблон, который вы дорабатываете под себя в своём контуре.
              Без подписок и vendor lock-in.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              { icon: Boxes,       title: 'Безопасная Sandbox',        text: 'Запускайте любой артефакт в изолированной среде ROBIN. Доступ к LLM, тестовым данным и эмуляторам интеграций — без рисков для боевого контура.' },
              { icon: Layers,      title: 'No-code дозаточка',          text: '80% логики уже собрано. Оставшиеся 20% — ваша бизнес-специфика — настраиваются визуально в ROBIN Studio. Без переписывания кода.' },
              { icon: ShieldCheck, title: 'Сертификат ROBIN Ready',     text: 'Каждый артефакт со статусом «Проверено» прошёл аудит безопасности, проверку зависимостей и совместимости. Соответствие 152-ФЗ.' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl bg-white p-7 border border-zinc-200 transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  <div className="relative w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden transition-all duration-300">
                    <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="relative w-5 h-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Совместимость</div>
            <p className="mt-3 text-zinc-700">
              Работает там, где работает ваша команда
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {['ROBIN', 'N8N', 'Dify', '1C', 'Make', 'Camunda'].map(name => (
              <span
                key={name}
                className="text-xl font-semibold tracking-tight text-zinc-400 hover:text-zinc-900 transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.45), transparent 60%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <h2
              className="text-4xl md:text-5xl tracking-tight"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
            >
              Начните с <span className="italic text-indigo-300">песочницы</span> — без обязательств
            </h2>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              Разверните любой артефакт в изолированной среде за 3 минуты. API-ключи к LLM не требуются — провайдер уже подключён.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => alert('Sandbox откроется в новой вкладке')}
                className="group relative overflow-hidden bg-white text-zinc-900 px-7 py-3.5 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-px"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Попробовать в Sandbox
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <button
                onClick={() => setTab('contacts')}
                className="px-7 py-3.5 rounded-lg font-medium text-sm border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                Запросить демо
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────  CATALOG  ──────────── */

function ProductCard({ product, onClick }) {
  const Icon = product.icon;
  return (
    <button
      onClick={onClick}
      className="group relative text-left rounded-2xl bg-white p-6 border border-zinc-200 transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden"
    >
      {/* subtle gradient border on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, transparent, #6366f1, transparent)' }}
      />

      <div className="flex items-start justify-between">
        <div className="relative w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-zinc-900">
          <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Icon className="relative w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-300" />
        </div>
        {product.ready && (
          <div className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
            <Check className="w-3 h-3" />
            Проверено
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
          <span>{product.type}</span>
          <span>·</span>
          <span>{product.cat}</span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold text-zinc-900 tracking-tight">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
          {product.short}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-zinc-900">{product.rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            {product.downloads.toLocaleString('ru-RU')}
          </span>
        </div>
        <span className="text-xs font-medium text-indigo-600 flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
          Подробнее
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}

function CatalogView({ category, setCategory, onSelect, typeFilter, setTypeFilter, query, setQuery }) {
  const filtered = PRODUCTS.filter(p =>
    (category === 'Все' || p.cat === category) &&
    (typeFilter === 'Все типы' || p.type === typeFilter) &&
    (query === '' || p.name.toLowerCase().includes(query.toLowerCase()) || p.short.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: SANS_FONT }}>
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Каталог</div>
          <h1
            className="mt-3 text-5xl md:text-6xl tracking-tight text-zinc-900"
            style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
          >
            Каталог моделей: <span className="italic">ИИ-агенты</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600">
            250+ моделей, API-ключи не требуются. Бесплатные артефакты доставляются мгновенно на e-mail,
            платные — после согласования с менеджером.
          </p>

          {/* search */}
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Найти артефакт: «сверка актов», «проверка договоров»…"
              className="w-full rounded-lg border border-zinc-200 bg-white pl-11 pr-4 py-3 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* filters */}
      <section className="sticky top-[73px] z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Категория:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 overflow-hidden ${
                  category === c
                    ? 'text-white'
                    : 'text-zinc-700 border border-zinc-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {category === c && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
          <div className="md:ml-auto flex flex-wrap items-center gap-2">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  typeFilter === t
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* grid */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between text-sm">
            <div className="text-zinc-600">
              Найдено: <span className="font-medium text-zinc-900">{filtered.length}</span> {filtered.length === 1 ? 'артефакт' : 'артефактов'}
            </div>
            <div className="text-zinc-500 hidden sm:block">
              Сортировать: <span className="font-medium text-zinc-900 cursor-pointer hover:text-indigo-600 transition-colors duration-300">По популярности</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-16 text-center">
              <div className="text-zinc-400 mb-3 flex justify-center">
                <Package className="w-10 h-10" />
              </div>
              <div className="text-lg font-medium text-zinc-900">Ничего не нашлось</div>
              <p className="text-sm text-zinc-600 mt-1">Сбросьте фильтры или попробуйте другой запрос.</p>
              <button
                onClick={() => { setCategory('Все'); setTypeFilter('Все типы'); setQuery(''); }}
                className="mt-5 text-sm font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-300"
              >
                Сбросить фильтры →
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ────────────  PRODUCT MODAL  ──────────── */

function ProductModal({ product, onClose }) {
  const [tab, setTab] = useState('about');
  const [showGuide, setShowGuide] = useState(false);
  const [actionState, setActionState] = useState('idle'); // idle | sending | sent
  const Icon = product.icon;

  const tabs = [
    { id: 'about',    label: 'Описание' },
    { id: 'release',  label: 'Что нового' },
    { id: 'llm',      label: 'Совместимые LLM' },
    { id: 'support',  label: 'Поддержка' },
  ];

  const handleBuy = () => {
    setActionState('sending');
    setTimeout(() => setActionState('sent'), 1100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      style={{ fontFamily: SANS_FONT }}
    >
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* header */}
        <div className="px-7 pt-7 pb-6 border-b border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
          <div className="flex items-start gap-4">
            <div className="relative w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
              <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600" />
              <Icon className="relative w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
                Каталог <ChevronRight className="w-3 h-3" /> {product.type} <ChevronRight className="w-3 h-3" /> {product.cat}
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
                {product.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                <span>{product.version}</span>
                <span className="text-zinc-300">·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-zinc-900">{product.rating}</span>
                </span>
                <span className="text-zinc-300">·</span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  {product.downloads.toLocaleString('ru-RU')} скачиваний
                </span>
                <span className="text-zinc-300">·</span>
                <span>Платформы: {product.platforms.join(', ')}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {product.ready && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                    <ShieldCheck className="w-3 h-3" />
                    ROBIN Ready
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
                  <Plug className="w-3 h-3" />
                  MCP-совместим
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* body grid */}
        <div className="grid lg:grid-cols-[1fr_320px]">
          {/* left: tabs */}
          <div className="p-7">
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-100 p-1 w-fit">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                    tab === t.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 transition-all duration-300">
              {tab === 'about' && (
                <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
                  <p>{product.short}</p>
                  <p>
                    Артефакт включает базовый промпт-граф, эталонный YAML-конфиг, преднастроенные правила
                    бизнес-логики, интеграцию с MCP-коннекторами и тестовый набор данных. Дорабатывается визуально
                    в ROBIN Studio без переписывания кода.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 mt-4">
                    {[
                      'Базовый промпт-граф с узлами обработки',
                      'Эталонный YAML-конфиг шаблона',
                      'Преднастроенные правила бизнес-логики',
                      'Тестовый набор: 20 примеров с разметкой',
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                        <Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'release' && (
                <div className="space-y-5 text-sm">
                  {[
                    { v: product.version, d: '28 апреля 2026', items: ['Поддержка документов с приложениями', 'Точность распознавания +9%', 'Исправлен экспорт длинных таблиц'] },
                    { v: 'v 2.4.0',       d: '12 марта 2026',   items: ['Новый MCP-коннектор к Directum RX', 'Узел «Сравнение редакций»', 'Совместимость с GigaChat 4.0'] },
                    { v: 'v 2.3.0',       d: '4 февраля 2026',  items: ['Первый публичный релиз в маркетплейсе ROBIN Artifacts'] },
                  ].map((r, i) => (
                    <div key={i} className="border-l-2 border-zinc-200 pl-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm font-semibold text-zinc-900">{r.v}</span>
                        <span className="text-xs text-zinc-500">— {r.d}</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-zinc-700">
                        {r.items.map((it, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-indigo-500 shrink-0">–</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'llm' && (
                <div className="overflow-hidden rounded-lg border border-zinc-200">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50">
                      <tr className="text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        <th className="px-4 py-2.5">Модель</th>
                        <th className="px-4 py-2.5">Провайдер</th>
                        <th className="px-4 py-2.5">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {[
                        ['GigaChat 4.0 / Pro', 'Сбер',           'recommended'],
                        ['YandexGPT 5 Pro',    'Yandex Cloud',   'recommended'],
                        ['T-Pro / T-Lite',     'Т-Технологии',   'supported'],
                        ['Llama 3.3 70B',      'Self-hosted',    'supported'],
                        ['Qwen 2.5 72B',       'Self-hosted',    'supported'],
                        ['GPT-4o',             'OpenAI',         'sandbox'],
                      ].map(([m, p, s], i) => (
                        <tr key={i} className="hover:bg-zinc-50/60 transition-colors duration-300">
                          <td className="px-4 py-3 font-medium text-zinc-900">{m}</td>
                          <td className="px-4 py-3 text-zinc-600">{p}</td>
                          <td className="px-4 py-3">
                            {s === 'recommended' && <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700"><Check className="w-3 h-3" /> Рекомендовано</span>}
                            {s === 'supported'   && <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700"><Check className="w-3 h-3" /> Поддерживается</span>}
                            {s === 'sandbox'     && <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">⚠ Только в Sandbox</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'support' && (
                <div className="space-y-3 text-sm text-zinc-700">
                  <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-zinc-400" /> Разработчик: <span className="font-medium text-zinc-900">ROBIN Lab</span></div>
                  <div className="flex items-center gap-3"><Mail        className="w-4 h-4 text-zinc-400" /> support@rpa-robin.ru</div>
                  <div className="flex items-center gap-3"><MessageSquare className="w-4 h-4 text-zinc-400" /> Telegram: @robin_artifacts</div>
                  <div className="flex items-center gap-3"><BookOpen    className="w-4 h-4 text-zinc-400" /> docs.rpa-robin.ru/artifacts</div>
                  <div className="flex items-center gap-3"><Zap         className="w-4 h-4 text-zinc-400" /> SLA: ответ в течение 8 рабочих часов</div>
                </div>
              )}
            </div>
          </div>

          {/* right: action panel */}
          <div className="border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-50/60 p-7">
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">Лицензия</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">{product.price}</div>
            <p className="mt-1 text-xs text-zinc-600">
              Корпоративная лицензия — без ограничения числа запусков в&nbsp;рамках одного юрлица.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              {/* Buy */}
              <button
                onClick={handleBuy}
                disabled={actionState !== 'idle'}
                className="group relative overflow-hidden bg-zinc-900 text-white px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-90 disabled:cursor-default"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {actionState === 'idle' && (<>
                    {product.price === 'Бесплатно' ? 'Получить бесплатно' : 'Купить'}
                    <ArrowRight className="w-4 h-4" />
                  </>)}
                  {actionState === 'sending' && (<>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Отправляем дистрибутив…
                  </>)}
                  {actionState === 'sent' && (<>
                    <Check className="w-4 h-4" />
                    Дистрибутив отправлен на e-mail
                  </>)}
                </span>
              </button>

              {/* Try in ROBIN */}
              <button
                onClick={() => setShowGuide(v => !v)}
                style={{ padding: '1.5px' }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative flex items-center justify-center gap-2 bg-white group-hover:bg-transparent text-indigo-600 group-hover:text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 z-10">
                  Попробовать в ROBIN
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showGuide ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {showGuide && (
                <div className="mt-1 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 transition-all duration-300">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
                    Тест в Sandbox · 4 шага
                  </div>
                  <ol className="space-y-3 text-xs text-zinc-700">
                    {[
                      ['Откройте ROBIN Sandbox',     'Изолированная среда уже развёрнута. Регистрация не требуется в течение 14 дней.'],
                      ['Установите артефакт',         'Нажмите «Установить» в верхней панели — пакет подгрузится автоматически.'],
                      ['Загрузите тестовый документ', 'Мы приложили 3 примера с разными типами кейсов.'],
                      ['Запустите проверку',          'Через ~30 секунд получите отчёт: риски, отклонения, рекомендации.'],
                    ].map(([t, d], i) => (
                      <li key={i} className="flex gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-semibold">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-zinc-900">{t}</div>
                          <div className="text-zinc-600 mt-0.5 leading-relaxed">{d}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button className="mt-4 w-full text-xs font-medium text-indigo-600 hover:text-purple-600 inline-flex items-center justify-center gap-1 transition-colors duration-300">
                    Открыть Sandbox
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Contact */}
              <button
                onClick={() => alert('Откроется форма CRM (заглушка)')}
                className="px-5 py-2.5 rounded-lg text-sm font-medium border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition-all duration-300"
              >
                Связаться с менеджером
              </button>
            </div>

            <div className="mt-7 pt-5 border-t border-zinc-200 space-y-2 text-xs text-zinc-500">
              <div>Автор: <span className="font-medium text-zinc-700">ROBIN Lab</span></div>
              <div>Опубликовано: 14 февраля 2026</div>
              <div>Обновлено: 28 апреля 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────  CONTACTS  ──────────── */

function ContactsView({ sent, onSubmit }) {
  return (
    <div style={{ fontFamily: SANS_FONT }}>
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Contact us</div>
          <h1
            className="mt-3 text-5xl md:text-6xl tracking-tight text-zinc-900 max-w-3xl"
            style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
          >
            Свяжитесь с командой <span className="italic">ROBIN</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600">
            Подберём подходящий артефакт под вашу задачу, организуем демо в Sandbox или
            обсудим публикацию вашего шаблона на маркетплейсе.
          </p>
        </div>
      </section>

      {/* details + map */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">ГК ROBIN</div>
            <div className="mt-6 space-y-5">
              {[
                { icon: MapPin, title: 'Адрес офиса',       value: '105066, Москва, ул. Нижняя Красносельская, 35, стр. 9' },
                { icon: Phone,  title: 'Телефон',           value: '+7 (495) 215-50-86' },
                { icon: Mail,   title: 'Общие вопросы',     value: 'info@rpa-robin.ru' },
                { icon: Mail,   title: 'Поддержка',         value: 'support@rpa-robin.ru' },
                { icon: Mail,   title: 'Партнёрство',       value: 'partners@rpa-robin.ru' },
                { icon: Globe,  title: 'Часы работы',       value: 'Пн–Пт, 09:00–19:00 (МСК)' },
              ].map((it, i) => {
                const Icon = it.icon;
                return (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:border-indigo-300 group-hover:text-indigo-600 transition-all duration-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">{it.title}</div>
                      <div className="mt-1 text-sm text-zinc-900 font-medium">{it.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {['Telegram · @rpa_robin', 'VK · vk.com/rpa.robin', 'YouTube · ROBIN RPA'].map(c => (
                <a
                  key={c}
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
                >
                  {c}
                </a>
              ))}
            </div>
          </div>

          {/* map placeholder */}
          <div className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(99,102,241,0.08) 1px, transparent 1px),' +
                  'linear-gradient(to bottom, rgba(99,102,241,0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.10), transparent 60%)',
              }}
            />
            {/* roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
              <path d="M 0 240 Q 150 200 250 220 T 400 180" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="2" />
              <path d="M 80 0 L 120 400" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="1.5" />
              <path d="M 280 0 Q 260 200 320 400" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="1.5" />
            </svg>
            {/* pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-40" />
                <div className="relative w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="mt-3 px-3 py-1.5 rounded-md bg-white border border-zinc-200 shadow-sm text-xs font-medium text-zinc-900">
                ROBIN HQ
              </div>
            </div>
            {/* CTA */}
            <button className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-700 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 shadow-sm">
              Построить маршрут →
            </button>
          </div>
        </div>
      </section>

      {/* author form */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Партнёрам</div>
            <h2
              className="mt-3 text-4xl md:text-5xl tracking-tight text-zinc-900"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 400 }}
            >
              Стать <span className="italic">автором</span> артефактов
            </h2>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed">
              Если вы разрабатываете AI-агентов, RPA-сценарии или MCP-коннекторы — публикуйтесь
              на ROBIN Artifacts. Мы возьмём на себя дистрибуцию, биллинг, поддержку первой линии
              и сертификацию ROBIN Ready.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-3">
            {[
              { icon: Building2, title: 'Корп. аудитория', text: '1 200+ компаний-клиентов ROBIN' },
              { icon: Rocket,    title: 'Rev-share 70/30', text: 'Выплаты ежемесячно, без скрытых комиссий' },
              { icon: Boxes,     title: 'Sandbox для бета',text: 'Публикуйте бету и собирайте обратную связь' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="rounded-xl bg-white border border-zinc-200 p-5 transition-all duration-300 hover:border-indigo-200">
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <div className="mt-3 text-sm font-semibold text-zinc-900">{c.title}</div>
                  <div className="text-xs text-zinc-600 mt-1">{c.text}</div>
                </div>
              );
            })}
          </div>

          {sent ? (
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-10 text-center transition-all duration-300">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-zinc-900">Заявка отправлена</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Мы свяжемся с вами в течение 2 рабочих дней. Решение по публикации — до 10 рабочих дней
                после ревью артефакта.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); onSubmit(); }}
              className="mt-10 rounded-2xl bg-white border border-zinc-200 p-7 md:p-9"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Имя и фамилия*"            placeholder="Иван Петров" />
                <Field label="Корпоративный e-mail*"     placeholder="ivan@company.ru" type="email" />
                <Field label="Компания / команда*"       placeholder="ООО «Артефакт»" />
                <Field label="Сайт / GitHub"             placeholder="https://..." />
                <SelectField label="Тип артефакта*"      options={['AI-агент', 'RPA-сценарий', 'MCP-коннектор', 'Шаблон процесса']} />
                <SelectField label="Категория*"          options={['Финансы', 'Продажи', 'HR', 'Сервис', 'Производство']} />
              </div>
              <div className="mt-5">
                <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                  Краткое описание решения*
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="Что делает артефакт, какую боль решает, на каких платформах работает…"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300 resize-none"
                />
              </div>
              <div className="mt-5 space-y-2.5">
                <label className="flex items-start gap-2.5 text-xs text-zinc-700 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-indigo-600" />
                  <span>Согласен с обработкой персональных данных в соответствии с 152-ФЗ</span>
                </label>
                <label className="flex items-start gap-2.5 text-xs text-zinc-700 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-indigo-600" />
                  <span>Принимаю условия <span className="text-indigo-600 underline underline-offset-2">оферты автора</span></span>
                </label>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-zinc-500">Ответ — в течение 2 рабочих дней.</p>
                <PrimaryButton size="lg" icon={Send}>Отправить заявку</PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">{label}</label>
      <input
        type={type}
        required={label.includes('*')}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300"
      />
    </div>
  );
}

function SelectField({ label, options }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">{label}</label>
      <select
        required
        defaultValue=""
        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300"
      >
        <option value="" disabled>Выберите…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ────────────  FOOTER  ──────────── */

function Footer({ setTab }) {
  return (
    <footer style={{ fontFamily: SANS_FONT }} className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold tracking-tight text-zinc-900">ROBIN</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Artifacts</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-600 max-w-md">
            Маркетплейс корпоративных AI-агентов, RPA-сценариев и MCP-коннекторов.
            Готовые на 80% артефакты для ИТ-команд.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Платформа</div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li><button onClick={() => setTab('catalog')} className="hover:text-indigo-600 transition-colors duration-300">Каталог</button></li>
            <li><button className="hover:text-indigo-600 transition-colors duration-300">Sandbox</button></li>
            <li><button className="hover:text-indigo-600 transition-colors duration-300">Документация</button></li>
            <li><button className="hover:text-indigo-600 transition-colors duration-300">Статус сервиса</button></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Компания</div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li><button onClick={() => setTab('contacts')} className="hover:text-indigo-600 transition-colors duration-300">Контакты</button></li>
            <li><button onClick={() => setTab('contacts')} className="hover:text-indigo-600 transition-colors duration-300">Стать автором</button></li>
            <li><button className="hover:text-indigo-600 transition-colors duration-300">Партнёрам</button></li>
            <li><button className="hover:text-indigo-600 transition-colors duration-300">Пресса</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>© 2026 ГК ROBIN. Все права защищены.</div>
          <div className="flex items-center gap-4">
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-indigo-600 transition-colors duration-300">Политика обработки ПДн</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-indigo-600 transition-colors duration-300">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────  APP ROOT  ──────────── */

export default function App() {
  const [tab, setTab] = useState('home');
  const [category, setCategory] = useState('Все');
  const [typeFilter, setTypeFilter] = useState('Все типы');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authorFormSent, setAuthorFormSent] = useState(false);

  // load fonts once
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (e) {} };
  }, []);

  // scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  // close modal on escape
  useEffect(() => {
    if (!selectedProduct) return;
    const onKey = e => { if (e.key === 'Escape') setSelectedProduct(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: SANS_FONT }}>
      <Nav tab={tab} setTab={setTab} />

      <main className="transition-all duration-300">
        {tab === 'home' && <HomeView setTab={setTab} />}
        {tab === 'catalog' && (
          <CatalogView
            category={category}
            setCategory={setCategory}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            query={query}
            setQuery={setQuery}
            onSelect={setSelectedProduct}
          />
        )}
        {tab === 'contacts' && (
          <ContactsView
            sent={authorFormSent}
            onSubmit={() => setAuthorFormSent(true)}
          />
        )}
      </main>

      <Footer setTab={setTab} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
