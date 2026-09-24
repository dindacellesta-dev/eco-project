'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Beranda() {
  const [userName, setUserName] = useState('Siswa');

  useEffect(() => {
    const savedUser = localStorage.getItem('ecoUser');
    if (savedUser) {
      setUserName(JSON.parse(savedUser).nama);
    }
  }, []);

  const menus = [
    {
      id: 1,
      title: 'Materi Interaktif',
      desc: 'Pelajari konsep Sustainable Cooling.',
      icon: '◈',
      link: '/materi',
      label: 'LEARN',
      accent: '#2f80ed',
      soft: '#eef5fc',
    },
    {
      id: 2,
      title: 'Decision Lab',
      desc: 'Simulasikan keputusan nyata.',
      icon: '◇',
      link: '/decision-lab',
      label: 'SIMULATE',
      accent: '#0b7a75',
      soft: '#eef7f5',
    },
    {
      id: 3,
      title: 'Ruang Refleksi AI',
      desc: 'Diskusikan keputusanmu dengan Eco Coach.',
      icon: '✦',
      link: '/ai-coach',
      label: 'REFLECT',
      accent: '#2f80ed',
      soft: '#eef5fc',
    },
    {
      id: 4,
      title: 'ZUNO',
      desc: 'Ngobrol bareng ZUNO untuk luaskan pengetahuanmu.',
      icon: '◎',
      link: '/quiz',
      label: 'EXPLORE',
      accent: '#16a085',
      soft: '#eef7f5',
    },
    {
      id: 5,
      title: 'Action Mission',
      desc: 'Terapkan misi aksi di dunia nyata.',
      icon: '↗',
      link: '/mission',
      label: 'TAKE ACTION',
      accent: '#16a085',
      soft: '#eef7f5',
    },
    {
      id: 6,
      title: 'My Progress',
      desc: 'Cek pencapaian dan badge.',
      icon: '▥',
      link: '/progress',
      label: 'TRACK',
      accent: '#12343b',
      soft: '#f1f5f5',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7fafa]">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden border-b border-[#e1eceb] bg-white">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#eef7f5]" />
        <div className="pointer-events-none absolute -bottom-40 right-32 h-72 w-72 rounded-full bg-[#eef5fc]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">

            {/* Hero Text */}
            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dcebea] bg-[#f7fafa] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a085]" />
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#0b7a75]">
                  ECO-MISSION AI
                </span>
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-[#12343b] sm:text-5xl lg:text-6xl">
                Understand the ozone.
                <br />
                <span className="text-[#0b7a75]">
                  Make better decisions.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#718589] sm:text-lg">
                Pelajari perlindungan ozon melalui materi interaktif,
                simulasi keputusan, refleksi bersama AI, dan aksi nyata
                di lingkungan sekitar.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">

                <Link
                  href="/mission"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#0b7a75] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075e5a] hover:shadow-md"
                >
                  Mulai Mission
                  <span className="text-base">→</span>
                </Link>

                <Link
                  href="/materi"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#dcebea] bg-white px-5 py-3 text-sm font-bold text-[#183236] transition-all duration-200 hover:border-[#b8d9d5] hover:bg-[#f7fafa]"
                >
                  Jelajahi Materi
                </Link>

              </div>

              {/* Learning Flow */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[#718589]">
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef7f5] text-[9px] font-bold text-[#0b7a75]">
                    01
                  </span>
                  Learn
                </span>

                <span className="hidden text-[#c4d4d3] sm:inline">→</span>

                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef5fc] text-[9px] font-bold text-[#2f80ed]">
                    02
                  </span>
                  Decide
                </span>

                <span className="hidden text-[#c4d4d3] sm:inline">→</span>

                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef7f5] text-[9px] font-bold text-[#16a085]">
                    03
                  </span>
                  Reflect
                </span>

                <span className="hidden text-[#c4d4d3] sm:inline">→</span>

                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef5fc] text-[9px] font-bold text-[#2f80ed]">
                    04
                  </span>
                  Act
                </span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex lg:justify-end">

              <div className="relative h-[310px] w-[310px]">

                {/* Outer Circle */}
                <div className="absolute inset-0 rounded-full border border-[#dcebea]" />

                <div className="absolute inset-5 rounded-full border border-[#e6f0ef]" />

                {/* Center */}
                <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#0b7a75] text-white shadow-[0_20px_50px_rgba(11,122,117,0.18)]">

                  <span className="text-3xl font-light">
                    O₃
                  </span>

                  <span className="mt-1 text-[9px] font-bold tracking-[0.2em] text-[#cceee8]">
                    OZONE
                  </span>

                </div>

                {/* Orbit Items */}
                <div className="absolute left-3 top-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#dcebea] bg-white text-sm text-[#0b7a75] shadow-sm">
                  +
                </div>

                <div className="absolute right-5 top-12 flex h-12 w-12 items-center justify-center rounded-full border border-[#dcebea] bg-white text-sm text-[#2f80ed] shadow-sm">
                  AI
                </div>

                <div className="absolute bottom-10 left-12 flex h-12 w-12 items-center justify-center rounded-full border border-[#dcebea] bg-white text-sm text-[#16a085] shadow-sm">
                  ↗
                </div>

                <div className="absolute bottom-4 right-12 flex h-10 w-10 items-center justify-center rounded-full border border-[#dcebea] bg-white text-xs text-[#0b7a75] shadow-sm">
                  ✓
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Welcome / Status */}
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto]">

          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#0b7a75]">
              YOUR LEARNING SPACE
            </p>

            <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#12343b] sm:text-3xl">
              Halo, {userName}.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#718589]">
              Pilih aktivitas berikut untuk melanjutkan perjalananmu
              dalam memahami perlindungan ozon.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4 rounded-[14px] border border-[#dcebea] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(18,52,59,0.035)]">

            <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-[#eef7f5] text-[#0b7a75]">
              ✓
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#718589]">
                CURRENT STATUS
              </p>

              <p className="mt-1 text-sm font-bold text-[#12343b]">
                Eco Decision Maker
              </p>
            </div>

          </div>

        </div>


        {/* =====================================================
            MENU GRID
            ===================================================== */}
        <div className="mb-5 flex items-end justify-between">

          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#718589]">
              EXPLORE
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#12343b]">
              Continue your journey
            </h2>
          </div>

          <span className="hidden text-xs text-[#9aabad] sm:block">
            6 learning activities
          </span>

        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {menus.map((menu) => (
            <Link
              key={menu.id}
              href={menu.link}
              className="group relative overflow-hidden rounded-[16px] border border-[#e1eceb] bg-white p-5 shadow-[0_6px_22px_rgba(18,52,59,0.035)] transition-all duration-200 hover:-translate-y-1 hover:border-[#b8d9d5] hover:shadow-[0_14px_32px_rgba(18,52,59,0.07)]"
            >

              {/* Accent line */}
              <div
                className="absolute left-0 top-0 h-full w-[3px] opacity-80"
                style={{ backgroundColor: menu.accent }}
              />

              <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-[11px] text-lg font-medium transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: menu.soft,
                    color: menu.accent,
                  }}
                >
                  {menu.icon}
                </div>

                {/* Label */}
                <span
                  className="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.1em]"
                  style={{
                    backgroundColor: menu.soft,
                    color: menu.accent,
                  }}
                >
                  {menu.label}
                </span>

              </div>

              <div className="mt-5">

                <h3 className="text-[17px] font-bold text-[#12343b] transition-colors group-hover:text-[#0b7a75]">
                  {menu.title}
                </h3>

                <p className="mt-2 min-h-[42px] text-sm leading-6 text-[#718589]">
                  {menu.desc}
                </p>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#edf2f1] pt-4">

                <span className="text-[10px] font-semibold text-[#9aabad]">
                  EXPLORE ACTIVITY
                </span>

                <span className="text-sm font-semibold text-[#0b7a75] transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>

              </div>

            </Link>
          ))}

        </div>


        {/* =====================================================
            BOTTOM INFO
            ===================================================== */}
        <div className="mt-10 rounded-[16px] border border-[#dcebea] bg-[#eef7f5] p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#0b7a75] shadow-sm">
                i
              </div>

              <div>
                <p className="text-sm font-bold text-[#12343b]">
                  Learning tip
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-[#718589]">
                  Coba selesaikan materi sebelum masuk ke Decision Lab
                  agar kamu punya dasar informasi untuk setiap keputusan.
                </p>
              </div>

            </div>

            <Link
              href="/materi"
              className="shrink-0 text-xs font-bold text-[#0b7a75] transition-colors hover:text-[#075e5a]"
            >
              Open materials →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}