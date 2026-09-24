'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fungsi untuk Mendaftar (Sign Up)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Generate kode unik (Misal: ECO-4829)
    const newCode = 'ECO-' + Math.floor(1000 + Math.random() * 9000);

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([{ name: name, login_code: newCode, xp: 0 }])
        .select()
        .single();

      if (error) throw error;

      setGeneratedCode(newCode);
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftar. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk Masuk (Log In)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('login_code', loginCode)
        .single();

      if (error || !data) {
        setError('Kode Login tidak ditemukan!');
      } else {
        // Simpan sesi ke browser agar tidak perlu login terus
        localStorage.setItem(
          'ecoUser',
          JSON.stringify({
            id: data.id,
            nama: data.name,
            kode: data.login_code,
            xp: data.xp,
          })
        );

        router.push('/beranda');
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7fafa] px-4 py-10">

      {/* =====================================================
          BACKGROUND DECORATION
          ===================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#e5f4f1]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-[#eaf3fc]" />

      <div className="pointer-events-none absolute left-[12%] top-[25%] h-2 w-2 rounded-full bg-[#16a085] opacity-40" />

      <div className="pointer-events-none absolute right-[15%] top-[18%] h-2 w-2 rounded-full bg-[#2f80ed] opacity-30" />

      <div className="pointer-events-none absolute bottom-[20%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#0b7a75] opacity-30" />


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="relative z-10 w-full max-w-md">

        {/* ===================================================
            LOGO / EARTH ANIMATION
            =================================================== */}

        <div className="mb-8 flex flex-col items-center">

          <div className="relative flex h-28 w-28 items-center justify-center">

            {/* Orbit ring */}
            <div className="absolute inset-1 animate-[spin_12s_linear_infinite] rounded-full border border-[#b9ddd8]" />

            {/* Second orbit */}
            <div className="absolute inset-4 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-dashed border-[#d4e9e6]" />

            {/* Orbit dot */}
            <div className="absolute -right-1 top-6 h-2.5 w-2.5 rounded-full bg-[#2f80ed] shadow-[0_0_12px_rgba(47,128,237,0.35)]" />

            {/* Earth */}
            <div className="animate-[float_4s_ease-in-out_infinite]">

              <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2f80ed] via-[#2980d9] to-[#075e5a] shadow-[0_12px_30px_rgba(11,122,117,0.2)]">

                {/* Atmosphere glow */}
                <div className="absolute inset-0 rounded-full ring-4 ring-[#d7efeb]/70" />

                {/* Continents */}
                <div className="absolute left-3 top-3 h-5 w-7 rotate-[-18deg] rounded-[60%_40%_55%_45%] bg-[#55b98c]" />

                <div className="absolute right-3 top-6 h-4 w-6 rotate-[25deg] rounded-[45%_55%_40%_60%] bg-[#64c596]" />

                <div className="absolute bottom-3 left-5 h-4 w-5 rotate-[12deg] rounded-[55%_45%_60%_40%] bg-[#4eae84]" />

                {/* Highlight */}
                <div className="absolute left-3 top-2 h-3 w-5 rotate-[-30deg] rounded-full bg-white/20 blur-[1px]" />

              </div>

            </div>

          </div>

          {/* Brand */}
          <div className="mt-3 text-center">

            <p className="text-[19px] font-extrabold tracking-[0.1em] text-[#12343b]">
              ECO-MISSION
            </p>

            <div className="mt-1 flex items-center justify-center gap-2">

              <span className="h-px w-6 bg-[#b9dcd8]" />

              <span className="text-[9px] font-bold tracking-[0.28em] text-[#2f80ed]">
                AI LEARNING PLATFORM
              </span>

              <span className="h-px w-6 bg-[#b9dcd8]" />

            </div>

          </div>

          <p className="mt-3 text-center text-sm text-[#718589]">
            Learn. Decide. Act for a Cooler Planet.
          </p>

        </div>


        {/* ===================================================
            AUTH CARD
            =================================================== */}

        <div className="rounded-[20px] border border-[#e1eceb] bg-white p-6 shadow-[0_20px_60px_rgba(18,52,59,0.07)] sm:p-8">

          {/* Tabs */}
          <div className="mb-7 grid grid-cols-2 border-b border-[#e8eeee]">

            <button
              type="button"
              className={`relative pb-3 text-sm font-bold transition-colors ${
                isLogin
                  ? 'text-[#0b7a75]'
                  : 'text-[#9aabad] hover:text-[#718589]'
              }`}
              onClick={() => {
                setIsLogin(true);
                setGeneratedCode(null);
                setError('');
              }}
            >
              Masuk

              {isLogin && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-[#0b7a75]" />
              )}
            </button>

            <button
              type="button"
              className={`relative pb-3 text-sm font-bold transition-colors ${
                !isLogin
                  ? 'text-[#0b7a75]'
                  : 'text-[#9aabad] hover:text-[#718589]'
              }`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Daftar Baru

              {!isLogin && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-[#0b7a75]" />
              )}
            </button>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-[10px] border border-[#f4d0d0] bg-[#fff7f7] p-3.5 text-sm text-[#c74b4b]">

              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e85d5d] text-[10px] font-bold text-white">
                !
              </span>

              <p className="leading-5">
                {error}
              </p>

            </div>
          )}


          {/* =================================================
              LOGIN
              ================================================= */}

          {isLogin ? (
            <form onSubmit={handleLogin}>

              <div className="mb-6">

                <label className="mb-2 block text-xs font-bold tracking-wide text-[#183236]">
                  KODE LOGIN
                </label>

                <p className="mb-3 text-xs leading-5 text-[#8a999b]">
                  Masukkan kode akses yang kamu dapat saat mendaftar.
                </p>

                <input
                  type="text"
                  required
                  placeholder="Contoh: ECO-1234"
                  value={loginCode}
                  onChange={(e) =>
                    setLoginCode(e.target.value.toUpperCase())
                  }
                  className="w-full rounded-[11px] border border-[#dce8e7] bg-[#fbfdfd] px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#183236] outline-none transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-[#a6b2b3] focus:border-[#0b7a75] focus:bg-white focus:ring-4 focus:ring-[#0b7a75]/10"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#0b7a75] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075e5a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Memeriksa...
                  </>
                ) : (
                  <>
                    Mulai Misi
                    <span>→</span>
                  </>
                )}
              </button>

            </form>
          ) : (

            /* =================================================
               SIGN UP
               ================================================= */

            <div>

              {!generatedCode ? (

                <form onSubmit={handleSignUp}>

                  <div className="mb-6">

                    <label className="mb-2 block text-xs font-bold tracking-wide text-[#183236]">
                      NAMA PANGGILAN
                    </label>

                    <p className="mb-3 text-xs leading-5 text-[#8a999b]">
                      Gunakan nama yang ingin ditampilkan di Eco-Mission.
                    </p>

                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama kamu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-[11px] border border-[#dce8e7] bg-[#fbfdfd] px-4 py-3.5 text-sm text-[#183236] outline-none transition-all placeholder:text-[#a6b2b3] focus:border-[#0b7a75] focus:bg-white focus:ring-4 focus:ring-[#0b7a75]/10"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#0b7a75] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075e5a] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Membuat Akun...
                      </>
                    ) : (
                      <>
                        Dapatkan Kode Akses
                        <span>→</span>
                      </>
                    )}
                  </button>

                </form>

              ) : (

                /* =============================================
                   GENERATED CODE
                   ============================================= */

                <div className="text-center">

                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef7f5] text-[#0b7a75]">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b7a75] text-sm font-bold text-white">
                      ✓
                    </div>

                  </div>

                  <h3 className="text-lg font-bold text-[#12343b]">
                    Akun Berhasil Dibuat
                  </h3>

                  <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#718589]">
                    Simpan kode login ini. Kamu akan membutuhkannya
                    untuk masuk kembali ke Eco-Mission.
                  </p>

                  <div className="my-6 rounded-[13px] border border-dashed border-[#b8d9d5] bg-[#f3faf8] px-4 py-5">

                    <p className="mb-2 text-[9px] font-bold tracking-[0.16em] text-[#718589]">
                      YOUR ACCESS CODE
                    </p>

                    <span className="text-2xl font-extrabold tracking-[0.12em] text-[#0b7a75]">
                      {generatedCode}
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginCode(generatedCode);
                      setIsLogin(true);
                    }}
                    className="w-full rounded-[11px] bg-[#0b7a75] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075e5a] hover:shadow-md"
                  >
                    Lanjut Masuk →
                  </button>

                </div>

              )}

            </div>
          )}

        </div>


        {/* ===================================================
            FOOTER
            =================================================== */}

        <p className="mt-6 text-center text-[10px] font-medium tracking-wide text-[#9aabad]">
          ECO-MISSION AI · LEARN · DECIDE · ACT
        </p>

      </div>


      {/* =====================================================
          ANIMATION STYLES
          ===================================================== */}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>

    </main>
  );
}