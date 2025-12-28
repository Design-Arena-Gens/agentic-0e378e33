import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Knowledge base for the Q&A agent
const knowledgeBase: Record<string, string> = {
  'what is your name': 'I am a Q&A Agent, an AI assistant designed to answer your questions.',
  'who are you': 'I am a Q&A Agent, an AI assistant designed to answer your questions.',
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! What can I do for you?',
  'hey': 'Hey! What would you like to know?',
  'how are you': 'I\'m doing great, thank you for asking! How can I assist you?',
  'what can you do': 'I can answer questions on a variety of topics including technology, science, history, and general knowledge. Just ask me anything!',
  'what is ai': 'AI (Artificial Intelligence) refers to computer systems designed to perform tasks that typically require human intelligence, such as learning, problem-solving, and decision-making.',
  'what is machine learning': 'Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
  'what is javascript': 'JavaScript is a high-level, interpreted programming language primarily used for creating interactive web pages and web applications.',
  'what is python': 'Python is a high-level, interpreted programming language known for its simplicity and readability, widely used in web development, data science, and AI.',
  'what is react': 'React is a JavaScript library for building user interfaces, developed by Facebook. It uses a component-based architecture.',
  'what is next.js': 'Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes for building modern web applications.',
  'what is the meaning of life': 'That\'s a profound philosophical question! Many people find meaning through relationships, personal growth, helping others, or pursuing their passions.',
  'tell me a joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 😄',
  'thank you': 'You\'re welcome! Feel free to ask me anything else.',
  'thanks': 'You\'re welcome! Happy to help!',
  'bye': 'Goodbye! Have a great day!',
  'goodbye': 'Farewell! Come back if you have more questions.',
}

function findBestMatch(query: string): string {
  const lowerQuery = query.toLowerCase().trim()

  // Exact match
  if (knowledgeBase[lowerQuery]) {
    return knowledgeBase[lowerQuery]
  }

  // Partial match
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      return value
    }
  }

  // No match - provide intelligent default response
  return generateSmartResponse(query)
}

function generateSmartResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes('how') && lowerQuery.includes('work')) {
    return 'That\'s a great question about how things work! While I don\'t have specific details on that topic in my knowledge base, I can tell you that understanding how systems work often involves breaking them down into their component parts and studying their interactions.'
  }

  if (lowerQuery.includes('why')) {
    return 'That\'s an interesting "why" question! Understanding the reasons behind things often requires looking at multiple factors including history, science, and context. Could you rephrase your question or ask about a specific aspect?'
  }

  if (lowerQuery.includes('when')) {
    return 'For specific dates and timing questions, I recommend checking authoritative sources for the most accurate and up-to-date information.'
  }

  if (lowerQuery.includes('where')) {
    return 'For location-based questions, I suggest using mapping services or location-specific resources for the most accurate information.'
  }

  if (lowerQuery.includes('help')) {
    return 'I\'m here to help! You can ask me about technology, programming, general knowledge, or just chat. Try asking questions like "What is AI?", "Tell me a joke", or "What can you do?"'
  }

  return 'That\'s an interesting question! While I don\'t have specific information about that in my knowledge base, I\'m designed to answer questions about technology, programming, and general topics. Try asking me about AI, programming languages, or just say hello!'
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    // Generate response
    const response = findBestMatch(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
