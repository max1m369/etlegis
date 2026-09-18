import Link from 'next/link';
import { getAllCases } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Успешные кейсы | Адвокатское бюро Etlegis',
  description: 'Судебная практика и выигранные споры адвокатского бюро Etlegis: защита активов, банкротство, арбитраж.',
};

export default function CasesPage() {
  const cases = getAllCases();

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-16 max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-et-accent font-semibold">Судебная практика</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium mt-2 mb-6">Практика и результаты</h1>
          <p className="text-sm sm:text-base text-et-muted max-w-2xl font-light mb-16 leading-relaxed">
            Каждое дело — это персональная стратегия по минимизации финансовых потерь доверителя и устранению процессуального давления оппонентов.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.slug}`}
                className="bg-white border border-et-border p-8 flex flex-col justify-between hover:border-et-dark transition-all group rounded-[2px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {c.claimAmount ? (
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-et-accent">
                        {c.claimAmount}
                      </span>
                    ) : <span />}
                    <span className="text-xs font-mono text-et-muted">{c.date}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-medium mb-4 group-hover:text-et-accent transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-et-muted font-light leading-relaxed mb-6">
                    {c.resultSummary}
                  </p>
                </div>

                <div className="pt-6 border-t border-et-border flex justify-between items-center text-xs">
                  <span className="text-et-muted font-mono">Детали процесса</span>
                  <span className="font-medium text-et-dark group-hover:underline">Изучить стратегию →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
