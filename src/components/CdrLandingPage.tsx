import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronDown,
  Check,
  BookOpen,
  Search,
  Award,
  DollarSign,
  Lightbulb,
  Frown,
  HelpCircle,
  Package,
  Home,
  Zap
} from 'lucide-react';
import ebookCover from '../assets/images/ebook_cover_1782615281690.jpg';
import nurdinProfile from '../assets/images/nurdin_nurung_1783039074633.jpg';

export default function CdrLandingPage() {
  // CTA URL
  const ctaUrl = "https://lynk.id/lynkidhub/RKeeraV";

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Risk Calculator State
  const [modalBudget, setModalBudget] = useState<number>(3000000); // 3 Million IDR default

  // Countdown timer (e.g., set to 1 hour, 45 minutes, 12 seconds from load and ticks down)
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 44, seconds: 58 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 2 hours for convincing infinite promo
          return { hours: 2, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculator results
  const riskPercentage = 0.74; // 74% risk of failure in new retail business without research
  const potentialLoss = modalBudget * riskPercentage;
  const savedBudget = potentialLoss - 149000;

  const faqs = [
    {
      q: "Apakah ini cocok untuk pemula total?",
      a: "Ya, justru ebook ini ditulis untuk kamu yang belum pernah jualan sama sekali. Semua dijelaskan step by step dari dasar hingga siap menjalankan bisnis sendiri."
    },
    {
      q: "Produk fisik apa yang dibahas di ebook ini?",
      a: "Ebook ini membahas metode dan pola — bukan produk spesifik. Kamu akan belajar cara menemukan sendiri produk yang potensial di pasarmu, sehingga bisa diaplikasikan ke produk apapun."
    },
    {
      q: "Bagaimana cara mendapatkan ebooknya?",
      a: "Setelah pembayaran berhasil, kamu akan langsung mendapatkan akses download ebook melalui link yang dikirim ke emailmu. Prosesnya otomatis dan instan."
    },
    {
      q: "Apakah ada garansi uang kembali?",
      a: "Ebook ini adalah produk digital yang langsung bisa diakses setelah pembelian. Karena sifatnya yang tidak bisa 'dikembalikan', kami tidak menyediakan refund — tapi kami yakin kamu tidak akan kecewa dengan isinya."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-stone-900 font-sans selection:bg-blue-600 selection:text-white antialiased flex flex-col">
      
      {/* Main Single-Column Container */}
      <div className="flex-1 w-full flex flex-col py-6 px-4 sm:px-6">
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl flex flex-col p-6 sm:p-10 relative overflow-hidden mx-auto my-auto">
          {/* Decorative Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400"></div>

          <main className="flex flex-col gap-10">
            
            {/* BRAND HEADER */}
            <header className="flex flex-col items-center text-center gap-3 pt-4" id="brand-header">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-[11px] font-mono tracking-wider text-blue-600 uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Produk Digital · NR House
              </div>
              <div className="flex gap-2 justify-center">
                <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-[9px] font-mono font-bold tracking-wider rounded-full uppercase shadow-sm">
                  EBOOK PREMIUM
                </span>
                <span className="px-2.5 py-0.5 bg-amber-500 text-stone-950 text-[9px] font-mono font-bold tracking-wider rounded-full uppercase shadow-sm">
                  BEST SELLER
                </span>
              </div>
            </header>

            {/* HERO SECTION */}
            <section className="flex flex-col gap-4 text-center" id="hero-section">
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Rahasia Omset <span className="text-blue-600">1,5 Miliar</span> dari Jualan Produk — dari Rumah
              </h1>
              
              <p className="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
                Langkah nyata yang sudah terbukti. Bukan teori, bukan motivasi — ini sistem yang bisa kamu tiru secara langsung.
              </p>

              {/* Ebook Cover Mockup Image Showcase */}
              <div className="my-2 flex justify-center">
                <motion.div 
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Outer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  
                  {/* Image Frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl max-w-[240px]">
                    <img 
                      src={ebookCover} 
                      alt="Ebook Cuan dari Rumah" 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Key Quick Highlight Tags */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-2">
                {[
                  { icon: <Package className="w-3.5 h-3.5 text-blue-600" />, text: "Produk Fisik & Digital" },
                  { icon: <Home className="w-3.5 h-3.5 text-blue-600" />, text: "Kerja dari Rumah" },
                  { icon: <Zap className="w-3.5 h-3.5 text-blue-600" />, text: "Akses Langsung" },
                  { icon: <Award className="w-3.5 h-3.5 text-blue-600" />, text: "Cocok untuk Pemula" },
                  { icon: <TrendingUp className="w-3.5 h-3.5 text-blue-600" />, text: "Hasil Nyata, Bukan Janji" }
                ].map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-medium text-gray-700 border border-gray-100 transition-colors">
                    {tag.icon}
                    {tag.text}
                  </span>
                ))}
              </div>

              {/* MAIN CTA BUTTON */}
              <div className="pt-4 flex flex-col items-center">
                <a 
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white text-lg font-bold py-5 rounded-2xl hover:bg-black shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  DAPATKAN EBOOK SEKARANG
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </a>
                <p className="text-[11px] text-gray-400 mt-2 font-mono">
                  ⚡ Akses download instan dikirim langsung ke email Anda
                </p>
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-gray-50 rounded-3xl p-6 border border-gray-100" id="stats-section">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-center divide-x-0 divide-y divide-gray-200/60 sm:divide-y-0">
                <div className="flex flex-col justify-center">
                  <span className="text-3xl font-display font-extrabold text-blue-600 tracking-tight">Rp1,5 M</span>
                  <span className="text-[11px] font-mono tracking-wide text-gray-400 uppercase mt-1">Total Omset</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Satu produk dalam 6 bulan</span>
                </div>
                
                <div className="flex flex-col justify-center">
                  <span className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">6 Bulan</span>
                  <span className="text-[11px] font-mono tracking-wide text-gray-400 uppercase mt-1">Jangka Waktu</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Hasil nyata terbukti</span>
                </div>

                <div className="flex flex-col justify-center pt-6 sm:pt-0">
                  <span className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">1 Produk</span>
                  <span className="text-[11px] font-mono tracking-wide text-gray-400 uppercase mt-1">Modal Awal</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Fokus scale-up maksimal</span>
                </div>

                <div className="flex flex-col justify-center pt-6 sm:pt-0">
                  <span className="text-3xl font-display font-extrabold text-blue-600 tracking-tight">Ribuan</span>
                  <span className="text-[11px] font-mono tracking-wide text-gray-400 uppercase mt-1">Pcs Terjual</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Bukti pasar merespons</span>
                </div>
              </div>
            </section>

            {/* PAIN POINTS SECTION - "Apakah Ini Kamu?" */}
            <section className="flex flex-col gap-4" id="pain-points-section">
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900">Apakah Ini Kamu?</h2>
                <div className="w-10 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  {
                    emoji: "😩",
                    title: "Mau Bisnis Online tapi Bingung Jual Produk Apa?",
                    desc: "Kebanyakan orang gagal sebelum mulai karena tidak tahu cara memilih produk yang tepat dan punya potensi laku keras."
                  },
                  {
                    emoji: "📉",
                    title: "Sudah Jualan tapi Omset Masih Jauh dari Harapan?",
                    desc: "Bukan karena kamu kurang kerja keras — tapi karena belum punya sistem riset produk dan strategi traffic yang benar."
                  },
                  {
                    emoji: "🤷",
                    title: "Nggak Tahu Cara Dapat Supplier & Datangkan Pembeli?",
                    desc: "Dua hal ini adalah kunci bisnis fisik yang menghasilkan. Tanpanya, kamu hanya menebak-nebak dan buang waktu."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex gap-4 items-start hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                    <span className="text-2xl pt-0.5 select-none">{item.emoji}</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display font-bold text-[15px] text-gray-800 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ABOUT SECTION - "Tentang Ebook Ini" */}
            <section className="flex flex-col gap-5" id="about-section">
              <div className="text-center">
                <span className="text-xs font-mono text-blue-600 tracking-wider uppercase font-semibold">Dokumentasi Praktis</span>
                <h2 className="font-display text-2.5xl font-bold tracking-tight text-gray-900 mt-1">Tentang Ebook Ini</h2>
              </div>

              {/* Author Profile and Brief Info */}
              <div className="bg-stone-50 border border-stone-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src={nurdinProfile} 
                      alt="Nurdin Nurung" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1.5 shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 text-center sm:text-left w-full">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-stone-900 leading-tight">Nurdin Nurung</h3>
                    <p className="text-xs font-mono text-blue-600 font-semibold mt-0.5">Penulis & Praktisi Bisnis</p>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-xs text-stone-700 font-medium">
                    <div className="flex items-start gap-2 justify-center sm:justify-start">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                      <span>Owner IG <span className="font-bold text-stone-900">@nrhouse_ide</span> dengan 406K followers.</span>
                    </div>
                    <div className="flex items-start gap-2 justify-center sm:justify-start">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                      <span>Hasilkan <span className="font-bold text-stone-900">240 jutaan dalam 3 hari</span> dari jualan eBook.</span>
                    </div>
                    <div className="flex items-start gap-2 justify-center sm:justify-start">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                      <span>Sudah cuan milyaran dan dikerjakan <span className="font-bold text-stone-900">dari rumah</span>.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-gray-500">
                <p className="font-bold text-gray-800 text-base text-center leading-snug">
                  Satu Ebook yang Bisa Ubah Cara Kamu Berbisnis.
                </p>
                <p>
                  Ebook <strong>Cuan dari Rumah</strong> bukan kumpulan motivasi belaka. Ini adalah dokumentasi langkah nyata yang saya lakukan — mulai dari riset produk, mencari supplier terpercaya, membangun organic/paid traffic, hingga akhirnya menembus omset miliaran rupiah.
                </p>
                <p>
                  Semua dikupas secara tuntas tanpa rahasia, langkah demi langkah (step by step) yang sangat ramah dan mudah dipahami, cocok untuk kamu yang masih awam sekalipun.
                </p>

                {/* Blockquote callout with professional polish design */}
                <blockquote className="bg-blue-50/50 border border-blue-100/50 border-l-4 border-blue-600 p-5 rounded-r-2xl text-gray-700 italic text-[14px] mt-4 leading-relaxed flex flex-col gap-2">
                  <span>
                    "💡 Saya melakukan riset produk terlebih dahulu sebelum memutuskan memasarkannya. Metode inilah yang membuat saya bisa konsisten menjual ribuan pcs dan menghasilkan omset yang terus tumbuh — tanpa perlu modal besar di awal."
                  </span>
                </blockquote>
              </div>
            </section>

            {/* CURRICULUM SECTION - "Yang Kamu Pelajari" */}
            <section className="flex flex-col gap-4" id="curriculum-section">
              <div className="text-center">
                <span className="text-xs font-mono text-blue-600 tracking-wider uppercase font-semibold">Materi Pembelajaran</span>
                <h2 className="font-display text-2.5xl font-bold tracking-tight text-gray-900 mt-1">Yang Kamu Pelajari</h2>
                <p className="text-gray-500 text-xs mt-1">Ilmu Senilai Ratusan Juta dalam Satu Ebook</p>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  {
                    num: "01",
                    title: "Cara Riset Produk Fisik yang Berpotensi Menghasilkan",
                    desc: "Temukan produk yang sudah terbukti laku keras di pasar — jauh sebelum kamu memutuskan untuk mengeluarkan modal awal."
                  },
                  {
                    num: "02",
                    title: "Pola Produk Fisik Penghasil Miliaran",
                    desc: "Kenali karakteristik produk unik apa saja yang bisa dengan mudah di-scale up ke omset yang jauh lebih besar."
                  },
                  {
                    num: "03",
                    title: "Cara Mendapatkan Supplier Terpercaya",
                    desc: "Akses sumber produk berkualitas tinggi dengan harga yang sangat murah untuk langsung kamu hubungi sendiri."
                  },
                  {
                    num: "04",
                    title: "Strategi Mendatangkan Traffic untuk Penjualan",
                    desc: "Metode mendatangkan calon pembeli potensial secara konsisten tanpa harus bergantung pada satu platform media saja."
                  },
                  {
                    num: "05",
                    title: "Step by Step Jualan walau Masih Awam",
                    desc: "Panduan lengkap dari nol mutlak — dirancang agar langsung bisa dipahami bahkan jika kamu belum pernah jualan sebelumnya."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-white transition-all duration-200">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white font-bold text-sm shadow-md shadow-blue-600/10">
                      {item.num}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-display font-bold text-base text-gray-800 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TARGET AUDIENCE SECTION - "Untuk Siapa?" */}
            <section className="flex flex-col gap-4" id="target-audience-section">
              <div className="text-center">
                <h2 className="font-display text-2.5xl font-bold tracking-tight text-gray-900">Untuk Siapa?</h2>
                <p className="text-gray-500 text-xs mt-1">Ebook Ini Tepat untuk Kamu Jika...</p>
              </div>

              <div className="bg-blue-50/20 border border-blue-100 rounded-[2rem] p-6 flex flex-col gap-4">
                {[
                  "Ingin berbisnis dari rumah tanpa harus keluar modal besar di awal",
                  "Ingin punya produk sendiri and memasarkannya secara online",
                  "Ingin omset ratusan juta hingga miliaran dari satu produk yang tepat",
                  "Masih pemula and butuh panduan yang jelas and bisa langsung diterapkan",
                  "Ingin punya penghasilan tambahan atau bahkan menggantikan gaji bulanan"
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-[13.5px] text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-600/10">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* RISK INSIGHT SECTION */}
            <section className="bg-amber-50/50 border border-amber-100/70 rounded-[2rem] p-5" id="risk-insight-section">
              <p className="text-xs text-stone-700 leading-relaxed italic text-center sm:text-left">
                "Satu kesalahan dalam memilih produk bisa menghabiskan jutaan rupiah dan berbulan-bulan waktu terbuang sia-sia. Ebook ini harganya kurang dari secangkir kopi per hari selama sebulan — tapi isinya bisa mengubah arah bisnis kamu selamanya."
              </p>
            </section>

            {/* PRICING & CHECKOUT SECTION */}
            <section className="flex flex-col gap-4" id="pricing-section">
              <div className="text-center">
                <span className="text-xs font-mono text-blue-600 tracking-wider uppercase font-semibold">Investasi Sekali, Ilmu Selamanya</span>
                <h2 className="font-display text-2.5xl font-bold tracking-tight text-gray-900 mt-1">Masih Ragu Investasi Rp149.000?</h2>
                <p className="text-gray-500 text-xs mt-2 max-w-sm mx-auto">
                  Pertanyaannya: Berapa mahal harga "nggak tahu" yang sudah kamu bayar selama ini?
                </p>
              </div>

              {/* Minimalist Pricing Card */}
              <div className="bg-stone-950 text-[#FAF9F6] rounded-[2.5rem] p-8 border border-stone-800/80 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                {/* Tag / Badge */}
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 rounded-bl-xl uppercase">
                  Promo Terbatas
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-blue-400 font-mono text-xs tracking-wider uppercase font-semibold">
                    📖 Ebook Digital · Akses Seumur Hidup
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                    Investasi Sekali, Ilmu Selamanya
                  </h3>
                </div>

                <div className="flex items-baseline gap-3 my-1">
                  <span className="text-stone-500 text-sm line-through decoration-red-500 decoration-2">
                    Rp 299.000
                  </span>
                  <span className="text-3xl font-display font-extrabold text-blue-400 tracking-tight">
                    Rp 149.000
                  </span>
                  <span className="text-stone-400 text-xs">
                    (Hemat 50%)
                  </span>
                </div>

                <p className="text-stone-300 text-xs border-b border-stone-800 pb-4 leading-relaxed">
                  Bayar sekali · Akses langsung secara instan · Bisa dibaca kapan saja & di mana saja
                </p>

                {/* CTA Button in box */}
                <div className="flex flex-col gap-2">
                  <a 
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-blue-600/10 transition-all text-[15px]"
                  >
                    DAPATKAN EBOOK SEKARANG →
                  </a>
                  <span className="text-center text-[10px] text-stone-400 font-mono">
                    🔥 Harga Promo Terbatas! Harga bisa naik kapan saja — amankan sekarang
                  </span>
                </div>

                {/* "Sudah Termasuk" checklist inside price container for maximum visual layout density */}
                <div className="bg-stone-900/80 border border-stone-800 p-5 rounded-2xl flex flex-col gap-3 mt-2">
                  <span className="text-xs font-mono text-stone-300 tracking-wider uppercase">Sudah Termasuk:</span>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Ebook Cuan dari Rumah (PDF lengkap)",
                      "Metode riset produk fisik terbukti",
                      "Strategi mendapatkan supplier terpercaya",
                      "Blueprint traffic & penjualan beromset tinggi",
                      "Step by step dari nol hingga omset miliaran",
                      "Akses seumur hidup · Update gratis selamanya"
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 leading-relaxed italic border-t border-stone-800/60 pt-4">
                  ⚠️ Harga Rp149.000 adalah harga promo khusus. Kami berhak menaikkan harga sewaktu-waktu kembali ke harga normal tanpa pemberitahuan sebelumnya.
                </p>
              </div>
            </section>

            {/* FAQ SECTION - "Sering Ditanyakan" */}
            <section className="flex flex-col gap-4" id="faq-section">
              <div className="text-center">
                <span className="text-xs font-mono text-blue-600 tracking-wider uppercase font-semibold">Tanya Jawab</span>
                <h2 className="font-display text-2.5xl font-bold tracking-tight text-gray-900 mt-1">Sering Ditanyakan</h2>
              </div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-gray-50/30 transition-colors"
                      >
                        <span className="font-display font-bold text-[14px] text-gray-800 leading-tight">
                          {faq.q}
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-5 pt-0 border-t border-gray-100 text-gray-500 text-[13px] leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* BOTTOM FINAL CTA */}
            <section className="text-center flex flex-col gap-3 py-6 border-t border-gray-100" id="final-cta">
              <p className="text-xs font-mono tracking-wider text-blue-600 uppercase font-semibold">
                MULAI BISNIS TANPA RAGU
              </p>
              <div className="px-2">
                <a 
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white text-lg font-bold py-5 rounded-2xl hover:bg-black shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  AMANKAN HARGA PROMO SEKARANG →
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-1 italic">
                *Amankan ilmu seumur hidup Anda sekarang sebelum harga promo berakhir.
              </p>
            </section>

            {/* FOOTER */}
            <footer className="text-center flex flex-col items-center gap-2 border-t border-gray-100 pt-6 pb-4 text-gray-400" id="brand-footer">
              <p className="text-[11px] text-gray-400 mt-4">
                © 2026 Lynkidhub
              </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}
