import type { GlobalConfig } from 'payload'
import { isStaff } from '../access'

const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
  admin: {
    group: 'Система',
  },
  access: {
    read: () => true,
    update: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контакты',
          fields: [
            { name: 'phone', type: 'text', defaultValue: '+7 (495) 105-91-15', label: 'Основной телефон' },
            { name: 'phoneSecondary', type: 'text', label: 'Дополнительный телефон' },
            { name: 'email', type: 'email', defaultValue: 'info@etlegis.ru', label: 'Email для обращений' },
            {
              name: 'address',
              type: 'textarea',
              defaultValue: 'Москва, 1-й Магистральный тупик, 11, стр. 10',
              label: 'Адрес офиса',
            },
            { name: 'workHours', type: 'text', defaultValue: 'Пн-Пт 09:00 - 20:00', label: 'Режим работы' },
            { name: 'telegram', type: 'text', defaultValue: 'https://t.me/etlegis', label: 'Telegram-канал/бот' },
            { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
          ],
        },
        {
          label: 'Реквизиты',
          fields: [
            { name: 'legalName', type: 'text', defaultValue: 'Адвокатское бюро города Москвы «ЭТЛЕГИС»', label: 'Юридическое наименование' },
            { name: 'ogrn', type: 'text', label: 'ОГРН' },
            { name: 'inn', type: 'text', label: 'ИНН' },
            { name: 'kpp', type: 'text', label: 'КПП' },
            { name: 'accountantInfo', type: 'textarea', label: 'Банковские реквизиты' },
          ],
        },
        {
          label: 'Главная страница',
          fields: [
            { name: 'heroTitle', type: 'textarea', defaultValue: 'Приводим ситуацию в выстроенную правовую позицию', label: 'Заголовок Hero' },
            { name: 'heroLead', type: 'textarea', defaultValue: 'Защита бизнеса и его руководителей в уголовных, налоговых и банкротных делах. Работаем с 2019 года.', label: 'Подзаголовок Hero' },
            { name: 'statsFoundationYear', type: 'number', defaultValue: 2019, label: 'Год основания' },
            { name: 'statsCasesCount', type: 'number', defaultValue: 200, label: 'Количество завершенных дел' },
            { name: 'statsAmountClaimed', type: 'text', defaultValue: '1.2 млрд ₽', label: 'Сумма выигранных споров' },
            { name: 'statsYearsPractice', type: 'number', defaultValue: 5, label: 'Лет судебной практики' },
          ],
        },
      ],
    },
  ],
}

export default Settings
