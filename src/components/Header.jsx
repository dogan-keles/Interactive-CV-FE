import { Sparkles } from 'lucide-react';

function Header({ darkMode }) {
  return (
    <header className="text-center mb-8 animate-fadeIn">
      {/* Profil Fotoğrafı Alanı */}
      <div className="relative inline-block mb-6">
        <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-emerald-300 shadow-2xl shadow-emerald-500/20`}>
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-200">
            <img
              src="/linkedin_photo.jpeg"
              alt="Doğan Keleş"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Eğer fotoğraf yüklenemezse fallback olarak DK yazısını gösterir
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="flex items-center justify-center h-full text-2xl font-bold text-slate-700">DK</span>';
              }}
            />
          </div>
        </div>

        {/* Fotoğrafın sağ altına küçük bir "active" ikonu (opsiyonel) */}
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
      </div>

      <h1 className={`text-5xl font-extrabold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        Doğan Keleş
      </h1>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
        <h2 className={`text-xl font-semibold tracking-wide ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Interactive AI-Powered CV
        </h2>
      </div>

      <p className={`max-w-2xl mx-auto leading-relaxed text-lg ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Adayın deneyimi, yetenekleri ve GitHub aktiviteleri hakkında her şeyi sorabilirsiniz.
        Size doğal ve detaylı yanıtlar vermek için buradayım.
      </p>
    </header>
  );
}

export default Header;