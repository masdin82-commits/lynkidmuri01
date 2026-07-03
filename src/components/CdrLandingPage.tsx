import { ShieldCheck, ArrowLeft, Sparkles, BookOpen, Smartphone, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function CdrLandingPage() {
  // CATATAN UNTUK PENGGUNA:
  // Anda bisa mengganti seluruh isi file ini dengan kode React Landing Page baru Anda (misalnya dari file App.tsx di project Anda yang lain).
  // Pastikan Anda mengimpor ikon yang sesuai dari 'lucide-react' jika diperlukan.

  const ctaLink = "https://lynk.id/lynkidhub/";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden pb-24 relative">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Navigation Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-20 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-amber-400 font-black tracking-wider text-xl">LYNKIDHUB</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-mono">CDR</span>
        </a>
        <div className="text-xs text-slate-400">
          <a href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Utama
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 relative z-10">
        
        {/* Header Titles */}
        <div className="text-center space-y-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            Halaman /cdr Siap Digunakan!
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Landing Page baru Anda
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mt-1">
                Akan Muncul Di Sini
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-400 tracking-wider uppercase pt-2">
              Berasal dari file /src/components/CdrLandingPage.tsx
            </p>
          </motion.div>
        </div>

        {/* Tutorial Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-sm max-w-2xl mx-auto space-y-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Cara Mengisi Landing Page Ini:
          </h3>

          <ol className="space-y-4 text-slate-300 text-sm sm:text-base list-decimal list-inside leading-relaxed">
            <li>
              Buka kode landing page baru Anda yang sudah dibuat sebelumnya.
            </li>
            <li>
              Ambil isi file komponen utama Anda (biasanya di file <code>App.tsx</code> atau komponen halaman utama di project tersebut).
            </li>
            <li>
              Tempelkan (paste) kode tersebut ke dalam file ini: <code className="text-amber-400">/src/components/CdrLandingPage.tsx</code>.
            </li>
            <li>
              Sesuaikan impor gambar atau aset lainnya di dalam folder <code>/src/assets</code> jika halaman baru Anda memiliki gambar/banner sendiri.
            </li>
          </ol>

          {/* Callout */}
          <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-amber-300 mt-4">
            <Smartphone className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base leading-relaxed">
              Dengan metode modular ini, kode Anda tetap bersih, terorganisir, dan memanfaatkan performa super cepat dari <strong>Vite + React</strong>!
            </p>
          </div>

          {/* Back Action Button */}
          <div className="pt-4 flex justify-center">
            <a 
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              DAFTAR SEKARANG DI LYNK.ID
              <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
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
