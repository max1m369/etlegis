import { LAWYERS_DATA, CASES_DATA, ARTICLES_DATA } from './etlegis-data';
import { practices as mockPractices } from './mock-data';
import { getDynamicEmployees } from './payload-api';
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
    aliases: ['zashchita-ot-subsidiarnoy-otvetstvennosti-388-mln'],
    categoryLabel: 'Банкротство и субсидиарная ответственность',
    title: 'Защита контролирующего должника лица (КДЛ) от субсидиарной ответственности',
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
    aliases: ['vzyskanie-po-dogovoru-podryada-20-mln'],
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

export async function getAllLawyersAsync(): Promise<Lawyer[]> {
  try {
    const dynamicEmployees = await getDynamicEmployees();
    if (dynamicEmployees && dynamicEmployees.length > 0) {
      return LAWYERS_DATA.map((staticLawyer) => {
        const dyn = (dynamicEmployees as any[]).find((d: any) =>
          d.slug === staticLawyer.slug ||
          (staticLawyer.slug.includes('biryukov') && (d.slug?.includes('biruk') || d.slug?.includes('biryuk'))) ||
          (d.name && staticLawyer.name && d.name.toLowerCase().includes(staticLawyer.name.toLowerCase().split(' ')[0]))
        );
        if (dyn) {
          const isBir = staticLawyer.slug.includes('biryukov') || (staticLawyer.name && staticLawyer.name.includes('Бирюков'));
          return {
            ...staticLawyer,
            ...dyn,
            id: staticLawyer.id,
            slug: staticLawyer.slug,
            photoUrl: isBir ? '/team/t1.webp' : (dyn.photoUrl || staticLawyer.photoUrl),
            education: (dyn.education && dyn.education.length > 0) ? dyn.education : staticLawyer.education,
            bio: (dyn.bio && dyn.bio.trim().length > 0) ? dyn.bio : staticLawyer.bio,
            practiceIds: (dyn.practiceIds && dyn.practiceIds.length > 0) ? dyn.practiceIds : staticLawyer.practiceIds,
          };
        }
        return staticLawyer;
      });
    }
  } catch (err) {
    // fallback
  }
  return LAWYERS_DATA;
}

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  const norm = slug.toLowerCase();
  return LAWYERS_DATA.find((l) => {
    if (l.slug === slug || l.id === slug) return true;
    if (norm === 'birukov-aleksey' || norm === 'biryukov-alexey' || norm === 'aleksey-biryukov') {
      return l.slug === 'biryukov-alexey' || l.slug === 'birukov-aleksey' || l.name?.includes('Бирюков');
    }
    if (norm === 'luchnikov-konstantin' || norm === 'konstantin-luchnikov') {
      return l.slug === 'luchnikov-konstantin' || l.name?.includes('Лучников');
    }
    if (norm === 'bulatova-kseniya' || norm === 'kseniya-bulatova') {
      return l.slug === 'bulatova-kseniya' || l.name?.includes('Булатова');
    }
    if (norm === 'dmitriev-sergey' || norm === 'sergey-dmitriev') {
      return l.slug === 'dmitriev-sergey' || l.name?.includes('Дмитриев');
    }
    if (norm === 'morozova-anna' || norm === 'anna-morozova') {
      return l.slug === 'morozova-anna' || l.name?.includes('Морозова');
    }
    if (norm === 'smirnova-elena' || norm === 'elena-smirnova') {
      return l.slug === 'smirnova-elena' || l.name?.includes('Смирнова');
    }
    return false;
  });
}

