import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, User, Home, Grid, Heart, ShieldCheck, 
  ArrowRight, CheckCircle, Trash2, CreditCard, Sparkles,
  Ruler
} from 'lucide-react';

// Sample Men's Oversized Streetwear Hoodie Data
const STREETWEAR_HOODIES = [
  {
    id: 'h1',
    name: 'Heavyweight Boxy Hoodie',
    price: 95,
    tag: 'Best Seller',
    gsm: '480 GSM French Terry',
    colors: ['#0f172a', '#475569', '#f8fafc'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700',
    fit: 'Boxy / Dropped Shoulder',
    category: 'Streetwear'
  },
  {
    id: 'h2',
    name: 'Acid Wash Vintage Pullover',
    price: 110,
    tag: 'Limited Drop',
    gsm: '520 GSM Fleece',
    colors: ['#1e293b', '#334155'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700',
    fit: 'Extreme Oversized',
    category: 'Streetwear'
  },
  {
    id: 'h3',
    name: 'Gothic Graphic Oversized Hoodie',
    price: 125,
    tag: 'Trending',
    gsm: '450 GSM Cotton',
    colors: ['#09090b', '#dc2626'],
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700',
    fit: 'Relaxed Street Fit',
    category: 'Streetwear'
  },
  {
    id: 'h4',
    name: 'Minimalist Zip-Up Oversized Hoodie',
    price: 105,
    tag: 'Essential',
    gsm: '400 GSM Soft Terry',
    colors: ['#f1f5f9', '#09090b'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700',
    fit: 'Drop Shoulder Zip',
    category: 'Streetwear'
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('streetwear'); // 'home' | 'streetwear' | 'cart' | 'checkout' | 'auth'
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [favorites, setFavorites] = useState([]);

  // Size Recommender State
  const [isSizeWizardOpen, setIsSizeWizardOpen] = useState(false);
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(74);
  const [fitPreference, setFitPreference] = useState('oversized');

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Size Calculation Algorithm
  const calculateRecommendedSize = () => {
    let score = heightCm * 0.4 + weightKg * 0.6;
    let baseSize = 'M';
    if (score < 110) baseSize = 'S';
    else if (score >= 110 && score < 125) baseSize = 'M';
    else if (score >= 125 && score < 140) baseSize = 'L';
    else baseSize = 'XL';

    if (fitPreference === 'extreme') {
      if (baseSize === 'S') return 'M';
      if (baseSize === 'M') return 'L';
      if (baseSize === 'L') return 'XL';
      return '2XL';
    }
    return baseSize;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20 md:pb-0">
      
      {/* 1. TOP RESPONSIVE NAVBAR */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setActivePage('home')}>
            <span className="text-2xl font-black tracking-widest uppercase text-white">BLACK</span>
            <span className="text-2xl font-black tracking-widest uppercase text-sky-400">SKY</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium text-zinc-300">
            <button onClick={() => setActivePage('home')} className={`hover:text-sky-400 transition ${activePage === 'home' && 'text-sky-400 font-bold'}`}>Home</button>
            <button onClick={() => setActivePage('streetwear')} className={`hover:text-sky-400 transition ${activePage === 'streetwear' && 'text-sky-400 font-bold'}`}>Men's Hoodies</button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSizeWizardOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 text-xs font-bold text-zinc-300 px-3 py-2 rounded-xl transition"
            >
              <Ruler className="w-4 h-4 text-sky-400" />
              <span>Fit Wizard</span>
            </button>

            <button 
              onClick={() => setActivePage('cart')} 
              className="relative p-2 hover:bg-zinc-900 rounded-full transition"
            >
              <ShoppingBag className="w-6 h-6 text-zinc-200" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-sky-500 text-zinc-950 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActivePage('auth')} 
              className="hidden md:flex items-center space-x-2 bg-sky-500 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm hover:bg-sky-400 transition"
            >
              <User className="w-4 h-4" />
              <span>{user ? user.name : 'Sign In'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN ROUTER VIEWS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900 text-white p-8 md:p-16 flex flex-col justify-center min-h-[420px] border border-zinc-800">
                <img 
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200" 
                  alt="Hero BLACKSKY" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 max-w-xl space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full font-bold">2026 BLACKSKY Drop</span>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight uppercase">Raw Streetwear Aesthetics</h1>
                  <p className="text-zinc-400">Heavyweight French Terry cotton, drop-shoulder silhouettes, and custom-milled dark textiles.</p>
                  <button 
                    onClick={() => setActivePage('streetwear')}
                    className="inline-flex items-center space-x-2 bg-sky-500 text-zinc-950 font-bold px-6 py-3.5 rounded-2xl hover:bg-sky-400 transition shadow-lg shadow-sky-500/20"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STREETWEAR HOODIES PAGE */}
          {activePage === 'streetwear' && (
            <motion.div 
              key="streetwear"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Category Header */}
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-xs font-mono uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Heavyweight Hoodies • BLACKSKY Series</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                  Men's Oversized <span className="text-sky-400">Streetwear</span>
                </h1>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STREETWEAR_HOODIES.map((hoodie) => (
                  <motion.div
                    key={hoodie.id}
                    whileHover={{ y: -6 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
                      <img 
                        src={hoodie.image} 
                        alt={hoodie.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100" 
                      />
                      <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-200 text-[10px] font-mono uppercase px-2.5 py-1 rounded-md font-bold">
                        {hoodie.tag}
                      </span>
                      <button 
                        onClick={() => toggleFavorite(hoodie.id)}
                        className="absolute top-3 right-3 p-2 bg-zinc-950/60 backdrop-blur-md rounded-full text-zinc-300 hover:text-red-400 transition"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(hoodie.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-2 rounded-xl text-[10px] text-zinc-400 font-mono flex justify-between">
                        <span>{hoodie.gsm}</span>
                        <span className="text-sky-400 font-bold">{hoodie.fit}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-zinc-100 text-sm group-hover:text-sky-400 transition">{hoodie.name}</h3>
                        <p className="text-zinc-400 font-mono text-xs font-extrabold mt-1">${hoodie.price}.00</p>
                      </div>
                      <div className="flex items-center space-x-1.5 pt-1">
                        {hoodie.colors.map((color, idx) => (
                          <span key={idx} className="w-3.5 h-3.5 rounded-full border border-zinc-700" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <button 
                        onClick={() => addToCart(hoodie)}
                        className="w-full bg-zinc-800 hover:bg-sky-500 hover:text-zinc-950 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CART PAGE */}
          {activePage === 'cart' && (
            <motion.div 
              key="cart"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <h1 className="text-3xl font-bold">Your Bag ({cart.length})</h1>
              {cart.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900 rounded-3xl border border-zinc-800 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-zinc-600 mx-auto" />
                  <p className="text-zinc-400">Your bag is empty.</p>
                  <button onClick={() => setActivePage('streetwear')} className="bg-sky-500 text-zinc-950 px-6 py-2.5 rounded-xl font-bold">Browse BLACKSKY</button>
                </div>
              ) : (
                <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-zinc-400 text-sm">${item.price} × {item.qty}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:bg-zinc-800 p-2 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-sky-400">${cartTotal}.00</span>
                  </div>
                  <button 
                    onClick={() => setActivePage('checkout')}
                    className="w-full bg-sky-500 text-zinc-950 font-bold py-3.5 rounded-2xl hover:bg-sky-400 transition flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* CHECKOUT PAGE */}
          {activePage === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6"
            >
              <div className="flex items-center space-x-2 text-sky-400">
                <ShieldCheck className="w-6 h-6" />
                <h1 className="text-2xl font-bold text-white">BLACKSKY Sandbox Payment</h1>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Cardholder Name</label>
                  <input type="text" placeholder="Alex Morgan" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="4242 •••• •••• 4242" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 pl-10 focus:outline-sky-500 text-white" />
                    <CreditCard className="w-5 h-5 text-zinc-500 absolute left-3 top-3.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Expiry</label>
                    <input type="text" placeholder="12/28" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert('Order successfully processed!');
                  setCart([]);
                  setActivePage('home');
                }}
                className="w-full bg-emerald-500 text-zinc-950 font-bold py-4 rounded-2xl hover:bg-emerald-400 transition flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Pay ${cartTotal}.00</span>
              </button>
            </motion.div>
          )}

          {/* AUTHENTICATION PAGE */}
          {activePage === 'auth' && (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">{authMode === 'login' ? 'Welcome Back' : 'Join BLACKSKY'}</h1>
                <p className="text-zinc-400 text-sm">Access exclusive streetwear drops and size presets.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setUser({ name: 'Alex' }); setActivePage('streetwear'); }} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Full Name</label>
                    <input type="text" required placeholder="Alex Morgan" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Email</label>
                  <input type="email" required placeholder="alex@blacksky.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Password</label>
                  <input type="password" required placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:outline-sky-500 text-white" />
                </div>

                <button type="submit" className="w-full bg-sky-500 text-zinc-950 font-bold py-3.5 rounded-2xl hover:bg-sky-400 transition">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="text-center text-sm text-zinc-400">
                {authMode === 'login' ? "Don't have an account?" : "Already registered?"}{' '}
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-sky-400 font-bold underline ml-1"
                >
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. SIZE & FIT RECOMMENDER MODAL */}
      <AnimatePresence>
        {isSizeWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl max-w-md w-full space-y-6 relative"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-5 h-5 text-sky-400" />
                  <h2 className="text-lg font-bold">Hoodie Size Recommender</h2>
                </div>
                <button onClick={() => setIsSizeWizardOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Height:</span>
                    <span className="text-sky-400 font-bold">{heightCm} cm</span>
                  </div>
                  <input type="range" min="150" max="205" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full accent-sky-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Weight:</span>
                    <span className="text-sky-400 font-bold">{weightKg} kg</span>
                  </div>
                  <input type="range" min="45" max="120" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full accent-sky-500" />
                </div>

                <div>
                  <label className="block mb-2">Drape & Silhouette Preference:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['regular', 'oversized', 'extreme'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFitPreference(type)}
                        className={`p-2 rounded-xl border text-[10px] uppercase font-bold transition ${
                          fitPreference === type ? 'bg-sky-500 border-sky-400 text-zinc-950' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-center space-y-1">
                <span className="text-xs text-zinc-400 font-mono">Recommended Size:</span>
                <div className="text-3xl font-black text-sky-400">{calculateRecommendedSize()}</div>
              </div>

              <button 
                onClick={() => setIsSizeWizardOpen(false)}
                className="w-full bg-sky-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-sky-400 transition"
              >
                Apply Size Preset
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MOBILE STICKY BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 md:hidden z-40 flex justify-around py-3">
        <button onClick={() => setActivePage('home')} className={`flex flex-col items-center space-y-1 ${activePage === 'home' ? 'text-sky-400' : 'text-zinc-500'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => setActivePage('streetwear')} className={`flex flex-col items-center space-y-1 ${activePage === 'streetwear' ? 'text-sky-400' : 'text-zinc-500'}`}>
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Hoodies</span>
        </button>
        <button onClick={() => setActivePage('cart')} className={`flex flex-col items-center space-y-1 relative ${activePage === 'cart' ? 'text-sky-400' : 'text-zinc-500'}`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold">Bag</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 right-2 bg-sky-500 text-zinc-950 text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
        <button onClick={() => setActivePage('auth')} className={`flex flex-col items-center space-y-1 ${activePage === 'auth' ? 'text-sky-400' : 'text-zinc-500'}`}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Account</span>
        </button>
      </div>

    </div>
  );
}