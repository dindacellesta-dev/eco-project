'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function DecisionLab() {
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'warning';
    feedback: string;
    points?: number;
  } | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scenarioText =
    'Jam 12.30. Cuaca di luar sangat panas. Ruang kelas kosong karena semua siswa sedang istirahat di kantin. Kamu kembali ke kelas sebentar untuk mengambil buku dan melihat AC masih menyala pada suhu 18°C.';

  const handleDecision = async (choiceText: string, optKey: string) => {
    setSelectedChoice(optKey);
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionType: 'decision',
          payload: {
            scenario: scenarioText,
            choice: choiceText,
          },
        }),
      });

      const data = await res.json();
      setFeedback(data);

      // --- SISTEM PENYIMPANAN XP REAL-TIME ---
      if (data.points && data.points > 0) {
        const savedUser = localStorage.getItem('ecoUser');

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const newXp = userData.xp + data.points;

          // 1. Update ke Supabase
          await supabase
            .from('students')
            .update({ xp: newXp })
            .eq('login_code', userData.kode);

          // 2. Update sesi di browser
          userData.xp = newXp;
          localStorage.setItem('ecoUser', JSON.stringify(userData));
        }
      }
    } catch (err) {
      setFeedback({
        type: 'warning',
        feedback: 'Gagal terhubung ke Eco Coach. Coba lagi.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const options = [
    {
      key: 'A',
      text: 'Membiarkan AC menyala agar kelas tetap dingin saat masuk nanti.',
    },
    {
      key: 'B',
      text: 'Mematikan AC sementara karena ruangan sedang kosong.',
    },
    {
      key: 'C',
      text: 'Menurunkan suhu menjadi 16°C agar lebih cepat dingin nanti.',
    },
  ];

  return (
    <>
      {/* =====================================================
      TOP BAR
      ===================================================== */}
      <div className="border-b border-[#e1eceb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
  href="/beranda"
  aria-label="Kembali ke Beranda"
  title="Kembali ke Beranda"
  className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#dcebea] bg-white text-[#718589] shadow-[0_5px_18px_rgba(18,52,59,0.05)] transition-all duration-200 hover:-translate-x-1 hover:border-[#b8d9d5] hover:bg-[#eef7f5] hover:text-[#0b7a75] hover:shadow-[0_8px_22px_rgba(18,52,59,0.08)]"
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
      </div>

      {/* =====================================================
          HEADER
          ===================================================== */}
      <section className="border-b border-[#e1eceb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#eef7f5] text-xs font-bold text-[#0b7a75]">
                  02
                </span>

                <span className="text-[10px] font-bold tracking-[0.18em] text-[#0b7a75]">
                  DECISION LAB
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.035em] text-[#12343b] sm:text-4xl">
                Make the decision.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#718589]">
                Hadapi situasi nyata dan pilih tindakan berdasarkan
                informasi yang sudah kamu pelajari.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-[13px] border border-[#dcebea] bg-[#f7fafa] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#0b7a75] text-[10px] font-bold text-white">
                AI
              </div>

              <div>
                <p className="text-[9px] font-bold tracking-[0.12em] text-[#718589]">
                  ANALYSIS ENGINE
                </p>
                <p className="text-xs font-bold text-[#12343b]">
                  ZUNO Eco Coach
                </p>
              </div>

              <span className="ml-2 h-2 w-2 rounded-full bg-[#27ae60]" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Scenario */}
          <div className="rounded-[18px] border border-[#dcebea] bg-white shadow-[0_8px_28px_rgba(18,52,59,0.04)]">
            <div className="border-b border-[#edf2f1] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.18em] text-[#718589]">
                    SCENARIO
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[#12343b]">
                    Ruang Kelas Kosong
                  </h2>
                </div>

                <span className="rounded-full bg-[#eef7f5] px-3 py-1.5 text-[9px] font-bold tracking-[0.1em] text-[#0b7a75]">
                  CASE 01
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Scenario visual */}
              <div className="relative mb-6 overflow-hidden rounded-[14px] border border-[#e1eceb] bg-[#f7fafa] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-[#eef5fc] text-xl font-bold text-[#2f80ed]">
                    18°
                  </div>

                  <div>
                    <p className="text-[9px] font-bold tracking-[0.14em] text-[#718589]">
                      AIR CONDITIONER
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#12343b]">
                      AC masih menyala
                    </p>

                    <p className="mt-1 text-xs text-[#8a999b]">
                      Ruangan sedang tidak digunakan
                    </p>
                  </div>
                </div>

                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#2f80ed] opacity-50" />
                <div className="absolute bottom-4 right-10 h-1.5 w-1.5 rounded-full bg-[#16a085] opacity-50" />
              </div>

              <p className="text-sm leading-7 text-[#52676b]">
                {scenarioText}
              </p>

              <div className="mt-6 border-t border-[#edf2f1] pt-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#12343b] text-xs font-bold text-white">
                    ?
                  </span>

                  <div>
                    <p className="text-[9px] font-bold tracking-[0.14em] text-[#718589]">
                      YOUR TASK
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#12343b]">
                      Apa yang kamu lakukan?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choices */}
          <div className="rounded-[18px] border border-[#dcebea] bg-white p-6 shadow-[0_8px_28px_rgba(18,52,59,0.04)] sm:p-7">
            <div className="mb-6">
              <p className="text-[9px] font-bold tracking-[0.18em] text-[#718589]">
                YOUR DECISION
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-[#12343b]">
                Choose an action
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#8a999b]">
                Pilihanmu akan dianalisis oleh ZUNO berdasarkan skenario
                yang diberikan.
              </p>
            </div>

            <div className="space-y-3">
              {options.map((opt) => {
                const isSelected = selectedChoice === opt.key;
                const isOtherSelected =
                  selectedChoice !== null && !isSelected;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleDecision(opt.text, opt.key)}
                    disabled={selectedChoice !== null}
                    className={`group w-full rounded-[13px] border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#0b7a75] bg-[#eef7f5] shadow-[0_5px_18px_rgba(11,122,117,0.08)]'
                        : isOtherSelected
                          ? 'cursor-not-allowed border-[#edf2f1] bg-[#fbfdfd] opacity-45'
                          : 'border-[#e1eceb] bg-white hover:-translate-y-0.5 hover:border-[#b8d9d5] hover:bg-[#fbfdfd] hover:shadow-[0_7px_20px_rgba(18,52,59,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-4 p-4 sm:p-5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-xs font-extrabold transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#0b7a75] text-white'
                            : 'bg-[#f1f5f5] text-[#718589] group-hover:bg-[#eef7f5] group-hover:text-[#0b7a75]'
                        }`}
                      >
                        {isSelected ? '✓' : opt.key}
                      </div>

                      <p
                        className={`text-sm leading-6 ${
                          isSelected
                            ? 'font-semibold text-[#075e5a]'
                            : 'font-medium text-[#52676b]'
                        }`}
                      >
                        {opt.text}
                      </p>

                      {!isOtherSelected && !isSelected && (
                        <span className="ml-auto shrink-0 text-[#b5c2c3] transition-transform group-hover:translate-x-1 group-hover:text-[#0b7a75]">
                          →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Analyzing */}
            {isAnalyzing && (
              <div className="mt-6 rounded-[14px] border border-[#dcebea] bg-[#f7fafa] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b7a75]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#12343b]">
                      ZUNO sedang menganalisis...
                    </p>

                    <p className="mt-1 text-xs text-[#718589]">
                      Mengevaluasi keputusan berdasarkan skenario.
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#dcebea]">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-[#0b7a75]" />
                </div>
              </div>
            )}

            {/* Feedback */}
            {feedback && !isAnalyzing && (
              <div
                className={`mt-6 overflow-hidden rounded-[15px] border ${
                  feedback.type === 'success'
                    ? 'border-[#cce8dc] bg-[#f2faf6]'
                    : feedback.type === 'error'
                      ? 'border-[#f0d3d3] bg-[#fff7f7]'
                      : 'border-[#f0dfb8] bg-[#fffaf0]'
                }`}
              >
                <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-[9px] text-[10px] font-bold text-white ${
                      feedback.type === 'success'
                        ? 'bg-[#27ae60]'
                        : feedback.type === 'error'
                          ? 'bg-[#e85d5d]'
                          : 'bg-[#f2b84b]'
                    }`}
                  >
                    AI
                  </div>

                  <div>
                    <p className="text-[9px] font-bold tracking-[0.14em] text-[#718589]">
                      ZUNO FEEDBACK
                    </p>

                    <p className="text-sm font-bold text-[#12343b]">
                      Decision analysis complete
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-7 text-[#52676b]">
                    {feedback.feedback}
                  </p>

                  {feedback.points !== undefined && (
                    <div className="mt-5 flex items-center justify-between gap-4 rounded-[11px] border border-[#cce8dc] bg-white px-4 py-3">
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.12em] text-[#718589]">
                          ECO POINTS
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-[#0b7a75]">
                          Berhasil disimpan
                        </p>
                      </div>

                      <span className="text-lg font-extrabold text-[#27ae60]">
                        +{feedback.points}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Helper */}
            {!feedback && !isAnalyzing && selectedChoice === null && (
              <div className="mt-6 flex items-center gap-3 rounded-[11px] bg-[#f7fafa] px-4 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0b7a75] shadow-sm">
                  i
                </span>

                <p className="text-[10px] leading-5 text-[#8a999b]">
                  Tidak ada jawaban yang langsung ditampilkan sebagai
                  benar atau salah. ZUNO akan memberikan analisis setelah
                  kamu memilih.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 text-center">
          <p className="text-[9px] font-medium tracking-[0.14em] text-[#a3b0b1]">
            ECO-MISSION AI · DECISION LAB · CASE 01
          </p>
        </div>
      </section>
    </>
  );
}