export async function getLawyerBySlugAsync(slug: string): Promise<Lawyer | undefined> {
  try {
    const lawyers = await getAllLawyersAsync();
    const norm = slug.toLowerCase();

    const found = lawyers.find((l) => {
      if (l.slug === slug || l.id === slug) return true;
      if ((norm === 'birukov-aleksey' || norm === 'biryukov-alexey' || norm === 'aleksey-biryukov') && (l.slug?.includes('bir') || l.name?.includes('Бирюков'))) return true;
      if ((norm === 'luchnikov-konstantin' || norm === 'konstantin-luchnikov') && (l.slug?.includes('luch') || l.name?.includes('Лучников'))) return true;
      if ((norm === 'bulatova-kseniya' || norm === 'kseniya-bulatova') && (l.slug?.includes('bula') || l.name?.includes('Булатова'))) return true;
      if ((norm === 'dmitriev-sergey' || norm === 'sergey-dmitriev') && (l.slug?.includes('dmit') || l.name?.includes('Дмитриев'))) return true;
      if ((norm === 'morozova-anna' || norm === 'anna-morozova') && (l.slug?.includes('moro') || l.name?.includes('Морозова'))) return true;
      if ((norm === 'smirnova-elena' || norm === 'elena-smirnova') && (l.slug?.includes('smir') || l.name?.includes('Смирнова'))) return true;
      return false;
    });

    if (found) {
      const isBir = found.slug?.includes('bir') || (found.name && found.name.includes('Бирюков'));
      const staticMock = getLawyerBySlug(slug);
      if (staticMock) {
        return {
          ...staticMock,
          ...found,
          id: staticMock.id,
          slug: staticMock.slug,
          photoUrl: isBir ? '/team/t1.webp' : (found.photoUrl || staticMock.photoUrl),
          education: (found.education && found.education.length > 0) ? found.education : staticMock.education,
          bio: (found.bio && found.bio.trim().length > 0) ? found.bio : ((found as any).quote || staticMock.bio),
          experienceYears: found.experienceYears || staticMock.experienceYears,
          practiceIds: (found.practiceIds && found.practiceIds.length > 0) ? found.practiceIds : staticMock.practiceIds,
          cases: (found.cases && found.cases.length > 0) ? found.cases : staticMock.cases,
        };
      }
      return {
        ...found,
        photoUrl: isBir ? '/team/t1.webp' : found.photoUrl,
      };
    }
  } catch (err) {
    // fallback
  }
  return getLawyerBySlug(slug);
}

export function getPracticesForLawyer(practiceIds: string[]) {
  return mockPractices.filter((p) => practiceIds.includes(p.id) || practiceIds.includes(p.slug));
}

export function getCasesForLawyer(caseIds?: string[], lawyerId?: string, lawyerSlug?: string) {
  const matched = new Map<string, {
    id: string;
    slug: string;
    title: string;
    claimAmount?: string;
    resultSummary: string;
  }>();

  // 1. Direct case IDs or slugs
  if (caseIds && caseIds.length > 0) {
    CASES_DATA.forEach((c) => {
      if (caseIds.includes(c.id) || caseIds.includes(c.slug)) {
        matched.set(c.slug, {
          id: c.id,
          slug: c.slug,
          title: c.title,
          claimAmount: c.claimAmount,
          resultSummary: c.resultSummary,
        });
      }
    });
    ALL_CATALOG_CASES.forEach((c) => {
      if (caseIds.includes(c.id) || caseIds.includes(c.slug) || (c.aliases && c.aliases.some((a) => caseIds.includes(a)))) {
        if (!matched.has(c.slug)) {
          matched.set(c.slug, {
            id: c.id,
            slug: c.slug,
            title: c.title,
            claimAmount: c.claimAmount,
            resultSummary: c.resultSummary,
          });
        }
      }
    });
  }

  // 2. Cases associated by lawyerId / lawyerSlug in CASES_DATA
  CASES_DATA.forEach((c) => {
    const isLawyerId = lawyerId && c.lawyerIds?.includes(lawyerId);
    const isLawyerSlug = lawyerSlug && (c.lawyerIds?.includes(lawyerSlug) || (c as any).lawyerSlug === lawyerSlug);
    if (isLawyerId || isLawyerSlug) {
      if (!matched.has(c.slug)) {
        matched.set(c.slug, {
          id: c.id,
          slug: c.slug,
          title: c.title,
          claimAmount: c.claimAmount,
          resultSummary: c.resultSummary,
        });
      }
    }
  });

  // 3. Cases associated by lawyerSlug in ALL_CATALOG_CASES
  ALL_CATALOG_CASES.forEach((c) => {
    const isLawyer = lawyerSlug && (
      c.lawyerSlug === lawyerSlug ||
      (lawyerSlug.includes('bir') && c.lawyerSlug?.includes('bir')) ||
      (lawyerSlug.includes('luch') && c.lawyerSlug?.includes('luch')) ||
      c.lawyers?.some((l) => l.slug === lawyerSlug || (lawyerId && l.id === lawyerId))
    );

    if (isLawyer) {
      const alreadyHas = matched.has(c.slug) || (c.aliases && c.aliases.some((a) => matched.has(a)));
      if (!alreadyHas) {
        matched.set(c.slug, {
          id: c.id,
          slug: c.slug,
          title: c.title,
          claimAmount: c.claimAmount,
          resultSummary: c.resultSummary,
        });
      }
    }
  });

  return Array.from(matched.values());
}

