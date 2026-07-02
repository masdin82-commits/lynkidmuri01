import { BookOpen, Gift, CheckCircle, Award, Smartphone, Users, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import bannerImg from './assets/images/hero_banner_1782962721468.jpg';
import mentorImg from './assets/images/muri_handayani_1782962735205.jpg';

export default function App() {
  const ctaLink = "https://lynk.id/lynkidhub/andP75b/";

  const materiList = [
    { id: 1, text: "Pengenalan 50 Produk Digital" },
    { id: 2, text: "Optimasi AI untuk Produk Digital" },
    { id: 3, text: "Tutorial Lengkap LYNK.ID untuk bisnis produk fisik, digital & jasa" },
    { id: 4, text: "Tes minat bakat untuk menentukan bisnis yang tepat" },
    { id: 5, text: "Instagram Marketing Organik + Boost Post yang profitable" },
    { id: 6, text: "Automation untuk Memudahkan Pemasaran" }
  ];

  const bonusList = [
    { id: 1, text: "6 Video materi belajar" },
    { id: 2, text: "Support Grup 3 Bulan" },
    { id: 3, text: "Tools AI membangun personal branding" },
    { id: 4, text: "Tools AI Analisa Akun Instagram" }
  ];

  const detailMateriList = [
    { id: 1, text: "Pengenalan 50 Produk Digital." },
    { id: 2, text: "Optimasi AI untuk Produk Digital." },
    { id: 3, text: "Tutorial lengkap LYNK.ID untuk bisnis produk fisik, digital & jasa." },
    { id: 4, text: "Tes Minat Bakat untuk Menentukan Bisnis yang Tepat." },
    { id: 5, text: "Instagram Marketing Organik + Boost Post yang profitable." },
    { id: 6, text: "Automation untuk Memudahkan Pemasaran." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden pb-24 relative">
      
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-[800px] left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 relative z-10">
        
        {/* Header Titles */}
        <div className="text-center space-y-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase"
          >
            <Award className="w-4 h-4" />
            Kelas Offline Bandung • Sabtu, 18 Juli 2026
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Kelas Offline
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mt-1">
                Bisnis Online Dari Rumah
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-400 tracking-wider uppercase pt-2">
              Produk Digital, Produk Fisik, & Jasa
            </p>
          </motion.div>
        </div>

        {/* Hero Image Banner Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-amber-500/5 mb-12 bg-slate-900"
          id="banner"
        >
          <img 
            src={bannerImg} 
            alt="Kelas Offline SBO Bandung Banner" 
            className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Primary CTA Block Above Content */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm mb-12"
        >
          <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Kuota Terbatas! Amankan Slot Anda Sekarang
          </p>
          <a 
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-amber-500/20 w-full sm:w-auto min-w-[280px]"
            id="primary-cta-btn"
          >
            DAFTAR SEKARANG
            <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Waktu & Tempat Event Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm mb-12 shadow-lg"
          id="event-schedule-location"
        >
          {/* Waktu */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-lg font-extrabold">Sabtu, 18 Juli 2026</p>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>08.00 - 17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Tempat */}
          <div className="flex items-start gap-4 border-t border-slate-800/60 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-6 md:border-slate-800/60">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-lg font-extrabold">Kantor SBO</p>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                Jl. Cihanjuang No.132, Parongpong, Bandung Barat, Jawa Barat
              </p>
            </div>
          </div>
        </motion.div>

        {/* Structured Info: Materi & Bonus Column Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* List Materi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 relative overflow-hidden group hover:border-amber-500/20 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
              <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
                <BookOpen className="w-5 h-5" />
              </span>
              Materi Pembelajaran
            </h3>
            <ul className="space-y-4">
              {materiList.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-slate-300">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mt-0.5 shrink-0">
                    {item.id}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* List Bonus */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 relative overflow-hidden group hover:border-amber-500/20 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
              <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
                <Gift className="w-5 h-5" />
              </span>
              Bonus Eksklusif
            </h3>
            <ul className="space-y-4">
              {bonusList.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-slate-300">
                  <span className="flex items-center justify-center p-1 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Detailed Description Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="prose prose-invert max-w-none bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm mb-16 space-y-6"
        >
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            Saya paham, sebagian orang lebih senang belajar langsung secara tatap muka (offline) dibanding dengan metode belajar online (via zoom atau video).
          </p>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            Untuk itulah kelas ini hadir memenuhi harapan Anda. Selama 8 jam, Anda akan belajar langsung dengan <strong>Muri Handayani</strong>.
          </p>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            Anda akan dipandu bagaimana menjadi sosok yang bisa punya penghasilan besar dengan cara yang cukup sederhana. Namun kuncinya Anda harus memiliki keinginan belajar yang kuat, ketekunan menjalani proses dan sabar meningkatkan progresnya.
          </p>

          {/* 6 Hal yang Dapatkan Box */}
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800/80 my-8">
            <h4 className="text-amber-400 font-extrabold text-base tracking-wide uppercase mb-4">
              6 hal ini yang akan Anda dapatkan dari sesi belajarnya:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detailMateriList.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-slate-300">
                  <span className="text-amber-500 font-black shrink-0">{item.id}.</span>
                  <span className="text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-amber-300 mb-8">
            <Smartphone className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base leading-relaxed">
              Semua itu bisa Anda praktekkan <strong>tanpa menggunakan laptop/komputer</strong>. Cukup mengoptimalkan <strong>smartphone Anda saja</strong>.
            </p>
          </div>

          {/* Mentor Profile Details inside description */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={mentorImg} 
              alt="Muri Handayani Mentor" 
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-400 shrink-0 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-left">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                <strong>Muri Handayani</strong> sudah menekuni Digital Marketing sejak 2009. Kini giliran Anda mengikuti jejaknya untuk mendapatkan hasil yang sama seperti yang Muri sudah dapatkan, atau bahkan lebih banyak.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-slate-800/50">
            <p className="text-red-400 font-extrabold tracking-widest uppercase text-sm sm:text-base">
              ⚠️ TEMPAT TERBATAS
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
            Daftar Sekarang Juga
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Memulai Bisnis Anda Dari Rumah?
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Klik tombol di bawah ini untuk langsung terhubung dengan layanan pendaftaran resmi kami di LYNK.ID
          </p>
          <div className="pt-2">
            <a 
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg px-10 py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-amber-500/20 w-full sm:w-auto min-w-[300px]"
              id="final-cta-btn"
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
