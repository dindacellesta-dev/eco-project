'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // Import Supabase

export default function Mission() {
  const [laporan, setLaporan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReview, setAiReview] = useState<{feedback: string, points: number} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/ai-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType: 'mission', payload: { report: laporan } })
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
      alert("Gagal mengirim ke AI.");
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

        {/* Main Mission Card */}
        <div className="overflow-hidden rounded-[24px] border border-[#dfeceb] bg-white shadow-[0_18px_55px_rgba(18,52,59,0.07)]">

          {/* Mission Header */}
          <div className="relative overflow-hidden border-b border-[#e5eeee] bg-white px-6 py-7 md:px-9 md:py-8">

            <div className="absolute right-[-25px] top-[-35px] h-36 w-36 rounded-full bg-[#eef7f5] opacity-70"></div>
            <div className="absolute right-10 top-7 h-10 w-10 rounded-full border border-[#dcebea]"></div>

            <div className="relative z-10 flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">

                {/* Mission Icon */}
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[16px] bg-[#eef7f5] text-[#0b7a75] ring-1 ring-[#d6ebe7]">
                  <svg
                    width="25"
                    height="25"
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
                    <circle
                      cx="12"
                      cy="12"
                      r="8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[#0b7a75]">
                      ACTION MISSION
                    </p>

                    <span className="rounded-full bg-[#f1f5f5] px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] text-[#718589]">
                      MISSION 01
                    </span>
                  </div>

                  <h1 className="mt-1.5 text-[25px] font-bold tracking-[-0.035em] text-[#12343b] md:text-[30px]">
                    Cooling Detective
                  </h1>

                  <p className="mt-1 text-xs leading-relaxed text-[#718589] md:text-sm">
                    Temukan masalah pendinginan di sekitarmu dan dokumentasikan solusi yang masuk akal.
                  </p>
                </div>
              </div>

              {/* Mission Number */}
              <div className="hidden flex-shrink-0 text-right sm:block">
                <p className="text-[9px] font-bold tracking-[0.12em] text-[#9aabad]">
                  FIELD TASK
                </p>
                <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#d7e6e4]">
                  01
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-6 md:px-9 md:py-8">

            {/* Mission Brief */}
            <div className="mb-7">

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#f1f6f5] text-[#0b7a75]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 4.5C5 3.67 5.67 3 6.5 3H19V19H6.5C5.67 19 5 19.67 5 20.5C5 21.33 5.67 22 6.5 22H19"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 20.5V4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] text-[#718589]">
                    MISSION BRIEF
                  </p>
                  <p className="text-xs text-[#9aabad]">
                    Your task
                  </p>
                </div>
              </div>

              <div className="rounded-[18px] border border-[#dfeceb] bg-[#f8fbfb] p-5 md:p-6">

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="rounded-[14px] border border-[#e1eceb] bg-white p-4">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#eef7f5] text-[#0b7a75]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 5H20M4 12H20M4 19H20"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.1em] text-[#718589]">
                      TASK 01
                    </p>

                    <p className="mt-1.5 text-sm font-semibold leading-[1.65] text-[#183236]">
                      Temukan kebiasaan pendingin yang boros energi.
                    </p>
                  </div>

                  <div className="rounded-[14px] border border-[#e1eceb] bg-white p-4">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#eef5fc] text-[#2f80ed]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L9 16L19 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.1em] text-[#718589]">
                      TASK 02
                    </p>

                    <p className="mt-1.5 text-sm font-semibold leading-[1.65] text-[#183236]">
                      Jelaskan solusi perbaikannya.
                    </p>
                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-[#e1eceb] pt-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b7a75]"></span>
                  <p className="text-[10px] font-medium text-[#718589]">
                    Amati lingkungan sekitar dan pikirkan solusi yang realistis.
                  </p>
                </div>
              </div>
            </div>

            {aiReview ? (

              /* AI REVIEW */
              <div className="overflow-hidden rounded-[20px] border border-[#b9ded9] bg-[#f7fcfb]">

                {/* Review Header */}
                <div className="flex items-center gap-4 border-b border-[#dcebea] bg-white px-5 py-5 md:px-7">

                  <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-[#d7ebe8] bg-[#eef7f5] shadow-sm">
                    <img
                      src="/zuno.png"
                      alt="Zuno"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#12343b]">
                        ZUNO
                      </p>

                      <span className="rounded-full bg-[#eef5fc] px-2 py-0.5 text-[8px] font-bold tracking-[0.08em] text-[#2f80ed]">
                        AI REVIEW
                      </span>
                    </div>

                    <p className="mt-0.5 text-[10px] text-[#718589]">
                      Mission report analyzed
                    </p>
                  </div>

                  <div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#eef7f5] text-[#27ae60]">
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

                {/* Review Content */}
                <div className="p-5 md:p-7">

                  <div className="rounded-[15px] border border-[#dcebea] bg-white p-5 shadow-[0_4px_16px_rgba(18,52,59,0.04)]">

                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0b7a75]"></span>
                      <p className="text-[10px] font-bold tracking-[0.1em] text-[#0b7a75]">
                      ZUNO&apos;S NOTES
                      </p>
                    </div>

                    <p className="text-sm leading-[1.8] text-[#40575b]">
                      {aiReview.feedback}
                    </p>
                  </div>

                  {/* XP Reward */}
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
                        MISSION REWARD
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

              /* REPORT FORM */
              <form
                onSubmit={handleSubmit}
                className="rounded-[20px] border border-[#e1eceb] bg-white p-5 shadow-[0_5px_20px_rgba(18,52,59,0.04)] md:p-6"
              >

                <div className="mb-5">
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eef7f5] text-[#0b7a75]">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 5.5C4 4.67 4.67 4 5.5 4H20V18H5.5C4.67 18 4 18.67 4 19.5C4 20.33 4.67 21 5.5 21H20"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 19.5V5.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#183236]">
                        Laporan Temuan & Solusi
                      </label>

                      <p className="mt-0.5 text-xs text-[#718589]">
                        Ceritakan apa yang kamu temukan dan bagaimana solusinya.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">

                  <textarea
                    className="min-h-[155px] w-full resize-none rounded-[15px] border border-[#dce8e7] bg-[#f9fbfb] p-4 text-sm leading-[1.75] text-[#183236] outline-none transition-all duration-200 placeholder:text-[#9aabad] focus:border-[#8fc8c1] focus:bg-white focus:ring-4 focus:ring-[#0b7a75]/10 disabled:bg-[#f2f5f5]"
                    rows={4}
                    value={laporan}
                    onChange={(e) => setLaporan(e.target.value)}
                    placeholder="Contoh: Saya menemukan AC kelas tetap menyala saat ruangan kosong. Solusinya adalah mematikan AC ketika tidak digunakan..."
                    required
                    disabled={isSubmitting}
                  ></textarea>

                  <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-[#9aabad] shadow-sm">
                    {laporan.length} karakter
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      laporan.length >= 10
                        ? 'bg-[#27ae60]'
                        : 'bg-[#f2b84b]'
                    }`}></span>

                    <p className="text-[10px] leading-relaxed text-[#9aabad]">
                      {laporan.length >= 10
                        ? 'Laporan siap dikirim.'
                        : 'Minimal 10 karakter untuk mengirim.'}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || laporan.length < 10}
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
            <div className="flex flex-col items-center justify-center gap-1.5 text-center">
              <p className="text-[9px] font-bold tracking-[0.12em] text-[#718589]">
                OBSERVE • REPORT • IMPROVE
              </p>

              <p className="text-[9px] font-medium text-[#a0aeae]">
                Setiap tindakan kecil membantu membangun kebiasaan yang lebih berkelanjutan.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}