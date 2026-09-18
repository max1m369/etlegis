import { getPayload } from '../src/lib/payload'

async function main() {
  const email = process.argv[2] || 'admin@etlegis.ru'
  const password = process.argv[3] || 'EtlegisPassword2026!'
  const name = process.argv[4] || 'Главный Администратор'

  console.log(`Создание администратора: ${email}...`)

  const payload = await getPayload()

  const existing = await payload.find({
    collection: 'admin-users',
    where: { email: { equals: email } },
  })

  if (existing.docs.length > 0) {
    console.log(`Пользователь ${email} уже существует. Обновляем пароль и права...`)
    await payload.update({
      collection: 'admin-users',
      id: existing.docs[0].id,
      data: {
        password,
        role: 'admin',
        active: true,
      },
    })
    console.log(`✓ Пароль для ${email} успешно обновлён на: ${password}`)
  } else {
    await payload.create({
      collection: 'admin-users',
      data: {
        email,
        password,
        name,
        role: 'admin',
        active: true,
      },
    })
    console.log(`✓ Администратор создан:`)
    console.log(`  E-mail: ${email}`)
    console.log(`  Пароль: ${password}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('Ошибка создания администратора:', err)
  process.exit(1)
})
