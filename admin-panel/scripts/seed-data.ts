import { getPayload } from '../src/lib/payload'

async function seed() {
  console.log('Посев начальных данных ETLEGIS...')
  const payload = await getPayload()

  // 1. Практики
  const practicesData = [
    {
      title: 'Уголовно-правовая защита бизнеса',
      slug: 'ugolovno-pravovaya-zashchita-biznesa',
      description: 'Экономические и коррупционные составы. Защита собственников и топ-менеджмента на всех стадиях — от доследственной проверки до кассации.',
      order: 1,
    },
    {
      title: 'Налоги',
      slug: 'nalogi',
      description: 'Налоговый комплаенс до начала проверки и сопровождение выездных проверок. Снижаем доначисления и личные риски руководителя.',
      order: 2,
    },
    {
      title: 'Банкротство и субсидиарная ответственность',
      slug: 'bankrotstvo-i-subsidiarnaya-otvetstvennost',
      description: 'Инициирование и защита в делах о несостоятельности, оспаривание сделок должника, привлечение и защита КДЛ.',
      order: 3,
    },
    {
      title: 'Арбитраж и корпоративные споры',
      slug: 'arbitrazh-i-korporativnye-spory',
      description: 'Хозяйственные споры субъектов, подряд, корпоративные конфликты, интеллектуальная собственность.',
      order: 4,
    },
  ]

  const practiceDocs: Record<string, any> = {}

  for (const p of practicesData) {
    const existing = await payload.find({
      collection: 'practices',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      practiceDocs[p.slug] = existing.docs[0]
      console.log(`  Практика уже существует: ${p.title}`)
    } else {
      const created = await payload.create({
        collection: 'practices',
        data: p,
      })
      practiceDocs[p.slug] = created
      console.log(`  ✓ Создана практика: ${p.title}`)
    }
  }

  // 2. Команда
  const employeesData = [
    {
      name: 'Бирюков Алексей',
      slug: 'birukov-aleksey',
      position: 'Управляющий партнёр, адвокат',
      isAdvocate: true,
      registryNo: '77/14890',
      experienceSince: 2010,
      practices: [practiceDocs['ugolovno-pravovaya-zashchita-biznesa']?.id].filter(Boolean),
      order: 1,
      showOnHome: true,
      _status: 'published',
    },
    {
      name: 'Булатова Ксения Александровна',
      slug: 'bulatova-kseniya-aleksandrovna',
      position: 'Партнёр, руководитель налоговой практики',
      isAdvocate: true,
      registryNo: '77/15234',
      experienceSince: 2012,
      practices: [practiceDocs['nalogi']?.id].filter(Boolean),
      order: 2,
      showOnHome: true,
      _status: 'published',
    },
    {
      name: 'Дмитриев Сергей',
      slug: 'dmitriev-sergey',
      position: 'Руководитель практики банкротства',
      isAdvocate: true,
      registryNo: '77/16012',
      experienceSince: 2014,
      practices: [practiceDocs['bankrotstvo-i-subsidiarnaya-otvetstvennost']?.id].filter(Boolean),
      order: 3,
      showOnHome: true,
      _status: 'published',
    },
    {
      name: 'Морозова Анна',
      slug: 'morozova-anna',
      position: 'Ведущий юрист корпоративной практики',
      isAdvocate: false,
      experienceSince: 2017,
      practices: [practiceDocs['arbitrazh-i-korporativnye-spory']?.id].filter(Boolean),
      order: 4,
      showOnHome: true,
      _status: 'published',
    },
  ]

  for (const e of employeesData) {
    const existing = await payload.find({
      collection: 'employees',
      where: { slug: { equals: e.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Сотрудник уже существует: ${e.name}`)
    } else {
      await payload.create({
        collection: 'employees',
        data: e as any,
      })
      console.log(`  ✓ Добавлен сотрудник: ${e.name}`)
    }
  }

  // 3. Услуги
  const servicesData = [
    {
      title: 'Защита при налоговых проверках и доначислениях',
      slug: 'zashchita-pri-nalogovyh-proverkah',
      practice: practiceDocs['nalogi']?.id,
      lead: 'Сопровождение выездных и камеральных налоговых проверок, обжалование актов и решений ФНС в суде.',
      order: 1,
      _status: 'published',
    },
    {
      title: 'Уголовно-правовая защита топ-менеджеров и собственников',
      slug: 'ugolovnaya-zashchita-top-menedzherov',
      practice: practiceDocs['ugolovno-pravovaya-zashchita-biznesa']?.id,
      lead: 'Адвокатская защита при обысках, допросах, на стадии следствия и в суде по экономическим статьям УК РФ.',
      order: 2,
      _status: 'published',
    },
    {
      title: 'Защита от субсидиарной ответственности в банкротстве',
      slug: 'zashchita-ot-subsidiarnoj-otvetstvennosti',
      practice: practiceDocs['bankrotstvo-i-subsidiarnaya-otvetstvennost']?.id,
      lead: 'Предотвращение взыскания долгов компании с контролирующих должника лиц (КДЛ), директоров и бенефициаров.',
      order: 3,
      _status: 'published',
    },
    {
      title: 'Арбитражные споры и защита активов',
      slug: 'arbitrazhnye-spory-i-zashchita-aktivov',
      practice: practiceDocs['arbitrazh-i-korporativnye-spory']?.id,
      lead: 'Ведение сложных коммерческих споров в арбитражных судах всех инстанций.',
      order: 4,
      _status: 'published',
    },
  ]

  for (const s of servicesData) {
    if (!s.practice) continue
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Услуга уже существует: ${s.title}`)
    } else {
      await payload.create({
        collection: 'services',
        data: s as any,
      })
      console.log(`  ✓ Добавлена услуга: ${s.title}`)
    }
  }

  console.log('Посев данных успешно завершён!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Ошибка посева:', err)
  process.exit(1)
})
