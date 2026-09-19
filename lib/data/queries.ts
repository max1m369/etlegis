import { LAWYERS_DATA, CASES_DATA, ARTICLES_DATA } from './etlegis-data';
import { practices as mockPractices } from './mock-data';
import type { Lawyer } from '@/types/models';

export interface CaseLawyer {
  id?: string;
  name: string;
  slug: string;
  position?: string;
  photo?: string;
  isAdvocate?: boolean;
  registryNo?: string;
}

export interface DetailedCase {
  id: string;
  slug: string;
  aliases?: string[];
  categoryLabel: string;
  title: string;
  claimAmount?: string;
  resultSummary: string;
  challenge: string;
  solution: string;
  lawyerSlug?: string;
  lawyers?: CaseLawyer[];
  courtInstance?: string;
  date?: string;
}

export const ALL_CATALOG_CASES: DetailedCase[] = [
  {
    id: '1',
    slug: 'sudebnaya-likvidaciya-dolya',
    categoryLabel: 'Судебная ликвидация',
    title: 'Защита интересов участника общества при выходе и взыскание действительной стоимости доли',
    resultSummary: 'Успешно доказали реальную рыночную стоимость активов компании и предотвратили занижение выплаты.',
    challenge: 'При выходе участника из состава ООО мажоритарные совладельцы провели манипуляторную оценку балансовых активов и существенно занизили действительную стоимость доли (предложив выплату в 10 раз ниже рыночной).',
    solution: 'Адвокаты Etlegis инициировали независимую строительно-финансовую экспертизу недвижимости и оборудования общества, доказали факты искажения бухгалтерской отчетности и в арбитражном суде добились полного перерасчета и выплат.',
    lawyerSlug: 'luchnikov-konstantin',
    courtInstance: 'Арбитражный суд г. Москвы / Девятый ААС',
    date: '2025'
  },
  {
    id: '2',
    slug: 'arbitrazh-arenda-1',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Взыскание задолженности по договору аренды коммерческой недвижимости',
    claimAmount: '14+ млн ₽',
    resultSummary: 'Полное удовлетворение требований арендодателя с компенсацией штрафных неустоек.',
    challenge: 'Арендатор крупного торгового комплекса систематически нарушал графики платежей и отказался в добровольном порядке оплачивать накопленный долг и неустойку, ссылаясь на форс-мажорные обстоятельства.',
    solution: 'Наши арбитражные юристы доказали отсутствие признаков форс-мажора, добились наложения ареста на банковские счета должника в качестве обеспечительных мер и взыскали долг вместе с пеней.',
    lawyerSlug: 'biryukov-alexey',
    courtInstance: 'Арбитражный суд г. Москвы',
    date: '2025'
  },
  {
    id: '3',
    slug: 'bankrotstvo-bank-1-2-bln',
    aliases: ['pobeda-v-tyazhbe-1-2-mlrd'],
    categoryLabel: 'Банкротство',
    title: 'Победа в многолетней судебной тяжбе на 1,2 млрд руб.',
    claimAmount: '1,2 млрд ₽',
    resultSummary: 'Доказали злоупотребление правом со стороны банка-кредитора. Отказ в удовлетворении требований.',
    challenge: 'Крупный федеральный банк инициировал многоэпизодный судебный процесс о взыскании задолженности и обращении взыскания на залоговые активы производственного холдинга. Оппоненты активно использовали процессуальные злоупотребления и манипуляции оценками.',
    solution: 'Адвокаты бюро выстроили комплексную линию защиты: провели независимый аудит сделок, доказали факт недобросовестного поведения кредитора и злоупотребления правом. В суде первой и апелляционной инстанций были представлены неопровержимые доказательства надлежащего исполнения обязательств.',
    lawyerSlug: 'biryukov-alexey',
    courtInstance: 'Арбитражный суд г. Москвы / Девятый ААС',
    date: '2025'
  },
  {
    id: '4',
    slug: 'kdl-subsidiarnaya-otvetstvennost',
    categoryLabel: 'Банкротство',
    title: 'Привлечение / защита контролирующего должника лица к субсидиарной ответственности',
    claimAmount: '388 млн ₽',
    resultSummary: 'Обоснована добросовестность бизнес-решений директора, с доверителя полностью сняты финансовые претензии.',
    challenge: 'Конкурсный управляющий и пул кредиторов требовали привлечь бывшего генерального директора к субсидиарной ответственности на сумму 388 млн рублей, обвиняя в заключении невыгодных контрактов и несвоевременной подаче заявления о банкротстве.',
    solution: 'Юристы Etlegis провели детальный экономический анализ каждого управленческого решения за трехлетний период, подтвердив соответствие действий бизнес-плану и концепции делового риска. Суд согласился с нашими аргументами о добросовестности директора.',
    lawyerSlug: 'luchnikov-konstantin',
    courtInstance: 'Арбитражный суд Московской области / Десятый ААС',
    date: '2025'
  },
  {
    id: '5',
    slug: 'arbitrazh-podryad-vzyskanie',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Взыскание денежных средств по договору строительного подряда',
    claimAmount: '20+ млн ₽',
    resultSummary: 'Отразили встречные фальсифицированные акты и добились реального перечисления средств доверителю.',
    challenge: 'Заказчик уклонялся от оплаты работ, а во встречном иске потребовал 20 млн рублей неустойки, приложив поддельную исполнительную документацию о якобы имевшихся дефектах и срыве сроков.',
    solution: 'Бюро заявило о фальсификации доказательств по ст. 161 АПК РФ, добилось назначения судебной строительно-технической и почерковедческой экспертизы. Экспертиза подтвердила правоту доверителя, встречные требования были полностью отклонены.',
    lawyerSlug: 'biryukov-alexey',
    courtInstance: 'Арбитражный суд г. Москвы',
    date: '2024'
  },
  {
    id: '6',
    slug: 'bankrotstvo-osparivanie-sdelki',
    categoryLabel: 'Банкротство',
    title: 'Защита по оспариванию сделок должника перед процедурой банкротства',
    resultSummary: 'Сохранено недвижимое имущество доверителя от включения в конкурсную массу недобросовестными кредиторами.',
    challenge: 'Конкурсный управляющий оспаривал сделки купли-продажи коммерческих помещений, совершенные доверителем за год до введения процедуры банкротства, мотивируя их безвозмездным характером.',
    solution: 'Доказали равноценность встречного предоставления и отсутствие осведомленности покупателя о финансовых трудностях продавца. Недвижимость сохранена в собственности покупателя.',
    lawyerSlug: 'luchnikov-konstantin',
    courtInstance: 'Арбитражный суд г. Москвы',
    date: '2024'
  },
  {
    id: '7',
    slug: 'bankrotstvo-prekraschenie-protsedury',
    categoryLabel: 'Банкротство',
    title: 'Введение процедуры банкротства гражданина с полным списанием долгов в арбитражном суде',
    resultSummary: 'Завершение процедуры реализации имущества без обременений для доверителя.',
    challenge: 'Доверитель оказался под давлением множества кредиторов и банковских структур после несостоятельности личного бизнеса.',
    solution: 'Провели процедуру реализации имущества в полном соответствии с ФЗ № 127-ФЗ «О несостоятельности (банкротстве)», отбили претензии кредиторов и добились списания задолженностей.',
    lawyerSlug: 'luchnikov-konstantin',
    courtInstance: 'Арбитражный суд Московской области',
    date: '2024'
  },
  {
    id: '8',
    slug: 'arbitrazh-postavka-goskontrakt',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Урегулирование спора по договору поставки в рамках государственного заказа',
    resultSummary: 'Сняты риски включения в Реестр недобросовестных поставщиков (РНП) и отбиты штрафные санкции.',
    challenge: 'Госзаказчик вменил поставщику просрочку исполнения контракта и направил материалы в УФАС для включения компании в Реестр недобросовестных поставщиков.',
    solution: 'Адвокаты бюро доказали в суде, что задержка была вызвана просрочкой самого заказчика по предоставлению технической документации. Включение в РНП предотвращено.',
    lawyerSlug: 'biryukov-alexey',
    courtInstance: 'УФАС / Арбитражный суд г. Москвы',
    date: '2024'
  },
  {
    id: '9',
    slug: 'likvidaciya-predpriyatiya-kompleks',
    categoryLabel: 'Судебная ликвидация',
    title: 'Ликвидация предприятия с урегулированием всех претензий кредиторов и налоговых органов',
    resultSummary: 'Комплексное закрытие бизнеса без уголовно-правовых и субсидиарных последствий для бенефициаров.',
    challenge: 'Необходимость ликвидации юридического лица со сложной структурой кредиторской задолженности и высокими рисками выездной налоговой проверки.',
    solution: 'Провели процедуру ликвидации через урегулирование требований кредиторов и прохождение камеральных и налоговых проверок без негативных последствий для бенефициаров.',
    lawyerSlug: 'biryukov-alexey',
    courtInstance: 'Арбитражный суд г. Москвы / ИФНС',
    date: '2024'
  },
];

