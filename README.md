# Kata Penyusup 🎭 (Impostor Word)

Game tebak penyusup *offline*, pass & play di satu HP. Semua pemain dapat satu
kata rahasia — kecuali si **penyusup** yang dapat kata mirip. Sebutkan petunjuk
bergiliran, lalu tebak siapa yang bohong.

## Tech stack
React (Vite) · Tailwind CSS v4 · Framer Motion

## Cara main
1. **Atur**: geser slider jumlah pemain (min 2) & jumlah penyusup (min 1, maks
   pemain − 1), pilih bahasa kata (Indonesia / English), opsional isi nama.
2. **Lihat kata**: HP dioper bergiliran. Tiap pemain ketuk kartu untuk melihat
   katanya diam-diam, lalu oper ke pemain berikutnya.
3. **Diskusi**: bergiliran beri petunjuk soal kata kalian (jangan terlalu jelas).
4. **Ungkap**: tekan tombol untuk membongkar siapa penyusupnya beserta kedua kata.

## Menjalankan
```bash
npm install
npm run dev      # mode development → http://localhost:5173
npm run build    # build produksi ke /dist
npm run preview  # pratinjau hasil build
```

## Menambah kata
Edit `src/data/wordPairs.js`. Tiap entri berupa pasangan `['KataA', 'KataB']`
yang mirip tapi beda — saat ronde dibuat, mana yang jadi kata warga vs penyusup
diacak otomatis.
