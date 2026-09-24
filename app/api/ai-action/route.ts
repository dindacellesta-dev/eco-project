import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { actionType, payload } = body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    // Gunakan model terbaru dan aktifkan kembali mode JSON murni
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: "application/json" } 
    });

    let prompt = '';

    if (actionType === 'decision') {
      prompt = `
        Evaluasi keputusan efisiensi energi ini.
        Skenario: ${payload.scenario}
        Pilihan: ${payload.choice}
        Aturan poin: boros = error (0 poin), netral = warning (10 poin), sustainable = success (20 poin).
        Format wajib JSON:
        {"feedback": "alasan singkat", "type": "success" atau "warning" atau "error", "points": angka}
      `;
    } 
    else if (actionType === 'mission') {
      prompt = `
        Evaluasi laporan misi siswa: "${payload.report}"
        Format wajib JSON:
        {"feedback": "apresiasi 2 kalimat", "points": angka_antara_10_sampai_50}
      `;
    } 
    else if (actionType === 'reflection') {
      prompt = `
        Kamu adalah ZUNO. Evaluasi refleksi akhir siswa tentang sustainable cooling: "${payload.text}"
        Berikan apresiasi dan motivasi mendalam (maks 3 kalimat) agar mereka konsisten melakukan tindakan tersebut.
        Format wajib JSON:
        {"feedback": "apresiasi dan motivasi dari Zuno", "points": angka_acak_antara_20_sampai_50}
      `;
    }
    else if (actionType === 'progress') {
      prompt = `
        Buat 1 kalimat motivasi untuk ${payload.nama} yang punya ${payload.xp} ECO POINTS.
        Format wajib JSON:
        {"message": "kalimat motivasi"}
      `;
    }

    const result = await model.generateContent(prompt);
    const textResult = result.response.text().trim();
    
    const aiResponse = JSON.parse(textResult);
    return NextResponse.json(aiResponse);
    
  } catch (error: any) {
    console.error('Error memanggil AI:', error.message);
    return NextResponse.json({ error: 'Gagal memproses AI' }, { status: 500 });
  }
}