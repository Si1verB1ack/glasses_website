export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const text = `📱 New Glasses Order:\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await telegramRes.json();
    if (!data.ok) throw new Error(data.description || 'Telegram API error');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Telegram API error:', error);
    return res.status(500).json({ error: error.message });
  }
}