export function getAllLawyers(): Lawyer[] {
  return LAWYERS_DATA;
}

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  return LAWYERS_DATA.find((l) => l.slug === slug || l.id === slug);
}

export function getPracticesForLawyer(practiceIds: string[]) {
  return mockPractices.filter((p) => practiceIds.includes(p.id));
}

export function getCasesForLawyer(caseIds?: string[]) {
  if (!caseIds || caseIds.length === 0) return [];
  return CASES_DATA.filter((c) => caseIds.includes(c.id));
}

export function getAllCases() {
  return ALL_CATALOG_CASES;
}

export function getCaseBySlug(slug: string): DetailedCase | undefined {
  const catalogCase = ALL_CATALOG_CASES.find(
    (c) => c.slug === slug || c.id === slug || (c.aliases && c.aliases.includes(slug))
  );

  let resultCase: DetailedCase | undefined = undefined;

  if (catalogCase) {
    resultCase = { ...catalogCase };
  } else {
    const mockCase = CASES_DATA.find((c) => c.slug === slug || c.id === slug);
    if (mockCase) {
      resultCase = {
        id: mockCase.id,
        slug: mockCase.slug,
        categoryLabel: mockCase.practiceId || 'Арбитражное судопроизводство',
        title: mockCase.title,
        claimAmount: mockCase.claimAmount,
        resultSummary: mockCase.resultSummary,
        challenge: mockCase.challenge,
        solution: mockCase.solution,
        lawyerSlug: mockCase.lawyerIds?.[0] ? LAWYERS_DATA.find(l => l.id === mockCase.lawyerIds[0])?.slug : undefined,
        courtInstance: mockCase.courtInstance,
        date: mockCase.date,
      };
    }
  }

  if (resultCase && (!resultCase.lawyers || resultCase.lawyers.length === 0) && resultCase.lawyerSlug) {
    const lawyerObj = LAWYERS_DATA.find((l) => l.slug === resultCase!.lawyerSlug || l.id === resultCase!.lawyerSlug);
    if (lawyerObj) {
      resultCase.lawyers = [{
        id: lawyerObj.id,
        name: lawyerObj.name,
        slug: lawyerObj.slug,
        position: lawyerObj.status || lawyerObj.role || 'Адвокат / Партнёр',
        photo: lawyerObj.photoUrl,
        isAdvocate: true,
        registryNo: lawyerObj.registryNo || '77/14890',
      }];
    }
  }

  return resultCase;
}

