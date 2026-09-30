export interface TeamBlueprintMember {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  role: 'managing' | 'advocate';
  status: string;
  regNum: string;
  chamber: string;
  specializationLine: string;
  specializations: string[];
  experience: string;
  photo: string;
  uid: string;
}

export const TEAM_MEMBERS: TeamBlueprintMember[] = [
  {
    id: 'p-biryukov',
    slug: 'biryukov-alexey',
    name: 'Бирюков Алексей Сергеевич',
    shortName: 'Алексей Бирюков',
    role: 'managing',
    status: 'Управляющий партнёр, адвокат',
    regNum: '77/14820 в реестре АП г. Москвы',
    chamber: 'Адвокатская палата города Москвы',
    specializationLine: 'Защита по экономическим и должностным преступлениям, налоговые споры, арбитраж',
    specializations: [
      'Сопровождение уголовных дел в сфере экономики',
      'Дела коррупционной направленности',
      'Налоговый комплаенс и проверки ФНС',
      'Защита топ-менеджмента от субсидиарной ответственности',
    ],
    experience: '16 лет судебной и адвокатской практики',
    photo: '/team/biryukov.png',
    uid: 'UID: AV-091',
  },
  {
    id: 'p-bulatova',
    slug: 'bulatova-kseniya',
    name: 'Булатова Ксения Александровна',
    shortName: 'Ксения Булатова',
    role: 'managing',
    status: 'Партнёр, адвокат',
    regNum: '77/15291 в реестре АП г. Москвы',
    chamber: 'Адвокатская палата города Москвы',
    specializationLine: 'Банкротство холдингов, защита контролирующих лиц, оспаривание подозрительных сделок',
    specializations: [
      'Сопровождение дел о несостоятельности (банкротстве)',
      'Оспаривание сделок должника в банкротстве',
      'Защита личных активов бенефициаров',
    ],
    experience: '14 лет практики в сфере банкротства и арбитража',
    photo: '/team/bulatova.jpg',
    uid: 'UID: 002_PARTNER',
  },
  {
    id: 'p-luchnikov',
    slug: 'luchnikov-konstantin',
    name: 'Лучников Константин Игоревич',
    shortName: 'Константин Лучников',
    role: 'advocate',
    status: 'Ведущий юрист практики арбитража',
    regNum: 'Член Ассоциации юристов России',
    chamber: 'Московское отделение АЮР',
    specializationLine: 'Строительные споры по 44-ФЗ и 223-ФЗ, взыскание долгов и неустоек по подряду',
    specializations: [
      'Хозяйственные и строительные споры в арбитраже',
      'Защита поставщиков в государственных закупках',
      'Взыскание задолженности по генеральному подряду',
    ],
    experience: '11 лет судебного представительства',
    photo: '/team/luchnikov.jpg',
    uid: 'UID: 003_ARBITR',
  },
  {
    id: 'p-smirnova',
    slug: 'smirnova-elena',
    name: 'Смирнова Елена Викторовна',
    shortName: 'Елена Смирнова',
    role: 'advocate',
    status: 'Адвокат, уголовно-правовая практика',
    regNum: '77/16014 в реестре АП г. Москвы',
    chamber: 'Адвокатская палата города Москвы',
    specializationLine: 'Защита должностных лиц при ОРМ, обысках, допросах и проверках МВД и СК РФ',
    specializations: [
      'Уголовно-правовая защита бизнеса',
      'Предотвращение ареста счетов и изъятия имущества',
      'Защита по ст. 290, 291 УК РФ',
    ],
    experience: '13 лет следственной и адвокатской работы',
    photo: '/team/smirnova.jpg',
    uid: 'UID: 004_CRIM',
  },
  {
    id: 'p-dmitriev',
    slug: 'dmitriev-sergey',
    name: 'Дмитриев Сергей Владимирович',
    shortName: 'Сергей Дмитриев',
    role: 'advocate',
    status: 'Руководитель практики банкротства, адвокат',
    regNum: '77/16012 в реестре АП г. Москвы',
    chamber: 'Адвокатская палата города Москвы',
    specializationLine: 'Комплексное ведение дел о банкротстве, защита бенефициаров и КДЛ, оспаривание сделок',
    specializations: [
      'Банкротство юридических лиц и групп компаний',
      'Защита топ-менеджмента от субсидиарной ответственности',
      'Оспаривание сделок должника и возврат активов',
    ],
    experience: '12 лет практики в сфере банкротного права',
    photo: '/team/t5.webp',
    uid: 'UID: 005_BANKR',
  },
  {
    id: 'p-morozova',
    slug: 'morozova-anna',
    name: 'Морозова Анна Михайловна',
    shortName: 'Анна Морозова',
    role: 'advocate',
    status: 'Ведущий юрист корпоративной практики',
    regNum: 'Член Ассоциации юристов России',
    chamber: 'Московское отделение АЮР',
    specializationLine: 'Корпоративное право, M&A сделки, антимонопольные споры, структурирование бизнеса',
    specializations: [
      'Корпоративные конфликты и споры участников',
      'Сделки слияния и поглощения (M&A)',
      'Правовой аудит бизнеса (Legal Due Diligence)',
    ],
    experience: '9 лет практики в сфере корпоративного права',
    photo: '/team/t7.webp',
    uid: 'UID: 006_CORP',
  },
];
