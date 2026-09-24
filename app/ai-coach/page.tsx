'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // Path disesuaikan (naik 1 folder ke lib)

export default function ReflectionRoom() {
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReview, setAiReview] = useState<{feedback: string, points: number} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/ai-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType: 'reflection', payload: { text: reflection } })
      });
      const data = await res.json();
      setAiReview(data);

      // --- SISTEM PENYIMPANAN XP REAL-TIME ---
      if (data.points && data.points > 0) {
        const savedUser = localStorage.getItem('ecoUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const newXp = userData.xp + data.points;
          
          await supabase.from('students').update({ xp: newXp }).eq('login_code', userData.kode);
          
          userData.xp = newXp;
          localStorage.setItem('ecoUser', JSON.stringify(userData));
        }
      }
    } catch (error) {
      alert("Gagal mengirim ke ZUNO.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f7fafa] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1000px]">

        {/* Back Button */}
        <Link
          href="/beranda"
          aria-label="Kembali ke Beranda"
          title="Kembali ke Beranda"
          className="group mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-[#dcebea] bg-white text-[#718589] shadow-[0_5px_18px_rgba(18,52,59,0.05)] transition-all duration-200 hover:-translate-x-1 hover:border-[#b8d9d5] hover:bg-[#eef7f5] hover:text-[#0b7a75] hover:shadow-[0_8px_22px_rgba(18,52,59,0.08)]"
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

        {/* Main Card */}
        <div className="overflow-hidden rounded-[24px] border border-[#dfeceb] bg-white shadow-[0_18px_55px_rgba(18,52,59,0.07)]">

          {/* Header */}
          <div className="border-b border-[#e5eeee] px-6 py-7 md:px-9 md:py-8">
            <div className="flex items-start gap-4">

              {/* Zuno Avatar */}
              <div className="relative flex-shrink-0">
                <div className="h-14 w-14 overflow-hidden rounded-full border-[3px] border-white bg-[#eef7f5] shadow-[0_5px_18px_rgba(11,122,117,0.14)] ring-1 ring-[#d7ebe8]">
                  <img
                    src="/zuno.png"
                    alt="Zuno"
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#27ae60]"></span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#12343b] md:text-[28px]">
                    Ruang Refleksi
                  </h1>
                  <span className="rounded-full bg-[#eef5fc] px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] text-[#2f80ed]">
                    AI COACH
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-[#718589]">
                  Tempat untuk mengubah pengalaman belajar menjadi tindakan nyata.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-6 md:px-9 md:py-8">

            {/* Section Label */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#eef7f5] text-[#0b7a75]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3V21M3 12H21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#0b7a75]">
                  FINAL REFLECTION
                </p>
                <p className="text-xs text-[#718589]">
                  Your action starts with a thought.
                </p>
              </div>
            </div>

            {/* Question */}
            <div className="relative mb-7 overflow-hidden rounded-[18px] border border-[#dcebea] bg-[#f8fbfb] p-6 md:p-7">

              <div className="absolute right-5 top-4 text-[54px] font-serif leading-none text-[#dcefeb]">
                “
              </div>

              <p className="relative z-10 max-w-[760px] text-[18px] font-semibold leading-[1.65] tracking-[-0.015em] text-[#183236] md:text-[21px]">
                Setelah memainkan ECO-MISSION, apa satu perubahan tindakan yang paling mungkin kamu lakukan?
              </p>
            </div>

            {aiReview ? (

              /* AI REVIEW */
              <div className="overflow-hidden rounded-[20px] border border-[#b9ded9] bg-[#f7fcfb]">

                <div className="flex items-center gap-4 border-b border-[#dcebea] bg-white px-5 py-5 md:px-7">
                  <div className="h-11 w-11 overflow-hidden rounded-full border border-[#d7ebe8] bg-[#eef7f5] shadow-sm">
                    <img
                      src="/zuno.png"
                      alt="Zuno"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#12343b]">
                      Zuno sudah membaca refleksimu
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#718589]">
                      Feedback personal dari AI Coach
                    </p>
                  </div>

                  <div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#eef7f5] text-[#0b7a75]">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-5 md:p-7">

                  <div className="rounded-[15px] border border-[#dcebea] bg-white p-5 shadow-[0_4px_16px_rgba(18,52,59,0.04)]">
                    <p className="mb-2 text-[10px] font-bold tracking-[0.1em] text-[#0b7a75]">
                      ZUNO SAYS
                    </p>

                    <p className="text-sm leading-[1.8] text-[#40575b]">
                      {aiReview.feedback}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 rounded-[15px] border border-[#cfe6e1] bg-[#eef7f5] p-4 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0b7a75] text-white">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L14.7 8.3L21 11L14.7 13.7L12 20L9.3 13.7L3 11L9.3 8.3L12 2Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold tracking-[0.08em] text-[#718589]">
                        ECO POINTS EARNED
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-[#0b7a75]">
                        +{aiReview.points} XP
                      </p>
                    </div>

                    <span className="sm:ml-auto text-xs font-semibold text-[#52736f]">
                      Berhasil ditambahkan
                    </span>
                  </div>

                </div>
              </div>

            ) : (

              /* REFLECTION FORM */
              <form
                onSubmit={handleSubmit}
                className="rounded-[20px] border border-[#e1eceb] bg-white p-5 shadow-[0_5px_20px_rgba(18,52,59,0.04)] md:p-6"
              >
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#183236]">
                    Tulis pemikiranmu
                  </label>

                  <p className="mt-1 text-xs leading-relaxed text-[#718589]">
                    Tidak perlu panjang. Fokus pada satu tindakan nyata yang ingin kamu lakukan.
                  </p>
                </div>

                <div className="relative">
                  <textarea
                    className="min-h-[150px] w-full resize-none rounded-[15px] border border-[#dce8e7] bg-[#f9fbfb] p-4 text-sm leading-[1.7] text-[#183236] outline-none transition-all duration-200 placeholder:text-[#9aabad] focus:border-[#8fc8c1] focus:bg-white focus:ring-4 focus:ring-[#0b7a75]/10 disabled:bg-[#f2f5f5]"
                    rows={5}
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Contoh: Saya akan mulai mematikan AC setiap kali ruangan kelas sedang kosong..."
                    required
                    disabled={isSubmitting}
                  />

                  <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-[#9aabad] shadow-sm">
                    {reflection.length} karakter
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <p className="text-[10px] leading-relaxed text-[#9aabad]">
                    Minimal 15 karakter untuk mengirim refleksi.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting || reflection.length < 15}
                    className="group flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#0b7a75] px-6 py-3.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(11,122,117,0.16)] transition-all duration-200 hover:bg-[#075e5a] hover:shadow-[0_7px_20px_rgba(11,122,117,0.2)] disabled:cursor-not-allowed disabled:opacity-40 sm:ml-auto sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        Zuno sedang membaca...
                      </>
                    ) : (
                      <>
                        Kirim ke Zuno
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          <path
                            d="M5 12H19M13 6L19 12L13 18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Footer */}
          <div className="border-t border-[#e5eeee] bg-[#fbfdfd] px-6 py-4 md:px-9">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b7a75]"></span>
              <p className="text-[9px] font-medium tracking-[0.05em] text-[#9aabad]">
                REFLECTION • ACTION • IMPACT
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}