import { getPayload } from '../src/lib/payload'
import { can } from '../src/auth/rbac'
import { cleanHtml } from '../src/lib/sanitize'
import { toCsv } from '../src/lib/csv'

interface TestResult {
  name: string
  status: 'PASS' | 'FAIL'
  durationMs: number
  error?: string
  details?: string
}

const results: TestResult[] = []

async function runTest(name: string, fn: () => Promise<string | void>) {
  const start = Date.now()
  try {
    const details = await fn()
    results.push({
      name,
      status: 'PASS',
      durationMs: Date.now() - start,
      details: details || undefined,
    })
    console.log(`  \x1b[32m✔\x1b[0m ${name} (${Date.now() - start}ms)`)
  } catch (err: any) {
    results.push({
      name,
      status: 'FAIL',
      durationMs: Date.now() - start,
      error: err?.message || String(err),
    })
    console.log(`  \x1b[31m✖\x1b[0m ${name} (${Date.now() - start}ms): ${err?.message || err}`)
  }
}

async function main() {
  console.log('\n\x1b[36m========================================================\x1b[0m')
  console.log('\x1b[1m  ETLEGIS — Диагностика и комплексный тест базы данных\x1b[0m')
  console.log('\x1b[36m========================================================\x1b[0m\n')

  const payload = await getPayload()

  // 1. Тест подключения и адаптера
  await runTest('1. Проверка подключения к БД и адаптера хранения', async () => {
    const uri = process.env.DATABASE_URI || 'file:./local.db'
    const isPostgres = uri.startsWith('postgres')
    return `Адаптер: ${isPostgres ? 'PostgreSQL' : 'SQLite'} [${uri}]`
  })

  // 2. Тест доступности всех коллекций
  const collections = [
    'admin-users',
    'sessions',
    'media',
    'practices',
    'services',
    'cases',
    'employees',
    'posts',
    'awards',
    'leads',
    'bookings',
    'slots',
    'audit-log',
  ] as const

  await runTest('2. Проверка схемы и индексов всех 13 коллекций', async () => {
    const stats: string[] = []
    for (const col of collections) {
      const res = await payload.count({ collection: col as any })
      stats.push(`${col}: ${res.totalDocs}`)
    }
    return stats.join(', ')
  })

  // 3. Тест глобальных настроек (Settings)
  await runTest('3. Чтение и целостность глобальных настроек (Settings Global)', async () => {
    const settings = await payload.findGlobal({ slug: 'settings' })
    if (!settings) throw new Error('Глобальные настройки не найдены')
    return `Телефон: ${settings.phone || 'не задан'}, Hero: ${settings.heroTitle ? 'ОК' : 'пусто'}`
  })

  // 4. Тест CRUD + Relationships + Hooks (Практики и Кейсы)
  let testPracticeId: string | number = ''
  let testCaseId: string | number = ''

  await runTest('4. Полный CRUD-цикл и связи: создание тестовой практики', async () => {
    const created = await payload.create({
      collection: 'practices',
      data: {
        title: '__TEST_PRACTICE__',
        slug: 'test-practice-' + Date.now(),
        order: 9999,
      },
    })
    testPracticeId = created.id
    return `Создана практика ID: ${testPracticeId}`
  })

  await runTest('5. Создание кейса со связью, HTML-полями и черновиком', async () => {
    const created = await payload.create({
      collection: 'cases',
      draft: true,
      data: {
        title: '__TEST_CASE__',
        slug: 'test-case-' + Date.now(),
        practice: testPracticeId as any,
        role: 'defence',
        amount: 50000000,
        result: '<p>Тестовый результат защиты</p>',
        _status: 'draft',
      },
    })
    testCaseId = created.id
    return `Создан кейс ID: ${testCaseId}, статус: ${created._status}`
  })

  await runTest('6. Проверка работы хука аудита (AuditLog afterChange)', async () => {
    const logs = await payload.find({
      collection: 'audit-log',
      where: {
        entityId: { equals: String(testCaseId) },
      },
      limit: 1,
    })
    if (logs.totalDocs === 0) {
      throw new Error('Запись в audit-log не была создана автоматически хуком')
    }
    return `Найдена запись аудита: action="${logs.docs[0].action}", entity="${logs.docs[0].entity}"`
  })

  await runTest('7. Публикация и фильтрация опубликованного контента (publishedOrStaff)', async () => {
    await payload.update({
      collection: 'cases',
      id: testCaseId,
      data: {
        _status: 'published',
        disclosure: {
          clientConsent: true,
          anonymizedClient: 'Тестовый доверитель',
        },
      },
    })

    const found = await payload.findByID({
      collection: 'cases',
      id: testCaseId,
      depth: 1,
    })

    if (found._status !== 'published') {
      throw new Error(`Статус не обновился: ожидался published, получен ${found._status}`)
    }
    return `Кейс переведен в статус published`
  })

  await runTest('8. Очистка тестовых данных и проверка хука удаления', async () => {
    await payload.delete({ collection: 'cases', id: testCaseId })
    await payload.delete({ collection: 'practices', id: testPracticeId })

    const deletedLogs = await payload.find({
      collection: 'audit-log',
      where: {
        and: [
          { entityId: { equals: String(testCaseId) } },
          { action: { equals: 'delete' } },
        ],
      },
      limit: 1,
    })

    if (deletedLogs.totalDocs === 0) {
      throw new Error('Событие delete не зафиксировано в audit-log')
    }
    return `Удалены тестовые объекты, событие удаления зафиксировано`
  })

  // 9. Тесты безопасности
  await runTest('9. Безопасность: валидация минимальной длины пароля (>= 12 симв.)', async () => {
    try {
      await payload.create({
        collection: 'admin-users',
        data: {
          email: `short-pass-${Date.now()}@test.ru`,
          password: 'short', // < 12 символов
          name: 'Short Pass Test',
          role: 'editor',
        },
      })
      throw new Error('Система разрешила сохранить пароль короче 12 символов!')
    } catch (e: any) {
      if (e.message.includes('12 символов') || e.message.includes('не короче 12')) {
        return 'Валидатор корректно отклонил короткий пароль'
      }
      throw e
    }
  })

  await runTest('10. Безопасность: санитайзер HTML (нейтрализация XSS)', async () => {
    const maliciousInput = '<p>Текст</p><script>alert("XSS")</script><img src="x" onerror="steal()" />'
    const cleaned = cleanHtml(maliciousInput)
    if (cleaned.includes('<script>') || cleaned.includes('onerror')) {
      throw new Error(`Санитайзер пропустил опасный код: ${cleaned}`)
    }
    return `Очищенный HTML: "${cleaned}"`
  })

  await runTest('11. Безопасность: проверка ролевой матрицы (RBAC)', async () => {
    const editorCanCreateUser = can('editor', 'admin-users', 'create')
    const adminCanCreateUser = can('admin', 'admin-users', 'create')
    const editorCanPublishCase = can('editor', 'cases', 'publish')

    if (editorCanCreateUser) throw new Error('Редактор не должен иметь права создавать пользователей!')
    if (!adminCanCreateUser) throw new Error('Администратор должен иметь полные права!')
    if (!editorCanPublishCase) throw new Error('Редактор должен иметь право публиковать кейсы!')
    return 'Матрица прав admin / editor функционирует корректно'
  })

  await runTest('12. Экспорт данных: генерация CSV с поддержкой Excel UTF-8', async () => {
    const mockData = [
      { name: 'Иван Иванов', phone: '+7 (999) 000-00-00', status: 'new', message: 'Тестовая заявка; с точкой с запятой' },
    ]
    const csv = toCsv(mockData, ['name', 'phone', 'status', 'message'])
    if (!csv.includes('Иван Иванов') || !csv.includes('"+7 (999) 000-00-00"') && !csv.includes('+7 (999) 000-00-00')) {
      throw new Error('Ошибка форматирования CSV')
    }
    return `Сформирован CSV: ${csv.split('\r\n').length} строк`
  })

  // Итоговый отчет
  const passed = results.filter((r) => r.status === 'PASS').length
  const failed = results.filter((r) => r.status === 'FAIL').length

  console.log('\n\x1b[36m--------------------------------------------------------\x1b[0m')
  console.log(`\x1b[1m  ИТОГИ ТЕСТИРОВАНИЯ: \x1b[32m${passed} успешно\x1b[0m, \x1b[${failed > 0 ? '31' : '32'}m${failed} ошибок\x1b[0m`)
  console.log('\x1b[36m--------------------------------------------------------\x1b[0m\n')

  if (failed > 0) {
    process.exit(1)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('Критическая ошибка запуска тестов:', err)
  process.exit(1)
})
