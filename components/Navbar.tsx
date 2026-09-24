'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Tambahan untuk mendeteksi perpindahan halaman

export default function Navbar() {
  const [userName, setUserName] = useState('Siswa');
  const [userXp, setUserXp] = useState(0); // Tambahan state untuk XP
  const pathname = usePathname(); // Membaca URL saat ini
  useEffect(() => {
    // Ambil data terbaru dari localStorage setiap kali URL berubah
    const savedUser = localStorage.getItem('ecoUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserName(parsedUser.nama || 'Siswa');
      setUserXp(parsedUser.xp || 0); // Mengambil XP asli
    }
  }, [pathname]); // Akan dieksekusi ulang setiap kali kamu pindah halaman
  // --- PINDAHKAN PENCEGAT KE SINI (SETELAH useEffect) ---
  if (pathname === '/') {
    return null; // Sembunyikan Navbar di halaman pendaftaran/login
  }
  // ------------------------------------------------------

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e1eceb] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/beranda"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0b7a75] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="text-lg">✦</span>
          </div>

          <div className="leading-none">
            <div className="text-[15px] font-bold tracking-[0.08em] text-[#12343b]">
              ECO-MISSION
            </div>
            <div className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-[#2f80ed]">
              AI LEARNING PLATFORM
            </div>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Greeting */}
          <div className="hidden text-right sm:block">
            <p className="text-[11px] font-medium text-[#718589]">
              Welcome back
            </p>
            <p className="text-sm font-semibold text-[#183236]">
              {userName}
            </p>
          </div>

          {/* XP */}
          <Link
            href="/progress"
            className="group flex items-center gap-2 rounded-full border border-[#dcebea] bg-[#f7fafa] px-3 py-2 transition-all duration-200 hover:border-[#b8d9d5] hover:bg-[#eef7f5]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b7a75] text-[10px] font-bold text-white">
              XP
            </span>

            <span className="text-xs font-bold text-[#0b7a75]">
              {userXp}
            </span>
          </Link>

          {/* Profile */}
          <Link
            href="/progress"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dcebea] bg-[#eef7f5] text-sm font-bold text-[#0b7a75] transition-all duration-200 hover:border-[#0b7a75] hover:bg-[#e2f2ef]"
            title="My Progress"
          >
            {userName.charAt(0).toUpperCase()}
          </Link>

        </div>
      </div>
    </nav>
  );
}