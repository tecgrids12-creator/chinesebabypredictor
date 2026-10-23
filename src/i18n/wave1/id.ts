import type { PartialDictionary } from '../translations';

export const dic: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → usia {age} tahun saat pembuahan',
    stepLunarValue: 'tahun lahir qamari {birth} → tahun pembuahan qamari {year} = {age} (虚岁)',
    stepMonthValue: '{date} → bulan qamari {month}',
    stepCellValue: 'baris {age} × kolom {month} → {gender}',
    genderBoy: 'LAKI-LAKI',
    genderGirl: 'PEREMPUAN',
    boyWord: 'anak laki-laki',
    girlWord: 'anak perempuan',
    leapNote: ' (bulan kabisat — lihat panduan Runyue kami di bawah)',
    shareText: 'Chinese Baby Predictor mengatakan usia qamari kami {age} × bulan qamari {month} menunjukkan {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Tinjauan Redaksi',
    byline: 'Diriset dan disusun oleh Tim Riset Parenting &amp; Astrologi Qamari kami',
    body: 'Setiap penjelasan, nilai grafik, dan konversi tanggal di situs ini diriset dan disusun oleh Tim Riset Parenting &amp; Astrologi Qamari kami serta diverifikasi terhadap studi demografi terpublikasi, termasuk {studyLink}.',
    studyLinkText: 'analisis registri populasi Swedia 2010 (2,8 juta kelahiran)',
    disclaimerTitle: 'Penafian folklor &amp; medis.',
    disclaimerBody: 'Chinese Baby Predictor adalah alat folklor kuno yang berbasis metode qamari tradisional Dinasti Qing dan dirancang semata-mata untuk rasa ingin tahu budaya serta hiburan. Alat ini tidak memberikan diagnosis medis, penentuan jenis kelamin janin, maupun perencanaan reproduksi. Untuk penentuan jenis kelamin yang akurat secara medis, konsultasikan dengan penyedia layanan kesehatan berlisensi mengenai USG, tes prenatal non-invasif (NIPT), atau amniosentesis — lihat {acogLink} atau {medlineLink}.',
    acogLinkText: 'panduan tes prenatal ACOG',
    medlineLinkText: 'MedlinePlus: Tes Prenatal',
  },
  geo: {
    hub5Label: 'Prediktor Jenis Kelamin Bayi Tabung (IVF &amp; FET)',
    hub5Desc: 'Pembacaan grafik untuk transfer embrio beku, IVF segar, dan sel telur donor — kedua tanggal dibandingkan.',
    hub6Label: 'Penguji Akurasi Kehamilan Sebelumnya',
    hub6Desc: 'Uji grafik pada anak-anak Anda yang nyata — dapatkan kartu skor qamari keluarga.',
    hub7Label: 'Kalender Cina Jenis Kelamin 2027',
    hub7Desc: 'Tahun Kambing Api: peta lengkap bulan qamari, jebakan persilangan Rok Baru Imlek 6 Februari, dan matriks tahun lahir.',
    hub8Label: 'Kalender Cina Jenis Kelamin 2028',
    hub8Desc: 'Edisi bulan kelima kabisat: seluruh 13 bulan qamari dipetakan dengan rentang tanggal yang tepat.',
  },
};
