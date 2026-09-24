'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Materi() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const materiList = [
    {
      id: 1,
      title: '🌎 Apa itu Sustainable Cooling?',
      content: 'Pendinginan (cooling) seperti AC dan kulkas sangat penting. Namun, penggunaannya membutuhkan energi listrik besar. Sustainable cooling adalah upaya mendinginkan ruangan dengan cara yang ramah lingkungan dan hemat energi.'
    },
    {
      id: 2,
      title: '⚡ Cooling & Energy',
      content: 'Semakin rendah kamu mengatur suhu AC (misal 16°C), semakin keras kompresor bekerja. Ini menyedot lebih banyak listrik. Suhu ideal yang nyaman dan hemat adalah 24°C - 26°C.'
    },
    {
      id: 3,
      title: '🧪 Refrigeran & Ozon',
      content: 'Banyak AC menggunakan zat pendingin (refrigeran) jenis HFC. Jika bocor, gas ini bisa menjebak panas di atmosfer ribuan kali lebih kuat dari CO2, memperparah pemanasan global.'
    },
    {
      id: 4,
      title: '🌱 Apa yang Bisa Kamu Lakukan?',
      content: '1. Matikan AC saat kelas kosong.\n2. Pastikan pintu/jendela tertutup rapat saat AC menyala.\n3. Ingatkan teman jika suhu AC terlalu dingin (di bawah 22°C).'
    }
  ];

  return (
    <main className="min-h-screen bg-[#f7fafa] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
  href="/beranda"
  aria-label="Kembali ke Beranda"
  title="Kembali ke Beranda"
  className="group mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-[#dcebea] bg-white text-[#718589] shadow-[0_5px_18px_rgba(18,52,59,0.05)] transition-all duration-200 hover:-translate-x-1 hover:border-[#b8d9d5] hover:bg-[#eef7f5] hover:text-[#0b7a75] hover:shadow-[0_8px_22px_rgba(18,52,59,0.08)]"
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

        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-[20px] border border-[#dcebea] bg-white p-7 shadow-[0_10px_35px_rgba(18,52,59,0.05)] sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#eef7f5]" />
          <div className="pointer-events-none absolute -bottom-20 right-20 h-32 w-32 rounded-full bg-[#eef5fc]" />

          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eef5fc] text-lg">
                📚
              </span>

              <span className="text-[10px] font-bold tracking-[0.18em] text-[#2f80ed]">
                LEARNING MODULE
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-[-0.035em] text-[#12343b] sm:text-4xl">
              Materi Interaktif
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718589] sm:text-base">
              Pelajari konsep dasar sustainable cooling, energi, refrigeran,
              dan tindakan sederhana untuk membantu melindungi lingkungan.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-1.5 w-16 rounded-full bg-[#0b7a75]" />
              <div className="h-1.5 w-8 rounded-full bg-[#bde3df]" />
              <div className="h-1.5 w-4 rounded-full bg-[#dcebea]" />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#718589]">
              EXPLORE TOPICS
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#12343b]">
              Kenali konsepnya
            </h2>
          </div>

          <span className="hidden text-xs text-[#9aabad] sm:block">
            Klik kartu untuk membuka materi
          </span>
        </div>

        {/* Materials */}
        <div className="space-y-4">
          {materiList.map((materi, index) => {
            const isActive = activeCard === materi.id;

            return (
              <div
                key={materi.id}
                className={`overflow-hidden rounded-[16px] border bg-white transition-all duration-300 ${
                  isActive
                    ? 'border-[#b8d9d5] shadow-[0_12px_30px_rgba(18,52,59,0.07)]'
                    : 'border-[#e1eceb] shadow-[0_5px_18px_rgba(18,52,59,0.035)] hover:-translate-y-0.5 hover:border-[#c5deda] hover:shadow-[0_10px_25px_rgba(18,52,59,0.06)]'
                }`}
              >
                <button
                  onClick={() =>
                    setActiveCard(
                      activeCard === materi.id ? null : materi.id
                    )
                  }
                  className="group w-full text-left"
                >
                  <div className="flex items-center gap-4 p-5 sm:p-6">

                    {/* Number */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0b7a75] text-white'
                          : 'bg-[#eef7f5] text-[#0b7a75] group-hover:bg-[#e2f2ef]'
                      }`}
                    >
                      0{index + 1}
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[9px] font-bold tracking-[0.15em] text-[#718589]">
                        TOPIC 0{index + 1}
                      </p>

                      <h3
                        className={`text-[16px] font-bold transition-colors sm:text-[17px] ${
                          isActive
                            ? 'text-[#0b7a75]'
                            : 'text-[#12343b] group-hover:text-[#0b7a75]'
                        }`}
                      >
                        {materi.title}
                      </h3>
                    </div>

                    {/* Open Button */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'border-[#0b7a75] bg-[#0b7a75] text-white'
                          : 'border-[#dcebea] bg-[#f7fafa] text-[#718589] group-hover:border-[#b8d9d5] group-hover:text-[#0b7a75]'
                      }`}
                    >
                      <span className="text-lg leading-none">
                        {isActive ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Content */}
                {isActive && (
                  <div className="border-t border-[#edf2f1] bg-[#fbfdfd] px-5 pb-6 pt-5 sm:px-6">
                    <div className="flex gap-4">

                      <div className="hidden h-8 w-1 shrink-0 rounded-full bg-[#0b7a75] sm:block" />

                      <div className="flex-1">
                        <p className="whitespace-pre-line text-sm leading-7 text-[#52676b]">
                          {materi.content}
                        </p>

                        <div className="mt-5 flex items-center gap-2 border-t border-[#e8eeee] pt-4">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef7f5] text-xs text-[#0b7a75]">
                            ✓
                          </span>

                          <span className="text-xs font-semibold text-[#718589]">
                            Materi berhasil dibuka
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-10 rounded-[18px] border border-[#dcebea] bg-white p-5 shadow-[0_8px_25px_rgba(18,52,59,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-[#718589]">
                NEXT STEP
              </p>

              <h3 className="mt-1 text-lg font-bold text-[#12343b]">
                Sudah siap mengambil keputusan?
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#8a999b]">
                Terapkan pengetahuanmu pada skenario nyata.
              </p>
            </div>

            <Link
              href="/decision-lab"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-[11px] bg-[#0b7a75] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075e5a] hover:shadow-md"
            >
              Lanjut ke Decision Lab
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="py-7 text-center">
          <p className="text-[9px] font-medium tracking-[0.15em] text-[#a3b0b1]">
            ECO-MISSION AI · LEARN · DECIDE · ACT
          </p>
        </div>

      </div>
    </main>
  );
}