'use client';

import { useState } from 'react';
import { PRACTICES_DATA } from '@/lib/data/etlegis-data';
import { Button } from '@/components/ui/Button';

export function PracticesSection() {
  const [activePracticeId, setActivePracticeId] = useState<string>(PRACTICES_DATA[0].id);

  return (
    <section id="practices" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-et-accent font-medium">Компетенции</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium mt-2">Ключевые практики</h2>
        </div>
        <p className="text-sm text-et-muted max-w-md mt-4 md:mt-0 font-light">
          Объединяем направления работы в монолитные практики для комплексной защиты активов и топ-менеджмента.
        </p>
      </div>

      {/* 
        МОБИЛЬНАЯ ВЕРСИЯ: Плавный горизонтальный свайп с привязкой (CSS Snap)
        ДЕСКТОП: Строгая премиальная 3-колоночная сетка 
      */}
      <div 
        data-testid="practices-carousel"
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
      >
        {PRACTICES_DATA.map((practice, index) => {
          const isActive = activePracticeId === practice.id;
          return (
            <div
              key={practice.id}
              data-practice-card
              role="region"
              aria-roledescription="slide"
              aria-label={`Практика ${index + 1}: ${practice.title}`}
              onClick={() => setActivePracticeId(practice.id)}
              className={`min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-center bg-white border transition-all duration-300 p-8 flex flex-col justify-between flex-shrink-0 cursor-pointer ${
                isActive ? 'border-et-dark shadow-sm' : 'border-et-border hover:border-et-muted'
              }`}
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-et-muted pb-4 border-b border-et-border/60">
                  <span>0{index + 1}</span>
                  <span className="uppercase tracking-widest text-[10px]">Практика</span>
                </div>

                <h3 className="font-serif text-2xl font-medium mt-6 leading-snug">
                  {practice.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-et-muted mt-4 leading-relaxed font-light">
                  {practice.shortDescription}
                </p>

                <div className="mt-8 pt-6 border-t border-et-border/60">
                  <span className="text-[11px] uppercase tracking-wider text-et-muted font-semibold block mb-3">
                    Услуги направления:
                  </span>
                  <ul className="space-y-2.5">
                    {practice.services.map((service) => (
                      <li key={service.id} className="text-xs text-et-dark flex items-start gap-2.5 group">
                        <span className="w-1.5 h-1.5 bg-et-accent mt-1 flex-shrink-0" />
                        <span className="group-hover:underline underline-offset-2 transition-all">
                          {service.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-4">
                <Button 
                  variant={isActive ? 'primary' : 'outline'} 
                  fullWidth 
                  className="text-xs py-3"
                >
                  Обсудить ситуацию
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Индикатор свайпа для телефонов */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        {PRACTICES_DATA.map((p) => (
          <div
            key={p.id}
            className={`h-1 transition-all duration-300 ${
              activePracticeId === p.id ? 'w-6 bg-et-dark' : 'w-2 bg-et-border'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
