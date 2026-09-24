import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CATEGORIES_DATA,
  B2B_PRODUCTS,
  B2C_PRODUCTS,
} from "../constants/dummyData";
import Navbar from "../components/layout/Navbar";

export default function Marketplace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("B2C");
  const [activeCategory, setActiveCategory] = useState("all");

  // 1. State Pencarian Terpisah
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. State & Ref untuk Dropdown UX
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchContainerRef = useRef(null);

  // Kompilasi semua nama produk dan kategori untuk referensi Auto-Suggest
  const allKeywords = React.useMemo(() => {
    const b2bNames = B2B_PRODUCTS.map((p) => p.name);
    const b2cNames = B2C_PRODUCTS.map((p) => p.name);
    const catNames = CATEGORIES_DATA.map((c) =>
      c.title !== "Semua Kategori" ? c.title : null,
    ).filter(Boolean);
    return [...new Set([...b2bNames, ...b2cNames, ...catNames])];
  }, []);

  // Handler Klik di luar Dropdown untuk menutupnya
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler Input Ketikan
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      // Filter saran berdasarkan input (Case Insensitive)
      const filteredSuggestions = allKeywords
        .filter((keyword) =>
          keyword.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 5); // Batasi maksimal 5 rekomendasi agar rapi

      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  // Handler Eksekusi Pencarian Utama
  const handleExecuteSearch = (keyword = inputValue) => {
    setSearchQuery(keyword); // Update query yang merender grid bawah
    setInputValue(keyword); // Sinkronisasi teks di dalam input
    setIsDropdownOpen(false); // Tutup dropdown
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleExecuteSearch();
    }
  };

  // Evaluasi sumber data berdasarkan tab
  const currentProducts = activeTab === "B2C" ? B2C_PRODUCTS : B2B_PRODUCTS;

  // Algoritma Grid Bawah (Hanya dieksekusi oleh searchQuery)
  const filteredProducts = currentProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    const supplierText =
      product.supplier && typeof product.supplier === "string"
        ? product.supplier
        : product.supplier?.name || "";
    return (
      product.name.toLowerCase().includes(query) ||
      supplierText.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-eco-light font-body text-slate-700 selection:bg-eco-cyan selection:text-white">
      {/* 1. HEADER (Oversized & Clean) */}
      <Navbar
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleExecuteSearch={handleExecuteSearch}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        suggestions={suggestions}
        searchContainerRef={searchContainerRef}
      />

      {/* 2. KONTEN UTAMA */}
      {/* Lebar maksimum dinaikkan, padding horizontal diperbesar */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-8 xl:px-12 py-10 flex flex-col gap-16">
        {/* HERO SECTION (Oversized Typography) */}
        <section className="w-full bg-eco-gradient rounded-[3rem] p-10 md:p-16 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-2xl shadow-eco-cyan/20">
          <div className="relative z-10 w-full lg:w-[55%]">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-white/20 backdrop-blur-xl px-5 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase border border-white/30 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                B2B & B2C ESG MARKETPLACE
              </span>
            </div>
            {/* Font size super besar (text-5xl hingga text-7xl) sesuai trend 2026 */}
            <h2 className="text-5xl lg:text-7xl font-black font-heading mb-8 leading-[1.1] tracking-tight text-white drop-shadow-md">
              Sirkulasi Ekonomi <br className="hidden lg:block" />
              Masa Depan.
            </h2>
            <p className="text-teal-50 text-lg lg:text-xl mb-12 leading-relaxed font-body max-w-2xl font-medium">
              Platform pengadaan material daur ulang terverifikasi untuk
              industri dan akselerasi pemasaran produk inovasi UMKM ramah
              lingkungan berbasis ESG.
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-14">
              <button className="bg-white text-eco-teal px-10 py-4 rounded-full font-extrabold text-base shadow-2xl hover:shadow-eco-cyan/50 hover:scale-105 active:scale-95 transition-all font-heading flex items-center gap-3">
                Mulai Eksplorasi
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button className="bg-transparent border-2 border-white/50 text-white px-10 py-4 rounded-full font-extrabold text-base hover:bg-white/10 hover:border-white transition-all font-heading">
                Jual Limbah Industri
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t-2 border-white/10 max-w-2xl">
              <div>
                <p className="text-4xl font-black font-heading mb-2">1,400+</p>
                <p className="text-sm text-teal-100 font-semibold uppercase tracking-wider">
                  Ton Limbah Terolah
                </p>
              </div>
              <div>
                <p className="text-4xl font-black font-heading mb-2">450+</p>
                <p className="text-sm text-teal-100 font-semibold uppercase tracking-wider">
                  Mitra UMKM
                </p>
              </div>
              <div>
                <p className="text-4xl font-black font-heading mb-2">100%</p>
                <p className="text-sm text-teal-100 font-semibold uppercase tracking-wider">
                  ESG Terverifikasi
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block w-[40%]">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl shadow-black/10 transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <span className="text-base font-bold tracking-wide">
                  Circular Lifecycle
                </span>
              </div>
              <div className="space-y-5">
                <div className="bg-white/20 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <svg
                      className="w-7 h-7 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-base font-extrabold">
                        Raw Scrap Sorting
                      </p>
                      <p className="text-xs text-teal-100 font-medium">
                        89% Reduced Carbon
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-[url('/img/banner-market.png')] bg-cover bg-left opacity-30 mix-blend-overlay"></div>
        </section>

        {/* EKSPLORASI KATEGORI (3D Icons & Large Cards) */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-extrabold text-eco-cyan uppercase tracking-widest mb-2">
                Jelajahi Ekosistem
              </p>
              <h3 className="text-3xl font-black font-heading text-slate-900">
                Eksplorasi Kategori
              </h3>
            </div>
            <a
              href="#"
              className="text-base font-bold text-slate-500 hover:text-eco-cyan transition-colors flex items-center gap-2"
            >
              Lihat Semua{" "}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8">
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex-shrink-0 w-48 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${
                  activeCategory === cat.id
                    ? "bg-eco-cyan text-white border-eco-cyan shadow-2xl shadow-eco-cyan/30 scale-105"
                    : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:shadow-xl"
                }`}
              >
                {/* Pembungkus Ikon CSS 3D */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 shadow-lg border-t border-white/40 border-b border-black/10 ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : `bg-gradient-to-br ${cat.colorFrom} ${cat.colorTo} text-white ${cat.shadowColor}`
                  }`}
                >
                  <svg
                    className="w-8 h-8 drop-shadow-md"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={cat.icon} />
                  </svg>
                </div>

                <h4 className="font-extrabold text-base mb-1.5 leading-tight">
                  {cat.title}
                </h4>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${activeCategory === cat.id ? "text-teal-100" : "text-slate-400"}`}
                >
                  {cat.subtitle}
                </p>
                {cat.count && (
                  <p
                    className={`text-xs font-black px-3 py-1 rounded-lg ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-eco-primary"}`}
                  >
                    {cat.count}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* PENAWARAN EKSKLUSIF (Oversized Product Cards) */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <p className="text-sm font-extrabold text-eco-cyan uppercase tracking-widest mb-2">
                Katalog Unggulan
              </p>
              <h3 className="text-3xl font-black font-heading text-slate-900">
                Penawaran Eksklusif
              </h3>
            </div>

            <div className="flex bg-slate-100 p-2 rounded-full shadow-inner border border-slate-200 shrink-0">
              <button
                onClick={() => setActiveTab("B2C")}
                className={`px-8 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  activeTab === "B2C"
                    ? "bg-white text-eco-cyan shadow-md border border-eco-cyan/50"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Retail UMKM (B2C)
              </button>
              <button
                onClick={() => setActiveTab("B2B")}
                className={`px-8 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  activeTab === "B2B"
                    ? "bg-white text-eco-cyan shadow-md border border-eco-cyan/50"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Grosir Industri (B2B)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <p className="text-xl font-black font-heading text-slate-700">
                  Produk tidak ditemukan
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative"
                >
                  {/* Tautan Pembungkus (Ghost Link) untuk SEO & Navigasi */}
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute inset-0 z-10 rounded-[2.5rem]"
                    aria-label={`Lihat detail ${product.name}`}
                  ></Link>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 items-start pointer-events-none">
                    {product.badges?.map((badge, index) => (
                      <span
                        key={index}
                        className={`text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${badge.color}`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>

                  {/* Wishlist Button (Aman dari Ghost Link berkat z-20) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Favorit diklik!");
                    }}
                    className="absolute top-6 right-6 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 shadow-md transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* Gambar */}
                  <div className="w-full aspect-[4/3] rounded-2xl bg-slate-50 mb-6 overflow-hidden flex items-center justify-center mt-12 relative z-0 pointer-events-none">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  {/* Informasi Produk */}
                  <div className="flex-1 flex flex-col relative z-0 pointer-events-none">
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-black text-slate-700">
                        {product.rating}{" "}
                        <span className="text-slate-400 font-semibold">
                          ({product.reviewsCount} Ulasan)
                        </span>
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-lg leading-snug mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
                      {product.supplier?.name || "Mitra Anonim"}
                    </p>
                  </div>

                  {/* Harga & Tombol Aksi Restorasi */}
                  <div className="mt-auto border-t-2 border-slate-100 pt-5">
                    <div className="flex items-end gap-3 mb-5">
                      <p className="text-slate-900 font-black text-2xl font-heading">
                        Rp {product.price?.toLocaleString("id-ID")}
                      </p>
                    </div>
                    {/* Tombol Keranjang/Aksi dengan Z-Index tinggi agar bisa diklik */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Aksi produk diklik!");
                      }}
                      className={`relative z-20 w-full py-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${product.action ? product.actionColor : "text-eco-cyan bg-eco-cyan/10 hover:bg-eco-cyan hover:text-white"}`}
                    >
                      {product.action ? product.action : "+ Tambah Keranjang"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
