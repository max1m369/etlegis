import Link from 'next/link';
import { getAllLawyers } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Команда и адвокаты | Адвокатское бюро Etlegis',
  description: 'Партнеры и адвокаты бюро с практическим опытом защиты бизнеса в уголовных и арбитражных спорах.',
};

export default function TeamPage() {
  const lawyers = getAllLawyers();

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-16 max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-et-accent font-semibold">Экспертиза</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium mt-2 mb-6">Адвокаты бюро</h1>
          <p className="text-sm sm:text-base text-et-muted max-w-2xl font-light mb-16">
            Каждый адвокат бюро специализируется на защите имущественных и личных прав руководителей бизнеса, сочетая процессуальный опыт и бизнес-понимание.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lawyers.map((lawyer) => (
              <Link 
                key={lawyer.id} 
                href={`/team/${lawyer.slug}`}
                className="bg-white border border-et-border p-6 flex flex-col justify-between hover:border-et-dark transition-all group rounded-[2px]"
              >
                <div>
                  <div className="w-full aspect-[3/4] bg-neutral-100 mb-6 relative overflow-hidden flex items-center justify-center text-xs text-neutral-400">
                    {lawyer.photoUrl ? (
                      <img
                        src={lawyer.photoUrl}
                        alt={lawyer.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span>Фотография адвоката</span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-medium group-hover:text-et-accent transition-colors">
                    {lawyer.name}
                  </h3>
                  <span className="text-xs text-et-accent font-medium block mt-1">{lawyer.status}</span>
                  <p className="text-xs text-et-muted mt-3 font-light leading-relaxed">
                    {lawyer.specialization}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-et-border text-xs flex justify-between items-center text-et-muted">
                  <span>Стаж: {lawyer.experienceYears} лет</span>
                  <span className="font-medium text-et-dark group-hover:underline">Профиль →</span>
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
