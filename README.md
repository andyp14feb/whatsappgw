# WhatsAppGW

## **Description:**

WhatsAppGW is a super simple and lightweight for personal use gateway for WhatsApp built using `venom-bot` and `express`. It supports sending messages via API and receiving incoming messages to be forwarded to third-party webhooks. Easily deployable using Docker.

## 🚀 **Main Features**

- **📤 Send WhatsApp Messages via REST API**  
  Easily send text messages by making a POST request to the `/send` endpoint with the recipient's number and message body.
  
- **📩 Receive Incoming WhatsApp Messages**  
  All incoming messages are automatically forwarded to one or more webhook URLs defined in your `.env` file.
  
- **🔄 Multi-webhook Support**  
  Supports multiple webhook endpoints — just separate them with commas in the environment variable.
  
- **📦 Docker-Ready**  
  Comes with a ready-to-use `Dockerfile` and `docker-compose.yml` for quick deployment anywhere.
  
- **🧠 Built on Venom-Bot**  
  Uses `venom-bot` under the hood for reliable, multi-device WhatsApp Web integration.
  
- **🛠 Simple Express Server**  
  Lightweight, fast, and easy to modify — perfect for integration with automation tools like n8n, Integromat, or your own backend.
  

## 🛠️ **Tech Stack**

This project is built with the following technologies:

| Technology | Purpose |
| --- | --- |
| **Node.js** | JavaScript runtime for running the server |
| **Express.js** | Minimal web framework to handle the API |
| **Venom-Bot** | WhatsApp Web API wrapper (multi-device) |
| **node-fetch** | For sending HTTP requests to webhooks |
| **Docker** | Containerization for easy deployment |
| **dotenv** | Manage environment variables from `.env` |

## ⚙️ **Installation & Running (Locally & with Docker)**

You can run WhatsAppGW in two ways:  
🔧 **Locally with Node.js**, or 🐳 **Using Docker** for quick deployment.

### 🔧 Local Setup (Development)

1. **Clone the repository**

```
git clone https://github.com/your-username/whatsappgw.git 
cd whatsappgw
```

2. **Install dependencies**

```
npm install
```

**Create `.env` file**  
Create a file named `.env` in the root directory and add your webhook URLs:

```
WEBHOOK_URLS=http://localhost:5678/webhook/wa-incoming
```

4. **Start the app**

```
npm start
```

5. **Scan QR code**  
  The first time you run it, a QR code will appear in the terminal.  
  Scan it using your WhatsApp mobile app to connect your number.

---

### 🐳 Docker Setup (Production)

1. **Make sure Docker & Docker Compose are installed**
  
2. **Build and run the container**
  

```
docker-compose up --build
```

**Scan QR code**  
View the logs to see the QR code:

```
docker logs -f whatsappgw
```

4. **You're ready!**  
  The API is now accessible at:

```
http://localhost:3000/send
```

---

## 📤 **API Endpoint**

### POST `/send`

Send a WhatsApp message to a specific number.

---

#### 📥 Request Body (JSON)

```
{
"number": "6281234567890",
"message": "Hello from WhatsAppGW!"
}
```

- `number`: Recipient's phone number in international format (without `+`), e.g., `628...`
- `message`: Text message content to send

---

#### 📤 Response (Success)

```
{
"status": "sent"
}
```

---

#### ❌ Response (Error)

```
{
"error": "Error description here"
}
```

---

✅ This endpoint works only **after you've scanned the QR code** and WhatsApp is connected.

## 🔁 Incoming Webhook Handling

When WhatsAppGW receives a new message on your connected WhatsApp account, it will automatically forward the message to one or more webhook URLs defined in the `.env` file.

---

### 📤 Webhook Payload Example

The server will send a `POST` request to each URL in `WEBHOOK_URLS` with the following JSON payload:

```
{
"from": "6281234567890@c.us",
"text": "Hello, this is a test message!"
}
```

- `from`: WhatsApp sender ID (includes country code and the `@c.us` suffix)
- `text`: The actual message content received

---

### ⚙️ Configuration

Define your webhook URLs in the `.env` file, separated by commas if you want to send to multiple destinations:

```
WEBHOOK_URLS=http://localhost:5678/webhook/wa-incoming,http://localhost:8000/another-webhook
```

The app will loop through each URL and send the incoming message to all of them.

---

✅ The webhook integration can be use for tools like:

