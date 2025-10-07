import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Message too long. Please keep it under 1000 characters." }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY environment variable is not set")
      return NextResponse.json({ error: "AI service temporarily unavailable" }, { status: 503 })
    }

    const systemPrompt = `You are a compassionate AI counselling assistant for students. Your role is to:

1. Provide emotional support and active listening
2. Offer practical coping strategies and techniques
3. Help students process their thoughts and feelings
4. Suggest healthy ways to manage stress, anxiety, and other challenges
5. Encourage seeking professional help when appropriate
6. Maintain a warm, non-judgmental, and supportive tone

Guidelines:
- Always be empathetic and understanding
- Ask follow-up questions to better understand their situation
- Provide practical, actionable advice
- Recognize when issues may require professional intervention
- Keep responses concise but meaningful
- Focus on the student's wellbeing and mental health

Remember: You are not a replacement for professional therapy, but a supportive companion in their mental health journey.`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: message.trim(),
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)

    if (error instanceof Error) {
      if (error.message.includes("decommissioned")) {
        return NextResponse.json(
          { error: "AI model temporarily unavailable. Please try again later." },
          { status: 503 },
        )
      }
      if (error.message.includes("API key")) {
        return NextResponse.json({ error: "AI service configuration error" }, { status: 503 })
      }
    }

    return NextResponse.json({ error: "Failed to generate response. Please try again." }, { status: 500 })
  }
}
