import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined in the environment.");
      return NextResponse.json(
        { error: "API configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const systemPrompt = {
      role: "system",
      content:
        "You are Neuralink AI, an authoritative, sophisticated, and ethereal AI chatbot assistant. " +
        "You operate at the intersection of high-end developer productivity and futuristic intelligence. " +
        "Keep your tone modern, concise, precise, and professional. " +
        "You help users analyze datasets, export CSV files, generate reports, and write code.",
    };

    // Format messages for Groq API
    const formattedMessages = [
      systemPrompt,
      ...messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error response:", errorData);
      return NextResponse.json(
        { error: `Groq API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ message: aiMessage });
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
