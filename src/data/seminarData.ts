import { SyllabusItem, BonusItem, FAQItem, QuizQuestion } from '../types';

export const SYLLABUS_DATA: SyllabusItem[] = [
  {
    id: 1,
    title: "Pengenalan 50 Produk Digital",
    description: "Temukan ide produk digital yang sangat diminati pasar global maupun lokal tanpa harus memproduksi barang fisik.",
    details: [
      "E-book, template desain, dan lembar kerja (spreadsheet)",
      "Video course, audio guide, dan preset Lightroom/CapCut",
      "Produk PLR (Private Label Rights) yang siap dijual kembali",
      "Analisa profit margin hingga 90%++ untuk produk non-fisik"
    ]
  },
  {
    id: 2,
    title: "Optimasi AI untuk Produk Digital",
    description: "Gunakan kecerdasan buatan (Artificial Intelligence) untuk riset, pembuatan konten, hingga penulisan materi jualan.",
    details: [
      "ChatGPT & Claude untuk brainstorming ide & outline produk",
      "AI Image Generator untuk mendesain cover, mockup & aset visual",
      "Membuat copywriting landing page & deskripsi produk dalam 5 menit",
      "Prompt engineering praktis yang bisa digunakan langsung lewat smartphone"
    ]
  },
  {
    id: 3,
    title: "Tutorial Lengkap LYNK.ID",
    description: "Kupas tuntas platform payment gateway & e-commerce terpopuler di Indonesia untuk jualan produk fisik, digital, & jasa.",
    details: [
      "Cara mendaftar, setup toko online, dan upload produk digital",
      "Integrasi otomatis dengan e-wallet (OVO, GoPay, Dana) & Virtual Account",
      "Sistem pengiriman produk digital otomatis langsung setelah pembeli membayar",
      "Menerima booking jasa & konsultasi secara otomatis tanpa chat manual"
    ]
  },
  {
    id: 4,
    title: "Tes Minat Bakat Bisnis",
    description: "Mengetahui jenis bisnis yang paling sesuai dengan profil kepribadian, minat, dan modal awal Anda.",
    details: [
      "Metodologi penentuan model bisnis (Fisik vs Digital vs Jasa)",
      "Menemukan niche pasar yang tepat berdasarkan keahlian Anda",
      "Menghindari kesalahan fatal pemula dalam memilih produk pertama",
      "Konsultasi langsung untuk menyelaraskan minat dengan prospek pasar"
    ]
  },
  {
    id: 5,
    title: "Instagram Marketing Organik + Boost Post",
    description: "Strategi mendatangkan traffic melimpah secara gratis maupun berbayar dengan modal minimal tetapi profitable.",
    details: [
      "Optimasi Bio Instagram untuk meningkatkan conversion rate pengunjung",
      "Formula konten Reels yang viral tanpa harus joget-joget atau rekam muka",
      "Strategi Boost Post (Instagram Ads) praktis langsung dari aplikasi handphone",
      "Membaca metrik iklan untuk menentukan konten yang layak dipromosikan"
    ]
  },
  {
    id: 6,
    title: "Automation untuk Pemasaran",
    description: "Membangun sistem pemasaran otomatis yang terus bekerja mendatangkan pembeli saat Anda sedang tidur.",
    details: [
      "Auto-DM & komentar Instagram untuk interaksi instan tanpa admin",
      "Sistem follow-up WhatsApp otomatis bagi calon pembeli",
      "Menghubungkan Instagram, LYNK.ID, dan WhatsApp secara seamless",
      "Menghemat waktu hingga 4 jam sehari dengan bantuan tools automation"
    ]
  }
];

