import React from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar({
  inputValue,
  handleInputChange,
  handleKeyDown,
  handleExecuteSearch,
  isDropdownOpen,
  setIsDropdownOpen,
  suggestions,
  searchContainerRef,
}) {
  return (
    <header className="bg-white/90 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 xl:px-12 py-5 flex items-center justify-between gap-8">
        {/* LOGO */}
        <div className="flex items-center gap-4 shrink-0 cursor-pointer">
          <div className="w-12 h-12 bg-eco-cyan rounded-2xl flex items-center justify-center text-white shadow-lg shadow-eco-cyan/30 transform transition-transform hover:scale-105">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div className="hidden lg:block leading-none">
            <h1 className="font-heading font-black text-2xl text-slate-900 tracking-tight">
              Eco Market
            </h1>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">
              B2B & B2C Hub
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-3xl relative" ref={searchContainerRef}>
          <div
            className={`flex items-center bg-slate-100/70 pl-6 pr-2 py-2 border focus-within:border-eco-cyan focus-within:bg-white focus-within:shadow-xl focus-within:shadow-eco-cyan/10 transition-all duration-300 ${isDropdownOpen && suggestions.length > 0 ? "rounded-t-3xl border-slate-200 border-b-transparent" : "rounded-full border-slate-200/80"}`}
          >
            <svg
              className="w-6 h-6 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={() =>
                inputValue && suggestions.length > 0 && setIsDropdownOpen(true)
              }
              placeholder="Cari material industri (B2B) atau produk UMKM (B2C)..."
              className="w-full bg-transparent px-4 outline-none text-base text-slate-800 placeholder-slate-400 font-medium"
            />
            <button
              onClick={() => handleExecuteSearch()}
              className="bg-slate-900 hover:bg-eco-cyan text-white px-8 py-3 rounded-full text-sm font-bold font-heading transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
            >
              Cari
            </button>
          </div>

          {/* DROPDOWN SEARCH SUGGESTIONS */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-eco-cyan/30 shadow-2xl rounded-b-3xl overflow-hidden z-50 animate-fadeIn flex flex-col">
              <div className="px-6 py-2 bg-slate-50/50 border-b border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Rekomendasi Pencarian
                </span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleExecuteSearch(suggestion)}
                  className="w-full text-left px-6 py-3.5 hover:bg-slate-50 text-sm font-bold text-slate-700 hover:text-eco-cyan transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-slate-300"
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
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AKSI KANAN & PROFIL */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="relative text-slate-400 hover:text-eco-cyan transition-colors p-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
            <span className="absolute top-1 right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          {/* KOMPONEN DROPDOWN PROFIL DI-INJECT DI SINI */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
