'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // Import database

export default function Progress() {
  const [user, setUser] = useState({ nama: 'Siswa', kode: '-', xp: 0 });
  const [aiMessage, setAiMessage] = useState('ZUNO sedang menganalisis profilmu...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRealProgress = async () => {
      const savedUser = localStorage.getItem('ecoUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        
        try {
          // Tarik data paling UPDATE dari Supabase!
          const { data, error } = await supabase
            .from('students')
            .select('xp')
            .eq('login_code', parsedUser.kode)
            .single();

          const realXp = data && !error ? data.xp : parsedUser.xp;
          setUser({ nama: parsedUser.nama, kode: parsedUser.kode, xp: realXp });

          // Mintakan kalimat motivasi dari AI berdasarkan poin asli
          const aiRes = await fetch('/api/ai-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actionType: 'progress', payload: { nama: parsedUser.nama, xp: realXp } })
          });
          const aiData = await aiRes.json();
          setAiMessage(aiData.message || 'Terus semangat!');

        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRealProgress();
  }, []);

  // Sistem Leveling Otomatis (Setiap 50 XP = Naik 1 Level)
  const maxLevelXp = 200; // Contoh: Misi penuh anggap saja 200 poin
  const progressPercent = Math.min(100, Math.round((user.xp / maxLevelXp) * 100));

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-68px)] bg-[#f7fafa] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[22px] border border-[#e1eceb] bg-white px-6 py-16 text-center shadow-[0_12px_40px_rgba(18,52,59,0.05)]">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f5]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#b8d9d5] border-t-[#0b7a75]"></span>
            </div>
            <p className="text-sm font-semibold text-[#183236]">
              Memuat data progres
            </p>
            <p className="mt-1 text-xs text-[#718589]">
              Mengambil data terbaru dari database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f7fafa] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1100px]">

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

        {/* Page Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0b7a75]"></span>
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#0b7a75]">
              ECO-MISSION PROFILE
            </span>
          </div>

          <h1 className="mt-2 text-[30px] font-bold tracking-[-0.035em] text-[#12343b] md:text-[36px]">
            Profil Keberlanjutan
          </h1>

          <p className="mt-1.5 max-w-[600px] text-sm leading-relaxed text-[#718589]">
            Pantau perkembanganmu dan lihat seberapa jauh perjalananmu sebagai eco learner.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="mb-6 overflow-hidden rounded-[22px] border border-[#dcebea] bg-white shadow-[0_12px_40px_rgba(18,52,59,0.06)]">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">

            {/* Identity */}
            <div className="flex items-center gap-5 p-6 md:p-8">

              <div className="relative flex-shrink-0">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#eef7f5] text-[30px] font-bold text-[#0b7a75] ring-1 ring-[#cfe5e1]">
                  {user.nama.charAt(0).toUpperCase()}
                </div>

                <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0b7a75] text-[10px] font-bold text-white">
                  ✓
                </span>
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold tracking-[0.1em] text-[#718589]">
                  STUDENT PROFILE
                </p>

                <h2 className="truncate text-[23px] font-bold tracking-[-0.025em] text-[#12343b] md:text-[26px]">
                  {user.nama}
                </h2>

                <div className="mt-2 inline-flex items-center gap-2 rounded-[8px] border border-[#e1eceb] bg-[#f8fbfb] px-2.5 py-1.5">
                  <span className="text-[9px] font-bold tracking-[0.08em] text-[#9aabad]">
                    ID
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[#52736f]">
                    {user.kode}
                  </span>
                </div>
              </div>
            </div>

            {/* XP */}
            <div className="border-t border-[#e5eeee] bg-[#f8fbfb] px-7 py-6 text-center md:min-w-[190px] md:border-l md:border-t-0 md:py-8">
              <p className="text-[9px] font-bold tracking-[0.14em] text-[#718589]">
                TOTAL XP
              </p>

              <p className="mt-1 text-[42px] font-extrabold leading-none tracking-[-0.04em] text-[#0b7a75]">
                {user.xp}
              </p>

              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#27ae60]"></span>
                <span className="text-[10px] font-semibold text-[#718589]">
                  Progress tersimpan
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ZUNO Message */}
        <div className="mb-6 overflow-hidden rounded-[20px] border border-[#dbe8f4] bg-white shadow-[0_8px_28px_rgba(18,52,59,0.045)]">

          <div className="flex items-center gap-4 border-b border-[#e7eef3] px-5 py-4 md:px-6">
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
                  AI COACH
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-[#718589]">
                Personal progress insight
              </p>
            </div>

            <span className="ml-auto h-2 w-2 rounded-full bg-[#27ae60]"></span>
          </div>

          <div className="px-5 py-5 md:px-6">
            <div className="relative rounded-[14px] bg-[#f5f9fc] px-5 py-4">
              <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#2f80ed]"></span>

              <p className="text-sm italic leading-[1.75] text-[#40575b]">
                "{aiMessage}"
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Progress */}
          <div className="rounded-[20px] border border-[#e1eceb] bg-white p-6 shadow-[0_8px_28px_rgba(18,52,59,0.045)] md:p-7">

            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#718589]">
                  MISSION PROGRESS
                </p>

                <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#12343b]">
                  Master of Cooling
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#eef7f5] text-[#0b7a75]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L14.7 8.3L20.5 9.1L16.3 13.2L17.3 19L12 16.3L6.7 19L7.7 13.2L3.5 9.1L9.3 8.3L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-3 flex items-end justify-between">
              <div>
                <span className="text-3xl font-bold tracking-[-0.04em] text-[#12343b]">
                  {user.xp}
                </span>
                <span className="ml-1 text-xs font-medium text-[#9aabad]">
                  / 200 XP
                </span>
              </div>

              <span className="text-sm font-bold text-[#0b7a75]">
                {progressPercent}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-[#edf3f2]">
              <div
                className="h-full rounded-full bg-[#0b7a75] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="mt-4 text-xs leading-[1.7] text-[#718589]">
              Selesaikan Decision Lab dan Action Mission untuk terus mengisi progress-mu.
            </p>
          </div>

          {/* Account Status */}
          <div className="rounded-[20px] border border-[#e1eceb] bg-white p-6 shadow-[0_8px_28px_rgba(18,52,59,0.045)] md:p-7">

            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#718589]">
                  CURRENT STATUS
                </p>

                <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#12343b]">
                  Sustainability Level
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#fff7e7] text-[#d59625]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L14.7 8.3L20.5 9.1L16.3 13.2L17.3 19L12 16.3L6.7 19L7.7 13.2L3.5 9.1L9.3 8.3L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-[15px] border border-[#e5eeee] bg-[#f9fbfb] p-4">
              <div className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-full bg-white text-3xl shadow-[0_4px_14px_rgba(18,52,59,0.06)]">
                {user.xp >= 100 ? '🏅' : user.xp >= 50 ? '🥈' : '🌱'}
              </div>

              <div>
                <p className="text-sm font-bold text-[#183236]">
                  {user.xp >= 100
                    ? 'Pelindung Bumi'
                    : user.xp >= 50
                    ? 'Eco Learner'
                    : 'Eco Beginner'}
                </p>

                <p className="mt-1 text-xs leading-[1.6] text-[#718589]">
                  {user.xp >= 100
                    ? 'Luar biasa! Kamu adalah Pelindung Bumi.'
                    : user.xp >= 50
                    ? 'Bagus! Kamu mulai memahami konsep efisiensi.'
                    : 'Masih pemula. Yuk, kumpulkan poin lebih banyak!'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-[#9aabad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b7a75]"></span>
              Status diperbarui berdasarkan XP terbaru
            </div>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="mt-6 rounded-[15px] border border-[#e1eceb] bg-white px-5 py-4 text-center">
          <p className="text-[10px] font-medium tracking-[0.03em] text-[#9aabad]">
            Setiap keputusan kecil yang kamu ambil adalah bagian dari perjalanan belajar.
          </p>
        </div>

      </div>
    </div>
  );
}