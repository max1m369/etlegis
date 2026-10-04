export interface PracticeBadge {
  slug: string;
  title: string;
  iconName: 'shield' | 'scale' | 'building' | 'gavel';
}

export interface TeamMemberFull {
  id: string;
  slug: string;
  name: string;
  role: string;
  uid: string;
  regNum?: string;
  specialization: string;
  experience: string;
  photo: string;
  practices: PracticeBadge[];
  education: string[];
}

export const TEAM_MEMBERS_FULL: TeamMemberFull[] = [
  {
    id: 'biryukov-alexey',
    slug: 'biryukov-alexey',
    name: 'Алексей Бирюков',
    role: 'Управляющий партнёр, адвокат',
    uid: 'UID: 01_LEAD',
    regNum: '№ 77/14820 в реестре АП г. Москвы',
    specialization: 'Комплексная защита бенефициаров и генеральных директоров при уголовных и налоговых рисках высокой сложности, сложный арбитраж',
    experience: '16 лет адвокатской практики',
    photo: '/team/t1.webp',
    practices: [
      { slug: 'criminal-defense', title: 'Уголовно-правовая защита бизнеса', iconName: 'shield' },
      { slug: 'tax-disputes', title: 'Налоговый консалтинг и споры с ФНС', iconName: 'building' },
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
    ],
    education: [
      'Московский государственный юридический университет им. О.Е. Кутафина (МГЮА), диплом с отличием',
      'Аспирантура Института законодательства и сравнительного правоведения при Правительстве РФ (ИЗиСП)',
    ],
  },
  {
    id: 'luchnikov-konstantin',
    slug: 'luchnikov-konstantin',
    name: 'Константин Лучников',
    role: 'Партнёр, руководитель арбитражной практики',
    uid: 'UID: 02_LEAD',
    regNum: 'Член Ассоциации юристов России',
    specialization: 'Разрешение многомиллиардных корпоративных споров, комплексное ведение банкротства и защита топ-менеджеров от субсидиарной ответственности',
    experience: '12 лет судебной практики',
    photo: '/team/t2.webp',
    practices: [
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
      { slug: 'subsidiary-liability', title: 'Банкротство и субсидиарная ответственность', iconName: 'gavel' },
    ],
    education: [
      'Национальный исследовательский университет «Высшая школа экономики» (НИУ ВШЭ), факультет права',
      'Магистратура по программе «Корпоративное и предпринимательское право»',
    ],
  },
  {
    id: 'sokolov-mikhail',
    slug: 'sokolov-mikhail',
    name: 'Михаил Соколов',
    role: 'Партнёр, адвокат',
    uid: 'UID: 03_PARTNER',
    regNum: '№ 77/15124 в реестре АП г. Москвы',
    specialization: 'Предотвращение уголовных рисков на стадии доследственных проверок ОБЭП и СК РФ, экстренная помощь при обысках и выемках',
    experience: '15 лет практики',
    photo: '/team/t3.webp',
    practices: [
      { slug: 'criminal-defense', title: 'Уголовно-правовая защита бизнеса', iconName: 'shield' },
    ],
    education: [
      'МГЮА им. О.Е. Кутафина, Институт адвокатуры',
      'Квалификационный аттестат адвоката Адвокатской палаты города Москвы',
    ],
  },
  {
    id: 'romanova-ekaterina',
    slug: 'romanova-ekaterina',
    name: 'Екатерина Романова',
    role: 'Партнёр, адвокат',
    uid: 'UID: 04_PARTNER',
    regNum: '№ 77/15890 в реестре АП г. Москвы',
    specialization: 'Уголовно-правовой комплаенс и форензик-аудит, защита топ-менеджмента по сложным экономическим и должностным делам',
    experience: '14 лет практики',
    photo: '/team/t4.webp',
    practices: [
      { slug: 'criminal-defense', title: 'Уголовно-правовая защита бизнеса', iconName: 'shield' },
      { slug: 'tax-disputes', title: 'Налоговый консалтинг и споры с ФНС', iconName: 'building' },
    ],
    education: [
      'Московский государственный университет им. М.В. Ломоносова (МГУ), Юридический факультет',
      'Адвокатская палата города Москвы',
    ],
  },
  {
    id: 'dmitriev-sergey',
    slug: 'dmitriev-sergey',
    name: 'Сергей Дмитриев',
    role: 'Руководитель практики банкротства, адвокат',
    uid: 'UID: 05_PARTNER',
    regNum: '№ 77/16012 в реестре АП г. Москвы',
    specialization: 'Комплексное сопровождение банкротных процедур, оспаривание сделок должника, возврат активов и защита КДЛ',
    experience: '11 лет практики',
    photo: '/team/t5.webp',
    practices: [
      { slug: 'subsidiary-liability', title: 'Банкротство и субсидиарная ответственность', iconName: 'gavel' },
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
    ],
    education: [
      'Санкт-Петербургский государственный университет (СПбГУ), юридический факультет',
      'Специализация: антикризисное управление и банкротство',
    ],
  },
  {
    id: 'bulatova-kseniya',
    slug: 'bulatova-kseniya',
    name: 'Ксения Булатова',
    role: 'Партнёр, руководитель налоговой практики',
    uid: 'UID: 06_PARTNER',
    regNum: '№ 77/15291 в реестре АП г. Москвы',
    specialization: 'Налоговый консалтинг, сопровождение выездных проверок ФНС, защита от многомиллионных доначислений и ст. 199 УК РФ',
    experience: '13 лет практики',
    photo: '/team/t6.webp',
    practices: [
      { slug: 'tax-disputes', title: 'Налоговый консалтинг и споры с ФНС', iconName: 'building' },
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
    ],
    education: [
      'Московский государственный юридический университет им. О.Е. Кутафина (МГЮА)',
      'Палата налоговых консультантов Российской Федерации',
    ],
  },
  {
    id: 'morozova-anna',
    slug: 'morozova-anna',
    name: 'Анна Морозова',
    role: 'Ведущий юрист корпоративной практики',
    uid: 'UID: 07_ASSOCIATE',
    regNum: 'Член Ассоциации юристов России',
    specialization: 'Корпоративное управление, структурирование нестандартных сделок (M&A) и защита от недружественного поглощения',
    experience: '9 лет практики',
    photo: '/team/t7.webp',
    practices: [
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
    ],
    education: [
      'НИУ ВШЭ, факультет права',
      'Магистратура «Правовое регулирование бизнеса»',
    ],
  },
  {
    id: 'orlov-dmitriy',
    slug: 'orlov-dmitriy',
    name: 'Дмитрий Орлов',
    role: 'Советник бюро, адвокат',
    uid: 'UID: 08_COUNSEL',
    regNum: '№ 77/9211 в реестре АП г. Москвы',
    specialization: 'Судебная защита в Верховном Суде РФ, разрешение комплексных арбитражных споров и защита права собственности',
    experience: '24 года практики',
    photo: '/team/t8.webp',
    practices: [
      { slug: 'corporate-disputes', title: 'Корпоративные споры и защита активов', iconName: 'scale' },
      { slug: 'subsidiary-liability', title: 'Банкротство и субсидиарная ответственность', iconName: 'gavel' },
    ],
    education: [
      'МГУ им. М.В. Ломоносова, Юридический факультет (диплом с отличием)',
      'Адвокатская палата города Москвы (реестровый № 77/9211)',
    ],
  },
];
