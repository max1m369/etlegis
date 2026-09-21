import sqlite3

conn = sqlite3.connect('admin-panel/local.db')
c = conn.cursor()

# 1. Remove any test rows
c.execute("DELETE FROM cases WHERE slug LIKE 'test-%'")
conn.commit()

# 2. Check existing slugs
existing = [row[0] for row in c.execute('SELECT slug FROM cases').fetchall()]

cases_to_seed = [
    {
        'title': 'Победа в многолетней судебной тяжбе на 1,2 млрд рублей',
        'slug': 'pobeda-v-tyazhbe-1-2-mlrd',
        'practice_id': 4,
        'amount': 1200000000,
        'year': 2025,
        'synopsis': 'Крупный федеральный банк инициировал судебный процесс о взыскании задолженности.',
        'task': 'Защитить операционные активы холдинга и заблокировать недобросовестное взыскание.',
        'actions': 'Провели аудит сделок, доказали недобросовестное поведение кредитора и злоупотребление правом.',
        'result': 'Полный отказ в иске банку, сохранение ключевых операционных активов.',
        'show_on_home': 1,
        'instances': 'Арбитражный суд г. Москвы',
        '_status': 'published'
    },
    {
        'title': 'Защита КДЛ от субсидиарной ответственности на 388 млн рублей',
        'slug': 'zashchita-ot-subsidiarnoy-otvetstvennosti-388-mln',
        'practice_id': 3,
        'amount': 388000000,
        'year': 2025,
        'synopsis': 'Требование привлечь генерального директора к субсидиарной ответственности.',
        'task': 'Доказать экономическую обоснованность решений директора.',
        'actions': 'Проведен детальный экономический анализ управленческих решений.',
        'result': 'Полный отказ в привлечении доверителя к субсидиарной ответственности.',
        'show_on_home': 1,
        'instances': 'Арбитражный суд Московской области',
        '_status': 'published'
    },
    {
        'title': 'Взыскание задолженности по договору аренды коммерческой недвижимости',
        'slug': 'arbitrazh-arenda-14-mln',
        'practice_id': 4,
        'amount': 14000000,
        'year': 2026,
        'synopsis': 'Задолженность арендатора коммерческой недвижимости.',
        'task': 'Взыскать сумму основного долга и неустойку.',
        'actions': 'Подготовлен иск, доказан факт неисполнения договора.',
        'result': 'Полное удовлетворение требований арендодателя с компенсацией штрафных неустоек.',
        'show_on_home': 1,
        'instances': 'Арбитражный суд г. Москвы',
        '_status': 'published'
    },
    {
        'title': 'Взыскание задолженности по договору подряда и нейтрализация фальсификаций',
        'slug': 'vzyskanie-po-dogovoru-podryada-24-mln',
        'practice_id': 4,
        'amount': 24000000,
        'year': 2024,
        'synopsis': 'Заказчик уклонялся от оплаты и подал встречный иск с поддельными актами.',
        'task': 'Опровергнуть фальсифицированные доказательства и взыскать долг.',
        'actions': 'Заявили о фальсификации доказательств, провели строительно-техническую экспертизу.',
        'result': 'Иск удовлетворен в полном объеме, во встречном иске на 20 млн ₽ отказано.',
        'show_on_home': 0,
        'instances': 'Арбитражный суд г. Москвы',
        '_status': 'published'
    },
    {
        'title': 'Успешное обжалование решения выездной налоговой проверки',
        'slug': 'otmena-nalogovyh-donachisleniy-140-mln',
        'practice_id': 2,
        'amount': 140000000,
        'year': 2024,
        'synopsis': 'Выездная налоговая проверка вменила компании необоснованную налоговую выгоду.',
        'task': 'Снизить сумму доначислений и исключить уголовно-правовые риски.',
        'actions': 'Доказали реальность хозяйственных операций и должную осмотрительность.',
        'result': 'Снижение претензий на 87%, отказ в возбуждении уголовного дела.',
        'show_on_home': 0,
        'instances': 'УФНС России по г. Москве',
        '_status': 'published'
    },
    {
        'title': 'Защита интересов участника общества при выходе и взыскание действительной стоимости доли',
        'slug': 'sudebnaya-likvidaciya-dolya',
        'practice_id': 4,
        'amount': None,
        'year': 2025,
        'synopsis': 'Занижение стоимости доли при выходе участника из общества.',
        'task': 'Доказать реальную рыночную стоимость активов.',
        'actions': 'Проведена судебная финансово-экономическая экспертиза.',
        'result': 'Доказали реальную рыночную стоимость активов компании.',
        'show_on_home': 0,
        'instances': 'Арбитражный суд г. Москвы',
        '_status': 'published'
    }
]

for item in cases_to_seed:
    if item['slug'] not in existing:
        c.execute('''
            INSERT INTO cases (
                title, slug, practice_id, amount, year, synopsis, task, actions, result, show_on_home, instances, _status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        ''', (
            item['title'], item['slug'], item['practice_id'], item['amount'], item['year'],
            item['synopsis'], item['task'], item['actions'], item['result'],
            item['show_on_home'], item['instances'], item['_status']
        ))

conn.commit()
print("Success! Current cases in local.db:")
for row in c.execute('SELECT id, title, slug FROM cases').fetchall():
    print(" -", row)