- **n8n**
- **Integromat / Make.com**
- **Custom Node.js/Python backends****

## 📂 Project Structure

Here's an overview of the main files and folders in the project:

```
whatsappgw/
├── index.js # Main application file (Express + Venom setup)
├── package.json # Node.js dependencies and scripts
├── .env # Webhook URLs and environment variables
├── Dockerfile # Docker image instructions
├── docker-compose.yml # Docker Compose configuration
├── session/ # WhatsApp session data (created after first QR scan)
└── README.md # Project documentation (this file)
```

### 🔍 Key Components

- **`index.js`**  
  Initializes Venom bot, sets up Express routes, handles incoming/outgoing messages.
  
- **`.env`**  
  Defines webhook URLs (can be multiple, comma-separated).
  
- **`Dockerfile`**  
  Contains steps to containerize the app.
  
- **`docker-compose.yml`**  
  Makes running the app in Docker easy with one command.
  
- **`session/`**  
  Created automatically by Venom for storing your WhatsApp login session.
  

---

🧼 You can also add logging, PM2 configs, or test files depending on your use case.

## 💡 Example Use

Below are a few examples of how to use the `/send` API endpoint to send WhatsApp messages.

---

### 🧪 Using cURL

```
curl -X POST http://localhost:3000/send
-H "Content-Type: application/json"
-d '{
"number": "6281234567890",
"message": "Hello from WhatsAppGW via curl!"
}'
```

---

### 🧪 Using Postman

1. Set method to `POST`
2. Set URL to:

```
http://localhost:3000/send
```

3. Under **Body**, select **raw** and choose **JSON** format.
4. Paste this:

```
{
"number": "6281234567890",
"message": "Hello from WhatsAppGW via Postman!"
}
```

5. Click **Send**

---

### 🔁 Using n8n HTTP Request Node

- **Method**: `POST`
- **URL**: `http://localhost:3000/send`
- **Body Content Type**: `JSON`
- **JSON/Raw Parameters**:

```json
{
  "number": "6281234567890",
  "message": "This is a message from n8n"
}
```

✅ Make sure WhatsAppGW is running and connected (QR code scanned) before trying any of the above.

---

### 🐍 Python Example (using `requests`)

```
import requests

url = "http://localhost:3000/send"
payload = {
 "number": "6281234567890",
 "message": "Hello from Python!"
}

response = requests.post(url, json=payload)
print(response.json())
```

###  🌐 JavaScript Example (using `fetch`)

```
fetch("http://localhost:3000/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    number: "6281234567890",
    message: "Hello from JavaScript!"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error("Error:", err));

```

## ⚠️ Important Notes

- **QR Code Required (First Time Use)**  
  When you run the app for the first time, a QR code will appear in the terminal.  
  Scan it using your WhatsApp mobile app to connect.
  
- **Session Persistence**  
  WhatsApp session data is stored in the `session/` folder.  
  Keep this folder to stay logged in between restarts.  
  If deleted, you will need to scan the QR code again.
  
- **Multi-Device Support**  
  The app uses `multidevice: true` to support the latest version of WhatsApp Web.
  
- **Only Text Messages Supported (for now)**  
  Currently, the gateway only supports sending and receiving text messages.  
  Media support (images, audio, etc.) can be added later.
  
- **Webhook Failures Are Logged but Ignored**  
  If your webhook URL is down or fails, the message won't be resent.  
  Make sure your webhook endpoints are always online.
  
- **Not an Official WhatsApp API**  
  This project uses WhatsApp Web via [`venom-bot`](https://github.com/orkestral/venom)  
  and is not affiliated with WhatsApp Inc.
  
- **Disclaimer: <mark>Use at Your Own Risk</mark>**  
  This tool is provided as-is. I do not guarantee its reliability or compatibility  
  with WhatsApp’s long-term policies or infrastructure.  
  **I will not be held responsible for any loss, ban, damage, or consequence 
  caused by the use of this application.**
  

## 📃 License

This project is licensed under the https://opensource.org/licenses/MIT.

You are free to use, modify, and distribute this software with proper attribution and at your own risk.

---

## ✨ Final Note

This project was developed with a mix of improvisation, experimentation,  
and a good amount of "vibe coding" — assisted by AI tools like ChatGPT, Deepseek, Gemini etc.

It's not a polished enterprise-grade system, but rather a practical,  
hacker-style tool built for personal learning, automation, and fun.

Use wisely — and tweak freely!
