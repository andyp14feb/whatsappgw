const venom = require('venom-bot');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // For sending messages to n8n webhook

const app = express();
app.use(bodyParser.json());

venom
venom
  .create({
    session: 'whatsappgw-session', // nama folder session
    multidevice: true,             // wajib pakai true
    folderNameToken: 'session',    // ini nama folder targetnya
  })

  .then((client) => {
    console.log('✅ Venom Bot ready!');

    app.post('/send', async (req, res) => {
      const { number, message } = req.body;
      try {
        await client.sendText(`${number}@c.us`, message);
        res.send({ status: 'sent' });
      } catch (e) {
        res.status(500).send({ error: e.message });
      }
    });


    const webhookURLs = (process.env.WEBHOOK_URLS || '')
    .split(',')
    .map(url => url.trim())
    .filter(Boolean);

    client.onMessage(async (message) => {
      console.log('📩 Message received:', message);

      if (message.body && message.from) {
        for (const url of webhookURLs) {
          try {
            await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: message.from,
                text: message.body,
              }),
            });
            console.log(`✅ Sent message to ${url}`);
          } catch (e) {
            console.error(`❌ Failed to send to ${url}: ${e.message}`);
          }
        }
      }
    });





  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000, () => console.log('🌐 API running on http://localhost:3000'));
