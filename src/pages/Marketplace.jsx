import React, { useState, useEffect } from "react";
import { CATEGORIES, B2B_PRODUCTS, B2C_PRODUCTS } from "../constants/dummyData";

// Fungsi Pembantu: Pemetaan Ikon SVG untuk Kategori (Lightweight, Tanpa Dependensi)
const getCategoryIcon = (categoryName) => {
  const iconClass = "w-6 h-6 mb-2";
  switch (categoryName) {
    case "Home & Living":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      );
    case "Fashion & Accessories":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      );
    case "Stationery & Office":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      );
    case "Upcycling Product":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      );
    case "Industrial Materials":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      );
    default: // "Semua Kategori"
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      );
  }
};

export default function MarketplaceHome() {
  const [activeTab, setActiveTab] = useState("B2C");
  const [activeCategory, setActiveCategory] = useState("Semua Kategori");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-eco-light font-body text-slate-700">
      {/* HEADER NAVIGASI GLOBAL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <svg
              className="w-8 h-8 text-eco-cyan"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight hidden sm:block">
              EcoMarket
            </span>
          </div>

          <div className="flex-1 max-w-3xl flex items-center bg-slate-50 rounded-full px-5 py-2.5 border border-slate-200 focus-within:border-eco-cyan focus-within:bg-white transition-all shadow-inner">
            <svg
              className="w-5 h-5 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari material industri (B2B) atau produk UMKM (B2C)..."
              className="w-full bg-transparent px-3 outline-none text-sm text-slate-700 placeholder-slate-400 font-medium"
            />
            <button className="bg-eco-cyan text-white px-4 py-1.5 rounded-full text-xs font-bold font-heading hover:opacity-90 transition-opacity tracking-wide">
              Cari
            </button>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <button className="relative text-slate-500 hover:text-eco-cyan transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-100 shadow-sm overflow-hidden cursor-pointer hover:border-eco-cyan transition-colors">
              <img
                src="/img/avatar-default.jpg"
                alt="Profil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-10">
        {/* 1. Hero Banner Area */}
        <section className="w-full bg-eco-gradient rounded-[2.5rem] p-8 lg:p-14 text-white flex items-center justify-between relative overflow-hidden shadow-2xl shadow-eco-cyan/20">
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10">
                B2B & B2C Marketplace
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 leading-[1.15]">
              Sirkulasi Ekonomi <br />
              Masa Depan
            </h1>
            <p className="text-teal-50 text-base mb-8 leading-relaxed font-body">
              Platform pengadaan material daur ulang terverifikasi untuk
              industri dan pemasaran produk inovasi UMKM berbasis ESG.
            </p>
            <button className="bg-white text-eco-teal px-8 py-4 rounded-full font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform font-heading flex items-center gap-2">
              Mulai Eksplorasi
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/img/hero-market.png')] bg-cover bg-left  mix-blend-overlay"></div>
          <div className="absolute -right-32 -bottom-32 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[100px]"></div>
        </section>

        {/* 2. Kategori Visual dengan Ikon (Horizontal Scroll) */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold font-heading text-slate-900 tracking-tight">
              Eksplorasi Kategori
            </h2>
          </div>
          {/* Scroll container disembunyikan scrollbar-nya lewat CSS */}
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 snap-x">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 w-32 h-32 flex flex-col items-center justify-center rounded-3xl transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-eco-cyan text-white border-eco-cyan shadow-lg shadow-eco-cyan/30 transform -translate-y-1"
                      : "bg-white text-slate-600 border-slate-100 hover:border-eco-cyan hover:text-eco-cyan shadow-sm hover:shadow-md"
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span className="font-heading font-bold text-xs text-center px-2 leading-tight">
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Grid Produk Hybrid B2B / B2C */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
              Penawaran Eksklusif
            </h2>

            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl shadow-inner shrink-0">
              <button
                onClick={() => setActiveTab("B2C")}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold font-heading transition-all duration-300 cursor-pointer ${
                  activeTab === "B2C"
                    ? "bg-white text-eco-cyan shadow-sm border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Retail UMKM (B2C)
              </button>
              <button
                onClick={() => setActiveTab("B2B")}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold font-heading transition-all duration-300 cursor-pointer ${
                  activeTab === "B2B"
                    ? "bg-white text-eco-cyan shadow-sm border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Grosir Industri (B2B)
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {(activeTab === "B2C" ? B2C_PRODUCTS : B2B_PRODUCTS).map(
              (product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[1.5rem] border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-eco-cyan/40 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                  <div className="relative w-full aspect-square rounded-2xl bg-slate-50 mb-4 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50 font-medium text-xs">No Image</div>`;
                      }}
                    />
                    {activeTab === "B2B" && (
                      <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                        Industrial
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg
                        className="w-3.5 h-3.5 text-eco-primary shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] font-semibold text-slate-500 truncate">
                        {product.supplier}
                      </span>
                    </div>

                    <h3 className="font-extrabold font-heading text-slate-800 text-[15px] leading-tight mb-4 line-clamp-2 group-hover:text-eco-cyan transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <p className="text-eco-cyan font-extrabold text-lg font-heading tracking-tight">
                            {product.price}
                          </p>
                          {activeTab === "B2B" && (
                            <p className="text-[11px] text-slate-500 font-medium mt-1">
                              MOQ: {product.moq}
                            </p>
                          )}
                        </div>
                        {activeTab === "B2C" && (
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-600 font-bold text-[11px]">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {product.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
