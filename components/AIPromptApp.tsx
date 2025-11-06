"use client";

import { useState } from 'react';
import { Send, Loader2, Trash2, MessageSquare } from 'lucide-react';
import type { KeyboardEvent } from 'react';

export default function AIPromptApp() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    {
      id: number;
      prompt: string;
      response: string;
      timestamp: string;
    }[]
  >([]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {    

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `API Error: ${res.status}`);
      }

      if (!data.response) {
        throw new Error('No response received from AI');
      }

    //const aiResponse = ''; // placeholder response; replace with real AI output
    setHistory([
      {
        id: Date.now(),
        prompt: prompt,
        response: data.response,
        timestamp: new Date().toLocaleString()
      },
      ...history
    ]);
    
    setPrompt('');
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to get response from AI';
        setError(errorMessage);
        console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Chatty AI</h1>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-6">Enter your prompt and get an AI-generated sassy response from Chatty</p>

          <div className="mb-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your prompt here..."
                className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                rows={4}
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">Error:</p>
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-red-500 mt-2">
                Make sure your .env file contains OPENAI_API_KEY with your API key.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="ml-3 text-gray-600">Generating response...</span>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <MessageSquare className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Conversation History</h2>
              <span className="text-sm text-gray-500">({history.length} {history.length === 1 ? 'conversation' : 'conversations'})</span>
            </div>
            
            {history.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-xs text-gray-500 mb-3">{item.timestamp}</div>
                
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">YOU</div>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap pl-2 border-l-2 border-indigo-200">{item.prompt}</p>
                </div>
                
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Chatty AI</div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap pl-2 border-l-2 border-green-200">{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}