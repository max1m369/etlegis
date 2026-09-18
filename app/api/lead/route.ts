import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message, contextTitle } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Укажите телефон' }, { status: 400 });
    }

    let leadId = 'lead-' + Date.now();

    // 1. Сохранение в коллекцию Leads вашей админки Payload CMS через REST API
    const payloadUrl = process.env.PAYLOAD_URL || 'http://localhost:3000';
    try {
      const payloadRes = await fetch(`${payloadUrl}/api/payload/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Не указано',
          phone,
          message: `${contextTitle ? `[${contextTitle}] ` : ''}${message || ''}`,
          status: 'new',
        }),
      });
      if (payloadRes.ok) {
        const payloadData = await payloadRes.json();
        if (payloadData?.doc?.id) leadId = String(payloadData.doc.id);
      }
    } catch (e) {
      console.log('Payload API notice:', (e as Error).message);
    }

    // 2. Опциональный алерт в Telegram бот
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const text = `⚖️ Новая заявка в бюро Etlegis!\n\n👤 Имя: ${name || '—'}\n📞 Тел: ${phone}\n📌 Тема: ${contextTitle || 'Общая'}\n💬 Сообщение: ${message || '—'}`;
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      });
    }

    return NextResponse.json({ success: true, id: leadId });
  } catch (error) {
    console.error('Ошибка создания лида:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
