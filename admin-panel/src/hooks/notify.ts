import type { CollectionAfterChangeHook } from 'payload'
import nodemailer from 'nodemailer'

export const notifyTelegram = async (text: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch (error) {
    console.error('Telegram notification error:', error)
  }
}

export const sendMail = async (subject: string, html: string) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"ETLEGIS Сайт" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_EMAIL_TO || process.env.SMTP_USER,
      subject,
      html,
    })
  } catch (error) {
    console.error('Email notification error:', error)
  }
}

export const notifyLead: CollectionAfterChangeHook = async ({ doc, operation }) => {
  if (operation !== 'create') return doc

  const text = `<b>Новая заявка с сайта ETLEGIS</b>\n\n` +
    `<b>Имя:</b> ${doc.name ?? '—'}\n` +
    `<b>Телефон:</b> ${doc.phone ?? '—'}\n` +
    `<b>Email:</b> ${doc.email ?? '—'}\n` +
    `<b>Источник:</b> ${doc.source ?? '—'}\n` +
    `<b>Сообщение:</b>\n${doc.message ?? '—'}`

  await Promise.all([
    notifyTelegram(text),
    sendMail('Новая заявка с сайта ETLEGIS', text.replace(/\n/g, '<br>')),
  ])

  return doc
}
