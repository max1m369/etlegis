// 1. Практика (категория верхнего уровня)
export interface Practice {
  id: string;
  slug: string; // 'criminal-defense', 'corporate-disputes'
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // SVG icon key
  services: Service[]; // Связанные услуги
  leadLawyers: Lawyer[]; // Ведущие юристы практики
  cases: Case[]; // Выигранные дела в рамках практики
}

// 2. Услуга (конкретная детальная страница)
export interface Service {
  id: string;
  slug: string;
  practiceId: string;
  title: string;
  problemStatement: string; // С какой проблемой пришел доверитель
  solutionApproach: string; // Как бюро защищает интересы
  keyAdvantages: string[];
  cases: Case[];
  responsibleLawyerId: string;
}

// 3. Команда / Адвокат
export interface Lawyer {
  id: string;
  slug: string;
  name: string;
  status: string; // Партнер, Адвокат, Руководитель практики
  specialization: string;
  photoUrl: string; // Вертикальный портрет 3:4
  experienceYears: number;
  education: string[];
  bio: string;
  practiceIds: string[];
  cases: Case[];
}

// 4. Кейс (Успешное дело)
export interface Case {
  id: string;
  slug: string;
  title: string;
  practiceId: string;
  lawyerIds: string[];
  claimAmount?: string; // Например, "1,2 млрд ₽" или "388 млн ₽"
  resultSummary: string; // Краткая суть победы для превью
  challenge: string; // Сложность ситуации
  solution: string; // Действия бюро
  courtInstance?: string;
  date: string;
}

// 5. Публикация / Блог
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  previewText: string;
  content: string;
  authorId?: string;
  date: string;
}