export function getAllCases() {
  const all = [...ALL_CATALOG_CASES];
  CASES_DATA.forEach((mc) => {
    if (!all.some((c) => c.slug === mc.slug || (c.aliases && c.aliases.includes(mc.slug)))) {
      all.push({
        id: mc.id,
        slug: mc.slug,
        categoryLabel: mc.practiceId || 'Арбитражное судопроизводство',
        title: mc.title,
        claimAmount: mc.claimAmount,
        resultSummary: mc.resultSummary,
        challenge: mc.challenge,
        solution: mc.solution,
        courtInstance: mc.courtInstance,
        date: mc.date,
        lawyerSlug: mc.lawyerIds?.[0] ? LAWYERS_DATA.find((l) => l.id === mc.lawyerIds[0])?.slug : undefined,
      });
    }
  });
  return all;
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
        position: lawyerObj.status || (lawyerObj as any).role || 'Адвокат / Партнёр',
        photo: lawyerObj.photoUrl,
        isAdvocate: true,
        registryNo: (lawyerObj as any).registryNo || '77/14890',
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
                  const rawSlug = l.slug || '';
                  const resolvedSlug = rawSlug === 'birukov-aleksey' || l.name?.includes('Бирюков')
                    ? 'biryukov-alexey'
                    : rawSlug;

                  const staticLawyer = LAWYERS_DATA.find(
                    (sl) => sl.slug === resolvedSlug || (l.name && sl.name.includes(l.name))
                  );

                  if (staticLawyer) {
                    return {
                      id: staticLawyer.id,
                      name: staticLawyer.name,
                      slug: staticLawyer.slug,
                      position: staticLawyer.status,
                      photo: staticLawyer.photoUrl,
                      isAdvocate: true,
                      registryNo: (staticLawyer as any).registryNo || '77/14890',
                    };
                  }

                  return {
                    id: String(l.id),
                    name: l.name || 'Алексей Сергеевич Бирюков',
                    slug: resolvedSlug || 'biryukov-alexey',
                    position: l.position || 'Управляющий партнер, адвокат',
                    photo: undefined,
                    isAdvocate: l.isAdvocate ?? true,
                    registryNo: l.registryNo || '77/14890',
                  };
                }
                return null;
              })
              .filter((l: any): l is CaseLawyer => l !== null)
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
  const norm = slug.toLowerCase();
  let decoded = norm;
  try {
    decoded = decodeURIComponent(slug).toLowerCase();
  } catch (e) {}

  return ARTICLES_DATA.find((a) => {
    if (a.slug === slug || a.id === slug) return true;
    if (a.slug.toLowerCase() === norm || a.slug.toLowerCase() === decoded) return true;
    if (a.aliases && a.aliases.some((al) => al === slug || al.toLowerCase() === norm || al.toLowerCase() === decoded)) return true;
    return false;
  });
}

