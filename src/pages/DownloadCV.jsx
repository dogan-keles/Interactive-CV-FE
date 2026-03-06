import { useState } from 'react';
import { Download, CheckCircle, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function DownloadCV({ darkMode }) {
    const [formData, setFormData] = useState({ name: '', email: '', company: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                'https://lengthy-sarina-cypralex-fb6a4e7e.koyeb.app/api/cv/request-download',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, profile_id: 1 }),
                }
            );
            const data = await response.json();
            if (data.success) {
                window.location.href = data.download_url;
                setSuccess(true);
            } else {
                setError('İndirme başarısız.');
            }
        } catch (err) {
            setError('Sunucu hatası.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div
            className={`h-full flex items-center justify-center p-6 ${darkMode ? 'bg-black' : 'bg-slate-50'
                }`}
        >
            <div className="max-w-xl w-full relative">
                <div
                    className={`absolute -inset-4 rounded-[3rem] blur-3xl opacity-20 pointer-events-none ${darkMode ? 'bg-emerald-500' : 'bg-emerald-300'
                        }`}
                ></div>

                <div
                    className={`relative z-10 rounded-[2.5rem] border shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'
                        }`}
                >
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-10 text-white text-center">
                        <div className="inline-flex p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-xl">
                            <FileText size={48} />
                        </div>
                        <h1 className="text-3xl font-black mb-2 tracking-tight uppercase">
                            Download My CV
                        </h1>
                        <p className="text-emerald-50/80 font-medium italic text-xs tracking-widest uppercase">

                        </p>
                    </div>

                    <div className="p-10">
                        {!success ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label
                                        className={`block text-[10px] font-black tracking-[0.2em] ml-1 uppercase ${darkMode ? 'text-slate-500' : 'text-slate-400'
                                            }`}
                                    >
                                        NAME SURNAME
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 rounded-2xl border outline-none ${darkMode
                                            ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                                            }`}
                                        placeholder="Name Surname"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className={`block text-[10px] font-black tracking-[0.2em] ml-1 uppercase ${darkMode ? 'text-slate-500' : 'text-slate-400'
                                            }`}
                                    >
                                        EMail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 rounded-2xl border outline-none ${darkMode
                                            ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500'
                                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                                            }`}
                                        placeholder="example@example.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full font-black py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 ${darkMode
                                        ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-emerald-500/20'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10'
                                        }`}
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <span className="tracking-widest font-black uppercase">
                                                Download
                                            </span>
                                            <Download size={20} />
                                        </>
                                    )}
                                </button>
                                {error && (
                                    <p className="text-red-500 text-center text-sm font-bold">{error}</p>
                                )}
                            </form>
                        ) : (
                            <div className="text-center py-10">
                                <CheckCircle
                                    size={64}
                                    className="text-emerald-500 mx-auto mb-6 animate-pulse"
                                />
                                <h3
                                    className={`text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-slate-900'
                                        }`}
                                >
                                    İşlem Başarılı!
                                </h3>
                                <Link
                                    to="/"
                                    className="inline-block px-8 py-3 bg-emerald-500 text-slate-900 rounded-xl font-black hover:bg-emerald-400 uppercase tracking-tighter"
                                >
                                    Ana Sayfaya Dön
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mt-8 relative z-20">
                    <Link
                        to="/"
                        className={`group inline-flex items-center gap-2 font-black tracking-widest text-[10px] uppercase py-2 px-4 rounded-lg ${darkMode
                            ? 'text-slate-500 hover:text-emerald-400 hover:bg-white/5'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                            }`}
                    >
                        <ArrowLeft
                            size={14}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        BACK TO CHAT
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DownloadCV;