import { lawyers, cases, practices, articles } from './mock-data';
import type { Lawyer, Case, Practice, Article } from '@/types/models';

export type { Lawyer, Case, Practice, Article };

export interface PracticeServiceItem {
  id: string;
  title: string;
}

export interface PracticeItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  services: PracticeServiceItem[];
}

export const PRACTICES_DATA: PracticeItem[] = [
  {
    id: "criminal-defense",
    slug: "criminal-defense",
    title: "Уголовно-правовая защита бизнеса",
    shortDescription: "Защита бенефициаров, генеральных директоров и должностных лиц компаний при обвинениях в экономических и должностных правонарушениях.",
    services: [
      { id: "s1", title: "Защита по экономическим статьям (мошенничество ст. 159, 160 УК РФ)" },
      { id: "s2", title: "Сопровождение должностных и коррупционных расследований (ст. 290, 291 УК РФ)" },
      { id: "s3", title: "Экстренное реагирование: обыски, допросы, выемки (24/7)" },
    ],
  },
  {
    id: "corporate-disputes",
    slug: "corporate-disputes",
    title: "Корпоративные споры и защита активов",
    shortDescription: "Разрешение комплексных арбитражных споров, пресечение рейдерских захватов, оспаривание сделок и защита прав акционеров.",
    services: [
      { id: "s4", title: "Разрешение корпоративных конфликтов и споров участников ООО/АО" },
      { id: "s5", title: "Взыскание задолженностей и убытков в промышленных масштабах" },
      { id: "s6", title: "Защита от субсидиарной ответственности в банкротстве" },
    ],
  },
  {
    id: "tax-disputes",
    slug: "tax-disputes",
    title: "Налоговый консалтинг и споры с ФНС",
    shortDescription: "Правовое сопровождение выездных проверок, отмена многомиллионных доначислений и исключение рисков уголовного преследования по ст. 199 УК РФ.",
    services: [
      { id: "s7", title: "Сопровождение выездных налоговых проверок (ВНП)" },
      { id: "s8", title: "Досудебное и судебное обжалование решений налоговых органов" },
      { id: "s9", title: "Налоговый комплаенс и оценка благонадежности контрагентов" },
    ],
  },
  {
    id: "subsidiary-liability",
    slug: "subsidiary-liability",
    title: "Банкротство и субсидиарная ответственность",
    shortDescription: "Субсидиарная ответственность стала главным финансовым риском для современного руководителя. Мы разрабатываем многоуровневую систему доказательств добросовестности действий КДЛ, исключаем презумпции виновности и спасаем личное благосостояние доверителей.",
    services: [
      { id: "s10", title: "Защита бенефициаров и директоров от субсидиарной ответственности" },
      { id: "s11", title: "Сопровождение процедур банкротства со стороны должника и кредиторов" },
      { id: "s12", title: "Оспаривание подозрительных сделок и возврат активов" },
    ],
  },
];

export const LAWYERS_DATA: Lawyer[] = lawyers;
export const CASES_DATA: Case[] = cases;
export const ARTICLES_DATA: Article[] = articles;
