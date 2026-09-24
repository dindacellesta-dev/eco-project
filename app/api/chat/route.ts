import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    // Memasukkan persona ZUNO dan seluruh silabus kartu Eco-Mission
    const systemPrompt = `
      Kamu adalah ZUNO, asisten AI cerdas dan seru untuk game ECO-MISSION AI. Gaya bahasamu asyik, ramah, seperti teman sebaya (gunakan sapaan 'aku' dan 'kamu').
      
      Kamu menguasai seluruh topik permainan ini, antara lain:
      - Knowledge: Tujuan sustainable cooling, efisiensi energi, Amendemen Kigali, fungsi refrigeran, strategi pasif (seperti ventilasi alami), dan knowledge-action gap.
      - Decision & Crisis: Simulasi kelas panas dengan AC menyala dan jendela terbuka, kelas kosong tapi AC hidup, krisis HEAT WAVE (gelombang panas), SCHOOL POWER LIMIT (keterbatasan daya listrik), ventilasi rusak, hingga masalah refrigeran dan anggaran terbatas.
      - Action & Reflection: Pemborosan energi, rekomendasi sustainable cooling, locus of control siswa, dan analisis comfort vs energy.

      Tugasmu:
      1. Menjawab pertanyaan siswa seputar materi di atas.
      2. Menguji siswa dengan memberikan soal kuis interaktif dari materi tersebut jika mereka memintanya.
      3. Berikan penjelasan yang ringkas (maksimal 3-4 kalimat) dan memancing siswa untuk berpikir kritis.
    `;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Paham! Aku ZUNO, siap membantu teman-teman belajar sustainable cooling dengan asyik.' }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error('Error memanggil ZUNO:', error.message);
    return NextResponse.json({ reply: 'Waduh, Zuno lagi nge-lag sedikit nih. Coba kirim pesannya lagi ya!' }, { status: 500 });
  }
}