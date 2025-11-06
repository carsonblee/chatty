# Chatty: Your Sassy AI Chatbot

This is a lightweight [Next.js](https://nextjs.org) web application that allows users to interact with OpenAI's GPT models through a clean UI via input prompt submissions and fetching from OpenAI.

*This web app was built for to meet the objectives and functional requirements of Servimatt's Frontend Engineer Technical Assessment.*

## Features

- 🤖 Chat with OpenAI's GPT models
- 💾 Conversation history with timestamps
- 🔒 Secure API key handling (server-side only)
- 🎨 Modern, responsive UI with Tailwind CSS
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- 🗑️ Clear conversation history

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 13+ (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide](https://lucide.dev/) React
- **AI Provider:** [OpenAI](https://openai.com/) API

### Prerequisites

- Node.js 18.x or higher
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Project Layout

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Secure API endpoint
│   ├── page.tsx                  # Main page
│   └── layout.tsx                # Root layout
├── components/
│   └── AIPromptApp.tsx           # Main chat component
├── .env                          # Environment variables (create this)
├── .env.example                  # Example env file
└── README.md
```

## Quickstart Guide

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/carsonblee/chatty.git
cd chatty
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set up your environment

Create a .env file in the root directory:

```bash
cp .env.example .env
```

Then add your OpenAI API key:

```env
OPENAI_API_KEY=your-openai-api-key-here
MODEL=gpt-3.5-turbo
```

#### 4. Run the devlopment server locally

```bash
npm run dev
```

#### 5. Open your browser

Navigate to http://localhost:3000 on any browser to see your web app running locally

### Using the Chatbot

1. Type your prompt in the text area
2. Click the send button or press Enter
3. Wait for the AI response
4. View your conversation history below
5. Click "Clear History" to start fresh

## Additional Information

The following information is for those interested in further clarification on specific aspects of the project that some may deem complex.

### Environment Variables 

| Variable          | Description           | Required  | Default           |
| :---------------- | :-------------------- | :-------  | :---------------- |
| `OPENAI_API_KEY`  | Your OpenAI API key   | Yes       | -                 |
| `MODEL`           | OpenAI model to use   | No        | `gpt-3.5-turbo`   |

You will need to set up your own `OPENAI_API_KEY` which can be done on the [OpenAI API Keys Platform](https://platform.openai.com/api-keys) once logged in:

1. Create an OpenAI project using the projects dropdown in the top left corner of the browser
2. Click the button "Create new secret key" in the top right corner and set up that secret key
3. Once presented with the actual key, copy and paste it into the `.env` folder so that the line reads `OPENAI_API_KEY=YOUR_SECRET_KEY`
4. Save the `.env` file and run it again to process the changes

### Security Notes

⚠️ **Important:** This app keeps your API key secure by:

- Storing the API key only in server-side environment variables
- Never exposing the key to the browser
- Making all OpenAI API calls through a secure Next.js API route

Never commit your `.env` file to version control!

### Customization

#### Change the AI Model

Edit your .env file:

```env
MODEL=gpt-4
```

**Available models:** gpt-3.5-turbo, gpt-4, gpt-4-turbo-preview

#### Adjust Response Length

Edit [app/api/chat/route.ts](./app/api/chat/route.ts):

```typescript
typescriptmax_tokens: 500,  // Change this value
```

#### Customize Styling

The app uses Tailwind CSS. Edit [components/AIPromptApp.tsx](./components/AIPromptApp.tsx) to modify styles.

## Troubleshooting

### "API key not configured" error

- Make sure your `.env` file exists in the root directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart your dev server after changing `.env`

### OpenAI API errors

- Check your API key is valid
- Ensure you have credits in your OpenAI account
- Verify the model name is correct

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18.x or higher required)
