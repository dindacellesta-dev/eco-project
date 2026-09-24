'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ZunoChatbot() {
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ZUNO menyapa pertama kali
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { sender: 'ai', text: "Hey! Zuno di sini, apa yang bisa kubantu? Kamu mau bahas materi kartu yang mana nih? 🌍✨" }
      ]);
    }
  }, [messages.length]);

  // Otomatis scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setIsTyping(true);

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Koneksi terputus. Coba kirim ulang pesanmu.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f7fafa] px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto flex h-[calc(100vh-100px)] max-w-[1100px] flex-col overflow-hidden rounded-[24px] border border-[#dfeceb] bg-white shadow-[0_18px_60px_rgba(18,52,59,0.08)]">

        {/* Header ZUNO */}
        <div className="relative flex items-center justify-between border-b border-[#e5eeee] bg-white px-5 py-4 md:px-7">
          <div className="flex items-center gap-4">

            {/* FOTO PROFIL ZUNO */}
            <div className="relative">
              <div className="h-[52px] w-[52px] overflow-hidden rounded-full border-[3px] border-white bg-[#e8f5f3] shadow-[0_4px_16px_rgba(11,122,117,0.16)] ring-1 ring-[#d7ebe8]">
                <img
                  src="/zuno.png"
                  alt="Zuno"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#27ae60]"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[18px] font-bold tracking-[-0.02em] text-[#12343b]">
                  ZUNO
                </h1>
                <span className="rounded-full bg-[#eef7f5] px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] text-[#0b7a75]">
                  AI
                </span>
              </div>

              <p className="mt-0.5 text-xs font-medium text-[#718589]">
                Eco-Mission Learning Assistant
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#27ae60]"></span>
                <span className="text-[10px] font-medium text-[#718589]">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Tombol keluar */}
          <Link
            href="/beranda"
            aria-label="Kembali ke Beranda"
            title="Kembali ke Beranda"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#dcebea] bg-[#f8fbfb] text-[#718589] transition-all duration-200 hover:-translate-x-1 hover:border-[#b8d9d5] hover:bg-[#eef7f5] hover:text-[#0b7a75]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M19 12H5M11 6L5 12L11 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto bg-[#fbfdfd] px-4 py-6 md:px-10 md:py-8">
          <div className="mx-auto flex max-w-[820px] flex-col gap-5">

            {/* Intro kecil */}
            <div className="mb-2 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-[#e1eceb] bg-white px-3 py-1.5 shadow-[0_3px_12px_rgba(18,52,59,0.035)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0b7a75]"></span>
                <span className="text-[10px] font-semibold tracking-[0.08em] text-[#718589]">
                  ZUNO LEARNING SPACE
                </span>
              </div>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >

                {/* Avatar Zuno pada pesan AI */}
                {msg.sender === 'ai' && (
                  <div className="mb-1 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-[#d7ebe8] bg-[#eef7f5] shadow-sm">
                    <img
                      src="/zuno.png"
                      alt="Zuno"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[78%] md:max-w-[68%] ${
                    msg.sender === 'user'
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  <div
                    className={`px-4 py-3.5 text-sm leading-[1.7] md:px-5 md:py-4 md:text-[14px] ${
                      msg.sender === 'user'
                        ? 'rounded-[18px] rounded-br-[5px] bg-[#0b7a75] text-white shadow-[0_5px_18px_rgba(11,122,117,0.14)]'
                        : 'rounded-[18px] rounded-bl-[5px] border border-[#e1eceb] bg-white text-[#183236] shadow-[0_4px_16px_rgba(18,52,59,0.045)]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <p
                    className={`mt-1.5 px-1 text-[9px] font-medium text-[#9aa9aa] ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.sender === 'user' ? 'You' : 'Zuno'}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-3">
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-[#d7ebe8] bg-[#eef7f5] shadow-sm">
                  <img
                    src="/zuno.png"
                    alt="Zuno"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="rounded-[18px] rounded-bl-[5px] border border-[#e1eceb] bg-white px-5 py-4 shadow-[0_4px_16px_rgba(18,52,59,0.045)]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0b7a75]"></span>
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0b7a75]"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0b7a75]"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#e5eeee] bg-white px-4 py-4 md:px-7 md:py-5">
          <form
            onSubmit={handleSend}
            className="mx-auto flex max-w-[820px] items-center gap-2 rounded-[17px] border border-[#dce9e8] bg-[#f8fbfb] p-1.5 shadow-[0_5px_20px_rgba(18,52,59,0.045)] transition-all duration-200 focus-within:border-[#a9d3ce] focus-within:bg-white focus-within:shadow-[0_7px_24px_rgba(11,122,117,0.08)]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya Zuno atau minta soal kuis..."
              disabled={isTyping}
              className="min-w-0 flex-grow border-0 bg-transparent px-3 py-3 text-sm text-[#183236] outline-none placeholder:text-[#9aabad] focus:border-0 focus:ring-0"
            />

            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Kirim pesan"
              title="Kirim pesan"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[13px] bg-[#0b7a75] text-white shadow-[0_4px_12px_rgba(11,122,117,0.18)] transition-all duration-200 hover:bg-[#075e5a] hover:shadow-[0_6px_16px_rgba(11,122,117,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <p className="mt-2.5 text-center text-[9px] font-medium tracking-[0.03em] text-[#a0aeae]">
            Zuno membantu kamu memahami materi, bukan menggantikan proses berpikir.
          </p>
        </div>

      </div>
    </div>
  );
}