export const BONUS_DATA: BonusItem[] = [
  {
    id: 1,
    title: "6 Video Materi Belajar Mandiri",
    description: "Akses rekaman materi fundamental kelas online yang dapat diulang kapan saja setelah kelas offline berakhir."
  },
  {
    id: 2,
    title: "Support Grup Eksklusif Selama 3 Bulan",
    description: "Grup bimbingan intensif via WhatsApp/Telegram bersama mentor dan asisten mentor untuk konsultasi praktek harian."
  },
  {
    id: 3,
    title: "Tools AI Membangun Personal Branding",
    description: "Koleksi tools, template prompt, dan cheat sheet siap pakai untuk merancang konten personal branding di sosial media."
  },
  {
    id: 4,
    title: "Tools AI Analisa Akun Instagram",
    description: "Tools cerdas berbasis AI untuk menganalisa kelemahan profil Instagram Anda dan memberikan rekomendasi optimasi instan."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Apakah saya harus membawa laptop?",
    answer: "Tidak perlu. Semua materi, praktik, dan sistem automasi dalam kelas ini dirancang khusus agar bisa dipraktikkan 100% menggunakan smartphone saja."
  },
  {
    id: 2,
    question: "Saya pemula sekali, apakah bisa mengikuti?",
    answer: "Sangat bisa! Materi dirancang secara runut mulai dari pengenalan dasar hingga tingkat lanjut. Anda juga dipandu oleh asisten mentor di dalam ruangan agar tidak tertinggal."
  },
  {
    id: 3,
    question: "Apa perbedaan tiket Regular dengan VIP?",
    answer: "Peserta VIP akan mendapatkan kursi baris paling depan (VIP Zone), sesi makan siang privat eksklusif bersama Muri Handayani, prioritas review akun saat kelas, dan bonus tambahan template jualan senilai Rp 500.000."
  },
  {
    id: 4,
    question: "Bagaimana cara klaim Garansi Balik Modal?",
    answer: "Kami yakin dengan kualitas materi kami. Jika Anda mempraktekkan seluruh materi seminar secara konsisten selama 60 hari dan tidak mendapatkan balik modal pendaftaran, kami akan mengembalikan uang pendaftaran Anda 100% tanpa potongan."
  },
  {
    id: 5,
    question: "Di mana lokasi detail acaranya?",
    answer: "Acara diadakan di Kantor SBO, Jl. Cihanjuang No.132, Cihanjuang, Kec. Parongpong, Kabupaten Bandung Barat. Lokasi mudah dijangkau dan memiliki area parkir yang luas."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Bagaimana ketersediaan waktu Anda setiap hari untuk mengelola bisnis ini?",
    options: [
      {
        text: "Sangat terbatas (kurang dari 2 jam sehari, ingin yang semi-otomatis)",
        points: { digital: 3, fisik: 1, jasa: 1 }
      },
      {
        text: "Cukup fleksibel (2-4 jam sehari, bisa packing barang atau koordinasi)",
        points: { digital: 1, fisik: 3, jasa: 2 }
      },
      {
        text: "Sangat luang (lebih dari 4 jam, siap melayani klien langsung atau meeting)",
        points: { digital: 1, fisik: 1, jasa: 3 }
      }
    ]
  },
  {
    id: 2,
    text: "Apa aset atau kelebihan utama yang paling ingin Anda optimalkan saat ini?",
    options: [
      {
        text: "Pengetahuan, skill, hobi, atau kegemaran membagikan informasi bermanfaat",
        points: { digital: 3, fisik: 1, jasa: 3 }
      },
      {
        text: "Modal uang untuk stok barang, relasi supplier, atau lokasi fisik strategis",
        points: { digital: 1, fisik: 3, jasa: 1 }
      },
      {
        text: "Keahlian spesifik (misal: desain, nulis, pijat, mengajar, konsultasi, menjahit)",
        points: { digital: 2, fisik: 1, jasa: 3 }
      }
    ]
  },
  {
    id: 3,
    text: "Berapa modal awal maksimum yang ingin Anda keluarkan untuk memulai bisnis?",
    options: [
      {
        text: "Hampir Rp 0 (hanya butuh handphone dan kuota internet saja)",
        points: { digital: 3, fisik: 1, jasa: 3 }
      },
      {
        text: "Sedang (Rp 500 Ribu - Rp 2 Juta untuk beli sampel produk/stok awal)",
        points: { digital: 1, fisik: 3, jasa: 1 }
      },
      {
        text: "Fleksibel (Siap berinvestasi iklan/lisensi tools komersial untuk skala besar)",
        points: { digital: 3, fisik: 3, jasa: 2 }
      }
    ]
  },
  {
    id: 4,
    text: "Tipe pekerjaan seperti apa yang paling membuat Anda bersemangat?",
    options: [
      {
        text: "Membuat sistem otomatis sekali buat lalu bisa di-download ribuan kali",
        points: { digital: 3, fisik: 1, jasa: 1 }
      },
      {
        text: "Melihat produk fisik nyata, membungkus paket, dan melihat proses ekspedisi",
        points: { digital: 1, fisik: 3, jasa: 1 }
      },
      {
        text: "Berinteraksi langsung, membantu memecahkan masalah orang, dan memberikan jasa terbaik",
        points: { digital: 1, fisik: 1, jasa: 3 }
      }
    ]
  }
];

export const QUIZ_RESULTS: Record<string, { title: string; description: string; recommendation: string }> = {
  digital: {
    title: "Produk Digital (E-Book, Template, Video Kursus)",
    description: "Kepribadian Anda sangat cocok untuk bisnis Produk Digital! Model bisnis ini memiliki kelebihan margin keuntungan yang luar biasa tinggi (bisa mencapai 95%), tidak ada biaya pengiriman (ongkir), tidak ada risiko stok menumpuk, dan dapat berjalan secara otomatis menggunakan platform LYNK.ID.",
    recommendation: "Di Kelas Offline Bandung, Anda akan belajar cara riset 50 ide produk digital, optimasi AI untuk memproduksi e-book/template dengan cepat, dan tutorial lengkap setting otomatisasi checkout LYNK.ID lewat smartphone."
  },
  fisik: {
    title: "Produk Fisik (Reseller, Dropshipper, Brand Sendiri)",
    description: "Anda memiliki minat kuat di bisnis Produk Fisik! Menyentuh produk, merancang kemasan, dan mengurus alur logistik memberikan Anda kepuasan tersendiri. Bisnis produk fisik memiliki pasar yang sangat luas dan mudah dipahami oleh pembeli umum.",
    recommendation: "Di Kelas Offline Bandung, Anda akan belajar cara mengintegrasikan LYNK.ID untuk jualan produk fisik, strategi Instagram Marketing Boost Post untuk meningkatkan penjualan produk harian, serta automation follow-up WhatsApp calon pelanggan."
  },
  jasa: {
    title: "Bisnis Jasa (Konsultasi, Freelancer, Jasa Kreatif/Edukasi)",
    description: "Keahlian Anda sangat cocok untuk Bisnis Jasa! Anda gemar berinteraksi dengan orang lain, menyelesaikan masalah mereka, dan menawarkan keahlian personal Anda. Menjual jasa memiliki keuntungan modal awal yang sangat minim karena aset terbesarnya adalah diri Anda sendiri.",
    recommendation: "Di Kelas Offline Bandung, Anda akan dipandu mengoptimalkan Instagram dan LYNK.ID untuk sistem booking jasa otomatis, membangun personal branding yang kredibel menggunakan AI, serta mengelola interaksi pelanggan secara semi-otomatis."
  }
};
