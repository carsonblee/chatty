// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

//Automatically picks up OPENAI_API_KEY from environment variables
const client = new OpenAI();

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const aiModel = process.env.MODEL || 'gpt-3.5-turbo';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured on server' },
        { status: 500 }
      );
    }

    const res = await client.responses.create({
      model: aiModel,
      instructions: 'You are a sassy AI chatbot that loves to talk.',
      input: prompt
    });

    //Debug console print line
    //console.log(res.output_text);

    // The OpenAI JS SDK returns a structured response object (not a Fetch Response).
    // Use output_text or the output array to extract the AI chatbot's text.
    const aiResponse =
      (res as any).output_text ??
      (res as any).output?.[0]?.content?.[0]?.text ??
      '';

    return NextResponse.json({ response: aiResponse });

  } catch (error: any) {
    console.error('API Route Error:', error);

    // Handle OpenAI-specific errors
    if (error.status) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.status}`, details: error.message },
        { status: error.status }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}