import { BookOpen, Gift, CheckCircle, Award, Smartphone, Globe, Sparkles, ChevronRight, Calendar, Clock, MapPin, ShieldCheck, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function NewLandingPage() {
  const ctaLink = "https://lynk.id/lynkidhub/"; // Placeholder link to LYNK.ID

  const keunggulanList = [
    { id: 1, text: "Akses Materi Selamanya (Belajar kapan saja & di mana saja)" },
    { id: 2, text: "Praktik Terarah dengan Studi Kasus Nyata" },
    { id: 3, text: "Template & Tools Siap Pakai untuk Bisnis Anda" },
    { id: 4, text: "Grup Komunitas Eksklusif untuk Diskusi & Networking" }
  ];

  const materiList = [
    { id: 1, text: "Mindset Jutawan Digital & Peluang Produk Digital 2026" },
    { id: 2, text: "Menemukan Niche Market yang Sangat Menguntungkan" },
    { id: 3, text: "Strategi Copywriting yang Menjual Tanpa Terlihat Menjual" },
    { id: 4, text: "Langkah-Langkah Pembuatan Produk Digital Pertama Anda" },
    { id: 5, text: "Otomatisasi Penjualan Menggunakan Platform LYNK.ID" },
    { id: 6, text: "Scale Up Bisnis dengan Instagram & TikTok Ads" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden pb-24 relative">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-[600px] right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-20 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-amber-400 font-black tracking-wider text-xl">LYNKIDHUB</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-mono">ONLINE</span>
        </a>
        <div className="text-xs text-slate-400">
          <a href="/" className="hover:text-amber-400 transition-colors">← Kembali ke Utama</a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 relative z-10">
        
        {/* Header Titles */}
        <div className="text-center space-y-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            E-Learning Series • Belajar Online Mandiri
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Kelas Online
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mt-1">
                Digital Product Mastery
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-400 tracking-wider uppercase pt-2">
              Langkah Demi Langkah Membangun Passive Income dari Internet
            </p>
          </motion.div>
        </div>

        {/* Video / Promo Image Banner Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-blue-500/5 mb-12 bg-slate-900 p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
        >
          {/* A beautiful visual card representing a digital masterclass banner */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-slate-950 opacity-90" />
          <div className="relative z-10 space-y-4 max-w-lg mx-auto">
            <PlayCircle className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">Masterclass Video Course</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Dapatkan akses langsung ke 12 modul video eksklusif, worksheet interaktif, dan library template digital senilai jutaan rupiah.
            </p>
          </div>
        </motion.div>

        {/* Quick Registration Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm mb-12"
        >
          <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Akses Instan Dibuka Setiap Hari 24/7!
          </p>
          <a 
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-amber-500/20 w-full sm:w-auto min-w-[280px]"
          >
            MULAI BELAJAR SEKARANG
            <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Keunggulan & Manfaat Event Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm mb-12 shadow-lg space-y-6"
        >
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            Mengapa Memilih Kelas Ini?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {keunggulanList.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid Materi Pembelajaran */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
                <BookOpen className="w-5 h-5" />
              </span>
              Kurikulum & Modul Belajar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {materiList.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-slate-300 p-3 bg-slate-950/40 rounded-xl border border-slate-800/30">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold shrink-0">
                    {item.id}
                  </span>
                  <span className="text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Sales Copy / Persuasion */}
        <motion.section 
          className="prose prose-invert max-w-none bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm mb-16 space-y-6"
        >
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            Banyak orang ingin memulai bisnis online tapi bingung harus mulai dari mana. Menjual produk fisik membutuhkan modal stok barang dan ribet mengurus pengiriman paket.
          </p>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            <strong>Produk Digital adalah solusinya!</strong> Anda hanya perlu membuatnya sekali, lalu bisa menjualnya ribuan kali tanpa pusing memikirkan biaya produksi ulang maupun pengiriman barang.
          </p>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            Di dalam e-learning eksklusif ini, kami membongkar seluruh rahasia sukses bagaimana kami membangun omset puluhan juta per bulan hanya berbekal produk digital dan smartphone.
          </p>

          <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-amber-300 my-8">
            <Smartphone className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base leading-relaxed">
              Materi disusun secara sistematis, ramah pemula, dan sangat mudah dipraktikkan langsung menggunakan smartphone Anda.
            </p>
          </div>
        </motion.section>

        {/* Final Registration CTA Box */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center space-y-4 py-8 px-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border-2 border-amber-500/30 max-w-2xl mx-auto shadow-2xl shadow-amber-500/5"
        >
          <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Dapatkan Akses Instan Hari Ini
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Mulai Bangun Kerajaan Bisnis Digital Anda!
          </h3>

          {/* Pricing Box */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 max-w-sm mx-auto my-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Investasi Belajar</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-slate-500 text-base line-through decoration-red-500 decoration-2 font-medium">Rp2.500.000</span>
              <span className="text-amber-400 font-black text-3xl tracking-tight">Rp1.850.000</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide">Hemat Rp650.000 selama masa promo!</p>
            
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center gap-2 text-xs text-amber-500 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Garansi Balik Modal 100%</span>
            </div>
          </div>

          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Klik tombol di bawah ini untuk langsung terhubung dengan layanan pendaftaran resmi kami di LYNK.ID
          </p>
          <div className="pt-2">
            <a 
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg px-10 py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-amber-500/20 w-full sm:w-auto min-w-[300px]"
            >
              DAFTAR SEKARANG
              <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

      </main>

      {/* Footer Section */}
      <footer className="mt-16 border-t border-slate-900 pt-6 pb-6 text-center text-xs text-slate-600">
        <div className="max-w-4xl mx-auto px-4">
          <p>© Lynkidhub. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