export async function getCaseBySlugAsync(slug: string): Promise<DetailedCase | undefined> {
  // First query Payload CMS database for live dynamic cases
  try {
    const res = await fetch(`http://localhost:3001/api/payload/cases?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`, {
      next: { revalidate: 5 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.docs?.[0]) {
        const doc = data.docs[0];
        const practiceTitle = typeof doc.practice === 'object' ? doc.practice?.title : 'Арбитражное судопроизводство';

        const mappedLawyers: CaseLawyer[] = Array.isArray(doc.lawyers)
          ? doc.lawyers
              .map((l: any) => {
                if (typeof l === 'object' && l !== null) {
                  let photoUrl = undefined;
                  if (l.photo) {
                    photoUrl = typeof l.photo === 'object' ? l.photo.url : undefined;
                    if (photoUrl && photoUrl.startsWith('/')) {
                      photoUrl = `http://localhost:3001${photoUrl}`;
                    }
                  }
                  return {
                    id: String(l.id),
                    name: l.name || 'Адвокат',
                    slug: l.slug || '',
                    position: l.position || 'Адвокат / Партнёр',
                    photo: photoUrl,
                    isAdvocate: l.isAdvocate ?? true,
                    registryNo: l.registryNo || undefined,
                  };
                }
                return null;
              })
              .filter((l): l is CaseLawyer => l !== null)
          : [];

        return {
          id: String(doc.id),
          slug: doc.slug,
          categoryLabel: practiceTitle || 'Арбитражное судопроизводство',
          title: doc.title,
          claimAmount: doc.amount ? `${Number(doc.amount).toLocaleString('ru-RU')} ₽` : undefined,
          resultSummary: doc.result ? doc.result.replace(/<[^>]+>/g, '').trim() : 'Победа в суде',
          challenge: doc.task ? doc.task.replace(/<[^>]+>/g, '').trim() : doc.synopsis ? doc.synopsis.replace(/<[^>]+>/g, '').trim() : 'Судебное разбирательство',
          solution: doc.actions ? doc.actions.replace(/<[^>]+>/g, '').trim() : 'Правовая позиция адвокатов Etlegis',
          courtInstance: doc.instances || 'Арбитражный суд',
          date: doc.year ? String(doc.year) : '2026',
          lawyerSlug: mappedLawyers[0]?.slug,
          lawyers: mappedLawyers,
        };
      }
    }
  } catch (err) {
    // fallback
  }

  // Fallback to static mock data
  return getCaseBySlug(slug);
}

export function getPracticeBySlug(slug: string) {
  return mockPractices.find((p) => p.slug === slug || p.id === slug);
}

export function getAllArticles() {
  return ARTICLES_DATA;
}

export function getArticleBySlug(slug: string) {
  return ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug);
}
