import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // State Auth Sementara (Nanti diganti Context/Redux)
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("ecocash_token");
    const userStr = localStorage.getItem("ecocash_user");

    if (token && userStr) {
      try {
        return { isLoggedIn: true, user: JSON.parse(userStr) };
      } catch (error) {
        return { isLoggedIn: false, user: null };
      }
    }
    return { isLoggedIn: false, user: null };
  });

  // Handler klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("ecocash_token");
    localStorage.removeItem("ecocash_role");
    localStorage.removeItem("ecocash_user");
    setAuthState({ isLoggedIn: false, user: null });
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {!authState.isLoggedIn ? (
        <div className="flex items-center gap-3 border-l-2 border-slate-200 pl-6 ml-2">
          <button
            onClick={() => handleNavigation("/login")}
            className="text-sm font-bold text-slate-600 hover:text-eco-cyan transition-colors cursor-pointer"
          >
            Masuk
          </button>
          <button
            onClick={() => handleNavigation("/register")}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-eco-cyan transition-colors shadow-lg cursor-pointer"
          >
            Daftar
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 border-l-2 border-slate-200 pl-6 ml-2 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 font-bold font-heading text-sm flex items-center justify-center border-2 border-emerald-200 shadow-sm group-hover:border-eco-cyan transition-all">
            {authState.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-sm font-bold text-slate-800 group-hover:text-eco-cyan transition-colors line-clamp-1">
              {authState.user?.name}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Dashboard Saya
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}

      {/* ISI DROPDOWN MENU */}
      {isOpen && authState.isLoggedIn && (
        <div className="absolute right-0 top-[calc(100%+1.5rem)] w-72 bg-white rounded-[1.5rem] border border-slate-100 shadow-2xl overflow-hidden z-50 animate-fadeIn">
          <div className="bg-slate-50 p-5 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Saldo EcoCash
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-black font-heading text-slate-900">
                Rp {authState.user?.balance?.toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => handleNavigation("/wallet/topup")}
                className="w-8 h-8 rounded-full bg-eco-cyan text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-3">
            <button
              onClick={() => handleNavigation("/profile")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-eco-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm font-bold text-slate-700 group-hover:text-eco-cyan">
                Profil & QR Anggota
              </span>
            </button>
            <button
              onClick={() => handleNavigation("/orders")}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-eco-cyan"
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
                <span className="text-sm font-bold text-slate-700 group-hover:text-eco-cyan">
                  Pesanan Saya
                </span>
              </div>
              <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                2
              </span>
            </button>
          </div>

          <div className="p-3 border-t border-slate-100">
            <button
              onClick={() => setAuthState({ isLoggedIn: false })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
