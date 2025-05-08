export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if cookie exists and is valid
    const cookieName = 'messageSubmitted';
    if (req.cookies[cookieName]) {
      return res.status(429).json({ error: 'You can only submit a message once every 6 hours' });
    }

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

    // Set cookie for 6 hours (21600 seconds)
    res.setHeader('Set-Cookie', `${cookieName}=true; Max-Age=21600; Path=/; HttpOnly; SameSite=Lax`);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Telegram API error:', error);
    return res.status(500).json({ error: error.message });
  }
}